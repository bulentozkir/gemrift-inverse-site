(() => {
  document.documentElement.classList.add("js-enabled");

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  // 1. Mobile navigation drawer
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-nav");

  if (menuToggle && primaryNav) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      primaryNav.classList.toggle("is-open", !isOpen);
    });

    primaryNav.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.matchMedia("(min-width: 1081px)").addEventListener("change", closeMenu);
  }

  // 2. Theme toggle (URL parameter only — no cookies or browser storage)
  // Default is "dark" (signature abyssal arcade look) unless ?scoutTheme=light is set
  const themeToggle = document.querySelector(".theme-toggle");

  const syncThemeLinks = (theme) => {
    document.querySelectorAll("a[href]").forEach((link) => {
      const raw = link.getAttribute("href") || "";
      if (raw.startsWith("#") || raw.startsWith("mailto:")) return;
      try {
        const url = new URL(raw, window.location.href);
        const sameSite =
          url.protocol === window.location.protocol &&
          (url.origin === window.location.origin || url.protocol === "file:");
        if (sameSite) {
          if (theme === "light") {
            url.searchParams.set("scoutTheme", "light");
          } else {
            url.searchParams.delete("scoutTheme");
          }
          link.setAttribute("href", url.href);
        }
      } catch {
        // Ignore malformed hrefs
      }
    });
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle) {
      const isLight = theme === "light";
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to deep abyss dark theme" : "Switch to coastal daylight theme"
      );
      const icon = themeToggle.querySelector("[data-theme-icon]");
      if (icon) icon.textContent = isLight ? "☾" : "☀";
    }
  };

  const explicitTheme = new URLSearchParams(window.location.search).get("scoutTheme");
  const initialTheme = explicitTheme === "light" ? "light" : "dark";
  applyTheme(initialTheme);
  if (explicitTheme === "light") {
    syncThemeLinks("light");
  }

  themeToggle?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    const url = new URL(window.location.href);
    if (next === "light") {
      url.searchParams.set("scoutTheme", "light");
    } else {
      url.searchParams.delete("scoutTheme");
    }
    window.history.replaceState(null, "", url);
    syncThemeLinks(next);
  });

  // 3. Scroll-reveal choreography & animated HUD counters
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotionQuery.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-count") || "0");
    if (!target || reducedMotionQuery.matches) {
      el.textContent = target.toLocaleString("en-US");
      return;
    }
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => countObserver.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  // 4. Scroll-spy for in-page navigation links
  const spyLinks = Array.from(document.querySelectorAll('.nav-section-links a[href^="#"]'));
  if (spyLinks.length > 0 && "IntersectionObserver" in window) {
    const sections = spyLinks
      .map((link) => document.querySelector(link.getAttribute("href") || ""))
      .filter(Boolean);

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            spyLinks.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === id);
            });
          }
        });
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: 0 }
    );
    sections.forEach((sec) => spyObserver.observe(sec));
  }

  // 5. Animated GIF Trailer Player + Synced MP3 Soundtrack
  const trailerImg = document.querySelector("#trailer-media");
  const trailerToggle = document.querySelector("#trailer-toggle");
  const trailerSoundToggle = document.querySelector("#trailer-sound-toggle");
  const trailerSoundOverlay = document.querySelector("#trailer-sound-overlay");
  const trailerAudio = document.querySelector("#trailer-audio");
  const trailerBadge = document.querySelector("#trailer-state-badge");
  const trailerStage = document.querySelector("#trailer-stage");
  const beatPills = Array.from(document.querySelectorAll(".trailer-beat"));

  if (trailerImg && trailerToggle) {
    const gifSrc = trailerImg.getAttribute("data-gif-src") || trailerImg.getAttribute("src") || "";
    const posterSrc = trailerImg.getAttribute("data-poster-src") || gifSrc;
    let isPlaying = !reducedMotionQuery.matches;
    let isSoundOn = false;

    const syncTrailerState = (restartGif = false) => {
      if (isPlaying) {
        if (restartGif) {
          // Force browser to restart animated GIF from frame 0 in sync with audio
          trailerImg.setAttribute("src", posterSrc);
          requestAnimationFrame(() => trailerImg.setAttribute("src", gifSrc));
        } else if (trailerImg.getAttribute("src") !== gifSrc) {
          trailerImg.setAttribute("src", gifSrc);
        }
      } else {
        trailerImg.setAttribute("src", posterSrc);
      }

      trailerToggle.setAttribute("aria-pressed", String(!isPlaying));
      const label = trailerToggle.querySelector("[data-toggle-label]");
      const glyph = trailerToggle.querySelector("[data-toggle-glyph]");
      if (label) label.textContent = isPlaying ? "Pause GIF" : "Play GIF";
      if (glyph) glyph.textContent = isPlaying ? "⏸" : "▶";

      if (trailerBadge) {
        trailerBadge.textContent = isPlaying
          ? isSoundOn
            ? "LIVE · SOUND ON"
            : "LIVE · 28s GAMEPLAY LOOP"
          : "PAUSED · POSTER FRAME";
        trailerBadge.classList.toggle("is-paused", !isPlaying);
      }

      trailerStage?.classList.toggle("is-paused", !isPlaying);
      trailerStage?.classList.toggle("is-sound-on", isPlaying && isSoundOn);

      if (trailerSoundToggle) {
        trailerSoundToggle.setAttribute("aria-pressed", String(isSoundOn));
        const sLabel = trailerSoundToggle.querySelector("[data-sound-label]");
        const sGlyph = trailerSoundToggle.querySelector("[data-sound-glyph]");
        if (sLabel) sLabel.textContent = isSoundOn ? "Mute Sound" : "Enable Sound";
        if (sGlyph) sGlyph.textContent = isSoundOn ? "🔇" : "🔊";
      }

      if (trailerSoundOverlay) {
        trailerSoundOverlay.textContent = !isPlaying
          ? "▶ Click to Play"
          : isSoundOn
            ? "🔊 Sound On"
            : "🔇 Click for Sound";
      }

      if (trailerAudio instanceof HTMLAudioElement) {
        if (isPlaying && isSoundOn) {
          trailerAudio.play().catch(() => {
            isSoundOn = false;
          });
        } else {
          trailerAudio.pause();
        }
      }
    };

    const toggleSound = () => {
      isSoundOn = !isSoundOn;
      if (isSoundOn) {
        isPlaying = true;
        if (trailerAudio instanceof HTMLAudioElement) {
          trailerAudio.currentTime = 0;
        }
        syncTrailerState(true);
      } else {
        syncTrailerState(false);
      }
    };

    syncTrailerState(false);

    trailerToggle.addEventListener("click", () => {
      isPlaying = !isPlaying;
      if (isPlaying && isSoundOn && trailerAudio instanceof HTMLAudioElement) {
        trailerAudio.currentTime = 0;
        syncTrailerState(true);
      } else {
        syncTrailerState(false);
      }
    });

    trailerSoundToggle?.addEventListener("click", toggleSound);
    trailerStage?.addEventListener("click", () => {
      if (!isPlaying) {
        isPlaying = true;
        syncTrailerState(true);
      } else {
        toggleSound();
      }
    });

    if (beatPills.length > 0 && !reducedMotionQuery.matches) {
      let beatIdx = 0;
      setInterval(() => {
        if (!isPlaying || document.hidden) return;
        beatIdx = (beatIdx + 1) % beatPills.length;
        beatPills.forEach((pill, i) => pill.classList.toggle("is-current", i === beatIdx));
      }, 3600);
    }
  }

  // 6. Interactive 8-Creature Bestiary (habitat filter + Standard vs Remixed mode switch)
  const creatureFilterBtns = document.querySelectorAll("[data-creature-filter]");
  const creatureModeBtns = document.querySelectorAll("[data-creature-mode]");
  const creatureCards = document.querySelectorAll(".creature-card");
  const creatureGrid = document.querySelector("#creature-grid");

  if (creatureFilterBtns.length > 0 && creatureCards.length > 0) {
    creatureFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-creature-filter") || "all";
        creatureFilterBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        creatureCards.forEach((card) => {
          const group = card.getAttribute("data-group") || "";
          const show = filter === "all" || group === filter;
          card.hidden = !show;
        });
      });
    });
  }

  if (creatureModeBtns.length > 0 && creatureGrid) {
    creatureModeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-creature-mode") || "coastal";
        creatureModeBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        creatureGrid.setAttribute("data-mode", mode);
      });
    });
  }

  // 7. Interactive 1-5 Low-Vision Diamond Difficulty Selector
  const difficultyLevels = [
    {
      step: 1,
      name: "Junior",
      badge: "DEFAULT · STEP 1 OF 5",
      summary: "Slower pace; about 25% more reaction time and generous oxygen reserves.",
      pace: "125% tick window (225 ms)",
      goal: "Standard cave gem quota",
      clock: "150% quota clock · Relaxed default",
      credit: "50% score weight"
    },
    {
      step: 2,
      name: "Senior",
      badge: "AUTHORED PACE · STEP 2 OF 5",
      summary: "The cave exactly as authored: crisp 180 ms simulation ticks and standard gem quota.",
      pace: "100% authored (180 ms)",
      goal: "Standard cave gem quota",
      clock: "100% authored quota clock",
      credit: "100% score weight"
    },
    {
      step: 3,
      name: "Principal",
      badge: "ALL-GEMS TIER · STEP 3 OF 5",
      summary: "Brisker pace and full-clear objective: collect 100% of reachable gems to open the exit.",
      pace: "92% tick window (160 ms)",
      goal: "100% collectible gems (MaxRoute)",
      clock: "Extended all-gems clock scaled",
      credit: "125% score weight"
    },
    {
      step: 4,
      name: "Expert",
      badge: "HIGH-SPEED FULL CLEAR · STEP 4 OF 5",
      summary: "Tight reaction windows across every ambush room while harvesting every collectible gem.",
      pace: "85% tick window (150 ms)",
      goal: "100% collectible gems (MaxRoute)",
      clock: "Tighter all-gems countdown",
      credit: "150% score weight"
    },
    {
      step: 5,
      name: "Distinguished",
      badge: "MASTERY TIER · STEP 5 OF 5",
      summary: "Peak arcade velocity: fastest ticks, proportional air budget, and 100% gem mastery.",
      pace: "75% tick window (135 ms)",
      goal: "100% collectible gems (MaxRoute)",
      clock: "Fastest all-gems mastery clock",
      credit: "200% score weight"
    }
  ];

  const diffWidget = document.querySelector("#difficulty-widget");
  if (diffWidget) {
    const stepBtns = Array.from(diffWidget.querySelectorAll("[data-diff-step]"));
    const prevBtn = diffWidget.querySelector("[data-diff-prev]");
    const nextBtn = diffWidget.querySelector("[data-diff-next]");
    const nameEl = diffWidget.querySelector("#diff-name");
    const badgeEl = diffWidget.querySelector("#diff-badge");
    const summaryEl = diffWidget.querySelector("#diff-summary");
    const paceEl = diffWidget.querySelector("#diff-pace");
    const goalEl = diffWidget.querySelector("#diff-goal");
    const clockEl = diffWidget.querySelector("#diff-clock");
    const creditEl = diffWidget.querySelector("#diff-credit");
    let activeIdx = 0;

    const renderDifficulty = (index) => {
      activeIdx = (index + difficultyLevels.length) % difficultyLevels.length;
      const item = difficultyLevels[activeIdx];
      stepBtns.forEach((btn, idx) => {
        btn.classList.toggle("is-selected", idx === activeIdx);
        btn.classList.toggle("is-passed", idx < activeIdx);
        btn.setAttribute("aria-checked", String(idx === activeIdx));
      });
      if (nameEl) nameEl.textContent = item.name;
      if (badgeEl) badgeEl.textContent = item.badge;
      if (summaryEl) summaryEl.textContent = item.summary;
      if (paceEl) paceEl.textContent = item.pace;
      if (goalEl) goalEl.textContent = item.goal;
      if (clockEl) clockEl.textContent = item.clock;
      if (creditEl) creditEl.textContent = item.credit;
    };

    stepBtns.forEach((btn, idx) => {
      btn.addEventListener("click", () => renderDifficulty(idx));
      btn.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "'") {
          e.preventDefault();
          renderDifficulty(activeIdx + 1);
          stepBtns[activeIdx]?.focus();
        } else if (e.key === "ArrowLeft" || e.key === ";") {
          e.preventDefault();
          renderDifficulty(activeIdx - 1);
          stepBtns[activeIdx]?.focus();
        }
      });
    });
    prevBtn?.addEventListener("click", () => renderDifficulty(activeIdx - 1));
    nextBtn?.addEventListener("click", () => renderDifficulty(activeIdx + 1));
    renderDifficulty(0);
  }

  // 8. Screenshot Gallery Filter & Fullscreen Arcade Lightbox
  const shotFilterBtns = document.querySelectorAll("[data-shot-filter]");
  const shotCards = Array.from(document.querySelectorAll(".shot-card"));
  const lightbox = document.querySelector("#lightbox");

  if (shotFilterBtns.length > 0 && shotCards.length > 0) {
    shotFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-shot-filter") || "all";
        shotFilterBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        shotCards.forEach((card) => {
          const cat = card.getAttribute("data-shot-cat") || "";
          card.hidden = !(filter === "all" || cat === filter);
        });
      });
    });
  }

  if (lightbox instanceof HTMLDialogElement && shotCards.length > 0) {
    const lbImg = lightbox.querySelector("#lightbox-img");
    const lbTitle = lightbox.querySelector("#lightbox-title");
    const lbCaption = lightbox.querySelector("#lightbox-caption");
    const lbCount = lightbox.querySelector("#lightbox-count");
    const lbClose = lightbox.querySelector("#lightbox-close");
    const lbPrev = lightbox.querySelector("#lightbox-prev");
    const lbNext = lightbox.querySelector("#lightbox-next");
    let currentShotIdx = 0;

    const visibleShots = () => shotCards.filter((c) => !c.hidden);

    const showShot = (idx) => {
      const list = visibleShots();
      if (list.length === 0) return;
      currentShotIdx = (idx + list.length) % list.length;
      const card = list[currentShotIdx];
      const img = card.querySelector("img");
      if (lbImg && img) {
        lbImg.setAttribute("src", img.getAttribute("src") || "");
        lbImg.setAttribute("alt", img.getAttribute("alt") || "");
      }
      if (lbTitle) lbTitle.textContent = card.getAttribute("data-title") || "";
      if (lbCaption) lbCaption.textContent = card.getAttribute("data-desc") || "";
      if (lbCount) lbCount.textContent = `${currentShotIdx + 1} / ${list.length}`;
    };

    shotCards.forEach((card) => {
      const trigger = card.querySelector(".shot-trigger");
      trigger?.addEventListener("click", () => {
        const list = visibleShots();
        const idx = list.indexOf(card);
        showShot(idx >= 0 ? idx : 0);
        if (!lightbox.open) lightbox.showModal();
      });
    });

    lbClose?.addEventListener("click", () => lightbox.close());
    lbPrev?.addEventListener("click", () => showShot(currentShotIdx - 1));
    lbNext?.addEventListener("click", () => showShot(currentShotIdx + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showShot(currentShotIdx - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showShot(currentShotIdx + 1);
      }
    });
  }

  // 9. Ambient Abyss Canvas: rising inverse crystals, bubbles & golden lamp motes
  const canvas = document.querySelector("#abyss-canvas");
  if (canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      let width = 0;
      let height = 0;
      let dpr = 1;

      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize, { passive: true });

      const particles = Array.from({ length: 34 }, (_, i) => ({
        kind: i % 5 === 0 ? "gem" : i % 2 === 0 ? "bubble" : "mote",
        x: ((i * 73 + 19) % 100) / 100,
        y: ((i * 41 + 7) % 100) / 100,
        speed: 14 + (i % 7) * 5,
        size: i % 5 === 0 ? 7 + (i % 3) * 2.5 : 2 + (i % 4) * 1.4,
        phase: i * 0.85
      }));

      const drawDiamond = (cx, cy, r, isLight) => {
        ctx.save();
        ctx.translate(cx, cy);
        // Upward inverse trail
        const grad = ctx.createLinearGradient(0, r * 0.5, 0, r * 3.4);
        grad.addColorStop(0, isLight ? "rgba(0, 148, 198, 0.22)" : "rgba(76, 232, 255, 0.28)");
        grad.addColorStop(1, "rgba(76, 232, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(-r * 0.42, r * 0.4, r * 0.84, r * 2.8);

        ctx.beginPath();
        ctx.moveTo(-r * 0.65, -r * 0.35);
        ctx.lineTo(r * 0.65, -r * 0.35);
        ctx.lineTo(r, 0.05 * r);
        ctx.lineTo(0, r * 1.05);
        ctx.lineTo(-r, 0.05 * r);
        ctx.closePath();
        ctx.fillStyle = isLight ? "rgba(0, 162, 212, 0.24)" : "rgba(96, 240, 255, 0.34)";
        ctx.fill();
        ctx.strokeStyle = isLight ? "rgba(0, 128, 178, 0.42)" : "rgba(185, 251, 255, 0.58)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      };

      const renderFrame = (timeMs, still) => {
        ctx.clearRect(0, 0, width, height);
        const t = timeMs * 0.001;
        const isLight = document.documentElement.getAttribute("data-theme") === "light";

        for (const p of particles) {
          const driftY = still
            ? p.y * height
            : ((height + 40) - ((t * p.speed + p.y * (height + 80)) % (height + 80)));
          const swayX = still
            ? p.x * width
            : p.x * width + Math.sin(t * 0.9 + p.phase) * 14;

          if (p.kind === "gem") {
            drawDiamond(swayX, driftY, p.size, isLight);
          } else if (p.kind === "bubble") {
            ctx.beginPath();
            ctx.arc(swayX, driftY, p.size, 0, Math.PI * 2);
            ctx.strokeStyle = isLight ? "rgba(0, 132, 180, 0.25)" : "rgba(140, 232, 255, 0.32)";
            ctx.lineWidth = 1.1;
            ctx.stroke();
          } else {
            const alpha = still ? 0.28 : 0.18 + 0.24 * (0.5 + 0.5 * Math.sin(t * 2.1 + p.phase));
            ctx.beginPath();
            ctx.arc(swayX, driftY, p.size * 0.72, 0, Math.PI * 2);
            ctx.fillStyle = isLight
              ? `rgba(196, 125, 14, ${alpha})`
              : `rgba(255, 212, 126, ${alpha})`;
            ctx.fill();
          }
        }
      };

      if (reducedMotionQuery.matches) {
        renderFrame(0, true);
      } else {
        const loop = (now) => {
          if (!document.hidden && !reducedMotionQuery.matches) {
            renderFrame(now, false);
          }
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      }
    }
  }

  // 10. Current copyright year
  const year = document.querySelector("#current-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();

