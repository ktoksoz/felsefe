/* 3. Sofistler ve Sokrates deneyleri: üç kova, Delfi kâhini, Sokratik sorgulama, Kriton */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;

  /* --- Protagoras: üç kova --- */
  D.kovalar = function (stage) {
    const cv = h("canvas", { "aria-label": "Üç kova deneyi" });
    const fill = h("div.fill", cv);
    const oyKap = h("div.pad.scroll.kv-oy");
    // evre 0: başlangıç, 1: eller soğuk ve sıcakta (alışma), 2: ikisi ılıkta
    let evre = 0, alis = 0, t = 0;
    const b1 = h("button.btn.primary", { type: "button", onclick: () => { evre = 1; alis = 0; } }, "Elleri hazırla");
    const b2 = h("button.btn", { type: "button", onclick: () => { if (evre === 0) { evre = 1; alis = 1; } evre = 2; } }, "İkisini ılık suya");
    const b3 = h("button.btn.ghost", { type: "button", onclick: () => { evre = 0; alis = 0; } }, "Baştan");
    stage.append(fill, h("div.controls", b1, b2, b3), oyKap);
    Oy.secim(oyKap, {
      anahtar: "protagoras", soru: "Ilık su gerçekte sıcak mı, soğuk mu?",
      secenekler: [
        { v: "gercek", ad: "Su gerçekte ılıktır; ellerim yanılıyor", ilke: "Algıdan bağımsız bir gerçeklik vardır; duyular onu bozarak bize ulaştırır.", filozof: ["platon", "demokritos"],
          lehte: "Bir termometre her iki el için de aynı değeri gösterir.", itiraz: "Termometre de bir ölçü aracıdır; neden onun \"görüşü\" sizin elinizden daha gerçek olsun?" },
        { v: "goreli", ad: "Sol elim için sıcak, sağ elim için soğuk: ikisi de doğru", ilke: "İnsan her şeyin ölçüsüdür: bir şey bana nasıl görünüyorsa benim için öyledir.", filozof: ["protagoras"],
          lehte: "Kimse sizin ne hissettiğinizi sizden daha iyi bilemez.", itiraz: "Her inanç doğruysa, \"Protagoras yanılıyor\" inancı da doğrudur. Görecelik kendini çürütmez mi? (Platon, Theaitetos 171a)" },
        { v: "askiya", ad: "Bilemem; yargımı askıya alırım", ilke: "İki görünüş eşit güçteyse, birini ötekine tercih etmenin gerekçesi yoktur.", filozof: ["pyrrhon"],
          itiraz: "Yargıyı her konuda askıya alan biri nasıl yaşar? Bir yere ellerini koymak için bile bir karar vermek gerekir." },
      ],
    });
    let st;
    const sicak = (s) => L.mix("#4E86C6", "#E0524A", s); // 0 soğuk, 1 sıcak
    function kova(ctx, x, y, w, H, s, ad, der) {
      ctx.strokeStyle = C.brass; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x - w / 2 * 0.82, y + H); ctx.lineTo(x + w / 2 * 0.82, y + H); ctx.lineTo(x + w / 2, y); ctx.stroke();
      ctx.fillStyle = rgba(sicak(s).startsWith("rgb") ? "#79AEEA" : "#79AEEA", 0);
      ctx.fillStyle = sicak(s).replace("rgb", "rgba").replace(")", ",0.45)");
      ctx.beginPath(); ctx.moveTo(x - w / 2 * 0.95, y + H * 0.2); ctx.lineTo(x - w / 2 * 0.82, y + H); ctx.lineTo(x + w / 2 * 0.82, y + H); ctx.lineTo(x + w / 2 * 0.95, y + H * 0.2); ctx.fill();
      // buhar ya da buz
      if (s > 0.7) for (let i = 0; i < 3; i++) { ctx.strokeStyle = rgba(C.ink, 0.35); ctx.beginPath(); const bx = x - 14 + i * 14; ctx.moveTo(bx, y - 4); ctx.bezierCurveTo(bx - 6, y - 14 - Math.sin(t * 2 + i) * 3, bx + 6, y - 20, bx, y - 30); ctx.stroke(); }
      ctx.font = `600 13px ${FONT.ui}`; ctx.fillStyle = C.ink; ctx.textAlign = "center"; ctx.fillText(ad, x, y + H + 20);
      ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.fillText(der, x, y + H + 36);
    }
    function el(ctx, x, y, his, ad) {
      // basit el silueti (vazo üslubu) ve hissedilen sıcaklık balonu
      ctx.fillStyle = "#D9874D";
      ctx.beginPath(); ctx.roundRect(x - 13, y - 40, 26, 44, 8); ctx.fill();
      for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.roundRect(x - 13 + i * 6.8, y, 5.6, 22 - Math.abs(i - 1.5) * 3, 3); ctx.fill(); }
      if (his != null) {
        const s = his;
        ctx.fillStyle = sicak(clamp(s, 0, 1)); ctx.beginPath(); ctx.arc(x, y - 66, 22, 0, 7); ctx.fill();
        ctx.font = `700 12px ${FONT.ui}`; ctx.fillStyle = "#14213D"; ctx.textAlign = "center";
        ctx.fillText(s > 0.62 ? "sıcak!" : s < 0.38 ? "soğuk!" : "ılık", x, y - 62);
      }
      if (his == null) { ctx.font = `600 12px ${FONT.ui}`; ctx.fillStyle = C.ink2; ctx.textAlign = "center"; ctx.fillText(ad, x, y - 48); }
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const kw = Math.min(120, w * 0.2), kh = kw * 0.75, ky = H * 0.55;
      const xs = [w * 0.2, w * 0.5, w * 0.8];
      kova(ctx, xs[0], ky, kw, kh, 0, "soğuk su", "5 °C");
      kova(ctx, xs[1], ky, kw, kh, 0.5, "ılık su", "25 °C");
      kova(ctx, xs[2], ky, kw, kh, 1, "sıcak su", "45 °C");
      // eller: alışma (adaptasyon) sonrası ılık su farklı hissedilir
      let sol, sag, his1 = null, his2 = null;
      if (evre === 0) { sol = [w * 0.35, ky - 70]; sag = [w * 0.65, ky - 70]; }
      else if (evre === 1) { sol = [xs[0] - 14, ky + 4]; sag = [xs[2] + 14, ky + 4]; his1 = lerp(0.3, 0.45, alis); his2 = lerp(0.7, 0.55, alis); }
      else { sol = [xs[1] - 18, ky + 4]; sag = [xs[1] + 18, ky + 4]; his1 = 0.85; his2 = 0.15; }
      el(ctx, sol[0], sol[1], his1, "sol el");
      el(ctx, sag[0], sag[1], his2, "sağ el");
      ctx.font = `italic 14px ${FONT.body}`; ctx.fillStyle = C.ink; ctx.textAlign = "center";
      const msg = evre === 0 ? "İki el de aynı sıcaklıkta." : evre === 1 ? (alis < 1 ? "Eller suya alışıyor…" : "Sol el soğuğa, sağ el sıcağa alıştı.") : "Aynı su: sol ele sıcak, sağ ele soğuk geliyor.";
      ctx.fillText(msg, w / 2, 30);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; if (evre === 1) alis = Math.min(1, alis + dt * 0.6); draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Sokrates: Delfi kâhini ve üç sorgulama --- */
  const KISI = [
    { id: "devlet", ad: "Devlet adamı", aria: "Devlet adamını sorgula", bilir: 1, sanir: 9,
      soru: "Adalet nedir? Kenti nasıl iyi yönetirsiniz?",
      cevap: "Kendinden emin uzun bir konuşma yaptı. Ama birkaç soru sonra söyledikleri birbiriyle çelişti.",
      not: "Bilge görünüyordu, en çok da kendine. Hiçbir şey bilmiyor ama bildiğini sanıyor (Savunma 21c–d)." },
    { id: "sair", ad: "Şair", aria: "Şairi sorgula", bilir: 2, sanir: 9,
      soru: "Şiirinde ne demek istedin?",
      cevap: "Şiirleri çok güzeldi. Ama ne anlama geldiklerini, orada bulunan herhangi biri ondan daha iyi açıklayabildi.",
      not: "Şairler bilgiyle değil, bir tür ilhamla yazıyor; ama bu yüzden başka konularda da bilge olduklarını sanıyorlar (22b–c)." },
    { id: "zanaat", ad: "Zanaatkâr", aria: "Zanaatkârı sorgula", bilir: 6, sanir: 10,
      soru: "Mesleğin hakkında ne biliyorsun? Ya en önemli konular hakkında?",
      cevap: "Kendi zanaatı hakkında gerçekten çok şey biliyordu. Ama bu yüzden devlet ve erdem gibi en büyük konuları da bildiğini sandı.",
      not: "Gerçek bir bilgiye sahipler, ama bu bilgi sınırlarını görmelerini engelliyor (22d–e)." },
  ];
  D.delfi = function (stage) {
    const cv = h("canvas", { "aria-label": "Delfi" });
    const fill = h("div.fill.df-fill", cv);
    const kartlar = h("div.df-kartlar");
    const sonuc = h("div.pad.scroll.df-sonuc", { "aria-live": "polite" });
    stage.append(fill, kartlar, sonuc);
    const gorulen = new Set();
    let aktif = null;
    sonuc.append(h("p.df-bos", "Kâhinin sözünü sınamak için bilge sayılan üç kişiden birini seçin."));
    KISI.forEach((k) => {
      const b = h("button.df-kart", { type: "button", "aria-label": k.aria, "data-k": k.id, onclick: () => sor(k) },
        h("b", k.ad), h("span", k.soru));
      kartlar.append(b);
    });
    function sor(k) {
      aktif = k; gorulen.add(k.id);
      kartlar.querySelectorAll(".df-kart").forEach((b) => { b.classList.toggle("on", b.dataset.k === k.id); b.classList.toggle("seen", gorulen.has(b.dataset.k)); });
      sonuc.innerHTML = "";
      sonuc.append(h("p.df-cevap", k.cevap), h("p.df-not", k.not));
      if (gorulen.size === 3) bitir();
      draw();
    }
    function bitir() {
      sonuc.append(h("p.df-varis", h("b", "Sokrates'in vardığı yer: "), "Ben de iyi ve güzel hiçbir şey bilmiyorum. Ama onlar bildiklerini sanıyor, ben sanmıyorum. Belki bu küçük farkla daha bilgeyim."));
      Oy.secim(sonuc, {
        anahtar: "sokrates", soru: "Size göre bilgelik en çok neye benzer?",
        secenekler: [
          { v: "cok", ad: "Çok şey bilmeye", ilke: "Bilgelik, geniş ve doğru bilgi birikimidir.", filozof: [],
            itiraz: "Sokrates'in sorguladığı herkes bir şeyler biliyordu; sorun, bilgilerinin sınırını görememeleriydi." },
          { v: "bilmedigini", ad: "Bilmediğini bilmeye", ilke: "Bilgelik, kendi bilgisinin sınırlarının farkında olmaktır.", filozof: ["sokrates"],
            itiraz: "Yalnızca bilmediğini bilmek, insana nasıl davranacağını söylemez. Bir noktada bilgiye dayanarak karar vermek gerekir." },
          { v: "pratik", ad: "Doğru zamanda doğru kararı verebilmeye", ilke: "Bilgelik, kuramsal bilgiden çok somut durumlarda iyi yargıda bulunma becerisidir (pratik bilgelik).", filozof: ["aristoteles", "konfucyus"],
            itiraz: "İyi kararın ölçüsü ne? Sokrates önce \"iyi\"nin ne olduğunu sormadan bu yargının güvenilir olamayacağını söylerdi." },
        ],
      });
    }
    let st, t = 0;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      // Delfi tapınağı cephesi: ince pirinç çizgiler
      const cx = w / 2, base = H * 0.8, tw = Math.min(w * 0.7, 420), th = Math.min(H * 0.62, 220);
      ctx.strokeStyle = rgba(C.brass, 0.75); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(cx - tw / 2 - 10, base); ctx.lineTo(cx + tw / 2 + 10, base); ctx.moveTo(cx - tw / 2, base - 6); ctx.lineTo(cx + tw / 2, base - 6); ctx.stroke();
      const n = 6;
      for (let i = 0; i < n; i++) {
        const x = cx - tw / 2 + 16 + (i * (tw - 32)) / (n - 1);
        ctx.beginPath(); ctx.moveTo(x - 6, base - 6); ctx.lineTo(x - 5, base - th * 0.7); ctx.moveTo(x + 6, base - 6); ctx.lineTo(x + 5, base - th * 0.7); ctx.stroke();
        for (let f = -3; f <= 3; f += 3) { ctx.strokeStyle = rgba(C.brass, 0.25); ctx.beginPath(); ctx.moveTo(x + f, base - 8); ctx.lineTo(x + f * 0.85, base - th * 0.7 + 2); ctx.stroke(); }
        ctx.strokeStyle = rgba(C.brass, 0.75);
      }
      const ey = base - th * 0.7;
      ctx.beginPath(); ctx.moveTo(cx - tw / 2 - 4, ey); ctx.lineTo(cx + tw / 2 + 4, ey); ctx.lineTo(cx + tw / 2 + 4, ey - 12); ctx.lineTo(cx - tw / 2 - 4, ey - 12); ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - tw / 2 - 8, ey - 12); ctx.lineTo(cx, ey - 12 - th * 0.26); ctx.lineTo(cx + tw / 2 + 8, ey - 12); ctx.stroke();
      ctx.font = `14px ${FONT.body}`; ctx.fillStyle = C.brass; ctx.textAlign = "center";
      ctx.fillText("ΓΝΩΘΙ ΣΑΥΤΟΝ", cx, ey - 20);
      ctx.font = `italic 12px ${FONT.body}`; ctx.fillStyle = C.muted; ctx.fillText("\"kendini bil\": Delfi tapınağının girişindeki söz", cx, base + 18);
      // kâhinin cevabı ya da aktif kişinin "bilgi ölçeri"
      if (!aktif) {
        ctx.font = `italic 16px ${FONT.body}`; ctx.fillStyle = C.ink;
        ctx.fillText("\"Sokrates'ten daha bilge kimse yok.\"", cx, 34);
        ctx.font = `12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.fillText("Pythia'nın cevabı", cx, 52);
      } else {
        const bw = Math.min(260, w * 0.6), bx = cx - bw / 2;
        ctx.font = `600 13px ${FONT.ui}`; ctx.fillStyle = C.ink; ctx.fillText(aktif.ad, cx, 26);
        [["bildiğini sandığı", aktif.sanir, "#E0524A"], ["gerçekten bildiği", aktif.bilir, "#9CCB72"]].forEach(([s, v, c], i) => {
          const y = 40 + i * 22;
          ctx.fillStyle = rgba(C.ink, 0.08); ctx.fillRect(bx, y, bw, 8);
          ctx.fillStyle = c; ctx.fillRect(bx, y, (bw * v) / 10 * Math.min(1, t * 2), 8);
          ctx.font = `12px ${FONT.ui}`; ctx.fillStyle = C.ink2; ctx.textAlign = "right"; ctx.fillText(s, bx - 8, y + 8); ctx.textAlign = "center";
        });
      }
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; draw(); });
    kartlar.addEventListener("click", () => { t = 0; });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Sokratik sorgulama: "Cesaret nedir?" diyaloğu --- */
  const EVRE = [["tanim", "Tanım"], ["karsi", "Karşı örnek"], ["duzelt", "Düzeltme"], ["aporia", "Aporia"]];
  const DUGUM_EVRE = { basla: 0, a1: 1, a2: 1, d1: 1, b3: 1, b4: 1, b5: 1, b2: 1, c3: 1, a3: 2, b1: 2, c1: 2, c2: 3, son: 3 };
  D.sorgulama = function (stage) {
    stage.classList.add("sorgulama");
    const yol = h("ol.sg-yol");
    const sayac = h("span.sg-sayac");
    EVRE.forEach(([k, ad]) => yol.append(h("li", { "data-k": k }, ad)));
    stage.append(h("div.sg-ust", yol, sayac));
    const tanimlar = new Set();
    Diyalog(stage, "cesaret", {
      onStep(id, n, adim) {
        if (id === "basla") tanimlar.clear();
        if (["a1", "b1", "d1", "c1"].includes(id)) tanimlar.add(id[0]);
        const e = DUGUM_EVRE[id] ?? 0;
        yol.querySelectorAll("li").forEach((li, i) => { li.classList.toggle("on", i === e); li.classList.toggle("gecti", i < e); });
        sayac.textContent = tanimlar.size ? `${tanimlar.size} tanım sınandı` : "";
      },
      onEnd() { yol.querySelectorAll("li").forEach((li, i) => { li.classList.toggle("gecti", i < 3); li.classList.toggle("on", i === 3); }); Oy.set("sokratik-sorgulama", "aporia"); },
    });
  };

  /* --- Sokrates'in ölümü: Kriton'un önerisi ve Yasaların argümanları --- */
  const YASA = [
    { id: "ebeveyn", ad: "Ebeveyn argümanı", m: "Seni biz doğurduk, besledik, eğittik. Bir çocuk babasına vurmaz; sen de bizi yıkmaya kalkamazsın.",
      itiraz: "Devlet bir ebeveyn değildir; ebeveyn de çocuğuna haksızlık ederse, çocuğun ona itiraz etme hakkı yok mu?", y: "Kriton 50d–51c" },
    { id: "anlasma", ad: "Anlaşma argümanı", m: "Yetmiş yıl bu kentte kaldın. Beğenmeseydin gidebilirdin. Kalarak yasalarımıza uyacağına söz verdin.",
      itiraz: "Gitmek çoğu insan için gerçek bir seçenek mi? Doğduğun yerde kalmak, bir sözleşmeye imza atmak sayılır mı? (Hume bu itirazı ünlü yaptı.)", y: "Kriton 51c–53a" },
    { id: "zarar", ad: "Zarar argümanı", m: "Kaçarsan yasaları ve kenti elinden geldiğince yıkmış olursun. Haksızlığa haksızlıkla karşılık verilmez.",
      itiraz: "Tek bir kaçış bir kenti yıkar mı? Ve haksız bir kararın sürmesi de kente zarar vermez mi?", y: "Kriton 49b–d, 50a–b" },
  ];
  D.kriton = function (stage) {
    const cv = h("canvas", { "aria-label": "Hapishane hücresi" });
    const fill = h("div.fill.kr-fill", cv);
    const args = h("div.kr-args");
    const argOut = h("div.kr-arg-out", { "aria-live": "polite" });
    const oyKap = h("div.pad.scroll.kr-oy");
    stage.append(fill, oyKap);
    let secim = Oy.get("sokrates-olum") || null, t = 0, kapi = 0, kadeh = 0;
    Oy.secim(oyKap, {
      anahtar: "sokrates-olum", soru: "Sokrates'in yerinde olsaydınız ne yapardınız?",
      secenekler: [
        { v: "kac", ad: "Kaçardım", ilke: "Haksız bir karar beni bağlamaz; hayatımı ve felsefe yapma özgürlüğümü korumak hakkım.", filozof: [],
          lehte: "Kriton'un gerekçeleri: çocukların babasız kalacak, dostların seni kurtarmadı diye kınanacak (Kriton 45c–46a).", itiraz: "Sokrates: haksızlığa haksızlıkla karşılık verilmez. Kaçmak, yasalara verdiğin sözü bozmaktır (Kriton 49b–d)." },
        { v: "kal", ad: "Kalırdım: yasalara söz verdim", ilke: "Bir topluluğun yasalarından yararlanan, onlara uyma yükümlülüğü de üstlenir; kendi davan için bile olsa.", filozof: ["sokrates"],
          itiraz: "Yasa ya da karar açıkça adaletsizse, ona uymak adaletsizliğe ortak olmak değil mi?" },
        { v: "itaatsizlik", ad: "Kalırdım, ama kararın haksız olduğunu açıkça söylerdim", ilke: "Haksız bir kurala açıkça karşı çıkmak, ama cezasını kabul ederek yasa düzenine saygıyı korumak: sivil itaatsizlik.", filozof: ["rawls", "sokrates"],
          lehte: "Savunma'da Sokrates de felsefeyi bırakması emredilse bile bırakmayacağını söylüyordu (29d).", itiraz: "Bu, haksızlığın kendisini durdurmaz; yalnızca ona tanıklık eder. Bedeli ödeyen yine haksızlığa uğrayan olur." },
      ],
      sonra: (v) => { secim = v; },
    });
    oyKap.append(h("h4.kr-baslik", "Yasaların konuşması"), args, argOut);
    YASA.forEach((a) => args.append(h("button.btn.ghost", { type: "button", "aria-label": a.ad, "data-k": a.id, onclick: () => goster(a) }, a.ad)));
    function goster(a) {
      args.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.k === a.id));
      argOut.innerHTML = "";
      argOut.append(h("p.arg.lehte", h("span.ip-et", "Yasalar"), a.m, h("small.kr-y", " (" + a.y + ")")), h("p.arg.aleyhte", h("span.ip-et", "İtiraz"), a.itiraz));
    }
    let st;
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const fy = H * 0.86;
      // taş duvar çizgileri
      ctx.strokeStyle = rgba(C.brass, 0.05); ctx.lineWidth = 1;
      for (let y = 20; y < fy; y += 26) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); for (let x = (y / 26) % 2 ? 0 : 30; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 26); ctx.stroke(); } }
      ctx.strokeStyle = rgba(C.brass, 0.5); ctx.beginPath(); ctx.moveTo(0, fy); ctx.lineTo(w, fy); ctx.stroke();
      // pencere ve ay
      const wx = w * 0.18, wy = H * 0.18, ww = Math.min(80, w * 0.15);
      ctx.fillStyle = "#0B1428"; ctx.fillRect(wx, wy, ww, ww * 0.8);
      ctx.fillStyle = "#EDE7DC"; ctx.beginPath(); ctx.arc(wx + ww * 0.65, wy + ww * 0.3, ww * 0.13, 0, 7); ctx.fill();
      ctx.strokeStyle = C.brass; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(wx + (ww * i) / 4, wy); ctx.lineTo(wx + (ww * i) / 4, wy + ww * 0.8); ctx.stroke(); }
      ctx.strokeRect(wx, wy, ww, ww * 0.8);
      // kapı: kaçış seçilince aralanır, dışarıdan ışık sızar
      const dx = w * 0.62, dw = Math.min(90, w * 0.16), dh = (fy - H * 0.2) * 0.85;
      ctx.fillStyle = rgba("#E9BE3B", 0.12 + 0.35 * kapi); ctx.fillRect(dx, fy - dh, dw, dh);
      if (kapi > 0.05) { ctx.fillStyle = rgba("#E9BE3B", 0.12 * kapi); ctx.beginPath(); ctx.moveTo(dx, fy); ctx.lineTo(dx + dw, fy); ctx.lineTo(dx - dw * 0.8 * kapi, H); ctx.lineTo(dx - dw * 2 * kapi, H); ctx.fill(); }
      ctx.fillStyle = "#2a1d12"; ctx.strokeStyle = C.brass; ctx.lineWidth = 1.2;
      const ac = dw * (1 - 0.75 * kapi);
      ctx.beginPath(); ctx.moveTo(dx + dw, fy - dh); ctx.lineTo(dx + dw - ac, fy - dh + 6 * kapi); ctx.lineTo(dx + dw - ac, fy - 6 * kapi); ctx.lineTo(dx + dw, fy); ctx.closePath(); ctx.fill(); ctx.stroke();
      // kadeh: kalma seçilince ışır
      const kx = w * 0.36, ky = fy - 4;
      ctx.fillStyle = rgba("#9CCB72", 0.15 + 0.6 * kadeh);
      if (kadeh > 0.05) { ctx.beginPath(); ctx.arc(kx, ky - 26, 26 * kadeh, 0, 7); ctx.fill(); }
      ctx.strokeStyle = C.brass; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(kx - 16, ky - 34); ctx.quadraticCurveTo(kx, ky - 10, kx + 16, ky - 34); ctx.moveTo(kx, ky - 20); ctx.lineTo(kx, ky - 4); ctx.moveTo(kx - 9, ky); ctx.lineTo(kx + 9, ky); ctx.stroke();
      ctx.font = `italic 13px ${FONT.body}`; ctx.fillStyle = C.ink; ctx.textAlign = "center";
      const m = secim === "kac" ? "Kapı aralık; dostlar gardiyanları ayarladı." : secim ? "Sokrates kadehi aldı ve sakin sakin içti (Phaidon 117c)." : "Atina, MÖ 399. Kriton şafaktan önce geldi.";
      ctx.fillText(m, w / 2, 24);
      ctx.textAlign = "left";
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => {
      t += dt;
      kapi += ((secim === "kac" ? 1 : 0) - kapi) * Math.min(1, dt * 3);
      kadeh += ((secim && secim !== "kac" ? 1 : 0) - kadeh) * Math.min(1, dt * 3);
      draw();
    });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };
})();
