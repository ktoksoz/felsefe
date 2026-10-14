/* Ortak yardımcılar: tuval kurulumu, renkler, döngüler, DOM, kaydırıcı ve segment bileşenleri */
(function () {
  // Renkler css/style.css içindeki :root değişkenleriyle aynı
  const C = {
    bg: "#14213D", bg2: "#0E1830", panel: "#1A2A4C", line: "#2C3B5E",
    ink: "#EDE7DC", ink2: "#C3C3C8", muted: "#8A93AB",
    brass: "#C9A55C", lehte: "#F3E3B3", aleyhte: "#8C9BC4",
  };
  const FONT = {
    display: '"Marcellus", "Alegreya", Georgia, serif',
    body: '"Alegreya", Georgia, serif',
    ui: '"Alegreya Sans", system-ui, sans-serif',
    ar: '"Amiri", serif', zh: '"Noto Serif SC", serif', dev: '"Tiro Devanagari Sanskrit", serif',
  };
  // Gelenek rengi (veri yüklüyse)
  const gc = (g) => (window.FELSEFE && FELSEFE.GELENEKLER[g] ? FELSEFE.GELENEKLER[g].renk : C.brass);

  function hexToRgb(h) {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r},${g},${b},${a})`;
  }
  function mix(h1, h2, t) {
    const a = hexToRgb(h1), b = hexToRgb(h2);
    return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
  }

  /* Yüksek çözünürlüklü, kendini yeniden boyutlandıran tuval */
  function canvas(el, onResize) {
    const ctx = el.getContext("2d");
    const state = { ctx, w: 0, h: 0, dpr: 1 };
    function fit() {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.w = r.width; state.h = r.height; state.dpr = dpr;
      el.width = Math.round(r.width * dpr);
      el.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ready && onResize && onResize(state);
    }
    // ilk geri çağrı ertelenir: çağıran kod dönüş değerini değişkene atamış olsun
    let ready = false;
    fit();
    ready = true;
    new ResizeObserver(fit).observe(el);
    queueMicrotask(() => { if (state.w && onResize) onResize(state); });
    state.fit = fit;
    return state;
  }

  /* requestAnimationFrame döngüsü — slayt görünürken çalışır */
  function loop(fn) {
    let id = 0, last = 0, running = false;
    function tick(t) {
      if (!running) return;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      fn(dt, t / 1000);
      id = requestAnimationFrame(tick);
    }
    return {
      start() { if (!running) { running = true; last = 0; id = requestAnimationFrame(tick); } },
      stop() { running = false; cancelAnimationFrame(id); },
      get running() { return running; },
    };
  }

  /* Küçük DOM yardımcısı: h("div.cls#id", {attrs}, ...children) */
  function h(spec, attrs, ...kids) {
    const m = spec.match(/^([a-z0-9]+)?((?:[.#][\w-]+)*)$/i);
    const el = document.createElement(m[1] || "div");
    (m[2].match(/[.#][\w-]+/g) || []).forEach((p) => {
      if (p[0] === ".") el.classList.add(p.slice(1)); else el.id = p.slice(1);
    });
    if (attrs && (typeof attrs !== "object" || attrs instanceof Node || Array.isArray(attrs))) { kids.unshift(attrs); attrs = null; }
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (k === "html") el.innerHTML = v;
      else if (k === "style" && typeof v === "object") for (const [sk, sv] of Object.entries(v)) { if (sk.startsWith("--")) el.style.setProperty(sk, sv); else el.style[sk] = sv; }
      else if (v !== false && v != null) el.setAttribute(k, v === true ? "" : v);
    }
    kids.flat().forEach((k) => k != null && el.append(k.nodeType ? k : document.createTextNode(k)));
    return el;
  }

  function slider({ label, min, max, step = 0.01, value, fmt = (v) => v.toFixed(2), oninput, width }) {
    const val = h("span.val", fmt(value));
    const input = h("input", { type: "range", min, max, step, value, "aria-label": label });
    if (width) input.style.width = width;
    input.addEventListener("input", () => { val.textContent = fmt(+input.value); oninput(+input.value); });
    const wrap = h("label", label, input, val);
    wrap.set = (v) => { input.value = v; val.textContent = fmt(+v); };
    wrap.input = input;
    return wrap;
  }

  function seg(options, value, onchange) {
    const wrap = h("div.seg", { role: "group" });
    const btns = options.map(([k, lab]) => {
      const b = h("button", { type: "button" }, lab);
      b.addEventListener("click", () => { set(k); onchange(k); });
      wrap.append(b); return [k, b];
    });
    function set(k) { btns.forEach(([kk, b]) => b.classList.toggle("on", kk === k)); }
    set(value);
    wrap.set = set;
    return wrap;
  }

  /* Rastgele sayı üreteci (tekrar edilebilir) */
  function rng(seed = 1) {
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function gauss(r) {
    let u = 0, v = 0;
    while (!u) u = r();
    while (!v) v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* Harici script'i bir kere yükle (file:// ile de çalışır) */
  const loaded = {};
  function loadScript(src) {
    if (!loaded[src]) loaded[src] = new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = () => rej(new Error(src + " yüklenemedi"));
      document.head.append(s);
    });
    return loaded[src];
  }

  /* Kalıcı küçük depo: localStorage yoksa (gizli pencere vb.) bellekte tutar */
  const mem = {};
  const store = {
    get(k, d) { try { const v = localStorage.getItem("felsefe." + k); return v == null ? (k in mem ? mem[k] : d) : JSON.parse(v); } catch (e) { return k in mem ? mem[k] : d; } },
    set(k, v) { mem[k] = v; try { localStorage.setItem("felsefe." + k, JSON.stringify(v)); } catch (e) {} },
    del(k) { delete mem[k]; try { localStorage.removeItem("felsefe." + k); } catch (e) {} },
  };

  /* Yazı sistemine göre font: Arapça, Çince, Devanagari, yoksa Yunanca/Latin */
  function scriptFont(s) {
    if (/[\u0600-\u06FF]/.test(s)) return FONT.ar;
    if (/[\u4E00-\u9FFF]/.test(s)) return FONT.zh;
    if (/[\u0900-\u097F]/.test(s)) return FONT.dev;
    return FONT.display;
  }

  /* Sürükle-bırak (pointer olaylarıyla; hayalet el de aynı olayları üretir).
     hedefler: bırakılabilecek öğeler (dizi ya da fonksiyon); onDrop(hedef | null, el) */
  function surukle(el, { hedefler = [], onDrop, onMove, onStart } = {}) {
    el.style.touchAction = "none";
    let sx = 0, sy = 0, on = false, over = null;
    const list = () => (typeof hedefler === "function" ? hedefler() : hedefler);
    const under = (x, y) => list().find((t) => { const r = t.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; }) || null;
    el.addEventListener("pointerdown", (e) => {
      if (e.button > 0) return;
      on = true; sx = e.clientX; sy = e.clientY;
      try { el.setPointerCapture(e.pointerId); } catch (er) {}
      el.classList.add("dragging"); onStart && onStart(el);
      e.preventDefault();
    });
    el.addEventListener("pointermove", (e) => {
      if (!on) return;
      el.style.transform = `translate(${e.clientX - sx}px, ${e.clientY - sy}px)`;
      const t = under(e.clientX, e.clientY);
      if (t !== over) { over && over.classList.remove("drop-over"); over = t; over && over.classList.add("drop-over"); }
      onMove && onMove(e, t);
    });
    const end = (e) => {
      if (!on) return;
      on = false; el.classList.remove("dragging"); el.style.transform = "";
      over && over.classList.remove("drop-over"); over = null;
      onDrop && onDrop(e.type === "pointerup" ? under(e.clientX, e.clientY) : null, el);
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  }

  window.L = {
    C, FONT, gc, surukle, rgba, mix, canvas, loop, h, slider, seg, rng, gauss, clamp, lerp, ease,
    loadScript, store, scriptFont,
  };
  window.Demos = window.Demos || {};
})();
