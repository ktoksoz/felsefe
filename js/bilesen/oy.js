/* Oylama, ilke paneli ve tutarlılık sayacı.
   Cevaplar yalnızca bu cihazda (localStorage, yoksa bellekte) saklanır; hiçbir yere gönderilmez.
   Kurallar js/data/tutarlilik.js içinde (window.TUTARLILIK, window.YAKINLIK). */
(function () {
  const { h, store } = L;
  const S = window.STR, F = window.FELSEFE;
  let cevap = store.get("cevaplar", {});
  const dinleyici = [];

  const Oy = {
    get: (k) => cevap[k],
    all: () => ({ ...cevap }),
    set(k, v) {
      cevap[k] = v;
      store.set("cevaplar", cevap);
      dinleyici.forEach((fn) => fn(k, v));
    },
    sil() { cevap = {}; store.del("cevaplar"); dinleyici.forEach((fn) => fn(null)); },
    on(fn) { dinleyici.push(fn); },
    // az önce verilen cevapla çelişen ya da onu destekleyen önceki cevaplar
    tutarlilik(k) {
      const out = [];
      (window.TUTARLILIK || []).forEach((r) => {
        if (!r.kosul.some(([kk]) => kk === k)) return;
        if (r.kosul.every(([kk, vv]) => (Array.isArray(vv) ? vv.includes(cevap[kk]) : cevap[kk] === vv))) out.push(r);
      });
      return out;
    },
    // cevaplara göre filozof yakınlık puanları
    yakinlik() {
      const p = {};
      Object.entries(window.YAKINLIK || {}).forEach(([k, tablo]) => {
        const v = cevap[k];
        if (v == null || !tablo[v]) return;
        Object.entries(tablo[v]).forEach(([fid, w]) => (p[fid] = (p[fid] || 0) + w));
      });
      return p;
    },
    sayi: () => Object.keys(cevap).length,
  };
  window.Oy = Oy;

  const kisa = (id) => (F.byId[id] ? F.byId[id].ad.replace(/\s*\(.*\)/, "") : id);
  function fChip(id) {
    const f = F.byId[id];
    if (!f) return h("span", id);
    const el = document.getElementById(f.slayt);
    const attrs = { "data-balon": id, style: { "--gel": L.gc(f.gelenek) } };
    return el ? h("a.f-chip", { href: "#" + f.slayt, ...attrs }, kisa(id)) : h("span.f-chip", { tabindex: 0, ...attrs }, kisa(id));
  }
  Oy.fChip = fChip;

  /* İlke paneli: seçimin dayandığı ilke, aynı fikirdeki filozof(lar), karşı argüman */
  function ilkePanel(sec) {
    const box = h("div.ilke-panel");
    if (sec.ilke) box.append(h("p.ip-ilke", h("span.ip-et", S.ilke), sec.ilke));
    if (sec.filozof && sec.filozof.length)
      box.append(h("p.ip-f", h("span.ip-et", S.ayniFikirde), ...[].concat(sec.filozof).map(fChip)));
    if (sec.lehte) box.append(h("p.arg.lehte", h("span.ip-et", S.lehte), sec.lehte));
    if (sec.itiraz) box.append(h("p.arg.aleyhte", h("span.ip-et", S.itiraz), sec.itiraz));
    return box;
  }
  Oy.ilkePanel = ilkePanel;

  function tutarlilikNotu(k) {
    const rs = Oy.tutarlilik(k);
    if (!rs.length) return null;
    return h("div.tutarlilik", h("span.ip-et", S.tutarlilik), ...rs.map((r) => h("p", r.mesaj)));
  }
  Oy.tutarlilikNotu = tutarlilikNotu;

  /* Seçim bileşeni: soru + seçenek düğmeleri → ilke paneli + tutarlılık notu.
     secenekler: [{ v, ad, ilke, filozof: [id], lehte, itiraz }] */
  Oy.secim = function (parent, { anahtar, soru, secenekler, sonra }) {
    const wrap = h("div.secim");
    if (soru) wrap.append(h("p.secim-soru", soru));
    const row = h("div.secim-row");
    const out = h("div.secim-out", { "aria-live": "polite" });
    const btns = secenekler.map((s) => {
      const b = h("button.btn.sec", { type: "button", "data-v": s.v }, s.ad);
      b.addEventListener("click", () => sec(s.v, true));
      row.append(b);
      return b;
    });
    function sec(v, kayit) {
      const s = secenekler.find((x) => x.v === v);
      if (!s) return;
      btns.forEach((b) => b.classList.toggle("on", b.dataset.v === v));
      if (kayit && anahtar) Oy.set(anahtar, v);
      out.innerHTML = "";
      out.append(ilkePanel(s));
      const t = anahtar && tutarlilikNotu(anahtar);
      if (t) out.append(t);
      sonra && sonra(v, s);
    }
    wrap.append(row, out);
    parent.append(wrap);
    // önceki cevap varsa göster (kayıt etmeden)
    if (anahtar && Oy.get(anahtar) != null) sec(Oy.get(anahtar), false);
    wrap.sec = (v) => sec(v, true);
    wrap.temizle = () => { btns.forEach((b) => b.classList.remove("on")); out.innerHTML = ""; };
    return wrap;
  };
})();
