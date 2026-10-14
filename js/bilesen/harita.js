/* Harita: Akdeniz, Orta Doğu, Hindistan ve Çin. Kıyılar Natural Earth (kamu malı) verisinden,
   internetten yüklenmez (js/data/harita.js, js/data/harita-ege.js).
   Noktalar filozofların doğduğu ve yaşadığı yerler; antik adın yanında bugünkü adı.
   Kullanım: Harita(kap, { kutu: [batı, güney, doğu, kuzey], filozoflar: [...id], yerler: [...yerId], ege: true, rota: [...yerId] }) */
(function () {
  const { h, C, FONT, rgba, clamp } = L;
  const F = window.FELSEFE, S = window.STR;

  window.Harita = function (parent, opt = {}) {
    const o = Object.assign({ kutu: [-10, 8, 125, 52], filozoflar: null, yerler: null, ege: false, rota: null, etiket: "hepsi", nehirler: true }, opt);
    const wrap = h("div.harita");
    const cv = h("canvas", { "aria-label": "Harita" });
    cv.style.touchAction = "none";
    const fill = h("div.fill", cv, h("span.h-kaynak", S.haritaKaynak));
    wrap.append(fill);
    parent.append(wrap);

    // gösterilecek noktalar: yer → [filozoflar]
    let noktalar = [];
    function hesapla() {
      const fl = (o.filozoflar ? o.filozoflar.map((id) => F.byId[id]) : F.FILOZOFLAR).filter(Boolean);
      const m = new Map();
      const ekle = (yid, f, dogum) => {
        const Y = F.YERLER[yid];
        if (!Y || Y.disarida) return;
        if (!m.has(yid)) m.set(yid, { id: yid, Y, f: [], dogum: 0 });
        const n = m.get(yid);
        if (f && !n.f.includes(f)) n.f.push(f);
        if (dogum) n.dogum++;
      };
      if (o.yerler) o.yerler.forEach((y) => ekle(y, null));
      fl.forEach((f) => { ekle(f.dogumYeri, f, true); f.yerler.forEach((y) => ekle(y, f)); });
      noktalar = [...m.values()];
    }
    hesapla();

    let kutu = o.kutu.slice();
    let st, hover = null, secili = null, rotaK = o.rota ? 0 : 1;

    // eşdikdörtgen izdüşüm, enlem ortasına göre yatay düzeltme
    function proj() {
      const [w0, s0, e0, n0] = kutu;
      const k = Math.cos(((s0 + n0) / 2) * Math.PI / 180);
      const sx = st.w / ((e0 - w0) * k), sy = st.h / (n0 - s0);
      const s = Math.min(sx, sy);
      const ox = (st.w - (e0 - w0) * k * s) / 2, oy = (st.h - (n0 - s0) * s) / 2;
      return { x: (lon) => ox + (lon - w0) * k * s, y: (lat) => oy + (n0 - lat) * s, s };
    }

    function yol(ctx, P, arr, close) {
      ctx.moveTo(P.x(arr[0]), P.y(arr[1]));
      for (let i = 2; i < arr.length; i += 2) ctx.lineTo(P.x(arr[i]), P.y(arr[i + 1]));
      if (close) ctx.closePath();
    }

    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      const P = proj();
      ctx.clearRect(0, 0, w, H);
      // deniz: ince enlem-boylam ağı (yıldız haritası gibi)
      ctx.strokeStyle = rgba(C.brass, 0.07); ctx.lineWidth = 1;
      const step = kutu[2] - kutu[0] > 40 ? 10 : 2;
      ctx.beginPath();
      for (let lon = Math.ceil(kutu[0] / step) * step; lon <= kutu[2]; lon += step) { ctx.moveTo(P.x(lon), 0); ctx.lineTo(P.x(lon), H); }
      for (let lat = Math.ceil(kutu[1] / step) * step; lat <= kutu[3]; lat += step) { ctx.moveTo(0, P.y(lat)); ctx.lineTo(w, P.y(lat)); }
      ctx.stroke();
      // kara
      const ege = o.ege && window.HARITA_EGE;
      const D = ege ? HARITA_EGE : HARITA;
      ctx.beginPath();
      D.kara.forEach((r) => yol(ctx, P, r, true));
      ctx.fillStyle = "#24385F";
      ctx.fill("evenodd");
      ctx.strokeStyle = rgba(C.brass, 0.55); ctx.lineWidth = 0.9;
      ctx.stroke();
      if (!ege) {
        ctx.beginPath(); HARITA.gol.forEach((r) => yol(ctx, P, r, true));
        ctx.fillStyle = C.bg2; ctx.fill(); ctx.strokeStyle = rgba(C.brass, 0.35); ctx.stroke();
        if (o.nehirler) {
          ctx.beginPath(); HARITA.nehir.forEach((r) => yol(ctx, P, r, false));
          ctx.strokeStyle = rgba("#79AEEA", 0.35); ctx.lineWidth = 0.9; ctx.stroke();
        }
      }
      // rota (ör. Aristoteles'in yolculuğu)
      if (o.rota) {
        const pts = o.rota.map((y) => F.YERLER[y]).filter(Boolean);
        const n = (pts.length - 1) * rotaK;
        ctx.strokeStyle = C.brass; ctx.lineWidth = 1.6; ctx.setLineDash([5, 5]);
        ctx.beginPath();
        pts.forEach((p, i) => {
          if (i > Math.ceil(n)) return;
          let x = P.x(p.lon), y = P.y(p.lat);
          if (i === Math.ceil(n) && i > n) { const q = pts[i - 1], t = n - (i - 1); x = P.x(q.lon + (p.lon - q.lon) * t); y = P.y(q.lat + (p.lat - q.lat) * t); }
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        });
        ctx.stroke(); ctx.setLineDash([]);
      }
      // noktalar
      const placed = [];
      const sorted = noktalar.slice().sort((p, q) => q.f.length - p.f.length);
      sorted.forEach((n) => {
        const x = P.x(n.Y.lon), y = P.y(n.Y.lat);
        if (x < -20 || y < -20 || x > w + 20 || y > H + 20) return;
        const cols = n.f.length ? n.f.map((f) => L.gc(f.gelenek)) : [C.brass];
        const hot = hover === n.id || secili === n.id;
        const r = (hot ? 6.5 : 4.5) + Math.min(4, n.f.length * 0.6);
        ctx.fillStyle = rgba(cols[0], hot ? 0.3 : 0.16);
        ctx.beginPath(); ctx.arc(x, y, r + 4, 0, 7); ctx.fill();
        // birden çok gelenek varsa dilimli halka
        const uniq = [...new Set(cols)];
        uniq.forEach((c, i) => {
          ctx.strokeStyle = c; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(x, y, r, (i / uniq.length) * 6.283 - 1.57, ((i + 1) / uniq.length) * 6.283 - 1.57); ctx.stroke();
        });
        ctx.fillStyle = cols[0];
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill();
        // etiket: antik ad + bugünkü ad, çakışmayı önle
        if (o.etiket === "yok" && !hot) return;
        const ad = n.Y.ad, bg = n.Y.bugun.split(",")[0];
        ctx.font = `600 13px ${FONT.ui}`;
        const w1 = ctx.measureText(ad).width;
        ctx.font = `400 11.5px ${FONT.ui}`;
        const sub = ad === bg || n.Y.bugun.startsWith(ad) ? "" : "→ " + bg;
        const w2 = sub ? ctx.measureText(sub).width : 0;
        const bw = Math.max(w1, w2);
        const cand = [[x + r + 5, y - 13], [x - r - 5 - bw, y - 13], [x - bw / 2, y - r - 30], [x - bw / 2, y + r + 4]];
        const box = cand.map(([lx, ly]) => [lx, ly, bw, sub ? 28 : 15]).find((bx) =>
          bx[0] > 2 && bx[0] + bx[2] < w - 2 && bx[1] > 2 && bx[1] + bx[3] < H - 2 &&
          !placed.some((p) => bx[0] < p[0] + p[2] + 4 && bx[0] + bx[2] + 4 > p[0] && bx[1] < p[1] + p[3] && bx[1] + bx[3] > p[1]));
        if (!box && !hot) return;
        const [lx, ly] = box || cand[0];
        placed.push(box || [lx, ly, bw, 28]);
        ctx.textBaseline = "top";
        ctx.font = `600 13px ${FONT.ui}`;
        ctx.fillStyle = hot ? C.ink : rgba(C.ink, 0.92);
        ctx.fillText(ad, lx, ly);
        if (sub) { ctx.font = `400 11.5px ${FONT.ui}`; ctx.fillStyle = rgba(C.brass, 0.95); ctx.fillText(sub, lx, ly + 15); }
      });
    }

    function hit(px, py) {
      const P = proj();
      let best = null, bd = 16;
      noktalar.forEach((n) => { const d = Math.hypot(P.x(n.Y.lon) - px, P.y(n.Y.lat) - py); if (d < bd) { bd = d; best = n; } });
      return best;
    }
    const info = h("div.h-info", { "aria-live": "polite" });
    fill.append(info);
    function bilgi(n) {
      info.innerHTML = "";
      info.classList.toggle("open", !!n);
      if (!n) return;
      info.append(h("h4", n.Y.ad), h("p.h-bugun", "Bugün: " + n.Y.bugun + (n.Y.yaklasik ? " (yaklaşık konum)" : "")));
      if (n.f.length) {
        const ul = h("ul");
        n.f.forEach((f) => ul.append(h("li", { style: { "--gel": L.gc(f.gelenek) } },
          h("span.z-k", { "data-balon": f.id, tabindex: 0 }, f.ad.replace(/\s*\(.*\)/, "")),
          h("small", (f.dogumYeri === n.id ? "doğdu" : "yaşadı") + " · " + F.aralik(f)))));
        info.append(ul);
      }
    }
    cv.addEventListener("pointermove", (e) => {
      const r = cv.getBoundingClientRect();
      const n = hit(e.clientX - r.left, e.clientY - r.top);
      const id = n ? n.id : null;
      cv.style.cursor = id ? "pointer" : "default";
      if (id !== hover) { hover = id; draw(); }
    });
    cv.addEventListener("click", (e) => {
      const r = cv.getBoundingClientRect();
      const n = hit(e.clientX - r.left, e.clientY - r.top);
      secili = n ? n.id : null;
      bilgi(n); draw();
      o.onSec && o.onSec(n);
    });

    st = L.canvas(cv, draw);
    let anim = 0;
    function rotaOyna(ms = 5000) {
      if (!o.rota) return;
      cancelAnimationFrame(anim);
      const s0 = performance.now();
      (function tick(t) { rotaK = Math.min(1, (t - s0) / ms); draw(); if (rotaK < 1) anim = requestAnimationFrame(tick); })(s0);
    }
    function kutuya(nk, ms = 900) {
      cancelAnimationFrame(anim);
      const sk = kutu.slice(), s0 = performance.now();
      (function tick(t) { const k = L.ease(Math.min(1, (t - s0) / ms)); kutu = sk.map((v, i) => v + (nk[i] - v) * k); draw(); if (k < 1) anim = requestAnimationFrame(tick); })(s0);
    }
    return {
      el: wrap,
      sec(yid) { const n = noktalar.find((x) => x.id === yid); secili = yid; bilgi(n); draw(); },
      filozoflar(ids) { o.filozoflar = ids; hesapla(); draw(); },
      kutuya, rotaOyna,
      setEge(v) { o.ege = v; draw(); },
      enter() { draw(); if (o.rota && rotaK === 0) rotaOyna(); },
      leave() { cancelAnimationFrame(anim); },
      draw,
    };
  };
})();
