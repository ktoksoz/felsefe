/* Büyük soru 4 deneyleri: tramvay varyantları ve tutarlılık sayacı, haz hesabı, Kant'ın testi, kapıdaki katil */
(function () {
  const { h, C, FONT, rgba, clamp, lerp, ease } = L;
  const D = window.Demos;
  const RAY = "#8A93AB";

  /* --- Tramvay problemi --- */
  const VARYANT = {
    makas: { ad: "Makas", soru: "Tramvay beş kişiye gidiyor. Makası çevirirseniz yan hattaki bir kişiye sapacak. Ne yaparsınız?",
      mud: "Makası çevir", bir: "Hiçbir şey yapma",
      mudS: { ilke: "Sonuçlar belirleyicidir: Beş can bir candan fazladır. Yan hattaki kişinin ölümü amaç değil, öngörülen bir yan etkidir.", filozof: ["bentham", "foot"],
        itiraz: "Hiçbir şey yapmasaydınız beş kişinin ölümünde payınız olmayacaktı; makası çevirerek bir kişinin ölümüne siz neden oldunuz." },
      birS: { ilke: "Öldürmek, ölmesine izin vermekten daha ağırdır; bir masumu ölüme göndermek için hatta müdahale etmek benim işim değildir.", filozof: [],
        itiraz: "Makas oradayken hiçbir şey yapmamak da bir seçimdir. Beş kişinin ölümü sizin elinizdeyken \"karışmadım\" demek yeterli mi?" } },
    kopru: { ad: "Köprü", soru: "Tramvay beş kişiye gidiyor. Bir köprünün üzerindesiniz; yanınızdaki iri yapılı adamı raylara iterseniz bedeni tramvayı durduracak. Ne yaparsınız?",
      mud: "Adamı it", bir: "Hiçbir şey yapma",
      mudS: { ilke: "Sonuç makastakiyle aynı: bir ölüm, beş kurtuluş. Sayılar değişmediyse cevap da değişmemeli.", filozof: ["bentham"],
        itiraz: "Burada adamın bedenini bir alet gibi kullanıyorsunuz. Kant'a göre bir insanı yalnızca bir amaca araç yapmak, sonucu ne olursa olsun kabul edilemez." },
      birS: { ilke: "Bir insanı başkalarını kurtarmak için araç olarak kullanamayız; makastaki ölüm bir yan etkiydi, buradaki ölüm amaca giden yolun kendisi.", filozof: ["kant", "aquinas"],
        itiraz: "Beş kişi yine ölüyor. İtmekle makası çevirmek arasındaki fark, ölenler için bir şey değiştiriyor mu?" } },
    dongu: { ad: "Döngü", soru: "Yan hat bir döngü çizip beş kişinin önünde ana hatta geri bağlanıyor. Döngüde iri yapılı bir kişi var; tramvay ona çarparsa durur, yoksa döngüyü dolaşıp beş kişiye çarpar. Makası çevirir misiniz?",
      mud: "Makası çevir", bir: "Hiçbir şey yapma",
      mudS: { ilke: "Makas vakasıyla aynı hareket: yalnızca makası çeviriyorsunuz. Kimseye dokunmuyorsunuz.", filozof: ["thomson"],
        itiraz: "Döngüdeki kişi orada olmasaydı tramvay beş kişiye yine çarpacaktı. Yani onun bedeni, tıpkı köprüdeki adam gibi, kurtuluşun aracı." },
      birS: { ilke: "Kişinin ölümü burada yan etki değil, beş kişiyi kurtaran araçtır; bu yüzden köprü vakası gibidir.", filozof: ["kant"],
        itiraz: "Hareketiniz makas vakasındakiyle aynı: makası çevirmek. Arkadaki rayın biçimi ahlaki bir fark yaratabilir mi?" } },
    cerrah: { ad: "Cerrah", soru: "Bir cerrahsınız. Beş hasta organ nakli bekliyor ve bugün ölecekler. Bekleme odasındaki sağlıklı bir ziyaretçinin organları beşine de uyuyor. Ameliyatı yapar mısınız?",
      mud: "Ameliyatı yap", bir: "Ameliyatı yapma",
      mudS: { ilke: "Tutarlı bir sonuççuluk: bir can beş candan azdır; yerinin hastane olması hesabı değiştirmez.", filozof: ["bentham"],
        itiraz: "Böyle hastaneler olsaydı kimse hastaneye gitmeye cesaret edemezdi. Kural faydacılığı (rule utilitarianism) bile bu eylemi reddeder." },
      birS: { ilke: "Kişinin hakları, başkalarına sağlayacağı yararla çiğnenemez; doktorun görevi önündeki hastaya zarar vermemektir.", filozof: ["kant", "thomson"],
        itiraz: "Beş hasta ölüyor. Tramvayda beş kişiyi kurtarmayı kabul ettiyseniz, burada sizi durduran ne?" } },
  };
  const KEYS = Object.keys(VARYANT);

  D.tramvay = function (stage) {
    stage.classList.add("tr");
    let v = "makas", t = 1, sonuc = null, st;
    const cv = h("canvas", { "aria-label": "Tramvay sahnesi" });
    const fill = h("div.fill", cv);
    const panel = h("div.tr-panel.pad.scroll");
    const sayac = h("div.tr-sayac", { "aria-live": "polite" });
    const seg = L.seg(KEYS.map((k) => [k, VARYANT[k].ad]), v, (k) => sec(k));
    stage.append(fill, h("div.controls", seg, h("span.spacer"), h("button.btn.ghost", { type: "button", onclick: () => { const i = KEYS.indexOf(v); sec(KEYS[(i + 1) % 4]); seg.set(v); } }, "Sonraki varyant")), panel);
    function sec(k) {
      v = k; sonuc = Oy.get("s-tramvay." + k) || null; t = sonuc ? 1 : 0;
      const V = VARYANT[k];
      panel.innerHTML = "";
      Oy.secim(panel, {
        anahtar: "s-tramvay." + k, soru: V.soru,
        secenekler: [{ v: "mudahale", ad: V.mud, ...V.mudS }, { v: "birak", ad: V.bir, ...V.birS }],
        sonra: (val) => { sonuc = val; t = 0; say(); },
      });
      panel.append(sayac);
      say();
    }
    function say() {
      const cev = KEYS.map((k) => [k, Oy.get("s-tramvay." + k)]);
      const kurallar = (window.TUTARLILIK || []).filter((r) => r.kosul.every(([kk]) => kk.startsWith("s-tramvay.")) && r.kosul.every(([kk, vv]) => (Array.isArray(vv) ? vv.includes(Oy.get(kk)) : Oy.get(kk) === vv)));
      const gerilim = kurallar.filter((r) => !r.uyum);
      sayac.innerHTML = "";
      sayac.append(h("h4", "Tutarlılık sayacı"),
        h("div.tr-rozet", cev.map(([k, a]) => h("span", { "data-v": a || "" }, VARYANT[k].ad, h("b", a === "mudahale" ? "müdahale" : a === "birak" ? "müdahale yok" : "—")))),
        h("p.tr-sayi", cev.some(([, a]) => !a) ? `Cevaplanan: ${cev.filter(([, a]) => a).length} / 4 · Fark edilen gerilim: ${gerilim.length}` : `Dört varyant tamam · Fark edilen gerilim: ${gerilim.length}`));
      kurallar.forEach((r) => sayac.append(h("p" + (r.uyum ? ".tr-uyum" : ".tr-gerilim"), r.mesaj)));
    }
    sec(v);
    Oy.on(() => say());

    function kisi(ctx, x, y, s, renk, al = 1, iri) {
      ctx.save(); ctx.globalAlpha = al; ctx.fillStyle = renk; ctx.strokeStyle = renk; ctx.lineWidth = 1.4;
      const k = iri ? 1.35 : 1;
      ctx.beginPath(); ctx.arc(x, y - s * 1.55 * k, s * 0.38, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - s * 0.45 * k, y); ctx.quadraticCurveTo(x - s * 0.5 * k, y - s * 1.1 * k, x, y - s * 1.1 * k); ctx.quadraticCurveTo(x + s * 0.5 * k, y - s * 1.1 * k, x + s * 0.45 * k, y); ctx.fill();
      ctx.restore();
    }
    function tramvayCiz(ctx, x, y, s, aci = 0) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(aci);
      ctx.fillStyle = "#3A4A70"; ctx.strokeStyle = C.brass; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.rect(-s * 1.6, -s * 1.3, s * 3.2, s * 1.2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = rgba(C.ink, 0.6); for (let i = 0; i < 3; i++) ctx.fillRect(-s * 1.35 + i * s * 0.95, -s * 1.1, s * 0.7, s * 0.45);
      ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-s * 0.9, -s * 0.05, s * 0.18, 0, 7); ctx.arc(s * 0.9, -s * 0.05, s * 0.18, 0, 7); ctx.fill();
      ctx.restore();
    }
    function yaziUst(ctx, s, w) { ctx.font = `600 14px ${FONT.ui}`; ctx.fillStyle = "#E2C27E"; ctx.textAlign = "center"; ctx.fillText(s, w / 2, 26); ctx.textAlign = "left"; }
    // yol üzerinde nokta: [[x,y],...] çoklu çizgi, u ∈ [0,1]
    function yol(P, u) {
      const L2 = []; let T = 0;
      for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L2.push(d); T += d; }
      let r = u * T;
      for (let i = 1; i < P.length; i++) { if (r <= L2[i - 1]) { const k = r / L2[i - 1]; return [lerp(P[i - 1][0], P[i][0], k), lerp(P[i - 1][1], P[i][1], k), Math.atan2(P[i][1] - P[i - 1][1], P[i][0] - P[i - 1][0])]; } r -= L2[i - 1]; }
      const n = P.length - 1; return [P[n][0], P[n][1], 0];
    }
    function hat(ctx, P) { ctx.strokeStyle = RAY; ctx.lineWidth = 3; ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.strokeStyle = rgba(RAY, 0.4); ctx.lineWidth = 1; ctx.setLineDash([2, 6]); ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y + 4) : ctx.moveTo(x, y + 4))); ctx.stroke(); ctx.setLineDash([]); }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      const s = Math.max(7, Math.min(w, H * 1.6) * 0.021);
      const k = ease(clamp(t, 0, 1));
      const kurtul = "#F3E3B3", nötr = C.ink;
      if (v === "cerrah") return cerrah(ctx, w, H, s, k);
      const y0 = H * 0.66;
      const ana = [[w * 0.04, y0], [w * 0.36, y0], [w * 0.96, y0]];
      let yan, sonY;
      if (v === "makas") yan = [[w * 0.04, y0], [w * 0.36, y0], [w * 0.5, H * 0.38], [w * 0.96, H * 0.38]];
      if (v === "dongu") yan = [[w * 0.04, y0], [w * 0.3, y0], [w * 0.42, H * 0.34], [w * 0.62, H * 0.34], [w * 0.72, y0 - 2]];
      hat(ctx, ana);
      if (yan) hat(ctx, yan.slice(1));
      const bes = w * 0.86, birx = v === "makas" ? w * 0.86 : w * 0.53, biry = v === "makas" ? H * 0.38 : H * 0.34;
      const mud = sonuc === "mudahale";
      // köprü
      if (v === "kopru") {
        ctx.strokeStyle = C.brass; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(w * 0.44, H * 0.4); ctx.lineTo(w * 0.66, H * 0.4); ctx.stroke();
        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(w * 0.46, H * 0.4); ctx.lineTo(w * 0.46, y0 + 10); ctx.moveTo(w * 0.64, H * 0.4); ctx.lineTo(w * 0.64, y0 + 10); ctx.stroke();
        kisi(ctx, w * 0.52, H * 0.4, s, "#E2C27E");
        const dus = mud ? ease(clamp(t * 1.6, 0, 1)) : 0;
        kisi(ctx, w * 0.57, lerp(H * 0.4, y0, dus), s, nötr, mud && t > 0.9 ? 0.35 : 1, true);
        ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.fillText("siz", w * 0.5, H * 0.4 + 16);
      } else {
        // makas kolu ve siz
        ctx.strokeStyle = C.brass; ctx.lineWidth = 2.5; const ax = w * (v === "dongu" ? 0.3 : 0.36);
        ctx.beginPath(); ctx.moveTo(ax, y0 + 26); ctx.lineTo(ax + (mud ? -10 : 10), y0 + 6); ctx.stroke();
        kisi(ctx, ax + 22, y0 + 46, s, "#E2C27E");
        ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.fillText("siz ve makas kolu", ax + 36, y0 + 44);
      }
      // insanlar
      const hedefBes = !mud;
      const bitti = t >= 1 && sonuc;
      for (let i = 0; i < 5; i++) kisi(ctx, bes + (i - 2) * s * 1.5, y0, s, bitti ? (hedefBes ? nötr : kurtul) : nötr, bitti && hedefBes ? 0.35 : 1);
      if (v !== "kopru") kisi(ctx, birx, biry, s, bitti ? (mud ? nötr : kurtul) : nötr, bitti && mud ? 0.35 : 1, v === "dongu");
      // tramvay
      let P, dur;
      if (v === "kopru") { P = ana; dur = mud ? 0.56 : 0.86; }
      else if (mud) { P = yan; dur = v === "makas" ? 0.82 : 0.5; }
      else { P = ana; dur = 0.84; }
      const tot = P === ana ? 1 : 1;
      const [tx, ty, ta] = sonuc ? yol(P, k * dur * tot) : yol(ana, 0);
      tramvayCiz(ctx, tx, ty - 2, s, ta);
      if (bitti) yaziUst(ctx, mud ? "Beş kişi kurtuldu; bir kişi öldü." : "Bir kişi kurtuldu; beş kişi öldü.", w);
      else if (!sonuc) yaziUst(ctx, "Kararınızı verin.", w);
    }
    function cerrah(ctx, w, H, s, k) {
      const mud = sonuc === "mudahale", bitti = t >= 1 && sonuc;
      const org = ["kalp", "akciğer", "karaciğer", "böbrek", "böbrek"];
      for (let i = 0; i < 5; i++) {
        const x = w * 0.08 + i * w * 0.13, y = H * 0.55;
        ctx.strokeStyle = rgba(C.ink, 0.5); ctx.lineWidth = 1; ctx.strokeRect(x, y, w * 0.11, H * 0.12);
        const al = bitti ? (mud ? 1 : 0.3) : 0.8;
        ctx.save(); ctx.globalAlpha = al; ctx.fillStyle = bitti && mud ? "#F3E3B3" : C.ink;
        ctx.beginPath(); ctx.arc(x + w * 0.02, y + H * 0.04, s * 0.45, 0, 7); ctx.fill();
        ctx.fillRect(x + w * 0.035, y + H * 0.03, w * 0.065, s * 0.6); ctx.restore();
        ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center"; ctx.fillText(org[i], x + w * 0.055, y + H * 0.17); ctx.textAlign = "left";
      }
      // bekleme odası
      ctx.strokeStyle = rgba(C.brass, 0.5); ctx.strokeRect(w * 0.76, H * 0.35, w * 0.18, H * 0.4);
      ctx.font = `500 12px ${FONT.ui}`; ctx.fillStyle = C.muted; ctx.textAlign = "center"; ctx.fillText("bekleme odası", w * 0.85, H * 0.33);
      ctx.textAlign = "left";
      kisi(ctx, w * 0.85, H * 0.66, s * 1.1, bitti && !mud ? "#F3E3B3" : C.ink, bitti && mud ? 0.3 : 1);
      if (bitti) yaziUst(ctx, mud ? "Beş hasta yaşadı; ziyaretçi öldü." : "Ziyaretçi evine döndü; beş hasta öldü.", w);
      else if (!sonuc) yaziUst(ctx, "Kararınızı verin.", w);
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { if (sonuc && t < 1) t = Math.min(1, t + dt / 2); draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };

  /* --- Hesap mı, ilke mi? --- */
  const MAKSIM = [
    { ad: "Zor durumda kalınca, tutamayacağımı bildiğim bir söz veririm.", gecer: false, tur: "kavram",
      sonuc: "Herkes sıkışınca yalan söz verseydi, kimse kimsenin sözüne inanmazdı; \"söz vermek\" diye bir şey kalmazdı. İlke, evrenselleşince kendi koşulunu ortadan kaldırıyor: kavramda çelişki. Kant'ın kendi örneği (4:422)." },
    { ad: "Canım isteyince dükkândan para ödemeden bir şey alırım.", gecer: false, tur: "kavram",
      sonuc: "Herkes böyle yapsaydı \"benim\" ve \"senin\" diye bir şey kalmazdı; almak istediğiniz mal da sahipsiz olurdu. İlke, dayandığı mülkiyet kurumunu yok ediyor: kavramda çelişki." },
    { ad: "Bana zarar vermediği sürece, zor durumdaki kimseye yardım etmem.", gecer: false, tur: "istenc",
      sonuc: "Böyle bir dünya düşünülebilir; çelişki yok. Ama kimse bunu isteyemez: Siz de bir gün yardıma muhtaç olabilirsiniz. İstençte çelişki. Kant'ın kendi örneği (4:423)." },
    { ad: "Yeteneklerimi geliştirmek yerine hep keyfime bakarım.", gecer: false, tur: "istenc",
      sonuc: "Herkesin böyle yaşadığı bir dünya düşünülebilir. Ama akıllı bir varlık, yeteneklerinin körelmesini isteyemez: İstençte çelişki. Kant'ın kendi örneği (4:422–423)." },
    { ad: "Her sabah yürüyüşe çıkarım.", gecer: true, tur: "izin",
      sonuc: "Herkes her sabah yürüyüşe çıksa hiçbir çelişki doğmaz. Bu ilke ahlaken izin verilendir; ama ahlaki bir ödev de değildir. Test yasakları ve ödevleri ayıklar, gerisini serbest bırakır." },
  ];
  D.etikaraclar = function (stage) {
    stage.classList.add("ea");
    const body = h("div.ea-body.pad.scroll");
    const seg = L.seg([["haz", "Haz hesabı"], ["kant", "Kant'ın testi"], ["kapi", "Kapıdaki katil"]], "haz", (k) => goster(k));
    stage.append(h("div.controls.top", seg), body);
    const bolum = { haz: hazHesabi(), kant: kantTesti(), kapi: kapi() };
    function goster(k) { body.innerHTML = ""; body.append(bolum[k]); body.scrollTop = 0; }
    goster("haz");

    function hazHesabi() {
      const wrap = h("div.ea-haz");
      wrap.append(h("p.ea-durum", "Sınavdan önceki son akşam. Aylardır beklediğiniz bir konser var. Ama arkadaşınız, yarınki sınavda başarısız olmaktan korkuyor ve sizden ders çalıştırmanızı istiyor."));
      const S = {
        konser: { ad: "Konser", yogunluk: 4, sure: 2, kesinlik: 90, kisi: 1, nitelik: "duyusal" },
        yardim: { ad: "Ders çalıştırmak", yogunluk: 2, sure: 5, kesinlik: 60, kisi: 2, nitelik: "dusunsel" },
      };
      let mill = false;
      const puan = (o) => o.yogunluk * o.sure * (o.kesinlik / 100) * o.kisi * (mill && o.nitelik === "dusunsel" ? 2 : 1);
      const cubuk = h("div.oy-bars");
      const yorum = h("div.ea-yorum");
      const kolon = (k) => {
        const o = S[k];
        const c = h("div.ea-kolon", h("h4", o.ad));
        [["yogunluk", "yoğunluk", -5, 5, 1, (v) => (v > 0 ? "+" : "") + v],
         ["sure", "süre", 1, 10, 1, (v) => v + " gün"],
         ["kesinlik", "kesinlik", 0, 100, 5, (v) => "%" + v],
         ["kisi", "etkilenen kişi", 1, 10, 1, (v) => v + " kişi"]].forEach(([key, lab, mn, mx, stp, fmt]) => {
          c.append(L.slider({ label: `${o.ad}: ${lab}`, min: mn, max: mx, step: stp, value: o[key], fmt, oninput: (v) => { o[key] = v; hesap(); } }));
        });
        c.append(L.seg([["duyusal", "bedensel haz"], ["dusunsel", "düşünsel/ahlaki haz"]], o.nitelik, (v) => { o.nitelik = v; hesap(); }));
        return c;
      };
      const millKutu = h("input", { type: "checkbox" });
      millKutu.addEventListener("change", () => { mill = millKutu.checked; hesap(); });
      wrap.append(h("div.ea-kolonlar", kolon("konser"), kolon("yardim")),
        h("label.ea-mill", millKutu, "Mill'in eklemesi: düşünsel ve ahlaki hazlar iki kat ağır bassın"), cubuk, yorum);
      function hesap() {
        const p = { konser: puan(S.konser), yardim: puan(S.yardim) };
        const mx = Math.max(1, ...Object.values(p).map(Math.abs));
        cubuk.innerHTML = "";
        Object.entries(p).forEach(([k, v]) => cubuk.append(h("div.oy-bar", h("span", S[k].ad), h("span.tr", h("i", { style: { width: Math.max(0, (v / mx) * 100) + "%" } })), h("b", v.toFixed(1)))));
        const kazanan = p.konser >= p.yardim ? "konser" : "yardim";
        yorum.innerHTML = "";
        yorum.append(h("p.ea-sonuc", `Hesaba göre doğru eylem: ${S[kazanan].ad.toLocaleLowerCase("tr")}.`),
          Oy.ilkePanel({ ilke: "Doğru eylem, etkilediği herkesin toplam mutluluğunu en çok artırandır; herkes bir sayılır, kimse birden fazla sayılmaz.", filozof: mill ? ["mill"] : ["bentham"],
            lehte: "Tarafsız ve açık: Kendi hazzınız arkadaşınızınkinden fazla sayılmıyor; karar gerekçelendirilebilir.",
            itiraz: "Bu sayıları gerçekten bilebilir miyiz? Ayrıca hesap, arkadaşınıza verdiğiniz bir sözü ya da dostluğun kendisini nereye koyuyor?" }));
      }
      hesap();
      return wrap;
    }

    function kantTesti() {
      const wrap = h("div.ea-kant");
      wrap.append(h("p.ea-durum", "Bir ilke (maksim) seçin. Önce tahmin edin, sonra onu herkesin her zaman uyduğu bir yasaya çevirin."));
      const liste = h("div.ea-maksimler");
      const cv = h("canvas.ea-cv", { "aria-label": "Evrenselleştirilmiş dünya" });
      const out = h("div.ea-kant-out", { "aria-live": "polite" });
      let sec = 0, tahmin = null, t = 1, st;
      MAKSIM.forEach((m, i) => liste.append(h("button.ea-maksim", { type: "button", onclick: () => { sec = i; tahmin = null; t = 1; ciz(); } }, `"${m.ad}"`)));
      const tBtn = h("div.ea-tahmin",
        h("span", "Herkes böyle yapsa, bu ilke ayakta kalır mı?"),
        h("button.btn", { type: "button", onclick: () => { tahmin = true; evrensel(); } }, "Ayakta kalır"),
        h("button.btn", { type: "button", onclick: () => { tahmin = false; evrensel(); } }, "Kendini yıkar"));
      wrap.append(liste, tBtn, h("div.ea-cvkap", cv), out);
      function ciz() {
        liste.querySelectorAll(".ea-maksim").forEach((b, i) => b.classList.toggle("on", i === sec));
        out.innerHTML = "";
        draw();
      }
      function evrensel() {
        t = 0;
        const m = MAKSIM[sec];
        out.innerHTML = "";
        setTimeout(() => {
          out.append(h("p.ea-sonuc", (tahmin === m.gecer ? "Tahmininiz Kant'ın vardığı sonuçla örtüşüyor. " : "Kant burada başka bir sonuca varıyor. ") + m.sonuc),
            Oy.ilkePanel({ ilke: "Yalnızca, aynı zamanda evrensel bir yasa olmasını isteyebileceğin maksime göre davran.", filozof: ["kant"],
              lehte: "Kimse kendisi için bir istisna yapamaz; ahlak herkes için aynı kurallar demektir.",
              itiraz: "Maksimi nasıl tarif ettiğimize göre sonuç değişebilir: \"Çarşamba günleri, kırmızı ceketli birine yalan söylerim\" evrenselleşince çelişki doğurmaz." }));
        }, 1500);
      }
      function draw() {
        if (!st || !st.w || !st.h) return;
        const { ctx, w, h: H } = st;
        ctx.clearRect(0, 0, w, H);
        const m = MAKSIM[sec], n = 40, cols = 10, rows = 4, cw = w / cols, rh = H / rows;
        const k = clamp(t, 0, 1);
        for (let i = 0; i < n; i++) {
          const rh2 = (H - 24) / rows, x = (i % cols + 0.5) * cw, y = (Math.floor(i / cols) + 0.75) * rh2;
          const on = i / n < k;
          const col = !on ? rgba(C.ink, 0.35) : m.tur === "izin" ? "#9CCB72" : m.tur === "kavram" ? "#8C9BC4" : "#E2C27E";
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(x, y - rh2 * 0.3, Math.min(cw, rh2) * 0.12, 0, 7); ctx.fill();
          ctx.fillRect(x - Math.min(cw, rh2) * 0.12, y - rh2 * 0.16, Math.min(cw, rh2) * 0.24, rh2 * 0.3);
          if (on && m.tur === "kavram" && k >= 1) { ctx.strokeStyle = rgba("#8C9BC4", 0.9); ctx.beginPath(); ctx.moveTo(x - 8, y - rh2 * 0.42); ctx.lineTo(x + 8, y - rh2 * 0.2); ctx.stroke(); }
        }
        if (k >= 1 && t < 5) {
          ctx.font = `600 14px ${FONT.ui}`; ctx.textAlign = "center"; ctx.fillStyle = C.ink;
          ctx.fillText(m.tur === "izin" ? "Çelişki yok" : m.tur === "kavram" ? "Kavramda çelişki" : "İstençte çelişki", w / 2, H - 8);
          ctx.textAlign = "left";
        }
      }
      st = L.canvas(cv, draw);
      ciz();
      const lp = L.loop((dt) => { if (t < 1) { t = Math.min(1, t + dt / 1.4); draw(); } });
      lp.start();
      return wrap;
    }

    function kapi() {
      const wrap = h("div.ea-kapi");
      wrap.append(h("p.ea-durum", "Bir arkadaşınız evinizde saklanıyor. Kapı çalınıyor: Onu öldürmek isteyen biri, arkadaşınızın içeride olup olmadığını soruyor."));
      Oy.secim(wrap, {
        anahtar: "s-etik-araclar.kapi", soru: "Ne yaparsınız?",
        secenekler: [
          { v: "yalan", ad: "\"Burada değil\" diye yalan söylerim", ilke: "Bir yalanın sonucu bir hayatı kurtarmaksa, yalan doğru eylemdir; sonuçlar belirleyicidir.", filozof: ["bentham", "mill"],
            lehte: "Sezgilerimizin çoğu burada: Masum birini katile teslim eden doğruculuk ahlaki görünmüyor.",
            itiraz: "Kant: Yalan söylediğinizde sonuçların sorumluluğunu üstlenirsiniz. Arkadaşınız siz bilmeden kaçmış ve katil, sizin yalanınız yüzünden onu dışarıda yakalamış olabilir." },
          { v: "dogru", ad: "Doğruyu söylerim", ilke: "Yalan söylememek koşulsuz bir ödevdir; sonuçlar ne olursa olsun, insanlık onurunu ve güveni korur.", filozof: ["kant"],
            lehte: "Koşullara göre esneyen bir doğruluk ilkesi, kime ne zaman yalan söyleneceğine karar verme gücünü bize bırakır; bu güç kolayca kötüye kullanılır.",
            itiraz: "Kant'ı savunan birçok çağdaş düşünür bile bu sonucu kabul etmiyor: Katil sizi bir aldatmacanın aracı yapmış; ona doğruyu borçlu değilsiniz." },
          { v: "kacamak", ad: "Susarım ya da kaçamak cevap veririm", ilke: "Yalan ile ihanet arasında üçüncü yollar vardır; doğru eylemi kuralı değil, durumu kavrayan pratik bilgelik bulur.", filozof: ["aristoteles", "konfucyus"],
            lehte: "Hem dürüstlüğünüzü hem arkadaşınızı korumaya çalışıyorsunuz.",
            itiraz: "Kaçamak cevap da bir aldatma değil mi? Katil susmanızdan arkadaşınızın içeride olduğunu anlayabilir." },
        ],
      });
      return wrap;
    }
    return {};
  };
})();
