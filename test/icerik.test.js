/* Diyalog ağaçları, tutarlılık ve yakınlık tabloları denetimi. Çalıştırma: node test/icerik.test.js */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = { window: {} }; ctx.window.window = ctx.window;
vm.createContext(ctx.window);
const run = (f) => vm.runInContext(fs.readFileSync(path.join(__dirname, "..", f), "utf8"), ctx.window);
["js/data/filozoflar.js", "js/data/sozluk.js", "js/data/diyaloglar.js", "js/data/tutarlilik.js"].forEach(run);
fs.readdirSync(path.join(__dirname, "../js/data/parca")).forEach((f) => run("js/data/parca/" + f));
const W = ctx.window, F = W.FELSEFE;
let hata = 0; const err = (m) => { hata++; console.log("HATA ", m); };
for (const [id, A] of Object.entries(W.DIYALOGLAR)) {
  const D = A.dugumler;
  if (!D[A.baslangic]) err(`${id}: başlangıç yok`);
  for (const [n, d] of Object.entries(D)) {
    if (!A.konusmacilar[d.kim] && d.kim !== "sen") err(`${id}.${n}: konuşmacı ${d.kim} yok`);
    if (!d.son && !(d.secenekler || []).length) err(`${id}.${n}: son değil ama seçenek yok`);
    (d.secenekler || []).forEach((s) => { if (!D[s.sonraki]) err(`${id}.${n}: '${s.sonraki}' düğümü yok`); });
  }
  // her düğüm erişilebilir ve her yoldan bir sona varılabilir
  const seen = new Set(), st = [A.baslangic];
  while (st.length) { const n = st.pop(); if (seen.has(n) || !D[n]) continue; seen.add(n); (D[n].secenekler || []).forEach((s) => st.push(s.sonraki)); }
  Object.keys(D).forEach((n) => { if (!seen.has(n)) err(`${id}.${n}: erişilemiyor`); });
  if (![...seen].some((n) => D[n].son)) err(`${id}: sona ulaşılamıyor`);
}
for (const [k, tab] of Object.entries(W.YAKINLIK)) for (const [v, m] of Object.entries(tab)) for (const fid of Object.keys(m)) if (!F.byId[fid]) err(`YAKINLIK ${k}.${v}: filozof '${fid}' yok`);
W.TUTARLILIK.forEach((r, i) => { if (!r.kosul || !r.kosul.length || !r.mesaj) err(`TUTARLILIK #${i} eksik`); });
const keys = new Set(W.SOZLUK.flatMap((t) => t.k));
W.SOZLUK.forEach((t) => { if (!t.t || !t.d || !t.k.length) err(`SOZLUK eksik: ${JSON.stringify(t).slice(0, 60)}`); });
const dup = {}; W.SOZLUK.forEach((t) => t.k.forEach((k) => (dup[k] = (dup[k] || 0) + 1)));
Object.entries(dup).filter(([, n]) => n > 1).forEach(([k]) => console.log("uyarı  sözlükte tekrar eden kök:", k));
console.log(`${Object.keys(W.DIYALOGLAR).length} diyalog, ${W.TUTARLILIK.length} tutarlılık kuralı, ${Object.keys(W.YAKINLIK).length} yakınlık anahtarı, ${W.SOZLUK.length} sözlük terimi (${keys.size} kök)`);
console.log(hata ? `${hata} hata` : "Tamam");
process.exit(hata ? 1 : 0);
