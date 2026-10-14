/* Büyük soru 5 deneyleri: cehalet peçesi, doğa durumu */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;

  /* --- Cehalet peçesi --- */
  const DAGILIM = {
    esit: [30, 30, 30, 30, 30],
    fark: [36, 42, 50, 62, 85],
    faydaci: [8, 25, 55, 110, 200],
    taban: [26, 38, 58, 95, 160],
  };
  const DILIM = ["En alttaki beşte bir", "İkinci beşte bir", "Ortadaki beşte bir", "Dördüncü beşte bir", "En üstteki beşte bir"];
  D.pece = function (stage) {
    stage.classList.add("pece");
    const ust = h("div.pad.scroll.pc-ust");
    const cv = h("canvas", { "aria-label": "Toplumdaki beş gelir dilimi" });
    const fill = h("div.fill", cv);
    const ozg = h("input", { type: "checkbox", checked: true });
    const fir = h("input", { type: "checkbox", checked: true });
    const btn = h("button.btn.primary", { type: "button", onclick: () => cek() }, "Peçeyi kaldır");
    const sonuc = h("div.pc-sonuc", { "aria-live": "polite" }, h("p.muted", "Peçe yerinde: toplumdaki yerinizi henüz bilmiyorsunuz."));
    stage.append(ust, fill, h("div.controls", h("label", ozg, "Eşit temel özgürlükler"), h("label", fir, "Fırsat eşitliği"), h("span.spacer"), btn), sonuc);

    let dag = "fark", yer = -1, anim = 0, cekilis = [0, 0, 0, 0, 0], st;
    const secim = Oy.secim(ust, {
      anahtar: "s-pece.dagilim", soru: "Peçenin ardında hangi gelir dağılımını seçerdiniz?",
      secenekler: [
        { v: "esit", ad: "Tam eşitlik", ilke: "Kimse ötekinden fazlasına sahip olmamalı; eşitlik kendi başına bir değerdir.", filozof: [],
          lehte: "Kura nasıl çıkarsa çıksın, kimse geride kalmaz; kıskançlık ve tahakküm için zemin kalmaz.",
          itiraz: "Rawls'a göre bazı eşitsizlikler (çalışmayı ve yeniliği teşvik eden) en yoksulu bile tam eşitlikten daha iyi duruma getirebilir." },
        { v: "fark", ad: "Fark ilkesi", ilke: "Maximin: en kötü konumdakinin durumunu en iyi hâle getiren düzeni seç.", filozof: ["rawls"],
          lehte: "Peçenin ardında en kötü yere düşebileceğinizi bilirsiniz; bu risk geri alınamaz bir hayatı ilgilendirir.",
          itiraz: "Harsanyi'ye göre rasyonel kişi peçe ardında da beklenen ortalama refahı en yükseğe çıkarır; en kötüye takılmak aşırı temkinliliktir." },
        { v: "faydaci", ad: "En yüksek toplam", ilke: "Doğru düzen, toplam (ya da ortalama) refahı en büyük yapan düzendir.", filozof: ["bentham", "mill"],
          lehte: "Toplam servet en büyük; ortalama bir kişi bu toplumda daha iyi yaşar.",
          itiraz: "Rawls: faydacılık kişiler arasındaki ayrımı ciddiye almaz; birinin acısı başkasının kazancıyla \"telafi\" edilemez." },
        { v: "taban", ad: "Güvenceli taban", ilke: "Herkese yeterli bir taban güvence altına alınsın; bunun üstünde eşitsizlik serbest olsun.", filozof: ["rousseau"],
          lehte: "Hem teşviki korur hem de kimsenin yoksulluk yüzünden kendini satmak zorunda kalmamasını hedefler.",
          itiraz: "\"Yeterli\" olanın sınırını kim çizecek? Tabanın üstündeki büyük farklar siyasi güce de dönüşebilir." },
      ],
      sonra: (v) => { dag = v; yer = -1; cekilis = [0, 0, 0, 0, 0]; sonuc.innerHTML = ""; sonuc.append(h("p.muted", "Peçe yerinde: toplumdaki yerinizi henüz bilmiyorsunuz.")); draw(); },
    });
    if (Oy.get("s-pece.dagilim")) dag = Oy.get("s-pece.dagilim");

    function cek() {
      cancelAnimationFrame(anim);
      const hedef = Math.floor(Math.random() * 5);
      const azinlik = Math.random() < 0.3;
      const s0 = performance.now(), dur = 1300;
      btn.disabled = true;
      (function tick(t) {
        const k = Math.min(1, (t - s0) / dur);
        // hızlı başlayıp yavaşlayan bir tarama
        const adim = Math.floor(L.ease(k) * 14);
        yer = k < 1 ? (hedef + adim) % 5 : hedef;
        draw();
        if (k < 1) anim = requestAnimationFrame(tick);
        else { btn.disabled = false; cekilis[hedef]++; yaz(hedef, azinlik); draw(); }
      })(s0);
    }
    function yaz(i, azinlik) {
      const v = DAGILIM[dag][i];
      sonuc.innerHTML = "";
      const satir = [h("p", h("b", `${DILIM[i]}: geliriniz ${v}.`), ` Bu toplumdaki en düşük gelir ${Math.min(...DAGILIM[dag])}, ortalama ${Math.round(DAGILIM[dag].reduce((a, b) => a + b) / 5)}.`)];
      if (azinlik) satir.push(h("p", ozg.checked ? "Ayrıca bir azınlık inancına mensupsunuz. Eşit temel özgürlükler sayesinde inancınızı açıkça yaşayabiliyorsunuz." : "Ayrıca bir azınlık inancına mensupsunuz. Temel özgürlükler güvence altında değil: çoğunluk inancınızı kısıtlayabilir."));
      if (i <= 1) satir.push(h("p", fir.checked ? "Fırsat eşitliği sayesinde çocuklarınızın iyi bir eğitime ve her mesleğe erişimi var." : "Fırsat eşitliği yok: alt dilimden yukarı çıkmak çocuklarınız için çok zor."));
      const n = cekilis.reduce((a, b) => a + b, 0);
      if (n > 1) satir.push(h("p.muted", `${n} çekilişte: ${cekilis.map((c, k) => `${k + 1}. dilim ${c}`).join(", ")}.`));
      sonuc.append(...satir);
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const vals = DAGILIM[dag], max = 200;
      const pad = 18, bw = (w - pad * 2) / 5, base = H - 34;
      vals.forEach((v, i) => {
        const x = pad + i * bw + bw * 0.18, bwi = bw * 0.64;
        const hh = (v / max) * (base - 34);
        const on = i === yer;
        ctx.fillStyle = on ? rgba(C.brass, 0.85) : rgba(C.ink, 0.12);
        ctx.fillRect(x, base - hh, bwi, hh);
        ctx.strokeStyle = on ? "#E2C27E" : rgba(C.brass, 0.5); ctx.lineWidth = on ? 2 : 1;
        ctx.strokeRect(x + 0.5, base - hh + 0.5, bwi - 1, hh - 1);
        ctx.fillStyle = on ? C.ink : C.ink2; ctx.font = `600 14px ${FONT.ui}`; ctx.textAlign = "center";
        ctx.fillText(String(v), x + bwi / 2, base - hh - 8);
        ctx.font = `400 11.5px ${FONT.ui}`; ctx.fillStyle = C.muted;
        ctx.fillText(`${i + 1}. dilim`, x + bwi / 2, base + 16);
        if (on) { ctx.font = `700 13px ${FONT.ui}`; ctx.fillStyle = "#E2C27E"; ctx.fillText("siz", x + bwi / 2, base - hh - 26); }
      });
      ctx.strokeStyle = rgba(C.brass, 0.4); ctx.beginPath(); ctx.moveTo(pad, base + 0.5); ctx.lineTo(w - pad, base + 0.5); ctx.stroke();
      // peçe: henüz çekilmediyse dilimlerin üzerinde dalgalı ince tül
      if (yer < 0) {
        ctx.fillStyle = "rgba(14,24,48,.55)";
        ctx.beginPath(); ctx.moveTo(pad, 26);
        for (let x = pad; x <= w - pad; x += 10) ctx.lineTo(x, 26 + Math.sin(x * 0.05) * 5);
        ctx.lineTo(w - pad, base); ctx.lineTo(pad, base); ctx.fill();
        ctx.strokeStyle = rgba(C.brass, 0.25);
        for (let x = pad + 14; x < w - pad; x += 22) { ctx.beginPath(); ctx.moveTo(x, 30); ctx.quadraticCurveTo(x + 6, base / 2, x, base); ctx.stroke(); }
        ctx.font = `italic 15px ${FONT.body}`; ctx.fillStyle = C.ink; ctx.textAlign = "center";
        ctx.fillText("cehalet peçesi", w / 2, 52);
      }
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    return { enter: draw };
  };

  /* --- Doğa durumu: devletin gücü ile güvenlik ve özgürlük --- */
  D.dogadurumu = function (stage) {
    stage.classList.add("doga");
    const ust = h("div.pad.scroll.dd-ust");
    const cv = h("canvas", { "aria-label": "Doğa durumu simülasyonu" });
    const etiket = h("div.dd-etiket");
    const fill = h("div.fill", cv, etiket);
    const olc = h("div.oy-bars.dd-olc");
    let guc = 0.1;
    const sl = L.slider({ label: "Devletin gücü", min: 0, max: 100, step: 1, value: 10, fmt: (v) => Math.round(v) + "", oninput: (v) => { guc = v / 100; metrik(); } });
    sl.input.addEventListener("change", () => Oy.set("s-doga-durumu.guc", guc < 0.25 ? "az" : guc < 0.7 ? "orta" : "cok"));
    stage.append(ust, fill, h("div.controls", sl, h("span.spacer"), h("a.dd-bag", { href: "#ibn-haldun" }, "İbn Haldun'un döngüsü"), h("a.dd-bag", { href: "#farabi" }, "Fârâbî'nin şehri")), h("div.pad.dd-alt", olc));
    Oy.secim(ust, {
      anahtar: "s-doga-durumu.dogal", soru: "Devlet olmasaydı insanlar nasıl yaşardı?",
      secenekler: [
        { v: "savas", ad: "Herkes herkese karşı", ilke: "Güvensizlik ortamında saldırmak akılcıdır; düzeni ancak ortak bir güç kurar.", filozof: ["hobbes", "xunzi"],
          itiraz: "Antropoloji, devletsiz pek çok toplumun kurallar ve uzlaşma yollarıyla görece barış içinde yaşadığını gösteriyor." },
        { v: "haklar", ad: "Haklar var, güvencesi yok", ilke: "Doğa yasası insanlara yaşam, özgürlük ve mülk hakkı verir; devlet bunları güvenceye almak için kurulur.", filozof: ["locke"],
          itiraz: "Hakların devletten önce var olduğunu kim belirler? Hobbes'a göre ortak bir yargıç olmadan \"hak\" sözcüğü boştur." },
        { v: "baris", ad: "Barışçıl, toplum bozar", ilke: "İnsan doğası iyiye yatkındır; çatışmayı mülkiyet ve eşitsizlik getirir.", filozof: ["rousseau", "mengzi"],
          itiraz: "Arkeolojik kanıtlar devlet öncesi toplumlarda da ciddi şiddet oranları olduğunu gösteriyor; tablo karışık." },
      ],
    });
    const bars = {};
    [["guvenlik", "Güvenlik"], ["ozgurluk", "Özgürlük"], ["refah", "Refah"]].forEach(([k, ad]) => {
      const i = h("i"); bars[k] = { i, v: h("span.val") };
      olc.append(h("div.oy-bar", h("span", ad), h("span.tr", i), bars[k].v));
    });
    function deger() {
      const a = 0.5 * Math.pow(1 - guc, 2) + 0.02; // saldırı olasılığı
      const guv = 1 - a / 0.52;
      const ozg = (1 - 0.85 * guc * guc) * (0.45 + 0.55 * guv);
      const ref = guv * (1 - 0.55 * Math.pow(guc, 1.6));
      return { a, guv, ozg, ref };
    }
    function metrik() {
      const m = deger();
      [["guvenlik", m.guv], ["ozgurluk", m.ozg], ["refah", m.ref]].forEach(([k, v]) => { bars[k].i.style.width = Math.round(v * 100) + "%"; bars[k].v.textContent = Math.round(v * 100); });
      etiket.textContent = guc < 0.2 ? "Hobbes'un doğa durumu: herkes herkese karşı" : guc < 0.65 ? "Locke: hakları koruyan sınırlı devlet" : guc < 0.88 ? "Güçlü egemen" : "Leviathan: tam düzen, dar özgürlük";
    }
    metrik();
    const r = L.rng(5);
    const A = Array.from({ length: 46 }, () => ({ x: r(), y: r(), vx: r() - 0.5, vy: r() - 0.5, m: 1 }));
    const flas = [];
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      // devletin ızgarası: güç arttıkça belirginleşir
      ctx.strokeStyle = rgba(C.brass, 0.05 + guc * 0.35); ctx.lineWidth = 1;
      const step = lerp(90, 36, guc);
      ctx.beginPath();
      for (let x = step / 2; x < w; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = step / 2; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();
      flas.forEach((f) => {
        ctx.strokeStyle = rgba("#E0524A", f.t); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(f.a.x * w, f.a.y * H); ctx.lineTo(f.b.x * w, f.b.y * H); ctx.stroke();
      });
      A.forEach((p) => {
        ctx.fillStyle = rgba(C.ink, 0.85);
        ctx.beginPath(); ctx.arc(p.x * w, p.y * H, 2.5 + p.m * 2.2, 0, 7); ctx.fill();
      });
    }
    function adim(dt) {
      const m = deger();
      const hiz = 0.06 * (1 - 0.75 * guc);
      A.forEach((p) => {
        p.x += p.vx * hiz * dt; p.y += p.vy * hiz * dt;
        if (p.x < 0.02 || p.x > 0.98) p.vx *= -1;
        if (p.y < 0.03 || p.y > 0.97) p.vy *= -1;
        p.x = clamp(p.x, 0.02, 0.98); p.y = clamp(p.y, 0.03, 0.97);
        p.m = Math.min(1.4, p.m + dt * 0.04 * (1 - 0.5 * guc));
      });
      if (r() < m.a * dt * 6) {
        // saldırı yalnızca yakındaki biriyle olur
        const a = A[Math.floor(r() * A.length)];
        let b = null, bd = 0.22;
        A.forEach((q) => { if (q === a) return; const d = Math.hypot(q.x - a.x, q.y - a.y); if (d < bd) { bd = d; b = q; } });
        if (b) { flas.push({ a, b, t: 1 }); b.m = Math.max(0.2, b.m - 0.6); }
      }
      flas.forEach((f) => (f.t -= dt * 2.2));
      while (flas.length && flas[0].t <= 0) flas.shift();
      draw();
    }
    st = L.canvas(cv, draw);
    const lp = L.loop(adim);
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };
})();
