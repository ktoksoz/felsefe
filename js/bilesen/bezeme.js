/* Metin sütunu bezemeleri (veriden üretilir):
   - Medalyon(f): filozof için gelenek renginde monogram madalyonu (sahte portre yerine)
   - <div class="kisiler" data-f="thales,anaksimandros">: madalyon şeridi
   - <ul class="kim"><li data-f="locke">…</li></ul>: "Kim ne dedi?" şeridi (gelenek rengi + zaman yolculuğu bağlantısı)
   - <p class="soru-bag" data-soru="ben">…</p>: zaman yolculuğundan büyük soruya bağlantı */
(function () {
  const { h } = L;
  const F = window.FELSEFE, S = window.STR;
  const NS = "http://www.w3.org/2000/svg";
  const sv = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  // Usturlap halkası gibi çentikli, ince çizgili madalyon
  function Medalyon(f, size = 56) {
    const c = L.gc(f.gelenek);
    const svg = sv("svg", { viewBox: "0 0 100 100", width: size, height: size, class: "medalyon", "aria-hidden": "true" });
    svg.append(sv("circle", { cx: 50, cy: 50, r: 47, fill: "none", stroke: c, "stroke-width": 1.6 }));
    svg.append(sv("circle", { cx: 50, cy: 50, r: 40, fill: "rgba(14,24,48,.9)", stroke: c, "stroke-opacity": 0.45, "stroke-width": 0.8 }));
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2, r0 = i % 3 ? 43.5 : 42, r1 = 46;
      svg.append(sv("line", { x1: 50 + Math.cos(a) * r0, y1: 50 + Math.sin(a) * r0, x2: 50 + Math.cos(a) * r1, y2: 50 + Math.sin(a) * r1, stroke: c, "stroke-opacity": 0.55, "stroke-width": 0.7 }));
    }
    const m = f.mono || f.ad[0];
    const font = L.scriptFont(m);
    const ar = font === L.FONT.ar;
    const long = m.length > 3;
    const t = sv("text", { x: 50, y: ar ? 56 : long ? 56 : 51, "text-anchor": "middle", "dominant-baseline": "middle", fill: c,
      "font-size": ar ? Math.min(34, Math.max(19, 120 / m.length)) : long ? Math.max(13, 64 / m.length) : m.length === 3 ? 24 : 30, "font-family": font.replace(/"/g, "'") });
    if (font === L.FONT.ar) t.setAttribute("direction", "rtl");
    t.textContent = m;
    svg.append(t);
    return svg;
  }
  window.Medalyon = Medalyon;

  const kisa = (f) => f.ad.replace(/\s*\(.*\)/, "");

  document.querySelectorAll(".kisiler[data-f]").forEach((el) => {
    el.dataset.f.split(",").map((s) => s.trim()).forEach((id) => {
      const f = F.byId[id];
      if (!f) { console.warn("Filozof yok:", id); return; }
      el.append(h("button.kisi-m", { type: "button", "data-balon": id, style: { "--gel": L.gc(f.gelenek) } },
        Medalyon(f, 46), h("span.km-ad", kisa(f)), h("span.km-yil", F.aralik(f))));
    });
  });

  document.querySelectorAll("ul.kim").forEach((ul) => {
    ul.before(h("h3.kim-baslik", S.kimNeDedi));
    ul.querySelectorAll("li[data-f]").forEach((li) => {
      const f = F.byId[li.dataset.f];
      if (!f) { console.warn("Filozof yok:", li.dataset.f); return; }
      li.style.setProperty("--gel", L.gc(f.gelenek));
      const sl = li.dataset.slayt || f.slayt;
      const ad = document.getElementById(sl) && !li.closest("#" + sl)
        ? h("a.kim-ad", { href: "#" + sl, "data-balon": f.id }, kisa(f))
        : h("span.kim-ad", { "data-balon": f.id, tabindex: 0 }, kisa(f));
      li.prepend(ad, h("span.kim-gel", F.GELENEKLER[f.gelenek].kisa));
    });
  });

  document.querySelectorAll(".soru-bag[data-soru]").forEach((p) => {
    const q = F.SORULAR[p.dataset.soru];
    const sl = p.dataset.slayt || q.slayt;
    const txt = p.textContent.trim();
    p.innerHTML = "";
    p.append(h("a", { href: "#" + sl }, h("span.sb-etiket", S.buyukSoru), h("b", q.ad), txt ? h("span.sb-not", txt) : ""));
  });
})();
