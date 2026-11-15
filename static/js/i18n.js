(() => {
  const LANGUAGES = [
    { code: "en", name: "English", rtl: false },
    { code: "tr", name: "Türkçe", rtl: false },
    { code: "de", name: "Deutsch", rtl: false },
    { code: "fr", name: "Français", rtl: false },
    { code: "es", name: "Español", rtl: false },
    { code: "it", name: "Italiano", rtl: false },
    { code: "pt", name: "Português", rtl: false },
    { code: "pt-BR", name: "Português (Brasil)", rtl: false },
    { code: "nl", name: "Nederlands", rtl: false },
    { code: "sv", name: "Svenska", rtl: false },
    { code: "da", name: "Dansk", rtl: false },
    { code: "nb", name: "Norsk bokmål", rtl: false },
    { code: "fi", name: "Suomi", rtl: false },
    { code: "pl", name: "Polski", rtl: false },
    { code: "cs", name: "Čeština", rtl: false },
    { code: "sk", name: "Slovenčina", rtl: false },
    { code: "hu", name: "Magyar", rtl: false },
    { code: "ro", name: "Română", rtl: false },
    { code: "el", name: "Ελληνικά", rtl: false },
    { code: "ru", name: "Русский", rtl: false },
    { code: "uk", name: "Українська", rtl: false },
    { code: "bg", name: "Български", rtl: false },
    { code: "ar", name: "العربية", rtl: true },
    { code: "he", name: "עברית", rtl: true },
    { code: "fa", name: "فارسی", rtl: true },
    { code: "hi", name: "हिन्दी", rtl: false },
    { code: "bn", name: "বাংলা", rtl: false },
    { code: "zh-CN", name: "简体中文", rtl: false },
    { code: "ja", name: "日本語", rtl: false },
    { code: "ko", name: "한국어", rtl: false }
  ];

  // Compact tuple dictionary per locale for fast, self-hosted static delivery across all 30 game languages:
  // [0] navHome, [1] navTrailer, [2] navGameplay, [3] navScreenshots, [4] navCreatures, [5] navCaves, [6] navControls,
  // [7] menu, [8] btnSupport, [9] btnPrivacy, [10] btnCredits, [11] langLabel,
  // [12] heroPill, [13] heroLine1, [14] heroLine2, [15] heroTagline, [16] heroLede,
  // [17] ctaStore, [18] ctaTrailer, [19] statCaves, [20] statCavesSub, [21] statHunters, [22] statHuntersSub,
  // [23] statTiers, [24] statTiersSub, [25] statLocales, [26] statLocalesSub,
  // [27] secTrailerTitle, [28] secTrailerDesc, [29] enableSound, [30] muteSound, [31] pauseGif, [32] playGif, [33] clickSound, [34] soundOn,
  // [35] secGameplayTitle, [36] secGameplayDesc, [37] rocksSink, [38] gemsRise, [39] airDome,
  // [40] secShotsTitle, [41] shotsAll, [42] shotsCaves, [43] shotsUi,
  // [44] secCreaturesTitle, [45] filterAll8, [46] filterCoastal5, [47] filterDeep3, [48] modeStandard, [49] modeRemix,
  // [50] secCavesTitle, [51] diffSelectorTitle, [52] diff1, [53] diff2, [54] diff3, [55] diff4, [56] diff5,
  // [57] secControlsTitle, [58] visitOriginal, [59] closingTitle, [60] closingDesc,
  // [61] supportHeading, [62] privacyHeading, [63] creditsHeading, [64] lostHeading
  const PACKS = {
    tr: [
      "Ana Sayfa", "Fragman", "Oynanış", "Ekran Görüntüleri", "Yaratıklar", "Mağaralar", "Kontroller",
      "Menü", "Destek", "Gizlilik", "Telif", "Dil seçin",
      "Windows İçin Çıktı · 215 Kanıtlanmış Mağara", "Kayalar düşer.", "Mücevherler yükselir.", "Akıllı kaz · Parlak parılda.",
      "Milo Coppercap ile ağır kayaların aşağı düştüğü, serbest kalan kristallerin ve su altı mayınlarının tavana yükseldiği ve her nefesin rotanızı belirlediği su altı bulmaca macerasına dalın.",
      "Microsoft Store'dan İndir", "Fragmanı İzle", "◆ Mağara", "Tümü baştan açık", "◈ Avcı", "5 kıyı + 3 derin deniz",
      "★ Zorluk", "Junior'dan Distinguished'a", "◎ Dil", "Arayüz ve Yardım dilleri",
      "Derinliği <em>hareket halinde</em> görün.", "Su dolu sarnıçlar, yüzen mayın kilitleri, uyarılı avcı pusuları ve zincirleme patlamalar — orijinal 128 BPM chiptune teması <strong>Pixel Tides</strong> eşliğinde.",
      "Sesi Aç", "Sesi Kapat", "GIF'i Duraklat", "GIF'i Oynat", "🔇 Ses İçin Tıkla", "🔊 Ses Açık",
      "Ters yerçekimi.<br><em>Saf arcade taktikleri.</em>", "Her mağara 180 ms deterministik simülasyonla çalışır. Su asla boşalmaz; açtığınız her alüvyon tıkaç ve bıraktığınız her kaya net kurallara uyar.",
      "KAYALAR BATAR ↓", "MÜCEVHERLER YÜKSELİR ↑", "HAVA KUBBESİ",
      "Net silüetler.<br><em>İlk bakışta okunur.</em>", "Tüm Görüntüler (10)", "Su Altı Mağaraları (6)", "Menüler, Eğitim ve Yardım (4)",
      "Sekiz farklı avcı.<br><em>Sürpriz tuzak yok.</em>", "Tüm 8 Tür", "5 Kıyı Avcısı", "3 Derin Deniz Uzmanı (21+)", "Standart Kurallar", "⚡ Remiks Modu",
      "Her mağara açık.<br><em>Beş ustalık seviyesi.</em>", "Etkileşimli Zorluk Seçici", "Çırak", "Kıdemli", "Başuzman", "Uzman", "Seçkin",
      "Dokunsal kontroller.<br><em>Her oyuncu için.</em>", "Orijinal Gemrift'i Ziyaret Et ↗",
      "Mağarayı <span class=\"accent-cyan\">ters yüz etmeye</span> hazır mısınız?", "215 başlık temalı su altı mağarası, 8 uyarılı yaratık, akıllı kontrol noktası geri sarma ve unutulmaz bir chiptune dalışı sizi bekliyor.",
      "Oyuncu desteği ve <em>SSS.</em>", "Gizlilik, <em>açık ve net.</em>", "Telif hakkı ve <em>emeği geçenler.</em>", "Yarıkta mı kayboldunuz?"
    ],
    de: [
      "Startseite", "Trailer", "Gameplay", "Screenshots", "Kreaturen", "Höhlen", "Steuerung",
      "Menü", "Support", "Datenschutz", "Urheberrecht", "Sprache wählen",
      "Jetzt für Windows · 215 geprüfte Höhlen", "Felsen fallen.", "Edelsteine steigen.", "Clever graben · Hell strahlen.",
      "Tauche mit Milo Coppercap in ein Unterwasser-Puzzle-Abenteuer ein, in dem schwere Felsen hinabstürzen, befreite Kristalle und Seeminen zur Decke schweben und jeder Atemzug deinen Weg bestimmt.",
      "Im Microsoft Store laden", "Trailer ansehen", "◆ Höhlen", "Alle sofort spielbar", "◈ Jäger", "5 Küste + 3 Tiefsee",
      "★ Stufen", "Junior bis Distinguished", "◎ Sprachen", "UI- & Hilfesprachen",
      "Erlebe die Tiefe <em>in Bewegung.</em>", "Echtes Gameplay durch überflutete Zisternen, Seeminen-Schleusen, angekündigte Hinterhalte und Kettenreaktionen — begleitet vom 128-BPM-Chiptune <strong>Pixel Tides</strong>.",
      "Ton aktivieren", "Ton stumm", "GIF pausieren", "GIF abspielen", "🔇 Für Ton klicken", "🔊 Ton aktiv",
      "Umgekehrte Schwerkraft.<br><em>Reine Arcade-Taktik.</em>", "Jede Höhle läuft auf einer präzisen 180-ms-Simulation. Wasser läuft nie ab — jeder geöffnete Schlammstopfen und jeder Fels folgt klaren Regeln.",
      "FELSEN SINKEN ↓", "EDELSTEINE STEIGEN ↑", "LUFTKUPPEL",
      "Klare Silhouetten.<br><em>Sofort lesbar.</em>", "Alle Aufnahmen (10)", "Unterwasserhöhlen (6)", "Menüs, Tutorial & Hilfe (4)",
      "Acht eigene Jäger.<br><em>Keine unfairen Treffer.</em>", "Alle 8 Arten", "5 Küstenjäger", "3 Tiefsee-Arten (ab 21)", "Standardregeln", "⚡ Remix-Modus",
      "Jede Höhle offen.<br><em>Fünf Schwierigkeitsgrade.</em>", "Interaktiver Schwierigkeitsregler", "Junior", "Senior", "Principal", "Experte", "Meister",
      "Präzise Steuerung.<br><em>Für alle Spielenden.</em>", "Original-Gemrift besuchen ↗",
      "Bereit, die Höhle <span class=\"accent-cyan\">auf den Kopf</span> zu stellen?", "215 Unterwasserhöhlen, 8 telegrafierte Kreaturen, kluges Checkpoint-Zurückspulen und ein Chiptune-Tauchgang warten auf dich.",
      "Spieler-Support &amp; <em>FAQ.</em>", "Datenschutz, <em>klipp und klar.</em>", "Urheberrecht &amp; <em>Credits.</em>", "In der Tiefe verirrt?"
    ],
    fr: [
      "Accueil", "Bande-annonce", "Gameplay", "Captures", "Créatures", "Grottes", "Commandes",
      "Menu", "Assistance", "Confidentialité", "Copyright", "Choisir la langue",
      "Disponible sur Windows · 215 grottes prouvées", "Les rochers tombent.", "Les gemmes montent.", "Creusez malin · Brillez fort.",
      "Plongez avec Milo Coppercap dans une aventure de réflexion sous-marine où les lourds rochers chutent, les cristaux et mines flottent vers le plafond et chaque bouffée d'air guide votre route.",
      "Obtenir sur le Microsoft Store", "Voir la bande-annonce", "◆ Grottes", "Toutes ouvertes dès le départ", "◈ Chasseurs", "5 côtiers + 3 abyssaux",
      "★ Niveaux", "De Junior à Distingué", "◎ Langues", "Interface et aide",
      "Admirez les abysses <em>en mouvement.</em>", "Du vrai gameplay entre citernes inondées, mines flottantes, embuscades télégraphiées et réactions en chaîne — rythmé par le chiptune 128 BPM <strong>Pixel Tides</strong>.",
      "Activer le son", "Couper le son", "Pause GIF", "Lire le GIF", "🔇 Cliquer pour le son", "🔊 Son activé",
      "Gravité inversée.<br><em>Pure tactique arcade.</em>", "Chaque grotte tourne sur une simulation déterministe à 180 ms. L'eau reste fixe — chaque bouchon de limon et chaque rocher obéit à des règles limpides.",
      "ROCHERS COULENT ↓", "GEMMES MONTENT ↑", "DÔME D'AIR",
      "Silhouettes nettes.<br><em>Lisibles d'un coup d'œil.</em>", "Toutes les captures (10)", "Grottes sous-marines (6)", "Menus, tutoriel & aide (4)",
      "Huit prédateurs distincts.<br><em>Zéro coup bas.</em>", "Les 8 espèces", "5 prédateurs côtiers", "3 spécialistes abyssaux (21+)", "Règles standard", "⚡ Mode Remix",
      "Toutes les grottes ouvertes.<br><em>Cinq rythmes de maîtrise.</em>", "Sélecteur de difficulté interactif", "Junior", "Senior", "Principal", "Expert", "Distingué",
      "Commandes tactiles.<br><em>Pour chaque joueur.</em>", "Visiter le Gemrift original ↗",
      "Prêt à mettre la caverne <span class=\"accent-cyan\">sens dessus dessous ?</span>", "215 grottes sous-marines, 8 créatures télégraphiées, retour au point de contrôle et bande-son chiptune vous attendent.",
      "Assistance &amp; <em>FAQ.</em>", "Confidentialité, <em>en toute clarté.</em>", "Droits d'auteur &amp; <em>crédits.</em>", "Perdu dans la faille ?"
    ],
    es: [
      "Inicio", "Tráiler", "Jugabilidad", "Capturas", "Criaturas", "Cuevas", "Controles",
      "Menú", "Soporte", "Privacidad", "Copyright", "Seleccionar idioma",
      "Disponible para Windows · 215 cuevas probadas", "Las rocas caen.", "Las gemas suben.", "Excava con ingenio · Brilla con fuerza.",
      "Sumérgete con Milo Coppercap en una aventura submarina de puzles donde las rocas pesadas caen, los cristales y minas flotan hacia el techo y cada respiro define tu ruta.",
      "Consíguelo en Microsoft Store", "Ver tráiler", "◆ Cuevas", "Todas abiertas al inicio", "◈ Cazadores", "5 costeros + 3 abisales",
      "★ Niveles", "De Junior a Distinguido", "◎ Idiomas", "Interfaz y ayuda",
      "Mira el abismo <em>en movimiento.</em>", "Jugabilidad real entre cisternas inundadas, esclusas de minas, emboscadas telegrafiadas y explosiones en cadena con el tema chiptune de 128 BPM <strong>Pixel Tides</strong>.",
      "Activar sonido", "Silenciar", "Pausar GIF", "Reproducir GIF", "🔇 Clic para sonido", "🔊 Sonido activo",
      "Gravedad opuesta.<br><em>Pura táctica arcade.</em>", "Cada cueva funciona con una simulación determinista de 180 ms. El agua nunca se drena: cada tapón de limo y cada roca sigue reglas cristalinas.",
      "ROCAS CAEN ↓", "GEMAS SUBEN ↑", "DOMO DE AIRE",
      "Siluetas nítidas.<br><em>Legibles al instante.</em>", "Todas las capturas (10)", "Cuevas submarinas (6)", "Menús, tutorial y ayuda (4)",
      "Ocho cazadores únicos.<br><em>Cero golpes injustos.</em>", "Las 8 especies", "5 depredadores costeros", "3 especialistas abisales (21+)", "Reglas estándar", "⚡ Modo Remix",
      "Cada cueva abierta.<br><em>Cinco niveles de maestría.</em>", "Selector interactivo de dificultad", "Junior", "Sénior", "Principal", "Experto", "Distinguido",
      "Controles precisos.<br><em>Para todo jugador.</em>", "Visitar Gemrift original ↗",
      "¿Listo para poner la caverna <span class=\"accent-cyan\">patas arriba?</span>", "Te esperan 215 cuevas submarinas, 8 criaturas telegrafiadas, rebobinado inteligente y una inmersión chiptune inolvidable.",
      "Soporte y <em>preguntas frecuentes.</em>", "Privacidad, <em>a plena vista.</em>", "Derechos de autor y <em>créditos.</em>", "¿Perdido en la grieta?"
    ],
    it: [
      "Home", "Trailer", "Gameplay", "Screenshot", "Creature", "Grotte", "Comandi",
      "Menu", "Supporto", "Privacy", "Copyright", "Seleziona lingua",
      "Disponibile per Windows · 215 grotte verificate", "Le rocce cadono.", "Le gemme salgono.", "Scava con astuzia · Brilla forte.",
      "Tuffati con Milo Coppercap in un'avventura puzzle sottomarina dove i massi cadono giù, cristalli e mine salgono verso il soffitto e ogni respiro decide il percorso.",
      "Scarica da Microsoft Store", "Guarda il trailer", "◆ Grotte", "Tutte aperte da subito", "◈ Predatori", "5 costieri + 3 abissali",
      "★ Livelli", "Da Junior a Illustre", "◎ Lingue", "Interfaccia e guida",
      "Ammira l'abisso <em>in movimento.</em>", "Gameplay reale tra cisterne allagate, mine galleggianti, imboscate segnalate e reazioni a catena con la colonna sonora chiptune <strong>Pixel Tides</strong>.",
      "Attiva audio", "Disattiva audio", "Pausa GIF", "Avvia GIF", "🔇 Clicca per l'audio", "🔊 Audio attivo",
      "Gravità opposta.<br><em>Pura tattica arcade.</em>", "Ogni grotta gira su una simulazione deterministica da 180 ms. L'acqua resta fissa: ogni tappo di limo e ogni masso segue regole cristalline.",
      "ROCCE GIÙ ↓", "GEMME SU ↑", "CUPOLA D'ARIA",
      "Sagome nitide.<br><em>Chiare a colpo d'occhio.</em>", "Tutti gli scatti (10)", "Grotte sottomarine (6)", "Menu, tutorial e guida (4)",
      "Otto cacciatori distinti.<br><em>Zero colpi sleali.</em>", "Tutte le 8 specie", "5 predatori costieri", "3 specialisti abissali (21+)", "Regole standard", "⚡ Modalità Remix",
      "Ogni grotta sbloccata.<br><em>Cinque ritmi di sfida.</em>", "Selettore difficoltà interattivo", "Junior", "Senior", "Principale", "Esperto", "Illustre",
      "Comandi reattivi.<br><em>Pensati per tutti.</em>", "Visita il Gemrift originale ↗",
      "Pronto a capovolgere <span class=\"accent-cyan\">la caverna?</span>", "215 grotte sottomarine, 8 creature leggibili, riavvolgimento al checkpoint e un tuffo chiptune ti aspettano.",
      "Supporto e <em>FAQ.</em>", "Privacy, <em>in piena trasparenza.</em>", "Copyright e <em>crediti.</em>", "Perso nella faglia?"
    ],
    pt: [
      "Início", "Trailer", "Jogabilidade", "Capturas", "Criaturas", "Cavernas", "Controlos",
      "Menu", "Suporte", "Privacidade", "Copyright", "Selecionar idioma",
      "Já disponível para Windows · 215 cavernas provadas", "As rochas caem.", "As gemas sobem.", "Escave com inteligência · Brilhe muito.",
      "Mergulhe com Milo Coppercap numa aventura de puzzles subaquáticos onde pedregulhos caem, cristais e minas sobem até ao teto e cada fôlego define a sua rota.",
      "Obter na Microsoft Store", "Ver Trailer", "◆ Cavernas", "Todas abertas de início", "◈ Caçadores", "5 costeiros + 3 abissais",
      "★ Níveis", "De Júnior a Distinto", "◎ Idiomas", "Interface e ajuda",
      "Veja o abismo <em>em movimento.</em>", "Jogabilidade real entre cisternas inundadas, minas flutuantes, emboscadas telegrafadas e explosões em cadeia ao som chiptune de <strong>Pixel Tides</strong>.",
      "Ativar som", "Silenciar", "Pausar GIF", "Reproduzir GIF", "🔇 Clique para som", "🔊 Som ligado",
      "Gravidade oposta.<br><em>Pura tática arcade.</em>", "Cada caverna corre numa simulação determinística de 180 ms. A água nunca escoa — cada rocha e mina segue regras transparentes.",
      "ROCHAS DESCEM ↓", "GEMAS SOBEM ↑", "CÚPULA DE AR",
      "Silhuetas nítidas.<br><em>Legíveis num instante.</em>", "Todas as capturas (10)", "Cavernas subaquáticas (6)", "Menus, tutorial e ajuda (4)",
      "Oito predadores únicos.<br><em>Zero golpes injustos.</em>", "Todas as 8 espécies", "5 predadores costeiros", "3 especialistas abissais (21+)", "Regras padrão", "⚡ Modo Remix",
      "Todas as cavernas abertas.<br><em>Cinco níveis de domínio.</em>", "Seletor interativo de dificuldade", "Júnior", "Sénior", "Principal", "Perito", "Distinto",
      "Controlos precisos.<br><em>Feitos para todos.</em>", "Visitar Gemrift original ↗",
      "Pronto para virar a caverna <span class=\"accent-cyan\">de pernas para o ar?</span>", "215 cavernas subaquáticas, 8 criaturas telegrafadas, recuo inteligente ao checkpoint e música chiptune esperam por si.",
      "Suporte e <em>FAQ.</em>", "Privacidade, <em>às claras.</em>", "Direitos de autor e <em>créditos.</em>", "Perdido na fenda?"
    ],
    "pt-BR": [
      "Início", "Trailer", "Jogabilidade", "Capturas", "Criaturas", "Cavernas", "Controles",
      "Menu", "Suporte", "Privacidade", "Copyright", "Selecionar idioma",
      "Já disponível para Windows · 215 cavernas provadas", "As rochas caem.", "As gemas sobem.", "Cave com inteligência · Brilhe forte.",
      "Mergulhe com Milo Coppercap em uma aventura de quebra-cabeças submarinos onde pedras pesadas caem, cristais e minas flutuam até o teto e cada fôlego molda seu caminho.",
      "Baixar na Microsoft Store", "Assistir Trailer", "◆ Cavernas", "Todas abertas no início", "◈ Predadores", "5 costeiros + 3 abissais",
      "★ Níveis", "De Júnior a Distinto", "◎ Idiomas", "Interface e ajuda",
      "Veja o abismo <em>em ação.</em>", "Gameplay real em cisternas inundadas, travas de minas, emboscadas telegrafadas e reações em cadeia ao som chiptune 128 BPM de <strong>Pixel Tides</strong>.",
      "Ativar som", "Silenciar", "Pausar GIF", "Reproduzir GIF", "🔇 Clique para som", "🔊 Som ativado",
      "Gravidade oposta.<br><em>Pura tática arcade.</em>", "Cada caverna roda em simulação determinística de 180 ms. A água nunca seca — cada tampa de lodo e rocha segue regras claras.",
      "ROCHAS CAEM ↓", "GEMAS SOBEM ↑", "DOMO DE AR",
      "Silhuetas nítidas.<br><em>Claras de relance.</em>", "Todas as capturas (10)", "Cavernas submarinas (6)", "Menus, tutorial e ajuda (4)",
      "Oito caçadores únicos.<br><em>Zero golpes injustos.</em>", "Todas as 8 espécies", "5 predadores costeiros", "3 especialistas abissais (21+)", "Regras padrão", "⚡ Modo Remix",
      "Todas as cavernas abertas.<br><em>Cinco níveis de domínio.</em>", "Seletor interativo de dificuldade", "Júnior", "Sênior", "Principal", "Especialista", "Distinto",
      "Controles precisos.<br><em>Para todo jogador.</em>", "Visitar Gemrift original ↗",
      "Pronto para virar a caverna <span class=\"accent-cyan\">de cabeça para baixo?</span>", "215 cavernas submarinas, 8 criaturas telegrafadas, retorno inteligente ao checkpoint e trilha chiptune esperam por você.",
      "Suporte e <em>FAQ.</em>", "Privacidade, <em>às claras.</em>", "Direitos autorais e <em>créditos.</em>", "Perdido na fenda?"
    ],
    nl: [
      "Home", "Trailer", "Gameplay", "Screenshots", "Wezens", "Grotten", "Besturing",
      "Menu", "Support", "Privacy", "Copyright", "Taal kiezen",
      "Nu uit voor Windows · 215 bewezen grotten", "Rotsen vallen.", "Edelstenen stijgen.", "Graaf slim · Schitter fel.",
      "Duik met Milo Coppercap in een onderwater-puzzelavontuur waarin zware rotsblokken vallen, kristallen en zeemijnen omhoog zweven en elke ademteug telt.",
      "Download in Microsoft Store", "Bekijk trailer", "◆ Grotten", "Direct allemaal open", "◈ Jagers", "5 kust + 3 diepzee",
      "★ Niveaus", "Junior tot Distinguished", "◎ Talen", "UI- & hulptalen",
      "Zie de diepte <em>in beweging.</em>", "Echte gameplay langs ondergelopen bassins, drijvende mijnen, getelegrafeerde hinderlagen en kettingreacties met de 128 BPM chiptune <strong>Pixel Tides</strong>.",
      "Geluid aan", "Geluid uit", "GIF pauzeren", "GIF afspelen", "🔇 Klik voor geluid", "🔊 Geluid aan",
      "Omgekeerde zwaartekracht.<br><em>Pure arcadetactiek.</em>", "Elke grot draait op een deterministische simulatie van 180 ms. Water loopt nooit weg — elke slibplug en elk rotsblok volgt heldere regels.",
      "ROTSEN ZINKEN ↓", "EDELSTENEN STIJGEN ↑", "LUCHTKOEPEL",
      "Scherpe silhouetten.<br><em>Direct leesbaar.</em>", "Alle beelden (10)", "Onderwatergrotten (6)", "Menu's, tutorial & hulp (4)",
      "Acht unieke jagers.<br><em>Geen oneerlijke treffers.</em>", "Alle 8 soorten", "5 kustroofdieren", "3 diepzee-experts (21+)", "Standaardregels", "⚡ Remix-modus",
      "Elke grot ontgrendeld.<br><em>Vijf niveaus van meesterschap.</em>", "Interactieve moeilijkheidskiezer", "Junior", "Senior", "Principal", "Expert", "Distinguished",
      "Strakke besturing.<br><em>Voor elke speler.</em>", "Bezoek originele Gemrift ↗",
      "Klaar om de grot <span class=\"accent-cyan\">op zijn kop</span> te zetten?", "215 onderwatergrotten, 8 voorspelbare wezens, slim terugspoelen en een chiptune-duik wachten op je.",
      "Ondersteuning &amp; <em>FAQ.</em>", "Privacy, <em>glashelder.</em>", "Auteursrecht &amp; <em>credits.</em>", "Verdwaald in de kloof?"
    ],
    sv: [
      "Hem", "Trailer", "Spelupplägg", "Skärmbilder", "Varelser", "Grottor", "Kontroller",
      "Meny", "Support", "Integritet", "Upphovsrätt", "Välj språk",
      "Ute nu för Windows · 215 bevisade grottor", "Stenar faller.", "Juveler stiger.", "Gräv smart · Lys klart.",
      "Dyk med Milo Coppercap i ett undervattenspussel där tunga stenblock faller nedåt, kristaller och minor svävar uppåt och varje andetag formar din väg.",
      "Hämta i Microsoft Store", "Se trailer", "◆ Grottor", "Alla öppna från start", "◈ Jägare", "5 kust + 3 djuphav",
      "★ Nivåer", "Junior till Distinguished", "◎ Språk", "UI- och hjälpspråk",
      "Se djupet <em>i rörelse.</em>", "Äkta spelupplägg genom vattenfyllda valv, flytande minor, förvarnade bakhåll och kedjereaktioner till 128 BPM chiptune-låten <strong>Pixel Tides</strong>.",
      "Slå på ljud", "Stäng av ljud", "Pausa GIF", "Spela GIF", "🔇 Klicka för ljud", "🔊 Ljud på",
      "Omvänd gravitation.<br><em>Ren arkadtaktik.</em>", "Varje grotta körs på en deterministisk 180 ms-simulering. Vattnet rinner aldrig bort — varje sten och mina följer glasklara regler.",
      "STENAR SJUNKER ↓", "JUVELER STIGER ↑", "LUFTKUPOL",
      "Skarpa silhuetter.<br><em>Tydligt vid första blicken.</em>", "Alla bilder (10)", "Undervattensgrottor (6)", "Menyer, guide & hjälp (4)",
      "Åtta unika jägare.<br><em>Inga billiga träffar.</em>", "Alla 8 arter", "5 kustrovdjur", "3 djuphavsarter (21+)", "Standardregler", "⚡ Remixläge",
      "Alla grottor upplåsta.<br><em>Fem svårighetsgrader.</em>", "Interaktiv svårighetsväljare", "Junior", "Senior", "Principal", "Expert", "Distinguished",
      "Exakta kontroller.<br><em>Byggt för alla.</em>", "Besök originalet Gemrift ↗",
      "Redo att vända grottan <span class=\"accent-cyan\">upp och ner?</span>", "215 undervattensgrottor, 8 varelser, smart checkpoint-spolning och ett chiptune-äventyr väntar.",
      "Spelarsupport &amp; <em>FAQ.</em>", "Integritet, <em>helt öppet.</em>", "Upphovsrätt &amp; <em>eftertexter.</em>", "Vilse i sprickan?"
    ],
    da: [
      "Hjem", "Trailer", "Gameplay", "Skærmbilleder", "Væsner", "Grotter", "Styring",
      "Menu", "Support", "Privatliv", "Ophavsret", "Vælg sprog",
      "Ude nu til Windows · 215 gennemtestede grotter", "Sten falder.", "Ædelsten stiger.", "Grav klogt · Skin klart.",
      "Dyk ned med Milo Coppercap i et undervands-puzzle-eventyr, hvor tunge kampesten falder ned, krystaller og miner svæver op, og hvert åndedrag tæller.",
      "Hent i Microsoft Store", "Se trailer", "◆ Grotter", "Alle åbne fra start", "◈ Jægere", "5 kyst + 3 dybhav",
      "★ Niveauer", "Junior til Distinguished", "◎ Sprog", "UI- og hjælpesprog",
      "Oplev dybet <em>i bevægelse.</em>", "Ægte gameplay gennem oversvømmede kamre, søminer, varslede baghold og kædereaktioner til 128 BPM chiptune-temaet <strong>Pixel Tides</strong>.",
      "Slå lyd til", "Slå lyd fra", "Sæt GIF på pause", "Afspil GIF", "🔇 Klik for lyd", "🔊 Lyd til",
      "Modsat tyngdekraft.<br><em>Ren arkadetaktik.</em>", "Hver grotte kører på en præcis 180 ms simulering. Vandet forsvinder aldrig — hver sten og mine følger krystalklare regler.",
      "STEN SYNKER ↓", "ÆDELSTEN STIGER ↑", "LUFTKUPPEL",
      "Skarpe silhuetter.<br><em>Læsbare med det samme.</em>", "Alle billeder (10)", "Undervandsgrotter (6)", "Menuer, guide & hjælp (4)",
      "Otte unikke jægere.<br><em>Ingen uretfærdige tab.</em>", "Alle 8 arter", "5 kystrovdyr", "3 dybhavsarter (21+)", "Standardregler", "⚡ Remix-tilstand",
      "Alle grotter åbne.<br><em>Fem sværhedsgrader.</em>", "Interaktiv sværhedsgradsvælger", "Junior", "Senior", "Principal", "Ekspert", "Distinguished",
      "Præcis styring.<br><em>Skabt til alle spillere.</em>", "Besøg det originale Gemrift ↗",
      "Klar til at vende grotten <span class=\"accent-cyan\">på hovedet?</span>", "215 undervandsgrotter, 8 væsner, smart checkpoint-spoling og et chiptune-dyk venter.",
      "Support &amp; <em>FAQ.</em>", "Privatliv, <em>helt klart.</em>", "Ophavsret &amp; <em>kreditering.</em>", "Faret vild i kløften?"
    ],
    nb: [
      "Hjem", "Trailer", "Spillmekanikk", "Skjermbilder", "Skapninger", "Grotter", "Kontroller",
      "Meny", "Brukerstøtte", "Personvern", "Opphavsrett", "Velg språk",
      "Ute nå for Windows · 215 beviste grotter", "Steiner faller.", "Edelstener stiger.", "Grav smart · Skinn klart.",
      "Dykk ned med Milo Coppercap i et undervannspuslespill der tunge kampesteiner faller ned, krystaller og miner flyter opp, og hvert åndedrag styrer ruten.",
      "Last ned fra Microsoft Store", "Se trailer", "◆ Grotter", "Alle åpne fra start", "◈ Jegere", "5 kyst + 3 dyphav",
      "★ Nivåer", "Junior til Distinguished", "◎ Språk", "UI- og hjelpespråk",
      "Se dypet <em>i bevegelse.</em>", "Ekte spilling gjennom oversvømte kamre, flytende miner, varslede bakhold og kjedereaksjoner til 128 BPM chiptune-låten <strong>Pixel Tides</strong>.",
      "Slå på lyd", "Demp lyd", "Sett GIF på pause", "Spill GIF", "🔇 Klikk for lyd", "🔊 Lyd på",
      "Motsatt tyngdekraft.<br><em>Ren arkadetaktikk.</em>", "Hver grotte kjører på en deterministisk 180 ms-simulering. Vannet renner aldri ut — hver stein og mine følger klare regler.",
      "STEINER SYNKER ↓", "EDELSTENER STIGER ↑", "LUFTKUPPEL",
      "Skarpe silhuetter.<br><em>Tydelige ved første blikk.</em>", "Alle bilder (10)", "Undervannsgrotter (6)", "Menyer, opplæring og hjelp (4)",
      "Åtte ulike jegere.<br><em>Ingen billige treff.</em>", "Alle 8 arter", "5 kystrovdyr", "3 dyphavsarter (21+)", "Standardregler", "⚡ Remikset modus",
      "Hver grotte er åpen.<br><em>Fem mestringsnivåer.</em>", "Interaktiv vanskelighetsvelger", "Junior", "Senior", "Principal", "Ekspert", "Distinguished",
      "Presise kontroller.<br><em>Laget for alle spillere.</em>", "Besøk originale Gemrift ↗",
      "Klar til å snu grotten <span class=\"accent-cyan\">opp ned?</span>", "215 undervannsgrotter, 8 skapninger, smart tilbakespoling og et chiptune-dykk venter.",
      "Brukerstøtte &amp; <em>FAQ.</em>", "Personvern, <em>helt åpent.</em>", "Opphavsrett &amp; <em>kreditering.</em>", "Gått deg vill i kløften?"
    ],
    fi: [
      "Etusivu", "Traileri", "Pelattavuus", "Kuvakaappaukset", "Olennot", "Luolat", "Ohjaus",
      "Valikko", "Tuki", "Tietosuoja", "Tekijänoikeus", "Valitse kieli",
      "Saatavilla Windowsille · 215 todistettua luolaa", "Kivet putoavat.", "Jalokivet nousevat.", "Kaiva fiksusti · Loista kirkkaasti.",
      "Sukella Milo Coppercapin kanssa vedenalaiseen pulmapeliin, jossa raskaat lohkareet putoavat alas, kristallit ja miinat kohoavat kattoon ja jokainen henkäys ratkaisee.",
      "Hanki Microsoft Storesta", "Katso traileri", "◆ Luolat", "Kaikki auki heti", "◈ Saalistajat", "5 rannikko + 3 syvänne",
      "★ Tasot", "Juniorista Distinguishediin", "◎ Kielet", "Käyttöliittymä ja ohje",
      "Näe syvyys <em>liikkeessä.</em>", "Aitoa pelikuvaa tulvivista kammioista, merimiinoista, ennakoiduista väijytyksistä ja ketjureaktioista 128 BPM chiptune-raidan <strong>Pixel Tides</strong> tahdissa.",
      "Ääni päälle", "Mykistä ääni", "Keskeytä GIF", "Toista GIF", "🔇 Klikkaa äänet päälle", "🔊 Ääni päällä",
      "Vastakkainen painovoima.<br><em>Puhdasta arcadetaktiikkaa.</em>", "Jokainen luola toimii tarkalla 180 ms simulaatiolla. Vesi ei koskaan valu pois — jokainen lohkare ja miina noudattaa selkeitä sääntöjä.",
      "KIVET UPPavat ↓", "JALOKIVET NOUSEVAT ↑", "ILMAKUPU",
      "Terävät siluetit.<br><em>Selkeä yhdellä silmäyksellä.</em>", "Kaikki kuvat (10)", "Vedenalaiset luolat (6)", "Valikot, opastus ja ohje (4)",
      "Kahdeksan saalistajaa.<br><em>Ei epäreiluja osumia.</em>", "Kaikki 8 lajia", "5 rannikkopetoa", "3 syvännelajia (21+)", "Perussäännöt", "⚡ Remix-tila",
      "Kaikki luolat avoinna.<br><em>Viisi vaikeustasoa.</em>", "Vuorovaikutteinen vaikeusvalitsin", "Junior", "Senior", "Principal", "Expert", "Distinguished",
      "Tarkka ohjaus.<br><em>Suunniteltu kaikille.</em>", "Tutustu alkuperäiseen Gemriftiin ↗",
      "Valmiina kääntämään luolan <span class=\"accent-cyan\">ylösalaisin?</span>", "215 vedenalaista luolaa, 8 olentoa, älykäs tarkistuspistekelaus ja chiptune-sukellus odottavat.",
      "Pelaajatuki &amp; <em>UKK.</em>", "Tietosuoja, <em>selkeästi.</em>", "Tekijänoikeudet &amp; <em>tekijät.</em>", "Eksyitkö railoon?"
    ],
    pl: [
      "Start", "Zwiastun", "Rozgrywka", "Zrzuty ekranu", "Stworzenia", "Jaskinie", "Sterowanie",
      "Menu", "Wsparcie", "Prywatność", "Prawa autorskie", "Wybierz język",
      "Już dostępne na Windows · 215 sprawdzonych jaskiń", "Głazy spadają.", "Klejnoty unoszą się.", "Kop z głową · Lśnij jasno.",
      "Zanurkuj z Milo Coppercapem w podwodnej grze logicznej, gdzie ciężkie głazy spadają w dół, uwolnione kryształy i miny płyną ku górze, a każdy oddech wyznacza trasę.",
      "Pobierz z Microsoft Store", "Zobacz zwiastun", "◆ Jaskinie", "Wszystkie otwarte od startu", "◈ Łowcy", "5 przybrzeżnych + 3 głębinowe",
      "★ Poziomy", "Od Junior do Distinguished", "◎ Języki", "Interfejs i pomoc",
      "Zobacz głębiny <em>w ruchu.</em>", "Prawdziwa rozgrywka wśród zalanych cystern, pływających min, sygnalizowanych zasadzek i reakcji łańcuchowych z muzyką chiptune <strong>Pixel Tides</strong>.",
      "Włącz dźwięk", "Wycisz", "Wstrzymaj GIF", "Odtwórz GIF", "🔇 Kliknij po dźwięk", "🔊 Dźwięk włączony",
      "Odwrócona grawitacja.<br><em>Czysta taktyka arcade.</em>", "Każda jaskinia działa w deterministycznej symulacji 180 ms. Woda nigdy nie odpływa — każdy głaz i mina przestrzega jasnych zasad.",
      "GŁAZY OPADAJĄ ↓", "KLEJNOTY WZNOSZĄ SIĘ ↑", "KOPUŁA POWIETRZA",
      "Wyraźne sylwetki.<br><em>Czytelne w mgnieniu oka.</em>", "Wszystkie ujęcia (10)", "Podwodne jaskinie (6)", "Menu, samouczek i pomoc (4)",
      "Ośmiu unikalnych łowców.<br><em>Zero nieczystych ciosów.</em>", "Wszystkie 8 gatunków", "5 drapieżników wybrzeża", "3 gatunki głębinowe (21+)", "Zasady standardowe", "⚡ Tryb Remix",
      "Każda jaskinia otwarta.<br><em>Pięć stopni mistrzostwa.</em>", "Interaktywny suwak trudności", "Junior", "Senior", "Principal", "Ekspert", "Distinguished",
      "Precyzyjne sterowanie.<br><em>Dla każdego gracza.</em>", "Odwiedź oryginalny Gemrift ↗",
      "Gotowy wywrócić jaskinię <span class=\"accent-cyan\">do góry nogami?</span>", "Czekają 215 podwodnych jaskiń, 8 stworzeń, inteligentne cofanie do punktu kontrolnego i brzmienie chiptune.",
      "Wsparcie i <em>FAQ.</em>", "Prywatność, <em>jasno i przejrzyście.</em>", "Prawa autorskie i <em>twórcy.</em>", "Zagubiony w szczelinie?"
    ],
    cs: [
      "Domů", "Trailer", "Hratelnost", "Snímky", "Tvorové", "Jeskyně", "Ovládání",
      "Nabídka", "Podpora", "Soukromí", "Autorská práva", "Vybrat jazyk",
      "Nyní pro Windows · 215 ověřených jeskyní", "Balvany padají.", "Drahokamy stoupají.", "Kopej chytře · Zaři jasně.",
      "Ponořte se s Milem Coppercapem do podvodního logického dobrodružství, kde těžké balvany padají dolů, krystaly a miny stoupají ke stropu a každý nádech rozhoduje.",
      "Získat v Microsoft Store", "Přehrát trailer", "◆ Jeskyně", "Všechny odemčené hned", "◈ Lovci", "5 pobřežních + 3 hlubinní",
      "★ Úrovně", "Junior až Distinguished", "◎ Jazyky", "Rozhraní a nápověda",
      "Poznejte hlubinu <em>v pohybu.</em>", "Skutečné záběry ze zatopených nádrží, plovoucích min, čitelných přepadů a řetězových explozí za doprovodu 128 BPM chiptune <strong>Pixel Tides</strong>.",
      "Zapnout zvuk", "Ztlumit zvuk", "Pozastavit GIF", "Přehrát GIF", "🔇 Klikněte pro zvuk", "🔊 Zvuk zapnut",
      "Opačná gravitace.<br><em>Čistá arkádová taktika.</em>", "Každá jeskyně běží na přesné 180ms simulaci. Voda nikdy neodtéká — každý balvan i mina se řídí jasnými pravidly.",
      "BALVANY KLESAJÍ ↓", "DRAHOKAMY STOUPAJÍ ↑", "VZDUCHOVÁ KOPULE",
      "Ostré siluety.<br><em>Čitelné na první pohled.</em>", "Všechny snímky (10)", "Podvodní jeskyně (6)", "Menu, výuka a nápověda (4)",
      "Osm různých lovců.<br><em>Žádné nefér zásahy.</em>", "Všech 8 druhů", "5 pobřežních dravců", "3 hlubinné druhy (21+)", "Standardní pravidla", "⚡ Režim Remix",
      "Každá jeskyně otevřená.<br><em>Pět stupňů mistrovství.</em>", "Interaktivní volič obtížnosti", "Junior", "Senior", "Principal", "Expert", "Distinguished",
      "Přesné ovládání.<br><em>Pro každého hráče.</em>", "Navštívit původní Gemrift ↗",
      "Připraveni obrátit jeskyni <span class=\"accent-cyan\">vzhůru nohama?</span>", "Čeká 215 podvodních jeskyní, 8 tvorů, chytré přetáčení k záchytnému bodu a chiptune ponor.",
      "Hráčská podpora a <em>FAQ.</em>", "Soukromí, <em>zcela přehledně.</em>", "Autorská práva a <em>tvůrci.</em>", "Ztraceni v průrvě?"
    ],
    sk: [
      "Domov", "Trailer", "Hrateľnosť", "Snímky", "Tvory", "Jaskyne", "Ovládanie",
      "Ponuka", "Podpora", "Súkromie", "Autorské práva", "Vybrať jazyk",
      "Teraz pre Windows · 215 overených jaskýň", "Balvany padajú.", "Drahokamy stúpajú.", "Kop múdro · Žiar jasno.",
      "Ponorte sa s Milom Coppercapom do podmorského logického dobrodružstva, kde ťažké balvany padajú nadol, kryštály a míny stúpajú k stropu a každý nádych rozhoduje.",
      "Získať v Microsoft Store", "Pozrieť trailer", "◆ Jaskyne", "Všetky otvorené od štartu", "◈ Lovci", "5 pobrežných + 3 hlbinné",
      "★ Úrovne", "Junior až Distinguished", "◎ Jazyky", "Rozhranie a pomocník",
      "Zažite hlbinu <em>v pohybe.</em>", "Skutočná hrateľnosť cez zatopené nádrže, míny, signalizované prepady a reťazové výbuchy s chiptune skladbou <strong>Pixel Tides</strong>.",
      "Zapnúť zvuk", "Stlmiť zvuk", "Pozastaviť GIF", "Prehrať GIF", "🔇 Kliknite pre zvuk", "🔊 Zvuk zapnutý",
      "Opačná gravitácia.<br><em>Čistá arkádová taktika.</em>", "Každá jaskyňa beží na presnej 180 ms simulácii. Voda nikdy neodteká — každý balvan a mína dodržiava jasné pravidlá.",
      "BALVANY KLESAJÚ ↓", "DRAHOKAMY STÚPAJÚ ↑", "VZDUCHOVÁ KOPULA",
      "Ostré siluety.<br><em>Čitateľné okamžite.</em>", "Všetky snímky (10)", "Podmorské jaskyne (6)", "Menu, výučba a pomoc (4)",
      "Osem odlišných lovcov.<br><em>Žiadne lacné zásahy.</em>", "Všetkých 8 druhov", "5 pobrežných dravcov", "3 hlbinné druhy (21+)", "Štandardné pravidlá", "⚡ Režim Remix",
      "Každá jaskyňa odomknutá.<br><em>Päť stupňov majstrovstva.</em>", "Interaktívny volič obtiažnosti", "Junior", "Senior", "Principal", "Expert", "Distinguished",
      "Presné ovládanie.<br><em>Pre každého hráča.</em>", "Navštíviť pôvodný Gemrift ↗",
      "Pripravení obrátiť jaskyňu <span class=\"accent-cyan\">hore nohami?</span>", "Čaká 215 podmorských jaskýň, 8 tvorov, inteligentné vrátenie na checkpoint a chiptune ponor.",
      "Podpora a <em>FAQ.</em>", "Súkromie, <em>jasne a zrozumiteľne.</em>", "Autorské práva a <em>tvorcovia.</em>", "Stratení v trhline?"
    ],
    hu: [
      "Kezdőlap", "Előzetes", "Játékmenet", "Képernyőképek", "Lények", "Barlangok", "Irányítás",
      "Menü", "Támogatás", "Adatvédelem", "Szerzői jog", "Nyelv választása",
      "Elérhető Windowsra · 215 igazolt barlang", "A sziklák zuhannak.", "A drágakövek emelkednek.", "Áss okosan · Ragyogj fényesen.",
      "Merülj alá Milo Coppercap oldalán egy víz alatti logikai kalandba, ahol a nehéz sziklák lezuhannak, a kristályok és aknák a plafon felé szállnak, és minden levegővétel számít.",
      "Letöltés a Microsoft Store-ból", "Előzetes megtekintése", "◆ Barlangok", "Mind nyitva induláskor", "◈ Vadászok", "5 part menti + 3 mélytengeri",
      "★ Szintek", "Juniortól Distinguishedig", "◎ Nyelvek", "Felület és súgó",
      "Lásd a mélységet <em>mozgásban.</em>", "Valódi játékmenet elárasztott ciszternákban, lebegő aknákkal, előre jelzett rajtaütésekkel és láncreakciókkal a <strong>Pixel Tides</strong> 128 BPM-es chiptune zenéjére.",
      "Hang bekapcsolása", "Némítás", "GIF szünet", "GIF lejátszása", "🔇 Kattints a hangért", "🔊 Hang bekapcsolva",
      "Fordított gravitáció.<br><em>Tiszta árkád taktika.</em>", "Minden barlang 180 ms-os determinisztikus szimuláción fut. A víz sosem folyik el — minden szikla és akna kristálytiszta szabályokat követ.",
      "SZIKLÁK SÜLLYEDNEK ↓", "ÉKKÖVEK EMELKEDNEK ↑", "LEVEGŐKUPOLA",
      "Éles sziluettek.<br><em>Első pillantásra átlátható.</em>", "Összes kép (10)", "Víz alatti barlangok (6)", "Menük, oktató és súgó (4)",
      "Nyolc egyedi ragadozó.<br><em>Nincs igazságtalan találat.</em>", "Mind a 8 faj", "5 parti ragadozó", "3 mélytengeri faj (21+)", "Alapszabályok", "⚡ Remix mód",
      "Minden barlang nyitva.<br><em>Öt nehézségi fokozat.</em>", "Interaktív nehézségválasztó", "Junior", "Senior", "Principal", "Szakértő", "Kiváló",
      "Pontos irányítás.<br><em>Minden játékosnak.</em>", "Az eredeti Gemrift megtekintése ↗",
      "Készen állsz a feje tetejére <span class=\"accent-cyan\">állítani a barlangot?</span>", "215 víz alatti barlang, 8 lény, okos visszatekerés és chiptune merülés vár.",
      "Játékostámogatás és <em>GYIK.</em>", "Adatvédelem, <em>érthetően.</em>", "Szerzői jog és <em>stáblista.</em>", "Eltévedtél a hasadékban?"
    ],
    ro: [
      "Acasă", "Trailer", "Gameplay", "Capturi", "Creaturi", "Peșteri", "Controale",
      "Meniu", "Asistență", "Confidențialitate", "Copyright", "Alege limba",
      "Disponibil pe Windows · 215 peșteri demonstrate", "Bolovanii cad.", "Nestematele urcă.", "Sapă inteligent · Strălucește puternic.",
      "Scufundă-te alături de Milo Coppercap într-o aventură puzzle subacvatică în care bolovanii grei cad, cristalele și minele plutesc spre tavan, iar fiecare respirație contează.",
      "Descarcă din Microsoft Store", "Vezi trailerul", "◆ Peșteri", "Toate deschise de la început", "◈ Vânători", "5 de coastă + 3 abisali",
      "★ Niveluri", "De la Junior la Distinguished", "◎ Limbi", "Interfață și ajutor",
      "Privește abisul <em>în mișcare.</em>", "Gameplay autentic prin cisterne inundate, mine plutitoare, ambuscade semnalizate și reacții în lanț pe ritmul chiptune <strong>Pixel Tides</strong>.",
      "Activează sunetul", "Oprește sunetul", "Pauză GIF", "Redă GIF", "🔇 Clic pentru sunet", "🔊 Sunet activ",
      "Gravitație opusă.<br><em>Tactică arcade pură.</em>", "Fiecare peșteră rulează pe o simulare deterministă la 180 ms. Apa rămâne fixă — fiecare dop de mâl și bolovan respectă reguli clare.",
      "BOLOVANII COBOARĂ ↓", "NESTEMATELE URCĂ ↑", "DOM DE AER",
      "Siluete clare.<br><em>Lizibile dintr-o privire.</em>", "Toate capturile (10)", "Peșteri subacvatice (6)", "Meniuri, tutorial și ajutor (4)",
      "Opt vânători distincți.<br><em>Fără lovituri nedrepte.</em>", "Toate cele 8 specii", "5 prădători de coastă", "3 specii abisale (21+)", "Reguli standard", "⚡ Mod Remix",
      "Toate peșterile deschise.<br><em>Cinci trepte de măiestrie.</em>", "Selector interactiv de dificultate", "Junior", "Senior", "Principal", "Expert", "Distins",
      "Control precis.<br><em>Pentru orice jucător.</em>", "Vizitează Gemrift original ↗",
      "Gata să întorci caverna <span class=\"accent-cyan\">cu susul în jos?</span>", "Te așteaptă 215 peșteri subacvatice, 8 creaturi, derulare la checkpoint și muzică chiptune.",
      "Asistență și <em>Întrebări frecvente.</em>", "Confidențialitate, <em>pe înțelesul tuturor.</em>", "Drepturi de autor și <em>credite.</em>", "Rătăcit în falie?"
    ],
    el: [
      "Αρχική", "Τρέιλερ", "Gameplay", "Στιγμιότυπα", "Πλάσματα", "Σπήλαια & Λειτουργίες", "Χειρισμός",
      "Μενού", "Υποστήριξη", "Απόρρητο", "Πνευματικά δικαιώματα", "Επιλογή γλώσσας",
      "Διαθέσιμο για Windows · 215 αποδεδειγμένα σπήλαια", "Οι βράχοι πέφτουν.", "Τα πετράδια ανεβαίνουν.", "Σκάψε έξυπνα · Λάμψε δυνατά.",
      "Βουτήξτε με τον Milo Coppercap σε μια υποβρύχια περιπέτεια γρίφων όπου οι βράχοι πέφτουν κάτω, οι κρύσταλλοι και οι νάρκες ανεβαίνουν προς την οροφή και κάθε ανάσα μετράει.",
      "Αποκτήστε το στο Microsoft Store", "Δείτε το τρέιλερ", "◆ Σπήλαια", "Όλα ανοιχτά από την αρχή", "◈ Κυνηγοί", "5 παράκτιοι + 3 αβύσσου",
      "★ Επίπεδα", "Junior έως Distinguished", "◎ Γλώσσες", "Μενού και βοήθεια",
      "Δείτε την άβυσσο <em>σε κίνηση.</em>", "Πραγματικό gameplay σε πλημμυρισμένες δεξαμενές, νάρκες, προειδοποιημένες ενέδρες και αλυσιδωτές εκρήξεις με το chiptune <strong>Pixel Tides</strong>.",
      "Ενεργοποίηση ήχου", "Σίγαση", "Παύση GIF", "Αναπαραγωγή GIF", "🔇 Κλικ για ήχο", "🔊 Ήχος ενεργός",
      "Αντίθετη βαρύτητα.<br><em>Καθαρή arcade τακτική.</em>", "Κάθε σπήλαιο τρέχει σε ντετερμινιστική προσομοίωση 180 ms. Το νερό μένει σταθερό — κάθε βράχος και νάρκη ακολουθεί ξεκάθαρους κανόνες.",
      "ΒΡΑΧΟΙ ΒΥΘΙΖΟΝΤΑΙ ↓", "ΠΕΤΡΑΔΙΑ ΑΝΕΒΑΙΝΟΥΝ ↑", "ΘΟΛΟΣ ΑΕΡΑ",
      "Καθαρές σιλουέτες.<br><em>Ευανάγνωστες με μια ματιά.</em>", "Όλες οι λήψεις (10)", "Υποβρύχια σπήλαια (6)", "Μενού, οδηγός & βοήθεια (4)",
      "Οκτώ ξεχωριστοί κυνηγοί.<br><em>Μηδέν άδικα χτυπήματα.</em>", "Και τα 8 είδη", "5 παράκτια αρπακτικά", "3 είδη αβύσσου (21+)", "Τυπικοί κανόνες", "⚡ Λειτουργία Remix",
      "Κάθε σπήλαιο ανοιχτό.<br><em>Πέντε επίπεδα δυσκολίας.</em>", "Διαδραστικός επιλογέας δυσκολίας", "Junior", "Senior", "Principal", "Expert", "Distinguished",
      "Ακριβής χειρισμός.<br><em>Για κάθε παίκτη.</em>", "Επισκεφθείτε το αρχικό Gemrift ↗",
      "Έτοιμοι να φέρετε τη σπηλιά <span class=\"accent-cyan\">τα πάνω κάτω;</span>", "215 υποβρύχια σπήλαια, 8 πλάσματα, έξυπνη επαναφορά σημείου ελέγχου και chiptune ρυθμός σας περιμένουν.",
      "Υποστήριξη &amp; <em>Συχνές ερωτήσεις.</em>", "Απόρρητο, <em>με απλά λόγια.</em>", "Πνευματικά δικαιώματα &amp; <em>συντελεστές.</em>", "Χαθήκατε στο ρήγμα;"
    ],
    ru: [
      "Главная", "Трейлер", "Геймплей", "Скриншоты", "Существа", "Пещеры и Режимы", "Управление",
      "Меню", "Поддержка", "Конфиденциальность", "Авторы и права", "Выбрать язык",
      "Уже доступно для Windows · 215 проверенных пещер", "Камни падают.", "Кристаллы всплывают.", "Копай с умом · Сияй ярко.",
      "Погрузитесь вместе с Майло Копперкэпом в подводное головоломное приключение, где тяжёлые валуны падают вниз, кристаллы и мины поднимаются к потолку, а каждый глоток воздуха решает маршрут.",
      "Скачать в Microsoft Store", "Смотреть трейлер", "◆ Пещеры", "Все открыты сразу", "◈ Хищники", "5 прибрежных + 3 глубинных",
      "★ Уровни", "От Junior до Distinguished", "◎ Языки", "Интерфейс и справка",
      "Бездна <em>в движении.</em>", "Реальный геймплей в затопленных гротах: минные шлюзы, предупреждаемые засады и цепные взрывы под оригинальный 128 BPM чиптюн <strong>Pixel Tides</strong>.",
      "Включить звук", "Выключить звук", "Пауза GIF", "Играть GIF", "🔇 Нажмите для звука", "🔊 Звук включён",
      "Обратная гравитация.<br><em>Чистая аркадная тактика.</em>", "Каждая пещера работает на точной 180-мс симуляции. Вода не убывает — каждый валун и мина подчиняются чётким правилам.",
      "ВАЛУНЫ ТОНУТ ↓", "САМОЦВЕТЫ ВСПЛЫВАЮТ ↑", "КУПОЛ ВОЗДУХА",
      "Чёткие силуэты.<br><em>Читаемость с первого взгляда.</em>", "Все кадры (10)", "Подводные пещеры (6)", "Меню, обучение и справка (4)",
      "Восемь особых охотников.<br><em>Никаких нечестных ударов.</em>", "Все 8 видов", "5 прибрежных хищников", "3 глубоководных вида (21+)", "Стандартные правила", "⚡ Режим Remix",
      "Все пещеры открыты.<br><em>Пять ступеней мастерства.</em>", "Интерактивный выбор сложности", "Младший", "Старший", "Ведущий", "Эксперт", "Мастер",
      "Отзывчивое управление.<br><em>Для каждого игрока.</em>", "Оригинальный Gemrift ↗",
      "Готовы перевернуть пещеру <span class=\"accent-cyan\">вверх дном?</span>", "Вас ждут 215 подводных пещер, 8 существ, умная перемотка к чекпоинту и чиптюн-погружение.",
      "Поддержка и <em>FAQ.</em>", "Конфиденциальность, <em>без скрытого.</em>", "Авторские права и <em>создатели.</em>", "Заблудились в разломе?"
    ],
    uk: [
      "Головна", "Трейлер", "Геймплей", "Скріншоти", "Істоти", "Печери й Режими", "Керування",
      "Меню", "Підтримка", "Конфіденційність", "Авторські права", "Обрати мову",
      "Вже для Windows · 215 перевірених печер", "Камені падають.", "Самоцвіти злітають.", "Копай розумно · Сяй яскраво.",
      "Пірнайте з Майло Копперкепом у підводну головоломку, де важкі валуни падають униз, кристали й міни спливають до стелі, а кожен ковток повітря формує маршрут.",
      "Завантажити в Microsoft Store", "Дивитися трейлер", "◆ Печери", "Усі відкриті одразу", "◈ Мисливці", "5 прибережних + 3 глибинні",
      "★ Рівні", "Від Junior до Distinguished", "◎ Мови", "Інтерфейс і довідка",
      "Побачте безодню <em>в русі.</em>", "Реальний геймплей серед затоплених цистерн, плавучих мін, попереджених засідок і ланцюгових вибухів під 128 BPM чіптюн <strong>Pixel Tides</strong>.",
      "Увімкнути звук", "Вимкнути звук", "Пауза GIF", "Відтворити GIF", "🔇 Натисніть для звуку", "🔊 Звук увімкнено",
      "Зворотна гравітація.<br><em>Чиста аркадна тактика.</em>", "Кожна печера працює на точній 180-мс симуляції. Вода залишається на місці — кожен валун і міна діють за прозорими правилами.",
      "ВАЛУНИ ТОНУТЬ ↓", "САМОЦВІТИ СПЛИВАЮТЬ ↑", "КУПОЛ ПОВІТРЯ",
      "Чіткі силуети.<br><em>Зрозуміло з першого погляду.</em>", "Усі знімки (10)", "Підводні печери (6)", "Меню, навчання й довідка (4)",
      "Вісім унікальних хижаків.<br><em>Жодних нечесних ударів.</em>", "Усі 8 видів", "5 прибережних хижаків", "3 глибоководні види (21+)", "Стандартні правила", "⚡ Режим Remix",
      "Кожна печера відкрита.<br><em>П'ять рівнів майстерності.</em>", "Інтерактивний вибір складності", "Молодший", "Старший", "Провідний", "Експерт", "Видатний",
      "Чуйне керування.<br><em>Для кожного гравця.</em>", "Відвідати оригінальний Gemrift ↗",
      "Готові перевернути печеру <span class=\"accent-cyan\">догори дриґом?</span>", "На вас чекають 215 підводних печер, 8 істот, розумне повернення до чекпойнта та чіптюн-драйв.",
      "Підтримка та <em>FAQ.</em>", "Конфіденційність, <em>відкрито й чесно.</em>", "Авторські права та <em>подяки.</em>", "Заблукали у розломі?"
    ],
    bg: [
      "Начало", "Трейлър", "Геймплей", "Екранни снимки", "Същества", "Пещери и Режими", "Управление",
      "Меню", "Поддръжка", "Поверителност", "Авторски права", "Избор на език",
      "Вече за Windows · 215 доказани пещери", "Скалите падат.", "Кристалите се издигат.", "Копай умно · Блести ярко.",
      "Потопете се с Майло Копъркап в подводно пъзел приключение, където тежките скали падат надолу, кристалите и мините плуват нагоре, а всяка глътка въздух е част от пъзела.",
      "Изтегли от Microsoft Store", "Гледай трейлъра", "◆ Пещери", "Всички отключени веднага", "◈ Ловци", "5 крайбрежни + 3 дълбоководни",
      "★ Нива", "Junior до Distinguished", "◎ Езици", "Интерфейс и помощ",
      "Вижте бездната <em>в движение.</em>", "Реален геймплей през наводнени зали, плаващи мини, предупредени засади и верижни експлозии с 128 BPM чиптюн <strong>Pixel Tides</strong>.",
      "Включи звука", "Заглуши", "Пауза GIF", "Пусни GIF", "🔇 Кликни за звук", "🔊 Звукът е включен",
      "Обратна гравитация.<br><em>Чиста аркадна тактика.</em>", "Всяка пещера работи с детерминистична 180 ms симулация. Водата остава фиксирана — всяка скала и мина следва ясни правила.",
      "СКАЛИТЕ ПОТЪВАТ ↓", "КРИСТАЛИТЕ ПЛУВАТ ↑", "ВЪЗДУШЕН КУПОЛ",
      "Ясни силуети.<br><em>Четими от пръв поглед.</em>", "Всички кадри (10)", "Подводни пещери (6)", "Менюта, урок и помощ (4)",
      "Осем различни хищника.<br><em>Без нечестни удари.</em>", "Всички 8 вида", "5 крайбрежни хищника", "3 дълбоководни вида (21+)", "Стандартни правила", "⚡ Режим Remix",
      "Всяка пещера е отворена.<br><em>Пет нива на майсторство.</em>", "Интерактивен избор на трудност", "Младши", "Старши", "Водещ", "Експерт", "Отличен",
      "Прецизно управление.<br><em>За всеки играч.</em>", "Към оригиналния Gemrift ↗",
      "Готови ли сте да обърнете пещерата <span class=\"accent-cyan\">с главата надолу?</span>", "215 подводни пещери, 8 същества, умно връщане до чекпойнт и чиптюн приключение ви очакват.",
      "Поддръжка и <em>ЧЗВ.</em>", "Поверителност, <em>ясно и точно.</em>", "Авторски права и <em>заслуги.</em>", "Изгубени в разлома?"
    ],
    ar: [
      "الرئيسية", "العرض", "طريقة اللعب", "اللقطات", "الكائنات", "الكهوف والأطوار", "التحكم",
      "القائمة", "الدعم", "الخصوصية", "الحقوق والاعتمادات", "اختر اللغة",
      "متوفرة الآن لويندوز · 215 كهفاً مُثبتاً", "الصخور تسقط.", "الجواهر ترتفع.", "احفر بذكاء · وتألّق بقوة.",
      "انغمس مع مايلو كوبركاب في مغامرة ألغاز تحت الماء حيث تهوي الصخور الثقيلة للأسفل، وتطفو البلورات والألغام البحرية نحو السقف، وكل نَفَس يحدد مسارك.",
      "احصل عليها من Microsoft Store", "شاهد العرض", "◆ كهوف", "جميعها مفتوحة منذ البداية", "◈ صيادون", "5 ساحلية + 3 في الأعماق",
      "★ مستويات", "من مبتدئ إلى متميّز", "◎ لغة", "لغات الواجهة والمساعدة",
      "شاهد الأعماق <em>أثناء الحركة.</em>", "لعب حقيقي عبر الخزانات المغمورة وأقفال الألغام والكمائن المُعلنة والانفجارات المتسلسلة على إيقاع موسيقى <strong>Pixel Tides</strong>.",
      "تشغيل الصوت", "كتم الصوت", "إيقاف GIF", "تشغيل GIF", "🔇 انقر لتشغيل الصوت", "🔊 الصوت يعمل",
      "جاذبية معكوسة.<br><em>تكتيك أركيد خالص.</em>", "يعمل كل كهف بمحاكاة حتمية كل 180 مللي ثانية. يبقى الماء ثابتاً — وكل صخرة ولغم يتبع قواعد واضحة.",
      "الصخور تغرق ↓", "الجواهر ترتفع ↑", "قبة هواء",
      "ملامح واضحة.<br><em>مقروءة من أول نظرة.</em>", "كل اللقطات (10)", "كهوف تحت الماء (6)", "القوائم والشرح والمساعدة (4)",
      "ثمانية مفترسين فريدين.<br><em>بلا ضربات غادرة.</em>", "كل الأنواع الـ8", "5 مفترسات ساحلية", "3 كائنات أعماق (21+)", "القواعد القياسية", "⚡ طور الريمكس",
      "كل الكهوف مفتوحة.<br><em>خمس درجات للإتقان.</em>", "محدد الصعوبة التفاعلي", "مبتدئ", "متمرس", "رئيسي", "خبير", "متميّز",
      "تحكم دقيق.<br><em>مصمم لكل لاعب.</em>", "زيارة Gemrift الأصلية ↗",
      "هل أنت مستعد لقلب الكهف <span class=\"accent-cyan\">رأساً على عقب؟</span>", "215 كهفاً تحت الماء، 8 كائنات واضحة الإشارات، وإرجاع ذكي لنقطة الحفظ بانتظارك.",
      "دعم اللاعبين و<em>الأسئلة الشائعة.</em>", "الخصوصية، <em>بكل وضوح.</em>", "حقوق النشر و<em>الاعتمادات.</em>", "أضللت الطريق في الصدع؟"
    ],
    he: [
      "ראשי", "טריילר", "משחקיות", "צילומי מסך", "יצורים", "מערות ומצבים", "שליטה",
      "תפריט", "תמיכה", "פרטיות", "זכויות וקרדיטים", "בחר שפה",
      "זמין כעת ל-Windows · 215 מערות מוכחות", "סלעים נופלים.", "יהלומים עולים.", "חפור בחוכמה · זהר בעוצמה.",
      "צללו עם מיילו קופרקאפ להרפתקת פאזלים תת-ימית שבה סלעים כבדים צונחים מטה, גבישים ומוקשים צפים אל התקרה וכל נשימת אוויר קובעת את המסלול.",
      "להורדה מ-Microsoft Store", "צפה בטריילר", "◆ מערות", "כולן פתוחות מהרגע הראשון", "◈ ציידים", "5 חופיים + 3 מעמקים",
      "★ רמות", "מ-Junior עד Distinguished", "◎ שפות", "שפות ממשק ועזרה",
      "ראו את המעמקים <em>בתנועה.</em>", "משחקיות אמיתית בין בריכות מוצפות, מוקשים צפים, מארבים מתוזמנים ופיצוצי שרשרת לצלילי <strong>Pixel Tides</strong>.",
      "הפעל צליל", "השתק צליל", "השהה GIF", "נגן GIF", "🔇 לחץ להפעלת צליל", "🔊 צליל פעיל",
      "כבידה הפוכה.<br><em>טקטיקת ארקייד טהורה.</em>", "כל מערה פועלת בסימולציה דטרמיניסטית של 180 מ״ש. המים קבועים במקומם — כל סלע ומוקש פועלים לפי חוקים ברורים.",
      "סלעים שוקעים ↓", "יהלומים עולים ↑", "כיפת אוויר",
      "צלליות חדות.<br><em>קריאות במבט ראשון.</em>", "כל התמונות (10)", "מערות תת-ימיות (6)", "תפריטים, הדרכה ועזרה (4)",
      "שמונה ציידים ייחודיים.<br><em>אפס פגיעות לא הוגנות.</em>", "כל 8 המינים", "5 טורפי חוף", "3 מומחי מעמקים (21+)", "חוקים רגילים", "⚡ מצב רמיקס",
      "כל מערה פתוחה.<br><em>חמש דרגות מיומנות.</em>", "בורר קושי אינטראקטיבי", "מתחיל", "מתקדם", "ראשי", "מומחה", "מצטיין",
      "שליטה מדויקת.<br><em>לכל שחקן.</em>", "בקרו ב-Gemrift המקורי ↗",
      "מוכנים להפוך את המערה <span class=\"accent-cyan\">על פיה?</span>", "215 מערות תת-ימיות, 8 יצורים מתריעים, חזרה חכמה לנקודת שמירה וצלילי צ'יפטיון מחכים לכם.",
      "תמיכה ו<em>שאלות נפוצות.</em>", "פרטיות, <em>בשקיפות מלאה.</em>", "זכויות יוצרים ו<em>קרדיטים.</em>", "הלכתם לאיבוד בבקע?"
    ],
    fa: [
      "خانه", "تریلر", "گیم‌پلی", "تصاویر", "موجودات", "غارها و حالت‌ها", "کنترل‌ها",
      "منو", "پشتیبانی", "حریم خصوصی", "حقوق و دست‌اندرکاران", "انتخاب زبان",
      "هم‌اکنون برای ویندوز · ۲۱۵ غار اثبات‌شده", "سنگ‌ها می‌افتند.", "جواهرات بالا می‌روند.", "هوشمندانه حفر کن · درخشان بدرخش.",
      "با مایلو کاپرکپ به ماجراجویی معمایی زیر آب شیرجه بزنید؛ جایی که تختهخیصه‌های سنگین فرومی‌افتند، کریستال‌ها و مین‌ها به سوی سقف شناور می‌شوند و هر نفس مسیرتان را می‌سازد.",
      "دریافت از Microsoft Store", "تماشای تریلر", "◆ غارها", "همه از ابتدا باز", "◈ شکارچیان", "۵ ساحلی + ۳ اعماق",
      "★ درجه‌ها", "از مبتدی تا ممتاز", "◎ زبان", "زبان‌های رابط و راهنما",
      "اعماق را <em>در حرکت</em> ببینید.", "گیم‌پلی واقعی در مخازن غرق‌شده، قفل‌های مین، کمین‌های هشداردار و انفجارهای زنجیره‌ای با موسیقی چیپ‌تیون <strong>Pixel Tides</strong>.",
      "فعال‌سازی صدا", "قطع صدا", "توقف GIF", "پخش GIF", "🔇 برای صدا کلیک کنید", "🔊 صدا روشن",
      "گرانش معکوس.<br><em>تاکتیک خالص آرکید.</em>", "هر غار با شبیه‌سازی دقیق ۱۸۰ میلی‌ثانیه‌ای اجرا می‌شود. آب هرگز تخلیه نمی‌شود و هر سنگ و مین از قوانین شفاف پیروی می‌کند.",
      "سنگ‌ها فرومی‌روند ↓", "جواهرات بالا می‌روند ↑", "گنبد هوا",
      "سیلوئت‌های شفاف.<br><em>خوانا در یک نگاه.</em>", "همه تصاویر (۱۰)", "غارهای زیرآبی (۶)", "منوها، آموزش و راهنما (۴)",
      "هشت شکارچی متمایز.<br><em>بدون ضربه ناعادلانه.</em>", "همه ۸ گونه", "۵ شکارچی ساحلی", "۳ متخصص اعماق (۲۱+)", "قوانین استاندارد", "⚡ حالت ریمیکس",
      "همه غارها بازند.<br><em>پنج سطح مهارت.</em>", "انتخابگر تعاملی دشواری", "مبتدی", "ارشد", "اصلی", "خبره", "ممتاز",
      "کنترل‌های دقیق.<br><em>برای هر بازیکن.</em>", "مشاهده Gemrift اصلی ↗",
      "آماده‌اید غار را <span class=\"accent-cyan\">وارونه کنید؟</span>", "۲۱۵ غار زیرآبی، ۸ موجود هشداردهنده، بازگشت هوشمند به چک‌پوینت و موسیقی چیپ‌تیون منتظر شماست.",
      "پشتیبانی و <em>پرسش‌های متداول.</em>", "حریم خصوصی، <em>شفاف و روشن.</em>", "حق نشر و <em>دست‌اندرکاران.</em>", "در شکاف گم شده‌اید؟"
    ],
    hi: [
      "होम", "ट्रेलर", "गेमप्ले", "स्क्रीनशॉट", "जीव", "गुफाएँ और मोड", "नियंत्रण",
      "मेनू", "सहायता", "गोपनीयता", "कॉपीराइट और श्रेय", "भाषा चुनें",
      "Windows के लिए उपलब्ध · 215 प्रमाणित गुफाएँ", "चट्टानें गिरती हैं।", "रत्न ऊपर उठते हैं।", "समझदारी से खोदें · तेज़ चमकें।",
      "माइलो कॉपरकैप के साथ पानी के नीचे पहेली रोमांच में गोता लगाएँ जहाँ भारी पत्थर नीचे गिरते हैं, रत्न और समुद्री बारूदी सुरंगें छत की ओर तैरती हैं, और हर साँस मायने रखती है।",
      "Microsoft Store से पाएं", "ट्रेलर देखें", "◆ गुफाएँ", "शुरू से सभी खुली", "◈ शिकारी", "5 तटीय + 3 गहरे समुद्र",
      "★ स्तर", "Junior से Distinguished", "◎ भाषाएँ", "UI और सहायता भाषाएँ",
      "गहराई को <em>गति में</em> देखें।", "डूबे हुए कक्षों, तैरती सुरंगों, चेतावनी वाले हमलों और श्रृंखला विस्फोटों का असली गेमप्ले — 128 BPM चिपट्यून <strong>Pixel Tides</strong> के साथ।",
      "आवाज़ चालू करें", "म्यूट करें", "GIF रोकें", "GIF चलाएँ", "🔇 आवाज़ के लिए क्लिक करें", "🔊 आवाज़ चालू",
      "विपरीत गुरुत्वाकर्षण।<br><em>शुद्ध आर्केड रणनीति।</em>", "हर गुफा 180 ms सिमुलेशन पर चलती है। पानी कभी खाली नहीं होता — हर पत्थर और सुरंग स्पष्ट नियमों का पालन करती है।",
      "चट्टानें डूबती हैं ↓", "रत्न उठते हैं ↑", "वायु गुंबद",
      "स्पष्ट आकृतियाँ।<br><em>एक नज़र में पठनीय।</em>", "सभी चित्र (10)", "पानी के नीचे की गुफाएँ (6)", "मेनू, ट्यूटोरियल और मदद (4)",
      "आठ अनोखे शिकारी।<br><em>कोई धोखे का वार नहीं।</em>", "सभी 8 प्रजातियाँ", "5 तटीय शिकारी", "3 गहरे समुद्र के जीव (21+)", "मानक नियम", "⚡ रीमिक्स मोड",
      "हर गुफा खुली है।<br><em>पाँच कठिनाई स्तर।</em>", "इंटरैक्टिव कठिनाई चयनकर्ता", "जूनियर", "सीनियर", "प्रिंसिपल", "एक्सपर्ट", "विशिष्ट",
      "सटीक नियंत्रण।<br><em>हर खिलाड़ी के लिए।</em>", "मूल Gemrift देखें ↗",
      "क्या गुफा को <span class=\"accent-cyan\">उलटने</span> के लिए तैयार हैं?", "215 समुद्री गुफाएँ, 8 जीव, स्मार्ट चेकपॉइंट रिवाइंड और चिपट्यून संगीत आपका इंतज़ार कर रहे हैं।",
      "खिलाड़ी सहायता और <em>सामान्य प्रश्न।</em>", "गोपनीयता, <em>बिल्कुल स्पष्ट।</em>", "कॉपीराइट और <em>श्रेय।</em>", "दरार में खो गए?"
    ],
    bn: [
      "হোম", "ট্রেলার", "গেমপ্লে", "স্ক্রিনশট", "প্রাণী", "গুহা ও মোড", "নিয়ন্ত্রণ",
      "মেনু", "সহায়তা", "গোপনীয়তা", "কপিরাইট ও কৃতিত্ব", "ভাষা নির্বাচন করুন",
      "Windows-এ উপলব্ধ · ২১৫টি প্রমাণিত গুহা", "পাথর নিচে পড়ে।", "রত্ন উপরে ভাসে।", "বুদ্ধি করে খুঁড়ুন · উজ্জ্বল হয়ে জ্বলুন।",
      "মাইলো কপারক্যাপের সাথে ডুব দিন এক পানির নিচের ধাঁধার অভিযানে, যেখানে ভারী পাথর নিচে পড়ে, রত্ন ও মাইন ছাদের দিকে ভেসে ওঠে এবং প্রতিটি শ্বাস আপনার পথ ঠিক করে।",
      "Microsoft Store থেকে নিন", "ট্রেলার দেখুন", "◆ গুহা", "শুরু থেকেই সব খোলা", "◈ শিকারি", "৫ উপকূলীয় + ৩ গভীর সমুদ্র",
      "★ স্তর", "Junior থেকে Distinguished", "◎ ভাষা", "UI ও সহায়তা ভাষা",
      "গভীর সমুদ্রকে <em>গতিতে</em> দেখুন।", "প্লাবিত কক্ষ, ভাসমান মাইন, সতর্কবার্তাসহ ফাঁদ ও চেইন বিস্ফোরণের আসল গেমপ্লে — ১২৮ BPM চিপটিউন <strong>Pixel Tides</strong>-এর সাথে।",
      "শব্দ চালু করুন", "শব্দ বন্ধ", "GIF থামান", "GIF চালান", "🔇 শব্দের জন্য ক্লিক করুন", "🔊 শব্দ চালু",
      "বিপরীত মাধ্যাকর্ষণ।<br><em>খাঁটি আর্কেড কৌশল।</em>", "প্রতিটি গুহা ১৮০ মিলিসেকেন্ডের নিখুঁত সিমুলেশনে চলে। পানি কখনো সরে যায় না — প্রতিটি পাথর ও মাইন স্পষ্ট নিয়ম মানে।",
      "পাথর ডোবে ↓", "রত্ন ওঠে ↑", "বায়ু গম্বুজ",
      "স্পষ্ট অবয়ব।<br><em>এক নজরে বোঝা যায়।</em>", "সব ছবি (১০)", "পানির নিচের গুহা (৬)", "মেনু, টিউটোরিয়াল ও সাহায্য (৪)",
      "আটটি ভিন্ন শিকারি।<br><em>কোনো অন্যায্য আঘাত নেই।</em>", "সব ৮ প্রজাতি", "৫ উপকূলীয় শিকারি", "৩ গভীর সমুদ্রের প্রাণী (২১+)", "সাধারণ নিয়ম", "⚡ রিমিক্স মোড",
      "প্রতিটি গুহা উন্মুক্ত।<br><em>পাঁচটি দক্ষতার স্তর।</em>", "ইন্টারঅ্যাক্টিভ কঠিনতা নির্বাচক", "জুনিয়র", "সিনিয়র", "প্রিন্সিপাল", "এক্সপার্ট", "ডিস্টিংগুইশড",
      "নিখুঁত নিয়ন্ত্রণ।<br><em>সব খেলোয়াড়ের জন্য।</em>", "মূল Gemrift দেখুন ↗",
      "গুহাটিকে <span class=\"accent-cyan\">উল্টে দিতে</span> প্রস্তুত?", "২১৫টি ডুবো গুহা, ৮টি প্রাণী, স্মার্ট চেকপয়েন্ট রিওয়াইন্ড ও চিপটিউন রোমাঞ্চ অপেক্ষা করছে।",
      "সহায়তা ও <em>প্রশ্নোত্তর।</em>", "গোপনীয়তা, <em>সহজ ভাষায়।</em>", "কপিরাইট ও <em>কৃতিত্ব।</em>", "ফাটলে হারিয়ে গেছেন?"
    ],
    "zh-CN": [
      "首页", "预告片", "玩法机制", "游戏截图", "深海生物", "洞穴与模式", "操作指南",
      "菜单", "支持", "隐私", "版权与致谢", "选择语言",
      "Windows 现已推出 · 215 座经过验证的洞穴", "巨石下坠。", "宝石升腾。", "智掘迷窟 · 璀璨生辉。",
      "与米洛·铜帽一起潜入水下解谜冒险：沉重的巨石向下坠落，释放的水晶与水雷向洞顶浮升，每一次换气都决定你的路线。",
      "前往 Microsoft Store 获取", "观看预告片", "◆ 洞穴", "首发全部解锁", "◈ 猎手", "5 种近海 + 3 种深海",
      "★ 难度", "从初级到大师", "◎ 语言", "界面与帮助语言",
      "见证深渊<em>律动。</em>", "真实实机画面：淹没蓄水池、浮力水雷锁、预警伏击与连锁爆破，配以 128 BPM 原创芯片音乐 <strong>Pixel Tides</strong>。",
      "开启声音", "静音", "暂停 GIF", "播放 GIF", "🔇 点击开启声音", "🔊 声音已开启",
      "反向引力。<br><em>纯粹街机策略。</em>", "每座洞穴均以 180 毫秒确定性模拟运行。水体固定不流失——每一块泥塞、巨石与水雷都遵循清晰规则。",
      "巨石下沉 ↓", "宝石上升 ↑", "气室穹顶",
      "利落剪影。<br><em>一眼清晰可读。</em>", "全部截图 (10)", "水下洞穴 (6)", "菜单、教程与帮助 (4)",
      "八种独特猎手。<br><em>零暗算偷袭。</em>", "全部 8 个物种", "5 种近海掠食者", "3 种深海专家 (21+)", "标准规则", "⚡ 混音模式",
      "215 关全部开放。<br><em>五档大师节奏。</em>", "交互式难度滑块", "初级", "资深", "首席", "专家", "卓越",
      "清脆手感。<br><em>为每位玩家打造。</em>", "访问初代 Gemrift ↗",
      "准备好把洞穴<span class=\"accent-cyan\">彻底颠倒</span>了吗？", "215 座水下洞穴、8 种预警生物、智能检查点回溯与芯片音乐之旅正等待着你。",
      "玩家支持与<em>常见问题。</em>", "隐私说明，<em>一目了然。</em>", "版权与<em>致谢名单。</em>", "在裂隙中迷路了？"
    ],
    ja: [
      "ホーム", "トレーラー", "ゲーム内容", "スクリーンショット", "生物図鑑", "洞窟＆モード", "操作方法",
      "メニュー", "サポート", "プライバシー", "著作権・クレジット", "言語を選択",
      "Windows 向けに配信中 · 実証済み全 215 洞窟", "岩は落ちる。", "宝石は昇る。", "賢く掘って、まばゆく輝け。",
      "マイロ・カッパーキャップと共に水中パズルアドベンチャーへ！重い岩は下へ落ち、解き放たれた宝石や機雷は天井へと浮かび上がり、一息ごとの酸素管理がルートを切り拓きます。",
      "Microsoft Store で入手", "トレーラーを見る", "◆ 洞窟", "最初から全開放", "◈ ハンター", "沿岸 5 種 + 深海 3 種",
      "★ 難易度", "Junior 〜 Distinguished", "◎ 対応言語", "UI・ヘルプ完備",
      "深海の躍動を<em>その目で。</em>", "水没した貯水槽、浮上する機雷ロック、予兆のある待ち伏せ、連鎖爆発を 128 BPM チップチューン <strong>Pixel Tides</strong> と共に収録。",
      "サウンド ON", "ミュート", "GIF を一時停止", "GIF を再生", "🔇 クリックで音声 ON", "🔊 サウンド再生中",
      "逆転する重力。<br><em>純粋なアーケード戦術。</em>", "すべての洞窟は 180ms の決定論的シミュレーションで動作。水は決して抜けず、岩と機雷は明快なルールに従います。",
      "岩は沈む ↓", "宝石は昇る ↑", "エアドーム",
      "鮮やかなシルエット。<br><em>一目でわかる視認性。</em>", "すべて (10)", "水中洞窟 (6)", "メニュー・チュートリアル (4)",
      "8 種の個性派ハンター。<br><em>理不尽な攻撃ゼロ。</em>", "全 8 種", "沿岸プレデター 5 種", "深海スペシャリスト 3 種 (21+)", "通常ルール", "⚡ リミックスモード",
      "全 215 洞窟アンロック済み。<br><em>5 段階の難易度。</em>", "難易度インタラクティブスライダー", "ジュニア", "シニア", "プリンシパル", "エキスパート", "ディスティングイッシュト",
      "軽快な操作感。<br><em>すべてのプレイヤーへ。</em>", "初代 Gemrift を見る ↗",
      "洞窟を<span class=\"accent-cyan\">ひっくり返す</span>準備はいいですか？", "215 の水中洞窟、8 種の生物、スマートなチェックポイント巻き戻し、チップチューンの冒険が待っています。",
      "サポート＆<em>よくある質問。</em>", "プライバシー、<em>明快にご案内。</em>", "著作権＆<em>クレジット。</em>", "海溝で迷子ですか？"
    ],
    ko: [
      "홈", "트레일러", "게임플레이", "스크린샷", "생물 도감", "동굴 & 모드", "조작법",
      "메뉴", "지원", "개인정보", "저작권 및 크레딧", "언어 선택",
      "Windows 출시 완료 · 검증된 215개 수중 동굴", "바위는 떨어지고,", "보석은 떠오른다.", "영리하게 파고 · 눈부시게 빛나라.",
      "마일로 코퍼캡과 함께 무거운 바위는 아래로 추락하고, 풀려난 보석과 기뢰는 천장으로 떠오르며, 숨 한 번이 경로를 결정하는 수중 퍼즐 어드벤처로 뛰어드세요.",
      "Microsoft Store에서 받기", "트레일러 보기", "◆ 동굴", "처음부터 전체 개방", "◈ 사냥꾼", "연안 5종 + 심해 3종",
      "★ 난이도", "Junior부터 Distinguished까지", "◎ 언어", "UI 및 도움말 지원",
      "움직이는 심해를 <em>확인하세요.</em>", "침수된 저수조, 부력 기뢰 잠금장치, 전조 공격 매복, 연쇄 폭발을 128 BPM 칩튠 테마 <strong>Pixel Tides</strong>와 함께 담았습니다.",
      "사운드 켜기", "음소거", "GIF 일시정지", "GIF 재생", "🔇 클릭하여 소리 켜기", "🔊 사운드 켜짐",
      "반전된 중력.<br><em>순수 아케이드 전술.</em>", "모든 동굴은 180ms 결정론적 시뮬레이션으로 작동합니다. 물은 빠져나가지 않으며 모든 바위와 기뢰는 명확한 규칙을 따릅니다.",
      "바위 하강 ↓", "보석 상승 ↑", "에어 돔",
      "선명한 실루엣.<br><em>한눈에 읽히는 화면.</em>", "전체 캡처 (10)", "수중 동굴 (6)", "메뉴, 튜토리얼 & 도움말 (4)",
      "여덟 종의 사냥꾼.<br><em>억지 피격 제로.</em>", "전체 8종", "연안 포식자 5종", "심해 전문가 3종 (21+)", "표준 규칙", "⚡ 리믹스 모드",
      "215개 동굴 모두 개방.<br><em>다섯 단계의 숙련도.</em>", "인터랙티브 난이도 슬라이더", "주니어", "시니어", "프린시펄", "엑스퍼트", "디스팅귀시드",
      "손맛 있는 조작.<br><em>모든 플레이어를 위해.</em>", "오리지널 Gemrift 방문 ↗",
      "동굴을 <span class=\"accent-cyan\">뒤집어 놓을</span> 준비가 되셨나요?", "215개의 수중 동굴, 8종의 생물, 스마트 체크포인트 되감기, 칩튠 사운드가 기다립니다.",
      "플레이어 지원 및 <em>FAQ.</em>", "개인정보 처리방침, <em>투명하게.</em>", "저작권 및 <em>크레딧.</em>", "균열 속에서 길을 잃으셨나요?"
    ]
  };

  const KEYS = [
    "navHome", "navTrailer", "navGameplay", "navScreenshots", "navCreatures", "navCaves", "navControls",
    "menu", "btnSupport", "btnPrivacy", "btnCredits", "langLabel",
    "heroPill", "heroLine1", "heroLine2", "heroTagline", "heroLede",
    "ctaStore", "ctaTrailer", "statCaves", "statCavesSub", "statHunters", "statHuntersSub",
    "statTiers", "statTiersSub", "statLocales", "statLocalesSub",
    "secTrailerTitle", "secTrailerDesc", "enableSound", "muteSound", "pauseGif", "playGif", "clickSound", "soundOn",
    "secGameplayTitle", "secGameplayDesc", "rocksSink", "gemsRise", "airDome",
    "secShotsTitle", "shotsAll", "shotsCaves", "shotsUi",
    "secCreaturesTitle", "filterAll8", "filterCoastal5", "filterDeep3", "modeStandard", "modeRemix",
    "secCavesTitle", "diffSelectorTitle", "diff1", "diff2", "diff3", "diff4", "diff5",
    "secControlsTitle", "visitOriginal", "closingTitle", "closingDesc",
    "supportHeading", "privacyHeading", "creditsHeading", "lostHeading"
  ];

  const KEY_INDEX = Object.fromEntries(KEYS.map((k, i) => [k, i]));
  const LOCALE_MAP = Object.fromEntries(LANGUAGES.map((l) => [l.code, l]));

  // Cache original English HTML/text on first pass so switching back to "en" restores verbatim markup
  const originalContent = new WeakMap();
  const originalAttrs = new WeakMap();

  const getTranslation = (lang, key) => {
    if (lang === "en" || !PACKS[lang]) return null;
    const idx = KEY_INDEX[key];
    return idx !== undefined ? PACKS[lang][idx] : null;
  };

  window.GemriftI18n = {
    languages: LANGUAGES,
    current: "en",
    t(key, fallback) {
      return getTranslation(this.current, key) || fallback;
    },
    syncLinks() {
      const lang = this.current;
      const theme = document.documentElement.getAttribute("data-theme");
      document.querySelectorAll("a[href]").forEach((link) => {
        const raw = link.getAttribute("href") || "";
        if (raw.startsWith("#") || raw.startsWith("mailto:")) return;
        try {
          const url = new URL(raw, window.location.href);
          const sameSite =
            url.protocol === window.location.protocol &&
            (url.origin === window.location.origin || url.protocol === "file:");
          if (sameSite) {
            if (theme === "light") url.searchParams.set("scoutTheme", "light");
            else url.searchParams.delete("scoutTheme");

            if (lang && lang !== "en") url.searchParams.set("lang", lang);
            else url.searchParams.delete("lang");

            link.setAttribute("href", url.href);
          }
        } catch {
          // Ignore malformed hrefs
        }
      });
    },
    apply(code, updateHistory = false) {
      const valid = LOCALE_MAP[code] ? code : "en";
      const meta = LOCALE_MAP[valid];
      this.current = valid;

      document.documentElement.setAttribute("lang", valid);
      document.documentElement.setAttribute("dir", meta.rtl ? "rtl" : "ltr");

      document.querySelectorAll(".toolbar-lang-select").forEach((sel) => {
        if (sel instanceof HTMLSelectElement) {
          sel.value = valid;
          const label = getTranslation(valid, "langLabel") || "Select language";
          sel.setAttribute("aria-label", label);
          sel.setAttribute("title", label);
        }
      });

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        if (!originalContent.has(el)) {
          originalContent.set(el, el.innerHTML);
        }
        const key = el.getAttribute("data-i18n") || "";
        const useHtml = el.hasAttribute("data-i18n-html");
        if (valid === "en") {
          el.innerHTML = originalContent.get(el);
        } else {
          const translated = getTranslation(valid, key);
          if (translated) {
            if (useHtml) el.innerHTML = translated;
            else el.textContent = translated;
          }
        }
      });

      document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        if (!originalAttrs.has(el)) {
          originalAttrs.set(el, el.getAttribute("aria-label") || "");
        }
        const key = el.getAttribute("data-i18n-aria") || "";
        el.setAttribute(
          "aria-label",
          valid === "en" ? originalAttrs.get(el) : getTranslation(valid, key) || originalAttrs.get(el)
        );
      });

      if (updateHistory) {
        const url = new URL(window.location.href);
        if (valid === "en") url.searchParams.delete("lang");
        else url.searchParams.set("lang", valid);
        window.history.replaceState(null, "", url);
      }

      this.syncLinks();
      window.dispatchEvent(new CustomEvent("gemrift:langchange", { detail: { lang: valid, rtl: meta.rtl } }));
    }
  };

  // Populate any .toolbar-lang-select dropdowns and apply initial ?lang= query param
  const initSelectors = () => {
    document.querySelectorAll(".toolbar-lang-select").forEach((sel) => {
      if (!(sel instanceof HTMLSelectElement)) return;
      if (sel.options.length === 0) {
        for (const l of LANGUAGES) {
          const opt = document.createElement("option");
          opt.value = l.code;
          opt.textContent = l.name;
          sel.appendChild(opt);
        }
      }
      sel.addEventListener("change", () => {
        window.GemriftI18n.apply(sel.value, true);
      });
    });

    const urlLang = new URLSearchParams(window.location.search).get("lang") || "en";
    window.GemriftI18n.apply(urlLang, false);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSelectors);
  } else {
    initSelectors();
  }
})();
