/* Zaman çizelgesi: yakınlaştırılabilir, kaydırılabilir; her gelenek ayrı bir şerit (friz).
   Uzaktan bakınca dönem adları, yaklaşınca filozof adları görünür. Yıl çizgisi sürüklenince
   o yıl yaşayanlar vurgulanır ("Sokrates ölürken kimler yaşıyordu?").
   Kullanım: Zaman(kap, { aralik: [-800, 2026], yil: -399, vurgu: ["sokrates"], etkiler: true, kapak: false }) */
(function () {
  const { h, C, FONT, rgba, clamp } = L;
  const S = window.STR, F = window.FELSEFE;
  const MIN = -850, MAX = 2030;

  function yilYaz(y, mo) {
    y = Math.round(y);
    if (y < 0) return `MÖ ${-y}`;
    if (y === 0) return "MÖ/MS";
    return mo && y < 1000 ? `MS ${y}` : String(y);
  }

  window.Zaman = function (parent, opt = {}) {
    const o = Object.assign({ aralik: [MIN, MAX], seritler: F.GELENEK_SIRA, etkiler: false, kapak: false, yil: null, vurgu: [], kontroller: true }, opt);
    const wrap = h("div.zaman" + (o.kapak ? ".zaman-kapak" : ""));
    const cv = h("canvas", { "aria-label": "Zaman çizelgesi" });
    cv.style.touchAction = "none";
    const fill = h("div.fill", cv);
    wrap.append(fill);
    const panel = h("div.z-panel", { "aria-live": "polite" });
    if (!o.kapak) fill.append(panel);
    let ctl = null;
    if (o.kontroller && !o.kapak) {
      ctl = h("div.controls.z-ctl",
        h("button.btn.ghost", { type: "button", "aria-label": S.uzaklas, onclick: () => zoomBy(1.6) }, "−"),
        h("button.btn.ghost", { type: "button", "aria-label": S.yakinlas, onclick: () => zoomBy(1 / 1.6) }, "+"),
        h("button.btn.ghost", { type: "button", onclick: () => animTo(MIN, MAX) }, S.hepsi),
        h("span.spacer"),
        h("button.btn.ghost.z-yil-btn", { type: "button", onclick: () => setYil(yil == null ? (a + b) / 2 : null) }, S.yilCizgisi));
      wrap.append(ctl);
    }
    parent.append(wrap);

    const lanes = o.seritler;
    const kayit = F.FILOZOFLAR.filter((f) => lanes.includes(f.gelenek));
    let a = o.aralik[0], b = o.aralik[1];
    let yil = o.yil;
    let vurgu = new Set(o.vurgu);
    let hover = null, secili = null;
    let st;
    let t0 = performance.now(), reveal = o.kapak ? 0 : 1;
    const LBL = 132; // şerit adı sütunu (dar ekranda küçülür)

    // şerit içi satır yerleşimi (yıllara göre, açgözlü)
    const satir = {};
    lanes.forEach((g) => {
      const rows = [];
      kayit.filter((f) => f.gelenek === g).sort((p, q) => p.dogum - q.dogum).forEach((f) => {
        const son = f.olum == null ? 2026 : f.olum;
        let r = rows.findIndex((end) => end + 18 < f.dogum);
        if (r < 0) { r = rows.length; rows.push(son); } else rows[r] = son;
        satir[f.id] = r;
      });
      satir["_" + g] = Math.max(1, rows.length);
    });

    function geo() {
      const { w, h: H } = st;
      const lw = o.kapak ? (o.kapak === "mini" || w < 560 ? 0 : 170) : w < 560 ? 64 : LBL;
      const top = o.kapak ? 0 : 6, axis = o.kapak ? 0 : 26;
      const lh = (H - top - axis) / lanes.length;
      return { lw, top, axis, lh, W: w - lw, H };
    }
    // kapakta yoğun dönemleri açan, boş yüzyılları sıkıştıran parçalı ölçek; diğerlerinde doğrusal
    const KN = [[-700, 0], [-250, 0.3], [450, 0.43], [1100, 0.56], [1550, 0.68], [1880, 0.84], [2030, 1]];
    function frac(y) {
      if (!o.kapak) return (y - a) / (b - a);
      for (let i = 1; i < KN.length; i++) if (y <= KN[i][0] || i === KN.length - 1) {
        const [y0, f0] = KN[i - 1], [y1, f1] = KN[i];
        return f0 + ((y - y0) / (y1 - y0)) * (f1 - f0);
      }
    }
    const X = (y, g) => g.lw + frac(y) * g.W;
    const Yr = (x, g) => a + ((x - g.lw) / g.W) * (b - a);

    function barYer(f, g) {
      const li = lanes.indexOf(f.gelenek);
      const n = satir["_" + f.gelenek];
      const pad = Math.min(16, g.lh * 0.22);
      const y = g.top + li * g.lh + pad + ((satir[f.id] + 0.5) / n) * (g.lh - pad * 1.5);
      const x0 = X(f.dogum, g), x1 = X(f.olum == null ? 2026 : f.olum, g);
      return { x0, x1, y, li };
    }
    const yasiyor = (f, y) => f.dogum <= y && (f.olum == null ? 2026 : f.olum) >= y;

    function draw() {
      if (!st) return;
      const { ctx, w } = st;
      const g = geo();
      ctx.clearRect(0, 0, w, g.H);
      const span = b - a;
      const pxYear = g.W / span;
      const showNames = pxYear > 0.55 || o.kapak === "adlar";

      // şeritler
      lanes.forEach((gl, li) => {
        const G = F.GELENEKLER[gl];
        const y0 = g.top + li * g.lh;
        if (!o.kapak) { ctx.fillStyle = li % 2 ? "rgba(255,255,255,0.012)" : "rgba(255,255,255,0.028)"; ctx.fillRect(g.lw, y0, g.W, g.lh); }
        ctx.strokeStyle = rgba(C.brass, o.kapak ? 0.10 : 0.16);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(g.lw, y0 + 0.5); ctx.lineTo(w, y0 + 0.5); ctx.stroke();
        // dönem bantları: uzaktan bakınca adlarıyla
        G.donemler.forEach(([ad, d0, d1], di) => {
          const x0 = Math.max(g.lw, X(d0, g)), x1 = Math.min(w, X(d1, g));
          if (x1 <= x0) return;
          ctx.fillStyle = rgba(G.renk, o.kapak ? (di % 2 ? 0.0 : 0.035) : di % 2 ? 0.035 : 0.06);
          ctx.fillRect(x0, y0 + 1, x1 - x0, g.lh - 1);
          if (!showNames && !o.kapak && x1 - x0 > 60) {
            ctx.font = `italic 400 ${Math.min(14, g.lh * 0.28)}px ${FONT.body}`;
            ctx.fillStyle = rgba(G.renk, 0.75);
            ctx.textBaseline = "top";
            const tw = ctx.measureText(ad).width;
            if (tw < x1 - x0 - 10) ctx.fillText(ad, x0 + 6, y0 + 5);
          }
        });
        if (o.kapak && g.lw) {
          ctx.fillStyle = rgba(G.renk, 0.85 * reveal);
          ctx.font = `italic 400 14px ${FONT.body}`;
          ctx.textBaseline = "middle";
          ctx.fillText(G.ad, 4, y0 + g.lh / 2);
        }
        if (!o.kapak) {
          ctx.fillStyle = C.bg2;
          ctx.fillRect(0, y0, g.lw, g.lh);
          ctx.fillStyle = G.renk;
          ctx.font = `500 ${g.lw < 100 ? 11 : 13}px ${FONT.ui}`;
          ctx.textBaseline = "middle";
          const ad = g.lw < 100 ? G.kisa : G.ad;
          wrapText(ctx, ad, 10, y0 + g.lh / 2, g.lw - 16, g.lw < 100 ? 12 : 15);
        }
      });

      // yıl ekseni
      if (!o.kapak) {
        const steps = [10, 25, 50, 100, 200, 250, 500, 1000];
        const step = steps.find((s) => s * pxYear > 70) || 1000;
        ctx.font = `400 12px ${FONT.ui}`;
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        const mo = a < 0;
        for (let y = Math.ceil(a / step) * step; y <= b; y += step) {
          const x = X(y, g);
          if (x < g.lw + 8) continue;
          ctx.strokeStyle = rgba(C.brass, y === 0 ? 0.35 : 0.1);
          ctx.beginPath(); ctx.moveTo(x + 0.5, g.top); ctx.lineTo(x + 0.5, g.H - g.axis + 4); ctx.stroke();
          ctx.fillStyle = C.muted;
          ctx.fillText(yilYaz(y, mo), x, g.H - g.axis + 7);
        }
        ctx.textAlign = "left";
      }

      // etki çizgileri (kapakta yavaşça belirir)
      if (o.etkiler) {
        const now = (performance.now() - t0) / 1000;
        kayit.forEach((f, fi) => f.etkilendi.forEach((e, ei) => {
          const s = F.byId[e];
          if (!s || !lanes.includes(s.gelenek)) return;
          const p = barYer(s, g), q = barYer(f, g);
          const born = o.kapak ? clamp((now - 1.2 - ((fi * 7 + ei * 3) % 40) * 0.22) / 2.2, 0, 1) : 1;
          if (born <= 0) return;
          const on = secili && (secili === f.id || secili === e);
          const x0 = p.x0 + Math.min(30, (p.x1 - p.x0) * 0.5), x1 = q.x0;
          ctx.strokeStyle = on ? rgba(L.gc(s.gelenek), 0.9) : rgba(o.kapak ? L.gc(s.gelenek) : C.brass, (o.kapak ? 0.38 : secili ? 0.05 : 0.13) * born);
          ctx.lineWidth = on ? 1.6 : 1;
          ctx.beginPath();
          ctx.moveTo(x0, p.y);
          const mx = (x0 + x1) / 2;
          if (born < 1) {
            // çizgi ilerleyerek belirir
            const ex = x0 + (x1 - x0) * born, ey = p.y + (q.y - p.y) * born;
            ctx.quadraticCurveTo(mx, (p.y + q.y) / 2 - 20 * born, ex, ey);
          } else ctx.bezierCurveTo(mx, p.y, mx, q.y, x1, q.y);
          ctx.stroke();
        }));
      }

      // filozof çubukları
      const lastLabel = {};
      kayit.forEach((f) => {
        const { x0, x1, y } = barYer(f, g);
        if (x1 < g.lw - 40 || x0 > w + 40) return;
        const col = L.gc(f.gelenek);
        const dim = (yil != null && !yasiyor(f, yil)) || (vurgu.size && !vurgu.has(f.id) && yil == null);
        const hot = hover === f.id || secili === f.id || (yil != null && yasiyor(f, yil)) || vurgu.has(f.id);
        const al = o.kapak ? 0.75 * reveal : dim ? 0.22 : 1;
        ctx.globalAlpha = al;
        ctx.strokeStyle = col;
        ctx.lineCap = "round";
        ctx.lineWidth = hot ? 4 : f.tur === "metin" ? 2 : 2.6;
        if (f.tur === "metin") ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.moveTo(Math.max(x0, g.lw), y); ctx.lineTo(Math.max(x1, g.lw + 1), y); ctx.stroke();
        ctx.setLineDash([]);
        if (x0 >= g.lw) {
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(x0, y, hot ? 4.2 : 3, 0, 7); ctx.fill();
        }
        if ((showNames || hot) && !o.kapak) {
          const ad = f.ad.replace(/\s*\(.*\)/, "");
          ctx.font = `${hot ? 600 : 500} 12.5px ${FONT.ui}`;
          const tw = ctx.measureText(ad).width;
          const lx = Math.max(g.lw + 4, x0 - 2);
          const key = f.gelenek + satir[f.id];
          if (hot || !lastLabel[key] || lx > lastLabel[key]) {
            ctx.fillStyle = hot ? C.ink : rgba(C.ink, 0.82);
            ctx.textBaseline = "bottom";
            ctx.fillText(ad, lx, y - 4);
            lastLabel[key] = lx + tw + 8;
          }
        }
        ctx.globalAlpha = 1;
      });

      // yıl çizgisi
      if (yil != null && !o.kapak) {
        const x = X(yil, g);
        ctx.strokeStyle = C.brass; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x, g.top); ctx.lineTo(x, g.H - g.axis); ctx.stroke();
        ctx.fillStyle = C.brass;
        ctx.beginPath(); ctx.moveTo(x - 7, g.H - g.axis); ctx.lineTo(x + 7, g.H - g.axis); ctx.lineTo(x, g.H - g.axis - 9); ctx.fill();
        ctx.font = `600 13px ${FONT.ui}`; ctx.textBaseline = "top";
        const lab = yilYaz(yil, true);
        const tw = ctx.measureText(lab).width;
        const lx = clamp(x - tw / 2, g.lw + 2, w - tw - 4);
        ctx.fillStyle = C.bg2; ctx.fillRect(lx - 4, g.top + 2, tw + 8, 18);
        ctx.fillStyle = C.brass; ctx.fillText(lab, lx, g.top + 4);
      }
    }

    function wrapText(ctx, s, x, y, maxW, lh) {
      const words = s.split(" "), lines = [];
      let line = "";
      words.forEach((wd) => { const t = line ? line + " " + wd : wd; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = wd; } else line = t; });
      lines.push(line);
      lines.forEach((l, i) => ctx.fillText(l, x, y + (i - (lines.length - 1) / 2) * lh));
    }

    function panelYaz() {
      panel.innerHTML = "";
      if (yil == null) { panel.classList.remove("open"); return; }
      const ya = kayit.filter((f) => yasiyor(f, yil));
      panel.classList.add("open");
      panel.append(h("h4", S.kimlerYasiyordu(yilYaz(yil, true))));
      const ul = h("ul");
      lanes.forEach((gl) => ya.filter((f) => f.gelenek === gl).forEach((f) =>
        ul.append(h("li", { style: { "--gel": L.gc(f.gelenek) } }, h("span.z-k", { "data-balon": f.id, tabindex: 0 }, f.ad.replace(/\s*\(.*\)/, "")), h("small", F.GELENEKLER[gl].kisa)))));
      if (!ya.length) ul.append(h("li", "—"));
      panel.append(ul);
    }

    /* --- etkileşim --- */
    function hit(px, py) {
      const g = geo();
      let best = null, bd = 12;
      kayit.forEach((f) => {
        const { x0, x1, y } = barYer(f, g);
        const dx = px < x0 ? x0 - px : px > x1 ? px - x1 : 0;
        const d = Math.hypot(dx, py - y);
        if (d < bd) { bd = d; best = f; }
      });
      return best;
    }
    const ptrs = new Map();
    let drag = null, pinch = null, moved = false, yilSurukle = false;
    cv.addEventListener("pointerdown", (e) => {
      if (o.kapak) return;
      cv.setPointerCapture(e.pointerId);
      const r = cv.getBoundingClientRect();
      ptrs.set(e.pointerId, [e.clientX - r.left, e.clientY - r.top]);
      moved = false;
      const g = geo();
      const [px] = ptrs.get(e.pointerId);
      yilSurukle = yil != null && Math.abs(px - X(yil, g)) < 14;
      if (ptrs.size === 1) drag = { x: px, a, b };
      else if (ptrs.size === 2) {
        const [p, q] = [...ptrs.values()];
        pinch = { d: Math.abs(p[0] - q[0]) || 1, mid: Yr((p[0] + q[0]) / 2, g), a, b };
        drag = null;
      }
    });
    cv.addEventListener("pointermove", (e) => {
      if (o.kapak) return;
      const r = cv.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      const g = geo();
      if (!ptrs.has(e.pointerId)) {
        const f = hit(px, py);
        const id = f ? f.id : null;
        if (id !== hover) { hover = id; cv.style.cursor = id ? "pointer" : "grab"; draw(); }
        return;
      }
      ptrs.set(e.pointerId, [px, py]);
      if (pinch && ptrs.size === 2) {
        const [p, q] = [...ptrs.values()];
        const k = pinch.d / (Math.abs(p[0] - q[0]) || 1);
        setRange(pinch.mid - (pinch.mid - pinch.a) * k, pinch.mid + (pinch.b - pinch.mid) * k);
        moved = true;
      } else if (yilSurukle) {
        setYil(clamp(Yr(px, g), MIN, MAX)); moved = true;
      } else if (drag) {
        const dy = ((px - drag.x) / g.W) * (drag.b - drag.a);
        if (Math.abs(px - drag.x) > 3) moved = true;
        setRange(drag.a - dy, drag.b - dy);
      }
    });
    function up(e) {
      if (o.kapak) return;
      const had = ptrs.has(e.pointerId);
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch = null;
      if (!ptrs.size) drag = null;
      if (had && !moved && e.type === "pointerup") {
        const r = cv.getBoundingClientRect();
        const px = e.clientX - r.left, py = e.clientY - r.top;
        const f = hit(px, py);
        secili = f ? f.id : null;
        draw();
        if (f) balonAt(f, e.clientX, e.clientY);
        else if (py < geo().H - geo().axis && px > geo().lw) setYil(Yr(px, geo()));
        o.onSec && o.onSec(f);
      }
    }
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
    cv.addEventListener("pointerleave", () => { if (hover) { hover = null; draw(); } });
    cv.addEventListener("wheel", (e) => {
      if (o.kapak) return;
      e.preventDefault();
      const r = cv.getBoundingClientRect(), g = geo();
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { const d = (e.deltaX / g.W) * (b - a); setRange(a + d, b + d); return; }
      const m = Yr(e.clientX - r.left, g);
      const k = Math.exp(e.deltaY * 0.0015);
      setRange(m - (m - a) * k, m + (b - m) * k);
    }, { passive: false });

    // tıklanan çubuk için balon: görünmez bir çapa üzerinden
    const capa = h("span.z-capa", { "aria-hidden": "true" });
    document.body.append(capa);
    function balonAt(f, x, y) {
      Object.assign(capa.style, { left: x + "px", top: y - 6 + "px" });
      capa.dataset.balon = f.id; delete capa.dataset.ti;
      window.Balon && Balon.show(capa);
    }

    function setRange(na, nb) {
      let span = clamp(nb - na, 40, MAX - MIN);
      const mid = (na + nb) / 2;
      na = mid - span / 2; nb = mid + span / 2;
      if (na < MIN) { nb += MIN - na; na = MIN; }
      if (nb > MAX) { na -= nb - MAX; nb = MAX; }
      a = na; b = nb; draw();
    }
    function zoomBy(k) { const m = yil != null && yil > a && yil < b ? yil : (a + b) / 2; animTo(m - (m - a) * k, m + (b - m) * k); }
    let anim = 0;
    function animTo(na, nb, ms = 650) {
      cancelAnimationFrame(anim);
      const sa = a, sb = b, s0 = performance.now();
      (function tick(t) {
        const k = L.ease(Math.min(1, (t - s0) / ms));
        setRange(sa + (na - sa) * k, sb + (nb - sb) * k);
        if (k < 1) anim = requestAnimationFrame(tick);
      })(s0);
    }
    function setYil(y) {
      yil = y == null ? null : Math.round(y);
      if (ctl) ctl.querySelector(".z-yil-btn").classList.toggle("on", yil != null);
      draw(); panelYaz();
    }

    st = L.canvas(cv, draw);
    // kapak: yavaş açılış ve beliren etki çizgileri
    const lp = L.loop((dt) => {
      reveal = Math.min(1, reveal + dt * 0.6);
      draw();
      if (!o.kapak && reveal >= 1) lp.stop();
    });
    panelYaz();
    return {
      el: wrap,
      setAralik: (na, nb, an = true) => (an ? animTo(na, nb) : setRange(na, nb)),
      setYil,
      vurgula(ids) { vurgu = new Set(ids || []); draw(); },
      sec(id) { secili = id; draw(); },
      enter() { if (o.kapak) { t0 = performance.now(); reveal = 0; lp.start(); } else draw(); },
      leave() { lp.stop(); },
      draw,
    };
  };
  window.Zaman.yilYaz = yilYaz;
})();
