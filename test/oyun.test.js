/* Oyun teorisi birim testleri. Çalıştırma: node test/oyun.test.js */
const assert = require("assert");
const O = require("../js/mantik/oyun.js");
let n = 0;
const t = (ad, fn) => { fn(); n++; console.log("✓", ad); };

t("ödeme matrisi T=5 R=3 P=1 S=0", () => {
  assert.deepStrictEqual(O.puan("C", "C"), [3, 3]);
  assert.deepStrictEqual(O.puan("C", "D"), [0, 5]);
  assert.deepStrictEqual(O.puan("D", "C"), [5, 0]);
  assert.deepStrictEqual(O.puan("D", "D"), [1, 1]);
});
t("ilk turda kısasa kısas ile hep işbirliği: 3–3", () => {
  const m = O.mac("kisas", "hepIsbirligi", 1);
  assert.strictEqual(m.sa, 3); assert.strictEqual(m.sb, 3);
});
t("kısasa kısas ile hep işbirliği 10 turda sürekli işbirliği yapar: 30–30", () => {
  const m = O.mac("kisas", "hepIsbirligi", 10);
  assert.ok(m.A.every((x) => x === "C"));
  assert.strictEqual(m.sa, 30); assert.strictEqual(m.sb, 30);
});
t("kısasa kısas hep ihanete karşı ilk turdan sonra sürekli ihanet eder", () => {
  for (const k of [1, 2, 5, 10, 200]) {
    const m = O.mac("kisas", "hepIhanet", k);
    assert.strictEqual(m.A[0], "C");
    assert.ok(m.A.slice(1).every((x) => x === "D"));
    assert.strictEqual(m.sa, k - 1, `kısasa kısas ${k} tur`);
    assert.strictEqual(m.sb, 5 + (k - 1), `hep ihanet ${k} tur`);
  }
});
t("kısasa kısas kendisiyle hep işbirliği yapar", () => {
  const m = O.mac("kisas", "kisas", 20);
  assert.strictEqual(m.sa, 60);
});
t("kinci tek ihanetten sonra affetmez", () => {
  const birKez = (ben, o) => (ben.length === 2 ? "D" : "C");
  const m = O.mac("kinci", birKez, 6);
  assert.deepStrictEqual(m.A, ["C", "C", "C", "D", "D", "D"]);
});
t("affedici (kısasa iki kısas) tek ihaneti affeder", () => {
  const birKez = (ben, o) => (ben.length === 2 ? "D" : "C");
  const m = O.mac("affedici", birKez, 6);
  assert.ok(m.A.every((x) => x === "C"));
});
t("pavlov: kazanınca devam, kaybedince değiştir", () => {
  const m = O.mac("pavlov", "hepIhanet", 4);
  assert.deepStrictEqual(m.A, ["C", "D", "C", "D"]);
});
t("özel strateji (C,C,D) kısasa kısas ile aynı oynar", () => {
  const a = O.mac(O.ozel("C", "C", "D"), "rastgele", 50, { r: O.rng(9) });
  const b = O.mac("kisas", "rastgele", 50, { r: O.rng(9) });
  assert.deepStrictEqual(a.A, b.A);
});
t("turnuva toplamları: kısasa kısas, hep işbirliği, hep ihanet (10 tur, kendisiyle dahil)", () => {
  const s = O.turnuva({ kisas: "kisas", isb: "hepIsbirligi", ihanet: "hepIhanet" }, 10);
  // kısasa kısas: kendisiyle 30 + isb ile 30 + ihanet ile 9 = 69
  assert.strictEqual(s.toplam.kisas, 69);
  // hep işbirliği: kendisiyle 30 + kısasa ile 30 + ihanet ile 0 = 60
  assert.strictEqual(s.toplam.isb, 60);
  // hep ihanet: kendisiyle 10 + kısasa ile 14 + isb ile 50 = 74
  assert.strictEqual(s.toplam.ihanet, 74);
  assert.strictEqual(s.matris.kisas.ihanet, 9);
  assert.strictEqual(s.matris.ihanet.kisas, 14);
});
t("klasik karışık turnuvada kısasa kısas hep ihaneti geçer (200 tur)", () => {
  const s = O.turnuva({ kisas: "kisas", ihanet: "hepIhanet", isb: "hepIsbirligi", kinci: "kinci", affedici: "affedici", pavlov: "pavlov" }, 200);
  assert.ok(s.toplam.kisas > s.toplam.ihanet);
  assert.notStrictEqual(s.sira[0], "ihanet");
});
t("turnuva tohumla tekrar edilebilir", () => {
  const k = { a: "rastgele", b: "kisas", c: "pavlov" };
  assert.deepStrictEqual(O.turnuva(k, 50, { gurultu: 0.05, tohum: 4 }).toplam, O.turnuva(k, 50, { gurultu: 0.05, tohum: 4 }).toplam);
});
t("otlak: serbest kullanımda ot tükenir, kota ve Ostrom kurallarında sürer", () => {
  const son = (kural) => { const o = O.otlak({ kural, tohum: 3 }); for (let i = 0; i < 40; i++) o.sezon(0); return o.st; };
  assert.ok(son("serbest").ot < 15, "serbest: " + son("serbest").ot);
  assert.ok(son("kota").ot > 40, "kota: " + son("kota").ot);
  assert.ok(son("ostrom").ot > 30, "ostrom: " + son("ostrom").ot);
});
t("otlak: kota kuralında ziyaretçi sınırı aşamaz", () => {
  const o = O.otlak({ kural: "kota" });
  for (let i = 0; i < 5; i++) o.sezon(1);
  assert.ok(o.st.inek[0] <= o.st.kota);
});
console.log(`\n${n} test geçti`);
