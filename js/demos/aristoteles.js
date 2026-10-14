/* 5. Aristoteles deneyleri: yolculuk ve kitaplık, kıyas makinesi, dört neden, altın orta */
(function () {
  const { h, C, FONT, rgba, clamp } = L;
  const D = window.Demos;

  /* ================= Yolculuk haritası ve eser kitaplığı ================= */
  const DURAK = [
    ["stageira", "MÖ 384", "Stageira'da doğar. Babası Nikomakhos, Makedonya kralı III. Amyntas'ın hekimidir."],
    ["atina", "MÖ 367–347", "On yedi yaşında Platon'un Akademia'sına girer ve yirmi yıl kalır."],
    ["assos", "y. MÖ 347–345", "Assos'ta (Behramkale) Hermeias'ın çevresinde felsefe yapar; Pythias ile evlenir."],
    ["midilli", "y. MÖ 345–343", "Midilli'de Theophrastos'la birlikte deniz canlılarını inceler: biyolojinin doğuşu."],
    ["pella", "y. MÖ 343–335", "Makedonya'da genç İskender'in hocası olur (Pella yakınındaki Mieza'da)."],
    ["atina", "MÖ 335–323", "Atina'ya döner ve Lykeion'u kurar. Öğrencileriyle yürüyerek ders verdiği anlatılır: \"Peripatetikler\"."],
    ["khalkis", "MÖ 322", "İskender'in ölümünün ardından Khalkis'e çekilir ve orada ölür."],
  ];
  const RAF = [
    { ad: "Mantık", eser: ["Kategoriler", "Yorum Üzerine", "Birinci Analitikler", "İkinci Analitikler", "Topikler", "Sofistik Çürütmeler"], bugun: "mantık, bilim felsefesi",
      not: "Sonradan \"Organon\" (alet) adıyla bir araya getirildi: mantık, bütün bilimlerin aletidir." },
    { ad: "Doğa", eser: ["Fizik", "Gökyüzü Üzerine", "Oluş ve Bozuluş", "Meteoroloji"], bugun: "fizik, astronomi, meteoroloji",
      not: "Hareket, zaman, uzay ve sonsuzluk üzerine. Yerküreyi küre olarak savundu; ay tutulmasındaki yuvarlak gölgeyi kanıt gösterdi." },
    { ad: "Canlılar", eser: ["Hayvanların Tarihi", "Hayvanların Parçaları", "Hayvanların Üremesi"], bugun: "biyoloji, zooloji",
      not: "Yüzlerce hayvan türünü sınıflandırdı. Ahtapotun üreme kolu gibi bazı gözlemleri ancak 19. yüzyılda doğrulandı; bazı yanılgıları da vardı." },
    { ad: "Ruh", eser: ["Ruh Üzerine", "Küçük Doğa Yazıları"], bugun: "psikoloji",
      not: "Ruhu canlı bedenin biçimi olarak tanımladı: balmumu ile mühür izi gibi, ikisini ayırmak anlamsızdır." },
    { ad: "İlk felsefe", eser: ["Metafizik"], bugun: "metafizik, ontoloji",
      not: "\"Metafizik\" adı Aristoteles'in değil, sonraki derleyicilerin: \"fizikten sonra gelen kitaplar\". Konusu, varlık olmak bakımından varlıktır." },
    { ad: "Etik", eser: ["Nikomakhos'a Etik", "Eudemos'a Etik"], bugun: "etik",
      not: "Erdem, alışkanlık, dostluk ve mutluluk (eudaimonia) üzerine. Dostluğa iki kitap ayırır." },
    { ad: "Siyaset", eser: ["Politika", "Atinalıların Anayasası"], bugun: "siyaset bilimi",
      not: "\"İnsan doğası gereği siyasal bir hayvandır.\" Öğrencileriyle 158 kentin anayasasını derlediği anlatılır; yalnızca Atina'nınki büyük ölçüde kaldı." },
    { ad: "Söz ve sanat", eser: ["Retorik", "Poetika"], bugun: "retorik, edebiyat kuramı",
      not: "Tragedyanın acıma ve korku yoluyla arınma (katharsis) sağladığını yazdı. Komedya üzerine olduğu düşünülen ikinci kitap kayıp." },
  ];
  D.aristoYol = function (stage) {
    const harita = h("div.ay-harita");
    const raflar = h("div.ay-raf.pad.scroll", { hidden: true });
    const bilgi = h("div.ay-bilgi.pad", { "aria-live": "polite" });
    const map = Harita(harita, { kutu: [20.2, 36.2, 29.2, 41.9], filozoflar: ["aristoteles"], ege: true, rota: DURAK.map((d) => d[0]) });
    const duraklar = h("div.ay-duraklar", DURAK.map(([y, yil], i) => h("button.btn.ghost", { type: "button", "data-i": i, onclick: () => secDurak(i) }, FELSEFE.YERLER[y].ad)));
    function secDurak(i) {
      const [y, yil, m] = DURAK[i];
      map.sec(y);
      [...duraklar.children].forEach((b, k) => b.classList.toggle("on", k === i));
      bilgi.innerHTML = "";
      bilgi.append(h("p", h("b", `${yil} · ${FELSEFE.YERLER[y].ad}`), " → bugün " + FELSEFE.YERLER[y].bugun + ". " + m));
    }
    // kitaplık: her raf bir alan, her rulo bir eser
    RAF.forEach((r, ri) => {
      const raf = h("div.ay-r", h("h5", r.ad, h("small", "bugün: " + r.bugun)));
      const sira = h("div.ay-rulolar");
      r.eser.forEach((e, ei) => sira.append(h("button.ay-rulo", { type: "button", style: { "--hy": 62 + ((ri * 7 + ei * 13) % 5) * 7 + "px" }, onclick: (ev) => secRaf(ri, e, ev.currentTarget) }, h("span", e))));
      raf.append(sira);
      raflar.append(raf);
    });
    function secRaf(ri, e, el) {
      raflar.querySelectorAll(".ay-rulo").forEach((b) => b.classList.toggle("on", b === el));
      bilgi.innerHTML = "";
      bilgi.append(h("p", h("b", e), ` · ${RAF[ri].ad} (bugün: ${RAF[ri].bugun}). ${RAF[ri].not}`));
    }
    const seg = L.seg([["yol", "Yolculuk"], ["eser", "Eserler"]], "yol", (v) => {
      harita.hidden = v !== "yol"; duraklar.hidden = v !== "yol"; raflar.hidden = v !== "eser";
      bilgi.innerHTML = "";
      if (v === "yol") { map.draw(); bilgi.append(h("p.muted", "Bir durağa tıklayın.")); }
      else bilgi.append(h("p.muted", "Bir ruloya tıklayın. Sekiz raf, bugünkü bilim ve felsefe dallarının çoğunun başlangıç noktası."));
    });
    const oyna = h("button.btn", { type: "button", onclick: () => { map.rotaOyna(); } }, "Yolculuğu oynat");
    stage.append(harita, raflar, h("div.controls", seg, oyna, duraklar), bilgi);
    bilgi.append(h("p.muted", "Bir durağa tıklayın."));
    return { enter: () => map.enter(), leave: () => map.leave() };
  };

  /* ================= Kıyas makinesi ================= */
  // terimler: çoğul, tekil ve yüklem biçimleri
  const T = {
    insan: { cog: "insanlar", tek: "insan", yuk: "insandır", ad: "İnsan" },
    olumlu: { cog: "ölümlüler", tek: "ölümlü", yuk: "ölümlüdür", ad: "Ölümlü" },
    sokrates: { cog: "Sokrates", tek: "Sokrates", yuk: "Sokrates'tir", ad: "Sokrates", tekil: true },
    filozof: { cog: "filozoflar", tek: "filozof", yuk: "filozoftur", ad: "Filozof" },
    kedi: { cog: "kediler", tek: "kedi", yuk: "kedidir", ad: "Kedi" },
  };
  // önermeler: tür A (bütün), E (hiçbir), I (bazı), O (bazı ... değil)
  const KART = [
    ["A", "insan", "olumlu"], ["A", "sokrates", "insan"], ["A", "kedi", "olumlu"], ["A", "filozof", "insan"],
    ["I", "insan", "filozof"], ["E", "kedi", "insan"], ["A", "sokrates", "filozof"], ["O", "olumlu", "filozof"],
  ];
  function cumle([k, s, p]) {
    const S = T[s], P = T[p];
    if (S.tekil) return k === "E" || k === "O" ? `${S.tek} ${P.tek} değildir` : `${S.tek} ${P.yuk}`;
    if (k === "A") return `bütün ${S.cog} ${P.yuk}`;
    if (k === "E") return `hiçbir ${S.tek} ${P.tek} değildir`;
    if (k === "I") return `bazı ${S.cog} ${P.yuk}`;
    return `bazı ${S.cog} ${P.tek} değildir`;
  }
  const buyukHarf = (s) => s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);
  // 3 terimli Venn: bölge = 3 bitlik maske (bit i: i. terimin içinde)
  function modeller(terimler, onc) {
    const out = [];
    const tut = (m, [k, s, p]) => {
      const si = terimler.indexOf(s), pi = terimler.indexOf(p);
      const reg = (f) => [...Array(8).keys()].filter(f);
      const icS = (r) => (r >> si) & 1, icP = (r) => (r >> pi) & 1;
      if (k === "A") return reg((r) => icS(r) && !icP(r)).every((r) => !((m >> r) & 1));
      if (k === "E") return reg((r) => icS(r) && icP(r)).every((r) => !((m >> r) & 1));
      if (k === "I") return reg((r) => icS(r) && icP(r)).some((r) => (m >> r) & 1);
      return reg((r) => icS(r) && !icP(r)).some((r) => (m >> r) & 1);
    };
    for (let m = 0; m < 256; m++) {
      if (m & 1) continue; // 0 bölgesi (hiçbir terimin içinde değil) önemsiz
      // varlık içerimi: her terim boş değil
      if (![0, 1, 2].every((i) => [...Array(8).keys()].some((r) => ((r >> i) & 1) && ((m >> r) & 1)))) continue;
      // tekil terim: tek bölgede bulunur
      if (onc.every((o) => tut(m, o))) out.push(m);
    }
    return { out, tut };
  }
  function dagitilmis(o, terim) {
    const [k, s, p] = o;
    if (s === terim) return k === "A" || k === "E" || T[s].tekil;
    if (p === terim) return k === "E" || k === "O";
    return false;
  }
  function coz(o1, o2) {
    const t1 = [o1[1], o1[2]], t2 = [o2[1], o2[2]];
    const ortak = t1.filter((x) => t2.includes(x));
    if (o1 === o2) return { hata: "Aynı önermeyi iki kez kullandınız. Bir kıyas iki farklı öncül ister." };
    if (ortak.length !== 1) return { hata: ortak.length ? "İki öncül aynı iki terimden söz ediyor; üçüncü bir terim, yani köprü kurulacak bir uç yok." : "İki öncülün ortak terimi yok: aralarında köprü kuracak bir orta terim olmadan sonuç çıkmaz." };
    const M = ortak[0];
    const uc = [...t1, ...t2].filter((x) => x !== M);
    const terimler = [uc[0], uc[1], M];
    const { out, tut } = modeller(terimler, [o1, o2]);
    // en güçlü geçerli sonucu bul; tekil terim varsa onu özne yap
    let adaylar = [];
    const yonler = T[uc[1]].tekil ? [[uc[1], uc[0]], [uc[0], uc[1]]] : [[uc[0], uc[1]], [uc[1], uc[0]]];
    yonler.forEach(([s, p]) => { if (T[p].tekil) return; ["A", "E", "I", "O"].forEach((k) => adaylar.push([k, s, p])); });
    const gecerli = adaylar.find((c) => out.length && out.every((m) => tut(m, c)));
    // Venn için: her bölge kesin boş mu, kesin dolu mu?
    const bos = [], dolu = [];
    for (let r = 1; r < 8; r++) {
      if (out.every((m) => !((m >> r) & 1))) bos.push(r);
      if (out.every((m) => (m >> r) & 1)) dolu.push(r);
    }
    let neden = null;
    if (!gecerli) {
      if (!dagitilmis(o1, M) && !dagitilmis(o2, M)) neden = `Orta terim "${T[M].tek}" hiçbir öncülde bütün kapsamıyla geçmiyor (dağıtılmamış). İki şey aynı üçüncü şeye ait olabilir ama birbirinden tamamen ayrı kalabilir.`;
      else if ((o1[0] === "E" || o1[0] === "O") && (o2[0] === "E" || o2[0] === "O")) neden = "İki olumsuz öncülden sonuç çıkmaz: ikisi de yalnızca neyin ne olmadığını söylüyor.";
      else if ((o1[0] === "I" || o1[0] === "O") && (o2[0] === "I" || o2[0] === "O") && !T[o1[1]].tekil && !T[o2[1]].tekil) neden = "İki tikel (\"bazı\") öncülden sonuç çıkmaz.";
      else neden = "Öncüllerin bütün durumlarına uyan, uçları birbirine bağlayan bir sonuç yok.";
    }
    return { M, terimler, gecerli, bos, dolu, neden };
  }
  D.kiyas = function (stage) {
    const havuz = h("div.kz-havuz");
    const slotlar = [0, 1].map((i) => h("div.kz-slot", { "data-s": i }, h("span.kz-et", i ? "İkinci öncül" : "Birinci öncül")));
    const sonucEl = h("div.kz-sonuc", { "aria-live": "polite" });
    const cv = h("canvas", { "aria-label": "Venn şeması" });
    const venn = h("div.kz-venn", cv);
    const makine = h("div.kz-makine", h("div.kz-oncul", ...slotlar), h("div.kz-cizgi"), sonucEl);
    const panel = h("div.kz-panel.pad.scroll");
    const temizle = h("button.btn.ghost", { type: "button", onclick: () => { secili = [null, null]; ciz(); } }, "Temizle");
    stage.append(h("div.kz-ust", makine, venn), h("div.controls.kz-ctl", havuz, temizle), panel);
    let secili = [null, null], durum = null;
    const kartlar = KART.map((o, i) => {
      const k = h("button.kart.kz-kart", { type: "button", "data-g": "1", "data-i": i }, buyukHarf(cumle(o)));
      let suruklendi = false;
      L.surukle(k, {
        hedefler: () => slotlar,
        onStart: () => (suruklendi = false),
        onMove: () => (suruklendi = true),
        onDrop: (hdf) => { if (hdf) koy(+hdf.dataset.s, i); },
      });
      k.addEventListener("click", () => { if (suruklendi) { suruklendi = false; return; } koy(secili[0] == null ? 0 : secili[1] == null ? 1 : 1, i); });
      havuz.append(k);
      return k;
    });
    slotlar.forEach((s, i) => s.addEventListener("click", (e) => { if (e.target.closest(".kz-yer")) { secili[i] = null; ciz(); } }));
    function koy(s, i) {
      const diger = secili[1 - s];
      if (diger === i) secili[1 - s] = null;
      secili[s] = i; ciz();
    }
    function ciz() {
      slotlar.forEach((s, i) => {
        s.querySelectorAll(".kz-yer").forEach((x) => x.remove());
        s.classList.toggle("dolu", secili[i] != null);
        if (secili[i] != null) s.append(h("span.kz-yer", { title: "Çıkarmak için tıklayın" }, buyukHarf(cumle(KART[secili[i]])) + "."));
      });
      kartlar.forEach((k, i) => k.classList.toggle("kullanildi", secili.includes(i)));
      sonucEl.innerHTML = ""; panel.innerHTML = "";
      durum = null;
      if (secili[0] == null || secili[1] == null) {
        sonucEl.append(h("span.muted", "O hâlde… (iki öncül bekleniyor)"));
        panel.append(h("p.muted", "Kart havuzundan iki öncül seçin. Ortak bir terimleri olmalı."));
        drawVenn(); return;
      }
      durum = coz(KART[secili[0]], KART[secili[1]]);
      if (durum.hata) {
        sonucEl.append(h("span.kz-yok", "Sonuç çıkmaz"));
        panel.append(h("p", durum.hata));
      } else if (durum.gecerli) {
        sonucEl.append(h("span.kz-var", "O hâlde " + cumle(durum.gecerli) + "."));
        panel.append(Oy.ilkePanel({
          ilke: `Geçerli kıyas: orta terim "${T[durum.M].tek}" iki öncülü bağlıyor ve sonuç, terimler ne olursa olsun bu biçimden zorunlu olarak çıkıyor.`,
          filozof: ["aristoteles"],
          lehte: "Biçim doğruysa içeriğe bakmadan denetleyebiliriz: \"insan\" yerine herhangi bir sözcük koysanız da geçerlilik bozulmaz.",
          itiraz: "Mill'e göre sonuç zaten öncülde saklıdır: \"Bütün insanlar ölümlüdür\" demek için Sokrates'in de ölümlü olduğunu baştan bilmemiz gerekir. Kıyas yeni bilgi verir mi?",
        }));
      } else {
        sonucEl.append(h("span.kz-yok", "Geçerli bir sonuç çıkmaz"));
        panel.append(Oy.ilkePanel({ ilke: durum.neden, filozof: ["aristoteles"], itiraz: "Sonuç doğru olsa bile (ör. \"bazı kediler insan değildir\"), öncüllerden çıkmıyorsa akıl yürütme onu kanıtlamış olmaz." }));
      }
      drawVenn();
    }
    let st;
    function drawVenn() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const R = Math.min(w * 0.25, H * 0.25);
      const cx = w / 2, cy = H / 2 + R * 0.05;
      const MER = [[cx - R * 0.58, cy - R * 0.38], [cx + R * 0.58, cy - R * 0.38], [cx, cy + R * 0.6]];
      const ter = durum && !durum.hata ? durum.terimler : null;
      const RENK = ["#79AEEA", "#E08A4F", "#E9BE3B"];
      if (ter) {
        // boş bölgeleri tara (hücre hücre)
        const ic = (x, y, i) => Math.hypot(x - MER[i][0], y - MER[i][1]) <= R;
        const step = 3;
        ctx.fillStyle = rgba("#C9A55C", 0.32);
        for (let y = cy - R * 1.5; y < cy + R * 1.7; y += step) for (let x = cx - R * 1.7; x < cx + R * 1.7; x += step) {
          const r = (ic(x, y, 0) ? 1 : 0) | (ic(x, y, 1) ? 2 : 0) | (ic(x, y, 2) ? 4 : 0);
          if (r && durum.bos.includes(r) && ((x + y) / step) % 3 < 1) ctx.fillRect(x, y, step, step);
        }
        // kesin dolu bölgelere ×
        const merkez = (r) => {
          let sx = 0, sy = 0, n = 0;
          for (let y = cy - R * 1.5; y < cy + R * 1.7; y += 6) for (let x = cx - R * 1.7; x < cx + R * 1.7; x += 6) {
            const rr = (ic(x, y, 0) ? 1 : 0) | (ic(x, y, 1) ? 2 : 0) | (ic(x, y, 2) ? 4 : 0);
            if (rr === r) { sx += x; sy += y; n++; }
          }
          return n ? [sx / n, sy / n] : null;
        };
        ctx.strokeStyle = C.lehte; ctx.lineWidth = 2.4;
        durum.dolu.forEach((r) => { const p = merkez(r); if (!p) return; ctx.beginPath(); ctx.moveTo(p[0] - 6, p[1] - 6); ctx.lineTo(p[0] + 6, p[1] + 6); ctx.moveTo(p[0] + 6, p[1] - 6); ctx.lineTo(p[0] - 6, p[1] + 6); ctx.stroke(); });
      }
      MER.forEach(([x, y], i) => {
        ctx.strokeStyle = ter ? RENK[i] : rgba(C.brass, 0.4); ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.stroke();
        if (ter) {
          const ad = T[ter[i]].ad + (i === 2 ? " (orta terim)" : "");
          ctx.font = `600 13px ${FONT.ui}`; ctx.fillStyle = RENK[i]; ctx.textAlign = "center";
          const lx = i === 0 ? x - R * 0.5 : i === 1 ? x + R * 0.5 : x, ly = i === 2 ? y + R + 16 : y - R - 8;
          ctx.fillText(ad, lx, ly);
        }
      });
      ctx.textAlign = "left";
      ctx.font = `400 11.5px ${FONT.ui}`; ctx.fillStyle = C.muted;
      ctx.fillText(ter ? "taralı: boş olmak zorunda · ×: bir şey olmak zorunda" : "Venn şeması öncüller seçilince çizilir", 10, H - 10);
    }
    st = L.canvas(cv, drawVenn);
    ciz();
    return {};
  };

  /* ================= Dört neden ================= */
  const NEDEN = [["madde", "Madde nedeni", "neyden?"], ["bicim", "Biçim nedeni", "ne olarak?"], ["etken", "Etken neden", "kim, ne yaptı?"], ["amac", "Amaç nedeni", "ne için?"]];
  const NESNE = {
    heykel: { ad: "Heykel", kart: { madde: "bronz", bicim: "Hermes'in biçimi", etken: "heykeltıraş", amac: "tanrıyı onurlandırmak" } },
    ev: { ad: "Ev", kart: { madde: "taş, tuğla, ahşap", bicim: "evin planı", etken: "usta ve mimar", amac: "barınmak, korunmak" } },
    palamut: { ad: "Meşe palamudu", kart: { madde: "palamudun dokusu", bicim: "meşenin türü, yapısı", etken: "ana meşe ağacı", amac: "olgun bir meşe olmak" } },
  };
  D.dortNeden = function (stage) {
    let nesne = "heykel", yer = {}, sec = null;
    const kutular = h("div.dn-kutular", NEDEN.map(([k, ad, s]) => h("div.dn-kutu", { "data-n": k }, h("b", ad), h("small", s), h("div.dn-ic"))));
    const havuz = h("div.dn-havuz");
    const cv = h("canvas", { "aria-label": "Nesne çizimi" });
    const resim = h("div.dn-resim", cv);
    const alt = h("div.dn-alt.pad.scroll", { "aria-live": "polite" });
    const seg = L.seg(Object.entries(NESNE).map(([k, v]) => [k, v.ad]), nesne, (v) => { nesne = v; yer = {}; sec = null; kur(); drawR(); });
    stage.append(h("div.controls.top", seg), h("div.dn-ust", resim, kutular), h("div.controls.dn-hv", havuz), alt);
    const kutuEl = [...kutular.children];
    kutuEl.forEach((kt) => kt.addEventListener("click", () => { if (sec) { koy(sec, kt.dataset.n); } }));
    function kur() {
      havuz.innerHTML = "";
      const N = NESNE[nesne].kart;
      const sira = Object.entries(N).sort((a, b) => a[1].length % 3 - b[1].length % 3 || (a[1] < b[1] ? -1 : 1));
      sira.forEach(([dogru, metin]) => {
        if (yer[dogru] === dogru) return;
        const k = h("button.kart.dn-kart", { type: "button", "data-g": "1", "data-k": dogru }, metin);
        let suruklendi = false;
        L.surukle(k, { hedefler: () => kutuEl, onStart: () => (suruklendi = false), onMove: () => (suruklendi = true), onDrop: (hd) => { if (hd) koy(dogru, hd.dataset.n); } });
        k.addEventListener("click", () => { if (suruklendi) { suruklendi = false; return; } sec = sec === dogru ? null : dogru; havuz.querySelectorAll(".dn-kart").forEach((x) => x.classList.toggle("on", x.dataset.k === sec)); });
        havuz.append(k);
      });
      kutuEl.forEach((kt) => {
        const ic = kt.querySelector(".dn-ic");
        ic.textContent = yer[kt.dataset.n] ? NESNE[nesne].kart[kt.dataset.n] : "";
        kt.classList.toggle("tamam", !!yer[kt.dataset.n]);
      });
      if (Object.keys(yer).length === 4) bitti();
      else if (!alt.querySelector(".dn-ipucu")) { alt.innerHTML = ""; alt.append(h("p.dn-ipucu.muted", "Kartları kutulara yerleştirin.")); }
    }
    function koy(kart, kutu) {
      sec = null;
      alt.innerHTML = "";
      if (kart === kutu) {
        yer[kutu] = kutu;
        alt.append(h("p", h("b", NEDEN.find((n) => n[0] === kutu)[1] + ": "), NESNE[nesne].kart[kutu] + ". Yerinde."));
      } else {
        const n1 = NEDEN.find((n) => n[0] === kutu)[1];
        alt.append(h("p", `"${NESNE[nesne].kart[kart]}" ${n1.toLocaleLowerCase("tr")} için uymuyor; ${NEDEN.find((n) => n[0] === kutu)[2]} sorusunu sorun.`));
        if (nesne === "palamut") alt.append(h("p.muted", "İpucu: Aristoteles'e göre doğal varlıklarda biçim, etken ve amaç çoğu zaman iç içedir."));
      }
      kur(); drawR();
    }
    function bitti() {
      alt.innerHTML = "";
      alt.append(Oy.ilkePanel({
        ilke: nesne === "palamut" ? "Doğada da amaç vardır: palamudun içindeki olanak, meşe olarak gerçekleşmeye (entelekheia) yönelir." : "Bir şeyi anlamak, dört nedenini birden bilmektir; tek bir \"neden\" yetmez.",
        filozof: ["aristoteles"],
        lehte: "Biyologlar bugün de \"bu organın işlevi ne?\" diye sorar; işlev, amaç nedeninin çağdaş bir akrabasıdır.",
        itiraz: "Modern fizik amaç nedenini bıraktı: taş yere \"düşmek için\" değil, kütleçekim yüzünden düşer. Spinoza'ya göre doğaya amaç yüklemek, insanın kendi isteklerini dünyaya yansıtmasıdır.",
      }));
    }
    let st, t = 0;
    function drawR() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const s = Math.min(w, H) / 200, cx = w / 2, by = H * 0.86;
      ctx.save(); ctx.translate(cx, by); ctx.scale(s, s);
      const dolu = (k) => !!yer[k];
      ctx.lineWidth = 1.4 / s * s;
      ctx.strokeStyle = C.brass;
      if (nesne === "heykel") {
        ctx.fillStyle = dolu("madde") ? "#8C6A3C" : "rgba(201,165,92,.12)";
        ctx.fillRect(-34, -14, 68, 14); ctx.strokeRect(-34, -14, 68, 14);
        ctx.beginPath(); // ayakta duran figür, kanatlı başlık
        ctx.moveTo(-10, -14); ctx.lineTo(-8, -70); ctx.quadraticCurveTo(-18, -100, -6, -112); ctx.lineTo(6, -112); ctx.quadraticCurveTo(18, -100, 8, -70); ctx.lineTo(10, -14); ctx.closePath();
        ctx.fill(); if (dolu("bicim")) ctx.stroke();
        ctx.beginPath(); ctx.arc(0, -124, 10, 0, 7); ctx.fill(); if (dolu("bicim")) ctx.stroke();
        if (dolu("bicim")) { ctx.beginPath(); ctx.moveTo(8, -130); ctx.lineTo(20, -138); ctx.lineTo(12, -126); ctx.moveTo(-8, -130); ctx.lineTo(-20, -138); ctx.lineTo(-12, -126); ctx.stroke(); }
        if (dolu("etken")) { ctx.fillStyle = C.ink; ctx.beginPath(); ctx.moveTo(40, -60); ctx.lineTo(56, -70); ctx.lineTo(60, -64); ctx.lineTo(44, -54); ctx.fill(); }
        if (dolu("amac")) { ctx.strokeStyle = C.lehte; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(-60, -10); ctx.lineTo(-60, -150); ctx.lineTo(60, -150); ctx.lineTo(60, -10); ctx.moveTo(-70, -150); ctx.lineTo(0, -175); ctx.lineTo(70, -150); ctx.stroke(); ctx.setLineDash([]); }
      } else if (nesne === "ev") {
        ctx.fillStyle = dolu("madde") ? "#6B5440" : "rgba(201,165,92,.12)";
        ctx.fillRect(-50, -70, 100, 70);
        if (dolu("madde")) { ctx.strokeStyle = rgba(C.brass, 0.4); for (let y = -60; y < 0; y += 10) { ctx.beginPath(); ctx.moveTo(-50, y); ctx.lineTo(50, y); ctx.stroke(); } }
        ctx.strokeStyle = C.brass;
        if (dolu("bicim")) { ctx.strokeRect(-50, -70, 100, 70); ctx.beginPath(); ctx.moveTo(-58, -70); ctx.lineTo(0, -110); ctx.lineTo(58, -70); ctx.closePath(); ctx.stroke(); ctx.strokeRect(-10, -34, 20, 34); }
        if (dolu("etken")) { ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(70, -46, 5, 0, 7); ctx.fill(); ctx.fillRect(68, -40, 4, 26); }
        if (dolu("amac")) { ctx.fillStyle = rgba("#F3E3B3", 0.6); ctx.fillRect(-40, -56, 14, 12); ctx.fillRect(26, -56, 14, 12); }
      } else {
        // palamut ve olası meşe
        ctx.fillStyle = dolu("madde") ? "#8C6A45" : "rgba(201,165,92,.12)";
        ctx.beginPath(); ctx.ellipse(0, -14, 10, 14, 0, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#5B4636"; ctx.beginPath(); ctx.ellipse(0, -26, 12, 5, 0, 0, 7); ctx.fill();
        if (dolu("bicim") || dolu("amac")) {
          const g = dolu("amac") ? 1 : 0.4 + 0.1 * Math.sin(t);
          ctx.globalAlpha = dolu("amac") ? 0.9 : 0.35;
          ctx.strokeStyle = "#9CCB72"; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(30, -90 * g); ctx.stroke();
          ctx.fillStyle = "rgba(156,203,114,.4)"; ctx.beginPath(); ctx.ellipse(30, -110 * g, 46 * g, 34 * g, 0, 0, 7); ctx.fill();
          ctx.globalAlpha = 1;
        }
        if (dolu("etken")) { ctx.strokeStyle = rgba("#9CCB72", 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-60, -80); ctx.stroke(); ctx.fillStyle = "rgba(156,203,114,.25)"; ctx.beginPath(); ctx.ellipse(-60, -96, 30, 24, 0, 0, 7); ctx.fill(); }
      }
      ctx.restore();
      ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
      ctx.fillText(`${Object.keys(yer).length} / 4 neden`, w / 2, 16); ctx.textAlign = "left";
    }
    st = L.canvas(cv, drawR);
    kur();
    const lp = L.loop((dt) => { t += dt; if (nesne === "palamut") drawR(); });
    return { enter: () => { lp.start(); drawR(); }, leave: () => lp.stop() };
  };

  /* ================= Altın orta ================= */
  const ERDEM = [
    { ad: "Cesaret", eksik: "korkaklık", asiri: "gözü karalık", orta: "cesaret", durum: "tehlike karşısında" },
    { ad: "Cömertlik", eksik: "cimrilik", asiri: "savurganlık", orta: "cömertlik", durum: "para verirken" },
    { ad: "Nükte", eksik: "yavanlık", asiri: "soytarılık", orta: "nüktedanlık", durum: "sohbette" },
  ];
  // rol, ortanın yerini kaydırır: "bize göre orta"
  const ROL = {
    asker: { ad: "Asker", orta: [0.62, 0.45, 0.4], gen: 0.1, not: "Savaşta korkuya karşı daha çok dayanmak gerekir; asker için orta, cesur ucuna yakındır." },
    ogrenci: { ad: "Öğrenci", orta: [0.48, 0.38, 0.55], gen: 0.12, not: "Kısıtlı parası olan biri için cömertlik az bir payla da olur; orta, kişinin olanağına göredir." },
    yonetici: { ad: "Kent yöneticisi", orta: [0.55, 0.66, 0.42], gen: 0.1, not: "Zengin ve kamusal biri için cömertlik daha büyük harcamalar gerektirir (Aristoteles buna \"görkemlilik\" der)." },
  };
  D.altinOrta = function (stage) {
    let rol = "asker";
    const deger = [0.25, 0.8, 0.5];
    const satirlar = h("div.ao-satirlar");
    const eud = h("div.ao-eud", h("span", "eudaimonia"), h("i", h("em")), h("b", ""));
    const notEl = h("p.ao-not");
    const sliders = ERDEM.map((e, i) => {
      const gor = h("div.ao-olcek", h("span.ao-u", e.eksik), h("span.ao-m", e.orta), h("span.ao-u", e.asiri), h("div.ao-band"), h("div.ao-imlec"));
      const s = L.slider({ label: e.ad, min: 0, max: 1, step: 0.01, value: deger[i], fmt: () => "", oninput: (v) => { deger[i] = v; yaz(); } });
      s.querySelector(".val").remove();
      satirlar.append(h("div.ao-satir", h("div.ao-bas", h("b", e.ad), h("small", e.durum)), gor, s));
      return { gor, s };
    });
    const rolSeg = L.seg(Object.entries(ROL).map(([k, v]) => [k, v.ad]), rol, (v) => { rol = v; yaz(); });
    const alt = h("div.pad.scroll.ao-alt");
    stage.append(h("div.controls.top", h("span", "Kimin için?"), rolSeg), h("div.pad.ao-ust", satirlar, eud, notEl), alt);
    function bolge(v, m, g) { return v < m - g ? 0 : v > m + g ? 2 : 1; }
    function yaz() {
      const R = ROL[rol];
      let top = 0;
      sliders.forEach(({ gor }, i) => {
        const m = R.orta[i], g = R.gen, v = deger[i];
        const band = gor.querySelector(".ao-band");
        band.style.left = (m - g) * 100 + "%"; band.style.width = g * 200 + "%";
        gor.querySelector(".ao-imlec").style.left = v * 100 + "%";
        const b = bolge(v, m, g);
        gor.querySelectorAll("span").forEach((sp, k) => sp.classList.toggle("on", k === b));
        top += Math.max(0, 1 - Math.abs(v - m) / 0.5);
      });
      const e = top / 3;
      eud.querySelector("em").style.width = Math.round(e * 100) + "%";
      eud.querySelector("b").textContent = e > 0.85 ? "serpilip gelişiyor" : e > 0.6 ? "yolda" : "dengesiz";
      notEl.textContent = R.not;
    }
    yaz();
    Oy.secim(alt, {
      anahtar: "altinorta.kaynak", soru: "Doğru ölçüyü en iyi ne belirler?",
      secenekler: [
        { v: "phronesis", ad: "Duruma göre pratik bilgelik", ilke: "Erdem bir karakter durumudur; doğru ölçüyü deneyimli ve bilge kişinin muhakemesi bulur.", filozof: ["aristoteles"],
          itiraz: "\"Bilge kişi nasıl yapıyorsa öyle\" demek, yeni başlayan birine yol göstermeye yeter mi?" },
        { v: "kural", ad: "Herkes için geçerli bir kural", ilke: "Ahlak, duruma göre değişmeyen, herkesin uyması gereken bir ilkeye dayanır.", filozof: ["kant"],
          itiraz: "Kurallar çatıştığında (doğruyu söylemek ile birini korumak) hangisinin ağır basacağını yine muhakeme belirlemez mi?" },
        { v: "sonuc", ad: "Sonuçlar: en çok mutluluk", ilke: "Doğru davranış, etkilenen herkes için en iyi sonucu doğurandır.", filozof: ["bentham", "mill"],
          itiraz: "Bütün sonuçları önceden hesaplayamayız; ayrıca karakter, tek tek eylemlerin toplamından fazlası olabilir." },
        { v: "adap", ad: "İlişkiler ve adap", ilke: "Doğru ölçü, ilişkilerimizin (ebeveyn, dost, yönetici) gerektirdiği saygı ve adapla öğrenilir.", filozof: ["konfucyus"],
          itiraz: "Adabın kendisi yanlış olduğunda, onu neyle düzelteceğiz?" },
      ],
    });
    return {};
  };
})();
