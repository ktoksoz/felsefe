/* 9. Orta Çağ deneyleri: Aquinas'a uzanan okuma zinciri, Ockham'ın usturası */
(function () {
  const { h } = L;
  const D = window.Demos;

  /* --- Aquinas: etki zinciri ve inanç–akıl seçimi --- */
  D.aquinasag = function (stage) {
    stage.classList.add("aq");
    const agKap = h("div.aq-ag");
    stage.append(agKap);
    const ag = EtkiAgi(agKap, {
      filozoflar: ["platon", "aristoteles", "plotinos", "augustinus", "boethius", "farabi", "ibn_sina", "gazali", "ibn_rusd", "anselmus", "aquinas", "ockham"],
      zincir: ["aristoteles", "farabi", "ibn_sina", "ibn_rusd", "aquinas"],
    });
    let tm = 0;
    const ctl = h("div.controls", h("button.btn.primary", { type: "button", onclick: () => { clearTimeout(tm); ag.sec(null); ag.akis(); tm = setTimeout(() => ag.sec("aquinas"), 4 * 1400 + 200); } }, "Zinciri izle"),
      h("span.muted", "Aristoteles → Farabi → İbn Sina → İbn Rüşd → Thomas Aquinas"));
    const pan = h("div.pad.scroll.aq-panel");
    stage.append(ctl, pan);
    Oy.secim(pan, {
      anahtar: "aquinas.iman-akil", soru: "İnanç ile akıl arasındaki ilişki sizce nasıl?",
      secenekler: [
        { v: "uyum", ad: "Uyumlu iki yol", ilke: "Akıl ve vahiy aynı hakikatin iki kaynağıdır; doğru bir akıl yürütme imanla çelişmez.", filozof: ["aquinas", "ibn_rusd"],
          itiraz: "Ockhamlı William: İnancın birçok ilkesi akılla kanıtlanamaz; ikisini uzlaştırma çabası her ikisini de zayıflatabilir." },
        { v: "inan", ad: "Anlamak için inanırım", ilke: "İnanç, aklın yolunu açar; anlamaya imanla başlanır.", filozof: ["augustinus", "anselmus"],
          itiraz: "Önce inanmak, varılacak sonucu baştan belirlemez mi? Bir kuşkucu buna döngüsel akıl yürütme der." },
        { v: "ayri", ad: "Ayrı alanlar", ilke: "Akıl doğayı, inanç aşkın olanı konu alır; biri ötekini kanıtlayamaz ya da çürütemez.", filozof: ["ockham"],
          itiraz: "İki alan bir yerde kesişirse (ör. evrenin bir başlangıcı var mı?) hangisi geçerli olacak? 13. yüzyıldaki \"çifte hakikat\" tartışması tam bu soruydu." },
        { v: "akil", ad: "Yalnızca akıl", ilke: "Akla ve kanıta dayanmayan bir iddia bilgi sayılamaz; inanç kanıtla orantılı olmalıdır.", filozof: ["hume"],
          itiraz: "Aklın kendisine olan güvenimiz de akılla kanıtlanabilir mi? Her akıl yürütme, kanıtlanmamış bazı ilkelerden başlar." },
      ],
    });
    return { enter: () => ag.enter(), leave: () => { clearTimeout(tm); ag.leave(); } };
  };

  /* --- Ockham'ın usturası --- */
  const VARSAYIM = [
    { k: "a1", ad: "Gece hava serinledi" },
    { k: "a2", ad: "Havada nem vardı" },
    { k: "a3", ad: "Komşu gece gizlice suladı" },
    { k: "a4", ad: "Sessiz bir yağmur yağdı" },
    { k: "a5", ad: "Görünmez bir ruh damlattı" },
  ];
  const GOZLEM = [
    { k: "o1", ad: "Çiçekler ıslak", tur: "acikla" },
    { k: "o2", ad: "Araba camı ıslak", tur: "acikla" },
    { k: "o3", ad: "Gece kimse yağmur sesi duymadı", tur: "kisit" },
    { k: "o4", ad: "Saksıların toprağı kuru", tur: "kisit" },
  ];
  function degerlendir(A) {
    const ciy = A.has("a1") && A.has("a2");
    const durum = {
      o1: ciy || A.has("a3") || A.has("a4") || A.has("a5") ? "ok" : "yok",
      o2: ciy || A.has("a4") || A.has("a5") ? "ok" : "yok",
      o3: A.has("a4") ? "celiski" : "uyum",
      o4: A.has("a3") || A.has("a4") ? "celiski" : "uyum",
    };
    const aciklanan = ["o1", "o2"].filter((k) => durum[k] === "ok").length;
    const celiski = Object.values(durum).filter((v) => v === "celiski").length;
    return { durum, aciklanan, celiski, ruh: A.has("a5"), ciy };
  }
  D.ustura = function (stage) {
    const A = new Set(VARSAYIM.map((v) => v.k));
    const vList = h("ul.us-v"), gList = h("ul.us-g"), olc = h("div.us-olc"), karar = h("p.us-karar");
    const vBtn = {};
    VARSAYIM.forEach((v) => {
      const b = h("button.us-kes", { type: "button", "aria-label": "Kes: " + v.ad, onclick: () => { A.has(v.k) ? A.delete(v.k) : A.add(v.k); yaz(); } });
      vBtn[v.k] = b;
      vList.append(h("li", { "data-k": v.k }, h("span.us-ad", v.ad), b));
    });
    GOZLEM.forEach((g) => gList.append(h("li", { "data-k": g.k }, h("i.us-i"), h("span", g.ad))));
    const bas = h("button.btn.ghost", { type: "button", onclick: () => { VARSAYIM.forEach((v) => A.add(v.k)); yaz(); } }, "Bütün varsayımları geri koy");
    stage.append(h("div.us-wrap.pad",
      h("div.us-col", h("h4", "Varsayımlar"), vList),
      h("div.us-col", h("h4", "Gözlemler"), gList)),
      h("div.us-alt.pad", olc, karar, bas));
    const pan = h("div.pad.scroll.us-panel");
    stage.append(pan);
    function yaz() {
      const r = degerlendir(A);
      VARSAYIM.forEach((v) => {
        const li = vList.querySelector(`[data-k="${v.k}"]`), on = A.has(v.k);
        li.classList.toggle("kesik", !on);
        // gerekli mi? atınca açıklanan azalıyorsa gereklidir
        const B = new Set(A); B.delete(v.k);
        const gerekli = on && degerlendir(B).aciklanan < r.aciklanan;
        li.classList.toggle("gerekli", gerekli);
        vBtn[v.k].textContent = on ? "✂ Kes" : "Geri koy";
      });
      GOZLEM.forEach((g) => {
        const li = gList.querySelector(`[data-k="${g.k}"]`), d = r.durum[g.k];
        li.className = d;
        li.querySelector(".us-i").textContent = d === "ok" ? "✓" : d === "celiski" ? "✗" : d === "uyum" ? "·" : "?";
        li.title = d === "ok" ? "Açıklanıyor" : d === "celiski" ? "Bir varsayımla çelişiyor" : d === "uyum" ? "Varsayımlarla uyumlu" : "Açıklanmıyor";
      });
      olc.innerHTML = "";
      olc.append(h("span", h("b", String(A.size)), " varsayım"), h("span", h("b", `${r.aciklanan}/2`), " ıslaklık açıklanıyor"),
        h("span" + (r.celiski ? ".kotu" : ""), h("b", String(r.celiski)), " çelişki"));
      let k;
      if (r.aciklanan < 2) k = "Bir şey eksik: bazı ıslaklıklar artık açıklanmıyor. Kestiğiniz varsayım gerekliydi; geri koyun.";
      else if (r.celiski) k = "Açıklama çok şey söylüyor ama bazı gözlemlerle çelişiyor. Çelişkiye yol açan varsayımı bulun.";
      else if (r.ruh && A.size === 1) k = "Ruh her şeyi \"açıklıyor\" ama hiçbir şeyi yasaklamıyor: hangi gözlem gelse ona uyar. Sınanamayan bir açıklama, gerçekte hiçbir şey açıklamaz.";
      else if (r.ruh) k = "Ruh varsayımı hiçbir yeni gözlemi açıklamıyor; serinlik ve nem zaten yetiyor. Ustura onu da keser.";
      else if (A.size === 2 && r.ciy) k = "Ustura işini yaptı: iki varsayım (serinlik ve nem, yani çiy) dört gözlemin hepsiyle uyumlu, hiçbir çelişki yok.";
      else k = "Hâlâ fazladan bir varsayım var. Onu atınca bir şey kaybediyor musunuz?";
      karar.textContent = k;
      karar.classList.toggle("tamam", A.size === 2 && r.ciy && !r.celiski);
    }
    yaz();
    Oy.secim(pan, {
      anahtar: "ockham.basit", soru: "Basit açıklama her zaman doğruya daha mı yakındır?",
      secenekler: [
        { v: "evet", ad: "Evet, doğa basittir", ilke: "Doğa boşuna hiçbir şey yapmaz; en sade açıklama gerçeğe en yakın olandır.", filozof: ["aristoteles"],
          itiraz: "Tarih tersini de gösterir: Kepler'in elipsleri dairelerden, kuantum fiziği klasik fizikten daha karmaşıktır ama daha iyi açıklar." },
        { v: "kural", ad: "Hayır, ama iyi bir çalışma kuralı", ilke: "Basitlik doğruluğun kanıtı değil; sınanabilir ve işe yarar açıklamalar kurmanın yoludur.", filozof: ["ockham", "popper"],
          itiraz: "Hangi açıklamanın \"daha basit\" olduğu her zaman açık değildir: daha az varlık mı, daha az kural mı, daha kısa bir formül mü?" },
        { v: "hayir", ad: "Hayır, gerçek çoğu zaman karmaşıktır", ilke: "Açıklamayı yapay olarak sadeleştirmek önemli ayrıntıları gözden kaçırtır.", filozof: [],
          itiraz: "Karmaşıklık eklemek her zaman mümkündür. Fazladan varsayımı neyin haklı çıkardığını söyleyemezsek her açıklama sonsuza dek büyüyebilir." },
      ],
    });
    return {};
  };
})();
