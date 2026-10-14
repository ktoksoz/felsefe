/* Dallanan diyalog bileşeni. Ağaçlar js/data/diyaloglar.js içinde (window.DIYALOGLAR).
   Ağaç: { baslangic, konusmacilar: { k: { ad, f? } }, dugumler: { id: { kim, metin, secenekler?: [{ metin, sonraki, ilke? }], son?, ozet? } } } */
(function () {
  const { h } = L;
  const S = window.STR, F = window.FELSEFE;

  window.Diyalog = function (parent, agacId, { onEnd, onStep } = {}) {
    const A = window.DIYALOGLAR[agacId];
    if (!A) { console.warn("Diyalog yok:", agacId); return {}; }
    const log = h("div.dy-log", { "aria-live": "polite" });
    const choices = h("div.dy-choices");
    const reset = h("button.btn.ghost.dy-reset", { type: "button", onclick: () => start() }, S.sifirla);
    const wrap = h("div.diyalog", log, h("div.dy-foot", choices, reset));
    parent.append(wrap);
    let adim = 0;

    function konusmaci(k) {
      const K = A.konusmacilar[k] || { ad: k };
      const f = K.f && F.byId[K.f];
      return { ad: K.ad, f, renk: f ? L.gc(f.gelenek) : "var(--brass)", sen: k === "sen" };
    }
    function say(k, metin, extra) {
      const K = konusmaci(k);
      const b = h("div.dy-msg" + (K.sen ? ".sen" : ""), { style: { "--gel": K.renk } },
        K.f ? h("span.dy-av", { "data-balon": K.f.id }, Medalyon(K.f, 34)) : h("span.dy-av.sen-av", "?"),
        h("div.dy-body", h("b.dy-ad", K.ad), h("p", { html: metin }), extra || ""));
      log.append(b);
      requestAnimationFrame(() => (log.scrollTop = log.scrollHeight));
    }
    function node(id) {
      const n = A.dugumler[id];
      if (!n) { console.warn("Diyalog düğümü yok:", agacId, id); return; }
      say(n.kim, n.metin, n.son && n.ozet ? h("div.dy-ozet", { html: n.ozet }) : null);
      choices.innerHTML = "";
      onStep && onStep(id, n, ++adim);
      if (n.son) { onEnd && onEnd(id, n); return; }
      (n.secenekler || []).forEach((s) => {
        choices.append(h("button.btn.dy-sec", { type: "button", onclick: () => {
          choices.innerHTML = "";
          say("sen", s.metin, s.ilke ? h("span.dy-ilke", s.ilke) : null);
          setTimeout(() => node(s.sonraki), 420);
        } }, s.metin));
      });
    }
    function start() { log.innerHTML = ""; adim = 0; node(A.baslangic); }
    start();
    return { start, el: wrap };
  };
})();
