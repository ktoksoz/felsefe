/* 7. Doğu'nun antik bilgeliği: Eksen Çağı çizelgesi, tuz ve su, araba, altın kural, su ve taş, kelebek, Hint mantığı.
   Görsel dil: sumi-e gibi bol boşluk; mürekkep yerine mermer rengi. */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;
  const HINT = "#E9BE3B", CIN = "#E0524A";
  const NS = "http://www.w3.org/2000/svg";
  const sv = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  /* --- Eksen Çağı: MÖ 800–150 arası üç şerit, yıl çizgisi --- */
  D.eksencagi = function (stage) {
    stage.classList.add("dg-eksen");
    const zk = h("div.dg-zaman");
    stage.append(zk);
    const z = Zaman(zk, { aralik: [-800, -150], yil: -399, seritler: ["yunan", "hint", "cin"] });
    const ANLAR = [[-551, "MÖ 551: Konfüçyüs doğar"], [-479, "MÖ 479: Konfüçyüs ölür"], [-399, "MÖ 399: Sokrates ölür"], [-322, "MÖ 322: Aristoteles ölür"]];
    stage.append(h("div.controls.dg-anlar", ANLAR.map(([y, ad]) => h("button.btn.ghost", { type: "button", onclick: () => z.setYil(y) }, ad))));
    const pad = h("div.pad.scroll.dg-alt");
    stage.append(pad);
    Oy.secim(pad, {
      anahtar: "eksen-cagi.neden", soru: "Bu eşzamanlılığı en iyi ne açıklar?",
      secenekler: [
        { v: "ortak", ad: "Benzer koşullar", ilke: "Kentler, ticaret, yazı ve savaşlar farklı yerlerde insanları benzer sorulara itti.", filozof: ["jaspers"],
          itiraz: "Benzer koşullar başka yerlerde benzer felsefeler doğurmadı; açıklama fazla genel kalabilir." },
        { v: "etkilesim", ad: "Fikirler yolculuk etti", ilke: "Düşünceler ticaret ve imparatorluk yollarında dolaştı.",
          lehte: "Pers İmparatorluğu Ege'den İndus'a uzanıyordu; İskender'in seferlerinden sonra Hint-Yunan krallıkları gerçek temaslar kurdu (Milinda'yı hatırlayın).",
          itiraz: "MÖ 6. ve 5. yüzyıllar için Yunan, Hint ve Çin düşünürleri arasında doğrudan temas kanıtı yok denecek kadar azdır." },
        { v: "desen", ad: "Geriye dönüp biz kuruyoruz", ilke: "Benzerlik, tarihe bakan bizim gözümüzde; olayların kendisinde değil.",
          lehte: "Beş yüz yıllık bir aralık \"aynı an\" sayılamayacak kadar geniş, tarihler de belirsiz.",
          itiraz: "Desen yine de çarpıcı: hepsinde mitten ve törenden bağımsız, gerekçeli bir düşünce biçimi beliriyor." },
      ],
    });
    return { enter: z.enter, leave: z.leave };
  };

  /* --- Upanişadlar: tuz ve su (Chandogya 6.13) --- */
  D.tuzsu = function (stage) {
    const cv = h("canvas", { "aria-label": "Su kabı ve tuz" });
    const fill = h("div.fill", cv);
    const sonuc = h("p.dg-sonuc", { "aria-live": "polite" }, "Kap yalnızca su dolu.");
    let atildi = false, coz = 0, dus = 0, kasik = null, kasikT = 0, t = 0;
    const tatlar = new Set();
    const b = (ad, fn) => h("button.btn", { type: "button", onclick: fn }, ad);
    const bTuz = b("Tuzu suya at", () => { if (atildi) return; atildi = true; dus = 0; sonuc.textContent = "Tuz suya düştü. Bir gece bekleyelim…"; });
    const tat = (yer, k) => () => {
      kasik = k; kasikT = 0; tatlar.add(yer);
      sonuc.textContent = !atildi ? `${yer}: tatsız, yalnızca su.` : coz < 0.98 ? `${yer}: tuzlu. (Tuz henüz tam erimedi.)` : `${yer}: tuzlu. Tuzu göremiyorsunuz ama her yerde.`;
      if (atildi && tatlar.size === 3 && coz >= 0.98) sonuc.textContent += " Üstte, ortada, dipte: hep aynı. \"İşte o ince öz de böyledir. Sen osun.\"";
    };
    const ara = b("Tuzu gözle bul", () => { sonuc.textContent = !atildi ? "Henüz tuz atmadınız." : coz < 0.98 ? "Son kristaller hâlâ görünüyor ama eriyor." : "Kabın hiçbir yerinde tuz görünmüyor. Ama yok olmadı."; });
    const sifir = h("button.btn.ghost", { type: "button", onclick: () => { atildi = false; coz = 0; dus = 0; tatlar.clear(); kasik = null; sonuc.textContent = "Kap yalnızca su dolu."; } }, "Yeni kap");
    stage.append(fill, h("div.controls", bTuz, b("Üstten tat", tat("Üstten", 0.2)), b("Ortadan tat", tat("Ortadan", 0.5)), b("Dipten tat", tat("Dipten", 0.85)), ara, sifir));
    const pad = h("div.pad.scroll.dg-alt", sonuc);
    stage.append(pad);
    Oy.secim(pad, {
      anahtar: "upanisadlar.ben", soru: "Peki sizin en içteki özünüz?",
      secenekler: [
        { v: "bir", ad: "Evrenin özüyle bir", ilke: "Atman Brahman'dır: ayrı bir ben duygusu, suya karışmış tuzu görmemek gibidir.", filozof: ["upanisadlar", "shankara"],
          itiraz: "Bütün benler tek bir özse, benim acım ile sizin acınız arasındaki fark ne olacak? Bireyin ahlaki sorumluluğu nereye yerleşir?" },
        { v: "bagli", ad: "Ayrı ama bağlı", ilke: "Bireysel ruh Brahman'dan ayrılmaz, ama onunla tamamen aynı da değildir; damla ile deniz gibi.", filozof: ["upanisadlar"],
          lehte: "Hem birliği hem bireyin gerçekliğini korur; Ramanuja'nın Vedanta yorumu buna dayanır.", itiraz: "Advaita'ya göre bu ara yol, ayrılık yanılgısını tam bırakamamaktır." },
        { v: "yok", ad: "Kalıcı bir öz yok", ilke: "Aradığımız \"öz\" hiç yok: yalnızca birbirine bağlı, akıp giden süreçler var.", filozof: ["buda"],
          itiraz: "Hiçbir öz yoksa, hatırlayan, pişman olan, kurtuluşa eren kim? Hint okullarının Budistlere en eski itirazı budur." },
      ],
    });
    const r = L.rng(11);
    const kristal = Array.from({ length: 90 }, () => ({ x: r() - 0.5, y: r() * 0.12, tx: r() - 0.5, ty: r(), s: 1 + r() * 2.2 }));
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cw = Math.min(w * 0.42, H * 0.7), ch = cw * 1.05, x0 = w / 2 - cw / 2, y0 = H * 0.12, sea = y0 + ch * 0.14;
      // su
      ctx.fillStyle = rgba("#4E86C6", 0.18 + coz * 0.06);
      ctx.beginPath(); ctx.moveTo(x0 + 3, sea); ctx.lineTo(x0 + cw - 3, sea); ctx.lineTo(x0 + cw - 12, y0 + ch - 3); ctx.lineTo(x0 + 12, y0 + ch - 3); ctx.fill();
      // kap: tek fırça darbesi gibi ince çizgi
      ctx.strokeStyle = rgba(C.ink, 0.75); ctx.lineWidth = 1.6; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x0 - 6, y0); ctx.lineTo(x0 + 10, y0 + ch); ctx.lineTo(x0 + cw - 10, y0 + ch); ctx.lineTo(x0 + cw + 6, y0); ctx.stroke();
      // tuz
      if (atildi) {
        const dip = y0 + ch - 10;
        kristal.forEach((k) => {
          const a = 1 - coz;
          if (a <= 0.01) return;
          // düşüş: kabın üstünden dibe; erime: dipten bütün suya dağılarak kaybolur
          const yDus = lerp(y0 - 40 - k.y * 60, dip - k.y * 50, L.ease(dus));
          const px = w / 2 + lerp(k.x * 0.14, k.tx * 0.85, coz) * cw;
          const py = dus < 1 ? yDus : lerp(dip - k.y * 50, sea + 8 + k.ty * (dip - sea - 8), coz);
          ctx.fillStyle = rgba(C.ink, a);
          const s = k.s * (1 - coz * 0.6);
          ctx.fillRect(px, py, s, s);
        });
      }
      // tadım kaşığı
      if (kasik != null && kasikT < 1.6) {
        const ky = sea + (y0 + ch - sea) * kasik, kx = x0 + cw * 0.78;
        ctx.strokeStyle = C.brass; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(kx + 40, y0 - 30); ctx.lineTo(kx, ky); ctx.stroke();
        ctx.fillStyle = C.brass; ctx.beginPath(); ctx.ellipse(kx, ky, 9, 5, -0.6, 0, 7); ctx.fill();
        if (atildi && coz > 0.2) { ctx.fillStyle = rgba(C.ink, 0.9); ctx.font = `600 13px ${FONT.ui}`; ctx.fillText("tuzlu", kx + 14, ky + 4); }
      }
      // sessiz başlık: Sanskritçe
      ctx.font = `22px ${FONT.dev}`; ctx.fillStyle = rgba(HINT, 0.6); ctx.textAlign = "center";
      ctx.fillText("तत् त्वम् असि", w / 2, Math.min(H - 14, y0 + ch + 40));
      ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted;
      ctx.fillText("tat tvam asi: sen osun", w / 2, Math.min(H - 2, y0 + ch + 60));
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt; kasikT += dt;
      if (atildi) { if (dus < 1) dus = Math.min(1, dus + dt * 1.4); else coz = Math.min(1, coz + dt * 0.28); }
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Buda: Nagasena'nın arabası (Milindapañha II.1.1) --- */
  const PARCA = [
    ["ok", "Oklar", "Araba oku (ön kiriş)"], ["dingil", "Dingil", ""], ["teker", "Tekerlekler", ""], ["kasa", "Kasa", "Gövde"],
    ["bayrak", "Bayrak direği", ""], ["boyunduruk", "Boyunduruk", ""], ["dizgin", "Dizginler", ""], ["uvendire", "Üvendire", "Hayvanı süren değnek"],
  ];
  D.araba = function (stage) {
    const svg = sv("svg", { viewBox: "0 0 420 250", class: "dg-araba", role: "img", "aria-label": "Araba" });
    const g = {};
    const add = (k, el) => { (g[k] = g[k] || sv("g", { class: "ab-p", "data-k": k })).append(el); };
    const stroke = { stroke: HINT, "stroke-width": 2, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" };
    // zemin çizgisi (sumi-e: tek fırça)
    svg.append(sv("path", { d: "M20 206 Q210 200 400 207", stroke: rgba(C.ink, 0.25), "stroke-width": 1.5, fill: "none" }));
    add("dizgin", sv("path", { d: "M176 98 C230 70 300 74 356 104", ...stroke, "stroke-width": 1.3 }));
    add("ok", sv("path", { d: "M182 146 L366 120", ...stroke, "stroke-width": 4 }));
    add("boyunduruk", sv("path", { d: "M344 120 Q360 96 384 116", ...stroke, "stroke-width": 3.5 }));
    add("kasa", sv("path", { d: "M78 146 L192 146 L188 100 Q140 84 92 100 Z", ...stroke, fill: rgba(HINT, 0.08) }));
    add("kasa", sv("path", { d: "M92 112 L188 112 M100 128 L186 128", ...stroke, "stroke-width": 1, opacity: 0.6 }));
    add("bayrak", sv("path", { d: "M98 100 L98 28", ...stroke, "stroke-width": 2 }));
    add("bayrak", sv("path", { d: "M98 30 L136 40 L98 52", ...stroke, fill: rgba(CIN, 0.5), stroke: CIN }));
    add("uvendire", sv("path", { d: "M172 98 Q196 60 236 34", ...stroke, "stroke-width": 1.2 }));
    add("dingil", sv("rect", { x: 104, y: 146, width: 54, height: 8, rx: 2, fill: rgba(HINT, 0.4), stroke: HINT }));
    const teker = sv("g", {});
    teker.append(sv("circle", { cx: 131, cy: 156, r: 48, ...stroke, "stroke-width": 3 }));
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; teker.append(sv("line", { x1: 131, y1: 156, x2: 131 + Math.cos(a) * 46, y2: 156 + Math.sin(a) * 46, stroke: HINT, "stroke-width": 1.2 })); }
    teker.append(sv("circle", { cx: 131, cy: 156, r: 7, fill: C.bg2, stroke: HINT, "stroke-width": 2 }));
    add("teker", teker);
    ["dizgin", "ok", "boyunduruk", "kasa", "bayrak", "uvendire", "teker", "dingil"].forEach((k) => svg.append(g[k]));
    const soru = sv("text", { x: 210, y: 236, "text-anchor": "middle", class: "ab-soru" });
    svg.append(soru);
    const fill = h("div.fill.dg-araba-fill", svg);
    const tepsi = h("div.ab-tepsi", h("span.muted", "Sökülen parçalar: "));
    const konusma = h("p.dg-sonuc", { "aria-live": "polite" }, "Kral Milinda: \"Saygıdeğer Nagasena, siz kimsiniz?\" Nagasena: \"Bana Nagasena derler, ama bu yalnızca bir ad.\" Kral itiraz eder; Nagasena sorar: \"Buraya neyle geldiniz?\" \"Arabayla.\" \"O hâlde, araba nedir?\"");
    const sokulen = new Set();
    const btns = PARCA.map(([k, ad]) => h("button.btn", { type: "button", "data-k": k, onclick: () => sok(k, ad) }, ad));
    const kur = h("button.btn.ghost", { type: "button", onclick: () => { sokulen.clear(); Object.values(g).forEach((x) => x.classList.remove("gitti")); btns.forEach((x) => (x.disabled = false)); tepsi.querySelectorAll(".f-chip").forEach((x) => x.remove()); soru.textContent = ""; konusma.textContent = "Araba yeniden kuruldu."; secimEl.style.display = "none"; } }, "Yeniden kur");
    stage.append(fill, h("div.controls", ...btns, kur), tepsi);
    const pad = h("div.pad.scroll.dg-alt", konusma);
    stage.append(pad);
    const secimEl = Oy.secim(pad, {
      anahtar: "buda.araba", soru: "Araba nerede?",
      secenekler: [
        { v: "ad", ad: "Yalnızca bir ad", ilke: "\"Araba\" parçalara bağlı olarak kullanılan bir addır; parçaların ardında ayrı bir şey yoktur. \"Ben\" de böyledir (anatta).", filozof: ["nagasena", "buda"],
          itiraz: "Milinda'nın sorusu: O hâlde iyi ve kötü eylemlerin sahibi kim? Nagasena'nın yanıtı: gece boyunca yanan lambanın alevi gibi, ne tamamen aynı ne tamamen başka bir süreklilik." },
        { v: "duzen", ad: "Parçaların doğru düzeni", ilke: "Araba, parçaların belirli bir amaçla belirli bir düzende birleşmesidir: biçim, maddeye eklenen gerçek bir şeydir.", filozof: ["aristoteles"],
          itiraz: "Budist yanıt: \"düzen\" de parçalar arasındaki ilişkiden başka bir şey değil; parçaları söktüğünüzde düzenden geriye bir şey kalmıyor." },
        { v: "butun", ad: "Parçalardan ayrı bir bütün", ilke: "Bütün, parçalarının toplamından ayrı, gerçek bir varlıktır; yoksa \"tek bir araba görüyorum\" algımızı açıklayamayız.", filozof: ["nyaya"],
          itiraz: "Parçaları tek tek söktünüz: o ayrı bütün hangi anda, nereye gitti?" },
      ],
    });
    secimEl.style.display = Oy.get("buda.araba") ? "" : "none";
    function sok(k, ad) {
      if (sokulen.has(k)) return;
      sokulen.add(k);
      g[k].classList.add("gitti");
      btns.find((x) => x.dataset.k === k).disabled = true;
      tepsi.append(h("span.f-chip", { style: { "--gel": HINT } }, ad));
      if (sokulen.size < PARCA.length) {
        konusma.textContent = `Nagasena: "${ad} araba mı?" Milinda: "Hayır." ${sokulen.size > 1 ? `(${sokulen.size} parça söküldü; hiçbiri araba değildi.)` : ""}`;
      } else {
        konusma.textContent = "Nagasena: \"Parçaların hiçbiri araba değil. Parçaların dışında da bir araba bulamadık. O hâlde 'araba' nedir?\"";
        soru.textContent = "araba nerede?";
        secimEl.style.display = "";
      }
    }
    return {};
  };

  /* --- Konfüçyüs: altın kuralın biçimleri ve beş ilişki --- */
  const KURAL = [
    { k: "konf", ad: "Konfüçyüs", renk: CIN, bicim: "olumsuz", metin: "Kendine istemediğini başkasına yapma.", kaynak: "Analektler 15.24 (ayrıca 12.2)", ozgun: "己所不欲，勿施於人" },
    { k: "yahudi", ad: "Yahudi geleneği", renk: C.ink, bicim: "olumsuz", metin: "Sana hoş gelmeyeni komşuna yapma. Tora'nın tamamı budur; gerisi açıklamadır, git öğren.", kaynak: "Hillel, Babil Talmudu, Şabat 31a" },
    { k: "hristiyan", ad: "Hristiyan geleneği", renk: C.ink, bicim: "olumlu", metin: "İnsanların size nasıl davranmasını istiyorsanız, siz de onlara öyle davranın.", kaynak: "İncil, Matta 7:12; Luka 6:31" },
    { k: "islam", ad: "İslam geleneği", renk: "#3FC1B0", bicim: "olumlu", metin: "Sizden biri, kendisi için istediğini kardeşi için de istemedikçe gerçekten iman etmiş olmaz.", kaynak: "Hadis: Buhârî, Îmân 7; Müslim, Îmân 71–72" },
    { k: "mahabharata", ad: "Mahabharata", renk: HINT, bicim: "olumsuz", metin: "Kişi başkalarına, kendisine hoş gelmeyecek biçimde davranmamalıdır; ahlakın özü budur.", kaynak: "Mahabharata, Anuśāsana Parva 113.8" },
    { k: "kant", ad: "Kant", renk: "#79AEEA", bicim: "evrensel", metin: "Yalnızca, aynı zamanda evrensel bir yasa olmasını isteyebileceğin ilkeye göre davran.", kaynak: "Ahlak Metafiziğinin Temellendirilmesi, 4:421" },
  ];
  const ILISKI = [
    ["Ana-baba ve çocuk", "sevgi (qin)"], ["Hükümdar ve bakan", "doğruluk (yi)"], ["Eşler", "ayrı görevler (bie)"],
    ["Büyük ve küçük", "sıra, saygı (xu)"], ["Dostlar", "güven (xin)"],
  ];
  D.altinkural = function (stage) {
    const W = 360, H = 260, cx = 180, cy = 128, R = 96;
    const svg = sv("svg", { viewBox: `0 0 ${W} ${H}`, class: "dg-kural-svg", "aria-hidden": "true" });
    svg.append(sv("circle", { cx, cy, r: R, fill: "none", stroke: rgba(C.brass, 0.25), "stroke-dasharray": "2 5" }));
    const pts = KURAL.map((x, i) => { const a = -Math.PI / 2 + (i / KURAL.length) * Math.PI * 2; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R]; });
    const cizgi = sv("g", {}); svg.append(cizgi);
    const nokt = KURAL.map((x, i) => { const c = sv("circle", { cx: pts[i][0], cy: pts[i][1], r: 7, fill: C.bg2, stroke: x.renk, "stroke-width": 2 }); svg.append(c); return c; });
    const merkez = sv("text", { x: cx, y: cy + 6, "text-anchor": "middle", class: "dg-kural-merkez" }); merkez.textContent = "恕"; svg.append(merkez);
    const kart = h("div.dg-kural-kart", { "aria-live": "polite" });
    const btns = KURAL.map((x, i) => h("button.btn.ghost", { type: "button", "data-k": x.k, style: { "--gel": x.renk }, onclick: () => goster(i) }, x.ad));
    function goster(i) {
      const x = KURAL[i];
      btns.forEach((b, j) => b.classList.toggle("on", j === i));
      nokt.forEach((c, j) => c.setAttribute("fill", KURAL[j].bicim === x.bicim ? KURAL[j].renk : C.bg2));
      cizgi.innerHTML = "";
      KURAL.forEach((y, j) => { if (j !== i && y.bicim === x.bicim) cizgi.append(sv("line", { x1: pts[i][0], y1: pts[i][1], x2: pts[j][0], y2: pts[j][1], stroke: rgba(C.brass, 0.6), "stroke-width": 1.2 })); });
      merkez.textContent = x.k === "konf" ? "恕" : "";
      kart.innerHTML = "";
      kart.style.setProperty("--gel", x.renk);
      kart.append(h("p.dg-kural-metin", "\"" + x.metin + "\""), x.ozgun ? h("p.orig.zh.dg-kural-oz", x.ozgun) : "",
        h("p.dg-kural-kaynak", `${x.kaynak} · ${x.bicim === "olumsuz" ? "olumsuz biçim: zarar verme" : x.bicim === "olumlu" ? "olumlu biçim: iyilik yap" : "evrenselleştirme testi"}`));
    }
    const ilis = h("div.dg-ilis", h("span.muted", "Beş ilişki (Mengzi 3A.4): "), ...ILISKI.map(([a, b]) => h("button.btn.ghost.dg-ilis-b", { type: "button", onclick: (e) => { ilisNot.textContent = `${a}: ${b}. Yükümlülük iki yönlüdür.`; [...ilis.querySelectorAll("button")].forEach((x) => x.classList.toggle("on", x === e.currentTarget)); } }, a)));
    const ilisNot = h("p.dg-ilis-not");
    const ust = h("div.dg-kural", h("div.dg-kural-g", svg), h("div.dg-kural-sag", h("div.dg-kural-btns", ...btns), kart));
    const pad = h("div.pad.scroll.dg-alt", ilis, ilisNot);
    stage.append(h("div.fill.dg-kural-fill", ust), pad);
    goster(0);
    Oy.secim(pad, {
      anahtar: "konfucyus.kural", soru: "Hangi biçim daha sağlam bir ahlak kuralı?",
      secenekler: [
        { v: "olumsuz", ad: "Olumsuz: istemediğini yapma", ilke: "Önce zarar vermemek; başkasının ne istediğini bildiğimizi varsaymamak.", filozof: ["konfucyus"],
          itiraz: "Yalnızca kaçınmayı söyler: yoldaki yaralıya yardım etmeyi emretmez." },
        { v: "olumlu", ad: "Olumlu: istediğini yap", ilke: "Ahlak etkin iyiliktir: kendin için istediğini başkası için de iste ve yap.", filozof: ["mozi"],
          itiraz: "Başkalarının istekleri benimkilerden farklı olabilir; kendi zevkimi \"iyilik\" diye dayatabilirim." },
        { v: "evrensel", ad: "İkisi de yetmez: evrenselleştir", ilke: "Kural kişisel isteklere değil, herkes için yasa olabilecek ilkelere dayanmalı.", filozof: ["kant"],
          lehte: "Kant altın kuralın, örneğin bir yargıcın suçluyu cezalandırmasını açıklayamayacağını belirtir (Temellendirme 4:430, dipnot).",
          itiraz: "Konfüçyüsçü yanıt: soyut bir test, ana-babaya ve dosta karşı özel yükümlülükleri, ilişkilerin sıcaklığını gözden kaçırabilir." },
      ],
    });
    return {};
  };

  /* --- Laozi: su ve taş --- */
  D.susta = function (stage) {
    const cv = h("canvas", { "aria-label": "Su ve taş" });
    cv.style.touchAction = "none";
    const fill = h("div.fill", cv);
    let yuz = 0, engel = false, t = 0;
    const not = h("p.dg-sonuc", { "aria-live": "polite" });
    const sl = L.slider({ label: "Yüzyıllar", min: 0, max: 100, step: 1, value: 0, fmt: (v) => `${Math.round(v)} yüzyıl`, oninput: (v) => { yuz = v; yaz(); } });
    const eb = h("button.btn", { type: "button", onclick: () => { engel = !engel; eb.classList.toggle("on", engel); yaz(); } }, "Suyun yoluna engel koy");
    stage.append(fill, h("div.controls", sl, eb));
    const pad = h("div.pad.scroll.dg-alt", not);
    stage.append(pad);
    function yaz() {
      not.textContent = (yuz < 5 ? "Damlalar taşa çarpıp dağılıyor; taş hiç değişmemiş gibi." : yuz < 50 ? `${Math.round(yuz)} yüzyıl: taşta sığ bir çukur belirdi.` : `${Math.round(yuz)} yüzyıl: en yumuşak şey en serti oydu.`) +
        (engel ? " Akarsu engelle çatışmıyor; etrafından dolaşıp yoluna devam ediyor." : "");
    }
    yaz();
    Oy.secim(pad, {
      anahtar: "laozi.eylem", soru: "Bir haksızlıkla karşılaştınız. Hangisi size daha yakın?",
      secenekler: [
        { v: "su", ad: "Su gibi: zorlamadan, akışa uyarak", ilke: "Wu wei: zorlamadan eylem. Yumuşak olan uzun vadede serti aşar (Tao Te Ching 78).", filozof: ["laozi", "zhuangzi"],
          itiraz: "Konfüçyüsçü eleştiri: iyilik kendiliğinden gelmez, emek ve eğitim ister. \"Akışa uymak\" bazen haksızlığa göz yummak olabilir." },
        { v: "tas", ad: "Taş gibi: kararlılıkla direnmek", ilke: "İyi olan, çabayla ve ilkeye bağlılıkla kurulur; insan doğası kendi hâline bırakılırsa iyiye gitmez.", filozof: ["xunzi"],
          itiraz: "Laozi: Sert ve katı olan ölümün yoldaşıdır, yumuşak ve esnek olan yaşamın (bölüm 76). Kırılmayan esneklik bazen daha güçlüdür." },
        { v: "duruma", ad: "Duruma göre", ilke: "Doğru tepki koşullara, ilişkilere ve ölçüye bağlıdır; ne her zaman boyun eğmek ne her zaman direnmek.", filozof: ["konfucyus", "aristoteles"],
          itiraz: "\"Duruma göre\" bir ilke mi, yoksa ilkeden kaçış mı? Neye göre karar vereceğimizi söylemedikçe boş kalabilir." },
      ],
    });
    const r = L.rng(5);
    const damla = Array.from({ length: 6 }, (_, i) => ({ y: r(), p: i / 6 }));
    const akis = Array.from({ length: 70 }, () => ({ u: r(), v: r() * 2 - 1, s: 0.6 + r() * 0.6 }));
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      // üst: akarsu ve engel
      const ry = H * 0.27, rh = H * 0.11, ex = w * 0.55;
      const sap = (x) => engel ? Math.exp(-((x - ex) ** 2) / (2 * (w * 0.07) ** 2)) : 0;
      akis.forEach((p) => {
        const x = p.u * w, side = p.v >= 0 ? 1 : -1;
        const y = ry + p.v * rh + side * sap(x) * rh * 1.1;
        ctx.strokeStyle = rgba(C.ink, 0.35); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x - 14 * p.s, y - (side * (sap(x) - sap(x - 14)) * rh)); ctx.lineTo(x, y); ctx.stroke();
      });
      if (engel) {
        ctx.fillStyle = rgba("#8A8F9A", 0.85);
        ctx.beginPath(); ctx.ellipse(ex, ry, w * 0.04, rh * 0.75, 0, 0, 7); ctx.fill();
      }
      // alt: damlayan su ve oyulan taş (fırça darbesi gibi kaba bir kütle)
      const sx = w / 2, sy = H * 0.78, sw = Math.min(w * 0.36, 260), shh = Math.min(H * 0.2, 110);
      const oy = (yuz / 100) * shh * 0.7, ow = 10 + (yuz / 100) * sw * 0.18;
      ctx.fillStyle = rgba("#8A8F9A", 0.55);
      ctx.beginPath();
      ctx.moveTo(sx - sw / 2, sy + shh / 2);
      ctx.quadraticCurveTo(sx - sw / 2 - 10, sy - shh / 2, sx - sw * 0.2, sy - shh / 2);
      ctx.lineTo(sx - ow, sy - shh / 2);
      ctx.quadraticCurveTo(sx, sy - shh / 2 + oy * 2, sx + ow, sy - shh / 2);
      ctx.lineTo(sx + sw * 0.25, sy - shh / 2);
      ctx.quadraticCurveTo(sx + sw / 2 + 12, sy - shh / 2 + 6, sx + sw / 2, sy + shh / 2);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = rgba(C.ink, 0.5); ctx.lineWidth = 1.2; ctx.stroke();
      damla.forEach((d) => {
        const y = lerp(H * 0.42, sy - shh / 2 + oy, d.y);
        ctx.fillStyle = rgba("#9FC3EE", 0.8);
        ctx.beginPath(); ctx.ellipse(sx, y, 2.6, 4, 0, 0, 7); ctx.fill();
        if (d.y > 0.97) { ctx.strokeStyle = rgba("#9FC3EE", 0.6); ctx.beginPath(); ctx.arc(sx, sy - shh / 2 + oy, 8, Math.PI, 0); ctx.stroke(); }
      });
      ctx.font = `28px ${FONT.zh}`; ctx.fillStyle = rgba(CIN, 0.75); ctx.textAlign = "right";
      ctx.fillText("上善若水", w - 18, H - 18); ctx.textAlign = "left";
      ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.fillText("en yüksek iyilik su gibidir (bölüm 8)", 16, H - 18);
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      damla.forEach((d) => { d.y += dt * 0.9; if (d.y > 1) d.y -= 1; });
      akis.forEach((p) => { p.u += dt * 0.08 * p.s; if (p.u > 1) p.u -= 1; });
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Zhuangzi: kelebek rüyası --- */
  D.kelebek = function (stage) {
    const cv = h("canvas", { "aria-label": "Zhuangzi ve kelebek" });
    const fill = h("div.fill", cv);
    let ruya = 0.15, t = 0;
    const sl = L.slider({ label: "Rüya", min: 0, max: 1, step: 0.01, value: ruya, fmt: (v) => (v < 0.35 ? "Zhou uyuyor" : v > 0.65 ? "kelebek uçuyor" : "ikisi arasında"), oninput: (v) => (ruya = v) });
    stage.append(fill, h("div.controls", sl));
    const pad = h("div.pad.scroll.dg-alt");
    stage.append(pad);
    Oy.secim(pad, {
      anahtar: "zhuangzi.ruya", soru: "Uyandınız. Kim olduğunuzdan emin misiniz?",
      secenekler: [
        { v: "zhou", ad: "Eminim: Zhou'yum, rüyayı ben gördüm", ilke: "Uyanıklık, rüyadan daha tutarlı ve süreklidir; bu fark güvenilir bir ölçüttür.", filozof: [],
          lehte: "Descartes da sonunda buna dayanır: rüyalar hayatın geri kalanıyla bağlanmaz, uyanıklık bağlanır (Altıncı Meditasyon).",
          itiraz: "Rüyadayken de \"bu kesinlikle gerçek\" diye düşünürüz. O anki emin olma duygunuz neyi kanıtlar?" },
        { v: "bilemem", ad: "Bilemem; ikisi de olabilir", ilke: "Rüyayı uyanıklıktan kesin ayıran bir işaret yoksa, deneyimin kendisinden kesin bilgi çıkmaz.", filozof: ["zhuangzi", "descartes"],
          itiraz: "Bu kuşku her şeyi yutabilir. Descartes onu yenmek için kullandı; Zhuangzi ise onunla rahat yaşamayı önerdi." },
        { v: "donusum", ad: "Ayrım o kadar önemli değil", ilke: "\"Şeylerin dönüşümü\": Zhou ve kelebek tek bir akışın farklı hâlleri; tek bir bakış açısına yapışmak gereksiz.", filozof: ["zhuangzi"],
          itiraz: "Öykünün kendisi \"elbette bir ayrım vardır\" der. Ayrımı önemsiz saymak, sorumluluğu da bulanıklaştırabilir mi?" },
      ],
    });
    pad.append(h("p.dg-bag", h("a", { href: "#descartes" }, "Descartes'ın rüya kuşkusuna git")));
    let st;
    function kelebek(ctx, x, y, s, a, flap) {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a;
      ctx.fillStyle = rgba(C.ink, 0.82);
      [-1, 1].forEach((sg) => {
        ctx.save(); ctx.scale(sg * (0.35 + 0.65 * Math.abs(Math.cos(flap))), 1);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(18, -34, 52, -30, 44, -6); ctx.bezierCurveTo(40, 6, 18, 6, 0, 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(0, 4); ctx.bezierCurveTo(26, 8, 34, 34, 16, 34); ctx.bezierCurveTo(6, 34, 2, 20, 0, 8); ctx.fill();
        ctx.restore();
      });
      ctx.strokeStyle = rgba(C.ink, 0.9); ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(0, 22); ctx.stroke();
      ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -10); ctx.quadraticCurveTo(-6, -24, -12, -26); ctx.moveTo(0, -10); ctx.quadraticCurveTo(6, -24, 12, -26); ctx.stroke();
      ctx.restore();
    }
    function uyuyan(ctx, x, y, s, a) {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a; ctx.lineCap = "round";
      ctx.strokeStyle = rgba(C.ink, 0.85);
      // fırça darbeleri: kol yastık, beden, bacaklar
      ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-70, 2); ctx.quadraticCurveTo(-10, -18, 60, 4); ctx.stroke();
      ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(58, 4); ctx.quadraticCurveTo(90, 8, 112, 0); ctx.stroke();
      ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-60, -6); ctx.quadraticCurveTo(-74, -20, -62, -26); ctx.stroke();
      ctx.fillStyle = rgba(C.ink, 0.85); ctx.beginPath(); ctx.arc(-84, -14, 12, 0, 7); ctx.fill();
      ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-160, 18); ctx.quadraticCurveTo(0, 12, 160, 20); ctx.stroke();
      ctx.restore();
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const s = Math.min(w, H) / 420;
      uyuyan(ctx, w * 0.42, H * 0.72, s * 1.1, clamp(1.15 - ruya * 1.3, 0.08, 1));
      const ka = clamp(ruya * 1.3 - 0.1, 0.08, 1);
      const bx = w * (0.5 + 0.22 * Math.sin(t * 0.4)), by = H * (0.36 + 0.1 * Math.sin(t * 0.7));
      kelebek(ctx, bx, by, s * (0.8 + ruya * 0.6), ka, t * 6);
      // mühür: 莊周 ve 蝶
      ctx.font = `26px ${FONT.zh}`; ctx.fillStyle = rgba(CIN, 0.75 * (1 - ruya) + 0.15); ctx.fillText("莊周", 18, 40);
      ctx.fillStyle = rgba(CIN, 0.75 * ruya + 0.15); ctx.textAlign = "right"; ctx.fillText("蝶", w - 18, 40); ctx.textAlign = "left";
      ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
      ctx.fillText(ruya > 0.35 && ruya < 0.65 ? "物化: şeylerin dönüşümü" : "", w / 2, H - 14); ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Hint mantığı: Nyaya'nın beş adımı ve Nagarjuna'nın dörtlü önermesi --- */
  const ADIM = [
    ["pratijñā", "İddia", "Tepede ateş var."],
    ["hetu", "Gerekçe", "Çünkü tepede duman var."],
    ["udāharaṇa", "Örnekli kural", "Dumanın olduğu her yerde ateş vardır; mutfaktaki ocakta olduğu gibi."],
    ["upanaya", "Uygulama", "Tepe de böyle, dumanlı bir yer."],
    ["nigamana", "Sonuç", "Öyleyse tepede ateş var."],
  ];
  D.nyaya = function (stage) {
    const govde = h("div.fill.dg-nyaya");
    const pad = h("div.pad.scroll.dg-alt");
    const seg = L.seg([["bes", "Beş adım"], ["dort", "Dörtlü önerme"]], "bes", (v) => goster(v));
    stage.append(h("div.controls.top", seg), govde, pad);
    // beş adım
    const bes = h("div.dg-bes");
    const yuvalar = ADIM.map(([sk, ad], i) => h("div.dg-yuva", h("span.dg-no", String(i + 1)), h("div", h("b", ad), h("i.orig", sk), h("p.dg-yuva-m", "…"))));
    const sira = [2, 4, 0, 3, 1];
    let n = 0;
    const kartlar = sira.map((i) => h("button.btn.dg-kart", { type: "button", "data-i": i, onclick: (e) => yerlestir(i, e.currentTarget) }, ADIM[i][2]));
    const ipucu = h("p.dg-sonuc", { "aria-live": "polite" }, "Kartları çıkarımın sırasına göre seçin. İlk adım: kanıtlanacak iddia.");
    const karsilastir = h("div.dg-karsi");
    bes.append(h("div.dg-yuvalar", ...yuvalar), h("div.dg-kartlar", ...kartlar), ipucu, karsilastir);
    function yerlestir(i, el) {
      if (i !== n) { ipucu.textContent = `Bu, ${i + 1}. adım. Şimdi ${n + 1}. adım gerekiyor: ${ADIM[n][1].toLowerCase()}.`; el.classList.add("sars"); setTimeout(() => el.classList.remove("sars"), 400); return; }
      yuvalar[i].querySelector(".dg-yuva-m").textContent = ADIM[i][2];
      yuvalar[i].classList.add("dolu");
      el.disabled = true; el.classList.add("kullanildi");
      n++;
      if (n < 5) { ipucu.textContent = `${n + 1}. adım: ${ADIM[n][1].toLowerCase()}.`; return; }
      ipucu.textContent = "Çıkarım tamam. Karşınızdakini ikna etmek için iddia hem başta hem sonda söylenir.";
      karsilastir.innerHTML = "";
      karsilastir.append(h("h4", "Aristoteles'in kıyasıyla yan yana"),
        h("p", h("b", "Büyük önerme: "), "Dumanın olduğu her yerde ateş vardır. ", h("span.muted", "↔ 3. adım (Nyaya bir örnek de ister: ocak)")),
        h("p", h("b", "Küçük önerme: "), "Tepede duman var. ", h("span.muted", "↔ 2. ve 4. adım")),
        h("p", h("b", "Sonuç: "), "Tepede ateş var. ", h("span.muted", "↔ 1. ve 5. adım")),
        h("p", h("a", { href: "#kiyas" }, "Kıyas makinesini aç")));
    }
    const sifirB = h("button.btn.ghost", { type: "button", onclick: () => { n = 0; yuvalar.forEach((y) => { y.classList.remove("dolu"); y.querySelector(".dg-yuva-m").textContent = "…"; }); kartlar.forEach((k) => { k.disabled = false; k.classList.remove("kullanildi"); }); karsilastir.innerHTML = ""; ipucu.textContent = "Kartları çıkarımın sırasına göre seçin. İlk adım: kanıtlanacak iddia."; } }, "Baştan");
    bes.append(sifirB);
    // dörtlü önerme
    const dort = h("div.dg-dort");
    const KOSE = [["Sonsuzdur", "A"], ["Sonsuz değildir", "değil-A"], ["Hem sonsuzdur hem değildir", "hem A hem değil-A"], ["Ne sonsuzdur ne de sonsuz değildir", "ne A ne değil-A"]];
    const kare = h("div.dg-kare", h("p.dg-kare-soru", "\"Dünya sonsuz mudur?\""), ...KOSE.map(([ad, f], i) => h("div.dg-kose", { "data-i": i }, h("b", f), h("span", ad))));
    dort.append(kare);
    function goster(v) {
      govde.innerHTML = ""; govde.append(v === "bes" ? bes : dort);
      pad.style.display = v === "bes" ? "none" : "";
    }
    const secim = Oy.secim(pad, {
      anahtar: "nagarjuna.kose", soru: "Hangi köşede durursunuz?",
      secenekler: [
        { v: "a", ad: "Sonsuzdur", ilke: "İki değerli mantık: önerme ya doğrudur ya yanlış; bu durumda doğru.", filozof: [],
          itiraz: "Buda bu soruyu yanıtlamadı: deneyimle doğrulanamaz ve acıdan kurtulmaya bir katkısı yoktur." },
        { v: "degil", ad: "Sonsuz değildir", ilke: "Yine iki değerli mantık, öteki yanıt: dünyanın bir sınırı vardır.", filozof: [],
          itiraz: "Aynı itiraz: bu da sınanamayan, üstelik tutunulan bir görüştür." },
        { v: "hem", ad: "Hem öyle hem değil", ilke: "Farklı bakımlardan bir şey hem öyle hem değil olabilir.", filozof: [],
          itiraz: "Aynı bakımdan hem A hem değil-A, çelişmezlik ilkesini çiğner. Nyaya da Aristoteles de çelişkiyi kabul etmez." },
        { v: "ne", ad: "Ne öyle ne değil", ilke: "Gerçek, kavramlarımızın iki ucunun da ötesindedir.", filozof: [],
          itiraz: "Nagarjuna bunu da bir görüş olarak reddeder: \"ne o ne bu\" da bir tutunma olabilir." },
        { v: "hicbiri", ad: "Hiçbiri: soru boşa düşer", ilke: "Dört köşe de \"dünya\"nın kendi başına bir özü olduğunu varsayar. Öz yoksa (boşluk) soru yanıtlanacak bir şey bulamaz.", filozof: ["nagarjuna", "buda"],
          itiraz: "Nyaya: Her şey özsüzse senin bu tezin de özsüzdür. Nagarjuna: \"Bir tezim olsaydı bu kusur bana ait olurdu; benim tezim yok\" (Vigrahavyāvartanī 29)." },
      ],
      sonra: (v) => kare.querySelectorAll(".dg-kose").forEach((k) => k.classList.toggle("on", v === "hicbiri" ? false : ["a", "degil", "hem", "ne"][+k.dataset.i] === v)) || kare.classList.toggle("bos", v === "hicbiri"),
    });
    kare.querySelectorAll(".dg-kose").forEach((k) => k.addEventListener("click", () => secim.sec(["a", "degil", "hem", "ne"][+k.dataset.i])));
    goster("bes");
    return {};
  };
})();
