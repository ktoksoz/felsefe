/* Etki ağı: filozoflar arası etki çizgileri. Yatay eksen zaman (sıkıştırılmış), dikey eksen gelenek.
   Bir filozofa tıklayınca etkilendikleri ve etkiledikleri vurgulanır.
   Kullanım: EtkiAgi(kap, { filozoflar: [...id], zincir: ["aristoteles","farabi",...], akis: true }) */
(function () {
  const { h } = L;
  const F = window.FELSEFE, S = window.STR;
  const NS = "http://www.w3.org/2000/svg";
  const sv = (tag, attrs, ...kids) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); kids.forEach((k) => k && e.append(k)); return e; };

  window.EtkiAgi = function (parent, opt = {}) {
    const o = Object.assign({ filozoflar: F.FILOZOFLAR.map((f) => f.id), zincir: null, seritler: null }, opt);
    const ids = new Set(o.filozoflar);
    const list = o.filozoflar.map((id) => F.byId[id]).filter(Boolean);
    const lanes = o.seritler || F.GELENEK_SIRA.filter((g) => list.some((f) => f.gelenek === g));
    const wrap = h("div.ag");
    const svg = sv("svg", { class: "ag-svg", role: "img", "aria-label": "Etki ağı" });
    const info = h("div.ag-info", { "aria-live": "polite" });
    wrap.append(h("div.fill", svg), info);
    parent.append(wrap);

    // zaman ekseni: kayıtların doğum yıllarına göre parça parça doğrusal (boş yüzyıllar sıkışır)
    const years = [...new Set(list.map((f) => f.dogum))].sort((a, b) => a - b);
    function xOf(y, W, x0) {
      // her benzersiz yıl eşit aralıklı değil: gerçek fark ile sıra farkının karışımı
      const n = years.length;
      const i = years.findIndex((v) => v >= y);
      const lin = (y - years[0]) / (years[n - 1] - years[0] || 1);
      const rank = n > 1 ? i / (n - 1) : 0.5;
      return x0 + (0.35 * lin + 0.65 * rank) * W;
    }

    let W = 0, H = 0, pos = {}, secili = null;
    const gEdges = sv("g", { class: "ag-edges" }), gNodes = sv("g", { class: "ag-nodes" }), gLanes = sv("g", { class: "ag-lanes" }), gFlow = sv("g");
    svg.append(gLanes, gEdges, gFlow, gNodes);

    function layout() {
      const r = svg.getBoundingClientRect();
      if (!r.width) return false;
      W = r.width; H = r.height;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      const lh = (H - 20) / lanes.length;
      const padL = W < 520 ? 24 : 40, padR = W < 520 ? 70 : 110;
      // aynı şeritte yakın düşenleri dikeyde kaydır
      const placed = {};
      list.slice().sort((a, b) => a.dogum - b.dogum).forEach((f) => {
        const li = lanes.indexOf(f.gelenek);
        const x = xOf(f.dogum, W - padL - padR, padL);
        const near = (placed[li] || []).filter((p) => Math.abs(p - x) < (W < 520 ? 90 : 120)).length;
        const y = 10 + li * lh + lh / 2 + (near % 2 ? 1 : -1) * Math.ceil(near / 2) * Math.min(17, lh / 3.4);
        (placed[li] = placed[li] || []).push(x);
        pos[f.id] = [x, y];
      });
      gLanes.innerHTML = "";
      lanes.forEach((g, li) => {
        const G = F.GELENEKLER[g];
        gLanes.append(sv("line", { x1: 0, x2: W, y1: 10 + li * lh, y2: 10 + li * lh, class: "ag-lane" }));
        const t = sv("text", { x: 6, y: 10 + li * lh + 14, fill: G.renk, class: "ag-lane-ad" }); t.textContent = G.kisa;
        gLanes.append(t);
      });
      return true;
    }

    function render() {
      if (!layout()) return;
      gEdges.innerHTML = ""; gNodes.innerHTML = "";
      list.forEach((f) => f.etkilendi.forEach((e) => {
        if (!ids.has(e)) return;
        const [x0, y0] = pos[e], [x1, y1] = pos[f.id];
        const mx = (x0 + x1) / 2;
        const p = sv("path", { d: `M${x0},${y0} C${mx},${y0} ${mx},${y1} ${x1},${y1}`, class: "ag-e", "data-a": e, "data-b": f.id, stroke: L.gc(F.byId[e].gelenek) });
        gEdges.append(p);
      }));
      list.forEach((f) => {
        const [x, y] = pos[f.id];
        const g = sv("g", { class: "ag-n", "data-id": f.id, tabindex: 0, role: "button", "aria-label": f.ad, transform: `translate(${x},${y})`, style: `--gel:${L.gc(f.gelenek)}` });
        g.append(sv("circle", { r: 6.5 }));
        const t = sv("text", { x: 10, y: 4 }); t.textContent = f.ad.replace(/\s*\(.*\)/, "").replace(/^(Sinoplu|Kıbrıslı|Elealı) /, "");
        g.append(t);
        g.addEventListener("click", () => sec(secili === f.id ? null : f.id));
        g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sec(secili === f.id ? null : f.id); } });
        gNodes.append(g);
      });
      if (o.zincir) zincirCiz();
      sec(secili);
    }

    function sec(id) {
      secili = id;
      wrap.classList.toggle("secimli", !!id);
      const f = id && F.byId[id];
      const ilgili = new Set(f ? [id, ...f.etkilendi, ...f.etkiledi] : []);
      gNodes.querySelectorAll(".ag-n").forEach((n) => { n.classList.toggle("on", n.dataset.id === id); n.classList.toggle("rel", ilgili.has(n.dataset.id)); });
      gEdges.querySelectorAll(".ag-e").forEach((p) => {
        p.classList.toggle("in", p.dataset.b === id);
        p.classList.toggle("out", p.dataset.a === id);
      });
      info.innerHTML = "";
      info.classList.toggle("open", !!f);
      if (!f) return;
      const chips = (arr) => arr.length ? arr.map((x) => { const c = Oy.fChip(x); c.addEventListener("click", (e) => { if (ids.has(x)) { e.preventDefault(); sec(x); } }); return c; }) : [h("span.muted", "—")];
      info.append(h("h4", { style: { color: L.gc(f.gelenek) } }, f.ad.replace(/\s*\(.*\)/, "")), h("p", f.fikir),
        h("p.ag-l", h("span.ip-et", S.etkilendi), ...chips(f.etkilendi)),
        h("p.ag-l", h("span.ip-et", S.etkiledi), ...chips(f.etkiledi)));
      o.onSec && o.onSec(f);
    }

    // zincir: bilgi akışını gösteren ışık noktaları
    let flowRaf = 0;
    function zincirCiz() {
      gFlow.innerHTML = "";
      const z = o.zincir.filter((id) => pos[id]);
      for (let i = 1; i < z.length; i++) {
        const [x0, y0] = pos[z[i - 1]], [x1, y1] = pos[z[i]];
        const mx = (x0 + x1) / 2;
        gFlow.append(sv("path", { d: `M${x0},${y0} C${mx},${y0} ${mx},${y1} ${x1},${y1}`, class: "ag-zincir" }));
      }
    }
    function akis() {
      cancelAnimationFrame(flowRaf);
      const paths = [...gFlow.querySelectorAll(".ag-zincir")];
      if (!paths.length) return;
      gFlow.querySelectorAll("circle").forEach((c) => c.remove());
      const dot = sv("circle", { r: 5, class: "ag-isik" });
      gFlow.append(dot);
      const s0 = performance.now(), per = 1400;
      (function tick(t) {
        const k = (t - s0) / per, i = Math.floor(k);
        if (i >= paths.length) { dot.remove(); paths.forEach((p) => p.classList.add("lit")); return; }
        const p = paths[i], len = p.getTotalLength(), pt = p.getPointAtLength(len * L.ease(k - i));
        dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
        paths.forEach((pp, j) => pp.classList.toggle("lit", j < i));
        flowRaf = requestAnimationFrame(tick);
      })(s0);
    }

    new ResizeObserver(() => render()).observe(svg);
    return { el: wrap, sec, akis, enter() { render(); }, leave() { cancelAnimationFrame(flowRaf); } };
  };
})();
