/* İbn Haldun'un devlet döngüsü: çok basitleştirilmiş bir model (tarayıcıda ve Node'da çalışır).
   Mukaddime'deki fikir: devlet, dayanışması (asabiyye) güçlü bir topluluk tarafından kurulur;
   refah arttıkça lüks yayılır, lüks asabiyyeyi aşındırır, vergiler artar ve devlet,
   asabiyyesi daha güçlü bir topluluğa yenilir. İbn Haldun bunun çoğunlukla üç kuşak (~120 yıl) sürdüğünü yazar.
   Değişkenler 0–1 arasıdır; yıllık adımlarla hesaplanır. Katsayılar gösterim içindir, ölçülmüş değildir. */
(function () {
  const VARSAYILAN = {
    baslangic: 0.9, // kurucu topluluğun asabiyyesi
    asinma: 1,      // lüksün asabiyyeyi aşındırma hızı (çarpan)
    col: 0.6,       // çöldeki (bedevi) toplulukların dayanışması: rakibin gücü
    yil: 400,
  };

  function simule(p) {
    p = Object.assign({}, VARSAYILAN, p || {});
    let A = p.baslangic, R = 0.15, X = 0.05, T = 0.08; // asabiyye, refah, lüks, vergi oranı
    let rakip = 0.2, kurulus = 0;
    const seri = { A: [], R: [], T: [], gelir: [], rakip: [] };
    const hanedanlar = [{ bas: 0, son: null }];
    for (let y = 0; y < p.yil; y++) {
      // refah: güçlü dayanışma düzen ve güvenlik getirir; ağır vergi refahı düşürür
      R += 0.045 * A * (1 - R) - 0.06 * Math.max(0, T - 0.3) * R;
      // lüks refahı gecikmeli izler (yerleşik, hadarî hayat)
      X += 0.05 * (R - X);
      // lüks asabiyyeyi aşındırır
      A -= 0.0135 * p.asinma * X * A;
      // harcamalar büyüdükçe vergi oranı yükselir
      T = Math.min(0.9, 0.08 + 0.55 * X * (1 - A));
      // çöldeki rakip topluluk yavaş yavaş güçlenir
      rakip += 0.02 * (p.col - rakip);
      seri.A.push(A); seri.R.push(R); seri.T.push(T); seri.gelir.push(T * R * (1 - T)); seri.rakip.push(rakip);
      // devlet, dayanışması kendisininkinden güçlü bir rakibe yenilir
      if (A < rakip * 0.55 && y - kurulus > 10) {
        hanedanlar[hanedanlar.length - 1].son = y;
        hanedanlar.push({ bas: y + 1, son: null });
        kurulus = y + 1;
        A = Math.max(p.baslangic, rakip); // yeni kurucular çölden gelir
        R *= 0.55; X = 0.05; T = 0.08; rakip = 0.2;
      }
    }
    const biten = hanedanlar.filter((d) => d.son != null).map((d) => d.son - d.bas + 1);
    const ort = biten.length ? biten.reduce((a, b) => a + b, 0) / biten.length : null;
    return { seri, hanedanlar, ortalamaSure: ort, ortalamaKusak: ort == null ? null : ort / 40 };
  }

  const Haldun = { VARSAYILAN, simule };
  if (typeof module !== "undefined" && module.exports) module.exports = Haldun;
  else window.Haldun = Haldun;
})();
