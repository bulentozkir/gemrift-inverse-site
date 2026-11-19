import json
import struct
import unittest
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


ROOT = Path(__file__).resolve().parents[1]
SITE = "https://bulentozkir.github.io/gemrift-inverse-site/"
SITE_PATH = urlsplit(SITE).path
NS = {
    "s": "http://www.sitemaps.org/schemas/sitemap/0.9",
    "image": "http://www.google.com/schemas/sitemap-image/1.1",
}


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.url = urljoin(SITE, "" if path.name == "index.html" else path.name)
        self.elements = []
        self.ids = []
        self.title = ""
        self.headings = []
        self.graph = []
        self._text_target = None
        self._text = []
        self._json = None
        self.feed(path.read_text(encoding="utf-8"))
        self.close()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements.append((tag, attrs))
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag in ("title", "h1"):
            self._text_target = tag
            self._text = []
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self._json = []

    def handle_data(self, data):
        if self._text_target:
            self._text.append(data)
        if self._json is not None:
            self._json.append(data)

    def handle_endtag(self, tag):
        if tag == self._text_target:
            text = " ".join("".join(self._text).split())
            if tag == "title":
                self.title = text
            else:
                self.headings.append(text)
            self._text_target = None
        if tag == "script" and self._json is not None:
            payload = json.loads("".join(self._json))
            if payload.get("@context") != "https://schema.org":
                raise ValueError(f"{self.path.name}: unexpected structured data context")
            self.graph.extend(payload.get("@graph", [payload]))
            self._json = None

    def find(self, tag, **attrs):
        return [
            element for name, element in self.elements
            if name == tag and all(element.get(key) == value for key, value in attrs.items())
        ]

    def meta(self, key):
        matches = [
            attrs["content"] for attrs in self.find("meta")
            if attrs.get("name") == key or attrs.get("property") == key
        ]
        if len(matches) != 1:
            raise ValueError(f"{self.path.name}: expected one {key} meta tag")
        return matches[0]


def local_path(url):
    parsed = urlsplit(url)
    if parsed.netloc != urlsplit(SITE).netloc or not parsed.path.startswith(SITE_PATH):
        return None
    path = ROOT.joinpath(*unquote(parsed.path[len(SITE_PATH):]).split("/"))
    return path / "index.html" if path.is_dir() else path


class SeoTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pages = [Page(path) for path in sorted(ROOT.glob("*.html"))]
        cls.public = [page for page in cls.pages if page.path.name != "404.html"]
        cls.home = next(page for page in cls.public if page.url == SITE)
        cls.sitemap = ET.parse(ROOT / "sitemap.xml").getroot()

    def test_public_metadata_and_sitemap_agree(self):
        sitemap_urls = [node.text for node in self.sitemap.findall("s:url/s:loc", NS)]
        self.assertCountEqual(sitemap_urls, [page.url for page in self.public])
        self.assertEqual(len({page.title for page in self.public}), len(self.public))
        self.assertEqual(len({page.meta("description") for page in self.public}), len(self.public))
        for page in self.pages:
            with self.subTest(page=page.path.name):
                self.assertEqual(len(page.headings), 1)
                self.assertTrue(page.headings[0])
                self.assertEqual(len(page.ids), len(set(page.ids)))
                if page.path.name == "404.html":
                    self.assertIn("noindex", page.meta("robots"))
                    self.assertFalse(page.find("link", rel="canonical"))
                    continue
                self.assertEqual([link["href"] for link in page.find("link", rel="canonical")], [page.url])
                self.assertEqual(page.meta("og:url"), page.url)
                self.assertNotIn("noindex", page.meta("robots"))
                self.assertIn("max-image-preview:large", page.meta("robots"))
                self.assertEqual(page.meta("og:title"), page.title)
                self.assertEqual(page.meta("twitter:title"), page.title)
                self.assertEqual(page.meta("og:description"), page.meta("description"))
                self.assertEqual(page.meta("twitter:description"), page.meta("description"))
                self.assertEqual(
                    [urljoin(page.url, link["href"]) for link in page.find("link", rel="sitemap")],
                    [urljoin(SITE, "sitemap.xml")],
                )

    def test_social_image_dimensions_match_the_real_asset(self):
        for page in self.public:
            with self.subTest(page=page.path.name):
                image_url = page.meta("og:image")
                self.assertEqual(page.meta("twitter:image"), image_url)
                self.assertTrue(page.meta("og:image:alt"))
                self.assertTrue(page.meta("twitter:image:alt"))
                image = local_path(image_url).read_bytes()
                self.assertEqual(image[:8], b"\x89PNG\r\n\x1a\n")
                dimensions = struct.unpack(">II", image[16:24])
                declared = (int(page.meta("og:image:width")), int(page.meta("og:image:height")))
                self.assertEqual(declared, dimensions)

    def test_structured_data_connects_pages_game_and_breadcrumbs(self):
        nodes = [node for page in self.public for node in page.graph]
        by_id = {node["@id"]: node for node in nodes}
        self.assertEqual(len(by_id), len(nodes))

        def check_references(value):
            if isinstance(value, dict):
                if set(value) == {"@id"}:
                    self.assertIn(value["@id"], by_id)
                for child in value.values():
                    check_references(child)
            elif isinstance(value, list):
                for child in value:
                    check_references(child)

        check_references(nodes)
        website = by_id[SITE + "#website"]
        game = by_id[SITE + "#game"]
        self.assertEqual(website["@type"], "WebSite")
        self.assertEqual(game["@type"], "VideoGame")
        self.assertIn(game["name"], self.home.headings[0])
        self.assertEqual(by_id[game["mainEntityOfPage"]["@id"]]["mainEntity"]["@id"], game["@id"])
        for page in self.public:
            with self.subTest(page=page.path.name):
                webpage = by_id[page.url + "#webpage"]
                self.assertEqual(webpage["url"], page.url)
                self.assertEqual(webpage["name"], page.title)
                self.assertEqual(webpage["description"], page.meta("description"))
                self.assertEqual(webpage["isPartOf"]["@id"], website["@id"])
                if page is not self.home:
                    breadcrumb = by_id[webpage["breadcrumb"]["@id"]]["itemListElement"]
                    self.assertEqual([item["position"] for item in breadcrumb], list(range(1, len(breadcrumb) + 1)))
                    self.assertEqual(breadcrumb[0]["item"], SITE)
                    self.assertEqual(breadcrumb[-1]["item"], page.url)
                    self.assertTrue(page.find("nav", **{"class": "breadcrumbs"}))

    def test_local_links_fragments_and_responsive_assets_exist(self):
        pages_by_path = {page.path: page for page in self.pages}
        for page in self.pages:
            for tag, attrs in page.elements:
                references = [attrs[key] for key in ("href", "src", "data-gif-src", "data-poster-src") if attrs.get(key)]
                if attrs.get("srcset"):
                    self.assertTrue(attrs.get("sizes"))
                    references.extend(item.strip().split()[0] for item in attrs["srcset"].split(","))
                for reference in references:
                    url = urljoin(page.url, reference)
                    path = local_path(url)
                    if path is None:
                        continue
                    with self.subTest(page=page.path.name, reference=reference):
                        self.assertTrue(path.is_file(), f"Missing local target: {path}")
                        fragment = unquote(urlsplit(url).fragment)
                        if fragment and path in pages_by_path:
                            self.assertIn(fragment, pages_by_path[path].ids)
                if tag == "img":
                    with self.subTest(page=page.path.name, image=attrs.get("src")):
                        self.assertIn("alt", attrs)
                        self.assertGreater(int(attrs["width"]), 0)
                        self.assertGreater(int(attrs["height"]), 0)

    def test_sitemap_covers_visible_content_images(self):
        home_entry = next(
            node for node in self.sitemap.findall("s:url", NS)
            if node.find("s:loc", NS).text == SITE
        )
        image_urls = {node.text for node in home_entry.findall("image:image/image:loc", NS)}
        for image in self.home.find("img"):
            if image.get("alt"):
                self.assertIn(urljoin(SITE, image["src"]), image_urls)
        for url in image_urls:
            self.assertTrue(local_path(url).is_file(), url)

    def test_media_loading_and_crawlable_gallery_fallbacks(self):
        trailer = self.home.find("img", id="trailer-media")[0]
        self.assertNotEqual(trailer["src"], trailer["data-gif-src"])
        self.assertEqual(trailer["src"], trailer["data-poster-src"])
        self.assertEqual(self.home.find("audio", id="trailer-audio")[0]["preload"], "none")
        self.assertTrue(self.home.find("a", href=trailer["data-gif-src"]))
        self.assertEqual(self.home.find("img", id="lightbox-img")[0]["loading"], "lazy")
        hero = self.home.find("img", fetchpriority="high")[0]
        self.assertNotEqual(hero.get("loading"), "lazy")
        gallery = self.home.find("a", **{"class": "shot-trigger"})
        previews = [image for image in self.home.find("img") if image.get("srcset")]
        self.assertTrue(gallery)
        self.assertCountEqual([link["href"] for link in gallery], [image["src"] for image in previews])
        for image in previews:
            self.assertEqual(image["loading"], "lazy")
        for page in self.public:
            font = page.find("link", rel="preload", **{"as": "font"})[0]
            self.assertIn("crossorigin", font)
            self.assertEqual(font["type"], "font/woff2")
            path = local_path(urljoin(page.url, font["href"]))
            self.assertEqual(path.read_bytes()[:4], b"wOF2")
            self.assertLess(path.stat().st_size, path.with_suffix(".ttf").stat().st_size / 2)


if __name__ == "__main__":
    unittest.main()
