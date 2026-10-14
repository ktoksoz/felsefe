/* 1. İyonya deneyleri: harita, arkhe makinesi, akan nehir, monokord, tanrı vazoları */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;

  /* --- Neden İyonya: Ege kıyısı haritası --- */
  D.iyonya = function (stage) {
    const ids = ["thales", "anaksimandros", "anaksimenes", "herakleitos", "ksenofanes", "pythagoras", "anaksagoras"];
    const EGE = [25.3, 36.75, 28.7, 39.25], AKDENIZ = [11.5, 33.5, 37, 43.5];
    const map = Harita(stage, { kutu: EGE, filozoflar: ids, ege: true, nehirler: true });
    const kentler = ["milet", "efes", "klazomenai", "kolophon", "samos"];
    const btns = h("div.h-kentler", kentler.map((k) => h("button.btn.ghost", { type: "button", "aria-label": FELSEFE.YERLER[k].ad, onclick: () => map.sec(k) }, FELSEFE.YERLER[k].ad)));
    const seg = L.seg([["ege", "Ege kıyısı"], ["akdeniz", "Akdeniz'e yayılış"]], "ege", (v) => {
      if (v === "ege") { map.setEge(true); map.kutuya(EGE, 10); }
      else { map.setEge(false); map.kutuya(AKDENIZ, 900); }
      btns.style.display = v === "ege" ? "" : "none";
    });
    stage.append(h("div.controls", seg, btns));
    return map;
  };

  /* --- Arkhe makinesi --- */
  const ARKHE = {
    thales: { ad: "Thales: su", ilke: "Bütün çeşitlilik tek bir maddenin hâlleridir; canlılığın ve değişimin kaynağı nemdir.",
      filozof: ["thales"], lehte: "Su gerçekten katı, sıvı ve gaz olabilen; yaşamın olmazsa olmazı bir madde.",
      itiraz: "Anaksimandros'a göre sonsuz miktarda su, karşıtı olan ateşi çoktan söndürürdü. Su belirli bir şeyse, her şeyin kaynağı olamaz." },
    anaksimandros: { ad: "Anaksimandros: apeiron", ilke: "Karşıtların kaynağı, karşıtlardan hiçbiri olamaz; belirsiz ve sınırsız bir ilke gerekir.",
      filozof: ["anaksimandros"], lehte: "Karşıtlar arasındaki dengeyi açıklar: hiçbiri diğerine üstün gelmez, \"zamanın düzenine göre\" yer değiştirirler.",
      itiraz: "Hiçbir özelliği olmayan bir şeyi gözlemleyemeyiz; apeiron bir açıklama mı, yoksa bilmediğimiz şeye verilmiş bir ad mı?" },
    anaksimenes: { ad: "Anaksimenes: hava", ilke: "Niteliklerdeki fark nicelikten doğar: aynı madde, yoğunluğu değişince farklı şeyler olur.",
      filozof: ["anaksimenes"], lehte: "Ortada gözlenebilir bir mekanizma var: sıkıştırılan hava soğur, seyrelen hava ısınır (avucumuza üflediğimiz nefes gibi).",
      itiraz: "Neden hava? Sıkışma ve seyrelme bir mekanizma ise, başlangıç maddesi herhangi biri olabilirdi." },
  };
  const EVRE = [ // Anaksimenes: sıkışma → hâl
    [0.0, "Ateş", "#E8743B"], [0.18, "Hava", "#9FB4D8"], [0.36, "Rüzgâr", "#B9C6DE"], [0.52, "Bulut", "#E3E6EE"],
    [0.68, "Su", "#4E86C6"], [0.84, "Toprak", "#8C6A45"], [0.96, "Taş", "#8A8F9A"],
  ];
  D.arkhe = function (stage) {
    const cv = h("canvas", { "aria-label": "Arkhe makinesi" });
    const fill = h("div.fill", cv);
    const out = h("div.ar-out.pad.scroll");
    let mod = "thales", sik = 0.2, t = 0;
    const sl = L.slider({ label: "Sıkışma", min: 0, max: 1, step: 0.01, value: sik, fmt: (v) => evre(v)[1], oninput: (v) => (sik = v) });
    const seg = L.seg([["thales", "Thales"], ["anaksimandros", "Anaksimandros"], ["anaksimenes", "Anaksimenes"]], mod, (v) => sec(v));
    const ctl = h("div.controls", seg, sl);
    stage.append(fill, ctl, out);
    const r = L.rng(7);
    const P = Array.from({ length: 260 }, () => ({ x: r(), y: r(), vx: 0, vy: 0, k: r(), s: r() }));
    function evre(v) { let e = EVRE[0]; EVRE.forEach((x) => { if (v >= x[0] - 0.08) e = x; }); return e; }
    function sec(v) {
      mod = v;
      sl.style.display = v === "anaksimenes" ? "" : "none";
      out.innerHTML = "";
      out.append(h("h4", ARKHE[v].ad), Oy.ilkePanel(ARKHE[v]));
    }
    sec(mod);
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, cy = H / 2, R = Math.min(w, H) * 0.42;
      // usturlap halkası
      ctx.strokeStyle = rgba(C.brass, 0.25); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
      for (let i = 0; i < 72; i++) { const a = (i / 72) * 6.283, r0 = R - (i % 6 ? 4 : 9); ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); }
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R - 12, 0, 7); ctx.clip();
      if (mod === "thales") drawThales(ctx, cx, cy, R);
      else if (mod === "anaksimandros") drawApeiron(ctx, cx, cy, R);
      else drawHava(ctx, cx, cy, R);
      ctx.restore();
    }
    function lab(ctx, s, x, y, col, al = "center") {
      ctx.font = `600 14px ${FONT.ui}`; ctx.fillStyle = col; ctx.textAlign = al; ctx.textBaseline = "middle"; ctx.fillText(s, x, y); ctx.textAlign = "left";
    }
    function drawThales(ctx, cx, cy, R) {
      // su gövdesi, yükselen buhar, çöken alüvyon; ortada suyun üzerinde yüzen yer diski
      const sea = cy + R * 0.1;
      ctx.fillStyle = "rgba(78,134,198,.28)";
      ctx.beginPath(); ctx.moveTo(cx - R, sea);
      for (let x = -R; x <= R; x += 6) ctx.lineTo(cx + x, sea + Math.sin(x * 0.05 + t * 2) * 4);
      ctx.lineTo(cx + R, cy + R); ctx.lineTo(cx - R, cy + R); ctx.fill();
      ctx.fillStyle = "#3a2d22"; ctx.strokeStyle = C.brass; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.ellipse(cx, sea - 4 + Math.sin(t * 2) * 2, R * 0.38, R * 0.07, 0, 0, 7); ctx.fill(); ctx.stroke();
      P.forEach((p, i) => {
        if (i % 2) { // buhar
          p.y -= 0.0025 * (0.5 + p.s); if (p.y < 0) { p.y = 0.55; p.x = 0.2 + p.k * 0.6; }
          const y = cy - R + p.y * R * 1.2, a = clamp(p.y * 1.6, 0, 0.7);
          ctx.fillStyle = `rgba(227,230,238,${a})`; ctx.beginPath(); ctx.arc(cx - R + p.x * 2 * R, y, Math.max(0.5, 1.6 + (0.55 - p.y) * 5), 0, 7); ctx.fill();
        } else { // alüvyon
          p.y += 0.0016 * (0.5 + p.s); if (p.y > 1) { p.y = 0.6; p.x = p.k; }
          ctx.fillStyle = rgba("#8C6A45", 0.8); ctx.fillRect(cx - R + p.x * 2 * R, cy - R + p.y * 2 * R, 2, 2);
        }
      });
      lab(ctx, "buhar, bulut", cx, cy - R * 0.62, C.ink);
      lab(ctx, "su", cx + R * 0.55, sea + R * 0.2, "#79AEEA");
      lab(ctx, "toprak (alüvyon)", cx, cy + R * 0.72, "#C9A27A");
      lab(ctx, "yer, suyun üzerinde yüzer", cx, sea - R * 0.16, C.muted);
    }
    function drawApeiron(ctx, cx, cy, R) {
      // belirsiz bir girdaptan karşıt çiftler ayrışır ve geri döner
      const sep = (Math.sin(t * 0.5) + 1) / 2;
      P.forEach((p, i) => {
        const a = p.k * 6.283 + t * (0.3 + p.s * 0.4);
        const kind = i % 4; // 0 sıcak, 1 soğuk, 2 kuru, 3 ıslak
        const rr = R * (0.12 + p.s * 0.3) + sep * R * 0.45 * (kind < 2 ? 1 : 0.7);
        const dir = kind === 0 ? -1.57 : kind === 1 ? 1.57 : kind === 2 ? 3.14 : 0;
        const x = cx + Math.cos(a) * rr * (1 - sep * 0.6) + Math.cos(dir) * sep * R * 0.45;
        const y = cy + Math.sin(a) * rr * (1 - sep * 0.6) + Math.sin(dir) * sep * R * 0.45;
        const col = ["#E8743B", "#79AEEA", "#C9A27A", "#3FC1B0"][kind];
        ctx.fillStyle = sep < 0.15 ? rgba(C.muted, 0.6) : L.mix(C.muted, col, clamp((sep - 0.1) * 1.6, 0, 1));
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, 7); ctx.fill();
      });
      if (sep > 0.55) {
        lab(ctx, "sıcak", cx, cy - R * 0.78, "#E8743B"); lab(ctx, "soğuk", cx, cy + R * 0.78, "#79AEEA");
        lab(ctx, "kuru", cx - R * 0.7, cy, "#C9A27A"); lab(ctx, "ıslak", cx + R * 0.7, cy, "#3FC1B0");
      } else lab(ctx, "apeiron", cx, cy, C.ink);
    }
    function drawHava(ctx, cx, cy, R) {
      const [, ad, col] = evre(sik);
      const n = Math.round(lerp(40, 260, sik));
      const spread = lerp(1, 0.35, sik);
      for (let i = 0; i < n; i++) {
        const p = P[i];
        const jit = sik < 0.2 ? 0.02 : sik < 0.45 ? 0.012 : 0.003;
        p.x += (Math.sin(t * 3 + i) * jit) * 0.1 + (sik > 0.3 && sik < 0.45 ? 0.002 : 0);
        if (p.x > 1) p.x -= 1;
        const x = cx + (p.x - 0.5) * 2 * R * spread, y = cy + (p.y - 0.5) * 2 * R * spread + (sik < 0.18 ? -Math.abs(Math.sin(t * 6 + i)) * 6 : 0);
        ctx.fillStyle = sik < 0.18 ? rgba(col, 0.5 + 0.5 * Math.abs(Math.sin(t * 8 + i))) : rgba(col, sik > 0.45 ? 0.9 : 0.55);
        const s = sik > 0.9 ? 5 : sik > 0.75 ? 3.4 : 2.2;
        if (sik > 0.9) ctx.fillRect(x - s / 2, y - s / 2, s, s); else { ctx.beginPath(); ctx.arc(x, y, s, 0, 7); ctx.fill(); }
      }
      lab(ctx, ad, cx, cy - R * 0.82, C.ink);
      ctx.font = `400 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
      ctx.fillText("← seyrelme   ·   sıkışma →", cx, cy + R * 0.84); ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Herakleitos: akan nehir ve oylama --- */
  D.nehir = function (stage) {
    const cv = h("canvas", { "aria-label": "Akan nehir" });
    const fill = h("div.fill", cv);
    const panel = h("div.pad.scroll.nh-panel");
    stage.append(fill, panel);
    const sayac = h("p.nh-sayac");
    panel.append(sayac);
    Oy.secim(panel, {
      anahtar: "nehir", soru: "Bir dakika sonraki nehir, şimdiki nehirle aynı nehir mi?",
      secenekler: [
        { v: "ayni", ad: "Evet, aynı nehir", ilke: "Bir şeyi o şey yapan, maddesi değil biçimi ve sürekliliğidir.", filozof: ["aristoteles"],
          itiraz: "Bütün suyu değişmiş bir şeye \"aynı\" demek, yalnızca adının aynı kalması olabilir." },
        { v: "baska", ad: "Hayır, başka bir nehir", ilke: "Bir şey, onu oluşturan parçalar aynı kaldığı sürece aynıdır. Herakleitosçu Kratylos daha da ileri gidip aynı nehre bir kez bile girilemeyeceğini söyledi.", filozof: [],
          itiraz: "Bu ölçütle siz de dünkü siz değilsiniz: bedeninizdeki maddenin büyük kısmı yıllar içinde yenilenir." },
        { v: "ikisi", ad: "Hem aynı hem değil", ilke: "Karşıtların birliği: nehir, suyu değiştiği için aynı kalır.", filozof: ["herakleitos"],
          itiraz: "Aristoteles'e göre bir şey aynı bakımdan hem öyle hem değil olamaz (çelişmezlik ilkesi, Metafizik IV.3)." },
      ],
    });
    const r = L.rng(3);
    const P = Array.from({ length: 420 }, (_, i) => ({ u: r(), v: r(), s: 0.6 + r() * 0.6, iz: i === 0 }));
    let t = 0, gecen = 0, st;
    function bank(u, w, H) { // nehrin kıvrımı
      const y = H * (0.5 + 0.18 * Math.sin(u * 4.2 + 0.6) + 0.06 * Math.sin(u * 9));
      const half = H * (0.13 + 0.03 * Math.sin(u * 3));
      return [y, half];
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      // kıyılar
      ctx.fillStyle = "rgba(78,134,198,.10)";
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) { const [y, hf] = bank(x / w, w, H); x ? ctx.lineTo(x, y - hf) : ctx.moveTo(x, y - hf); }
      for (let x = w; x >= 0; x -= 8) { const [y, hf] = bank(x / w, w, H); ctx.lineTo(x, y + hf); }
      ctx.fill();
      ctx.strokeStyle = rgba(C.brass, 0.5); ctx.lineWidth = 1.2;
      [-1, 1].forEach((sg) => { ctx.beginPath(); for (let x = 0; x <= w; x += 8) { const [y, hf] = bank(x / w, w, H); x ? ctx.lineTo(x, y + sg * hf) : ctx.moveTo(x, y + sg * hf); } ctx.stroke(); });
      P.forEach((p) => {
        const x = p.u * w;
        const [y, hf] = bank(p.u, w, H);
        const yy = y + (p.v - 0.5) * 2 * hf * 0.9;
        if (p.iz) {
          ctx.fillStyle = C.brass; ctx.beginPath(); ctx.arc(x, yy, 5, 0, 7); ctx.fill();
          ctx.font = `600 12px ${FONT.ui}`; ctx.fillStyle = C.brass2 || "#E2C27E"; ctx.fillText("bu damla", x + 8, yy - 8);
        } else {
          ctx.strokeStyle = rgba("#9FC3EE", 0.55);
          ctx.beginPath(); ctx.moveTo(x - 6 * p.s, yy); ctx.lineTo(x, yy); ctx.stroke();
        }
      });
      // ateş: köşede ölçüyle tutuşup sönen alev
      const fx = w - 46, fy = 44, fl = 0.6 + 0.4 * Math.sin(t * 1.3);
      ctx.fillStyle = rgba("#E8743B", 0.25 + 0.5 * fl);
      ctx.beginPath(); ctx.moveTo(fx - 10, fy + 14); ctx.quadraticCurveTo(fx - 12, fy - 4 * fl, fx, fy - 22 * fl); ctx.quadraticCurveTo(fx + 12, fy - 4 * fl, fx + 10, fy + 14); ctx.fill();
      ctx.font = `italic 12px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.textAlign = "center"; ctx.fillText("ölçüyle tutuşan ateş", fx, fy + 30); ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt; gecen += dt;
      P.forEach((p) => { p.u += dt * 0.05 * p.s; if (p.u > 1) { p.u -= 1; if (p.iz) p.iz = "gitti"; } });
      const iz = P[0];
      sayac.textContent = iz.iz === "gitti" ? "İşaretli damla denize karıştı. Önünüzdeki suyun hiçbiri az önceki su değil." : `Geçen süre: ${Math.round(gecen)} sn. İşaretli damlayı izleyin.`;
      if (iz.iz === "gitti" && gecen > 30) { iz.iz = true; gecen = 0; }
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Pythagoras: monokord (Web Audio) --- */
  D.monokord = function (stage) {
    const cv = h("canvas", { "aria-label": "Monokord" });
    cv.style.touchAction = "none";
    const fill = h("div.fill", cv);
    const bilgi = h("p.mk-bilgi");
    const ORAN = [["Açık tel", 1, 1], ["Oktav", 1, 2], ["Beşli", 2, 3], ["Dörtlü", 3, 4]];
    let k = 1, oran = [1, 1], titres = 0, t = 0;
    const btns = ORAN.map(([ad, p, q]) => h("button.btn", { type: "button", onclick: () => ayarla(p / q, [p, q], true) }, `${ad}${p !== q ? ` (${p}/${q})` : ""}`));
    btns.push(h("button.btn.ghost", { type: "button", onclick: () => { const v = 0.52 + Math.random() * 0.4; ayarla(v, null, true); } }, "Rastgele"));
    stage.append(fill, h("div.controls", ...btns), h("div.pad.mk-alt", bilgi));
    const F0 = 196; // sol (G3)
    let ac = null;
    function audio() { if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); } if (ac && ac.state === "suspended") ac.resume(); return ac; }
    // Karplus–Strong telli çalgı sesi
    function pluck(f, when, gain = 0.32) {
      const a = audio(); if (!a) return;
      const sr = a.sampleRate, n = Math.round(sr * 2.2), N = Math.round(sr / f);
      const buf = a.createBuffer(1, n, sr), d = buf.getChannelData(0);
      const rr = L.rng(Math.round(f * 7));
      for (let i = 0; i < N; i++) d[i] = rr() * 2 - 1;
      for (let i = N; i < n; i++) d[i] = 0.996 * 0.5 * (d[i - N] + d[i - N + 1]);
      const s = a.createBufferSource(); s.buffer = buf;
      const g = a.createGain(); g.gain.value = gain;
      s.connect(g).connect(a.destination); s.start(a.currentTime + when);
    }
    function ayarla(v, pq, cal) {
      k = clamp(v, 0.2, 1); oran = pq;
      btns.forEach((b, i) => b.classList.toggle("on", i < ORAN.length && pq && ORAN[i][1] === pq[0] && ORAN[i][2] === pq[1]));
      const f = F0 / k;
      const cons = pq ? (pq[0] === 1 && pq[1] === 1 ? "Açık tel: temel ses." : `Tel boyu ${pq[0]}/${pq[1]} → frekans ${pq[1]}/${pq[0]} kat. Basit bir oran: kulağa uyumlu (konsonans).`)
        : `Tel boyu ≈ ${k.toFixed(3)}. Basit bir tam sayı oranı değil: iki ses birbirine "sürtünür" (disonans).`;
      bilgi.innerHTML = `<b>${Math.round(F0)} Hz + ${Math.round(f)} Hz</b> · ${cons}`;
      if (cal) { pluck(F0, 0); pluck(f, 0.55); pluck(F0, 1.2, 0.24); pluck(f, 1.2, 0.24); titres = 1; }
    }
    ayarla(1, [1, 1], false);
    let st, drag = false;
    function geo() { const { w, h: H } = st; return { x0: w * 0.08, x1: w * 0.92, y: H * 0.38 }; }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const g = geo(), bx = g.x0 + (g.x1 - g.x0) * k;
      // ses kutusu
      ctx.fillStyle = "#2a1d12"; ctx.strokeStyle = C.brass; ctx.lineWidth = 1;
      ctx.fillRect(g.x0 - 10, g.y + 14, g.x1 - g.x0 + 20, 26); ctx.strokeRect(g.x0 - 10, g.y + 14, g.x1 - g.x0 + 20, 26);
      // cetvel: oran çentikleri
      [[1 / 2, "1/2"], [2 / 3, "2/3"], [3 / 4, "3/4"]].forEach(([r, s]) => {
        const x = g.x0 + (g.x1 - g.x0) * r;
        ctx.strokeStyle = rgba(C.brass, 0.6); ctx.beginPath(); ctx.moveTo(x, g.y + 40); ctx.lineTo(x, g.y + 50); ctx.stroke();
        ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center"; ctx.fillText(s, x, g.y + 64);
      });
      ctx.textAlign = "left";
      // titreşen tel: köprünün solu çalan kısım
      const amp = titres * 10;
      ctx.strokeStyle = "#E2C27E"; ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let x = g.x0; x <= bx; x += 2) { const u = (x - g.x0) / (bx - g.x0); ctx.lineTo(x, g.y + Math.sin(u * Math.PI) * amp * Math.sin(t * 40)); }
      ctx.stroke();
      ctx.strokeStyle = rgba("#E2C27E", 0.5); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(bx, g.y); ctx.lineTo(g.x1, g.y); ctx.stroke();
      // köprü
      ctx.fillStyle = C.brass; ctx.beginPath(); ctx.moveTo(bx - 8, g.y + 14); ctx.lineTo(bx, g.y - 2); ctx.lineTo(bx + 8, g.y + 14); ctx.fill();
      // iki dalga: oran basitse düzenli aralıklarla çakışırlar
      const wy = H * 0.78, wh = Math.min(34, H * 0.1);
      const f1 = 1, f2 = 1 / k;
      [[f1, "#79AEEA"], [f2, "#E08A4F"]].forEach(([f, c]) => {
        ctx.strokeStyle = rgba(c, 0.85); ctx.lineWidth = 1.4; ctx.beginPath();
        for (let x = 0; x <= w; x += 2) ctx.lineTo(x, wy + Math.sin((x / w) * Math.PI * 2 * 6 * f + t * 2) * wh);
        ctx.stroke();
      });
      ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted;
      ctx.fillText(oran && oran[0] !== oran[1] ? `Dalgalar her ${oran[0]} ve ${oran[1]} titreşimde bir yeniden buluşur` : oran ? "Tek ses" : "Dalgalar düzenli bir buluşma noktası bulamaz", 12, wy - wh - 10);
    }
    function setFromX(x) { const g = geo(); ayarla((x - g.x0) / (g.x1 - g.x0), null, false); }
    cv.addEventListener("pointerdown", (e) => { const r = cv.getBoundingClientRect(); const g = geo(); if (Math.abs(e.clientY - r.top - g.y) < 60) { drag = true; cv.setPointerCapture(e.pointerId); setFromX(e.clientX - r.left); } });
    cv.addEventListener("pointermove", (e) => { if (drag) { const r = cv.getBoundingClientRect(); setFromX(e.clientX - r.left); } });
    cv.addEventListener("pointerup", () => { if (drag) { drag = false; const p = [[1, 2], [2, 3], [3, 4]].find(([a, b]) => Math.abs(k - a / b) < 0.012); ayarla(p ? p[0] / p[1] : k, p || null, true); } });
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; titres *= Math.pow(0.35, dt); draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Ksenofanes: kim çizerse tanrı ona benzer (siyah figür vazo madalyonu) --- */
  const CIZEN = {
    habesli: { ad: "Habeşliler", metin: "Habeşliler tanrılarının kara ve basık burunlu olduğunu söyler (B16)." },
    trakyali: { ad: "Trakyalılar", metin: "Trakyalılar tanrılarının mavi gözlü ve kızıl saçlı olduğunu söyler (B16)." },
    at: { ad: "Atlar", metin: "Atların elleri olsaydı, tanrıları atlara benzer çizerlerdi (B15)." },
    okuz: { ad: "Öküzler", metin: "Öküzler de tanrıları öküz biçiminde çizerdi (B15)." },
    aslan: { ad: "Aslanlar", metin: "Aslanlar da (B15)." },
    tek: { ad: "Ksenofanes'in tanrısı", metin: "Tek bir tanrı; ne bedence ne düşünceyle ölümlülere benzer. Bütünüyle görür, bütünüyle düşünür, bütünüyle işitir (B23–B24)." },
  };
  D.tanrilar = function (stage) {
    const cv = h("canvas", { "aria-label": "Vazo madalyonu" });
    const fill = h("div.fill", cv);
    const not = h("p.tn-not");
    let kim = "habesli", gec = 1;
    const seg = h("div.tn-row", Object.entries(CIZEN).map(([k, v]) => h("button.btn" + (k === "tek" ? ".ghost" : ""), { type: "button", "data-k": k, onclick: () => sec(k) }, v.ad)));
    stage.append(fill, h("div.controls", seg), h("div.pad", not));
    function sec(k) { kim = k; gec = 0; seg.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.k === k)); not.textContent = CIZEN[k].metin; }
    sec(kim);
    const KIL = "#D9874D", SIYAH = "#1a1210";
    // siluetler, 0..1 kutuda sağa bakan profil
    const PATH = {
      insan: "M.36 .96C.34 .82 .27 .72 .29 .56C.27 .36 .4 .19 .56 .2C.71 .22 .79 .34 .78 .46L.81 .52L.87 .62L.81 .64C.83 .67 .81 .69 .8 .71L.79 .75C.77 .81 .72 .83 .66 .83L.62 .96Z",
      at: "M.28 .97C.25 .72 .29 .46 .38 .31L.4 .15L.47 .28C.6 .34 .76 .5 .87 .69C.92 .77 .89 .85 .8 .86C.73 .87 .66 .81 .6 .75C.55 .72 .54 .83 .58 .97Z",
      okuz: "M.28 .97C.26 .76 .3 .56 .39 .44C.45 .37 .55 .35 .63 .38C.76 .44 .85 .6 .89 .72C.91 .8 .86 .86 .78 .84C.7 .82 .62 .76 .56 .74C.5 .78 .5 .88 .54 .97Z",
      boynuz: "M.5 .4C.44 .22 .58 .09 .74 .12C.63 .17 .58 .27 .6 .38Z",
      aslan: "M.32 .96C.3 .8 .33 .62 .42 .5C.5 .42 .62 .42 .7 .46C.79 .51 .86 .6 .88 .68L.86 .74C.83 .78 .77 .8 .7 .79C.64 .8 .6 .84 .58 .96Z",
    };
    const cache = {};
    const path2d = (k) => cache[k] || (cache[k] = new Path2D(PATH[k].replace(/(\d?\.\d+)/g, (m) => String(+m * 100))));
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const R = Math.min(w, H) * 0.42, cx = w / 2, cy = H / 2;
      // kil zemin ve meander (Yunan anahtarı) bordür
      ctx.fillStyle = KIL; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
      ctx.strokeStyle = SIYAH; ctx.lineWidth = R * 0.075; ctx.beginPath(); ctx.arc(cx, cy, R * 0.93, 0, 7); ctx.stroke();
      ctx.strokeStyle = KIL; ctx.lineWidth = 2;
      const n = 28;
      for (let i = 0; i < n; i++) { // basitleştirilmiş meander: kanca biçimli çentikler
        const a = (i / n) * 6.283, a2 = a + 6.283 / n * 0.6, r1 = R * 0.9, r2 = R * 0.96;
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.lineTo(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2); ctx.lineTo(cx + Math.cos(a2) * (r1 + R * 0.03), cy + Math.sin(a2) * (r1 + R * 0.03)); ctx.stroke();
      }
      ctx.save();
      ctx.globalAlpha = L.ease(Math.min(1, gec));
      const s = R * 1.25 / 100;
      ctx.translate(cx - 50 * s, cy - 54 * s); ctx.scale(s, s);
      ctx.fillStyle = SIYAH; ctx.strokeStyle = KIL; ctx.lineWidth = 0.9;
      const ince = (fn) => { ctx.beginPath(); fn(); ctx.stroke(); };
      if (kim === "habesli" || kim === "trakyali") {
        ctx.fill(path2d("insan"));
        if (kim === "habesli") { // sık kıvırcık saç: kazınmış halkalar
          ctx.fillStyle = SIYAH; ctx.beginPath(); ctx.ellipse(46, 30, 22, 14, -0.3, 0, 7); ctx.fill();
          for (let i = 0; i < 26; i++) { const a = i * 2.4, rr = 4 + (i % 5) * 3.4; ince(() => ctx.arc(44 + Math.cos(a) * rr * 1.4, 32 + Math.sin(a) * rr * 0.8, 1.8, 0, 7)); }
        } else { // kızıl saç (ek boya) ve mavi göz
          ctx.fillStyle = "#9B3A22"; ctx.beginPath(); ctx.moveTo(30, 60); ctx.bezierCurveTo(22, 30, 40, 14, 60, 18); ctx.bezierCurveTo(70, 20, 76, 28, 77, 36); ctx.bezierCurveTo(60, 30, 44, 40, 40, 72); ctx.fill();
          ctx.fillStyle = "#7FB2E5"; ctx.beginPath(); ctx.arc(72, 47, 1.8, 0, 7); ctx.fill();
        }
        ince(() => { ctx.moveTo(70, 47); ctx.lineTo(75, 46); });
        ince(() => ctx.arc(72, 47, 2.3, 0, 7));
      } else if (kim === "at") {
        ctx.fill(path2d("at"));
        for (let i = 0; i < 9; i++) ince(() => { ctx.moveTo(30 + i * 1.2, 72 - i * 6); ctx.lineTo(24 + i * 1.6, 70 - i * 6); });
        ince(() => ctx.arc(60, 46, 2.4, 0, 7));
        ince(() => { ctx.moveTo(82, 78); ctx.lineTo(86, 76); });
      } else if (kim === "okuz") {
        ctx.fill(path2d("okuz")); ctx.fill(path2d("boynuz"));
        ince(() => ctx.arc(66, 52, 2.4, 0, 7));
        ince(() => { ctx.moveTo(84, 76); ctx.quadraticCurveTo(86, 80, 82, 81); });
        ince(() => { ctx.moveTo(48, 60); ctx.quadraticCurveTo(44, 76, 46, 90); });
      } else if (kim === "aslan") {
        ctx.beginPath();
        for (let i = 0; i <= 24; i++) { const a = -2.6 + (i / 24) * 4.4, rr = i % 2 ? 30 : 38; ctx.lineTo(54 + Math.cos(a) * rr, 60 + Math.sin(a) * rr); }
        ctx.fill();
        ctx.fill(path2d("aslan"));
        for (let i = 0; i < 12; i++) { const a = -2.4 + i * 0.36; ince(() => { ctx.moveTo(54 + Math.cos(a) * 22, 60 + Math.sin(a) * 22); ctx.lineTo(54 + Math.cos(a) * 33, 60 + Math.sin(a) * 33); }); }
        ince(() => ctx.arc(74, 56, 2.3, 0, 7));
        ince(() => { ctx.moveTo(86, 70); ctx.lineTo(80, 72); });
      } else { // biçimsiz: yalnızca ışıyan bir küre ve eşmerkezli halkalar
        ctx.strokeStyle = SIYAH; ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) { ctx.globalAlpha = 0.25 + i * 0.12; ctx.beginPath(); ctx.arc(50, 54, i * 7, 0, 7); ctx.stroke(); }
        ctx.globalAlpha = 1;
      }
      ctx.restore();
      ctx.font = `italic 15px ${FONT.body}`; ctx.fillStyle = C.ink; ctx.textAlign = "center";
      ctx.fillText(kim === "tek" ? "\"ne bedence ne düşünceyle ölümlülere benzer\"" : `${CIZEN[kim].ad} tanrıyı çizseydi`, cx, cy + R + 22 > H - 6 ? H - 8 : cy + R + 22);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { if (gec < 1) { gec += dt * 1.6; draw(); } });
    return { enter: () => { lp.start(); draw(); }, leave: () => lp.stop() };
  };
})();
