/* 2. Varlık ve değişim deneyleri: Parmenides'in öncülleri, Aşil, uçan ok, dört öğe, kesme deneyi */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;
  const ORANGE = "#E08A4F";

  /* --- Parmenides: dört öncülü kabul et ya da reddet --- */
  const ONCUL = [
    { m: "Var olmayan düşünülemez, onun hakkında konuşulamaz.", red: { v: "p1", ilke: "\"Olmayan\" her zaman \"hiç\" demek değildir; \"başka olan\" anlamına da gelebilir. Kırmızı mavi değildir ama yine de vardır.",
      filozof: ["platon"], itiraz: "Parmenides: \"başka olan\" dediğinde yine bir varlıktan söz ediyorsun; saf yokluğu hâlâ düşünemiyorsun." } },
    { m: "Bir şey ya vardır ya yoktur; üçüncü bir yol yoktur.", red: { v: "p2", ilke: "Bir şey imkân hâlinde var olabilir: palamut henüz meşe değildir ama meşe olma imkânıdır. Değişim, imkânın gerçekleşmesidir.",
      filozof: ["aristoteles"], itiraz: "İmkân var mı yok mu? Varsa zaten meşe var demektir; yoksa hiçten bir şey çıkıyor demektir." } },
    { m: "Var olan, var olmayandan doğamaz: hiçten hiçbir şey çıkmaz.", red: { v: "p3", ilke: "Belki bir şey gerçekten hiçten başlayabilir. Bu öncülü reddetmek antik dünyada çok nadirdir; neredeyse bütün Yunan düşünürleri onu kabul etti.",
      filozof: [], itiraz: "Hiçten bir şey çıkabiliyorsa, neden her an her yerden her şey çıkmıyor?" } },
    { m: "Boşluk, yani var olmayan yer, yoktur; öyleyse hareket edecek bir yer de yoktur.", red: { v: "p4", ilke: "Boşluk vardır. Var olmayan da bir anlamda vardır: atomların içinde hareket ettiği boş yer.",
      filozof: ["leukippos", "demokritos"], itiraz: "\"Var olan bir yokluk\" demek bir çelişki değil mi? Aristoteles de boşluğa karşı çıktı (Fizik IV.8)." } },
  ];
  const HEPSI = { v: "hepsi", ilke: "Öncüller kabul edilirse sonuç zorunludur: doğuş, yok oluş ve hareket yanılsamadır. Gerçek olan tek, bütün ve değişmeyen varlıktır.",
    filozof: ["parmenides", "zenon_elea"], lehte: "Akıl yürütme geçerli görünüyor; duyular ise bizi sık sık yanıltır.",
    itiraz: "Bir akıl yürütme açıkça gördüğümüz bir şeyi inkâr ediyorsa, belki öncüllerden biri gizlice hatalıdır. Atomcular ve Platon bunu aradı." };
  D.parmenides = function (stage) {
    const cv = h("canvas", { "aria-label": "Duyuların ve aklın dünyası" });
    const fill = h("div.fill.pm-fill", cv);
    const list = h("ol.pm-oncul");
    const out = h("div.pm-out", { "aria-live": "polite" });
    const pad = h("div.pad.scroll.pm-pad", list, out);
    stage.append(fill, pad);
    let durum = []; // her öncül için "kabul" | "red" | undefined
    let akil = 0; // 0 duyular, 1 akıl (görünüm)
    function render() {
      list.innerHTML = "";
      const red = durum.indexOf("red");
      ONCUL.forEach((o, i) => {
        const acik = i === 0 || durum[i - 1] === "kabul";
        const st = durum[i];
        const li = h("li.pm-li" + (st ? "." + st : "") + (acik && red < 0 ? "" : ".kapali"), h("p", o.m));
        if (red < 0 && !st) li.append(h("div.pm-btns",
          h("button.btn.sec", { type: "button", disabled: !acik, "aria-label": `${i + 1}. öncülü kabul et`, onclick: () => sec(i, "kabul") }, "Kabul"),
          h("button.btn.ghost", { type: "button", disabled: !acik, "aria-label": `${i + 1}. öncülü reddet`, onclick: () => sec(i, "red") }, "Reddet")));
        else if (st) li.append(h("span.pm-durum", st === "kabul" ? "kabul edildi" : "reddedildi"));
        list.append(li);
      });
      const tum = durum.length === 4 && durum.every((x) => x === "kabul");
      list.append(h("li.pm-sonuc" + (tum ? ".on" : ""), h("p", h("b", "Sonuç: "), "Öyleyse doğuş, yok oluş ve hareket bir yanılsamadır.")));
      out.innerHTML = "";
      if (red >= 0 || tum) {
        const s = tum ? HEPSI : ONCUL[red].red;
        out.append(Oy.ilkePanel(s));
        const t = Oy.tutarlilikNotu("parmenides"); if (t) out.append(t);
        out.append(h("button.btn.ghost.pm-reset", { type: "button", onclick: () => { durum = []; akil = 0; render(); } }, "Baştan başla"));
      }
    }
    function sec(i, v) {
      durum[i] = v;
      if (v === "red") Oy.set("parmenides", ONCUL[i].red.v);
      else if (i === 3) Oy.set("parmenides", "hepsi");
      akil = durum.filter((x) => x === "kabul").length / 4;
      render();
    }
    render();
    // görünüm: duyuların dünyası (akan, değişen) aklın küresine dönüşür
    const r = L.rng(11);
    const P = Array.from({ length: 160 }, () => ({ a: r() * 6.283, d: r(), s: 0.3 + r(), c: r() }));
    let st, t = 0, k = 0;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, cy = H / 2, R = Math.min(w, H) * 0.36;
      const cols = ["#E08A4F", "#79AEEA", "#9CCB72", "#E9BE3B", "#EDE7DC"];
      P.forEach((p, i) => {
        // duyular: rastgele uçuşan renkli parçalar; akıl: küre yüzeyinde sabit noktalar
        const fx = cx + Math.cos(p.a + t * p.s * 0.6) * (R * 1.5 * p.d + 20) * (1 + 0.15 * Math.sin(t + i));
        const fy = cy + Math.sin(p.a * 1.7 + t * p.s * 0.4) * (H * 0.42 * p.d);
        const th = (i / P.length) * Math.PI * 2 * 7.3, ph = Math.acos(1 - 2 * ((i + 0.5) / P.length));
        const sx = cx + R * Math.sin(ph) * Math.cos(th + t * 0.05), sy = cy + R * Math.cos(ph);
        const x = lerp(fx, sx, k), y = lerp(fy, sy, k);
        ctx.fillStyle = k > 0.5 ? rgba(C.ink, 0.35 + 0.5 * Math.sin(ph)) : rgba(cols[Math.floor(p.c * 5)], 0.75);
        ctx.beginPath(); ctx.arc(x, y, lerp(2.4, 1.6, k), 0, 7); ctx.fill();
      });
      if (k > 0.05) {
        ctx.strokeStyle = rgba(C.brass, 0.6 * k); ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.28, 0, 0, 7); ctx.stroke();
      }
      ctx.font = `italic 14px ${FONT.body}`; ctx.textAlign = "center"; ctx.fillStyle = C.ink;
      ctx.fillText(k < 0.5 ? "duyuların gösterdiği: akış, çokluk, renk" : "aklın gösterdiği: tek, bütün, kıpırtısız bir küre", cx, H - 14);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt * (1 - k * 0.95); k += (akil - k) * Math.min(1, dt * 2.5); draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Aşil ve kaplumbağa / ikiye bölme --- */
  D.asil = function (stage) {
    const cv = h("canvas", { "aria-label": "Aşil ve kaplumbağa" });
    const fill = h("div.fill", cv);
    const bilgi = h("div.as-bilgi");
    const oyKap = h("div.pad.scroll.as-oy");
    let mod = "asil", adim = 0, kos = null; // kos: gerçek zamanlı koşu animasyonu
    const VA = 10, VK = 1, BAS = 100; // m/sn, m/sn, m önde
    const seg = L.seg([["asil", "Aşil ve kaplumbağa"], ["ikiye", "İkiye bölme"]], mod, (v) => { mod = v; adim = 0; kos = null; yaz(); });
    const ileri = h("button.btn.primary", { type: "button", onclick: () => { kos = null; adim = Math.min(adim + 1, 40); yaz(); } }, "Sonraki adım");
    const oto = h("button.btn", { type: "button", onclick: () => otomatik() }, "Otomatik");
    const gercek = h("button.btn.ghost", { type: "button", onclick: () => { adim = 0; kos = 0; yaz(); } }, "Gerçek zamanlı koş");
    const sifir = h("button.btn.ghost", { type: "button", onclick: () => { adim = 0; kos = null; yaz(); } }, "Sıfırla");
    stage.append(fill, h("div.controls", seg, ileri, oto, gercek, sifir), bilgi, oyKap);
    Oy.secim(oyKap, {
      anahtar: "zenon-asil", soru: "Aşil kaplumbağaya yetişir mi?",
      secenekler: [
        { v: "yetisir", ad: "Yetişir: sonsuz adım sonlu zamanda biter", ilke: "Sonsuz sayıda giderek küçülen sürenin toplamı sonlu olabilir; zaman da yol gibi sonsuzca bölünebilir.", filozof: ["aristoteles", "leibniz"],
          lehte: "Matematik bu toplamın kesin değerini verir: 11,11… saniye.", itiraz: "Toplamın ne olduğunu bilmek, sonsuz sayıda işin gerçekten nasıl \"bittiğini\" açıklıyor mu? (süper görev tartışması)" },
        { v: "yanilsama", ad: "Yetişemez: hareket bir yanılsamadır", ilke: "Akıl yürütme geçerliyse ve sonuç saçmaysa, saçma olan hareketi kabul etmektir.", filozof: ["zenon_elea", "parmenides"],
          itiraz: "Her gün bir yayayı geçen bir bisikletli görüyoruz. Bir akıl yürütme bunu inkâr ediyorsa, öncüllerinden biri gözden geçirilmeli." },
        { v: "bolunmez", ad: "Sorun bölünmede: uzay ve zaman sonsuza dek bölünemez", ilke: "En küçük, bölünmez parçalar vardır; yol sonlu sayıda adımdan oluşur.", filozof: ["demokritos", "epikuros"],
          itiraz: "En küçük bir uzunluk varsa, onun yarısını neden düşünemeyelim? (Aristoteles bu yüzden bölünmez büyüklüklere karşı çıktı.)" },
      ],
    });
    let st, t = 0, otoT = 0;
    function otomatik() { kos = null; adim = 0; clearInterval(otoT); otoT = setInterval(() => { adim++; yaz(); if (adim >= 14) clearInterval(otoT); }, 450); }
    function asilKonum(n) { // n. adımdan sonra Aşil'in konumu
      let a = 0, k = BAS; for (let i = 0; i < n; i++) { const tt = (k - a) / VA; a = k; k += VK * tt; } return [a, k];
    }
    function yaz() {
      bilgi.innerHTML = "";
      if (mod === "asil") {
        if (kos != null) { bilgi.innerHTML = `Gerçek zamanlı koşu: Aşil saniyede 10 m, kaplumbağa 1 m. Aşil <b>11,11 saniyede</b>, <b>111,11 m</b>'de kaplumbağayı geçer.`; return; }
        const [a, k] = asilKonum(adim);
        let sure = 0, k2 = BAS, a2 = 0; for (let i = 0; i < adim; i++) { const tt = (k2 - a2) / VA; sure += tt; a2 = k2; k2 += VK * tt; }
        bilgi.innerHTML = `Adım <b>${adim}</b> · aradaki mesafe <b>${fmt(k - a)} m</b> · geçen süre <b>${fmt(sure)} sn</b>` +
          `<span class="as-terim">${adim ? "Süreler: " + Array.from({ length: Math.min(adim, 6) }, (_, i) => fmt(10 / Math.pow(10, i))).join(" + ") + (adim > 6 ? " + …" : "") : "Aşil her adımda kaplumbağanın az önce bulunduğu yere koşar."}</span>`;
      } else {
        const toplam = 1 - Math.pow(0.5, adim);
        bilgi.innerHTML = `Adım <b>${adim}</b> · toplam: ${adim ? Array.from({ length: Math.min(adim, 5) }, (_, i) => "1/" + Math.pow(2, i + 1)).join(" + ") + (adim > 5 ? " + …" : "") + " = " : ""}<b>${toplam.toFixed(Math.min(12, Math.max(2, Math.ceil(adim * 0.32))))}</b>` +
          `<span class="as-terim">Kalan yol: ${adim > 30 ? "neredeyse sıfır, ama hiç sıfır değil" : "1/" + Math.pow(2, adim)}</span>`;
      }
    }
    const fmt = (v) => (v === 0 ? "0" : v >= 0.01 ? v.toFixed(2) : v.toExponential(1)).replace(".", ",");
    yaz();
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const x0 = 30, x1 = w - 30, y = H * 0.56;
      ctx.strokeStyle = rgba(C.brass, 0.5); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
      if (mod === "asil") {
        const M = 130, X = (m) => x0 + (m / M) * (x1 - x0);
        for (let m = 0; m <= M; m += 10) { ctx.beginPath(); ctx.moveTo(X(m), y); ctx.lineTo(X(m), y + (m % 50 ? 4 : 8)); ctx.stroke(); if (m % 50 === 0) ctx.fillText(m + " m", X(m), y + 22); }
        let a, k;
        if (kos != null) { a = Math.min(VA * kos, M); k = BAS + VK * kos; }
        else [a, k] = asilKonum(adim);
        // geçmiş adımların izleri
        if (kos == null) for (let i = 1; i <= adim; i++) { const [ai] = asilKonum(i); ctx.fillStyle = rgba(C.brass, 0.6); ctx.beginPath(); ctx.arc(X(ai), y, 2.5, 0, 7); ctx.fill(); }
        // 111,1 m'deki buluşma noktası
        ctx.strokeStyle = rgba(C.brass, 0.4); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(X(1000 / 9), y - 70); ctx.lineTo(X(1000 / 9), y + 10); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = C.brass; ctx.fillText("111,1 m", X(1000 / 9), y - 76);
        kosucu(ctx, X(a), y, ORANGE, "Aşil", true);
        kaplumbaga(ctx, X(k), y);
        // yakınlaştırılmış mesafe ölçeği
        if (kos == null && adim > 0) {
          const gap = k - a;
          ctx.fillStyle = C.ink; ctx.textAlign = "left";
          ctx.fillText(`aradaki mesafe: ${fmt(gap)} m`, 30, 28);
          const bw = clamp(Math.log10(gap * 1000 + 1) * 40, 2, w - 80);
          ctx.fillStyle = rgba(ORANGE, 0.6); ctx.fillRect(30, 38, bw, 4);
        }
      } else {
        const X = (f) => x0 + f * (x1 - x0);
        ctx.fillText("0", X(0), y + 22); ctx.fillText("1", X(1), y + 22); ctx.fillText("½", X(0.5), y + 22);
        let pos = 0;
        for (let i = 0; i < adim; i++) {
          const seg = Math.pow(0.5, i + 1);
          const yy = y - 18 - (i % 2) * 10;
          ctx.strokeStyle = i % 2 ? "#79AEEA" : ORANGE; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(X(pos) + 1, yy); ctx.lineTo(X(pos + seg) - 1, yy); ctx.stroke();
          if (i < 6) { ctx.fillStyle = C.ink; ctx.fillText("1/" + Math.pow(2, i + 1), X(pos + seg / 2), yy - 8); }
          pos += seg;
        }
        kosucu(ctx, X(pos), y, ORANGE, "", false);
        ctx.strokeStyle = C.brass; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(1), y - 40); ctx.lineTo(X(1), y + 6); ctx.stroke();
        ctx.fillStyle = C.brass; ctx.fillText("varış", X(1), y - 46);
        // toplam çubuğu
        const by = H * 0.82;
        ctx.fillStyle = rgba(C.ink, 0.08); ctx.fillRect(x0, by, x1 - x0, 8);
        ctx.fillStyle = C.brass; ctx.fillRect(x0, by, (x1 - x0) * pos, 8);
      }
      ctx.textAlign = "left";
    }
    function kosucu(ctx, x, y, col, ad, bacak) {
      // siyah figür vazo koşucusu: basit siluet
      const s = 1, ph = Math.sin(t * 12) * (kos != null ? 1 : 0.25);
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 3; ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(x, y - 44 * s, 6, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x, y - 37); ctx.lineTo(x - 3, y - 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - 3, y - 18); ctx.lineTo(x - 3 + 9 * ph, y - 2); ctx.moveTo(x - 3, y - 18); ctx.lineTo(x - 3 - 9 * ph, y - 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - 1, y - 32); ctx.lineTo(x + 9 * ph, y - 22); ctx.moveTo(x - 1, y - 32); ctx.lineTo(x - 9 * ph, y - 24); ctx.stroke();
      if (ad) { ctx.font = `600 12px ${FONT.ui}`; ctx.fillStyle = col; ctx.textAlign = "center"; ctx.fillText(ad, x, y - 58); }
    }
    function kaplumbaga(ctx, x, y) {
      ctx.fillStyle = "#9CCB72"; ctx.strokeStyle = C.bg2; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(x, y - 8, 14, 8, 0, Math.PI, 0); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 16, y - 6, 4, 0, 7); ctx.fill();
      ctx.font = `600 12px ${FONT.ui}`; ctx.fillStyle = "#9CCB72"; ctx.textAlign = "center"; ctx.fillText("kaplumbağa", x, y - 24);
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      if (kos != null) { kos += dt * 1.8; if (kos > 13) kos = 13; }
      draw();
    });
    return { enter: () => lp.start(), leave: () => { lp.stop(); clearInterval(otoT); } };
  };

  /* --- Uçan ok --- */
  D.ok = function (stage) {
    const cv = h("canvas", { "aria-label": "Uçan ok" });
    const fill = h("div.fill", cv);
    const oyKap = h("div.pad.scroll.as-oy");
    let t = 0, dur = false, kare = 1;
    const don = h("button.btn.primary", { type: "button", onclick: () => { dur = !dur; don.textContent = dur ? "Zamanı akıt" : "Zamanı dondur"; } }, "Zamanı dondur");
    const sl = L.slider({ label: "Kare sayısı", min: 1, max: 16, step: 1, value: 1, fmt: (v) => (v === 1 ? "tek an" : v + " an"), oninput: (v) => (kare = v) });
    stage.append(fill, h("div.controls", don, sl), oyKap);
    Oy.secim(oyKap, {
      anahtar: "zenon-ok", soru: "Ok, uçuşunun herhangi bir anında hareket ediyor mu?",
      secenekler: [
        { v: "durur", ad: "Hayır: her anda duruyorsa hiç hareket etmez", ilke: "Bütün, parçalarının toplamıdır; hiçbir parçada hareket yoksa bütünde de yoktur.", filozof: ["zenon_elea", "parmenides"],
          itiraz: "Bir çizginin hiçbir noktasında uzunluk yoktur, ama çizginin uzunluğu vardır. Bütün her zaman parçaların basit toplamı değildir." },
        { v: "aralik", ad: "Hareket anlarda değil, zaman aralıklarında olur", ilke: "Zaman bölünmez \"şimdi\"lerden oluşmaz; hareket ve dinlenme ancak bir süre boyunca anlamlıdır.", filozof: ["aristoteles"],
          itiraz: "O zaman \"tam şu anda ok nerede ve ne yapıyor?\" sorusunun cevabı yok mu?" },
        { v: "limit", ad: "Evet: her anda belirli bir anlık hızı vardır", ilke: "Anlık hız, giderek kısalan aralıklardaki ortalama hızların limitidir; tek bir anda bile tanımlıdır.", filozof: ["leibniz"],
          lehte: "Fizik her gün bu kavramla çalışır: hız göstergesi tam olarak bunu ölçer.", itiraz: "Limit bir tanımdır; okun o anda gerçekten \"hareket ettiğini\" mi gösterir, yoksa yalnızca hesap yapmamızı mı sağlar?" },
      ],
    });
    let st;
    function okCiz(ctx, x, y, al) {
      ctx.save(); ctx.translate(x, y); ctx.scale(1.5, 1.5); ctx.translate(-x, -y);
      ctx.globalAlpha = al;
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - 70, y); ctx.lineTo(x, y); ctx.stroke();
      ctx.fillStyle = ORANGE; ctx.beginPath(); ctx.moveTo(x + 12, y); ctx.lineTo(x - 2, y - 6); ctx.lineTo(x - 2, y + 6); ctx.fill();
      ctx.strokeStyle = ORANGE; ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - 70 + i * 5, y); ctx.lineTo(x - 78 + i * 5, y - 7); ctx.moveTo(x - 70 + i * 5, y); ctx.lineTo(x - 78 + i * 5, y + 7); ctx.stroke(); }
      ctx.globalAlpha = 1; ctx.restore();
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const x0 = 140, x1 = w - 50, y = H * 0.45;
      const u = (t % 3) / 3;
      const X = (f) => x0 + f * (x1 - x0);
      // yörünge
      ctx.strokeStyle = rgba(C.brass, 0.25); ctx.setLineDash([2, 6]); ctx.beginPath(); ctx.moveTo(x0 - 80, y); ctx.lineTo(x1 + 10, y); ctx.stroke(); ctx.setLineDash([]);
      if (kare > 1) {
        // film şeridi: her kare donmuş bir an
        for (let i = 0; i < kare; i++) {
          const f = (i + 0.5) / kare;
          okCiz(ctx, X(f), y, 0.22 + (Math.abs(f - u) < 0.5 / kare ? 0.6 : 0));
          ctx.strokeStyle = rgba(C.brass, 0.35); ctx.strokeRect(X(i / kare) + 2, y - 26, (x1 - x0) / kare - 4, 52);
        }
      }
      if (!dur || kare === 1) okCiz(ctx, X(u), y, 1);
      ctx.font = `600 14px ${FONT.ui}`; ctx.textAlign = "center";
      if (dur) {
        ctx.fillStyle = C.brass;
        ctx.fillText(kare === 1 ? "Bu anda ok bir yeri kaplıyor ve duruyor. Hızı nerede?" : `Uçuş ${kare} ana bölündü: her karede ok durgun.`, w / 2, H * 0.78);
        ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.muted;
        ctx.fillText("\"Bir anın içinde hareket edecek zaman yoktur.\"", w / 2, H * 0.78 + 22);
      } else {
        ctx.fillStyle = C.muted; ctx.font = `italic 13px ${FONT.body}`;
        ctx.fillText("ok uçuyor", w / 2, H * 0.78);
      }
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { if (!dur) t += dt; draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Dört öğe: sevgi ve nefret, Anaksagoras'ın nous'u --- */
  D.ogeler = function (stage) {
    const cv = h("canvas", { "aria-label": "Dört öğe simülasyonu" });
    const fill = h("div.fill", cv);
    const oyKap = h("div.pad.scroll.as-oy");
    let sevgi = 0.5, nous = 0, dongu = false, t = 0;
    const sl = L.slider({ label: "Sevgi – Nefret", min: 0, max: 1, step: 0.01, value: sevgi, fmt: (v) => (v > 0.62 ? "Sevgi" : v < 0.38 ? "Nefret" : "denge"), oninput: (v) => { sevgi = v; dongu = false; dongB.classList.remove("on"); } });
    const dongB = h("button.btn.ghost", { type: "button", onclick: () => { dongu = !dongu; dongB.classList.toggle("on", dongu); } }, "Kozmik döngü");
    const nousB = h("button.btn", { type: "button", onclick: () => { nous = nous ? 0 : 1; nousB.classList.toggle("on", !!nous); } }, "Nous: girdabı başlat");
    stage.append(fill, h("div.controls", sl, dongB, nousB), oyKap);
    Oy.secim(oyKap, {
      anahtar: "empedokles", soru: "Dünyadaki birleşme ve ayrışmayı en iyi ne açıklar?",
      secenekler: [
        { v: "kuvvet", ad: "Birbirine zıt iki kuvvet", ilke: "Kalıcı öğeler değişmez; değişim, onları birleştiren ve ayıran kuvvetlerden doğar.", filozof: ["empedokles"],
          lehte: "Bugünkü fizik de değişimi parçacıklar arasındaki çekme ve itme kuvvetleriyle açıklar.", itiraz: "\"Sevgi\" ve \"nefret\" insana ait duygular; doğaya bunları yüklemek bir benzetme mi, bir açıklama mı?" },
        { v: "nous", ad: "Düzen veren bir akıl", ilke: "Kendiliğinden düzen çıkmaz; hareketin ve düzenin kaynağı bir akıldır.", filozof: ["anaksagoras", "aristoteles"],
          itiraz: "Sokrates'in yakınması: Anaksagoras nous'tan söz edip sonra her şeyi yine hava ve suyla açıkladı (Phaidon 98b)." },
        { v: "rastlanti", ad: "Rastlantı ve zorunluluk", ilke: "Hiçbir amaç ya da kuvvet gerekmez; parçacıklar çarpışır, bazı düzenlemeler tutunur.", filozof: ["demokritos"],
          itiraz: "Kör çarpışmalar canlıların karmaşık düzenini açıklamaya yeter mi? Aristoteles bunu yetersiz buldu (Fizik II.8)." },
      ],
    });
    const COL = ["#8C6A45", "#4E86C6", "#C9D3E6", "#E8743B"]; // toprak, su, hava, ateş
    const AD = ["toprak", "su", "hava", "ateş"];
    const r = L.rng(5);
    const P = Array.from({ length: 200 }, (_, i) => ({ k: i % 4, x: r(), y: r(), vx: 0, vy: 0 }));
    let st;
    function adimla(dt) {
      const s = dongu ? (Math.sin(t * 0.45) + 1) / 2 : sevgi;
      // hedef: sevgide hepsi merkezde karışık küre; nefrette her öğe kendi katmanında
      P.forEach((p, i) => {
        const mx = 0.5, my = 0.5;
        const ang = (i * 2.399) % 6.283, rad = Math.sqrt((i + 0.5) / P.length) * 0.32;
        const tx1 = mx + Math.cos(ang) * rad, ty1 = my + Math.sin(ang) * rad;
        // nefret: ağır olan aşağı (toprak), sonra su, hava, ateş en üstte
        const tx2 = 0.08 + ((i * 0.618) % 1) * 0.84, ty2 = 0.88 - p.k * 0.25 + ((i * 0.37) % 1) * 0.08 - 0.04;
        let tx = lerp(tx2, tx1, s), ty = lerp(ty2, ty1, s);
        if (nous) { // girdap: merkez etrafında dönüş, yoğun olan merkeze, hafif olan dışa
          const a = Math.atan2(p.y - 0.5, p.x - 0.5) + dt * 0.9;
          const rr = 0.12 + (3 - p.k) * 0.07 + ((i * 0.13) % 1) * 0.05;
          tx = lerp(tx, 0.5 + Math.cos(a) * rr, 0.85); ty = lerp(ty, 0.5 + Math.sin(a) * rr, 0.85);
        }
        p.vx += (tx - p.x) * dt * 2.2 + (r() - 0.5) * dt * 0.05; p.vy += (ty - p.y) * dt * 2.2 + (r() - 0.5) * dt * 0.05;
        p.vx *= 0.9; p.vy *= 0.9; p.x += p.vx * dt * 6; p.y += p.vy * dt * 6;
      });
      return s;
    }
    let sNow = sevgi;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const S = Math.min(w, H * 1.3), ox = (w - S) / 2;
      P.forEach((p) => { ctx.fillStyle = COL[p.k]; ctx.beginPath(); ctx.arc(ox + p.x * S, p.y * H, p.k === 3 ? 2.6 + Math.random() : 3, 0, 7); ctx.fill(); });
      // gösterge
      ctx.font = `600 12px ${FONT.ui}`;
      AD.forEach((a, i) => { ctx.fillStyle = COL[i]; ctx.beginPath(); ctx.arc(18 + i * 72, 18, 5, 0, 7); ctx.fill(); ctx.fillStyle = C.ink2; ctx.fillText(a, 28 + i * 72, 22); });
      ctx.font = `italic 14px ${FONT.body}`; ctx.fillStyle = C.ink; ctx.textAlign = "right";
      ctx.fillText(nous ? "nous: girdap şeyleri ayrıştırıyor" : sNow > 0.62 ? "Sevgi üstün: her şey tek bir kürede karışıyor" : sNow < 0.38 ? "Nefret üstün: öğeler ayrışıp katmanlara çekiliyor" : "Sevgi ile Nefret dengede: canlılar dünyası", w - 14, H - 12);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; sNow = adimla(dt); if (dongu) sl.set(sNow); draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Atomcular: kesme deneyi --- */
  const OLCEK = [ // kesim sayısına göre yaklaşık boyut ve ne olduğu (8 cm'lik elma)
    [0, "elma"], [4, "elma dilimi"], [7, "bir tohum kadar"], [10, "kum tanesi"], [13, "tek bir hücre"], [17, "bir bakteri"],
    [21, "bir virüs"], [24, "büyük bir protein molekülü"], [27, "küçük bir molekül"], [30, "tek bir atom"],
  ];
  D.kesme = function (stage) {
    const cv = h("canvas", { "aria-label": "Kesme deneyi" });
    const fill = h("div.fill", cv);
    const bilgi = h("p.km-bilgi");
    const oyKap = h("div.pad.scroll.as-oy");
    let n = 0, anim = 0;
    const kes = h("button.btn.primary", { type: "button", onclick: () => { if (n < 34) { n++; anim = 1; yaz(); } } }, "İkiye böl");
    const on = h("button.btn", { type: "button", onclick: () => { n = Math.min(34, n + 10); anim = 1; yaz(); } }, "10 kez böl");
    const sif = h("button.btn.ghost", { type: "button", onclick: () => { n = 0; yaz(); } }, "Yeni elma");
    stage.append(fill, h("div.controls", kes, on, sif, bilgi), oyKap);
    Oy.secim(oyKap, {
      anahtar: "atomcular", soru: "Kesmeyi sonsuza dek sürdürebilir misiniz?",
      secenekler: [
        { v: "durur", ad: "Hayır: bir yerde kesilemeyen parçalara ulaşırım", ilke: "Bölünme sonsuz olsaydı her şey hiçe çözülürdü; en küçük, bölünemez parçalar olmalı.", filozof: ["leukippos", "demokritos"],
          lehte: "Madde gerçekten ayrık birimlerden oluşuyor: atomlar, onların içinde de parçacıklar.", itiraz: "Bir şeyin uzunluğu varsa, en azından düşüncede ikiye bölünebilir. \"Bölünemez büyüklük\" fikri tutarlı mı?" },
        { v: "sonsuz", ad: "Evet: her parça yeniden bölünebilir", ilke: "En küçük diye bir şey yoktur; her şeyden daha küçüğü vardır.", filozof: ["anaksagoras", "aristoteles"],
          itiraz: "Bugünkü fiziğe göre elektron ya da kuark gibi parçacıkların bilinen bir iç yapısı yok. Belki bölünme gerçekten bir yerde durur." },
      ],
    });
    function yaz() {
      const cm = 8 / Math.pow(2, n);
      let et = OLCEK[0][1]; OLCEK.forEach(([k, s]) => { if (n >= k) et = s; });
      const boy = cm >= 1 ? cm.toFixed(cm >= 10 ? 0 : 1) + " cm" : cm >= 1e-3 ? (cm * 10).toPrecision(2) + " mm" : cm >= 1e-6 ? (cm * 1e4).toPrecision(2) + " µm" : (cm * 1e7).toPrecision(2) + " nm";
      bilgi.innerHTML = `<b>${n}</b> kesim · <b>${boy.replace(".", ",")}</b> · ${n > 30 ? "atomun içi: çekirdek ve elektronlar (modern atom bölünebilir)" : et}`;
    }
    yaz();
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const cx = w / 2, cy = H * 0.48, R = Math.min(w, H) * 0.3;
      // logaritmik cetvel
      const x0 = 30, x1 = w - 30, ly = H - 26;
      ctx.strokeStyle = rgba(C.brass, 0.5); ctx.beginPath(); ctx.moveTo(x0, ly); ctx.lineTo(x1, ly); ctx.stroke();
      ctx.font = `500 11px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center";
      [[0, "8 cm"], [10, "≈0,1 mm"], [20, "≈80 nm"], [30, "≈0,1 nm"]].forEach(([k, s]) => { const x = x0 + (k / 34) * (x1 - x0); ctx.beginPath(); ctx.moveTo(x, ly - 4); ctx.lineTo(x, ly + 4); ctx.stroke(); ctx.fillText(s, x, ly + 16); });
      ctx.fillStyle = C.brass; ctx.beginPath(); ctx.arc(x0 + (n / 34) * (x1 - x0), ly, 5, 0, 7); ctx.fill();
      ctx.textAlign = "left";
      // yarım parça: her kesimde aynı ekranda gösterilir, ama doku değişir
      const ac = anim;
      ctx.save(); ctx.translate(cx, cy);
      if (n === 0) {
        const g = ctx.createRadialGradient(-R * 0.35, -R * 0.3, R * 0.1, 0, 6, R);
        g.addColorStop(0, "#D9674F"); g.addColorStop(1, "#8E2E22");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 6, R, 0, 7); ctx.fill();
        ctx.strokeStyle = rgba(C.brass, 0.7); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(0, 6, R + 6, 0, 7); ctx.stroke();
        ctx.strokeStyle = "#5a3a1a"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -R + 6); ctx.quadraticCurveTo(6, -R - 14, 14, -R - 20); ctx.stroke();
        ctx.fillStyle = "#6B8E3A"; ctx.beginPath(); ctx.ellipse(22, -R - 10, 16, 7, -0.4, 0, 7); ctx.fill();
      } else if (n <= 12) {
        // yarım elma kesiti ve giderek belirginleşen hücre dokusu
        ctx.fillStyle = "#EFE2BE"; ctx.beginPath(); ctx.arc(0, 0, R, -Math.PI / 2, Math.PI / 2); ctx.fill();
        ctx.strokeStyle = "#B8402F"; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, R, -Math.PI / 2, Math.PI / 2); ctx.stroke();
        ctx.strokeStyle = "#B8402F"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -R); ctx.lineTo(0, R); ctx.stroke();
        const k = n / 12, rr = L.rng(n);
        for (let i = 0; i < 50 * k; i++) { const a = rr() * 3.1 - 1.55, d = rr() * R * 0.92; ctx.strokeStyle = "rgba(160,120,60,.35)"; ctx.beginPath(); ctx.arc(Math.cos(a) * d, Math.sin(a) * d, 3 + k * 12, 0, 7); ctx.stroke(); }
      } else if (n <= 22) {
        // hücreler, sonra moleküller
        const rr = L.rng(n * 3), m = n <= 17 ? 1 : 2;
        for (let i = 0; i < 40; i++) {
          const x = (rr() - 0.5) * R * 2, y = (rr() - 0.5) * R * 2;
          if (m === 1) { ctx.strokeStyle = "rgba(230,210,160,.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, y, 16, 12, rr() * 3, 0, 7); ctx.stroke(); }
          else { ctx.strokeStyle = "rgba(121,174,234,.7)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); for (let j = 0; j < 4; j++) ctx.lineTo(x + (rr() - 0.5) * 30, y + (rr() - 0.5) * 30); ctx.stroke(); }
        }
      } else if (n <= 30) {
        // atomlar: renkli küreler ve bağlar
        const rr = L.rng(n * 7), s = n >= 29 ? 2.6 : 1;
        const cols = ["#EDE7DC", "#E0524A", "#79AEEA", "#8A8F9A"];
        for (let i = 0; i < (n >= 29 ? 3 : 14); i++) { const x = (rr() - 0.5) * R * 1.6, y = (rr() - 0.5) * R * 1.6; ctx.fillStyle = cols[i % 4]; ctx.beginPath(); ctx.arc(x, y, 9 * s, 0, 7); ctx.fill(); }
      } else {
        // atomun içi: çekirdek ve elektron bulutu
        ctx.fillStyle = "rgba(121,174,234,.12)"; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.fill();
        ctx.fillStyle = "#E0524A"; ctx.beginPath(); ctx.arc(0, 0, 6, 0, 7); ctx.fill();
        ctx.strokeStyle = rgba(C.ink, 0.25); [0.4, 0.7, 0.95].forEach((f) => { ctx.beginPath(); ctx.arc(0, 0, R * f, 0, 7); ctx.stroke(); });
      }
      ctx.restore();
      if (ac > 0) { ctx.strokeStyle = rgba(C.brass, ac); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy - R - 20); ctx.lineTo(cx, cy + R + 20); ctx.stroke(); }
      if (n === 30 || n === 29) { ctx.font = `italic 14px ${FONT.body}`; ctx.fillStyle = C.brass; ctx.textAlign = "center"; ctx.fillText("Demokritos'un \"atom\"u burada olurdu. Ama bu atomlar da bölünebilir.", cx, 26); ctx.textAlign = "left"; }
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { if (anim > 0) { anim = Math.max(0, anim - dt * 2); } draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };
})();
