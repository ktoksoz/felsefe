/* 8. İslam felsefesi deneyleri: çeviri akışı, erdemli şehir, uçan adam, pamuk ve ateş, Hay bin Yakzan, İbn Haldun döngüsü */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;
  const NS = "http://www.w3.org/2000/svg";
  const sv = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  /* --- Çeviri hareketi: dört dil, altı yüzyıl --- */
  const DILLER = [
    ["Yunanca", "Atina, İskenderiye", "MÖ 4. yy –"],
    ["Süryanice", "Urfa, Nusaybin, Cundişapur", "5.–9. yy"],
    ["Arapça", "Bağdat", "8.–12. yy"],
    ["Latince", "Toledo, Paris", "12.–13. yy"],
  ];
  D.beytulhikme = function (stage) {
    stage.classList.add("bh");
    const band = h("ol.bh-band", DILLER.map(([d, y, t]) => h("li", h("b", d), h("span", y), h("small", t))));
    const agKap = h("div.bh-ag");
    stage.append(band, agKap);
    const ag = EtkiAgi(agKap, {
      filozoflar: ["platon", "aristoteles", "plotinos", "huneyn", "kindi", "farabi", "ibn_sina", "ibn_rusd", "aquinas"],
      zincir: ["aristoteles", "huneyn", "farabi", "ibn_sina", "ibn_rusd", "aquinas"],
    });
    const lis = [...band.children];
    let tm = [];
    function bandYak(i) { lis.forEach((li, k) => { li.classList.toggle("on", k === i); li.classList.toggle("gecti", k < i); }); }
    function akis() {
      tm.forEach(clearTimeout); tm = [];
      ag.akis();
      // zincirin her halkası 1,4 sn: Aristoteles→Huneyn (Süryanice), sonra Arapça, son halkada Latince
      [0, 1, 2, 2, 2, 3].forEach((d, i) => tm.push(setTimeout(() => bandYak(d), i * 1400)));
      tm.push(setTimeout(() => ag.sec("aquinas"), 6 * 1400 + 200));
    }
    const ctl = h("div.controls", h("button.btn.primary", { type: "button", onclick: akis }, "Akışı göster"),
      h("span.muted.bh-not", "Bir filozofa tıklayın: kimden etkilendi, kimi etkiledi?"));
    const pan = h("div.pad.scroll.bh-panel");
    stage.append(ctl, pan);
    Oy.secim(pan, {
      anahtar: "beytul-hikme.ceviri", soru: "Bir çevirmen olsaydınız, Aristoteles'i nasıl çevirirdiniz?",
      secenekler: [
        { v: "kelime", ad: "Kelime kelime", ilke: "Asla sadakat: her sözcüğün karşılığı korunmalı, çevirmen araya girmemeli.", filozof: [],
          lehte: "Okur, çevirmenin yorumuyla değil yazarın kendi sözcükleriyle karşılaşır.",
          itiraz: "Diller farklı yapılardadır; kelime kelime çeviri çoğu zaman anlamı bozar. Huneyn'in kuşağı bu yüzden yöntemi değiştirdi." },
        { v: "anlam", ad: "Anlamı aktar", ilke: "Cümlenin anlamını kavrayıp hedef dilde yeniden kurmak.", filozof: ["huneyn"],
          lehte: "Metin yeni dilde de okunur ve anlaşılır olur; Huneyn birden çok elyazmasını karşılaştırarak metni düzeltirdi.",
          itiraz: "Çevirmen anlamı yanlış kavrarsa kendi yorumunu yazara mal eder ve okur bunu fark edemez." },
        { v: "serh", ad: "Çevir ve yorumla", ilke: "Metni aktarmak yetmez; açıklamak, tartışmak ve geliştirmek gerekir.", filozof: ["ibn_rusd"],
          lehte: "İbn Rüşd'ün şerhleri Aristoteles'i hem İslam dünyasında hem Latin Avrupa'da yeniden okunur kıldı.",
          itiraz: "Yorum ile metin iç içe geçerse sonraki kuşaklar Aristoteles'in ne dediğini yorumcununkinden ayıramayabilir." },
      ],
    });
    return { enter: () => ag.enter(), leave: () => { tm.forEach(clearTimeout); ag.leave(); } };
  };

  /* --- Farabi: şehrin amacı --- */
  const SEHIR = [
    { v: "mutluluk", ad: "Mutluluk", tur: "Erdemli şehir", ar: "الفاضلة", merkez: "bilge yönetici", uyum: 1,
      ilke: "Şehrin amacı gerçek mutluluktur; herkes yeteneğine göre bu amaca katkıda bulunur, tıpkı organların bedenin sağlığına katkısı gibi.",
      filozof: ["farabi", "platon", "aristoteles"],
      itiraz: "Gerçek mutluluğun ne olduğunu kim belirleyecek? Tek bir mutluluk anlayışını herkese uygulamak özgürlüğü kısıtlayabilir." },
    { v: "zorunlu", ad: "Zorunlu ihtiyaçlar", tur: "Zorunlu ihtiyaç şehri (zarûriyye)", merkez: "ekmek ve barınak", uyum: 0.5,
      ilke: "Şehir yalnızca hayatta kalmak için gerekeni (yiyecek, barınak, giyecek) sağlamaya yönelir.", filozof: [],
      lehte: "Temel ihtiyaçları karşılanmamış bir topluluk başka hiçbir amacı izleyemez.",
      itiraz: "Farabi'ye göre hayatta kalmak bir amaç değil, araçtır; şehir burada durursa insanlar yeteneklerini geliştiremez." },
    { v: "zenginlik", ad: "Zenginlik", tur: "Zenginlik şehri (nezâle)", merkez: "servet", uyum: 0.35,
      ilke: "Şehrin başarısı biriktirdiği servetle ölçülür.", filozof: [],
      itiraz: "Servet başka şeyler için bir araçtır; kendisi amaç olunca sınırı kalmaz ve insanlar birbirini araç olarak görür." },
    { v: "haz", ad: "Haz", tur: "Haz şehri (hısset)", merkez: "eğlence", uyum: 0.3,
      ilke: "Amaç yemek, içmek ve eğlenceden alınan zevktir.", filozof: [],
      itiraz: "Yalnızca bedensel zevke yönelen bir topluluk, uzun vadeli iyiyi anlık hazza feda eder." },
    { v: "san", ad: "Şan ve şeref", tur: "Şan şehri (kerâme)", merkez: "övgü", uyum: 0.4,
      ilke: "Amaç başkalarınca övülmek, onurlandırılmaktır.", filozof: [],
      itiraz: "Onur başkalarının görüşüne bağlıdır; gerçek değeri değil görünüşü ölçer. Aristoteles de onuru mutluluk için yetersiz bulur (Nikomakhos'a Etik I.5)." },
    { v: "ustunluk", ad: "Üstünlük", tur: "Üstünlük şehri (tegallüb)", merkez: "güç", uyum: 0.2,
      ilke: "Amaç başkalarına egemen olmak, onları boyun eğdirmektir.", filozof: [],
      itiraz: "Başkalarının zararına kurulan güç kalıcı barışı ve işbirliğini imkânsız kılar." },
    { v: "ozgurluk", ad: "Özgürlük", tur: "Topluluk şehri (cemâiyye)", merkez: null, uyum: 0.6,
      ilke: "Herkes dilediği gibi yaşamakta özgürdür; kimse kimseye üstün değildir.", filozof: [],
      lehte: "Farabi'ye göre cahil şehirlerin en hoş olanıdır; erdemli insanlar en kolay burada yetişebilir.",
      itiraz: "Ortak bir amaç olmadığı için şehir zamanla birbiriyle yarışan küçük gruplara bölünür." },
  ];
  D.erdemlisehir = function (stage) {
    const svg = sv("svg", { class: "es-svg", role: "img", "aria-label": "Şehir bir beden gibi" });
    const fill = h("div.fill", svg);
    const etiket = h("p.es-etiket");
    const pan = h("div.pad.scroll.es-panel");
    stage.append(fill, h("div.es-alt", etiket), pan);
    let cur = SEHIR[0];
    function draw() {
      const r = svg.getBoundingClientRect();
      if (!r.width) return;
      const W = r.width, H = r.height, cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.42;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = "";
      const u = cur.uyum, merkezli = !!cur.merkez;
      const ring = (n, rr, off) => Array.from({ length: n }, (_, i) => { const a = off + (i / n) * 6.283; return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]; });
      const r1 = ring(6, R * 0.45, -1.57), r2 = ring(12, R * 0.85, -1.31);
      // cemâiyye: merkez yok, düğümler küçük kümelere dağılır
      const kume = (p, i) => (merkezli ? p : [p[0] + Math.cos(i * 2.1) * R * 0.12, p[1] + Math.sin(i * 2.1) * R * 0.12]);
      const A = r1.map(kume), B = r2.map(kume);
      svg.append(sv("circle", { cx, cy, r: R, class: "es-halka" }));
      const cizgi = (p, q, k) => svg.append(sv("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], class: "es-c", "stroke-opacity": k }));
      if (merkezli) {
        A.forEach((p) => cizgi([cx, cy], p, 0.25 + u * 0.7));
        B.forEach((p, i) => cizgi(A[Math.floor(i / 2)], p, 0.15 + u * 0.6));
        if (u < 0.5) B.forEach((p, i) => i % 3 === 0 && cizgi(p, B[(i + 5) % 12], 0.35)); // birbirine karşı çıkan bağlar
      } else {
        B.forEach((p, i) => cizgi(p, A[Math.floor(i / 2)], 0.45));
        A.forEach((p, i) => i % 2 === 0 && cizgi(p, A[i + 1], 0.45));
      }
      [...A, ...B].forEach((p, i) => svg.append(sv("circle", { cx: p[0], cy: p[1], r: i < 6 ? 9 : 6, class: "es-n" + (u >= 1 ? " on" : "") })));
      if (merkezli) {
        svg.append(sv("circle", { cx, cy, r: R * 0.17, class: "es-m" + (u >= 1 ? " on" : "") }));
        const t = sv("text", { x: cx, y: cy + 5, class: "es-mt", "text-anchor": "middle" });
        t.textContent = cur.merkez;
        svg.append(t);
      }
      if (u >= 1) {
        const k = sv("text", { x: cx, y: cy - R - 8 < 14 ? 16 : cy - R - 8, class: "es-ar", "text-anchor": "middle" });
        k.textContent = "المدينة الفاضلة";
        svg.append(k);
      }
    }
    function sec(v) {
      cur = SEHIR.find((s) => s.v === v) || SEHIR[0];
      etiket.innerHTML = `Farabi bu şehre <b>${cur.tur}</b> der.`;
      draw();
    }
    Oy.secim(pan, { anahtar: "farabi.sehir", soru: "Bu şehrin amacı ne olsun?", secenekler: SEHIR, sonra: sec });
    sec(Oy.get("farabi.sehir") || "mutluluk");
    if (!Oy.get("farabi.sehir")) etiket.innerHTML = "Bir amaç seçin. Farabi'nin <b>erdemli şehri</b> organları uyum içinde çalışan bir beden gibidir.";
    new ResizeObserver(draw).observe(svg);
    return { enter: draw };
  };

  /* --- İbn Sina: uçan adam --- */
  const DUYU = [
    ["gorme", "Görme", "◉"], ["isitme", "İşitme", "))"], ["koku", "Koku", "≈"], ["tat", "Tat", "◡"], ["dokunma", "Dokunma", "✋"],
  ];
  D.ucanadam = function (stage) {
    const cv = h("canvas", { "aria-label": "Boşlukta asılı insan" });
    const fill = h("div.fill", cv);
    const acik = new Set(DUYU.map((d) => d[0]));
    const btns = DUYU.map(([k, ad]) => h("button.btn.on", { type: "button", "data-k": k, onclick: (e) => degis(k, e.currentTarget) }, ad));
    const durum = h("p.ua-durum");
    const pan = h("div.pad.scroll.ua-panel", durum);
    stage.append(fill, h("div.controls", h("span.muted", "Duyuları kapat:"), ...btns), pan);
    function degis(k, b) {
      acik.has(k) ? acik.delete(k) : acik.add(k);
      b.classList.toggle("on", acik.has(k));
      yaz();
    }
    function yaz() {
      durum.textContent = acik.size
        ? `Açık duyular: ${acik.size}. Hâlâ dünyadan bilgi geliyor.`
        : "Hiçbir duyu açık değil. Ne ışık, ne ses, ne dokunuş. Peki şimdi, var olduğunuzu biliyor musunuz?";
      durum.classList.toggle("hepsi", !acik.size);
    }
    yaz();
    Oy.secim(pan, {
      anahtar: "ibn-sina.ucan", soru: "Bütün duyuları kapalı bu insan var olduğunu bilir mi?",
      secenekler: [
        { v: "evet", ad: "Evet, var olduğunu bilir", ilke: "Kendinin farkında olmak duyulardan bağımsızdır; \"ben\" (nefs) bedenle aynı şey değildir.",
          filozof: ["ibn_sina", "descartes", "augustinus"],
          itiraz: "Hiç deneyimi olmamış biri \"ben\" kavramına, hatta düşünmeye sahip olabilir mi? Düşünce deneyi sezgimize güveniyor; sezgi tek başına kanıt değildir." },
        { v: "hayir", ad: "Hayır, bilinç duyulardan beslenir", ilke: "Zihnin içeriği deneyimden gelir; algı yoksa kendini fark etmek de olmaz.",
          filozof: ["locke", "hume"],
          itiraz: "İbn Sina'ya göre algılanan hiçbir şey kalmasa da algılayanın kendisi kalır ve kendini hemen kavrar." },
        { v: "belki", ad: "Var olduğunu bilir, ama bedensiz olduğunu değil", ilke: "Kendimi bedenimi düşünmeden bilebilmem, bedenimden ayrı bir şey olduğumu kanıtlamaz.",
          filozof: [], lehte: "Aynı itiraz yüzyıllar sonra Descartes'a da yöneltildi: bir şeyi bir başkası olmadan düşünebilmek, ikisinin gerçekten ayrı olduğunu göstermez.",
          itiraz: "İbn Sina: Bildiğim şey ile bilmediğim şey aynı olamaz. Kendimi biliyor, bedenimi bilmiyorsam, ikisi farklıdır." },
      ],
    });
    let st, t = 0;
    const r = L.rng(11);
    const yildiz = Array.from({ length: 90 }, () => [r(), r(), r()]);
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, cy = H * 0.5 + Math.sin(t * 0.8) * 4, s = Math.min(w, H) / 280;
      const gor = acik.has("gorme");
      yildiz.forEach(([x, y, k]) => { ctx.fillStyle = rgba("#E2C27E", gor ? 0.25 + 0.4 * k : 0.04); ctx.fillRect(x * w, y * H, 1.5, 1.5); });
      // duyu kanalları: figürden dışa uzanan ışınlar ve dünyadan gelen işaretler
      DUYU.forEach(([k, ad, ik], i) => {
        const a = -2.6 + i * 1.3, R = Math.min(w, H) * 0.38;
        const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R * 0.85;
        const on = acik.has(k);
        ctx.strokeStyle = rgba(C.brass, on ? 0.55 : 0.08); ctx.lineWidth = 1; ctx.setLineDash(on ? [] : [3, 6]);
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 30 * s, cy + Math.sin(a) * 30 * s); ctx.lineTo(x, y); ctx.stroke(); ctx.setLineDash([]);
        if (on) { // kanaldan içeri akan işaret
          const p = (t * 0.5 + i * 0.2) % 1;
          ctx.fillStyle = rgba("#E2C27E", 0.9);
          ctx.beginPath(); ctx.arc(lerp(x, cx + Math.cos(a) * 30 * s, p), lerp(y, cy + Math.sin(a) * 30 * s, p), 2.4, 0, 7); ctx.fill();
        }
        ctx.font = `600 13px ${FONT.ui}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillStyle = on ? C.ink : rgba(C.muted, 0.5);
        ctx.fillText(ad, x, y + (Math.sin(a) > 0 ? 14 : -14));
        ctx.strokeStyle = on ? C.brass : rgba(C.muted, 0.4);
        ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.stroke();
        if (!on) { ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4); ctx.stroke(); }
      });
      ctx.textAlign = "left";
      // boşlukta asılı figür: kollar ve bacaklar birbirine değmez
      ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2.2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(0, -34, 9, 0, 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -24); ctx.lineTo(0, 8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-4, -16); ctx.lineTo(-30, -6); ctx.moveTo(4, -16); ctx.lineTo(30, -6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-3, 8); ctx.lineTo(-16, 38); ctx.moveTo(3, 8); ctx.lineTo(16, 38); ctx.stroke();
      if (!acik.has("gorme")) { ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.moveTo(-8, -36); ctx.lineTo(8, -36); ctx.stroke(); }
      // içteki "ben": duyular kapandıkça belirginleşen ışık
      const k = 1 - acik.size / DUYU.length;
      const g = ctx.createRadialGradient(0, -12, 0, 0, -12, 26 + k * 20);
      g.addColorStop(0, rgba("#E2C27E", 0.15 + 0.6 * k)); g.addColorStop(1, rgba("#E2C27E", 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -12, 26 + k * 20, 0, 7); ctx.fill();
      if (k === 1) { ctx.fillStyle = "#E2C27E"; ctx.font = `italic 14px ${FONT.body}`; ctx.textAlign = "center"; ctx.fillText("ben", 0, -8); ctx.font = `20px ${FONT.ar}`; ctx.fillText("نفس", 0, 66); }
      ctx.restore();
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Gazali ve İbn Rüşd: pamuk ve ateş --- */
  const OKUMA = {
    gozlem: { ad: "Gözlem", metin: "Gördüğümüz: önce ateş pamuğa değiyor, sonra pamuk yanıyor. Gözümüze gelen bir ardışıklık." },
    gazali: { ad: "Gazali'nin okuması", metin: "Ateş ile yanma arasındaki zorunlu bağ gözlemlenmez. Yanmayı yaratan Tanrı'dır; ateşin ardından yanmanın gelmesi O'nun sürdürdüğü bir düzen, bir âdettir. Bu yüzden Tanrı dilerse İbrahim ateşe atıldığında yanmaz." },
    ibnrusd: { ad: "İbn Rüşd'ün okuması", metin: "Ateşin yakma gücü onun doğasındandır. Şeylerin belirli doğaları olmasaydı onları tanımlayamaz, hiçbir şey bilemezdik. Nedenleri inkâr eden, aklı inkâr etmiş olur." },
    hume: { ad: "Hume'un okuması", metin: "Yedi yüzyıl sonra: Zorunluluğu dünyada değil, kendi zihnimizde buluruz. Pek çok kez birlikte gördüğümüz için yanmayı bekleriz; bu bir alışkanlıktır." },
  };
  D.pamukates = function (stage) {
    const cv = h("canvas", { "aria-label": "Pamuk ve ateş" });
    const fill = h("div.fill", cv);
    let okuma = "gozlem", yak = 0, yaklas = 0, t = 0, yaklasiyor = false;
    const metin = h("p.pa-metin");
    const seg = L.seg(Object.entries(OKUMA).map(([k, v]) => [k, v.ad]), okuma, (k) => { okuma = k; metin.textContent = OKUMA[k].metin; });
    metin.textContent = OKUMA[okuma].metin;
    const bas = h("button.btn.primary", { type: "button", onclick: () => { if (yak > 0.95 || yaklasiyor) { yak = 0; yaklas = 0; yaklasiyor = false; bas.textContent = "Ateşi yaklaştır"; } else yaklasiyor = true; } }, "Ateşi yaklaştır");
    const pan = h("div.pad.scroll.pa-panel", metin);
    stage.append(fill, h("div.controls", bas, seg), pan);
    Oy.secim(pan, {
      anahtar: "gazali-ibn-rusd.ates", soru: "Sizce pamuğu yakan ateş mi?",
      secenekler: [
        { v: "doga", ad: "Evet, yakmak ateşin doğası", ilke: "Şeylerin kendilerine özgü güçleri vardır; neden-sonuç ilişkisi gerçektir ve akılla bilinir.", filozof: ["ibn_rusd", "aristoteles"],
          itiraz: "Gazali: Bu gücü hiçbir zaman gözlemlemeyiz; yalnızca iki olayın birlikte olduğunu görürüz. Zorunluluk gözlemden çıkmaz." },
        { v: "adet", ad: "Yalnızca birlikte olduklarını görürüz", ilke: "Gözlem bize ardışıklığı gösterir, zorunluluğu değil.", filozof: ["gazali", "hume"],
          lehte: "Gazali bu görüşü Tanrı'nın kudreti çerçevesinde, Hume ise zihnin alışkanlığı üzerinden savundu: aynı gözlem, çok farklı sonuçlar.",
          itiraz: "İbn Rüşd: Nedenleri inkâr edersek hiçbir şeyi bilemeyiz; bilim, şeylerin doğalarını bilmeye dayanır." },
        { v: "bilinmez", ad: "Bunu kesin olarak bilemeyiz", ilke: "Yargıyı askıya almak: iki görüş de gözlemin ötesine geçen bir iddiada bulunuyor.", filozof: ["pyrrhon"],
          itiraz: "Hayatımızı yine de ateşin yakacağını varsayarak sürdürüyoruz. Askıya alınmış bir yargıyla yaşanabilir mi?" },
      ],
    });
    const r = L.rng(5);
    const kivilcim = Array.from({ length: 60 }, () => ({ x: r(), y: r(), v: 0.4 + r() }));
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const py = H * 0.62, px = w * 0.68, fx = lerp(w * 0.22, px - 34, L.ease(yaklas));
      // zemin
      ctx.strokeStyle = rgba(C.brass, 0.35); ctx.beginPath(); ctx.moveTo(w * 0.08, py + 30); ctx.lineTo(w * 0.92, py + 30); ctx.stroke();
      // pamuk: yandıkça kararır ve küçülür
      const k = yak;
      ctx.fillStyle = L.mix("#EDE7DC", "#2a2420", k);
      for (let i = 0; i < 7; i++) { const a = i * 0.9; ctx.beginPath(); ctx.arc(px + Math.cos(a) * 14 * (1 - k * 0.5), py + Math.sin(a) * 9 * (1 - k * 0.5), 14 * (1 - k * 0.55), 0, 7); ctx.fill(); }
      if (k > 0.05 && k < 0.98) { // pamuğun alevi ve kıvılcımları
        kivilcim.forEach((p) => {
          p.y -= 0.01 * p.v; if (p.y < 0) p.y = 1;
          ctx.fillStyle = rgba("#E8743B", p.y * (1 - k * 0.6));
          ctx.fillRect(px - 18 + p.x * 36, py - 10 - (1 - p.y) * 60, 2, 2);
        });
      }
      // mum ve alev
      ctx.fillStyle = "#EDE7DC"; ctx.fillRect(fx - 6, py - 8, 12, 38);
      const fl = 1 + Math.sin(t * 9) * 0.08;
      ctx.fillStyle = "#E8743B";
      ctx.beginPath(); ctx.moveTo(fx - 7, py - 10); ctx.quadraticCurveTo(fx - 9, py - 26 * fl, fx, py - 40 * fl); ctx.quadraticCurveTo(fx + 9, py - 26 * fl, fx + 7, py - 10); ctx.fill();
      ctx.fillStyle = "#F3E3B3"; ctx.beginPath(); ctx.ellipse(fx, py - 18, 3, 8 * fl, 0, 0, 7); ctx.fill();
      // okuma katmanı
      const y0 = H * 0.2;
      ctx.font = `600 13px ${FONT.ui}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      const ok = (x1, x2, renk, kesik, etiket) => {
        ctx.strokeStyle = renk; ctx.fillStyle = renk; ctx.lineWidth = 1.6; ctx.setLineDash(kesik ? [5, 6] : []);
        ctx.beginPath(); ctx.moveTo(x1, y0); ctx.lineTo(x2 - 8, y0); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(x2, y0); ctx.lineTo(x2 - 10, y0 - 5); ctx.lineTo(x2 - 10, y0 + 5); ctx.fill();
        ctx.fillText(etiket, (x1 + x2) / 2, y0 - 16);
      };
      const ax = w * 0.22, bx = px;
      ctx.fillStyle = C.ink;
      ctx.fillText("ateş değer", ax, y0 + 22); ctx.fillText("pamuk yanar", bx, y0 + 22);
      [ax, bx].forEach((x) => { ctx.beginPath(); ctx.arc(x, y0, 5, 0, 7); ctx.fillStyle = C.brass; ctx.fill(); });
      if (okuma === "gozlem") ok(ax + 10, bx - 6, C.muted, true, "önce … sonra");
      if (okuma === "gazali") {
        ctx.strokeStyle = C.muted; ctx.setLineDash([2, 7]); ctx.beginPath(); ctx.moveTo(ax + 10, y0); ctx.lineTo(bx - 10, y0); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = C.ink; ctx.fillText("zorunlu bağ gözlemlenmez", (ax + bx) / 2, y0 - 16);
        ctx.fillStyle = C.brass; ctx.fillText("âdet: Tanrı'nın sürdürdüğü düzen", (ax + bx) / 2, y0 - 36);
        ctx.font = `18px ${FONT.ar}`; ctx.fillText("عادة", (ax + bx) / 2, y0 + 20);
      }
      if (okuma === "ibnrusd") ok(ax + 10, bx - 6, "#E2C27E", false, "yakma gücü ateşin doğasında");
      if (okuma === "hume") {
        ok(ax + 10, bx - 6, C.muted, true, "dünyada: yalnızca ardışıklık");
        const gx = (ax + bx) / 2, gy = H * 0.86;
        ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(gx, gy, 12, 0, 7); ctx.stroke();
        ctx.fillStyle = C.ink; ctx.fillText("zihin: \"yine yanacak\" beklentisi", gx, gy + 24 > H - 8 ? gy - 22 : gy + 24);
      }
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      if (yaklasiyor && yaklas < 1) yaklas = Math.min(1, yaklas + dt * 0.8);
      if (yaklas >= 1 && yak < 1) { yak = Math.min(1, yak + dt * 0.45); if (yak >= 1) bas.textContent = "Baştan"; }
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- İbn Tufeyl: Hay bin Yakzan'ın yaşam evreleri --- */
  const EVRE = [
    [0, "Bebek", "Issız adada bir ceylan onu bulur, emzirir ve büyütür. Hay hayvanların seslerini ve davranışlarını taklit eder."],
    [7, "Ceylanın ölümü", "Ceylan ölünce Hay onu iyileştirmek ister. Bedeni dikkatle açar ve canlılığı sağlayan şeyin bedenden ayrılıp gittiğini anlar: beden bir araçtır."],
    [14, "Ateş ve aletler", "Bir orman yangınında ateşi tanır, onu korumayı öğrenir. Postlardan giysi, dallardan alet yapar; hayvanları ve bitkileri inceler."],
    [21, "Doğanın düzeni", "Cisimlerin hepsinin madde ve biçimden oluştuğunu, her değişimin bir nedeni olduğunu düşünür."],
    [28, "Gökler", "Yıldızların ve gezegenlerin düzenli hareketini izler; evrenin bir bütün olduğu ve bir yaratıcısı olması gerektiği sonucuna varır."],
    [35, "Zorunlu varlık", "Her şeyin, varlığı kendinden olan bir kaynağa bağlı olduğunu ve kendi özünün bedensel olmadığını kavrar."],
    [42, "Tefekkür", "Bedenini yalnızca gerektiği kadar besleyip zamanının çoğunu o kaynağı düşünmeye ayırır."],
    [49, "Karşılaşma", "Yaklaşık elli yaşında komşu adadan gelen Absal ile karşılaşır; konuşmayı öğrenir ve ulaştığı hakikatin Absal'ın dinindeki hakikatle örtüştüğünü görür."],
  ];
  D.hayyibn = function (stage) {
    const cv = h("canvas", { "aria-label": "Hay bin Yakzan'ın adası" });
    const fill = h("div.fill", cv);
    let yas = 0;
    const baslik = h("h4.hy-b"), acik = h("p.hy-a");
    const sl = L.slider({ label: "Hay'ın yaşı", min: 0, max: 50, step: 1, value: 0, fmt: (v) => `${Math.round(v)} yaş`, oninput: (v) => { yas = v; yaz(); draw(); } });
    const pan = h("div.pad.scroll.hy-panel", baslik, acik);
    stage.append(fill, h("div.controls", sl), pan);
    const evre = () => { let e = EVRE[0]; EVRE.forEach((x) => { if (yas >= x[0]) e = x; }); return e; };
    function yaz() { const e = evre(); baslik.textContent = `${e[0]}+ yaş · ${e[1]}`; acik.textContent = e[2]; }
    yaz();
    Oy.secim(pan, {
      anahtar: "ibn-tufeyl.akil", soru: "Tek başına akıl en derin hakikatlere ulaşabilir mi?",
      secenekler: [
        { v: "evet", ad: "Evet, akıl ve gözlem yeter", ilke: "Akıl ve gözlem, öğretmen ve gelenek olmadan da en derin hakikatlere götürebilir.", filozof: ["ibn_tufeyl"],
          itiraz: "Dil ve toplum olmadan kavramlar oluşabilir mi? Toplumdan yalıtılmış büyüyen çocukların gerçek öyküleri bunun çok zor olduğunu düşündürür." },
        { v: "ogretim", ad: "Ancak başkalarından öğrenerek", ilke: "İnsan toplumsal bir varlıktır; bilgi kuşaktan kuşağa aktarılarak birikir.", filozof: ["aristoteles", "ibn_haldun"],
          itiraz: "O hâlde ilk bilgiler nereden geldi? Bir yerde birinin kendi aklıyla başlaması gerekir." },
        { v: "sezgi", ad: "Akıl yetmez, doğrudan bir aydınlanma gerekir", ilke: "En yüksek hakikat kanıtla değil, doğrudan tadılarak, sezgiyle bilinir.", filozof: ["suhreverdi", "ibn_arabi"],
          lehte: "Romanda Hay da sonunda akıl yürütmenin ötesinde, doğrudan bir görüye (müşahede) ulaşır.",
          itiraz: "Doğrudan sezgi başkalarına nasıl gösterilir ya da denetlenir? Herkes farklı şeyler \"görürse\" hangisi doğrudur?" },
      ],
    });
    let st, t = 0;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, cy = H * 0.58, R = Math.min(w * 0.36, H * 0.32);
      // gökyüzü (28+ yaşta yıldız yörüngeleri)
      if (yas >= 28) {
        ctx.strokeStyle = rgba(C.brass, 0.18);
        for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.ellipse(cx, cy - R * 0.4, R * (0.9 + i * 0.25), R * (0.35 + i * 0.12), 0, Math.PI, 2 * Math.PI); ctx.stroke(); }
        for (let i = 0; i < 5; i++) { const a = Math.PI + ((t * 0.05 + i * 0.6) % Math.PI); ctx.fillStyle = "#E2C27E"; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * R * 1.4, cy - R * 0.4 + Math.sin(a) * R * 0.55, 2, 0, 7); ctx.fill(); }
      }
      // deniz dalgaları
      ctx.strokeStyle = rgba("#79AEEA", 0.25);
      for (let j = 0; j < 4; j++) { ctx.beginPath(); for (let x = 0; x <= w; x += 8) ctx.lineTo(x, H * (0.82 + j * 0.05) + Math.sin(x * 0.04 + t + j) * 2); ctx.stroke(); }
      // ada
      ctx.fillStyle = "#24385F"; ctx.strokeStyle = rgba(C.brass, 0.6);
      ctx.beginPath(); ctx.ellipse(cx, cy + R * 0.25, R, R * 0.32, 0, 0, 7); ctx.fill(); ctx.stroke();
      // ağaçlar
      ctx.strokeStyle = rgba(C.ink, 0.5);
      [[-0.7, 1.1], [-0.45, 0.9], [0.55, 1], [0.75, 0.8]].forEach(([dx, k]) => {
        const x = cx + dx * R, y = cy + R * 0.2;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 40 * k); ctx.stroke();
        for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(x, y - 40 * k); ctx.quadraticCurveTo(x + i * 8, y - 50 * k, x + i * 14, y - 36 * k); ctx.stroke(); }
      });
      // ceylan (7 yaşına kadar)
      if (yas < 7) {
        const gx = cx - R * 0.2, gy = cy + R * 0.1;
        ctx.fillStyle = "#C9A27A"; ctx.strokeStyle = "#C9A27A"; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.ellipse(gx, gy, 15, 6.5, 0, 0, 7); ctx.fill();
        ctx.beginPath(); // ince bacaklar
        [[-11, -14], [-7, -9], [8, 11], [12, 15]].forEach(([a, b]) => { ctx.moveTo(gx + a, gy + 4); ctx.lineTo(gx + b, gy + 17); });
        ctx.moveTo(gx + 12, gy - 3); ctx.lineTo(gx + 18, gy - 15); ctx.stroke(); // boyun
        ctx.beginPath(); ctx.ellipse(gx + 21, gy - 16, 5.5, 3, 0.3, 0, 7); ctx.fill(); // baş
        ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(gx + 18, gy - 18); ctx.quadraticCurveTo(gx + 14, gy - 26, gx + 17, gy - 30);
        ctx.moveTo(gx + 20, gy - 18); ctx.quadraticCurveTo(gx + 18, gy - 26, gx + 21, gy - 30); ctx.stroke(); // boynuzlar
        ctx.lineWidth = 1;
      }
      // ateş (14+)
      if (yas >= 14) {
        const fx = cx + R * 0.25, fy = cy + R * 0.18, fl = 1 + Math.sin(t * 8) * 0.12;
        ctx.fillStyle = "#E8743B"; ctx.beginPath(); ctx.moveTo(fx - 7, fy); ctx.quadraticCurveTo(fx, fy - 22 * fl, fx + 7, fy); ctx.fill();
      }
      // Hay: büyüdükçe uzayan figür
      const boy = 14 + Math.min(yas, 21) * 1.3, hx = cx, hy = cy + R * 0.18;
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(hx, hy - boy - 5, 5, 0, 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hx, hy - boy); ctx.lineTo(hx, hy - boy * 0.4); ctx.lineTo(hx - 6, hy); ctx.moveTo(hx, hy - boy * 0.4); ctx.lineTo(hx + 6, hy); ctx.stroke();
      ctx.lineWidth = 1;
      // iç ışık (35+)
      if (yas >= 35) {
        const g = ctx.createRadialGradient(hx, hy - boy * 0.7, 0, hx, hy - boy * 0.7, 40 + (yas - 35) * 2);
        g.addColorStop(0, rgba("#E2C27E", 0.5)); g.addColorStop(1, rgba("#E2C27E", 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hx, hy - boy * 0.7, 40 + (yas - 35) * 2, 0, 7); ctx.fill();
      }
      // Absal'ın kayığı (49+)
      if (yas >= 49) {
        const bx = w * 0.85 - Math.min(1, (yas - 49)) * 30, by = H * 0.86;
        ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(bx - 20, by); ctx.quadraticCurveTo(bx, by + 10, bx + 20, by); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by - 26); ctx.lineTo(bx + 14, by - 6); ctx.stroke();
      }
      ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
      ctx.fillText(evre()[1], cx, cy + R * 0.25 + R * 0.32 + 20 > H - 6 ? H - 8 : cy + R * 0.25 + R * 0.32 + 20);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- İbn Haldun: asabiyye ve devlet döngüsü --- */
  D.haldun = function (stage) {
    const cv = h("canvas", { "aria-label": "Devlet döngüsü grafiği" });
    const fill = h("div.fill", cv);
    const p = Object.assign({}, Haldun.VARSAYILAN);
    const ozet = h("p.hd-ozet");
    const sl1 = L.slider({ label: "Başlangıç asabiyyesi", min: 0.5, max: 1, step: 0.01, value: p.baslangic, fmt: (v) => v.toFixed(2), oninput: (v) => { p.baslangic = v; hesapla(); } });
    const sl2 = L.slider({ label: "Lüksün aşındırma hızı", min: 0, max: 2.5, step: 0.05, value: p.asinma, fmt: (v) => v.toFixed(2), oninput: (v) => { p.asinma = v; hesapla(); } });
    const sl3 = L.slider({ label: "Çöldeki dayanışma", min: 0.2, max: 1, step: 0.01, value: p.col, fmt: (v) => v.toFixed(2), oninput: (v) => { p.col = v; hesapla(); } });
    const lej = h("div.legend.hd-lej", h("span", h("i", { style: { background: C.ink } }), "asabiyye"), h("span", h("i", { style: { background: C.brass } }), "refah"),
      h("span", h("i", { style: { background: C.muted } }), "vergi oranı"), h("span", h("i", { style: { background: "#8C6A45" } }), "çöldeki rakip"));
    const pan = h("div.pad.scroll.hd-panel", ozet);
    stage.append(h("div.controls.top.hd-top", lej), fill, h("div.controls.hd-ctl", sl1, sl2, sl3), pan);
    let sonuc = null, goster = 1;
    function hesapla() {
      sonuc = Haldun.simule(p);
      const o = sonuc.ortalamaSure;
      ozet.innerHTML = o == null
        ? "Bu ayarlarla 400 yılda hiçbir hanedan yıkılmıyor: lüks asabiyyeyi aşındırmıyor ya da çölde güçlü bir rakip çıkmıyor."
        : `Ortalama hanedan ömrü: <b>${Math.round(o)} yıl</b>, yani yaklaşık <b>${(o / 40).toFixed(1).replace(".", ",")} kuşak</b> (kuşak = 40 yıl). İbn Haldun'un gözlemi: çoğunlukla üç kuşak, ~120 yıl. <span class="muted">Basitleştirilmiş bir modeldir; sayılar gösterim içindir.</span>`;
      draw();
    }
    let st;
    function draw() {
      if (!st || !sonuc) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const pl = 34, pr = 28, pt = 14, pb = 26, W = w - pl - pr, HH = H - pt - pb, N = p.yil;
      const X = (y) => pl + (y / N) * W, Y = (v) => pt + (1 - v) * HH;
      const son = Math.floor(N * goster);
      // hanedan bantları ve kuşak çentikleri
      sonuc.hanedanlar.forEach((d, i) => {
        const x0 = X(d.bas), x1 = X(d.son == null ? N : d.son + 1);
        ctx.fillStyle = i % 2 ? "rgba(255,255,255,0.02)" : "rgba(201,165,92,0.05)";
        ctx.fillRect(x0, pt, x1 - x0, HH);
        ctx.font = `600 12px ${FONT.ui}`; ctx.fillStyle = C.ink; ctx.textBaseline = "top";
        if (x1 - x0 > 70) ctx.fillText(`${i + 1}. hanedan` + (d.son != null ? ` · ${d.son - d.bas + 1} yıl` : ""), x0 + 6, pt + 4);
        ctx.font = `400 11px ${FONT.ui}`; ctx.fillStyle = C.muted;
        for (let g = 0; g < 6; g++) {
          const y = d.bas + g * 40; if (y >= (d.son == null ? N : d.son)) break;
          ctx.strokeStyle = rgba(C.brass, 0.25); ctx.beginPath(); ctx.moveTo(X(y), Y(0)); ctx.lineTo(X(y), Y(0) - 8); ctx.stroke();
          if (X(y + 40) - X(y) > 34) ctx.fillText(`${g + 1}. kuşak`, X(y) + 3, Y(0) - 20);
        }
        if (d.son != null) { ctx.strokeStyle = rgba("#E0524A", 0); }
      });
      // eksen
      ctx.strokeStyle = rgba(C.brass, 0.4); ctx.beginPath(); ctx.moveTo(pl, pt); ctx.lineTo(pl, Y(0)); ctx.lineTo(w - pr, Y(0)); ctx.stroke();
      ctx.font = `400 11px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textBaseline = "top"; ctx.textAlign = "center";
      for (let y = 0; y <= N; y += 100) ctx.fillText(`${y}. yıl`, X(y), Y(0) + 6);
      ctx.textAlign = "left";
      const cizgi = (arr, renk, kal, kesik) => {
        ctx.strokeStyle = renk; ctx.lineWidth = kal; ctx.setLineDash(kesik ? [4, 4] : []);
        ctx.beginPath(); for (let y = 0; y < son; y++) y ? ctx.lineTo(X(y), Y(arr[y])) : ctx.moveTo(X(y), Y(arr[y])); ctx.stroke(); ctx.setLineDash([]);
      };
      cizgi(sonuc.seri.rakip, "#8C6A45", 1.2, true);
      cizgi(sonuc.seri.T, C.muted, 1.4, true);
      cizgi(sonuc.seri.R, C.brass, 2);
      cizgi(sonuc.seri.A, C.ink, 2.4);
    }
    st = L.canvas(cv, draw);
    hesapla();
    let anim = 0;
    function oynat() {
      cancelAnimationFrame(anim);
      const s0 = performance.now();
      (function tick(t) { goster = Math.min(1, (t - s0) / 2600); draw(); if (goster < 1) anim = requestAnimationFrame(tick); })(s0);
    }
    Oy.secim(pan, {
      anahtar: "ibn-haldun.temel", soru: "Sizce bir devleti asıl ayakta tutan ne?",
      secenekler: [
        { v: "dayanisma", ad: "Dayanışma ve ortak amaç", ilke: "Toplumu bir arada tutan, insanların birbirine bağlılığıdır (asabiyye); kurumlar bunun üzerine kurulur.", filozof: ["ibn_haldun"],
          itiraz: "Güçlü bir \"biz\" duygusu çoğu zaman \"onlar\"a karşı kurulur; dayanışma dışlayıcı olabilir." },
        { v: "yasa", ad: "Adil yasalar ve kurumlar", ilke: "Kalıcı düzen, kişilere değil herkese eşit uygulanan yasalara dayanır.", filozof: ["aristoteles", "locke"],
          itiraz: "İbn Haldun'a göre dayanışma çözülünce yasalar tek başına yetmez; onları uygulayacak bir güç ve istek kalmaz." },
        { v: "refah", ad: "Refah ve ekonomik büyüme", ilke: "İnsanlar karnı tok, işi yolunda olduğu sürece düzene bağlı kalır.", filozof: [],
          itiraz: "İbn Haldun'un döngüsünde refah lüksü, lüks de çözülmeyi getirir: başarı kendi sonunu hazırlar." },
        { v: "guc", ad: "Güç ve caydırıcılık", ilke: "Düzeni, kurallara uymayanları cezalandırabilen güçlü bir otorite korur.", filozof: ["hobbes"],
          itiraz: "Yalnızca korkuya dayanan bir düzen, korku azaldığı an dağılır; İbn Haldun'a göre zor kullanmak da asabiyye gerektirir." },
      ],
    });
    return { enter: () => { draw(); oynat(); }, leave: () => cancelAnimationFrame(anim) };
  };
})();
