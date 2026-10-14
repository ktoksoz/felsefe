/* Büyük soru 3 deneyleri: Theseus'un gemisi, kişisel kimlik vakaları */
(function () {
  const { h, C, FONT, rgba, clamp, lerp, ease } = L;
  const D = window.Demos;
  const ESKI = "#7A5A3C", YENI = "#D9B47A";

  /* Gemi çizimi: n tahtalık gövde, her tahta eski ya da yeni */
  function gemi(ctx, cx, cy, W, renkler, al = 1, etiket) {
    const H = W * 0.17;
    const x0 = cx - W / 2, x1 = cx + W / 2;
    ctx.save();
    ctx.globalAlpha = al;
    // direk ve yelken
    ctx.strokeStyle = rgba(C.ink, 0.7); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy - H * 0.2); ctx.lineTo(cx, cy - H * 2.7); ctx.stroke();
    ctx.fillStyle = rgba(C.ink, 0.1); ctx.strokeStyle = rgba(C.ink, 0.45); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - W * 0.18, cy - H * 2.5); ctx.lineTo(cx + W * 0.18, cy - H * 2.5); ctx.lineTo(cx + W * 0.16, cy - H * 1.0); ctx.lineTo(cx - W * 0.16, cy - H * 1.0); ctx.closePath(); ctx.fill(); ctx.stroke();
    for (let i = 1; i < 4; i++) { const y = cy - H * 2.5 + (i * H * 1.5) / 4; ctx.beginPath(); ctx.moveTo(cx - W * 0.21, y); ctx.lineTo(cx + W * 0.21, y); ctx.stroke(); }
    // gövde
    const hull = new Path2D();
    hull.moveTo(x0, cy - H * 0.6);
    hull.quadraticCurveTo(x0 - W * 0.06, cy - H * 1.4, x0 - W * 0.02, cy - H * 1.6); // kıç kıvrımı
    hull.quadraticCurveTo(x0 + W * 0.02, cy - H * 0.4, x0 + W * 0.08, cy - H * 0.2);
    hull.lineTo(x1 - W * 0.04, cy - H * 0.2);
    hull.lineTo(x1 + W * 0.05, cy - H * 0.55); // pruva
    hull.quadraticCurveTo(x1, cy + H * 0.4, x1 - W * 0.12, cy + H);
    hull.lineTo(x0 + W * 0.1, cy + H);
    hull.quadraticCurveTo(x0 - W * 0.01, cy + H * 0.5, x0, cy - H * 0.6);
    ctx.save(); ctx.clip(hull);
    const n = renkler.length, bw = (W * 1.12) / n, bx = x0 - W * 0.06;
    renkler.forEach((r, i) => {
      ctx.fillStyle = r || "rgba(0,0,0,0)";
      ctx.fillRect(bx + i * bw, cy - H * 2, bw + 0.5, H * 4);
      ctx.strokeStyle = "rgba(20,12,6,.6)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(bx + i * bw, cy - H * 2); ctx.lineTo(bx + i * bw, cy + H * 2); ctx.stroke();
    });
    ctx.strokeStyle = "rgba(20,12,6,.35)";
    for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x0 - W * 0.1, cy - H * 0.2 + k * H * 0.3); ctx.lineTo(x1 + W * 0.1, cy - H * 0.2 + k * H * 0.3); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = rgba(C.brass, 0.8); ctx.lineWidth = 1.3; ctx.stroke(hull);
    // pruvadaki göz (ophthalmos)
    ctx.fillStyle = C.ink; ctx.beginPath(); ctx.ellipse(x1 - W * 0.06, cy + H * 0.05, W * 0.018, H * 0.16, 0, 0, 7); ctx.fill();
    ctx.fillStyle = "#14213D"; ctx.beginPath(); ctx.arc(x1 - W * 0.06, cy + H * 0.05, W * 0.008, 0, 7); ctx.fill();
    if (etiket) { ctx.font = `600 13px ${FONT.ui}`; ctx.fillStyle = C.ink; ctx.textAlign = "center"; ctx.fillText(etiket, cx, cy + H * 1.45); ctx.textAlign = "left"; }
    ctx.restore();
    return { bx, bw, H };
  }

  D.theseus = function (stage) {
    stage.classList.add("th");
    const cv = h("canvas", { "aria-label": "Theseus'un gemisi" });
    const fill = h("div.fill", cv);
    const N = 12;
    let tahta, depo, ucan, ikinci, kurT;
    const bDegis = h("button.btn.primary", { type: "button", onclick: () => degistir() }, "Bir tahtayı değiştir");
    const bHepsi = h("button.btn", { type: "button", onclick: () => { for (let i = 0; i < N; i++) degistir(true); } }, "Hepsini değiştir");
    const bKur = h("button.btn", { type: "button", onclick: kur, disabled: true }, "Eski tahtalardan ikinci gemiyi kur");
    const bSifir = h("button.btn.ghost", { type: "button", onclick: () => { sifirla(); paneller(); } }, "Baştan başla");
    const sayac = h("span.th-sayac");
    const panel = h("div.th-panel.pad.scroll", { "aria-live": "polite" });
    stage.append(fill, h("div.controls", bDegis, bHepsi, bKur, h("span.spacer"), sayac, bSifir), panel);
    function sifirla() { tahta = Array(N).fill(false); depo = 0; ucan = []; ikinci = false; kurT = 0; bKur.disabled = true; }
    sifirla();
    const sira = [5, 2, 8, 0, 10, 3, 7, 11, 1, 6, 9, 4]; // tahtaların değiştirilme sırası
    function degistir(hizli) {
      const n = tahta.filter(Boolean).length;
      if (n >= N) return;
      const i = sira[n];
      tahta[i] = true;
      ucan.push({ i, t: hizli ? 1 : 0 });
      depo++;
      if (depo === N) bKur.disabled = false;
      paneller();
    }
    function kur() { ikinci = true; kurT = 0; bKur.disabled = true; paneller(); }
    const SEC = {
      yari: { soru: "Tahtaların yarısı yenilendi. Limandaki gemi hâlâ Theseus'un gemisi mi?",
        secenekler: [
          { v: "evet", ad: "Evet, hâlâ o gemi", ilke: "Kimliği adım adım, kesintisiz değişim korur.", filozof: ["aristoteles", "herakleitos"],
            itiraz: "Kaçıncı tahtada \"artık değil\" diyeceğiz? Keskin bir eşik yoksa, son tahtada da aynı kalmalı." },
          { v: "hayir", ad: "Hayır, artık başka bir gemi", ilke: "Bir şeyin parçalarının çoğu değişince o şey başka bir şey olur.", filozof: [],
            itiraz: "Altıncı tahtada mı değişti, yedincide mi? Keskin bir sınır çizmek keyfi görünüyor; bu, \"yığın paradoksu\"nun bir biçimidir." },
        ] },
      tam: { soru: "Bütün tahtalar yenilendi. Limandaki gemi hâlâ Theseus'un gemisi mi?",
        secenekler: [
          { v: "evet", ad: "Evet, hâlâ o gemi", ilke: "Kimliği taşıyan madde değil, yapının ve işlevin kesintisiz sürmesidir.", filozof: ["aristoteles"],
            lehte: "Atinalılar da öyle düşündü: Gemiyi yüzyıllarca Theseus'un gemisi olarak gösterdiler.",
            itiraz: "Hiçbir parçası kalmamış bir şey neden aynı olsun? Belki yalnızca adı aynı kalmıştır." },
          { v: "hayir", ad: "Hayır, artık başka bir gemi", ilke: "Bir şey, onu oluşturan malzemeyle aynıdır; malzeme bütünüyle değişince şey de değişir.", filozof: [],
            itiraz: "Bu ölçütle siz de yıllar önceki siz değilsiniz: bedeninizin maddesi de sürekli yenileniyor." },
        ] },
      asil: { soru: "Şimdi iki gemi var. Hangisi asıl Theseus'un gemisi?",
        secenekler: [
          { v: "limandaki", ad: "Limandaki, yenilenmiş gemi", ilke: "Süreklilik ölçütü: Kesintisiz kullanılan, onarılan ve işlevini sürdüren gemi asıldır.", filozof: ["aristoteles"],
            itiraz: "Eski tahtaları toplayan biri, \"Theseus'un dokunduğu tahtaların hepsi bende\" diyebilir. Müzeler hangi gemiyi sergilemek isterdi?" },
          { v: "eski", ad: "Eski tahtalardan kurulan", ilke: "Madde ölçütü: Asıl gemi, Theseus'un gemisini oluşturan tahtaların ta kendisidir. Hobbes'a göre \"gemi\" adıyla maddeyi kastediyorsak, sonuç budur.", filozof: ["hobbes"],
            itiraz: "Bu gemi bir süre hiç var olmadı: Tahtalar bir depoda yığın hâlinde bekledi. Kimlik böyle kesintiye uğrayabilir mi?" },
          { v: "hicbiri", ad: "\"Asıl\" diye bir şey yok", ilke: "Uzlaşım görüşü: \"Gemi\" parçaların üzerine koyduğumuz bir addır; hangisine \"asıl\" diyeceğimiz bir karar meselesidir.", filozof: ["nagasena", "buda", "hume"],
            itiraz: "Pratikte bir karar vermek zorundayız: Mahkeme geminin sahibini belirlerken \"keyfi\" diyemez. Ölçütümüzü açıkça seçmek gerekir." },
        ] },
    };
    function paneller() {
      const n = tahta.filter(Boolean).length;
      sayac.textContent = `Yenilenen: ${n} / ${N}`;
      panel.innerHTML = "";
      if (n < 6) panel.append(h("p.muted", "Tahtaları değiştirmeye başlayın. Yarı yolda ilk soru gelecek."));
      if (n >= 6) Oy.secim(panel, { anahtar: "s-theseus.yari", ...SEC.yari });
      if (n >= N) Oy.secim(panel, { anahtar: "s-theseus.tam", ...SEC.tam });
      if (n >= N && !ikinci) panel.append(h("p.th-ipucu", "Şimdi biri, sökülen bütün eski tahtaları saklamış olsun. \"Eski tahtalardan ikinci gemiyi kur\" ile onları birleştirin."));
      if (ikinci) Oy.secim(panel, { anahtar: "s-theseus.asil", ...SEC.asil });
      panel.scrollTop = panel.scrollHeight;
    }
    paneller();
    let st, t = 0;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const W = Math.min(w * 0.42, H * 0.95);
      const ay = H * 0.5;
      // deniz çizgisi
      ctx.strokeStyle = rgba("#79AEEA", 0.25); ctx.lineWidth = 1;
      ctx.beginPath(); for (let x = 0; x <= w; x += 6) ctx.lineTo(x, ay + W * 0.16 + Math.sin(x * 0.04 + t * 1.5) * 2); ctx.stroke();
      const ax = w * 0.27;
      const g = gemi(ctx, ax, ay, W, tahta.map((y) => (y ? YENI : ESKI)), 1, "Limandaki gemi");
      // depo: sökülen tahtalar yığını, sonra ikinci gemi
      const dx = w * 0.75, dy = ay - W * 0.02;
      if (!ikinci || kurT < 1) {
        const yigin = Math.max(0, depo - ucan.filter((u) => u.t < 1).length);
        ctx.globalAlpha = ikinci ? 1 - kurT : 1;
        ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
        ctx.fillText("Sökülen eski tahtalar", dx, dy + 40);
        ctx.textAlign = "left";
        for (let k = 0; k < yigin; k++) {
          const yy = dy + 20 - k * 6;
          ctx.fillStyle = ESKI; ctx.strokeStyle = "rgba(20,12,6,.7)";
          ctx.fillRect(dx - W * 0.2 + (k % 2) * 6, yy, W * 0.4, 5); ctx.strokeRect(dx - W * 0.2 + (k % 2) * 6, yy, W * 0.4, 5);
        }
        ctx.globalAlpha = 1;
      }
      if (ikinci) gemi(ctx, dx, ay, W * 0.92, Array(N).fill(ESKI), ease(clamp(kurT, 0, 1)), "Eski tahtalardan kurulan gemi");
      // uçan tahtalar
      ucan.forEach((u) => {
        if (u.t >= 1) return;
        const sx = g.bx + (u.i + 0.5) * g.bw, sy = ay;
        const k = ease(u.t);
        const x = lerp(sx, dx, k), y = lerp(sy, dy + 10, k) - Math.sin(k * Math.PI) * 60;
        ctx.save(); ctx.translate(x, y); ctx.rotate(k * 1.57);
        ctx.fillStyle = ESKI; ctx.fillRect(-4, -g.H, 8, g.H * 2);
        ctx.restore();
        // yerine giren yeni tahta parlar
        ctx.fillStyle = rgba(YENI, 0.5 * (1 - k)); ctx.fillRect(g.bx + u.i * g.bw, ay - g.H * 0.2, g.bw, g.H * 1.2);
      });
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      ucan.forEach((u) => (u.t = Math.min(1, u.t + dt * 1.6)));
      if (ikinci && kurT < 1) kurT = Math.min(1, kurT + dt * 0.7);
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Kişisel kimlik: prens ve ayakkabıcı, ışınlanma, bölünme --- */
  const VAKA = {
    prens: { ad: "Prens ve ayakkabıcı", soru: "Prensin bütün anıları, alışkanlıkları ve karakteri bir sabah ayakkabıcının bedeninde uyanıyor. Bu kişi kim?",
      not: "Locke'un kendi örneği (Deneme II.27.15).",
      secenekler: [
        { v: "hafiza", ad: "Artık prens", ilke: "Hafıza ölçütü: Kişi, bilincin ve anıların sürekliliğidir; beden yalnızca taşıyıcıdır.", filozof: ["locke"],
          lehte: "Bu kişiye sorsanız sarayı, çocukluğunu, prens olarak verdiği sözleri anlatır; ayakkabıcı olarak hiçbir şey hatırlamaz.",
          itiraz: "Reid'in itirazı: Anılar zincirleme aktarılabilir ama atlayabilir de; general çocukluğunu hatırlamıyorsa, hafıza ölçütüyle o çocuk değil midir?" },
        { v: "beden", ad: "Hâlâ ayakkabıcı", ilke: "Beden ölçütü: Kişi, belirli bir canlı bedendir; anılar değişse de aynı organizma aynı kişidir.", filozof: ["aristoteles"],
          lehte: "Komşuları, ailesi, nüfus kâğıdı ve parmak izi aynı ayakkabıcıyı gösteriyor.",
          itiraz: "Kendisi ayakkabıcıyı hiç hatırlamıyorsa, \"ayakkabıcı olarak\" yaptıklarından onu sorumlu tutmak adil olur mu?" },
      ] },
    isinlanma: { ad: "Işınlanma", soru: "Bir ışınlayıcı sizi atom atom tarıyor, buradaki bedeninizi yok ediyor ve Mars'ta, yeni atomlardan, tıpatıp aynı düzende yeniden kuruyor. Mars'ta uyanan kişi siz misiniz?",
      not: "Parfit, Reasons and Persons (1984), 10. bölüm.",
      secenekler: [
        { v: "ben", ad: "Evet, Mars'taki benim", ilke: "Psikolojik süreklilik ölçütü: Anılar, kişilik ve düzen aynıysa kişi aynıdır; hangi atomlardan yapıldığı önemsizdir.", filozof: ["parfit", "locke"],
          lehte: "Mars'taki kişi sizin gibi düşünüyor, sizin anılarınızı taşıyor ve yolculuğu \"ben yaptım\" diye anlatıyor.",
          itiraz: "Makine buradaki bedeninizi yok etmeyi unutsaydı, iki \"siz\" olurdu. İkisi birden siz olamayacağına göre Mars'taki belki de yalnızca bir kopyadır." },
        { v: "kopya", ad: "Hayır, o bir kopya", ilke: "Kimlik, maddenin ve uzay-zaman içindeki yolun sürekliliğini ister; yok edilip yeniden kurulan, kopyadır.", filozof: [],
          lehte: "Makine buradakini yok etmeseydi \"kopya\" diyeceğimiz açık; yok etmesi Mars'taki kişiyi neden asıl yapsın?",
          itiraz: "Bedeninizin atomları zaten yıllar içinde değişiyor. Yavaş değişimle hızlı değişim arasındaki fark, kimlik için neden belirleyici olsun?" },
      ] },
    bolunme: { ad: "Bölünme", soru: "Beyninizin iki yarısı, her biri tek başına bütün zihninizi sürdürebiliyor. Yarılar iki ayrı bedene nakledilir ve iki kişi uyanır. İkisi de sizin anılarınızı taşıyor. Hangisi siz?",
      not: "Wiggins (1967), Parfit (1971, 1984).",
      secenekler: [
        { v: "ikisi", ad: "İkisi de benim", ilke: "Psikolojik süreklilik ikisinde de var; o hâlde ikisi de sizin devamınız.", filozof: [],
          itiraz: "Ama ikisi artık birbirinden farklı yaşayacak iki ayrı kişi; bir kişi aynı anda iki kişiyle özdeş olamaz." },
        { v: "biri", ad: "Yalnızca biri", ilke: "Kimlik bir ve bölünmez bir olgudur; yarılardan yalnızca biri gerçekten sizsiniz.", filozof: ["descartes"],
          itiraz: "Hangisi? İki yarı tam olarak simetrikse, birini seçmenin hiçbir gerekçesi yok." },
        { v: "hicbiri", ad: "Hiçbiri ben değilim", ilke: "Kimlik bire bir olmalı; iki aday varsa ikisi de kimliği taşıyamaz, yani siz sona erdiniz.", filozof: [],
          itiraz: "Yarılardan biri ameliyatta ölseydi, kalanı sizdiniz. Bir yarının daha yaşaması sizi nasıl öldürebilir? (Parfit: \"Çift başarı, başarısızlık olamaz.\")" },
        { v: "onemsiz", ad: "Soru önemini yitiriyor", ilke: "Önemli olan \"aynı kişi olmak\" değil, psikolojik süreklilik ve bağlılıktır; bu ikisinde de var.", filozof: ["parfit", "buda"],
          itiraz: "Kimliğin önemsiz olması, ödül ve ceza, söz ve sorumluluk gibi kişiye bağlı uygulamaları nasıl etkiler?" },
      ] },
  };
  D.kimlik = function (stage) {
    stage.classList.add("km");
    let vaka = "prens", t = 1, st;
    const cv = h("canvas", { "aria-label": "Kişisel kimlik vakaları" });
    const fill = h("div.fill", cv);
    const panel = h("div.km-panel.pad.scroll");
    const seg = L.seg(Object.entries(VAKA).map(([k, v]) => [k, v.ad]), vaka, (k) => { vaka = k; t = 0; yaz(); });
    stage.append(fill, h("div.controls", seg, h("span.spacer"), h("button.btn", { type: "button", onclick: () => (t = 0) }, "Oynat")), panel);
    function yaz() {
      const V = VAKA[vaka];
      panel.innerHTML = "";
      Oy.secim(panel, { anahtar: "s-kimlik." + vaka, soru: V.soru, secenekler: V.secenekler });
      panel.append(h("p.km-not", V.not));
    }
    yaz();
    const anilar = Array.from({ length: 18 }, (_, i) => ({ a: (i * 2.4) % 6.283, r: 0.25 + ((i * 37) % 10) / 14 }));
    function figur(ctx, x, y, s, { tac, onluk, al = 1, renk = C.ink, yari } = {}) {
      ctx.save(); ctx.globalAlpha = al;
      ctx.strokeStyle = renk; ctx.lineWidth = 1.6; ctx.fillStyle = rgba(renk, 0.06);
      ctx.beginPath(); ctx.arc(x, y - s * 0.95, s * 0.32, 0, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - s * 0.42, y + s * 0.7); ctx.quadraticCurveTo(x - s * 0.46, y - s * 0.5, x, y - s * 0.55); ctx.quadraticCurveTo(x + s * 0.46, y - s * 0.5, x + s * 0.42, y + s * 0.7); ctx.closePath(); ctx.fill(); ctx.stroke();
      if (tac) { ctx.fillStyle = C.brass; ctx.beginPath(); const ty = y - s * 1.22; ctx.moveTo(x - s * 0.22, ty + s * 0.08); for (let i = 0; i <= 4; i++) ctx.lineTo(x - s * 0.22 + i * s * 0.11, ty - (i % 2 ? 0 : s * 0.14)); ctx.lineTo(x + s * 0.22, ty + s * 0.08); ctx.fill(); }
      if (onluk) { ctx.fillStyle = rgba("#8C6A45", 0.8); ctx.fillRect(x - s * 0.22, y - s * 0.2, s * 0.44, s * 0.8); }
      if (yari) { ctx.fillStyle = rgba(C.brass, 0.6); ctx.beginPath(); ctx.arc(x, y - s * 0.95, s * 0.18, yari === "sol" ? 1.57 : -1.57, yari === "sol" ? 4.71 : 1.57); ctx.fill(); }
      ctx.restore();
    }
    function aniBulut(ctx, x, y, s, al, k = 1) {
      anilar.forEach((m, i) => {
        ctx.fillStyle = rgba(i % 3 ? "#E2C27E" : "#79AEEA", al);
        ctx.beginPath(); ctx.arc(x + Math.cos(m.a) * m.r * s * 0.22 * k, y + Math.sin(m.a) * m.r * s * 0.22 * k, 2, 0, 7); ctx.fill();
      });
    }
    function etiket(ctx, s, x, y, c = C.ink2 || "#C3C3C8") { ctx.font = `500 13px ${FONT.ui}`; ctx.fillStyle = c; ctx.textAlign = "center"; ctx.fillText(s, x, y); ctx.textAlign = "left"; }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const s = Math.min(H * 0.32, w * 0.16), y = H * 0.58, k = ease(clamp(t, 0, 1));
      if (vaka === "prens") {
        const xa = w * 0.25, xb = w * 0.75;
        figur(ctx, xa, y, s, { tac: true, al: 1 - 0.5 * k });
        figur(ctx, xb, y, s, { onluk: true });
        anilar.forEach((m, i) => {
          const kk = ease(clamp(t * 1.3 - i * 0.015, 0, 1));
          const x = lerp(xa, xb, kk) + Math.cos(m.a) * m.r * s * 0.22, yy = y - s * 0.95 + Math.sin(m.a) * m.r * s * 0.22 - Math.sin(kk * Math.PI) * s * 0.7;
          ctx.fillStyle = rgba(i % 3 ? "#E2C27E" : "#79AEEA", 0.95); ctx.beginPath(); ctx.arc(x, yy, 2.2, 0, 7); ctx.fill();
        });
        etiket(ctx, "Prensin bedeni", xa, y + s * 1.05); etiket(ctx, "Ayakkabıcının bedeni", xb, y + s * 1.05);
        if (k >= 1) etiket(ctx, "Prensin anıları artık bu bedende", xb, y - s * 1.6, "#E2C27E");
      } else if (vaka === "isinlanma") {
        const xa = w * 0.2, xb = w * 0.8;
        ctx.strokeStyle = rgba("#79AEEA", 0.5); ctx.beginPath(); ctx.arc(xa, H * 1.9, H * 1.1, 0, 7); ctx.stroke();
        ctx.strokeStyle = rgba("#E0524A", 0.6); ctx.beginPath(); ctx.arc(xb, H * 1.9, H * 1.1, 0, 7); ctx.stroke();
        figur(ctx, xa, y, s, { al: 1 - k });
        if (k > 0 && k < 1) { // tarama ve sinyal
          ctx.strokeStyle = rgba(C.brass, 0.7); ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(xa, y - s); ctx.lineTo(xb, y - s); ctx.stroke(); ctx.setLineDash([]);
          for (let i = 0; i < 24; i++) { const u = (k * 2 + i / 24) % 1; ctx.fillStyle = rgba("#E2C27E", 0.8); ctx.beginPath(); ctx.arc(lerp(xa, xb, u), y - s + Math.sin(u * 20) * 4, 1.6, 0, 7); ctx.fill(); }
        }
        figur(ctx, xb, y, s, { al: k });
        if (k > 0.2) aniBulut(ctx, xb, y - s * 0.95, s, k);
        if (k < 0.8) aniBulut(ctx, xa, y - s * 0.95, s, 1 - k);
        etiket(ctx, "Dünya: beden yok edilir", xa, y + s * 1.05); etiket(ctx, "Mars: yeni atomlardan kurulur", xb, y + s * 1.05);
      } else {
        const xc = w / 2, sp = lerp(0, w * 0.28, k);
        if (k < 1) figur(ctx, xc, y, s, { al: 1 - k });
        if (k > 0) {
          figur(ctx, xc - sp, y, s, { al: k, yari: "sol" });
          figur(ctx, xc + sp, y, s, { al: k, yari: "sag" });
          aniBulut(ctx, xc - sp, y - s * 0.95, s, k);
          aniBulut(ctx, xc + sp, y - s * 0.95, s, k);
        } else aniBulut(ctx, xc, y - s * 0.95, s, 1);
        if (k >= 1) { etiket(ctx, "Sol yarı", xc - sp, y + s * 1.05); etiket(ctx, "Sağ yarı", xc + sp, y + s * 1.05); etiket(ctx, "İkisi de sizin anılarınızla uyanıyor", xc, y - s * 1.6, "#E2C27E"); }
      }
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { if (t < 1.2) t += dt / 2.4; draw(); });
    return { enter: () => { t = 0; lp.start(); }, leave: () => lp.stop() };
  };
})();
