/* 6. Helenistik ve Roma deneyleri: doğa ve uzlaşım, haz hesabı, kontrol ikiliği, yanılsamalar ve epokhe, sudur */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;

  /* --- Ortak: kartları iki kutuya ayırma --- */
  function ayikla(stage, { kutular, kartlar, kisi, bitince, adlandir }) {
    const wrap = h("div.ay");
    const kutuEl = {};
    const ust = h("div.ay-kutular");
    kutular.forEach((k) => {
      const el = h("div.ay-kutu", { "data-z": k.id }, h("h4", k.ad), k.alt ? h("p.ay-alt", k.alt) : "", h("div.ay-ic"));
      kutuEl[k.id] = el; ust.append(el);
    });
    const havuz = h("div.ay-havuz", { "data-z": "" });
    const geri = h("div.ay-geri.pad.scroll", { "aria-live": "polite" }, h("p.muted", "Bir kartı kutulardan birine sürükleyin. Klavyede kartı seçip Enter'a basarak kutular arasında gezdirebilirsiniz."));
    wrap.append(ust, havuz, geri);
    stage.append(wrap);
    const yer = {};
    function yerlestir(el, z, sessiz) {
      const kart = kartlar[+el.dataset.i];
      if (!z) { havuz.append(el); delete yer[kart.id]; el.removeAttribute("data-z"); return; }
      kutuEl[z].querySelector(".ay-ic").append(el);
      yer[kart.id] = z; el.dataset.z = z;
      const ayni = kart.dogru === z || kart.dogru === "ikisi";
      el.classList.toggle("ayni", ayni);
      el.classList.toggle("farkli", !ayni);
      if (sessiz) return;
      geri.innerHTML = "";
      geri.append(h("div.ay-not" + (ayni ? ".ayni" : ".farkli"),
        h("p.ay-baslik", h("b", kart.ad), " → ", kutular.find((k) => k.id === z).ad),
        h("p", h("span.ip-et", ayni ? `${kisi} de böyle düşünür` : `${kisi} burada ayrılır`), kart.not)));
      if (Object.keys(yer).length === kartlar.length) {
        const n = kartlar.filter((k) => k.dogru === yer[k.id] || k.dogru === "ikisi").length;
        geri.append(h("p.ay-ozet", adlandir(n, kartlar.length)));
        bitince && bitince(geri, n);
      }
    }
    kartlar.forEach((k, i) => {
      const el = h("button.kart", { type: "button", "data-i": i }, k.ad);
      L.surukle(el, { hedefler: () => [...Object.values(kutuEl), havuz], onDrop: (t) => { if (t) yerlestir(el, t.dataset.z || null); } });
      el.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault(); e.stopPropagation();
        const ids = kutular.map((x) => x.id), cur = ids.indexOf(el.dataset.z);
        yerlestir(el, ids[cur + 1] || null);
        el.focus();
      });
      havuz.append(el);
    });
    return {
      sifirla() { kartlar.forEach((k, i) => yerlestir(wrap.querySelector(`.kart[data-i="${i}"]`), null, true)); geri.innerHTML = ""; },
    };
  }

  /* --- Diogenes: doğa mı, uzlaşım mı? --- */
  const DIO = [
    { id: "yuzuk", ad: "Altın yüzük takmak", dogru: "nomos", not: "Altının değeri tümüyle uzlaşımdır. Diogenes'e göre insanlar en değerli şeyleri (su, hava) ucuz, en gereksizleri (altın, heykel) pahalı sayar." },
    { id: "su", ad: "Susayınca su içmek", dogru: "physis", not: "Doğal ve gerekli. Diogenes bir çocuğun avucuyla su içtiğini görünce \"Bir çocuk beni sadelikte geçti\" deyip tasını attı." },
    { id: "sofra", ad: "Yemeği yalnızca sofrada, belirli saatte yemek", dogru: "nomos", not: "Çarşının ortasında yemek yediği için ayıplanınca, açlığı da çarşıda hissettiğini söylediği aktarılır." },
    { id: "giyinmek", ad: "Soğukta giyinmek", dogru: "physis", not: "Bedeni korumak doğaya uygundur. Diogenes yine de kışın soğuk heykellere sarılarak kendini dayanıklılığa alıştırırdı (askesis)." },
    { id: "unvan", ad: "Bir unvanla hitap edilmek", dogru: "nomos", not: "Makam ve şan uzlaşımın ödülleridir. İskender'e \"Güneşimi kesme\" diyen Diogenes için kralın unvanı hiçbir şey ifade etmiyordu." },
    { id: "uyku", ad: "Yorulunca uyumak", dogru: "physis", not: "Doğal bir ihtiyaç; ama bunun için büyük bir ev gerekmez. Diogenes bir toprak küpte uyurdu." },
    { id: "yurt", ad: "Bir kente yurttaş olarak bağlı olmak", dogru: "nomos", not: "\"Nerelisin?\" sorusuna \"Dünya yurttaşıyım\" (kosmopolites) diye karşılık verdi." },
    { id: "mulk", ad: "Ev ve mülk sahibi olmak", dogru: "nomos", not: "Kendi kendine yetmek (autarkeia) için mülk gerekmez; Diogenes'in bütün eşyası bir pelerin, bir heybe ve bir değnekti." },
  ];
  D.diogenes = function (stage) {
    stage.classList.add("ay-stage");
    ayikla(stage, {
      kisi: "Diogenes",
      kutular: [{ id: "physis", ad: "Doğa (physis)", alt: "her insanda, her yerde aynı" }, { id: "nomos", ad: "Uzlaşım (nomos)", alt: "alışkanlık ve gelenekten" }],
      kartlar: DIO,
      adlandir: (n, t) => `${t} kartın ${n} tanesinde Diogenes ile aynı kutudasınız.`,
      bitince(geri) {
        Oy.secim(geri, {
          anahtar: "diogenes.kural", soru: "Toplumsal uzlaşımlar hakkında ne düşünüyorsunuz?",
          secenekler: [
            { v: "gereksiz", ad: "Çoğu gereksiz bir yük", ilke: "Mutluluk doğaya uygun, kendi kendine yeten bir hayattadır (autarkeia).", filozof: ["diogenes", "antisthenes"],
              itiraz: "Uzlaşımlar insanlar arası güvenin dilidir. Herkes Diogenes gibi yaşasa ortak bir hayat kurmak zorlaşır." },
            { v: "gerekli", ad: "Çoğu gerekli bir ortak dil", ilke: "Adap ve kurallar insanı insan yapar; erdem toplum içinde, alışkanlıkla öğrenilir.", filozof: ["konfucyus", "aristoteles"],
              itiraz: "Diogenes'e göre bu kuralların çoğu yalnızca alışkanlığın ve güçlülerin ürünü; sorgulanmadan kabul ediliyor." },
            { v: "sorgula", ad: "Kalabilir, ama her biri sorgulanmalı", ilke: "Uzlaşımı tümden reddetmek değil, her birinin gerekçesini sormak.", filozof: ["sokrates"],
              itiraz: "Bazı kurallar gerekçesi tam bilinmeden de işe yarar; her şeyi sorgulamak ortak hayatı kırılgan yapabilir." },
          ],
        });
      },
    });
    return {};
  };

  /* --- Epikuros: haz hesabı --- */
  const HAZ = [
    { v: "ziyafet", ad: "Gece boyu ziyafet", tur: "doğal ama zorunlu değil", f: (t) => (t < 1 ? 0.9 : t < 3 ? -0.7 + (t - 1) * 0.25 : -0.12),
      ilke: "Anlık hazzın büyüklüğü en önemlisidir. Kyreneli Aristippos'un okulu böyle düşünürdü.", filozof: [],
      itiraz: "Epikuros: Her haz iyidir, ama her haz seçilmeye değmez; bazıları ardından daha büyük acı getirir (Menoikeus'a Mektup 129)." },
    { v: "sade", ad: "Dostlarla sade bir akşam yemeği", tur: "doğal ve zorunlu", f: (t) => 0.45 + 0.05 * Math.sin(t * 2.2),
      ilke: "En kalıcı haz acının ve kaygının yokluğudur; doğal ve zorunlu arzular kolay doyar.", filozof: ["epikuros"],
      lehte: "Arpa ekmeği ve su, aç olana en büyük hazzı verir (Menoikeus'a Mektup 130–131).",
      itiraz: "Stoacılar: Hazzı amaç yapmak, erdemi yalnızca bir araca indirger." },
    { v: "sohret", ad: "Şöhret ve makam peşinde koşmak", tur: "ne doğal ne zorunlu", f: (t) => -0.32 + 1.1 * Math.exp(-((t - 3.5) ** 2) * 6) + 1.0 * Math.exp(-((t - 7) ** 2) * 6) - (t < 2 ? 0.2 : 0),
      ilke: "Toplumsal başarı ve tanınma iyi hayatın ölçüsüdür.", filozof: [],
      itiraz: "Epikuros'a göre bu, sınırı olmayan boş bir arzudur: doyurulamaz ve kaygı üretir. \"Gizli yaşa\" (lathe biōsas) öğüdü buradan gelir." },
    { v: "zenginlik", ad: "Durmadan para biriktirmek", tur: "ne doğal ne zorunlu", f: (t) => 0.25 - 0.06 * t + 0.08 * Math.sin(t * 3),
      ilke: "Daha fazla kaynak daha fazla güvenlik demektir.", filozof: [],
      itiraz: "Doğanın istediği zenginlik sınırlıdır ve kolay bulunur; boş sanıların istediği zenginlik sonsuza uzanır (Temel Öğretiler 15)." },
    { v: "bahce", ad: "Bahçede felsefe sohbeti", tur: "doğal ve zorunlu", f: (t) => 0.3 + 0.035 * t,
      ilke: "Dostluk ve felsefe, mutlu hayatın en sağlam hazlarıdır.", filozof: ["epikuros"],
      lehte: "Bilgeliğin mutluluk için sağladığı şeylerin en büyüğü dostluktur (Temel Öğretiler 27).",
      itiraz: "Siyasetten ve kamusal hayattan çekilmek: Aristoteles ve Stoacılar insanı toplum içinde yaşayan bir varlık olarak görür." },
    { v: "perhiz", ad: "Her hazdan kaçınmak", tur: "Epikuros'un önerisi değil", f: (t) => -0.12 + 0.02 * Math.sin(t * 4),
      ilke: "Hazdan kaçınmak ruhu güçlendirir; dayanıklılık için kendini zorlamak gerekir.", filozof: ["diogenes"],
      itiraz: "Epikuros çileci değildir: sade hazlar iyidir, onlardan kaçmak gereksiz bir acıdır." },
  ];
  D.epikuros = function (stage) {
    const cv = h("canvas", { "aria-label": "Haz ve acı grafiği" });
    const fill = h("div.fill", cv);
    const panel = h("div.pad.scroll.ep-panel");
    stage.append(fill, panel);
    let secili = null, gec = 1, st;
    const AC = "#7F8FB8";
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const x0 = 46, x1 = w - 18, y0 = 26, y1 = H - 34, my = (y0 + y1) / 2, A = (y1 - y0) / 2 * 0.9;
      const X = (t) => x0 + (t / 10) * (x1 - x0);
      // eksenler
      ctx.strokeStyle = rgba(C.brass, 0.4); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, my); ctx.lineTo(x1, my); ctx.stroke();
      ctx.strokeStyle = rgba(C.brass, 0.15); ctx.setLineDash([3, 5]);
      ctx.beginPath(); ctx.moveTo(X(1.5), y0); ctx.lineTo(X(1.5), y1); ctx.stroke(); ctx.setLineDash([]);
      ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textBaseline = "middle";
      ctx.fillText("haz", 8, y0 + 12); ctx.fillText("acı", 8, y1 - 12);
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText("bu akşam", X(0.75), y1 + 8); ctx.fillText("bu yıl →", X(6), y1 + 8); ctx.textAlign = "left";
      // diğer seçenekler soluk
      HAZ.forEach((o) => {
        if (o === secili || !secili) return;
        ctx.strokeStyle = rgba(C.ink, secili ? 0.08 : 0.25); ctx.lineWidth = 1;
        ctx.beginPath(); for (let t = 0; t <= 10; t += 0.05) ctx.lineTo(X(t), my - clamp(o.f(t), -1, 1) * A); ctx.stroke();
      });
      if (!secili) {
        ctx.font = `italic 16px ${FONT.body}`; ctx.fillStyle = C.ink2; ctx.textAlign = "center";
        ctx.fillText("Bir seçenek seçin", (x0 + x1) / 2, y0 + 10); ctx.textAlign = "left";
        return;
      }
      const tEnd = 10 * L.ease(Math.min(1, gec));
      // haz ve acı alanları
      [[1, C.brass], [-1, AC]].forEach(([sg, col]) => {
        ctx.fillStyle = rgba(col, 0.35);
        ctx.beginPath(); ctx.moveTo(X(0), my);
        for (let t = 0; t <= tEnd; t += 0.05) { const v = clamp(secili.f(t), -1, 1); ctx.lineTo(X(t), my - (sg * v > 0 ? v : 0) * A); }
        ctx.lineTo(X(tEnd), my); ctx.fill();
      });
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2;
      ctx.beginPath(); for (let t = 0; t <= tEnd; t += 0.05) ctx.lineTo(X(t), my - clamp(secili.f(t), -1, 1) * A); ctx.stroke();
      // toplamlar
      const ort = (a, b) => { let s = 0, n = 0; for (let t = a; t <= b; t += 0.05) { s += secili.f(t); n++; } return s / n; };
      const kisa = ort(0, 1.5), uzun = ort(0, 10);
      const fmt = (v) => (v >= 0 ? "+" : "−") + Math.abs(v * 10).toFixed(1);
      ctx.font = `600 13px ${FONT.ui}`; ctx.textBaseline = "top";
      ctx.fillStyle = kisa >= 0 ? C.brass : AC; ctx.fillText(`Kısa vade ${fmt(kisa)}`, x0 + 6, y0 - 18 < 4 ? 4 : y0 - 18);
      ctx.fillStyle = uzun >= 0 ? C.brass : AC; ctx.textAlign = "right"; ctx.fillText(`Uzun vade ${fmt(uzun)}`, x1, y0 - 18 < 4 ? 4 : y0 - 18); ctx.textAlign = "left";
      ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.textAlign = "right"; ctx.textBaseline = "bottom";
      ctx.fillText(`Arzu: ${secili.tur}`, x1, y1 - 4); ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    Oy.secim(panel, {
      anahtar: "epikuros.secim", soru: "Bu akşam hangisini seçerdiniz?",
      secenekler: HAZ.map((o) => ({ v: o.v, ad: o.ad, ilke: o.ilke, filozof: o.filozof, lehte: o.lehte, itiraz: o.itiraz })),
      sonra: (v) => { secili = HAZ.find((o) => o.v === v); gec = 0; },
    });
    const lp = L.loop((dt) => { if (gec < 1) { gec += dt * 0.9; draw(); } });
    return { enter: () => { lp.start(); draw(); }, leave: () => lp.stop() };
  };

  /* --- Stoacılar: kontrol ikiliği --- */
  const KAYGI = [
    { id: "hakaret", ad: "Bir hakarete nasıl karşılık vereceğim", dogru: "bagli", not: "Seni inciten hakaret değil, onun incitici olduğu yargındır (Encheiridion 20). Karşılığın tümüyle senin elinde." },
    { id: "hava", ad: "Yarın havanın nasıl olacağı", dogru: "degil", not: "Hava senin işin değil; ona göre yanına ne alacağın senin işin." },
    { id: "un", ad: "Başkalarının hakkımda ne düşündüğü", dogru: "degil", not: "Ün, Epiktetos'un listesinde açıkça bize bağlı olmayanlar arasında (Encheiridion 1)." },
    { id: "sinav", ad: "Sınavı geçmek", dogru: "ikisi", not: "Çalışmak sana bağlı, sonuç değil. Stoacılar bunu okçuya benzetir: iyi nişan almak okçunun işi, okun hedefe varması değil." },
    { id: "durust", ad: "Ne kadar dürüst davrandığım", dogru: "bagli", not: "Seçimlerin ve niyetin bütünüyle sana aittir; Stoacılar için tek gerçek iyi budur." },
    { id: "hastalik", ad: "Hastalanmak", dogru: "degil", not: "Beden bize bağlı olmayanlar arasında. Hastalığa nasıl katlandığın ise sana bağlı." },
    { id: "ekonomi", ad: "Ekonominin gidişatı", dogru: "degil", not: "Sayısız insanın kararına bağlı bir şey; senin payın kendi harcamaların ve tepkilerin." },
    { id: "olum", ad: "Bir gün öleceğim", dogru: "degil", not: "Ölüm korkunç değildir; korkunç olan, ölümün korkunç olduğu yargısıdır (Encheiridion 5)." },
    { id: "sevdikler", ad: "Sevdiklerimin sağlığı", dogru: "degil", not: "Epiktetos burada en sert öğüdünü verir: Sevdiğin şeylerin ölümlü olduğunu bilerek sev (Encheiridion 3). Özen göstermek sana bağlı, sonuç değil." },
    { id: "kalkis", ad: "Sabah kaçta kalkacağım", dogru: "bagli", not: "Marcus Aurelius kendine sabahları yataktan çıkmayı bir insan olarak işini yapmaya gitmek diye hatırlatırdı (Kendime Düşünceler V.1)." },
  ];
  D.stoacilar = function (stage) {
    stage.classList.add("ay-stage");
    ayikla(stage, {
      kisi: "Epiktetos",
      kutular: [{ id: "bagli", ad: "Bana bağlı", alt: "yargılarım, seçimlerim, eylemlerim" }, { id: "degil", ad: "Bana bağlı değil", alt: "beden, mal, ün, başkaları" }],
      kartlar: KAYGI,
      adlandir: (n, t) => `${t} kaygının ${n} tanesinde Epiktetos ile aynı ayrımı yaptınız.`,
      bitince(geri) {
        Oy.secim(geri, {
          anahtar: "stoacilar.huzur", soru: "Kaygılarınızı böyle ayırmak size huzur verir mi?",
          secenekler: [
            { v: "evet", ad: "Evet, enerjimi bana bağlı olana harcarım", ilke: "Huzur, yalnızca kendi yargı ve eylemlerimizle ilgilenmekten gelir.", filozof: ["epiktetos", "marcus_aurelius"],
              lehte: "Değiştiremeyeceğimiz şeye üzülmek acıyı ikiye katlar.", itiraz: "Bu ayrım edilgenliğe yol açabilir: bir haksızlığı \"bana bağlı değil\" diye kabullenmek." },
            { v: "kismen", ad: "Kısmen; bazı şeyler ikisinin arasında", ilke: "Dış şeyler iyi değildir ama bazıları \"tercih edilir\" (proegmena): sağlık hastalığa tercih edilir.", filozof: ["seneka"],
              itiraz: "Sıkı bir Stoacı \"arada\" olanı da ikiye böler: çabam bana bağlı, sonuç değil." },
            { v: "hayir", ad: "Hayır, dış şeyler de mutluluğumu belirler", ilke: "İyi bir hayat dış koşullara da muhtaçtır; sevdiklerin kaybına kayıtsız kalmak insanca değildir.", filozof: ["aristoteles"],
              itiraz: "Epiktetos: Mutluluğunu başkasının elindeki şeylere bağlayan, kendi özgürlüğünü başkasına teslim eder." },
          ],
        });
      },
    });
    return {};
  };

  /* --- Septikler: üç yanılsama ve epokhe --- */
  D.septikler = function (stage) {
    const cv = h("canvas", { "aria-label": "Görsel yanılsama" });
    const fill = h("div.fill", cv);
    const soruEl = h("div.sp-soru");
    const goster = h("button.btn.ghost.sp-goster", { type: "button", onclick: () => { acik = !acik; guncelle(); } });
    const geri = h("p.sp-geri", { "aria-live": "polite" });
    const epokhe = h("div.sp-epokhe");
    const panel = h("div.pad.scroll.sp-panel", soruEl, h("div.sp-row", goster), geri, epokhe);
    let tur = "ml", acik = false, cevap = {}, t = 0, st;
    const TUR = {
      ml: { ad: "Müller-Lyer", soru: "Hangi yatay çizgi daha uzun?", sec: ["Üstteki", "Alttaki", "Eşit"], gercek: "Eşit", goster: "Ölçüleri göster", gizle: "Ölçüleri gizle",
        not: "İki çizgi de tam olarak aynı uzunlukta. Uçlardaki ok başları gözü yanıltıyor; bunu bildiğiniz hâlde üstteki hâlâ kısa görünüyor, değil mi?" },
      dama: { ad: "Dama tahtası", soru: "A ile işaretli kare mi daha koyu, B mi?", sec: ["A daha koyu", "B daha koyu", "Aynı renk"], gercek: "Aynı renk", goster: "Kareleri bağla", gizle: "Bağı kaldır",
        not: "A ile B ekranda birebir aynı renkte. Görme sistemimiz gölgeyi hesaba katıp B'yi \"aslında açık renkli bir kare\" diye yorumluyor." },
      cubuk: { ad: "Sudaki çubuk", soru: "Bardaktaki çubuk kırık mı?", sec: ["Evet, kırık", "Hayır, düz"], gercek: "Hayır, düz", goster: "Suyu boşalt", gizle: "Suyu doldur",
        not: "Çubuk düz; ışık sudan havaya geçerken kırılıyor. Sextus Empiricus'un örneği de buydu: suda kırık görünen kürek (Pyrrhonculuğun Ana Hatları I.119)." },
    };
    const seg = L.seg(Object.entries(TUR).map(([k, v]) => [k, v.ad]), tur, (v) => { tur = v; acik = false; guncelle(); });
    stage.append(h("div.controls.top", seg), fill, panel);
    function guncelle() {
      const T = TUR[tur];
      goster.textContent = acik ? T.gizle : T.goster;
      soruEl.innerHTML = "";
      soruEl.append(h("p.sp-q", T.soru), h("div.sp-row", T.sec.map((s) => h("button.btn" + (cevap[tur] === s ? ".on" : ""), { type: "button", onclick: () => { cevap[tur] = s; guncelle(); } }, s))));
      geri.innerHTML = "";
      if (cevap[tur] || acik) {
        const ayni = cevap[tur] === T.gercek;
        geri.append(cevap[tur] ? h("b", ayni ? "Gözünüze değil, şüphenize güvendiniz. " : "Gözünüz size bunu söyledi. ") : "", T.not);
      }
      if (Object.keys(cevap).length >= 1 && !epokhe.childNodes.length) epokheKur();
      draw();
    }
    function epokheKur() {
      Oy.secim(epokhe, {
        anahtar: "septikler.duyu", soru: "O hâlde duyularımıza güvenebilir miyiz?",
        secenekler: [
          { v: "guven", ad: "Evet, yanılsamalar istisnadır", ilke: "Duyular genellikle güvenilirdir; yanılgı, algıdan değil algı hakkındaki yargıdan doğar.", filozof: ["epikuros", "aristoteles"],
            itiraz: "Septikler: Hangi algının istisna olduğuna yine algıyla ya da akılla karar veriyoruz; bu bir kısır döngü." },
          { v: "akil", ad: "Duyular yanıltır, akıl düzeltir", ilke: "Gerçek bilgi duyulardan değil, akıl yürütmeden gelir.", filozof: ["platon"],
            itiraz: "Akıl yürütmeler de birbiriyle çelişir: filozoflar yüzyıllardır uzlaşamıyor (Sextus'un \"anlaşmazlık\" kipi)." },
          { v: "epokhe", ad: "Yargımı askıya alırım", ilke: "Her görüşün karşısına eşit güçte bir görüş konabilir; yargıyı askıya almak (epokhe) huzur getirir.", filozof: ["pyrrhon"],
            itiraz: "Hiç yargıda bulunmadan yaşanabilir mi? Pyrrhon'un yoldaki arabalardan bile sakınmadığına dair alaycı öyküler bu itirazı dile getirir (Diogenes Laertios IX.62)." },
        ],
      });
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      if (tur === "ml") drawML(ctx, w, H);
      else if (tur === "dama") drawDama(ctx, w, H);
      else drawCubuk(ctx, w, H);
    }
    function drawML(ctx, w, H) {
      const L0 = Math.min(w * 0.42, 340), cx = w / 2, ys = [H * 0.33, H * 0.67], f = Math.min(34, L0 * 0.13);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.lineCap = "round";
      ys.forEach((y, i) => {
        const a = cx - L0 / 2, b = cx + L0 / 2, s = i === 0 ? 1 : -1; // üstte içe, altta dışa dönük oklar
        ctx.beginPath(); ctx.moveTo(a, y); ctx.lineTo(b, y);
        ctx.moveTo(a, y); ctx.lineTo(a + s * f, y - f); ctx.moveTo(a, y); ctx.lineTo(a + s * f, y + f);
        ctx.moveTo(b, y); ctx.lineTo(b - s * f, y - f); ctx.moveTo(b, y); ctx.lineTo(b - s * f, y + f);
        ctx.stroke();
      });
      if (acik) {
        ctx.strokeStyle = C.brass; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]);
        [cx - L0 / 2, cx + L0 / 2].forEach((x) => { ctx.beginPath(); ctx.moveTo(x, ys[0] - 50); ctx.lineTo(x, ys[1] + 50); ctx.stroke(); });
        ctx.setLineDash([]);
        ctx.font = `600 13px ${FONT.ui}`; ctx.fillStyle = C.brass; ctx.textAlign = "center";
        ctx.fillText(`${Math.round(L0)} px`, cx, ys[0] - 22); ctx.fillText(`${Math.round(L0)} px`, cx, ys[1] + 30); ctx.textAlign = "left";
      }
    }
    function drawDama(ctx, w, H) {
      const n = 5, s = Math.min((w - 40) / n, (H - 30) / n), ox = (w - s * n) / 2, oy = (H - s * n) / 2;
      const ACIK = 205, KOYU = 123; // gölgede açık kare = KOYU (205 × 0.6 ≈ 123)
      const golge = (i, j) => { // gölge çarpanı: sağ alt köşedeki silindirin gölgesi
        const d = Math.hypot(i - 3.2, j - 3.0);
        return d < 1.3 ? 0.6 : d < 2.3 ? lerp(0.6, 1, (d - 1.3)) : 1;
      };
      const A = [1, 2], B = [3, 3];
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        let v = ((i + j) % 2 ? KOYU : ACIK) * golge(i, j);
        if (i === A[0] && j === A[1]) v = KOYU;
        if (i === B[0] && j === B[1]) v = KOYU;
        v = Math.round(v);
        ctx.fillStyle = `rgb(${v},${v},${Math.round(v * 1.04)})`;
        ctx.fillRect(ox + i * s, oy + j * s, s + 0.5, s + 0.5);
      }
      // silindir
      const cx = ox + s * 4.35, cy = oy + s * 3.4;
      ctx.fillStyle = "#4F7A63"; ctx.fillRect(cx - s * 0.42, cy - s * 1.6, s * 0.84, s * 1.6);
      ctx.beginPath(); ctx.ellipse(cx, cy, s * 0.42, s * 0.16, 0, 0, 7); ctx.fill();
      ctx.fillStyle = "#6E9C83"; ctx.beginPath(); ctx.ellipse(cx, cy - s * 1.6, s * 0.42, s * 0.16, 0, 0, 7); ctx.fill();
      if (acik) { // iki kareyi aynı renkte bir şeritle birleştir
        ctx.fillStyle = `rgb(${KOYU},${KOYU},${Math.round(KOYU * 1.04)})`;
        const x1 = ox + (A[0] + 0.3) * s, y1 = oy + (A[1] + 0.5) * s, x2 = ox + (B[0] + 0.5) * s, y2 = oy + (B[1] + 0.3) * s;
        ctx.fillRect(x1, y1 - s * 0.12, x2 - x1 + s * 0.12, s * 0.24);
        ctx.fillRect(x2 - s * 0.12, y1 - s * 0.12, s * 0.24, y2 - y1 + s * 0.12);
        ctx.strokeStyle = C.brass; ctx.lineWidth = 2;
        ctx.strokeRect(ox + A[0] * s + 1, oy + A[1] * s + 1, s - 2, s - 2); ctx.strokeRect(ox + B[0] * s + 1, oy + B[1] * s + 1, s - 2, s - 2);
      }
      ctx.font = `700 ${Math.round(s * 0.32)}px ${FONT.ui}`; ctx.fillStyle = "#1a1a1a"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("A", ox + (A[0] + 0.5) * s, oy + (A[1] + 0.5) * s);
      ctx.fillText("B", ox + (B[0] + 0.5) * s, oy + (B[1] + 0.5) * s);
      ctx.textAlign = "left";
    }
    function drawCubuk(ctx, w, H) {
      const gw = Math.min(w * 0.36, 220), gh = H * 0.7, gx = w / 2 - gw / 2, gy = H * 0.15, su = gy + gh * 0.4;
      // su
      if (!acik) {
        ctx.fillStyle = "rgba(78,134,198,.32)"; ctx.fillRect(gx, su, gw, gy + gh - su);
        ctx.strokeStyle = "rgba(159,195,238,.8)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); for (let x = gx; x <= gx + gw; x += 4) ctx.lineTo(x, su + Math.sin(x * 0.08 + t * 2) * 1.5); ctx.stroke();
      }
      // çubuk: su yüzeyinde kırılmış gibi
      const ax = gx - gw * 0.25, ay = gy - gh * 0.08, sx = gx + gw * 0.42, sy = su;
      const dx = (sx - ax) / (sy - ay);
      const ex = sx + dx * (gy + gh - 12 - sy), ey = gy + gh - 12;
      const kx = acik ? ex : sx + dx * 0.45 * (ey - sy);
      ctx.strokeStyle = "#C9A27A"; ctx.lineWidth = 8; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(sx, sy); ctx.lineTo(kx, ey); ctx.stroke();
      // bardak
      ctx.strokeStyle = rgba(C.ink, 0.75); ctx.lineWidth = 2; ctx.lineCap = "butt";
      ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.lineTo(gx + gw, gy); ctx.stroke();
    }
    st = L.canvas(cv, draw);
    guncelle();
    const lp = L.loop((dt) => { t += dt; if (tur === "cubuk") draw(); });
    return { enter: () => { lp.start(); draw(); }, leave: () => lp.stop() };
  };

  /* --- Plotinos: Bir'den taşma (sudur) ve geri dönüş --- */
  const KAT = [
    { id: "bir", ad: "Bir (to hen)", r: 0.12, renk: "#FFF4D6", metin: "Her şeyin kaynağı. Parçası, biçimi, niteliği yoktur; ona \"var\" demek bile azdır. Hiçbir şey kaybetmeden taşar, tıpkı ışık saçan güneş gibi." },
    { id: "nous", ad: "Akıl (nous)", r: 0.32, renk: "#E9C77D", metin: "Bir'den ilk taşan: Platon'un idealarının hepsini birden, zamansız bir bakışla düşünen akıl. Çokluk burada başlar." },
    { id: "ruh", ad: "Ruh (psykhe)", r: 0.56, renk: "#C98A5A", metin: "Akıl'dan taşan ve evrene can veren dünya ruhu. Bizim ruhlarımız onun parçalarıdır; bir yanımızla hâlâ Akıl'a dokunuruz." },
    { id: "madde", ad: "Doğa ve madde", r: 0.86, renk: "#5D6C93", metin: "Işığın en uzağa vardığı, neredeyse söndüğü yer. Madde kötü bir güç değil, ışığın eksikliğidir; kötülük de böyle anlaşılır." },
  ];
  D.plotinos = function (stage) {
    const cv = h("canvas", { "aria-label": "Sudur: merkezden yayılan ışık katmanları" });
    const fill = h("div.fill", cv);
    const bilgi = h("div.pl-bilgi", { "aria-live": "polite" }, h("p.muted", "Bir katman seçin."));
    let secili = null, donus = 0, t = 0, st;
    const btns = KAT.map((k) => h("button.btn.ghost", { type: "button", "data-k": k.id, onclick: () => sec(k) }, k.ad));
    const donBtn = h("button.btn", { type: "button", onclick: () => { donus = donus ? 0 : 0.001; donBtn.classList.toggle("on", !!donus); } }, "Geri dönüş");
    const panel = h("div.pad.scroll.pl-panel", bilgi);
    stage.append(fill, h("div.controls", ...btns, h("span.spacer"), donBtn), panel);
    function sec(k) {
      secili = k;
      btns.forEach((b) => b.classList.toggle("on", b.dataset.k === k.id));
      bilgi.innerHTML = "";
      bilgi.append(h("h4", k.ad), h("p", k.metin));
    }
    Oy.secim(panel, {
      anahtar: "plotinos.kotuluk", soru: "Peki kötülük nedir?",
      secenekler: [
        { v: "yokluk", ad: "İyinin eksikliği, ışığın yokluğu", ilke: "Kötülük kendi başına bir varlık değil, iyiliğin eksikliğidir.", filozof: ["plotinos", "augustinus"],
          itiraz: "Acı çeken biri için kötülük çok gerçektir; ona \"eksiklik\" demek onu küçümsemek olmaz mı?" },
        { v: "guc", ad: "Kendi başına bir güç", ilke: "Dünyada iyi ve kötü, iki bağımsız ilke olarak çatışır. Augustinus gençliğinde dokuz yıl bu görüşü savunan Maniheist harekete bağlı kaldı.", filozof: [],
          itiraz: "Plotinos ve Augustinus: Her şey tek bir iyi kaynaktan geliyorsa, ikinci bağımsız bir ilke tutarsız olur." },
        { v: "irade", ad: "İnsanın iyiden yüz çevirmesi", ilke: "Ahlaki kötülük, özgür iradenin daha yüksek iyiden alçak olana yönelmesidir.", filozof: ["augustinus"],
          itiraz: "Depremler ve salgınlar kimsenin seçimi değil; bu açıklama doğal kötülüğü kapsamaz." },
      ],
    });
    const r = L.rng(11);
    const P = Array.from({ length: 220 }, () => ({ d: r(), a: r() * 6.283, s: 0.5 + r() }));
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, cy = H / 2, R = Math.min(w, H) * 0.46;
      // katmanlar: dıştan içe
      for (let i = KAT.length - 1; i >= 0; i--) {
        const k = KAT[i];
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * k.r);
        g.addColorStop(0, rgba(k.renk, i === 0 ? 1 : 0.22));
        g.addColorStop(1, rgba(k.renk, i === 0 ? 0.6 : 0.05));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * k.r, 0, 7); ctx.fill();
        ctx.strokeStyle = rgba(k.renk, secili === k ? 0.95 : 0.35); ctx.lineWidth = secili === k ? 2 : 1;
        ctx.beginPath(); ctx.arc(cx, cy, R * k.r, 0, 7); ctx.stroke();
      }
      // ışık parçacıkları: dışa taşar ya da içe döner
      P.forEach((p) => {
        const rr = R * (0.1 + p.d * 0.82);
        const x = cx + Math.cos(p.a) * rr, y = cy + Math.sin(p.a) * rr;
        const al = donus ? 0.25 + 0.6 * (1 - p.d) : 0.85 * (1 - p.d) + 0.08;
        ctx.fillStyle = rgba("#FFE7B0", al);
        ctx.beginPath(); ctx.arc(x, y, 1.4 + (1 - p.d) * 1.4, 0, 7); ctx.fill();
      });
      // etiketler
      ctx.font = `600 13px ${FONT.ui}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      KAT.forEach((k, i) => {
        const y = i === 0 ? cy : cy - R * (KAT[i - 1].r + k.r) / 2;
        ctx.fillStyle = i === 0 ? "#3A2A10" : rgba(C.ink, secili === k ? 1 : 0.75);
        ctx.fillText(k.ad.replace(/ \(.*\)/, ""), cx, y);
      });
      ctx.textAlign = "left";
      ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted;
      ctx.fillText(donus ? "geri dönüş (epistrophe): ruh kaynağına yönelir" : "taşma (sudur): ışık kaynağından eksilmeden yayılır", 14, H - 14);
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      P.forEach((p) => {
        p.d += (donus ? -1 : 1) * dt * 0.06 * p.s;
        if (p.d > 1) { p.d = 0; p.a = Math.random() * 6.283; }
        if (p.d < 0) { p.d = 1; p.a = Math.random() * 6.283; }
      });
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };
})();
