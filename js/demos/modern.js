/* 10. Modern felsefe deneyleri: kuşku katmanları, terazi, Kant'ın gözlüğü, diyalektik, ebedî dönüş */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;

  /* --- Descartes: kuşku katmanları --- */
  const KATMAN = [
    { ad: "Duyular", btn: "Duyulardan kuşku duy", inan: ["kare kule", "elimdeki kâğıt", "şöminedeki ateş", "kuşların sesi"],
      metin: "Duyular bazen aldatır: uzaktan yuvarlak görünen kule yaklaşınca kare çıkar. Bir kez aldatandan bütünüyle emin olamam." },
    { ad: "Rüya", btn: "Rüyadan kuşku duy", inan: ["bedenim var", "uyanığım", "ellerim var"],
      metin: "Rüyada da ateşin başında oturduğumu gördüm. Uyanıklığı rüyadan ayıracak kesin bir işaretim yok. Belki bedenim bile bir düştür." },
    { ad: "Kötü cin", btn: "Kötü cini düşün", inan: ["2 + 3 = 5", "karenin dört kenarı var"],
      metin: "Ya çok güçlü ve aldatıcı bir varlık, en basit hesaplarda bile beni yanıltıyorsa? Matematik bile kuşkudan kurtulamaz." },
  ];
  D.kusku = function (stage) {
    const cv = h("canvas", { "aria-label": "Kuşku katmanları" });
    const fill = h("div.fill", cv);
    const info = h("div.ks-info.pad.scroll");
    let kalk = [0, 0, 0], hedef = [0, 0, 0], cog = 0, t = 0;
    const btns = KATMAN.map((k, i) => h("button.btn", { type: "button", onclick: () => kaldir(i) }, k.btn));
    const reset = h("button.btn.ghost", { type: "button", onclick: () => { hedef = [0, 0, 0]; secim.style.display = "none"; yaz(); } }, "Baştan başla");
    stage.append(fill, h("div.controls", ...btns, h("span.spacer"), reset), info);
    const metin = h("p.ks-metin");
    info.append(metin);
    const secim = h("div");
    info.append(secim);
    Oy.secim(secim, {
      anahtar: "descartes.cogito", soru: "Geriye kalan şeyden kuşku duyabilir misiniz?",
      secenekler: [
        { v: "kesin", ad: "Hayır, bu kesin", ilke: "Kuşkunun kendisi bir düşünmedir; düşünen bir şeyin var olduğu kesindir.", filozof: ["descartes", "augustinus"],
          itiraz: "Lichtenberg: Kesin olan yalnızca \"düşünülüyor\"dur. Düşünceyi bir \"ben\"e bağlamak ek bir varsayımdır." },
        { v: "ben-yok", ad: "Düşünce kesin, \"ben\" değil", ilke: "İçe baktığımızda bir benlik değil, birbirini izleyen algılar buluruz.", filozof: ["hume", "buda"],
          itiraz: "Algılar kimin algısı? \"Düşünce var ama düşünen yok\" demek dilin bile zorlandığı bir iddia." },
        { v: "dil", ad: "Cogito bile dile dayanır", ilke: "Dilsiz, özel bir kesinlik yoktur: \"düşünmek\" ve \"var olmak\" sözcüklerini ortak bir dilden öğrendik.", filozof: ["wittgenstein"],
          itiraz: "Kesinliği ifade etmek için dile ihtiyaç duymak, kesinliğin kendisinin dile bağlı olduğunu göstermez." },
      ],
    });
    function kaldir(i) {
      for (let k = 0; k <= i; k++) hedef[k] = 1; // dıştaki katmanlar önce gider
      yaz();
    }
    function yaz() {
      const n = hedef.reduce((a, b) => a + b, 0);
      btns.forEach((b, i) => b.classList.toggle("on", !!hedef[i]));
      if (!n) metin.innerHTML = "Üç katman inanç sizi çevreliyor. Her birinden kuşku duymak için bir neden bulun.";
      else if (n < 3) metin.innerHTML = `<b>${KATMAN[n - 1].ad}:</b> ${KATMAN[n - 1].metin}`;
      else metin.innerHTML = `<b>${KATMAN[2].ad}:</b> ${KATMAN[2].metin} <br><b>Ama:</b> aldatılıyorsam bile, aldatılan biri var. Kuşku duyduğum anda düşünüyorum. <em>Düşünüyorum, öyleyse varım.</em>`;
      secim.style.display = n === 3 ? "" : "none";
    }
    yaz();
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, cy = H / 2, R = Math.min(w, H) * 0.46;
      const radii = [R, R * 0.74, R * 0.5];
      KATMAN.forEach((k, i) => {
        const r0 = radii[i], r1 = i < 2 ? radii[i + 1] : R * 0.26;
        const g = kalk[i];
        const col = ["#79AEEA", "#A48BE6", "#E0524A"][i];
        ctx.globalAlpha = 1 - g * 0.75;
        ctx.fillStyle = rgba(col, 0.08 + 0.05 * (2 - i));
        ctx.beginPath(); ctx.arc(cx, cy, r0, 0, Math.PI * 2); ctx.moveTo(cx + r1, cy); ctx.arc(cx, cy, r1, 0, Math.PI * 2, true); ctx.fill();
        ctx.strokeStyle = rgba(col, 0.6); ctx.lineWidth = 1;
        ctx.setLineDash(g > 0.5 ? [3, 6] : []);
        ctx.beginPath(); ctx.arc(cx, cy, r0, 0, 7); ctx.stroke(); ctx.setLineDash([]);
        // katman adı
        ctx.font = `600 13px ${FONT.ui}`; ctx.fillStyle = col; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(k.ad, cx, cy - (r0 + r1) / 2);
        // inançlar halka boyunca, kuşkuyla dağılır
        ctx.font = `italic 400 ${i === 0 ? 14 : 13}px ${FONT.body}`;
        k.inan.forEach((s, j) => {
          const a = -Math.PI / 2 + 0.75 + ((j + 0.5) / k.inan.length) * (Math.PI * 2 - 1.5);
          const rr = (r0 + r1) / 2 + g * 30 * Math.sin(j * 7 + i);
          const x = cx + Math.cos(a) * rr + g * Math.cos(a) * 40, y = cy + Math.sin(a) * rr + g * Math.sin(a) * 40;
          ctx.fillStyle = rgba(C.ink, 0.85 * (1 - g));
          ctx.fillText(s, x, y);
          if (g > 0.2) { const tw = ctx.measureText(s).width; ctx.strokeStyle = rgba(C.ink, 0.5 * (1 - g)); ctx.beginPath(); ctx.moveTo(x - tw / 2, y); ctx.lineTo(x - tw / 2 + tw * Math.min(1, g * 1.5), y); ctx.stroke(); }
        });
        ctx.globalAlpha = 1;
      });
      // çekirdek: düşünen ben
      const rc = R * 0.26;
      const glow = cog * (0.8 + 0.2 * Math.sin(t * 2.4));
      ctx.fillStyle = rgba(C.brass, 0.12 + 0.35 * glow);
      ctx.beginPath(); ctx.arc(cx, cy, rc * (1 + 0.15 * glow), 0, 7); ctx.fill();
      ctx.strokeStyle = C.brass; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, rc, 0, 7); ctx.stroke();
      ctx.fillStyle = C.ink;
      const l1 = cog > 0.5 ? "düşünüyorum," : "kuşku", l2 = cog > 0.5 ? "öyleyse varım" : "duyuyorum";
      let fs = 24;
      ctx.font = `400 ${fs}px ${FONT.display}`;
      fs = Math.max(10, Math.min(24, fs * (rc * 1.6) / Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width)));
      ctx.font = `400 ${fs}px ${FONT.display}`;
      ctx.fillText(l1, cx, cy - fs * 0.6);
      ctx.fillText(l2, cx, cy + fs * 0.6);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      kalk = kalk.map((v, i) => v + (hedef[i] - v) * Math.min(1, dt * 3));
      const tc = hedef.every(Boolean) ? 1 : 0;
      cog += (tc - cog) * Math.min(1, dt * 2);
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Akıl mı, deneyim mi: iki kefeli terazi --- */
  const KART = [
    { y: "akil", m: "Üçgenin iç açılarının toplamını ölçerek değil, kanıtlayarak biliriz.", f: "Descartes, Leibniz" },
    { y: "deney", m: "Doğuştan kör biri kırmızının ne olduğunu bilmez.", f: "Locke" },
    { y: "akil", m: "Mükemmel bir daire hiç görmedik, ama ne olduğunu biliyoruz.", f: "Platon, Descartes" },
    { y: "deney", m: "Ahlak kuralları kültürden kültüre değişir; doğuştan olsalardı herkeste aynı olurdu.", f: "Locke" },
    { y: "akil", m: "Balmumu eriyince rengi, kokusu, biçimi değişir; onun aynı balmumu olduğunu akılla kavrarız.", f: "Descartes" },
    { y: "deney", m: "Ateşin yakacağını, ona ilk kez dokunan bir bebek bilemez.", f: "Hume" },
    { y: "akil", m: "\"Her olayın bir nedeni vardır\" ilkesini hiçbir deneyim tam kanıtlayamaz, ama hep kullanırız.", f: "Leibniz" },
    { y: "deney", m: "Hiç tatmadığımız bir meyvenin tadını yalnızca düşünerek bulamayız.", f: "Locke" },
  ];
  const HUKUM = {
    akil: { ad: "Terazi akıldan yana", ilke: "En sağlam bilgi akıldan gelir; deneyim bilgiyi yalnızca tetikler.", filozof: ["descartes", "leibniz", "spinoza"],
      itiraz: "Locke: Doğuştan fikirler olsaydı çocuklarda ve bütün insanlarda bulunurdu; oysa bulamıyoruz." },
    deney: { ad: "Terazi deneyimden yana", ilke: "Zihindeki her fikir sonunda duyulardan ve iç gözlemden gelir.", filozof: ["locke", "hume", "berkeley"],
      itiraz: "Leibniz: Deneyim yalnızca \"şimdiye kadar böyle oldu\" der. Matematiğin zorunlu doğrularını deneyimden çıkaramayız." },
    denge: { ad: "Terazi dengede", ilke: "Bilgi deneyimle başlar, ama zihnin kendi biçimleri olmadan kurulamaz.", filozof: ["kant"],
      itiraz: "Bu uzlaşmanın bedeli: Şeyleri kendilerinde değil, yalnızca bize göründükleri hâliyle bilebiliriz." },
  };
  D.terazi = function (stage) {
    const cv = h("canvas", { "aria-label": "Terazi" });
    const tSol = h("ul.tr-kefe.sol"), tSag = h("ul.tr-kefe.sag");
    const fill = h("div.fill.tr-terazi", cv, tSol, tSag);
    const kartlar = h("div.tr-kartlar");
    const out = h("div.tr-out", { "aria-live": "polite" });
    stage.append(fill, h("div.pad.scroll.tr-alt", kartlar, out));
    let aci = 0, hedefAci = 0;
    const kefe = { akil: [], deney: [] };
    KART.forEach((k, i) => {
      const el = h("button.kart.tr-kart", { type: "button", "data-i": i }, k.m);
      kartlar.append(el);
      L.surukle(el, { hedefler: [fill], onDrop: (t) => { if (t) koy(i, el); } });
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); koy(i, el); } });
    });
    function koy(i, el) {
      const k = KART[i];
      kefe[k.y].push(i);
      el.remove();
      const li = h("li", { title: "Geri almak için tıklayın" }, h("span", k.m), h("small", k.f));
      li.addEventListener("click", () => { kefe[k.y] = kefe[k.y].filter((x) => x !== i); li.remove(); kartlar.append(el); guncelle(); });
      (k.y === "akil" ? tSol : tSag).append(li);
      guncelle();
    }
    function guncelle() {
      const a = kefe.akil.length, d = kefe.deney.length;
      hedefAci = clamp((d - a) * 0.09, -0.32, 0.32);
      out.innerHTML = "";
      if (a + d < 2) { out.append(h("p.muted", "En az iki kart koyun.")); return; }
      const v = a > d ? "akil" : d > a ? "deney" : "denge";
      Oy.set("rasyonalist-empirist.egilim", v);
      out.append(h("h4", HUKUM[v].ad + ` (${a} : ${d})`), Oy.ilkePanel(HUKUM[v]));
      const t = Oy.tutarlilikNotu("rasyonalist-empirist.egilim");
      if (t) out.append(t);
    }
    guncelle();
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, top = H * 0.16, L2 = Math.min(w * 0.36 - 40, 300);
      // direk
      ctx.strokeStyle = C.brass; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx, H * 0.92); ctx.moveTo(cx - 50, H * 0.92); ctx.lineTo(cx + 50, H * 0.92); ctx.stroke();
      ctx.fillStyle = C.brass; ctx.beginPath(); ctx.moveTo(cx - 9, top + 2); ctx.lineTo(cx + 9, top + 2); ctx.lineTo(cx, top - 12); ctx.fill();
      // kol
      const dx = Math.cos(aci) * L2, dy = Math.sin(aci) * L2;
      ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - dx, top - dy); ctx.lineTo(cx + dx, top + dy); ctx.stroke();
      // kefeler
      [[-1, "Akıl", "#79AEEA"], [1, "Deneyim", "#9CCB72"]].forEach(([sg, ad, col]) => {
        const px = cx + sg * dx, py = top + sg * dy;
        ctx.strokeStyle = rgba(C.brass, 0.7); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 40, py + 46); ctx.moveTo(px, py); ctx.lineTo(px + 40, py + 46); ctx.stroke();
        ctx.strokeStyle = col; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(px - 52, py + 46); ctx.quadraticCurveTo(px, py + 70, px + 52, py + 46); ctx.stroke();
        ctx.font = `400 17px ${FONT.display}`; ctx.fillStyle = col; ctx.textAlign = "center";
        ctx.fillText(ad, px, py + 92);
        ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted;
        ctx.fillText(sg < 0 ? "rasyonalizm" : "empirizm", px, py + 110);
        // ağırlık taşları
        const n = kefe[sg < 0 ? "akil" : "deney"].length;
        for (let i = 0; i < n; i++) { ctx.fillStyle = col; ctx.fillRect(px - 30 + (i % 4) * 16, py + 34 - Math.floor(i / 4) * 10, 12, 8); }
        // kefe listesini kefenin altına konumla
        const ul = sg < 0 ? tSol : tSag;
        ul.style.left = Math.max(4, px - 120) + "px"; ul.style.top = py + 120 + "px";
      });
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { const n = aci + (hedefAci - aci) * Math.min(1, dt * 4); if (Math.abs(n - aci) > 1e-4) { aci = n; draw(); } });
    return { enter: () => { lp.start(); draw(); }, leave: () => lp.stop() };
  };

  /* --- Kant: renkli gözlük --- */
  D.gozluk = function (stage) {
    const cv = h("canvas", { "aria-label": "Kant'ın gözlüğü" });
    const fill = h("div.fill", cv);
    const durum = h("p.gz-durum");
    const panel = h("div.pad.scroll.gz-panel", durum);
    const on = { uzay: false, zaman: false, neden: false };
    const ADLAR = { uzay: "Uzay", zaman: "Zaman", neden: "Nedensellik" };
    const btns = Object.keys(on).map((k) => h("button.btn", { type: "button", onclick: () => { on[k] = !on[k]; yaz(); } }, ADLAR[k]));
    stage.append(fill, h("div.controls", h("span.gz-et", "Gözlükler:"), ...btns), panel);
    const secim = h("div");
    panel.append(secim);
    Oy.secim(secim, {
      anahtar: "kant.gozluk", soru: "Gözlüğü çıkarıp dünyayı kendi hâliyle görebilir miyiz?",
      secenekler: [
        { v: "bicim", ad: "Hayır, hep bu biçimlerle görürüz", ilke: "Bilgimiz görünüşlerle sınırlıdır; \"kendinde şey\" bilinemez.", filozof: ["kant"],
          itiraz: "Hegel: Bilinemez bir \"kendinde şey\"den söz etmek bile, onun hakkında bir şey bildiğimizi varsayar." },
        { v: "bilim", ad: "Bilim bizi şeylerin kendisine yaklaştırır", ilke: "En iyi bilimsel kuramlarımız, dünyanın bizden bağımsız yapısını yaklaşık olarak betimler.", filozof: ["locke"],
          itiraz: "Bilim de gözlemden ve kavramlarımızdan geçer. Gözlüğün dışına nasıl çıktığımızı göstermek zordur." },
        { v: "yok", ad: "Gözlüğün ardında ayrı bir dünya yok", ilke: "Gerçeklik, deneyimden ya da zihinden bağımsız bir şey değildir.", filozof: ["berkeley", "hegel"],
          itiraz: "O hâlde herkesin aynı dünyayı görmesini ne açıklar? Berkeley bunun için Tanrı'ya başvurur." },
      ],
    });
    function yaz() {
      btns.forEach((b, i) => b.classList.toggle("on", on[Object.keys(on)[i]]));
      const n = Object.values(on).filter(Boolean).length;
      durum.innerHTML = !n ? "Gözlük yok: biçimsiz, sırasız bir duyu yağmuru. Kant'a göre bu kadarıyla bir şey <em>bilemeyiz</em>."
        : !on.uzay ? "Uzay olmadan hiçbir şeyin bir yeri yok: ne nesne var ne kenar."
        : !on.zaman ? "Uzay var ama zaman yok: topun bütün konumları aynı anda, üst üste."
        : !on.neden ? "Önce bir top hareket ediyor, sonra öteki. Ama yalnızca bir ardışıklık görüyoruz, bir bağ değil (Hume)."
        : "Uzay, zaman ve nedensellik birlikte: \"Birinci top ikincisini harekete geçirdi.\" Kant'a göre bu bağı zihin kurar; bu yüzden her olayın bir nedeni olduğunu deneyimden önce biliriz.";
      secim.style.display = n === 3 ? "" : "none";
    }
    yaz();
    const r = L.rng(11);
    const P = Array.from({ length: 220 }, (_, i) => ({ x: r(), y: r(), c: i % 3, k: i, tx: 0, ty: 0, px: r(), py: r() }));
    let t = 0, st, conv = 0;
    function sahne(w, H, s) { // s: 0..1 animasyon zamanı → topların konumları
      const y = H * 0.55, R = Math.min(w, H) * 0.07;
      const contact = 0.5;
      const ax = s < contact ? lerp(w * 0.12, w * 0.5 - 2 * R, s / contact) : w * 0.5 - 2 * R;
      const bx = s < contact ? w * 0.5 : lerp(w * 0.5, w * 0.86, (s - contact) / (1 - contact));
      return { y, R, ax, bx };
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const s = (t % 4) / 4;
      const frames = on.uzay ? (on.zaman ? [s] : [0.1, 0.35, 0.6, 0.85]) : [s];
      // masa çizgisi
      if (on.uzay) { const g = sahne(w, H, 0); ctx.strokeStyle = rgba(C.brass, 0.5); ctx.beginPath(); ctx.moveTo(w * 0.05, g.y + g.R + 1); ctx.lineTo(w * 0.95, g.y + g.R + 1); ctx.stroke(); }
      P.forEach((p, i) => {
        let x, y;
        if (!on.uzay) { x = (p.x + Math.sin(t * 3 + i) * 0.02) * w; y = (p.y + Math.cos(t * 2.3 + i) * 0.02) * H; }
        else {
          const fr = frames[i % frames.length];
          const g = sahne(w, H, fr);
          const ball = i % 2 ? g.bx : g.ax;
          const a = (i * 2.399) % 6.283, rr = Math.sqrt((i % 37) / 37) * g.R;
          x = ball + Math.cos(a) * rr; y = g.y + Math.sin(a) * rr;
          p.tx = x; p.ty = y;
        }
        p.px += ((x / w) - p.px) * 0.18; p.py += ((y / H) - p.py) * 0.18;
        const col = on.uzay ? (i % 2 ? "#E08A4F" : "#79AEEA") : ["#79AEEA", "#E08A4F", "#9CCB72"][p.c];
        ctx.globalAlpha = 0.9 * (1 - conv);
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.px * w, p.py * H, 2, 0, 7); ctx.fill();
      });
      // uzay gözlüğüyle duyu verisi iki nesneye (top) toplanır
      if (conv > 0.02) frames.forEach((fr) => {
        const g = sahne(w, H, fr);
        ctx.globalAlpha = conv * (frames.length > 1 ? 0.35 : 1);
        [[g.ax, "#79AEEA"], [g.bx, "#E08A4F"]].forEach(([x, col]) => {
          ctx.fillStyle = rgba(col, 0.22); ctx.strokeStyle = col; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(x, g.y, g.R, 0, 7); ctx.fill(); ctx.stroke();
        });
      });
      ctx.globalAlpha = 1;
      if (on.uzay && on.zaman && on.neden) {
        const g = sahne(w, H, 0.5);
        const k = s > 0.42 && s < 0.75 ? 1 : 0.35;
        ctx.strokeStyle = rgba("#E2C27E", k); ctx.fillStyle = rgba("#E2C27E", k); ctx.lineWidth = 2;
        const y0 = g.y - g.R - 26;
        ctx.beginPath(); ctx.moveTo(w * 0.32, y0); ctx.quadraticCurveTo(w * 0.5, y0 - 34, w * 0.68, y0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w * 0.68, y0); ctx.lineTo(w * 0.66, y0 - 10); ctx.lineTo(w * 0.655, y0 + 5); ctx.fill();
        ctx.font = `600 13px ${FONT.ui}`; ctx.textAlign = "center"; ctx.fillText("neden → sonuç", w * 0.5, y0 - 30); ctx.textAlign = "left";
      }
      // gözlük çerçevesi: takılı gözlük sayısınca renklenir
      const n = Object.values(on).filter(Boolean).length;
      if (n) {
        ctx.strokeStyle = rgba(C.brass, 0.25 + n * 0.2); ctx.lineWidth = 1.5;
        const rx = w * 0.22, ry = H * 0.16;
        [w * 0.27, w * 0.73].forEach((x) => { ctx.beginPath(); ctx.ellipse(x, H * 0.2, rx * 0.55, ry * 0.6, 0, 0, 7); ctx.stroke(); });
        ctx.beginPath(); ctx.moveTo(w * 0.27 + rx * 0.55, H * 0.2); ctx.quadraticCurveTo(w * 0.5, H * 0.14, w * 0.73 - rx * 0.55, H * 0.2); ctx.stroke();
        ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
        ctx.fillText(Object.keys(on).filter((k) => on[k]).map((k) => ADLAR[k]).join(" + "), w / 2, H * 0.2 + 4); ctx.textAlign = "left";
      }
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; conv += ((on.uzay ? 1 : 0) - conv) * Math.min(1, dt * 2.5); draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Hegel ve Marx: diyalektik zincirler --- */
  const ZINCIR = {
    varlik: { ad: "Varlık (Hegel)", adim: [
      ["Varlık", null, null, "Saf varlık: hiçbir belirlenimi yok. Yalnızca \"var\"."],
      ["Varlık", "Hiçlik", null, "Hiçbir belirlenimi olmayan şey, hiçlikten ayırt edilemez. Varlık, karşıtına geçer."],
      ["Varlık", "Hiçlik", "Oluş", "Varlık hiçliğe, hiçlik varlığa geçer. Bu geçişin kendisi oluştur: ikisi hem korunur hem aşılır."],
      ["Oluş", "Yok olma", "Belirli varlık", "Oluş bir sonuçta durulur: artık belirsiz bir \"var\" değil, belirli bir \"şey\" vardır."],
    ] },
    efendi: { ad: "Efendi ve köle (Hegel)", adim: [
      ["Bilinç", null, null, "Her bilinç, kendini ancak başka bir bilinç tarafından tanınarak doğrulayabilir."],
      ["Bilinç", "Bilinç", null, "İki bilinç karşılaşır; her biri tanınmak ister. Ölüm kalım mücadelesinde biri korkup boyun eğer."],
      ["Efendi", "Köle", null, "Efendi tanınır, ama tanınmayı kendisinin eşit saymadığı birinden alır. Köle ise korkuyla ve emekle dünyayı biçimlendirir."],
      ["Efendi", "Köle", "Bağımsız bilinç", "Beklenmedik dönüş: köle, emeğiyle ortaya koyduğu şeyde kendi bilincine varır. Bağımsızlık bağımlılığın içinden doğar."],
    ] },
    marx: { ad: "Tarih (Marx'ın şeması)", adim: [
      ["Feodalizm", null, null, "Toprak beyleri ve serfler: üretim toprağa bağlı."],
      ["Feodalizm", "Burjuvazi", null, "Ticaret ve yeni üretim araçları, eski düzenle çatışan yeni bir sınıfı büyütür."],
      ["Sermaye", "Ücretli emek", null, "Kapitalizm: sermaye sahipleri ile emeğini satanlar arasında yeni bir karşıtlık."],
      ["Sermaye", "Ücretli emek", "Sınıfsız toplum?", "Marx'ın öngörüsü: bu çatışma sınıfsız bir toplumla aşılacak. Bu, onun en çok tartışılan iddiasıdır."],
    ] },
  };
  D.diyalektik = function (stage) {
    const cv = h("canvas", { "aria-label": "Diyalektik" });
    const fill = h("div.fill", cv);
    const metin = h("p.dk-metin");
    const panel = h("div.pad.scroll.dk-panel", metin);
    let z = "varlik", i = 0, anim = 1, t = 0;
    const seg = L.seg(Object.entries(ZINCIR).map(([k, v]) => [k, v.ad]), z, (v) => { z = v; i = 0; anim = 0; yaz(); });
    const ileri = h("button.btn.primary", { type: "button", onclick: () => { i = (i + 1) % ZINCIR[z].adim.length; anim = 0; yaz(); } }, "İlerlet");
    stage.append(fill, h("div.controls", seg, h("span.spacer"), ileri), panel);
    const secim = h("div.dk-secim");
    panel.append(secim);
    Oy.secim(secim, {
      anahtar: "hegel-marx.tarih", soru: "Tarihi daha çok ne yönlendirir?",
      secenekler: [
        { v: "fikir", ad: "Fikirler ve özgürlük bilinci", ilke: "Tarih, insanların kendilerini ve özgürlüklerini kavrayışının gelişimidir.", filozof: ["hegel"],
          itiraz: "Marx: Fikirler boşlukta doğmaz. Kimin ne ürettiği ve neye sahip olduğu düşüncelerimizi biçimlendirir." },
        { v: "madde", ad: "Maddi üretim ilişkileri", ilke: "Toplumsal varlık bilinci belirler; tarihi sınıflar arasındaki çatışmalar yürütür.", filozof: ["marx"],
          itiraz: "Din, ulusal kimlik ya da bilimsel buluşlar gibi fikirler de ekonomiyi değiştirdi. Max Weber, Protestan ahlakının kapitalizmin doğuşunu biçimlendirdiğini savundu." },
        { v: "etkilesim", ad: "İkisi birbirini dönüştürür", ilke: "Tarihin tek bir motoru yoktur; fikirler ve maddi koşullar karşılıklı etkileşir.", filozof: [],
          itiraz: "Her şeyin her şeyi etkilediğini söylemek bir açıklama sayılır mı? İki düşünür de bu yüzden bir ağırlık merkezi seçti." },
      ],
    });
    function yaz() { const a = ZINCIR[z].adim[i]; metin.innerHTML = `<b>${i + 1}/${ZINCIR[z].adim.length}.</b> ${a[3]}`; }
    yaz();
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const [A, B, S] = ZINCIR[z].adim[i];
      const cx = w / 2, cy = H * 0.5, R = Math.min(w, H) * 0.16;
      const e = L.ease(Math.min(1, anim));
      const circ = (x, y, r, col, ad, al = 1) => {
        ctx.globalAlpha = al;
        ctx.fillStyle = rgba(col, 0.12); ctx.strokeStyle = col; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = C.ink; ctx.font = `400 ${Math.max(13, Math.min(20, r * 0.32))}px ${FONT.display}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(ad, x, y); ctx.globalAlpha = 1;
      };
      if (S) {
        // sentez: büyük halka, içinde öncekiler küçülerek korunur
        const big = R * lerp(1, 1.9, e);
        ctx.strokeStyle = rgba(C.brass, 0.25); ctx.setLineDash([2, 5]);
        ctx.beginPath(); ctx.arc(cx, cy, big * 1.15, 0, 7); ctx.stroke(); ctx.setLineDash([]);
        circ(cx, cy, big, "#E2C27E", "", 1);
        circ(cx - lerp(R * 1.3, big * 0.42, e), cy + big * 0.25 * e, lerp(R, R * 0.55, e), "#79AEEA", A);
        circ(cx + lerp(R * 1.3, big * 0.42, e), cy + big * 0.25 * e, lerp(R, R * 0.55, e), "#E0524A", B);
        ctx.fillStyle = "#E2C27E"; ctx.font = `400 ${Math.min(24, R * 0.4)}px ${FONT.display}`; ctx.textAlign = "center";
        ctx.fillText(S, cx, cy - big * 0.45);
        ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted;
        ctx.fillText("Aufhebung: hem kaldırılır hem saklanır hem yükseltilir", cx, Math.min(H - 12, cy + big + 26));
      } else if (B) {
        const d = lerp(R * 2.6, R * 1.3, e) + Math.sin(t * 3) * 3 * e;
        circ(cx - d, cy, R, "#79AEEA", A);
        circ(cx + d, cy, R, "#E0524A", B);
        ctx.strokeStyle = rgba("#E2C27E", 0.6 * e); ctx.lineWidth = 1;
        for (let k = 0; k < 6; k++) { const y = cy - R * 0.6 + k * R * 0.24; ctx.beginPath(); ctx.moveTo(cx - 6, y); ctx.lineTo(cx + 6, y + 4); ctx.stroke(); }
        ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.textAlign = "center"; ctx.fillText("çelişki, gerilim", cx, cy + R + 30);
      } else {
        circ(cx, cy, R * lerp(0.6, 1, e), "#79AEEA", A);
      }
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; anim = Math.min(1.2, anim + dt * 1.2); draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Kierkegaard ve Nietzsche: ebedî dönüş --- */
  const CIN = "Bu hayatı, şimdi yaşadığın ve yaşamış olduğun gibi, bir kez daha ve sayısız kez daha yaşaman gerekecek. İçinde yeni hiçbir şey olmayacak; her acı, her sevinç, her düşünce ve iç çekiş, sırasıyla, aynen geri dönecek…";
  const EVRE = [
    ["Estetik", "Anı ve hazzı kovalayan, sıkıntıdan kaçan yaşam. Seçmeden yaşamak."],
    ["Etik", "Kendini seçmek: görevler, bağlılıklar, sorumluluk. Evlilik onun örneğidir."],
    ["Dinî", "Akılla tam gerekçelendirilemeyen bir bağlılık; kişinin tek başına üstlendiği bir inanç."],
  ];
  D.ebedi = function (stage) {
    const cv = h("canvas", { "aria-label": "Ebedî dönüş" });
    const fill = h("div.fill", cv);
    const soz = h("p.eb-soz");
    const panel = h("div.pad.scroll.eb-panel");
    let k = 0, t = 0, dinle = false;
    const dinleBtn = h("button.btn.primary", { type: "button", onclick: () => { dinle = true; k = 0; } }, "Cini dinle");
    const evreInfo = h("p.eb-evre");
    const evre = L.seg(EVRE.map(([a], i) => [i, a]), -1, (i) => { evreInfo.innerHTML = `<b>${EVRE[i][0]} evre:</b> ${EVRE[i][1]}`; });
    stage.append(fill, h("div.controls", dinleBtn), panel);
    panel.append(soz);
    Oy.secim(panel, {
      anahtar: "kierkegaard-nietzsche.donus", soru: "Bu teklif karşısında ne yapardınız?",
      secenekler: [
        { v: "lanet", ad: "Lanetlerdim", ilke: "Hayat, olduğu gibi yeniden istenecek bir şey değildir; acı ağır basar.", filozof: ["schopenhauer"],
          itiraz: "Nietzsche'ye göre bu yanıt hayata \"hayır\" demektir: hayatı kendisi dışındaki bir ölçüye göre değerlendirmek." },
        { v: "kucak", ad: "Kucaklardım", ilke: "Amor fati: kaderini sevmek, hayatı olduğu gibi bütünüyle onaylamak.", filozof: ["nietzsche"],
          itiraz: "Haksızlıkları ve büyük acıları da sonsuz kez onaylamak ahlaken kabul edilebilir mi?" },
        { v: "bagli", ad: "Nasıl yaşadığıma bağlı", ilke: "Soru bir ölçüt olarak kullanılabilir: her seçimi, sonsuz kez yapmak isteyeceğin gibi yap.", filozof: ["kierkegaard", "nietzsche"],
          itiraz: "Hayatın büyük kısmı seçmediğimiz şeylerden oluşur. Bu ölçüt yalnızca seçebilecek durumda olanlar için mi geçerli?" },
      ],
    });
    panel.append(h("h4.eb-baslik", "Kierkegaard'ın yaşam evreleri"), evre, evreInfo);
    let st;
    const ANLAR = ["doğum", "ilk arkadaş", "bir kayıp", "bir sevinç", "bir hata", "bu an"];
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, cy = H / 2, R = Math.min(w, H) * 0.34;
      // sonsuz tekrar: iç içe soluk halkalar
      for (let i = 4; i >= 0; i--) {
        ctx.strokeStyle = rgba(C.brass, 0.08 + (4 - i) * 0.06); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, R + i * 9, 0, 7); ctx.stroke();
      }
      ANLAR.forEach((a, i) => {
        const ang = -Math.PI / 2 + (i / ANLAR.length) * Math.PI * 2;
        const x = cx + Math.cos(ang) * R, y = cy + Math.sin(ang) * R;
        ctx.fillStyle = C.brass; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fill();
        ctx.font = `italic 14px ${FONT.body}`; ctx.fillStyle = C.ink2; ctx.textAlign = Math.cos(ang) > 0.2 ? "left" : Math.cos(ang) < -0.2 ? "right" : "center";
        ctx.fillText(a, x + Math.cos(ang) * 14, y + Math.sin(ang) * 16 + 4);
      });
      const ang = -Math.PI / 2 + t * 0.6;
      ctx.fillStyle = "#E2C27E"; ctx.shadowColor = "#E2C27E"; ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R, 6, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
      ctx.font = `400 15px ${FONT.display}`; ctx.fillStyle = C.ink; ctx.textAlign = "center";
      const tur = Math.floor(t * 0.6 / (Math.PI * 2)) + 1;
      ctx.fillText(`${tur}. kez`, cx, cy - 6);
      ctx.font = `12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.fillText("ve yeniden", cx, cy + 14);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      if (dinle && k < CIN.length) { k = Math.min(CIN.length, k + dt * 70); soz.innerHTML = `<b>Cin:</b> ${CIN.slice(0, Math.floor(k))}`; }
      draw();
    });
    soz.innerHTML = "Bir gece, en yalnız anınızda bir cin yanınıza süzülür ve size bir şey söyler…";
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };
})();
