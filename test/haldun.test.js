/* İbn Haldun döngüsü modelinin temel davranışları. Çalıştırma: node test/haldun.test.js */
const assert = require("assert");
const H = require("../js/mantik/haldun.js");
let n = 0;
const t = (ad, fn) => { fn(); n++; console.log("✓", ad); };

t("varsayılan ayarlarla bir hanedan yaklaşık üç kuşak (90–150 yıl) sürer", () => {
  const r = H.simule();
  assert.ok(r.ortalamaSure > 90 && r.ortalamaSure < 150, r.ortalamaSure);
  assert.ok(r.ortalamaKusak > 2.2 && r.ortalamaKusak < 3.8, r.ortalamaKusak);
});
t("lüks asabiyyeyi daha hızlı aşındırırsa hanedanlar kısalır", () => {
  assert.ok(H.simule({ asinma: 2 }).ortalamaSure < H.simule({ asinma: 1 }).ortalamaSure);
  assert.ok(H.simule({ asinma: 1 }).ortalamaSure < H.simule({ asinma: 0.5 }).ortalamaSure);
});
t("aşınma yoksa devlet 400 yılda çökmez", () => {
  const r = H.simule({ asinma: 0 });
  assert.strictEqual(r.hanedanlar.length, 1);
  assert.strictEqual(r.ortalamaSure, null);
});
t("çöldeki rakip güçlendikçe hanedanlar kısalır", () => {
  assert.ok(H.simule({ col: 0.9 }).ortalamaSure < H.simule({ col: 0.4 }).ortalamaSure);
});
t("bir hanedan içinde asabiyye hiç artmaz", () => {
  const r = H.simule();
  const d = r.hanedanlar[0];
  for (let y = d.bas + 1; y <= d.son; y++) assert.ok(r.seri.A[y] <= r.seri.A[y - 1] + 1e-12, y);
});
t("bütün değerler 0–1 arasında kalır", () => {
  for (const a of [0, 0.5, 1, 2]) for (const c of [0.3, 0.9]) {
    const r = H.simule({ asinma: a, col: c });
    for (const k of ["A", "R", "T"]) r.seri[k].forEach((v) => assert.ok(v >= 0 && v <= 1, `${k}=${v}`));
  }
});
t("model belirlenimcidir: aynı ayarlar aynı sonucu verir", () => {
  assert.deepStrictEqual(H.simule({ asinma: 1.3 }).hanedanlar, H.simule({ asinma: 1.3 }).hanedanlar);
});
console.log(`${n} test geçti`);
