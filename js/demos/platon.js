/* 4. Platon deneyleri: mağara, mükemmel daire ve bölünmüş çizgi, ruh arabası */
(function () {
  const { h, C, FONT, rgba, clamp, lerp, ease } = L;
  const D = window.Demos;

  /* ================= Mağara ================= */
  const ADIM = [
    { ad: "Zincirli: duvardaki gölgeler", dugme: "Zinciri çöz ve arkasına döndür", yer: "515a–c",
      metin: "Mahkûmlar gölgelere ad verir, hangisinin önce geleceğini en iyi tahmin edeni ödüllendirir. Onlar için gerçek, bu gölgelerden ibarettir." },
    { ad: "Çözülmek: ateş ve nesneler", dugme: "Mağaradan çıkar", yer: "515c–e",
      metin: "Arkasına döndürülen mahkûmun gözleri ateşten acır. Az önce gördüklerinin boş şeyler olduğu söylense inanmaz; gölgeleri daha gerçek bulur." },
    { ad: "Yukarı çıkış", dugme: "Gözleri alışsın: yansımalara bak", yer: "515e–516a",
      metin: "Sarp yokuştan zorla yukarı çıkarılır. Gün ışığına çıkınca gözleri kamaşır; gerçek denen şeylerin hiçbirini göremez." },
    { ad: "Gölgeler ve yansımalar", dugme: "Geceyi bekle: ay ve yıldızlar", yer: "516a",
      metin: "Gözleri önce en kolayına alışır: gölgelere, sonra suda yansıyan insanlara ve nesnelere." },
    { ad: "Nesneler ve gece gökyüzü", dugme: "Güneşe bak", yer: "516a–b",
      metin: "Sonra nesnelerin kendisini görür. Geceleri ayı ve yıldızları seyretmek, gündüz güneşe bakmaktan kolaydır." },
    { ad: "Güneş", dugme: "Mağaraya geri dön", yer: "516b–c, 517b–c",
      metin: "En sonunda güneşi, sudaki yansımasını değil, kendi yerinde kendisi olarak görür ve mevsimleri, yılları yapanın o olduğunu anlar. Platon'a göre güneş, İyi ideasıdır." },
    { ad: "Geri dönüş", dugme: "Baştan başla", yer: "516e–517a",
      metin: "Mağaraya inip eski yerine oturan kişi karanlıkta göremez. Ötekiler onunla alay eder: yukarı çıkıp gözlerini bozmuş. Ellerinden gelse, kendilerini çözmeye kalkanı öldürürler." },
  ];
  // mahkûmun her adımdaki konumu ve oraya giden ara noktalar (sanal sahne 1000x600)
  const KONUM = [
    [[300, 540]],
    [[318, 532]],
    [[420, 540], [540, 520], [590, 380], [618, 230], [650, 168]],
    [[720, 168], [765, 168]],
    [[830, 168]],
    [[880, 168]],
    [[700, 168], [618, 230], [590, 380], [540, 520], [300, 540]],
  ];
  // kuklacıların taşıdığı nesneler: biçim, duvardaki gölgenin yatay konumu
  function sekil(ctx, k, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath();
    if (k === 0) { // at
      ctx.moveTo(-20, 0); ctx.bezierCurveTo(-20, -10, 10, -12, 14, -6); ctx.lineTo(22, -18); ctx.lineTo(26, -14); ctx.lineTo(20, -2);
      ctx.lineTo(16, 12); ctx.lineTo(13, 12); ctx.lineTo(12, 2); ctx.lineTo(-12, 2); ctx.lineTo(-14, 12); ctx.lineTo(-17, 12); ctx.lineTo(-18, 2);
      ctx.lineTo(-26, 6); ctx.closePath();
    } else if (k === 1) { // amfora
      ctx.moveTo(-4, -18); ctx.lineTo(4, -18); ctx.lineTo(4, -13); ctx.bezierCurveTo(14, -10, 14, 8, 2, 16); ctx.lineTo(-2, 16);
      ctx.bezierCurveTo(-14, 8, -14, -10, -4, -13); ctx.closePath();
      ctx.moveTo(5, -14); ctx.quadraticCurveTo(12, -16, 9, -6); ctx.lineTo(7, -7); ctx.quadraticCurveTo(9, -13, 5, -12);
    } else if (k === 2) { // mızraklı insan
      ctx.arc(0, -16, 4, 0, 7); ctx.moveTo(-5, -11); ctx.lineTo(5, -11); ctx.lineTo(4, 4); ctx.lineTo(6, 16); ctx.lineTo(2, 16); ctx.lineTo(0, 6);
      ctx.lineTo(-2, 16); ctx.lineTo(-6, 16); ctx.lineTo(-4, 4); ctx.closePath(); ctx.rect(9, -26, 1.6, 42);
    } else if (k === 3) { // ağaç
      ctx.ellipse(0, -8, 11, 13, 0, 0, 7); ctx.rect(-1.5, 2, 3, 14);
    } else { // kuş
      ctx.moveTo(-14, -4); ctx.quadraticCurveTo(-6, -12, 0, -2); ctx.quadraticCurveTo(6, -12, 14, -4); ctx.quadraticCurveTo(6, -6, 0, 2); ctx.quadraticCurveTo(-6, -6, -14, -4);
    }
    ctx.fill(); ctx.restore();
  }
  function insan(ctx, x, y, s, col, durus, yon = -1) { // oturan ya da ayaktaki figür
    ctx.save(); ctx.translate(x, y); ctx.scale(s * yon, s);
    ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = "round";
    if (durus === "otur") {
      ctx.beginPath(); ctx.arc(-2, -30, 6, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, -23); ctx.quadraticCurveTo(4, -12, 2, 0); ctx.lineTo(-12, 0); ctx.lineTo(-14, 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(-10, -8); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.arc(0, -44, 6, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, -37); ctx.lineTo(0, -14); ctx.moveTo(0, -14); ctx.lineTo(-5, 0); ctx.moveTo(0, -14); ctx.lineTo(5, 0);
      ctx.moveTo(0, -30); ctx.lineTo(durus === "bak" ? 7 : -7, durus === "bak" ? -42 : -20); ctx.moveTo(0, -30); ctx.lineTo(6, -20); ctx.stroke();
    }
    ctx.restore();
  }

  D.magara = function (stage) {
    const cv = h("canvas", { "aria-label": "Mağara alegorisi sahnesi" });
    const fill = h("div.fill", cv);
    const ileri = h("button.btn.primary.mg-ileri", { type: "button", onclick: () => git(adim === 6 ? 0 : adim + 1) });
    const geri = h("button.btn.ghost", { type: "button", "aria-label": "Önceki adım", onclick: () => adim > 0 && git(adim - 1) }, "‹");
    const noktalar = h("div.mg-noktalar", ADIM.map((a, i) => h("button", { type: "button", "aria-label": `${i + 1}. adım: ${a.ad}`, onclick: () => git(i) })));
    const yazi = h("div.mg-yazi.pad.scroll", { "aria-live": "polite" });
    stage.append(fill, h("div.controls", geri, ileri, h("span.spacer"), noktalar), yazi);

    let adim = 0, t = 0, gecis = 1, onceki = [300, 540], yol = [[300, 540]], kamas = 0;
    let st;

    function konum() {
      // gecis 0→1 boyunca ara noktalar üzerinde yürü
      const pts = [onceki, ...yol];
      const k = ease(clamp(gecis, 0, 1)) * (pts.length - 1);
      const i = Math.min(pts.length - 2, Math.floor(k));
      if (pts.length < 2) return pts[0];
      const f = k - i;
      return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)];
    }
    function git(i) {
      const p = konum();
      onceki = p;
      yol = i === adim + 1 ? KONUM[i] : [KONUM[i][KONUM[i].length - 1]];
      adim = i; gecis = 0;
      if (i === 2) kamas = 1;
      yaz();
    }
    let secim = null;
    function yaz() {
      const A = ADIM[adim];
      ileri.textContent = A.dugme;
      [...noktalar.children].forEach((b, i) => { b.classList.toggle("on", i === adim); b.classList.toggle("gecti", i < adim); });
      yazi.innerHTML = "";
      yazi.append(h("h4", h("span.mg-no", String(adim + 1)), A.ad), h("p", A.metin), h("p.mg-yer", "Devlet VII, " + A.yer));
      if (adim === 6) {
        secim = Oy.secim(yazi, {
          anahtar: "magara.don", soru: "Dışarıyı görmüş olsaydınız, mağaraya döner miydiniz?",
          secenekler: [
            { v: "don", ad: "Dönerdim ve anlatırdım", ilke: "Hakikati gören, onu başkalarıyla paylaşmakla yükümlüdür. Platon'un filozof-yöneticileri de bu yüzden mağaraya geri iner.", filozof: ["platon", "sokrates"],
              itiraz: "Dönen kişi anlaşılmayabilir, hatta zarar görebilir. Görmeyi kimseye zorla öğretemezsek, dönmenin anlamı ne?" },
            { v: "kal", ad: "Dışarıda kalırdım", ilke: "İyi hayat, kalabalığın kargaşasından uzakta, sakin bir bilgelikte yaşanır.", filozof: ["epikuros"],
              itiraz: "Platon'a göre yalnızca kendini kurtarmak adil değildir: kent, iyiyi görenlerin yönetmesine muhtaçtır." },
            { v: "suphe", ad: "Dışarısının da bir mağara olmadığından emin olamazdım", ilke: "Her uyanış yeni bir rüya olabilir; son bir \"dışarı\" olup olmadığını bilemeyiz.", filozof: ["zhuangzi", "descartes", "bostrom"],
              itiraz: "Platon için güneş son basamaktır. Kuşku hiç bitmezse, hiçbir şeyi bilemeyeceğimizi de bilemez miyiz?" },
          ],
        });
      }
    }
    yaz();

    function sahne() {
      const { w, h: H } = st;
      const s = Math.min(w / 1000, H / 600);
      return { s, ox: (w - 1000 * s) / 2, oy: (H - 600 * s) / 2 };
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      const { s, ox, oy } = sahne();
      const gece = adim === 4 ? clamp(gecis * 2, 0, 1) : adim === 5 ? clamp(1 - gecis * 2, 0, 1) : 0;
      ctx.clearRect(0, 0, w, H);
      // gökyüzü (bütün tuvali kaplar)
      const g = ctx.createLinearGradient(0, 0, 0, oy + 170 * s);
      g.addColorStop(0, L.mix("#2E4A7C", "#070D22", gece)); g.addColorStop(1, L.mix("#8FA4C6", "#121C3A", gece));
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, oy + 175 * s);
      ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s);
      // yıldızlar ve ay
      if (gece > 0) {
        ctx.fillStyle = rgba("#F3E3B3", gece);
        for (let i = 0; i < 60; i++) { const x = (i * 173) % 1000, y = 10 + ((i * 97) % 140); ctx.fillRect(x, y, 1.6, 1.6); }
        ctx.beginPath(); ctx.arc(720, 60, 16, 0, 7); ctx.fill();
        ctx.fillStyle = L.mix("#2E4A7C", "#070D22", gece); ctx.beginPath(); ctx.arc(728, 55, 14, 0, 7); ctx.fill();
      }
      // güneş
      const gunes = 1 - gece;
      if (gunes > 0) {
        const sg = ctx.createRadialGradient(890, 60, 4, 890, 60, adim === 5 ? 120 : 60);
        sg.addColorStop(0, rgba("#FFF4D6", gunes)); sg.addColorStop(0.25, rgba("#F3D27A", gunes * 0.9)); sg.addColorStop(1, "rgba(243,210,122,0)");
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(890, 60, adim === 5 ? 120 : 60, 0, 7); ctx.fill();
        if (adim === 5) {
          ctx.strokeStyle = rgba("#F3E3B3", 0.5 * gunes); ctx.lineWidth = 1.5;
          for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * 0.15; ctx.beginPath(); ctx.moveTo(890 + Math.cos(a) * 30, 60 + Math.sin(a) * 30); ctx.lineTo(890 + Math.cos(a) * 52, 60 + Math.sin(a) * 52); ctx.stroke(); }
        }
      }
      // toprak ve kaya
      ctx.fillStyle = "#1E2B4B";
      ctx.beginPath(); ctx.moveTo(-400, 128); ctx.bezierCurveTo(200, 110, 480, 120, 585, 150); ctx.lineTo(600, 172); ctx.lineTo(1400, 168); ctx.lineTo(1400, 900); ctx.lineTo(-400, 900); ctx.fill();
      ctx.strokeStyle = rgba(C.brass, 0.7); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(-400, 128); ctx.bezierCurveTo(200, 110, 480, 120, 585, 150); ctx.moveTo(660, 168); ctx.lineTo(1400, 168); ctx.stroke();
      // tepe üzerinde çimen çizgileri
      ctx.strokeStyle = rgba(C.brass, 0.25); ctx.lineWidth = 1;
      for (let x = 20; x < 560; x += 37) { const y = 128 - (x / 560) * 4 + (x > 400 ? (x - 400) * 0.13 : 0); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 3, y - 6); ctx.stroke(); }
      // mağara oyuğu
      const cave = new Path2D("M585 150 C520 210 420 236 250 248 C150 255 95 262 70 300 C52 360 52 470 70 525 C110 565 300 566 470 560 C540 555 575 520 588 440 C598 360 612 250 640 170 Z");
      const ig = ctx.createRadialGradient(470, 500, 10, 470, 500, 430);
      const atesG = 0.85 + 0.15 * Math.sin(t * 9) * Math.sin(t * 5.3);
      ig.addColorStop(0, rgba("#5A3518", 0.95 * atesG)); ig.addColorStop(0.45, "#1A1A2A"); ig.addColorStop(1, "#090E1E");
      ctx.fillStyle = ig; ctx.fill(cave);
      ctx.strokeStyle = rgba(C.brass, 0.8); ctx.lineWidth = 1.5; ctx.stroke(cave);
      // kaya dokusu
      ctx.strokeStyle = rgba(C.brass, 0.12);
      for (let i = 0; i < 18; i++) { const x = 30 + (i * 211) % 940, y = 300 + (i * 67) % 280; if (ctx.isPointInPath(cave, x, y)) continue; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18, y + 4); ctx.stroke(); }
      // arka duvardaki gölgeler
      ctx.save(); ctx.clip(cave);
      const wl = ctx.createLinearGradient(60, 0, 280, 0);
      wl.addColorStop(0, rgba("#C98A4A", 0.22 * atesG)); wl.addColorStop(1, "rgba(201,138,74,0)");
      ctx.fillStyle = wl; ctx.fillRect(55, 270, 230, 290);
      for (let k = 0; k < 5; k++) {
        const ph = (t * 0.07 + k / 5) % 1;
        const y = 330 + ((k * 53) % 120);
        const x = 260 - ph * 210;
        const a = Math.sin(ph * Math.PI);
        ctx.fillStyle = `rgba(6,8,16,${0.75 * a})`;
        sekil(ctx, k, x, y, 2.1);
        // kuklacının taşıdığı nesne: alçak duvarın üstünde
        ctx.fillStyle = rgba("#B79A6A", 0.85 * a);
        sekil(ctx, k, 395, 452 - ((k * 7) % 14), 0.7);
      }
      ctx.restore();
      // alçak duvar ve kuklacılar
      ctx.fillStyle = "#2B2A35"; ctx.strokeStyle = rgba(C.brass, 0.55); ctx.lineWidth = 1;
      ctx.fillRect(372, 470, 46, 88); ctx.strokeRect(372, 470, 46, 88);
      insan(ctx, 432, 554, 1.25, "#4A3E54", "ayak", 1);
      // ateş
      for (let i = 0; i < 3; i++) {
        const fh = 34 + i * 8 + Math.sin(t * (7 + i)) * 6;
        ctx.fillStyle = ["#E8743B", "#F3A44A", "#FFE1A0"][i];
        ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.moveTo(452 + i * 3, 548); ctx.quadraticCurveTo(448 + i * 4, 530 - fh * 0.3, 470, 548 - fh + i * 9); ctx.quadraticCurveTo(490 - i * 4, 530 - fh * 0.3, 488 - i * 3, 548); ctx.fill();
      }
      ctx.globalAlpha = 1;
      // öteki mahkûmlar ve zincirler
      [[235, 540], [355, 540]].forEach(([x, y]) => {
        insan(ctx, x, y, 1.45, "#5B5F78", "otur");
        ctx.strokeStyle = rgba("#9AA0B5", 0.6); ctx.lineWidth = 1; ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(x - 2, y - 24); ctx.lineTo(x - 2, y + 18); ctx.stroke(); ctx.setLineDash([]);
      });
      // bizim mahkûm
      const [px, py] = konum();
      const durus = adim === 0 ? "otur" : adim === 6 && gecis >= 1 ? "otur" : adim === 5 || adim === 4 ? "bak" : "ayak";
      const yon = adim === 0 || (adim === 6 && gecis >= 1) ? -1 : 1;
      if (durus === "otur") { ctx.strokeStyle = rgba("#9AA0B5", 0.6); ctx.lineWidth = 1; ctx.setLineDash([2, 2]); if (adim === 0) { ctx.beginPath(); ctx.moveTo(px - 2, py - 24); ctx.lineTo(px - 2, py + 18); ctx.stroke(); } ctx.setLineDash([]); }
      ctx.shadowColor = rgba(C.brass, 0.9); ctx.shadowBlur = 10;
      insan(ctx, px, py, durus === "otur" ? 1.5 : 1.25, "#E2C27E", durus, yon);
      ctx.shadowBlur = 0;
      // dışarı: ağaç, gölet ve yansıma
      const agac = (x, y, sc, al) => {
        ctx.globalAlpha = al; ctx.fillStyle = "#2F4A3A"; ctx.strokeStyle = rgba(C.brass, 0.6);
        ctx.beginPath(); ctx.ellipse(x, y - 34 * sc, 14 * sc, 30 * sc, 0, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#3A2C22"; ctx.fillRect(x - 2 * sc, y - 8 * sc, 4 * sc, 8 * sc); ctx.globalAlpha = 1;
      };
      agac(700, 168, 1, 1); agac(935, 168, 1.3, 1); agac(845, 168, 0.8, 1);
      ctx.fillStyle = L.mix("#4E86C6", "#13224A", gece); ctx.beginPath(); ctx.ellipse(780, 182, 46, 9, 0, 0, 7); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.ellipse(780, 182, 46, 9, 0, 0, 7); ctx.clip();
      ctx.translate(0, 364); ctx.scale(1, -1); agac(790, 182, 0.35, 0.45); ctx.restore();
      ctx.restore();

      // "Onun gözünden" penceresi
      const R = Math.min(w, H) * 0.17, cx = R + 14, cy = R + 14;
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
      icGorus(ctx, cx, cy, R, gece);
      ctx.restore();
      ctx.strokeStyle = C.brass; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
      ctx.lineWidth = 1;
      for (let i = 0; i < 48; i++) { const a = i / 48 * 6.283, r0 = R + (i % 4 ? 2 : 0), r1 = R + 6; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.stroke(); }
      ctx.font = `600 12px ${FONT.ui}`; ctx.fillStyle = C.ink; ctx.textAlign = "center";
      ctx.fillText("Onun gözünden", cx, cy + R + 22); ctx.textAlign = "left";
    }
    function icGorus(ctx, cx, cy, R, gece) {
      const x0 = cx - R, y0 = cy - R, d = 2 * R;
      if (adim === 0 || (adim === 6 && gecis >= 1)) {
        const karanlik = adim === 6;
        ctx.fillStyle = karanlik ? "#05070F" : "#3A2A20"; ctx.fillRect(x0, y0, d, d);
        for (let k = 0; k < 5; k++) {
          const ph = (t * 0.07 + k / 5) % 1, a = Math.sin(ph * Math.PI);
          ctx.fillStyle = `rgba(8,6,10,${(karanlik ? 0.25 : 0.85) * a})`;
          sekil(ctx, k, cx + R - ph * d, cy - R * 0.3 + ((k * 53) % 100) / 100 * R, R / 22);
        }
      } else if (adim === 1) {
        ctx.fillStyle = "#1A1210"; ctx.fillRect(x0, y0, d, d);
        const fg = ctx.createRadialGradient(cx, cy + R * 0.3, 2, cx, cy + R * 0.3, R * 1.2);
        fg.addColorStop(0, "#FFF0C8"); fg.addColorStop(0.3, "#F3A44A"); fg.addColorStop(1, "rgba(80,40,20,0)");
        ctx.fillStyle = fg; ctx.fillRect(x0, y0, d, d);
        ctx.fillStyle = "rgba(30,20,20,.7)"; sekil(ctx, Math.floor(t * 0.3) % 5, cx - R * 0.2, cy - R * 0.1, R / 30);
      } else if (adim === 2 || (adim === 6 && gecis < 1)) {
        const k = adim === 2 ? kamas : 0.5;
        ctx.fillStyle = adim === 2 ? L.mix("#8FA4C6", "#FFFFFF", k) : "#0A0A12"; ctx.fillRect(x0, y0, d, d);
      } else if (adim === 3) {
        ctx.fillStyle = "#4E86C6"; ctx.fillRect(x0, y0, d, d);
        for (let i = 0; i < 9; i++) { ctx.strokeStyle = "rgba(255,255,255,.18)"; ctx.beginPath(); ctx.moveTo(x0, cy - R + i * R / 4 + Math.sin(t * 2 + i) * 3); ctx.lineTo(x0 + d, cy - R + i * R / 4 + Math.sin(t * 2 + i + 1) * 3); ctx.stroke(); }
        ctx.fillStyle = "rgba(47,74,58,.75)"; ctx.beginPath(); ctx.ellipse(cx + Math.sin(t * 2) * 2, cy + R * 0.25, R * 0.25, R * 0.55, 0, 0, 7); ctx.fill();
        ctx.fillStyle = "rgba(30,20,20,.55)"; ctx.fillRect(cx - 3, cy - R * 0.45, 6, R * 0.2);
      } else if (adim === 4) {
        ctx.fillStyle = "#070D22"; ctx.fillRect(x0, y0, d, d);
        ctx.fillStyle = "#F3E3B3";
        for (let i = 0; i < 40; i++) { const x = x0 + ((i * 53) % 100) / 100 * d, y = y0 + ((i * 37) % 100) / 100 * d; ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2 + i); ctx.fillRect(x, y, 2, 2); }
        ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(cx + R * 0.3, cy - R * 0.3, R * 0.18, 0, 7); ctx.fill();
        ctx.fillStyle = "#070D22"; ctx.beginPath(); ctx.arc(cx + R * 0.38, cy - R * 0.36, R * 0.16, 0, 7); ctx.fill();
      } else if (adim === 5) {
        ctx.fillStyle = "#7FA0D0"; ctx.fillRect(x0, y0, d, d);
        const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, R);
        sg.addColorStop(0, "#FFFFFF"); sg.addColorStop(0.3, "#FFF0B8"); sg.addColorStop(1, "rgba(243,210,122,0.1)");
        ctx.fillStyle = sg; ctx.fillRect(x0, y0, d, d);
      }
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      if (gecis < 1) gecis = Math.min(1, gecis + dt / (yol.length > 1 ? 2.2 : 0.9));
      if (adim === 2) kamas = Math.max(0.15, kamas - dt * 0.18);
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* ================= İdealar: mükemmel daire ve bölünmüş çizgi ================= */
  const CIZGI = [
    { ad: "İmgeler", ek: "eikasia", oran: 1, dunya: 0, ornek: "Kuma çizilmiş bir dairenin gölgesi ya da sudaki yansıması.", metin: "En alt basamak: gölgeler, yansımalar, resimler. Onları gerçek sanmak, mağaradaki mahkûmun durumudur." },
    { ad: "Nesneler", ek: "pistis, inanç", oran: 2, dunya: 0, ornek: "Bir tabak, bir tekerlek, sizin çizdiğiniz daire.", metin: "Canlılar, eşyalar, doğal ve yapma her şey. Onlar hakkındaki kanılarımız sağlam görünür, ama hâlâ sanıdır (doksa)." },
    { ad: "Matematik", ek: "dianoia, akıl yürütme", oran: 2, dunya: 1, ornek: "Geometricinin ispatındaki daire: çizimi kullanır ama çizimden söz etmez.", metin: "Varsayımlardan sonuca giden düşünme. Görünür şekilleri araç olarak kullanır, asıl konusu ise düşünülen şekillerdir." },
    { ad: "Düşünülür: idealar", ek: "noesis, anlama", oran: 4, dunya: 1, ornek: "Dairenin kendisi: tam, değişmez, hiçbir yerde çizili olmayan.", metin: "En üst basamak: varsayımları da aşıp ilkelere, ideaların kendisine ve sonunda İyi ideasına yükselen akıl." },
  ];
  D.idealar = function (stage) {
    const pad = h("div.fill.id-pad");
    const cv = h("canvas", { "aria-label": "Daire çizim alanı" });
    cv.style.touchAction = "none"; cv.style.cursor = "crosshair";
    pad.append(cv);
    const skor = h("div.id-skor", h("b", ""), h("span", "Bir daire çizin"));
    pad.append(skor);
    const cizgi = h("div.id-cizgi", { role: "group", "aria-label": "Bölünmüş çizgi" });
    const alt = h("div.id-alt.pad.scroll", { "aria-live": "polite" });
    const toplam = CIZGI.reduce((a, b) => a + b.oran, 0);
    CIZGI.forEach((c, i) => cizgi.append(h("button.id-par", { type: "button", "data-d": c.dunya, style: { flex: c.oran / toplam }, onclick: () => secCizgi(i) }, c.ad, h("small", c.ek))));
    const etiket = h("div.id-dunya", h("span", "Görünür dünya · sanı (doksa)"), h("span", "Düşünülür dünya · bilgi (episteme)"));
    stage.append(pad, h("div.id-cizgi-wrap", etiket, cizgi), alt);
    function secCizgi(i) {
      [...cizgi.children].forEach((b, k) => b.classList.toggle("on", k === i));
      const c = CIZGI[i];
      alt.innerHTML = "";
      alt.append(h("h4", c.ad, h("small", " · " + c.ek)), h("p", c.metin), h("p.id-ornek", "Daire örneği: " + c.ornek));
      oySoru();
    }
    function oySoru() {
      Oy.secim(alt, {
        anahtar: "idealar.daire", soru: "Mükemmel daireyi hiç görmediğimiz hâlde nereden biliyoruz?",
        secenekler: [
          { v: "anamnesis", ad: "Akıl onu duyulardan bağımsız kavrar", ilke: "Matematik bilgisi deneyime dayanmaz; akıl, değişmeyen biçimleri doğrudan tanır (Platon'a göre hatırlar).", filozof: ["platon", "descartes", "leibniz"],
            itiraz: "Hiç daire biçimli bir şey görmemiş biri \"daire\" kavramını edinebilir miydi?" },
          { v: "soyutlama", ad: "Gördüğümüz yuvarlak şeylerden soyutlarız", ilke: "Bilgi duyularla başlar; zihin birçok örnekteki ortak biçimi ayırıp kavram yapar.", filozof: ["aristoteles", "locke"],
            itiraz: "Hiçbir örnek mükemmel değilse, kusursuzluk fikri hangi örnekten soyutlanabilir?" },
          { v: "uzlasim", ad: "Mükemmel daire bizim bir tanımımızdır", ilke: "Genel kavramlar dünyada ayrı varlıklar değil, bizim kullandığımız adlar ve tanımlardır.", filozof: ["ockham", "wittgenstein"],
            itiraz: "Tanımı biz koyduysak, çemberin çevresinin çapına oranının (π) neden bizim seçmediğimiz bir sayı çıktığını açıklamak gerekir." },
        ],
      });
    }
    alt.append(h("p.muted", "Çizginin bir basamağına tıklayın."));
    oySoru();

    let st, pts = [], cizer = false, sonuc = null;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      // ince ızgara (geometricinin tahtası)
      ctx.strokeStyle = rgba(C.brass, 0.06); ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 24) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 24) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); ctx.stroke(); }
      if (sonuc) {
        const { cx, cy, r } = sonuc;
        ctx.strokeStyle = rgba("#F3E3B3", 0.85); ctx.setLineDash([5, 6]); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "#F3E3B3"; ctx.beginPath(); ctx.arc(cx, cy, 2.5, 0, 7); ctx.fill();
        // sapmalar: çizilen noktadan ideal daireye kısa çizgiler
        ctx.strokeStyle = rgba("#E0524A", 0.6); ctx.lineWidth = 1;
        pts.forEach(([x, y], i) => {
          if (i % 3) return;
          const a = Math.atan2(y - cy, x - cx);
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.stroke();
        });
      }
      if (pts.length > 1) {
        ctx.strokeStyle = "#E2C27E"; ctx.lineWidth = 2.6; ctx.lineJoin = "round"; ctx.lineCap = "round";
        ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
      }
      if (!pts.length) {
        ctx.font = `italic 16px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
        ctx.fillText("Buraya elinizle bir daire çizin", w / 2, H / 2); ctx.textAlign = "left";
      }
    }
    function olc() {
      if (pts.length < 12) { sonuc = null; return; }
      let cx = 0, cy = 0;
      pts.forEach(([x, y]) => { cx += x; cy += y; });
      cx /= pts.length; cy /= pts.length;
      const ds = pts.map(([x, y]) => Math.hypot(x - cx, y - cy));
      const r = ds.reduce((a, b) => a + b, 0) / ds.length;
      const sd = Math.sqrt(ds.reduce((a, d) => a + (d - r) ** 2, 0) / ds.length);
      const bosluk = Math.hypot(pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]) / r;
      // açısal kapsama: daire tamamlandı mı?
      const acilar = new Set(pts.map(([x, y]) => Math.floor(((Math.atan2(y - cy, x - cx) + Math.PI) / (2 * Math.PI)) * 24)));
      const kapsam = acilar.size / 24;
      let p = 100 - (sd / r) * 260 - Math.max(0, bosluk - 0.08) * 40 - (1 - kapsam) * 120;
      p = clamp(p, 0, 99.4);
      sonuc = { cx, cy, r, p };
      skor.querySelector("b").textContent = `%${p.toFixed(1).replace(".", ",")}`;
      skor.querySelector("span").textContent = p > 95 ? "Çok iyi, ama yine de mükemmel değil." : p > 80 ? "Daireye benziyor. Mükemmel daire kesik çizgide." : "Mükemmel daireden epey uzak. Bir daha deneyin.";
    }
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    cv.addEventListener("pointerdown", (e) => { cizer = true; try { cv.setPointerCapture(e.pointerId); } catch (er) {} pts = [pos(e)]; sonuc = null; draw(); });
    cv.addEventListener("pointermove", (e) => { if (!cizer) return; const p = pos(e), q = pts[pts.length - 1]; if (Math.hypot(p[0] - q[0], p[1] - q[1]) > 2) { pts.push(p); draw(); } });
    const bit = () => { if (!cizer) return; cizer = false; olc(); draw(); };
    cv.addEventListener("pointerup", bit); cv.addEventListener("pointercancel", bit);
    st = L.canvas(cv, draw);
    return {};
  };

  /* ================= Ruhun üç parçası: kanatlı araba ================= */
  D.ruh = function (stage) {
    const cv = h("canvas", { "aria-label": "Kanatlı araba" });
    const fill = h("div.fill", cv);
    let akil = 0.7, ofke = 0.55, istek = 0.45, t = 0, irtifa = 0.5, egim = 0;
    const durum = h("p.ru-durum", { "aria-live": "polite" });
    const kent = h("div.ru-kent");
    const s1 = L.slider({ label: "Akıl", min: 0, max: 1, step: 0.01, value: akil, fmt: (v) => Math.round(v * 100), oninput: (v) => { akil = v; yaz(); } });
    const s2 = L.slider({ label: "Öfke", min: 0, max: 1, step: 0.01, value: ofke, fmt: (v) => Math.round(v * 100), oninput: (v) => { ofke = v; yaz(); } });
    const s3 = L.slider({ label: "İstek", min: 0, max: 1, step: 0.01, value: istek, fmt: (v) => Math.round(v * 100), oninput: (v) => { istek = v; yaz(); } });
    s1.classList.add("ru-akil"); s2.classList.add("ru-ofke"); s3.classList.add("ru-istek");
    const alt = h("div.pad.scroll.ru-alt");
    stage.append(fill, h("div.controls.ru-ctl", s1, s2, s3), alt);
    alt.append(durum, kent);
    const SINIF = [["Yöneticiler", "akıl", "bilgelik"], ["Yardımcılar (bekçiler)", "öfke", "cesaret"], ["Üreticiler", "istek", "ölçülülük"]];
    function hedef() {
      const fark = istek - akil;
      // öfke akılla birlikteyse arabayı kaldırır, akıl zayıfsa isteğe katılır
      const ofkeEtki = akil >= istek ? (ofke - 0.3) * 0.35 : -(ofke - 0.3) * 0.25;
      return clamp(0.5 + (akil - 0.5) * 0.55 - Math.max(0, fark) * 1.1 + ofkeEtki, 0.02, 0.98);
    }
    function yaz() {
      const fark = istek - akil;
      let m;
      if (fark > 0.25) m = "Kara at dizginleri ele geçirdi: araba aşağı, isteklerin peşinden sürükleniyor.";
      else if (fark > 0.05) m = "Arabacı zorlanıyor: atlar ayrı yönlere çekiyor, araba yalpalıyor.";
      else if (ofke > 0.85 && akil < 0.6) m = "Beyaz at köpürüyor: öfke akıldan güçlü, araba savruluyor.";
      else if (akil > 0.55 && ofke > 0.35) m = "Dengede: arabacı yönetiyor, beyaz at ona yardım ediyor. Platon'a göre adalet budur.";
      else m = "Araba ilerliyor ama arabacı zayıf; yön belirsiz.";
      durum.textContent = m;
      kent.innerHTML = "";
      const vals = [akil, ofke, istek];
      const yonetiyor = akil >= istek && akil >= ofke * 0.8;
      SINIF.forEach(([ad, parca, erdem], i) => kent.append(h("div.ru-sinif" + (i === 0 && yonetiyor ? ".on" : ""),
        h("b", ad), h("span", `${parca} · ${erdem}`), h("i", h("em", { style: { width: Math.round(vals[i] * 100) + "%" } })))));
      kent.append(h("p.ru-not", yonetiyor ? "Kentte de akıl yönetiyor: Platon'a göre her sınıf kendi işini yapıyor." : "Kentte de ruhta da yönetim akıldan başka bir parçaya geçti."));
    }
    yaz();
    function at(ctx, x, y, s, govde, kanat, kaf) {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(kaf);
      ctx.fillStyle = govde; ctx.strokeStyle = rgba(C.brass, 0.8); ctx.lineWidth = 1.2 / s;
      ctx.beginPath();
      ctx.ellipse(0, 0, 26, 10, 0, 0, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(18, -4); ctx.quadraticCurveTo(28, -18, 34, -24); ctx.lineTo(44, -20); ctx.lineTo(42, -14); ctx.lineTo(32, -14); ctx.quadraticCurveTo(28, -6, 24, 4); ctx.closePath(); ctx.fill(); ctx.stroke();
      const b = Math.sin(t * 9) * 6;
      ctx.lineWidth = 3; ctx.strokeStyle = govde; ctx.lineCap = "round";
      [[-16, b], [-10, -b], [14, -b], [20, b]].forEach(([lx, sw]) => { ctx.beginPath(); ctx.moveTo(lx, 6); ctx.lineTo(lx + sw * 0.6, 22); ctx.stroke(); });
      // kanat
      ctx.fillStyle = kanat; ctx.strokeStyle = rgba(C.brass, 0.7); ctx.lineWidth = 1 / s;
      const k = Math.sin(t * 4) * 0.35;
      ctx.beginPath(); ctx.moveTo(-6, -6); ctx.quadraticCurveTo(-20, -40 - k * 20, -36, -44 - k * 30); ctx.quadraticCurveTo(-16, -30, 6, -8); ctx.fill(); ctx.stroke();
      ctx.restore();
    }
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      // gök kubbe: üstte "göklerin ötesi", altta yer
      const top = H * 0.16, yer = H * 0.9;
      ctx.strokeStyle = rgba(C.brass, 0.5); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(0, top + 30); ctx.quadraticCurveTo(w / 2, top - 30, w, top + 30); ctx.stroke();
      ctx.fillStyle = rgba("#F3E3B3", 0.07); ctx.beginPath(); ctx.moveTo(0, top + 30); ctx.quadraticCurveTo(w / 2, top - 30, w, top + 30); ctx.lineTo(w, 0); ctx.lineTo(0, 0); ctx.fill();
      ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.lehte; ctx.textAlign = "center";
      ctx.fillText("göklerin ötesi: idealar", w / 2, top - 8);
      ctx.fillStyle = C.muted; ctx.fillText("yer: bedenin ve isteklerin dünyası", w / 2, yer + 18);
      ctx.textAlign = "left";
      ctx.strokeStyle = rgba(C.brass, 0.3); ctx.beginPath(); ctx.moveTo(0, yer); ctx.lineTo(w, yer); ctx.stroke();
      // yıldızlar
      ctx.fillStyle = rgba("#F3E3B3", 0.5);
      for (let i = 0; i < 26; i++) ctx.fillRect((i * 131 + t * 8) % w, (i * 37) % Math.max(1, top - 10), 1.5, 1.5);
      const y = lerp(yer - 40 * Math.max(1, Math.min(1.9, w / 420, H / 260)), top + 70, irtifa);
      const x = w * 0.45 + Math.sin(t * 0.7) * w * 0.04;
      const sp = Math.max(0.8, Math.min(1.9, w / 420, H / 260));
      const ayr = clamp(istek - akil, 0, 1) * 40 * sp;
      const sallan = Math.sin(t * 3) * clamp(istek - akil + 0.1, 0, 1) * 0.25;
      ctx.save(); ctx.translate(x, y); ctx.rotate(egim + sallan);
      // dizginler
      ctx.strokeStyle = rgba("#C9A55C", 0.9); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-34 * sp, -26 * sp); ctx.lineTo(70 * sp, -34 * sp - ayr * 0.4); ctx.moveTo(-34 * sp, -26 * sp); ctx.lineTo(80 * sp, 14 * sp + ayr * 0.6); ctx.stroke();
      at(ctx, 80 * sp, -28 * sp - ayr * 0.4, sp, "#EDE7DC", "#F3E3B3", -0.05);
      at(ctx, 92 * sp, 20 * sp + ayr * 0.6, sp, "#2A1E18", "#5B4636", 0.08 + clamp(istek - akil, 0, 1) * 0.5);
      // araba ve arabacı
      ctx.fillStyle = "#3A2C22"; ctx.strokeStyle = C.brass; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(-60 * sp, -10 * sp); ctx.lineTo(-20 * sp, -10 * sp); ctx.lineTo(-24 * sp, 12 * sp); ctx.lineTo(-56 * sp, 12 * sp); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(-40 * sp, 16 * sp, 12 * sp, 0, 7); ctx.stroke();
      for (let i = 0; i < 4; i++) { const a = t * 6 + i * 0.785; ctx.beginPath(); ctx.moveTo(-40 * sp + Math.cos(a) * 12 * sp, 16 * sp + Math.sin(a) * 12 * sp); ctx.lineTo(-40 * sp - Math.cos(a) * 12 * sp, 16 * sp - Math.sin(a) * 12 * sp); ctx.stroke(); }
      ctx.fillStyle = "#E2C27E";
      ctx.beginPath(); ctx.arc(-38 * sp, -40 * sp, 6 * sp, 0, 7); ctx.fill();
      ctx.lineWidth = 3 * sp; ctx.strokeStyle = "#E2C27E"; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-38 * sp, -33 * sp); ctx.lineTo(-40 * sp, -12 * sp); ctx.moveTo(-38 * sp, -28 * sp); ctx.lineTo(-30 * sp, -26 * sp); ctx.stroke();
      ctx.restore();
      ctx.font = `500 12px ${FONT.ui}`;
      ctx.fillStyle = "#E2C27E"; ctx.fillText("arabacı: akıl", 14, top + 56);
      ctx.fillStyle = "#EDE7DC"; ctx.fillText("beyaz at: öfke, onur", 14, top + 72);
      ctx.fillStyle = "#B49A84"; ctx.fillText("kara at: istek", 14, top + 88);
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      const hd = hedef();
      const onc = irtifa;
      irtifa += (hd - irtifa) * Math.min(1, dt * 1.4);
      egim += ((onc - irtifa) * 30 - egim) * Math.min(1, dt * 3);
      egim = clamp(egim, -0.4, 0.4);
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };
})();
