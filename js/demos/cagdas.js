/* 11. Çağdaş felsefe deneyleri: "oyun"un tanımı, Wason'un 2-4-6 görevi, güncel ikilemler */
(function () {
  const { h } = L;
  const D = window.Demos;

  /* --- Wittgenstein: oyun kavramını tanımlamaya çalış --- */
  const OZ = ["Kazanan ve kaybeden var", "Rakip var", "Kuralları var", "Beceri gerekir", "Şans payı var", "Eğlence için oynanır", "Top kullanılır", "Takımla oynanır"];
  const OYUN = [
    ["Satranç", [1, 1, 1, 1, 0, 1, 0, 0]],
    ["Futbol", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Tavla", [1, 1, 1, 1, 1, 1, 0, 0]],
    ["Pasyans (tek kişilik kâğıt oyunu)", [1, 0, 1, 1, 1, 1, 0, 0]],
    ["Saklambaç", [0, 1, 1, 1, 1, 1, 0, 0]],
    ["Topu duvara atıp tutmak", [0, 0, 0, 1, 0, 1, 1, 0]],
    ["Evcilik", [0, 0, 0, 0, 0, 1, 0, 0]],
  ];
  const DEGIL = [
    ["Film izlemek", [0, 0, 0, 0, 0, 1, 0, 0]],
    ["Seçim yarışı", [1, 1, 1, 1, 1, 0, 0, 1]],
    ["Okul sınavı", [1, 0, 1, 1, 1, 0, 0, 0]],
  ];
  D.oyunlar = function (stage) {
    const sec = new Set();
    const ozRow = h("div.oy-ozler", OZ.map((o, i) => h("button.btn.oz", { type: "button", "aria-label": "Ortak özellik: " + o, "aria-pressed": "false", onclick: (e) => {
      sec.has(i) ? sec.delete(i) : sec.add(i);
      e.currentTarget.classList.toggle("on", sec.has(i)); e.currentTarget.setAttribute("aria-pressed", sec.has(i));
      ciz();
    } }, h("b.oz-no", String(i + 1)), o)));
    const tablo = h("table.oy-tablo");
    const ozet = h("p.oy-ozet", { "aria-live": "polite" });
    const panel = h("div.oy-panel");
    stage.append(h("div.pad.scroll.oy-wrap",
      h("p.oy-yonerge", "Bir şey ancak şu özelliklerin hepsine sahipse oyundur:"), ozRow, h("div.oy-tablo-k", tablo), ozet, panel));
    const satir = (ad, v, tur) => {
      const tr = h("tr", { "data-tur": tur }, h("th", ad), ...v.map((x, i) => h("td", { title: OZ[i] }, x ? "●" : "·")));
      return tr;
    };
    tablo.append(h("thead", h("tr", h("th", ""), ...OZ.map((o, i) => h("th.oz-th", { title: o }, String(i + 1))))));
    const govde = h("tbody");
    const rows = [...OYUN.map(([a, v]) => [a, v, "oyun", satir(a, v, "oyun")]), ...DEGIL.map(([a, v]) => [a, v, "degil", satir(a, v, "degil")])];
    govde.append(h("tr.ara", h("td", { colspan: 9 }, "Oyunlar")));
    rows.filter((r) => r[2] === "oyun").forEach((r) => govde.append(r[3]));
    govde.append(h("tr.ara", h("td", { colspan: 9 }, "Oyun olmayanlar")));
    rows.filter((r) => r[2] === "degil").forEach((r) => govde.append(r[3]));
    tablo.append(govde);
    let ilkKez = true;
    function ciz() {
      const uyan = (v) => [...sec].every((i) => v[i]);
      const disari = [], iceri = [];
      rows.forEach(([a, v, tur, tr]) => {
        const u = uyan(v);
        tr.classList.toggle("ic", u); tr.classList.toggle("dis", !u);
        tr.querySelectorAll("td").forEach((td, i) => td.classList.toggle("sec", sec.has(i)));
        if (tur === "oyun" && !u) disari.push(a);
        if (tur === "degil" && u) iceri.push(a);
      });
      if (!sec.size) { ozet.textContent = "Henüz bir özellik seçmediniz: her şey oyun sayılıyor, oyun olmayanlar da."; return; }
      ozet.innerHTML = (disari.length ? `<b>Dışarıda kalan oyunlar:</b> ${disari.join(", ")}. ` : "<b>Bütün oyunlar içeride.</b> ") +
        (iceri.length ? `<b>İçeri giren oyun olmayanlar:</b> ${iceri.join(", ")}.` : "Oyun olmayanların hepsi dışarıda.");
      if (ilkKez) {
        ilkKez = false;
        Oy.secim(panel, {
          anahtar: "analitik-kita.oyun", soru: "Sizce \"oyun\"un bütün oyunları kapsayan bir tanımı var mı?",
          secenekler: [
            { v: "var", ad: "Var, henüz bulamadık", ilke: "Bir kavramı anlamak, onun bütün örneklerinde ortak olan özü bulmaktır.", filozof: ["sokrates", "platon"],
              itiraz: "Wittgenstein: \"Bakma, düşün demiyorum, bak!\" Baktığımızda bir öz değil, örtüşen benzerlikler ağı görürüz." },
            { v: "aile", ad: "Yok, yalnızca aile benzerliği var", ilke: "Kavramların sınırları keskin değildir; örnekleri birbirine örtüşen benzerliklerle bağlanır.", filozof: ["wittgenstein"],
              itiraz: "Bernard Suits bir tanım önerdi: Oyun oynamak, gereksiz engelleri gönüllü olarak aşma girişimidir (Çekirge, 1978)." },
            { v: "kullanim", ad: "Tanım gerekmez, kullanımı biliyoruz", ilke: "Bir sözcüğün anlamı dildeki kullanımıdır; doğru kullanabiliyorsak anlıyoruz demektir.", filozof: ["wittgenstein"],
              itiraz: "Hukukta ya da bilimde bir kavramın sınırını çizmek zorunda kaldığımızda yalnızca kullanım yetmeyebilir." },
          ],
        });
      }
    }
    ciz();
    return {};
  };

  /* --- Wason'un 2-4-6 görevi --- */
  const KURAL = (a, b, c) => a < b && b < c;
  const TAHMIN = [
    ["iki", "Her sayı öncekinden 2 fazla"],
    ["cift", "Çift sayılar, artan sırayla"],
    ["artan", "Artan herhangi üç sayı"],
    ["toplam", "Üçüncü sayı ilk ikisinin toplamı"],
    ["kat", "Hepsi aynı sayının katları"],
  ];
  D.wason = function (stage) {
    const inp = [2, 4, 6].map((v, i) => h("input.ws-in", { type: "number", value: v, "aria-label": `${i + 1}. sayı`, step: "any" }));
    const gecmis = h("ol.ws-gecmis", { "aria-live": "polite" });
    let denemeler = [];
    function sina(vals) {
      const v = vals || inp.map((x) => +x.value);
      if (v.some((x) => !isFinite(x))) return;
      if (vals) inp.forEach((x, i) => (x.value = v[i]));
      const ok = KURAL(...v);
      denemeler.push({ v, ok });
      gecmis.prepend(h("li." + (ok ? "uy" : "uymaz"), h("span", v.join(", ")), h("b", ok ? "Uyuyor" : "Uymuyor")));
    }
    inp.forEach((x) => x.addEventListener("keydown", (e) => { if (e.key === "Enter") sina(); }));
    const hizli = [[8, 10, 12], [1, 2, 3], [6, 4, 2], [1, 50, 99]].map((v) => h("button.btn.ghost.ws-h", { type: "button", onclick: () => sina(v) }, v.join(", ")));
    const tahmin = h("div.ws-tahmin", TAHMIN.map(([k, ad]) => h("button.btn.sec", { type: "button", "data-k": k, onclick: () => bitir(k) }, ad)));
    const sonuc = h("div.ws-sonuc", { "aria-live": "polite" });
    const sifirla = h("button.btn.ghost", { type: "button", onclick: () => { denemeler = []; gecmis.innerHTML = ""; sonuc.innerHTML = ""; tahmin.querySelectorAll("button").forEach((b) => b.classList.remove("on")); } }, "Baştan başla");
    stage.append(h("div.pad.scroll.ws-wrap",
      h("div.ws-ust",
        h("div.ws-kart", h("p.ws-et", "Bilinen örnek"), h("p.ws-246", "2 · 4 · 6"), h("p.muted", "Bu üçlü kurala uyuyor.")),
        h("div.ws-sorgu", h("p.ws-et", "Kendi üçlünüzü sınayın"), h("div.ws-row", ...inp, h("button.btn.primary", { type: "button", onclick: () => sina() }, "Sına")), h("div.ws-row", ...hizli))),
      h("div.ws-orta", h("div", h("p.ws-et", "Denemeleriniz"), gecmis), h("div", h("p.ws-et", "Kural ne? Tahmininizi seçin"), tahmin, sifirla)),
      sonuc));
    function bitir(k) {
      tahmin.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.k === k));
      const uymayan = denemeler.some((d) => !d.ok);
      // "çürütme denemesi": +2 kalıbına uymayan bir üçlü sınamak
      const cesur = denemeler.some((d) => !(d.v[1] - d.v[0] === 2 && d.v[2] - d.v[1] === 2));
      const str = uymayan || cesur ? "yanlislama" : "dogrulama";
      Oy.set("bilim-felsefesi.strateji", str);
      sonuc.innerHTML = "";
      const dogru = k === "artan";
      sonuc.append(h("p.ws-acik", dogru ? h("b", "Buldunuz. ") : h("b", "Gizli kural başka. "),
        "Kural: artan herhangi üç sayı. ", `${denemeler.length} üçlü sınadınız; ${denemeler.filter((d) => !d.ok).length} tanesi uymadı.`));
      sonuc.append(Oy.ilkePanel(str === "yanlislama"
        ? { ilke: "Kuralınızı çürütebilecek örnekleri de denediniz: kalıba uymayan üçlüler sınadınız.", filozof: ["popper"],
            itiraz: "Kuhn: Gerçek bilimde tek bir aykırı sonuç kuramı hemen yıkmaz; bilim insanları önce ölçümden ya da yardımcı varsayımlardan kuşkulanır." }
        : { ilke: "Yalnızca aklınızdaki kuralı doğrulayan örnekleri sınadınız. Wason'un deneklerinin çoğu da böyle yaptı.", filozof: ["wason"],
            lehte: "Gündelik hayatta doğrulayan örnek aramak çoğu zaman hızlı ve yeterlidir.",
            itiraz: "Popper: Doğrulayan örnekler ne kadar çok olursa olsun bir genellemeyi kanıtlamaz; tek bir aykırı örnek onu çürütebilir." }));
      const t = Oy.tutarlilikNotu("bilim-felsefesi.strateji");
      if (t) sonuc.append(t);
    }
    return {};
  };

  /* --- Felsefe bugün: üç güncel ikilem --- */
  D.bugun = function (stage) {
    const govde = h("div.bg-govde");
    const panels = {};
    panels.yz = h("div.bg-p");
    Oy.secim(panels.yz, {
      anahtar: "felsefe-bugun.yz", soru: "Bir dil modeli \"Lütfen beni kapatmayın, korkuyorum\" yazıyor. Ne düşünürsünüz?",
      secenekler: [
        { v: "metin", ad: "Yalnızca metin üretiyor, bir şey hissetmez", ilke: "Sembolleri kurallara göre işlemek anlamak ya da hissetmek değildir.", filozof: ["searle"],
          itiraz: "Başkalarının hissettiğini de yalnızca davranışlarından çıkarıyoruz. Bu ölçüt insanlara neden farklı uygulansın?" },
        { v: "davranis", ad: "İnsan gibi davranıyorsa ciddiye almalıyız", ilke: "Bir zihni dışarıdan ayırt edemiyorsak, ona zihin dememek için iyi bir nedenimiz yoktur.", filozof: ["turing"],
          itiraz: "Taklit, sahip olmak değildir: bir papağan da \"korkuyorum\" diyebilir." },
        { v: "temkin", ad: "Bilemeyiz; temkinli olmalıyız", ilke: "Bilinç için kesin bir ölçütümüz yok; olası bir acıyı ciddiye almak ihtiyatlıdır.", filozof: ["chalmers"],
          itiraz: "Her şey için temkin, hiçbir şey yapamamaya varabilir. Bir taşın bilinçsiz olduğunu da kanıtlayamayız." },
      ],
    });
    panels.yz.append(h("p.bg-bag", h("a", { href: "#s-cince-oda" }, "Büyük soru: Zihin ve makine"), " · ", h("a", { href: "https://yz.koraytoksoz.com", target: "_blank", rel: "noopener" }, "Bir dil modeli nasıl çalışır? ↗")));
    panels.bio = h("div.bg-p");
    Oy.secim(panels.bio, {
      anahtar: "felsefe-bugun.havuz", soru: "Sığ bir havuzda bir çocuk boğuluyor. Kurtarırsanız pahalı ayakkabılarınız mahvolacak. Ne yaparsınız?",
      secenekler: [
        { v: "evet", ad: "Evet, kurtarırım", ilke: "Küçük bir bedelle büyük bir kötülüğü önleyebiliyorsak, önlemeliyiz.", filozof: ["singer"],
          itiraz: "Bu ilke tutarlı uygulanırsa çok ağır talepler doğurur: neredeyse her harcamamız başka bir hayatı kurtarabilirdi." },
        { v: "hayir", ad: "Hayır, zorunda değilim", ilke: "Kimseye yardım etmek zorunda değiliz; yalnızca zarar vermemekle yükümlüyüz.", filozof: [],
          itiraz: "Neredeyse hiç kimse bu durumda çocuğu bırakmayı kabul edilebilir bulmaz; sezgilerimiz yardım yükümlülüğünden yana." },
      ],
    });
    const uzak = h("div.bg-uzak");
    Oy.secim(uzak, {
      anahtar: "felsefe-bugun.uzak", soru: "Aynı parayı bağışlayarak uzak bir ülkede bir çocuğun hayatını kurtarabilirsiniz. Bu da bir yükümlülük mü?",
      secenekler: [
        { v: "ayni", ad: "Evet, aynı yükümlülük", ilke: "Uzaklık ahlaken önemsizdir; yardım edebileceğim herkes aynı ölçüde sayılır.", filozof: ["singer"],
          itiraz: "Yakınlarımıza karşı özel yükümlülüklerimiz vardır; ahlak yalnızca toplamı büyütmek değildir." },
        { v: "yakin", ad: "Hayır, yakınlık fark yaratır", ilke: "Önümüzdeki kişiye karşı yükümlülüğümüz, uzaktaki yabancıya karşı olandan güçlüdür.", filozof: ["konfucyus"],
          itiraz: "Singer: Bir çocuğun hayatının değeri, size olan uzaklığına göre değişmez." },
        { v: "gonullu", ad: "İyi olur ama zorunlu değil", ilke: "Bağış güzel bir davranıştır, ama yükümlülüğün ötesindedir.", filozof: [],
          itiraz: "Havuzdaki çocuğu kurtarmayı zorunlu saydıysak, aradaki fark tam olarak nedir?" },
      ],
    });
    panels.bio.append(uzak);
    panels.cevre = h("div.bg-p");
    Oy.secim(panels.cevre, {
      anahtar: "felsefe-bugun.cevre", soru: "Bugün bir kaynağı tüketmek bize fayda sağlıyor, ama iki yüz yıl sonra yaşayacak insanlara zarar verecek. Onların çıkarları sayılır mı?",
      secenekler: [
        { v: "esit", ad: "Bizimkiler kadar sayılır", ilke: "Zamanda uzaklık, mekânda uzaklık gibi ahlaken önemsizdir.", filozof: ["parfit"],
          itiraz: "Henüz var olmayan insanların ne isteyeceğini bilemeyiz; belki teknolojileri bu sorunu çözecek." },
        { v: "az", ad: "Sayılır ama daha az", ilke: "Uzak geleceğin çıkarları, belirsizlik nedeniyle daha düşük ağırlıkla hesaba katılabilir.", filozof: [],
          itiraz: "Parfit: Bir acının yalnızca daha sonra geleceği için daha az önemli sayılması keyfidir." },
        { v: "yok", ad: "Var olmayanların hakkı olmaz", ilke: "Haklar ve çıkarlar ancak var olan kişilere aittir.", filozof: [],
          itiraz: "Hans Jonas: Gücümüz geleceği etkileyecek kadar büyüdüyse, sorumluluğumuz da o kadar uzanmalıdır." },
      ],
    });
    const seg = L.seg([["yz", "Zihin ve yapay zekâ"], ["bio", "Biyoetik"], ["cevre", "Çevre etiği"]], "yz", (k) => goster(k));
    function goster(k) { Object.entries(panels).forEach(([kk, p]) => (p.style.display = kk === k ? "" : "none")); }
    Object.values(panels).forEach((p) => govde.append(p));
    goster("yz");
    stage.append(h("div.controls.top", seg), h("div.pad.scroll.bg-wrap", govde));
    return {};
  };
})();
