/* filozoflar.js veri denetimi. Çalıştırma: node test/veri.test.js */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["js/data/filozoflar.js", "js/data/harita.js"]) vm.runInContext(fs.readFileSync(path.join(__dirname, "..", f), "utf8"), ctx);
const { FILOZOFLAR, GELENEKLER, SORULAR, YERLER, byId } = ctx.window.FELSEFE;
const B = ctx.window.HARITA.sinir;
let hata = 0, uyari = 0;
const err = (m) => { hata++; console.log("HATA  ", m); };
const warn = (m) => { uyari++; console.log("uyarı ", m); };
const ZORUNLU = ["id", "ad", "ozgun", "dogum", "dogumYeri", "yerler", "gelenek", "etkilendi", "sorular", "fikir", "wiki", "slayt", "mono"];
const ids = new Set();
for (const f of FILOZOFLAR) {
  for (const k of ZORUNLU) if (f[k] == null || f[k] === "") err(`${f.id || "?"}: '${k}' boş`);
  if (ids.has(f.id)) err(`${f.id}: kimlik tekrarı`); ids.add(f.id);
  if (f.olum != null && !(f.dogum < f.olum)) err(`${f.id}: doğum (${f.dogum}) ölümden (${f.olum}) önce değil`);
  if (f.olum != null && f.olum - f.dogum > 110 && f.tur !== "metin") warn(`${f.id}: ömür ${f.olum - f.dogum} yıl`);
  if (!GELENEKLER[f.gelenek]) err(`${f.id}: bilinmeyen gelenek ${f.gelenek}`);
  for (const s of f.sorular) if (!SORULAR[s]) err(`${f.id}: bilinmeyen soru ${s}`);
  for (const y of [f.dogumYeri, ...f.yerler]) {
    const Y = YERLER[y];
    if (!Y) { err(`${f.id}: bilinmeyen yer ${y}`); continue; }
    if (!(Y.lat >= -90 && Y.lat <= 90 && Y.lon >= -180 && Y.lon <= 180)) err(`${y}: geçersiz koordinat`);
    const icinde = Y.lat >= B.s && Y.lat <= B.n && Y.lon >= B.w && Y.lon <= B.e;
    if (!icinde && !Y.disarida) err(`${y}: koordinat harita sınırları dışında (${Y.lat}, ${Y.lon})`);
    if (icinde && Y.disarida) err(`${y}: 'disarida' işaretli ama sınırlar içinde`);
    if (!Y.disarida && (f.gelenek === "yunan" || f.gelenek === "hint" || f.gelenek === "cin" || f.gelenek === "islam") && !icinde) err(`${f.id}: antik/klasik filozof harita dışında`);
  }
  for (const e of f.etkilendi) {
    const o = byId[e];
    if (!o) { err(`${f.id}: etkilendiği '${e}' yok`); continue; }
    if (e === f.id) err(`${f.id}: kendinden etkilenmiş`);
    if (!(f.dogum > o.dogum)) err(`${f.id} (${f.dogum}) etkilendiği ${e}'dan (${o.dogum}) sonra doğmamış`);
  }
}
for (const f of FILOZOFLAR) for (const e of f.etkiledi) if (!byId[e].etkilendi.includes(f.id)) err(`${f.id}: etkiledi/etkilendi tutarsız`);
// zincir: Aristoteles → Farabi → İbn Sina → İbn Rüşd → Aquinas
const zincir = ["aristoteles", "farabi", "ibn_sina", "ibn_rusd", "aquinas"];
for (let i = 1; i < zincir.length; i++) if (!byId[zincir[i]].etkilendi.includes(zincir[i - 1])) err(`zincir kopuk: ${zincir[i - 1]} → ${zincir[i]}`);
for (const [k, y] of Object.entries(YERLER)) if (!y.ad || !y.bugun) err(`${k}: yer adı eksik`);
const say = {}; FILOZOFLAR.forEach((f) => (say[f.gelenek] = (say[f.gelenek] || 0) + 1));
console.log(`\n${FILOZOFLAR.length} kayıt, ${Object.keys(YERLER).length} yer`, JSON.stringify(say));
console.log(hata ? `${hata} hata, ${uyari} uyarı` : `Tamam (${uyari} uyarı)`);
process.exit(hata ? 1 : 0);
