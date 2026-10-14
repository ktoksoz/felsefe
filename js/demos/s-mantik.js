/* Büyük soru 2 deneyleri: doğruluk tablosu kurucu, safsata avı */
(function () {
  const { h } = L;
  const D = window.Demos;
  const DY = (b) => (b ? "D" : "Y");
  const ROWS = [[true, true], [true, false], [false, true], [false, false]];

  /* --- Doğruluk tabloları --- */
  const BAGLAC = {
    ve: { ad: "p ve q", f: (p, q) => p && q, not: "Yalnızca ikisi de doğruysa doğru." },
    veya: { ad: "p veya q", f: (p, q) => p || q, not: "En az biri doğruysa doğru (kapsayıcı veya)." },
    ise: { ad: "p ise q", f: (p, q) => !p || q, not: "Yalnızca p doğru, q yanlışken yanlış. p yanlışsa koşul \"çiğnenmemiş\" sayılır." },
    ancak: { ad: "p ancak ve ancak q", f: (p, q) => p === q, not: "İkisi aynı değeri aldığında doğru." },
    degil: { ad: "değil p", f: (p) => !p, not: "p'nin tersi." },
  };
  const BICIM = {
    mp: { ad: "Modus ponens", ornek: ["Yağmur yağarsa yer ıslanır.", "Yağmur yağıyor.", "O hâlde yer ıslak."],
      sembol: ["p ise q", "p", "q"], onc: (p, q) => [!p || q, p], son: (p, q) => q, gecerli: true },
    mt: { ad: "Modus tollens", ornek: ["Yağmur yağarsa yer ıslanır.", "Yer ıslak değil.", "O hâlde yağmur yağmıyor."],
      sembol: ["p ise q", "değil q", "değil p"], onc: (p, q) => [!p || q, !q], son: (p) => !p, gecerli: true },
    so: { ad: "Sonucu onaylama", ornek: ["Yağmur yağarsa yer ıslanır.", "Yer ıslak.", "O hâlde yağmur yağdı."],
      sembol: ["p ise q", "q", "p"], onc: (p, q) => [!p || q, q], son: (p) => p, gecerli: false },
    or: { ad: "Öncülü reddetme", ornek: ["Yağmur yağarsa yer ıslanır.", "Yağmur yağmıyor.", "O hâlde yer ıslak değil."],
      sembol: ["p ise q", "değil p", "değil q"], onc: (p, q) => [!p || q, !p], son: (p, q) => !q, gecerli: false },
  };
  D.dogruluk = function (stage) {
    const wrap = h("div.dt.pad.scroll");
    stage.append(wrap);
    // 1) bağlaç tablosu
    let bag = "ve";
    const tablo = h("div.dt-tablo");
    const mesaj = h("p.dt-mesaj", { "aria-live": "polite" });
    const segB = L.seg(Object.entries(BAGLAC).map(([k, v]) => [k, v.ad]), bag, (k) => { bag = k; ciz(); });
    wrap.append(h("h4.dt-bas", "1. Bir bağlacın tablosunu doldurun"), segB, tablo,
      h("div.dt-row", h("button.btn.primary", { type: "button", onclick: denetle }, "Denetle"), mesaj));
    let tahmin = [];
    function ciz() {
      tahmin = [null, null, null, null];
      mesaj.textContent = BAGLAC[bag].not ? "Sonuç sütununu tıklayarak D ya da Y yapın." : "";
      const tek = bag === "degil";
      const rows = tek ? [[true], [false]] : ROWS;
      const t = h("table.truth.dt-t", h("tr", h("th", "p"), tek ? "" : h("th", "q"), h("th", BAGLAC[bag].ad)));
      rows.forEach(([p, q], i) => {
        const b = h("button.dt-hucre", { type: "button", "aria-label": `Satır ${i + 1} sonucu`, onclick: () => {
          tahmin[i] = tahmin[i] === null ? true : tahmin[i] ? false : null;
          b.textContent = tahmin[i] === null ? "?" : DY(tahmin[i]); b.className = "dt-hucre";
        } }, "?");
        t.append(h("tr", h("td", DY(p)), tek ? "" : h("td", DY(q)), h("td", b)));
      });
      tablo.innerHTML = ""; tablo.append(t);
    }
    function denetle() {
      const tek = bag === "degil";
      const rows = tek ? [[true], [false]] : ROWS;
      let tut = 0;
      tablo.querySelectorAll(".dt-hucre").forEach((b, i) => {
        const dog = BAGLAC[bag].f(rows[i][0], rows[i][1]);
        const ok = tahmin[i] === dog;
        if (ok) tut++;
        b.textContent = DY(dog);
        b.className = "dt-hucre " + (ok ? "ok" : "fark");
      });
      mesaj.textContent = `${tut} / ${rows.length} satır tahmininizle örtüştü. ${BAGLAC[bag].not}`;
    }
    ciz();

    // 2) çıkarım biçimleri
    let bic = "mp";
    const bicKutu = h("div.dt-bicim");
    const segC = L.seg(Object.entries(BICIM).map(([k, v]) => [k, v.ad]), bic, (k) => { bic = k; bicimCiz(); });
    wrap.append(h("h4.dt-bas", "2. Bu çıkarım geçerli mi?"), segC, bicKutu);
    function bicimCiz() {
      const B = BICIM[bic];
      bicKutu.innerHTML = "";
      bicKutu.append(h("ol.dt-arg", B.ornek.map((s, i) => h("li" + (i === 2 ? ".son" : ""), s, h("code", B.sembol[i])))));
      const sonuc = h("div.dt-sonuc");
      Oy.secim(bicKutu, {
        anahtar: "s-dogruluk." + bic, soru: "Öncüller doğruysa sonuç kesinlikle doğru olmak zorunda mı?",
        secenekler: [
          { v: "gecerli", ad: "Geçerli",
            ilke: B.gecerli ? "Öncüllerin hepsi doğruyken sonuç yanlış olamaz: tablonun hiçbir satırında böyle bir durum yok." : "Gündelik akıl yürütmede bu çıkarım çoğu zaman makul bir tahmindir: en iyi açıklamayı seçeriz.",
            filozof: B.gecerli ? ["aristoteles", "frege"] : [],
            itiraz: B.gecerli ? "Geçerli bir biçim sonucun doğru olduğunu garanti etmez; öncüllerden biri yanlışsa sonuç da yanlış olabilir." : "Tabloda öncüllerin hepsi doğruyken sonucun yanlış olduğu bir satır var. Mantıkçılar bu biçime \"" + B.ad.toLocaleLowerCase("tr") + "\" der ve geçersiz sayar." },
          { v: "gecersiz", ad: "Geçersiz",
            ilke: B.gecerli ? "Gerçek hayatta bu tür çıkarımların ters gittiği durumlar düşünülebilir." : "Öncüller doğru, sonuç yanlış olabilir: karşı örnek satırı bunu gösteriyor.",
            filozof: B.gecerli ? [] : ["aristoteles", "nyaya"],
            itiraz: B.gecerli ? "Tabloda öncüllerin hepsi doğruyken sonucun yanlış olduğu bir satır yok; biçim geçerli sayılır. Kuşku belki öncüllerden birine, örneğin \"yağmur yağarsa yer ıslanır\" önermesine yöneliktir." : "Gündelik dilde bu çıkarım çoğu zaman işe yarar; ama mantıkça zorunlu değildir." },
        ],
        sonra: () => tabloCiz(sonuc),
      });
      bicKutu.append(sonuc);
      if (Oy.get("s-dogruluk." + bic)) tabloCiz(sonuc);
    }
    function tabloCiz(kutu) {
      const B = BICIM[bic];
      kutu.innerHTML = "";
      const t = h("table.truth.dt-t", h("tr", h("th", "p"), h("th", "q"), h("th", B.sembol[0]), h("th", B.sembol[1]), h("th", "Sonuç: " + B.sembol[2])));
      let karsi = 0;
      ROWS.forEach(([p, q]) => {
        const o = B.onc(p, q), s = B.son(p, q);
        const hepsi = o.every(Boolean);
        const k = hepsi && !s;
        if (k) karsi++;
        t.append(h("tr" + (k ? ".karsi" : hepsi ? ".hepsi" : ""), h("td", DY(p)), h("td", DY(q)), h("td", DY(o[0])), h("td", DY(o[1])), h("td", DY(s))));
      });
      kutu.append(t, h("p.dt-mesaj", karsi
        ? "İşaretli satır karşı örnektir: öncüllerin ikisi de doğru, sonuç yanlış. Örneğin yağmur yağmamış ama yer hortumla sulandığı için ıslak."
        : "Öncüllerin ikisinin de doğru olduğu her satırda sonuç da doğru: karşı örnek yok, biçim geçerli."));
    }
    bicimCiz();
    return {};
  };

  /* --- Safsata avı --- */
  const TURLER = [
    ["adam", "Adam karalama", "Söylenene değil, söyleyene bakıyor."],
    ["korkuluk", "Korkuluk", "Karşı tarafın gerçekte söylediğiyle karşılaştırın."],
    ["kaygan", "Kaygan zemin", "Zincirin her halkası kanıtlanmış mı?"],
    ["ikilem", "Yanlış ikilem", "Gerçekten yalnızca iki seçenek mi var?"],
    ["otorite", "Otoriteye başvuru", "Sözü edilen kişi bu konunun uzmanı mı?"],
    ["kitle", "Kitleye başvuru", "Bir şeyin çok kişi tarafından düşünülmesi onu doğru yapar mı?"],
    ["dongu", "Döngüsel akıl yürütme", "Gerekçe ile sonuç aynı şeyi mi söylüyor?"],
    ["genelleme", "Aceleci genelleme", "Kaç örneğe dayanıyor?"],
  ];
  const AD = Object.fromEntries(TURLER.map(([k, a]) => [k, a]));
  const TARTISMA = [
    { kim: "Selin", tur: null, m: "Arsanın hemen yakınında iki okul var ve en yakın halk kütüphanesi otobüsle kırk dakika uzaklıkta." },
    { kim: "Kemal", tur: "adam", m: "Selin Hanım'ın önerisini ciddiye alamayız; kendisi geçen yıl apartman aidatını bile geç ödedi." },
    { kim: "Selin", tur: "otorite", m: "Ünlü oyuncu Deniz Yıldız da geçen hafta bir programda kütüphanelerin otoparklardan önemli olduğunu söyledi." },
    { kim: "Kemal", tur: "korkuluk", m: "Selin Hanım arabaları şehirden tamamen yasaklamak istiyor. Böyle aşırı bir fikri kimse desteklemez." },
    { kim: "Selin", tur: "kaygan", m: "Buraya otopark yaparsak mahalleye daha çok araba gelir, trafik artar, çocuklar sokakta oynayamaz ve sonunda mahallede tek bir aile kalmaz." },
    { kim: "Kemal", tur: "ikilem", m: "Ya otopark yaparız ya da mahallenin esnafı batar; başka yolu yok." },
    { kim: "Kemal", tur: null, m: "Belediyenin sayımına göre akşamları sokakta yüz yirmi araç var, park yeri ise yalnızca seksen." },
    { kim: "Selin", tur: "dongu", m: "Kütüphane bu arsa için en iyi seçenektir, çünkü ondan daha iyi bir seçenek yoktur." },
    { kim: "Kemal", tur: "kitle", m: "Mahallede herkes otopark istiyor, bunu herkes biliyor; demek ki doğru seçim otopark." },
    { kim: "Kemal", tur: "genelleme", m: "Geçen ay iki komşum park yeri bulamadığı için taşındı; demek ki bu mahallede kimse park yeri bulamıyor." },
  ];
  const ACIK = {
    adam: "Selin'in aidat geçmişi, kütüphane önerisinin iyi ya da kötü olduğu hakkında hiçbir şey söylemez.",
    otorite: "Bir oyuncunun görüşü, mahalledeki arsa için kütüphanenin mi otoparkın mı daha gerekli olduğuna dair bir kanıt değildir.",
    korkuluk: "Selin yalnızca arsaya kütüphane önerdi; Kemal çok daha aşırı bir görüşü ona yükleyip onu çürütüyor.",
    kaygan: "Her adım bir sonrakini zorunlu kılmıyor; zincirin halkaları kanıtlanmadan felakete varılıyor.",
    ikilem: "Arsanın bir kısmını otopark yapmak, esnafa başka destekler vermek gibi seçenekler yok sayılıyor.",
    dongu: "\"En iyi seçenek\" ile \"daha iyisi yok\" aynı şeyi söylüyor; gerekçe sonucu tekrar ediyor.",
    kitle: "Hem \"herkes\" iddiası kanıtsız hem de bir görüşün yaygınlığı onu doğru yapmaz.",
    genelleme: "İki komşunun deneyiminden bütün mahalle hakkında yargıya varılıyor.",
  };
  D.safsata = function (stage) {
    stage.classList.add("sf");
    const metin = h("div.sf-metin.pad.scroll");
    const turlar = h("div.sf-turlar");
    const geri = h("p.sf-geri", { "aria-live": "polite" }, "Önce tartışmadan bir cümle seçin.");
    const sayac = h("b.sf-sayac");
    const panel = h("div.sf-panel", h("div.sf-ust", sayac, h("button.btn.ghost", { type: "button", onclick: sifirla }, "Baştan başla")), geri, turlar);
    stage.append(metin, panel);
    metin.append(h("p.sf-baslik", "Mahalle meclisi: Boş arsaya kütüphane mi, otopark mı?"));
    let secili = null;
    const bulundu = new Set();
    const cumleler = TARTISMA.map((c, i) => {
      const el = h("p.sf-cumle", { "data-i": i, role: "button", tabindex: 0, "data-kim": c.kim },
        h("b.sf-kim", c.kim + ": "), h("span", c.m), h("em.sf-etiket"));
      el.addEventListener("click", () => sec(i));
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sec(i); } });
      metin.append(el);
      return el;
    });
    const btns = [...TURLER, ["yok", "Safsata yok", ""]].map(([k, a]) => {
      const b = h("button.btn", { type: "button", "data-k": k, onclick: () => cevap(k) }, a);
      turlar.append(b);
      return b;
    });
    function sec(i) {
      secili = i;
      cumleler.forEach((c, j) => c.classList.toggle("on", j === i));
      geri.textContent = bulundu.has(i) ? ACIK[TARTISMA[i].tur] : "Bu cümlede hangi kalıbı görüyorsunuz?";
    }
    function cevap(k) {
      if (secili === null) { geri.textContent = "Önce tartışmadan bir cümle seçin."; return; }
      const c = TARTISMA[secili];
      if (c.tur === k) {
        bulundu.add(secili);
        cumleler[secili].classList.add("bulundu");
        cumleler[secili].querySelector(".sf-etiket").textContent = AD[k];
        geri.textContent = `Evet: ${AD[k]}. ${ACIK[k]}`;
      } else if (!c.tur && k === "yok") {
        cumleler[secili].classList.add("temiz");
        geri.textContent = "Bu cümle sonucunu destekleyen bir olgu sunuyor; burada bir safsata kalıbı yok. Olgunun doğru olup olmadığı ayrıca sınanabilir.";
      } else if (!c.tur) {
        geri.textContent = "Bu cümle bir olguya dayanan bir gerekçe sunuyor; burada bilinen bir safsata kalıbı görünmüyor.";
      } else {
        const ipucu = TURLER.find(([kk]) => kk === c.tur)[2];
        geri.textContent = (k === "yok" ? "Bu cümlede bir kalıp saklı." : `Bu cümlede ${AD[k].toLocaleLowerCase("tr")} değil, başka bir kalıp var.`) + " İpucu: " + ipucu;
      }
      say();
    }
    function say() {
      sayac.textContent = `Bulunan: ${bulundu.size} / 8`;
      if (bulundu.size === 8) geri.textContent = "Sekizini de buldunuz. Dikkat: safsata bulmak, Selin'in ya da Kemal'in sonucunun yanlış olduğunu göstermez; yalnızca o gerekçelerin sonucu taşımadığını gösterir.";
    }
    function sifirla() {
      bulundu.clear(); secili = null;
      cumleler.forEach((c) => { c.classList.remove("bulundu", "temiz", "on"); c.querySelector(".sf-etiket").textContent = ""; });
      geri.textContent = "Önce tartışmadan bir cümle seçin."; say();
    }
    say();
    return {};
  };
})();
