/* Büyük soru 1 deneyleri: dört kuşku, Gettier vakaları */
(function () {
  const { h } = L;
  const D = window.Demos;
  const NS = "http://www.w3.org/2000/svg";
  const svg = (inner, vb = "0 0 100 70") => { const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", vb); s.setAttribute("aria-hidden", "true"); s.innerHTML = inner; return s; };

  /* --- Dört kuşku --- */
  const KUSKU = [
    { k: "magara", ad: "Mağara", f: "platon", slayt: "magara",
      ikon: '<rect x="4" y="6" width="92" height="58" fill="none" stroke="currentColor" stroke-opacity=".35"/><path d="M60 64 L60 20 Q80 6 96 20" fill="none" stroke="currentColor" stroke-opacity=".5"/><circle cx="78" cy="44" r="5" fill="#E8743B"/><path d="M10 18 h34 v26 h-34z" fill="currentColor" fill-opacity=".12"/><path d="M18 40 q6 -16 12 0 z M30 40 q5 -12 10 0z" fill="currentColor" fill-opacity=".55"/><circle cx="58" cy="54" r="3" fill="currentColor"/><circle cx="66" cy="54" r="3" fill="currentColor"/>',
      soru: "Bütün hayatınızı bir mağarada, yalnızca duvardaki gölgeleri izleyerek geçirmiş olabilir misiniz? Bunun böyle olmadığını gösterebilir misiniz?",
      disla: { ilke: "Gölge ile gerçeği ayırt edebiliriz, çünkü akıl duyuların ötesine geçebilir: matematik ve mantık gölgelerden gelmez.", filozof: ["platon"], itiraz: "Mağaradaki mahkûm da kendi gölgeleri hakkında akıl yürütüyordu; akıl yürütmenin mağaranın dışına çıktığını içeriden nasıl bileceğiz?" },
      kalir: { ilke: "Deneyimimiz bize ancak görünüşleri verir; görünüşlerin ardındaki gerçek doğrudan algılanamaz.", filozof: ["platon", "kant"], itiraz: "Platon'un kendisi mağaradan çıkılabileceğini düşünüyordu: eğitim, ruhun bakışını gölgelerden gerçeğe çevirmektir." } },
    { k: "cin", ad: "Kötü cin", f: "descartes", slayt: "descartes",
      ikon: '<circle cx="50" cy="35" r="26" fill="none" stroke="currentColor" stroke-opacity=".35"/><path d="M28 35 Q50 14 72 35 Q50 56 28 35z" fill="none" stroke="currentColor"/><circle cx="50" cy="35" r="8" fill="#A48BE6"/><circle cx="50" cy="35" r="3" fill="#0E1830"/><path d="M14 64 l8 -8 M86 64 l-8 -8 M50 4 v6" stroke="currentColor" stroke-opacity=".5"/>',
      soru: "Çok güçlü ve aldatıcı bir varlık, gördüğünüz, duyduğunuz, hatta 2 + 3 = 5 diye düşündüğünüz her şeyi size yanlış gösteriyor olabilir mi?",
      disla: { ilke: "Kusursuz bir varlık aldatıcı olamaz; duyularımızı ve aklımızı bize veren kaynağa güvenebiliriz.", filozof: ["descartes"], itiraz: "Descartes'ın kendi çıkış yolu, Tanrı'nın varlığını kanıtlamaya dayanıyordu; bu kanıtları ikna edici bulmayan için kuşku sürer (Kartezyen çember itirazı)." },
      kalir: { ilke: "Böyle bir aldatıcıyı dışlayacak bir kanıt deneyimin içinden gelemez; ama aldatılan bir ben olduğu kesindir.", filozof: ["descartes", "augustinus"], itiraz: "Moore: Bu kuşku argümanının öncüllerine güvenmek, ellerimin var olduğuna güvenmekten daha makul değildir." } },
    { k: "kelebek", ad: "Kelebek", f: "zhuangzi", slayt: "zhuangzi",
      ikon: '<path d="M50 20 v34" stroke="currentColor"/><path d="M50 30 C34 6 10 14 18 32 C24 44 42 40 50 34 C58 40 76 44 82 32 C90 14 66 6 50 30z" fill="#E0524A" fill-opacity=".55" stroke="#E0524A"/><path d="M50 38 C38 44 28 58 38 62 C46 64 50 50 50 44 C50 50 54 64 62 62 C72 58 62 44 50 38z" fill="#E0524A" fill-opacity=".35" stroke="#E0524A"/><path d="M48 18 q-6 -10 -10 -12 M52 18 q6 -10 10 -12" stroke="currentColor" fill="none"/>',
      soru: "Şu an rüya görüyor olabilir misiniz? Rüyadayken çoğu zaman rüyada olduğunuzu bilmezsiniz.",
      disla: { ilke: "Rüyalar tutarsızdır; uyanık deneyim ise birbirine bağlı, sürekli ve öngörülebilirdir.", filozof: ["descartes"], itiraz: "Rüyadayken o tutarsızlıkları fark etmeyiz; tutarlılık ölçütünü hangi bakış noktasından uyguluyoruz?" },
      kalir: { ilke: "Rüya ile uyanıklık arasındaki sınırı içeriden kesin olarak çizemeyiz; bakış açımız her zaman bir yerdedir.", filozof: ["zhuangzi"], itiraz: "\"Rüya\" kavramı uyanıklıkla karşıtlık içinde anlam kazanır; her şey rüya ise sözcük anlamını yitirir." } },
    { k: "simulasyon", ad: "Simülasyon", f: "bostrom", slayt: "s-cince-oda",
      ikon: '<rect x="18" y="8" width="64" height="54" fill="none" stroke="currentColor" stroke-opacity=".4"/>' + Array.from({ length: 48 }, (_, i) => `<rect x="${22 + (i % 8) * 7.4}" y="${12 + Math.floor(i / 8) * 8}" width="5" height="5" fill="#79AEEA" fill-opacity="${[0.15, 0.6, 0.3, 0.9][(i * 7) % 4]}"/>`).join(""),
      soru: "Bütün dünyanız, çok gelişmiş bir uygarlığın bilgisayarında çalışan bir benzetim olabilir mi?",
      disla: { ilke: "Benzetimde yaşadığımıza dair hiçbir kanıt yok; kanıtı olmayan bir olasılığı ciddiye almak zorunda değiliz.", filozof: ["ockham"], itiraz: "Bostrom'un argümanı kanıt değil oran üzerinedir: Benzetimler çoksa ve bizimki gibi deneyimler üretiyorsa, \"gerçek\" olanlarda olmamız istisna olur." },
      kalir: { ilke: "İçeriden yapılan her gözlem, benzetimle de uyumludur; bu olasılığı deneyimle dışlayamayız.", filozof: ["bostrom"], itiraz: "Benzetimde olsak bile oradaki masalar, insanlar, acılar bizim için gerçektir; belki \"gerçek\" sözcüğünün anlamı değişir, dünyamız değil (Chalmers)." } },
  ];
  D.kuskular = function (stage) {
    stage.classList.add("ks");
    const grid = h("div.ks-grid");
    const panel = h("div.ks-panel.pad.scroll", { "aria-live": "polite" });
    const ozet = h("div.ks-ozet");
    stage.append(grid, panel);
    const tiles = KUSKU.map((K) => {
      const b = h("button.ks-tile", { type: "button", "aria-label": K.ad + " kuşkusu", style: { "--gel": L.gc(FELSEFE.byId[K.f].gelenek) }, onclick: () => ac(K) },
        svg(K.ikon), h("b", K.ad), h("small.ks-durum"));
      grid.append(b);
      return b;
    });
    function durum() {
      KUSKU.forEach((K, i) => {
        const v = Oy.get("s-bilgi-kusku." + K.k);
        tiles[i].dataset.v = v || "";
        tiles[i].querySelector(".ks-durum").textContent = v === "disla" ? "dışladım" : v === "kalir" ? "dışlayamadım" : "";
      });
    }
    function ac(K) {
      tiles.forEach((t, i) => t.classList.toggle("on", KUSKU[i] === K));
      panel.innerHTML = "";
      panel.append(h("p.ks-soru", K.soru));
      Oy.secim(panel, {
        anahtar: "s-bilgi-kusku." + K.k,
        secenekler: [
          { v: "disla", ad: "Dışlayabilirim", ...K.disla },
          { v: "kalir", ad: "Dışlayamam", ...K.kalir },
        ],
        sonra: () => { durum(); sonuc(); },
      });
      panel.append(h("p.ks-bag", h("a", { href: "#" + K.slayt }, "Zaman yolculuğunda: " + FELSEFE.byId[K.f].ad.replace(/\s*\(.*\)/, ""))));
      panel.append(ozet);
      sonuc();
    }
    function sonuc() {
      const vs = KUSKU.map((K) => Oy.get("s-bilgi-kusku." + K.k));
      ozet.innerHTML = "";
      if (vs.some((v) => !v)) { ozet.append(h("p.muted", `Cevaplanan: ${vs.filter(Boolean).length} / 4`)); return; }
      const n = vs.filter((v) => v === "kalir").length;
      ozet.append(h("h4", "Geriye ne kalıyor?"),
        h("p", n === 0
          ? "Dört kuşkuyu da dışladınız. Ortak duyuya güveniyorsunuz: dünya, göründüğü gibi var. Bu tutum G. E. Moore'un ve büyük ölçüde Aristoteles'in tutumudur."
          : n === 4
            ? "Hiçbir kuşkuyu dışlayamadınız. Yine de bir şey kesin: kuşku duyan bir siz varsınız. Descartes buna \"düşünüyorum, öyleyse varım\" dedi."
            : `${n} kuşkuyu dışlayamadınız. Hangilerini dışlayıp hangilerini dışlayamadığınıza bakın: aralarındaki fark sizin bilgi ölçütünüzü gösteriyor. Ne olursa olsun, kuşku duyan bir siz varsınız.`),
        h("p.ks-cogito", "cogito, ergo sum"));
    }
    durum();
    ac(KUSKU[0]);
    Oy.on(() => durum());
    return {};
  };

  /* --- Gettier vakaları --- */
  const VAKA = [
    { k: "saat", ad: "Durmuş saat", kaynak: "Russell, 1948",
      ikon: '<circle cx="50" cy="36" r="27" fill="none" stroke="currentColor"/><path d="M50 36 V16 M50 36 L64 42" stroke="#E2C27E" stroke-width="2.4" stroke-linecap="round"/><circle cx="50" cy="36" r="2" fill="currentColor"/>' + Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 6.283; return `<line x1="${50 + Math.cos(a) * 23}" y1="${36 + Math.sin(a) * 23}" x2="${50 + Math.cos(a) * 26}" y2="${36 + Math.sin(a) * 26}" stroke="currentColor"/>`; }).join("") + '<path d="M78 10 l8 8 M86 10 l-8 8" stroke="#E0524A" stroke-width="2"/>',
      metin: "Ayşe istasyondaki büyük saate bakar: 12.10. Saat yıllardır güvenilirdir, Ayşe'nin ona inanmak için iyi bir gerekçesi var. Saat gerçekten de 12.10'dur. Ama saat dün gece tam 12.10'da durmuştur; Ayşe tesadüfen tam o anda bakmıştır.",
      inanc: "Saat 12.10.", gerekce: "Hep doğru çalışan bir saate baktı.", dogru: "Saat gerçekten 12.10." },
    { k: "koyun", ad: "Ahırdaki koyun", kaynak: "Chisholm, 1966",
      ikon: '<path d="M10 62 H90" stroke="currentColor" stroke-opacity=".5"/><path d="M22 60 Q20 44 32 42 Q34 34 44 36 Q52 30 58 38 Q68 38 66 48 Q72 56 62 60z" fill="#C3C3C8" fill-opacity=".85"/><circle cx="64" cy="40" r="5" fill="#C3C3C8"/><path d="M28 60 v4 M56 60 v4" stroke="currentColor"/><path d="M78 60 V38 L86 30 L94 38 V60" fill="none" stroke="#E2C27E" stroke-opacity=".6"/>',
      metin: "Bir çiftçi tarlaya bakar ve bir koyun gördüğüne inanır; bu yüzden \"Tarlada bir koyun var\" der. Gördüğü aslında koyuna çok benzeyen beyaz, tüylü bir köpektir. Ama tarlanın öbür ucunda, kayanın arkasında gerçekten bir koyun vardır.",
      inanc: "Tarlada bir koyun var.", gerekce: "Kendi gözüyle koyun gibi bir şey gördü.", dogru: "Tarlada gerçekten bir koyun var." },
    { k: "is", ad: "İş ve bozuk paralar", kaynak: "Gettier, 1963",
      ikon: '<rect x="14" y="14" width="40" height="44" fill="none" stroke="currentColor" stroke-opacity=".6"/><path d="M20 24 h28 M20 32 h28 M20 40 h18" stroke="currentColor" stroke-opacity=".5"/>' + Array.from({ length: 10 }, (_, i) => `<circle cx="${66 + (i % 3) * 9}" cy="${22 + Math.floor(i / 3) * 10}" r="4" fill="#E2C27E" fill-opacity=".8"/>`).join(""),
      metin: "Mert, işi Can'ın alacağından emindir: patron ona söylemiştir. Ayrıca Can'ın cebindeki on bozuk parayı az önce saymıştır. Buradan şu sonuca varır: \"İşi alacak kişinin cebinde on bozuk para var.\" Sonunda işi Mert alır. Ve Mert'in cebinde, kendisi farkında olmadan, tam on bozuk para vardır.",
      inanc: "İşi alacak kişinin cebinde on bozuk para var.", gerekce: "Patronun sözü ve saydığı paralar.", dogru: "İşi alan Mert'in cebinde on bozuk para var." },
    { k: "ahir", ad: "Sahte ahırlar", kaynak: "Ginet; Goldman, 1976",
      ikon: '<path d="M6 60 H94" stroke="currentColor" stroke-opacity=".5"/>' + [10, 38, 66].map((x, i) => `<path d="M${x} 60 V38 L${x + 12} 26 L${x + 24} 38 V60z" fill="${i === 1 ? "#E0524A" : "none"}" fill-opacity="${i === 1 ? 0.35 : 0}" stroke="${i === 1 ? "#E0524A" : "currentColor"}" stroke-opacity="${i === 1 ? 1 : 0.4}" stroke-dasharray="${i === 1 ? "0" : "3 2"}"/>`).join(""),
      metin: "Ali arabayla bir köyden geçerken bir ahır görür ve \"İşte bir ahır\" diye düşünür. Gördüğü gerçekten bir ahırdır. Ama Ali bilmez ki bu yörede, film çekimi için, ön cepheden ayırt edilemeyen düzinelerce karton ahır cephesi dikilmiştir. Yoldaki tek gerçek ahıra bakmıştır.",
      inanc: "İşte bir ahır.", gerekce: "Açıkça, iyi ışıkta bir ahır gördü.", dogru: "O gerçekten bir ahır." },
  ];
  D.gettier = function (stage) {
    stage.classList.add("gt");
    let i = 0;
    const sekme = h("div.gt-sekme");
    const kart = h("div.gt-kart.pad.scroll");
    const alt = h("div.controls",
      h("button.btn.ghost", { type: "button", onclick: () => git(i - 1) }, "Önceki vaka"),
      h("span.spacer"),
      h("button.btn", { type: "button", onclick: () => git(i + 1) }, "Sonraki vaka"));
    stage.append(sekme, kart, alt);
    const tabs = VAKA.map((V, j) => { const b = h("button", { type: "button", onclick: () => git(j) }, `${j + 1}. ${V.ad}`); sekme.append(b); return b; });
    function git(j) {
      i = (j + VAKA.length) % VAKA.length;
      const V = VAKA[i];
      tabs.forEach((b, k) => { b.classList.toggle("on", k === i); const v = Oy.get("s-gettier." + VAKA[k].k); b.dataset.v = v || ""; });
      kart.innerHTML = "";
      kart.append(h("div.gt-ust", svg(V.ikon), h("div", h("h4", V.ad), h("small.muted", V.kaynak))), h("p.gt-metin", V.metin));
      kart.append(h("ul.gt-jtb",
        h("li", h("i", "✓"), h("b", "İnanç: "), V.inanc),
        h("li", h("i", "✓"), h("b", "Gerekçe: "), V.gerekce),
        h("li", h("i", "✓"), h("b", "Doğru: "), V.dogru)));
      Oy.secim(kart, {
        anahtar: "s-gettier." + V.k, soru: "Üç koşul da sağlanıyor. Bu kişi biliyor mu?",
        secenekler: [
          { v: "bilgi", ad: "Evet, biliyor", ilke: "Haklı gerekçelendirilmiş doğru inanç bilgidir; doğruluğa nasıl ulaşıldığı ayrıca önemli değildir.", filozof: [],
            lehte: "Tanım basit ve açık kalır; gündelik hayatta bilgiyi çoğunlukla böyle atfederiz.",
            itiraz: "O zaman bilgi şansa bağlı olur: aynı gerekçeyle bir dakika önce baksaydı aynı inancı yanlış olurdu." },
          { v: "degil", ad: "Bilgi değil", ilke: "İnancın doğruluğu gerekçeye bağlı olmalı; şans eseri doğru olan inanç bilgi sayılmaz.", filozof: ["gettier", "platon"],
            lehte: "Sezgilerimizin çoğu bu yönde; bilgi, \"tesadüfen doğru\"dan fazlası olmalı.",
            itiraz: "Peki eksik olan dördüncü koşul tam olarak ne? Önerilen her koşul için yeni bir karşı örnek bulundu." },
        ],
        sonra: () => tabs.forEach((b, k) => (b.dataset.v = Oy.get("s-gettier." + VAKA[k].k) || "")),
      });
    }
    git(0);
    return {};
  };
})();
