/* Büyük soru 8 deneyi: Sisifos ve dört yol */
(function () {
  const { h, C, FONT, rgba } = L;
  const D = window.Demos;

  const OKUL = {
    camus: { ad: "Camus: absürd ve başkaldırı", ilke: "Anlam arayışımız ile dünyanın sessizliği arasındaki çatışma saçmadır; ona rağmen, farkında olarak yaşamak başkaldırıdır.",
      filozof: ["camus", "sartre"], itiraz: "Başkaldırının kendisi de bir anlam önerisi değil mi? Eleştirmenlere göre Camus anlamsızlığı kabul edip sonra ona gizlice bir değer yüklüyor." },
    stoa: { ad: "Stoacılar: kabul ve erdem", ilke: "Bize bağlı olan yalnızca yargılarımız ve seçimlerimizdir; erdem mutluluk için yeterlidir.",
      filozof: ["epiktetos", "seneka", "marcus_aurelius"], itiraz: "Sevdiklerimizin acısına bu kadar sakin bakmak insanca mı? Stoacı huzur bir duygusal geri çekilmeye dönüşebilir." },
    epikuros: { ad: "Epikuros: huzur ve dostluk", ilke: "İyi hayat acı ve kaygıdan kurtulmaktır; sade hazlar, dostluk ve ölüm korkusundan özgürleşmek yeter.",
      filozof: ["epikuros"], itiraz: "Huzur her şey mi? Bir hedef uğruna acıyı göze almak da anlamlı bir hayatın parçası olabilir." },
    buda: { ad: "Buda: tutunmayı bırakmak", ilke: "Acı, gelip geçen şeylere ve kalıcı bir \"ben\"e tutunmaktan doğar; bunu görmek özgürleştirir.",
      filozof: ["buda"], itiraz: "Nietzsche gibi eleştirmenlere göre arzuyu söndürmek yaşamın kendisinden geri çekilmektir." },
  };
  const SORU = [
    ["Hayatın önceden verilmiş bir anlamı var mı?", [
      ["camus", "Yok; anlamsızlığın farkında olup yine de yaşamak gerek."],
      ["stoa", "Evrende akılla işleyen bir düzen var; ona uyumlu yaşamak anlamdır."],
      ["buda", "Soru bir \"ben\"e tutunmaktan doğuyor; tutunmayı bırakınca çözülür."],
      ["epikuros", "Kozmik bir anlam yok, ama huzurlu ve dostlarla dolu bir hayat mümkün."]]],
    ["Başınıza kötü bir şey geldiğinde ilk ne yaparsınız?", [
      ["stoa", "Neyin bana bağlı olduğunu ayırırım; olaya değil yargıma bakarım."],
      ["epikuros", "Acıyı azaltmanın yolunu arar, güzel anıları ve dostlarımı hatırlarım."],
      ["camus", "Kabullenmem; dünyanın kayıtsızlığına rağmen dimdik dururum."],
      ["buda", "Acının da geçici olduğunu, ona tutunmanın onu büyüttüğünü görmeye çalışırım."]]],
    ["Mutluluk için en önemli şey nedir?", [
      ["buda", "Arzunun sönmesi, iç huzur."],
      ["camus", "Şimdi ve burada, tutkuyla ve yoğun yaşamak."],
      ["epikuros", "Sade zevkler, dostluk ve kaygısızlık."],
      ["stoa", "İyi bir karakter; gerisi bonus."]]],
    ["Ölüm hakkında ne düşünürsünüz?", [
      ["epikuros", "Ben varken ölüm yok, ölüm varken ben yokum; korkmaya gerek yok."],
      ["camus", "Kaçınılmaz ve anlamsız; tam da bu yüzden şimdi değerli."],
      ["stoa", "Doğanın bir parçası; her gün ona hazır yaşamak."],
      ["buda", "Doğum ve ölüm, tutunan bir döngünün parçaları."]]],
    ["Arzular hakkında?", [
      ["camus", "Arzu ve tutku hayatın ta kendisi; bastırmadan yaşa."],
      ["buda", "Arzuya tutunmak acının kaynağıdır."],
      ["stoa", "Arzu yalnızca bana bağlı olana yönelmeli."],
      ["epikuros", "Doğal ve gerekli olanları karşıla, gerisini bırak."]]],
  ];

  D.anlam = function (stage) {
    stage.classList.add("anlam");
    const cv = h("canvas", { "aria-label": "Sisifos" });
    const fill = h("div.fill.an-sahne", cv);
    const alt = h("div.pad.scroll.an-alt");
    stage.append(fill, alt);
    const cevap = SORU.map((_, i) => Oy.get("s-anlam.q" + (i + 1)) || null);
    const sonuc = h("div.an-sonuc", { "aria-live": "polite" });
    SORU.forEach(([q, ops], i) => {
      const row = h("div.an-row");
      const btns = ops.map(([k, t]) => h("button.btn.an-sec", { type: "button", "data-k": k, onclick: () => { cevap[i] = k; Oy.set("s-anlam.q" + (i + 1), k); isaretle(); hesapla(); } }, t));
      row.append(...btns);
      alt.append(h("div.an-q", h("p.an-soru", `${i + 1}. ${q}`), row));
    });
    const sifir = h("button.btn.ghost", { type: "button", onclick: () => { cevap.fill(null); isaretle(); sonuc.innerHTML = ""; } }, "Baştan başla");
    alt.append(sonuc, sifir);
    function isaretle() {
      alt.querySelectorAll(".an-q").forEach((q, i) => q.querySelectorAll(".an-sec").forEach((b) => b.classList.toggle("on", b.dataset.k === cevap[i])));
    }
    function hesapla() {
      const n = cevap.filter(Boolean).length;
      sonuc.innerHTML = "";
      if (n < SORU.length) { sonuc.append(h("p.muted", `${n}/${SORU.length} soru cevaplandı.`)); return; }
      const say = { camus: 0, stoa: 0, epikuros: 0, buda: 0 };
      cevap.forEach((k) => say[k]++);
      const sira = Object.keys(say).sort((a, b) => say[b] - say[a]);
      const ilk = sira[0];
      Oy.set("s-anlam.sonuc", ilk);
      const bars = h("div.oy-bars");
      sira.forEach((k) => bars.append(h("div.oy-bar", h("span", OKUL[k].ad.split(":")[0]), h("span.tr", h("i", { style: { width: (say[k] / SORU.length) * 100 + "%" } })), h("span.val", say[k] + "/5"))));
      const esit = say[sira[1]] === say[ilk];
      sonuc.append(h("h4", esit ? "Cevaplarınız iki yol arasında bölünmüş" : "Cevaplarınıza en yakın yol: " + OKUL[ilk].ad), bars, Oy.ilkePanel(OKUL[ilk]),
        h("p.muted", "Bu bir kişilik testi değil; dört geleneğin çok kaba bir haritası. Çoğu insan hepsinden bir parça taşır."));
    }
    isaretle(); hesapla();

    // Sisifos: kaya tepeye itilir, geri yuvarlanır; döngü
    let t = 0, st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const x0 = w * 0.08, y0 = H * 0.88, x1 = w * 0.78, y1 = H * 0.22;
      ctx.fillStyle = "rgba(201,165,92,.08)";
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x1 + w * 0.12, y1); ctx.lineTo(w, H); ctx.lineTo(0, H); ctx.fill();
      ctx.strokeStyle = rgba(C.brass, 0.6); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x1 + w * 0.12, y1); ctx.stroke();
      const T = 9, f = (t % T) / T;
      // 0–0.78 yukarı itiş, 0.78–1 geri yuvarlanma
      let k, iter = true;
      if (f < 0.78) k = f / 0.78; else { k = 1 - (f - 0.78) / 0.22; iter = false; }
      const ang = Math.atan2(y1 - y0, x1 - x0);
      const R = Math.min(w, H) * 0.08;
      const bx = x0 + (x1 - x0) * k - Math.sin(ang) * R, by = y0 + (y1 - y0) * k - Math.cos(ang) * -R - R * 2;
      const cx = x0 + (x1 - x0) * k, cy = y0 + (y1 - y0) * k;
      const nx = Math.sin(ang), ny = -Math.cos(ang);
      const rx = cx + nx * R, ry = cy + ny * R;
      ctx.fillStyle = "#6E6A66"; ctx.beginPath(); ctx.arc(rx, ry, R, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.arc(rx, ry, R * 0.6, k * 20, k * 20 + 1.2); ctx.stroke();
      if (iter) { // iten figür: siyah figür üslubunda
        const dx = Math.cos(ang), dy = Math.sin(ang);
        const fx = rx - dx * R * 1.9, fy = ry - dy * R * 1.9;
        ctx.strokeStyle = "#1a1210"; ctx.fillStyle = "#1a1210"; ctx.lineWidth = Math.max(3, R * 0.18); ctx.lineCap = "round";
        ctx.beginPath(); ctx.arc(fx + dx * R * 0.2, fy - R * 1.05, R * 0.28, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.moveTo(fx, fy - R * 0.75); ctx.lineTo(fx - dx * R * 0.4, fy + R * 0.3); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(fx - dx * R * 0.4, fy + R * 0.3); ctx.lineTo(fx - dx * R * 1.1, fy + R * 0.9 + Math.sin(t * 6) * 4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(fx - dx * R * 0.4, fy + R * 0.3); ctx.lineTo(fx - dx * R * 0.2, fy + R * 1.0 - Math.sin(t * 6) * 4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(fx, fy - R * 0.55); ctx.lineTo(rx - dx * R * 0.95, ry - dy * R * 0.95); ctx.stroke();
      } else {
        ctx.font = `italic 14px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.fillText("…ve yeniden aşağı iner", x1 - w * 0.18, y1 - 14);
      }
      ctx.font = `italic 15px ${FONT.body}`; ctx.fillStyle = C.ink; ctx.textAlign = "right";
      ctx.fillText("\"Sisifos'u mutlu hayal etmek gerekir.\"", w - 16, H - 14);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };
})();
