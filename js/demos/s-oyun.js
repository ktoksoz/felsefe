/* Büyük soru 6 deneyleri: mahkûmun ikilemi turnuvası, ortak mallar (otlak) */
(function () {
  const { h, C, FONT, rgba, clamp } = L;
  const D = window.Demos;
  const O = () => window.OyunTeorisi;

  const ADLAR = {
    kisas: "Kısasa kısas", hepIhanet: "Hep ihanet", hepIsbirligi: "Hep işbirliği", rastgele: "Rastgele",
    kinci: "Kinci", affedici: "Affedici kısasa kısas", pavlov: "Pavlov (kazan-devam)", siz: "Sizin stratejiniz",
  };
  const ACIKLAMA = {
    kisas: "İlk turda işbirliği, sonra rakibin son hamlesini tekrarlar.",
    hepIhanet: "Her turda ihanet eder.", hepIsbirligi: "Her turda işbirliği yapar.", rastgele: "Yazı tura atar.",
    kinci: "Rakip bir kez ihanet ederse sonsuza dek ihanet eder.",
    affedici: "Ancak rakip art arda iki kez ihanet ederse misilleme yapar.",
    pavlov: "İyi sonuç alınca aynı hamleyi sürdürür, kötü sonuçta değiştirir.",
  };
  // tepkisel stratejilerin bilinen adları
  const TANIDIK = { CCD: "kısasa kısas ile aynı", CCC: "hep işbirliği ile aynı", DDD: "hep ihanet ile aynı", DCD: "\"şüpheci kısasa kısas\"", CDC: "ters tepki: işbirliğine ihanetle, ihanete işbirliğiyle karşılık", DCC: "önce sınayıp sonra hep işbirliği", CDD: "bir kez işbirliği, sonra hep ihanet", DDC: "ihanete işbirliğiyle karşılık" };

  /* --- Mahkûmun ikilemi turnuvası --- */
  D.mahkum = function (stage) {
    stage.classList.add("mahkum");
    const ust = h("div.pad.scroll.mk2-ust");
    stage.append(ust);
    Oy.secim(ust, {
      anahtar: "s-mahkum.tek", soru: "Tek seferlik oyun: ortağınızla bir daha hiç karşılaşmayacaksınız. Ne yaparsınız?",
      secenekler: [
        { v: "isbirligi", ad: "Susarım (işbirliği)", ilke: "Karşılıklı güven ve dürüstlük, sonuç ne olursa olsun doğru davranıştır.", filozof: ["kant", "konfucyus"],
          lehte: "İkimiz de böyle düşünürsek ikimiz için de en iyi ortak sonuca varırız.",
          itiraz: "Oyun kuramına göre tek seferlik oyunda ötmek \"baskın strateji\"dir: ortağınız ne yaparsa yapsın, ötmek size daha az ceza getirir." },
        { v: "ihanet", ad: "Öterim (ihanet)", ilke: "Karşı taraf ne yaparsa yapsın, ötmek benim için daha iyidir: baskın strateji.", filozof: ["hobbes"],
          lehte: "Bir daha karşılaşmayacağınız birine güvenmenin hiçbir güvencesi yok.",
          itiraz: "İki akılcı oyuncu da öterse ikisi de, susmuş olsalardı alacaklarından daha ağır ceza alır. Bireysel akılcılık ortak bir kayba dönüşür." },
      ],
    });
    // kendi stratejinizi kurun
    const bit = { ilk: "C", c: "C", d: "D" };
    const tanim = h("p.mk2-tanim");
    const satir = (k, ad) => h("label.mk2-k", h("span", ad), L.seg([["C", "İşbirliği"], ["D", "İhanet"]], bit[k], (v) => { bit[k] = v; kurYaz(); }));
    function kod() { return bit.ilk + bit.c + bit.d; }
    function kurYaz() {
      tanim.textContent = TANIDIK[kod()] ? "Stratejiniz: " + TANIDIK[kod()] + "." : "";
      Oy.set("s-mahkum.strateji", kod());
    }
    const k0 = Oy.get("s-mahkum.strateji");
    if (k0 && k0.length === 3) { bit.ilk = k0[0]; bit.c = k0[1]; bit.d = k0[2]; }
    ust.append(h("div.mk2-kur", h("h4", "Sizin stratejiniz"), satir("ilk", "İlk hamle"), satir("c", "Rakip işbirliği yapınca"), satir("d", "Rakip ihanet edince"), tanim));
    tanim.textContent = TANIDIK[kod()] ? "Stratejiniz: " + TANIDIK[kod()] + "." : "";

    let tur = 50, gur = 0;
    const slT = L.slider({ label: "Tur sayısı", min: 5, max: 200, step: 1, value: tur, fmt: (v) => Math.round(v) + "", oninput: (v) => (tur = Math.round(v)) });
    const slG = L.slider({ label: "Gürültü", min: 0, max: 0.1, step: 0.005, value: 0, fmt: (v) => "%" + (v * 100).toFixed(1).replace(".0", ""), oninput: (v) => (gur = v) });
    const bas = h("button.btn.primary", { type: "button", onclick: () => oyna() }, "Turnuvayı başlat");
    const sonuc = h("div.pad.mk2-sonuc", { "aria-live": "polite" });
    const bars = h("div.oy-bars.mk2-bars");
    stage.append(h("div.controls", slT, slG, h("span.spacer"), bas), h("div.pad.scroll.mk2-alt", bars, sonuc));
    const ids = Object.keys(ADLAR);
    const rows = {};
    ids.forEach((id) => {
      const i = h("i", { style: { width: "0%" } });
      const v = h("span.val", "–");
      const row = h("div.oy-bar" + (id === "siz" ? ".siz" : ""), { title: ACIKLAMA[id] || "" }, h("span", ADLAR[id]), h("span.tr", i), v);
      rows[id] = { row, i, v };
      bars.append(row);
    });
    sonuc.append(h("p.muted", "Her strateji herkesle (kendi kopyasıyla da) oynar. Puanlar: karşılıklı işbirliği 3, karşılıklı ihanet 1, tek taraflı ihanet 5, aldatılan 0."));
    function oyna() {
      const K = {};
      ids.forEach((id) => (K[id] = id === "siz" ? O().ozel(bit.ilk, bit.c, bit.d) : id));
      const s = O().turnuva(K, tur, { gurultu: gur, tohum: (Date.now() % 100000) + 1 });
      const max = Math.max(...Object.values(s.toplam));
      s.sira.forEach((id, i) => {
        const r = rows[id];
        bars.append(r.row); // sıraya diz
        r.i.style.width = "0%";
        setTimeout(() => { r.i.style.width = (s.toplam[id] / max) * 100 + "%"; r.v.textContent = s.toplam[id]; }, 60 + i * 70);
        r.row.classList.toggle("ilk", i === 0);
      });
      const sizSira = s.sira.indexOf("siz") + 1;
      const ort = Math.round(s.toplam[s.sira[0]] / ids.length / tur * 100) / 100;
      sonuc.innerHTML = "";
      sonuc.append(h("p", h("b", `Birinci: ${ADLAR[s.sira[0]]}.`), ` Sizin stratejiniz ${ids.length} strateji arasında ${sizSira}. oldu. Birincinin maç başına tur ortalaması ${String(ort).replace(".", ",")} puan.`));
      sonuc.append(h("p.muted", gur > 0 ? "Gürültü varken yanlış anlaşılan bir hamle, katı misilleme yapanları uzun intikam döngülerine sokabilir." : "Gürültüyü artırıp yeniden oynatın: affedici stratejilere ne oluyor?"));
    }
    return {};
  };

  /* --- Ortak mallar: otlak --- */
  D.otlak = function (stage) {
    stage.classList.add("otlak");
    const cv = h("canvas", { "aria-label": "Ortak otlak" });
    const fill = h("div.fill", cv);
    let kural = "serbest", model, bekleyen = 0, oto = 0, st;
    const durum = h("p.ot-durum", { "aria-live": "polite" });
    const seg = L.seg([["serbest", "Serbest"], ["kota", "Merkezî kota"], ["ostrom", "Ostrom kuralları"]], kural, (v) => { kural = v; kur(); });
    const ekle = h("button.btn", { type: "button", onclick: () => { bekleyen = clamp(bekleyen + 1, -1, 1); yaz(); } }, "İnek ekle");
    const cikar = h("button.btn", { type: "button", onclick: () => { bekleyen = clamp(bekleyen - 1, -1, 1); yaz(); } }, "İnek çıkar");
    const ilerle = h("button.btn.primary", { type: "button", onclick: () => sezon() }, "Sezonu ilerlet");
    const yirmi = h("button.btn", { type: "button", onclick: () => otomatik(20) }, "20 sezon oynat");
    const sifir = h("button.btn.ghost", { type: "button", onclick: () => kur() }, "Baştan");
    const alt = h("div.pad.scroll.ot-alt");
    stage.append(fill, h("div.controls", seg, h("span.spacer"), sifir), h("div.controls.ot-c2", ekle, cikar, ilerle, yirmi), h("div.pad.ot-durum-k", durum), alt);
    Oy.secim(alt, {
      anahtar: "s-ortak-mallar.cozum", soru: "Ortak bir kaynağı en iyi ne korur?",
      secenekler: [
        { v: "devlet", ad: "Dışarıdan bir otorite", ilke: "Kişisel çıkar ortak kaynağı tüketir; ancak bağlayıcı ve dışarıdan uygulanan kurallar durdurabilir.", filozof: ["hobbes", "hardin"],
          itiraz: "Uzaktaki bir otorite yerel koşulları bilmeyebilir; Ostrom, devletleştirilen birçok ormanın ve balıkçılığın daha kötü yönetildiğini belgeledi." },
        { v: "mulk", ad: "Bölüp özel mülk yapmak", ilke: "Herkes kendi payının sahibi olursa, aşırı kullanımın bedelini de kendisi öder.", filozof: ["locke"],
          itiraz: "Balık, su ve hava gibi pek çok kaynak bölünemez; bölünse bile kenarda kalanlar dışlanabilir." },
        { v: "topluluk", ad: "Topluluğun kendi kuralları", ilke: "Kaynağı kullananlar kuralları birlikte koyar, birbirini gözetir ve kademeli yaptırım uygular.", filozof: ["ostrom"],
          itiraz: "Bu çözüm küçük, istikrarlı ve birbirini tanıyan topluluklarda işler; küresel kaynaklarda (atmosfer gibi) uygulamak çok daha zordur." },
      ],
    });
    function kur() {
      cancelAnimationFrame(oto);
      model = O().otlak({ kural, tohum: (Date.now() % 9999) + 1 });
      bekleyen = 0; yaz(); draw();
    }
    function sezon() {
      model.sezon(bekleyen);
      const yak = model.st.son.yakalandi.includes(0);
      bekleyen = 0; yaz(yak); draw();
    }
    function otomatik(n) {
      cancelAnimationFrame(oto);
      let i = 0, son = 0;
      (function tick(t) {
        if (t - son > 140) { son = t; sezon(); i++; }
        if (i < n) oto = requestAnimationFrame(tick);
      })(0);
    }
    function yaz(yakalandi) {
      const s = model.st;
      const digerOrt = s.gelir.slice(1).reduce((a, b) => a + b, 0) / (s.gelir.length - 1);
      const msg = [`Sezon ${s.sezon} · Ot %${Math.round((s.ot / s.K) * 100)} · Sizin ineğiniz ${s.inek[0]}${bekleyen ? ` (${bekleyen > 0 ? "+1" : "−1"} bekliyor)` : ""} · Toplam inek ${s.inek.reduce((a, b) => a + b, 0)}`];
      msg.push(`Sizin geliriniz ${Math.round(s.gelir[0])}, diğer çobanların ortalaması ${Math.round(digerOrt)}.`);
      if (kural === "kota") msg.push(`Kota: çoban başına en çok ${s.kota} inek.`);
      if (kural === "ostrom") msg.push(yakalandi ? "Komşularınız fazladan ineğinizi gördü: topluluğun yaptırımıyla sınırın altına indiniz." : `Topluluk sınırı: çoban başına ${s.kota} inek. Aşanlar büyük olasılıkla fark edilir.`);
      if (s.ot / s.K < 0.08 && s.sezon > 3) msg.push("Otlak çöktü: inekler aç, kimse kazanamıyor.");
      durum.innerHTML = msg.join("<br>");
    }
    const r = L.rng(11);
    const doku = Array.from({ length: 400 }, () => r());
    function draw() {
      if (!st || !model) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const s = model.st, oran = s.ot / s.K;
      const gH = Math.max(40, H * 0.22);
      const ph = H - gH - 14;
      // otlak: ot yoğunluğu karolarla
      const nx = 20, ny = 10, cw = w / nx, chh = ph / ny;
      for (let y = 0; y < ny; y++) for (let x = 0; x < nx; x++) {
        const v = clamp(oran * 1.15 - doku[y * nx + x] * 0.35, 0, 1);
        // kuru topraktan (kahve) adaçayı yeşiline
        ctx.fillStyle = `rgba(${Math.round(92 - 12 * v)},${Math.round(72 + 62 * v)},${Math.round(48 + 18 * v)},${0.35 + 0.35 * v})`;
        ctx.fillRect(x * cw + 0.5, y * chh + 0.5, cw - 1, chh - 1);
      }
      // inekler: çoban başına bir sıra
      const n = s.inek.length;
      s.inek.forEach((c, i) => {
        const y = ((i + 0.5) / n) * ph;
        for (let k = 0; k < c; k++) {
          const x = 20 + k * 22 + (doku[(i * 31 + k) % 400] - 0.5) * 6;
          if (x > w - 12) break;
          ctx.fillStyle = i === 0 ? "#E2C27E" : rgba(C.ink, 0.8);
          ctx.beginPath(); ctx.ellipse(x, y, 8, 5, 0, 0, 7); ctx.fill();
          ctx.beginPath(); ctx.arc(x + 8, y - 2, 3, 0, 7); ctx.fill();
        }
        ctx.font = `600 11px ${FONT.ui}`; ctx.fillStyle = i === 0 ? "#E2C27E" : C.muted; ctx.textAlign = "right";
        ctx.fillText(i === 0 ? "siz" : `${i + 1}`, w - 6, y + 4); ctx.textAlign = "left";
      });
      // ot grafiği
      const g0 = ph + 14;
      ctx.strokeStyle = rgba(C.brass, 0.4); ctx.strokeRect(0.5, g0 + 0.5, w - 1, gH - 1);
      ctx.font = `500 11px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.fillText("ot miktarı (sezonlar)", 8, g0 + 14);
      const gc = s.gecmis.slice(-60);
      ctx.strokeStyle = "#9CCB72"; ctx.lineWidth = 1.8; ctx.beginPath();
      gc.forEach((p, i) => { const x = 4 + (i / 59) * (w - 8), y = g0 + gH - 4 - (p.ot / s.K) * (gH - 20); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.stroke(); ctx.lineWidth = 1;
    }
    st = L.canvas(cv, draw);
    kur();
    return { enter: draw, leave: () => cancelAnimationFrame(oto) };
  };
})();
