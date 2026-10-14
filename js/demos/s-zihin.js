/* Büyük soru 7 deneyleri: Turing testi ve Çince oda; Mary'nin odası ve felsefi zombiler */
(function () {
  const { h, C, FONT, rgba, clamp, lerp } = L;
  const D = window.Demos;

  /* --- Turing testi + Çince oda --- */
  const KURALLAR = [
    { soru: "你好吗？", cevap: "我很好。", tr: ["Nasılsın?", "İyiyim."] },
    { soru: "你叫什么名字？", cevap: "我叫房间。", tr: ["Adın ne?", "Adım Oda."] },
    { soru: "你懂中文吗？", cevap: "我懂中文。", tr: ["Çince anlıyor musun?", "Çince anlıyorum."] },
  ];
  const PALET = ["我", "很", "好", "叫", "房", "间", "懂", "中", "文", "。"];
  const TURING = {
    A: [["Bana Forth Köprüsü hakkında bir sone yazar mısın?", "Bu konuda beni hesaba katma. Hiç şiir yazamadım."],
        ["34957 ile 70764'ü topla.", "(Yaklaşık 30 saniye duraklar) 105621."],
        ["Satranç oynar mısın?", "Evet."]],
    B: [["Bana Forth Köprüsü hakkında bir sone yazar mısın?", "On dört dize mi? Kızıl demirine bir dörtlük belki, ama sone ağır iş."],
        ["34957 ile 70764'ü topla.", "Kâğıt kalem lazım… 105721, sanırım."],
        ["Satranç oynar mısın?", "Eskiden, okulda. Çok kötüydüm."]],
  };
  D.cinceoda = function (stage) {
    stage.classList.add("cinceoda");
    const govde = h("div.co-govde.scroll");
    const seg = L.seg([["oda", "Çince oda"], ["turing", "Turing testi"]], "oda", (v) => goster(v));
    stage.append(h("div.controls.top", seg), govde);

    function turing() {
      govde.innerHTML = "";
      const sonuc = h("div.co-sonuc", { "aria-live": "polite" });
      const kolon = (k) => h("div.co-yazisma", h("h4", "Muhatap " + k),
        ...TURING[k].map(([s, c]) => h("div.co-qa", h("p.co-s", h("b", "Sorgucu: "), s), h("p.co-c", h("b", k + ": "), c))));
      const tahmin = (k) => {
        sonuc.innerHTML = "";
        sonuc.append(h("p", h("b", k === "A" ? "A'yı seçtiniz. " : "B'yi seçtiniz. "),
          "A'nın cevapları Turing'in 1950 makalesindeki örnekten: makineyi insan gibi davranmaya çalışırken hayal ediyor, bu yüzden yavaşlıyor ve şiirden kaçıyor. B'yi biz yazdık."),
          h("p.muted", "Dikkat: A'nın toplamı 105621, ama doğrusu 105721. Bunun Turing'in bilinçli bir \"insanca hata\" örneği mi yoksa bir dizgi hatası mı olduğu tartışılır. Turing'in sorusu tam da bu: davranıştan başka neye bakabiliriz?"));
      };
      govde.append(h("p.co-giris", "Sorgucu iki muhatapla yalnızca yazıyla konuşuyor. Biri makine. Hangisi?"),
        h("div.co-iki", kolon("A"), kolon("B")),
        h("div.co-row", h("button.btn", { type: "button", onclick: () => tahmin("A") }, "A makine"), h("button.btn", { type: "button", onclick: () => tahmin("B") }, "B makine")),
        sonuc);
    }

    function oda() {
      govde.innerHTML = "";
      let i = 0, yazi = "", ceviri = false;
      const kagit = h("div.co-kagit", { "aria-live": "polite" });
      const cikti = h("div.co-cikti");
      const dis = h("p.co-dis", { "aria-live": "polite" });
      const kitap = h("table.co-kitap", h("thead", h("tr", h("th", "Bu şekli görürsen"), h("th", "Bu şekli yaz"))),
        h("tbody", KURALLAR.map((k) => h("tr", h("td", { lang: "zh" }, k.soru), h("td", { lang: "zh" }, k.cevap)))));
      const palet = h("div.co-palet", PALET.map((c) => h("button.btn.co-k", { type: "button", lang: "zh", onclick: () => yaz(c) }, c)));
      const sil = h("button.btn.ghost", { type: "button", onclick: () => { yazi = ""; ciz(); } }, "Sil");
      const cevir = h("button.btn.ghost", { type: "button", onclick: () => { ceviri = !ceviri; cevir.classList.toggle("on", ceviri); ciz(); } }, "Çevirisini göster");
      const oyAlan = h("div.co-oy");
      function ciz() {
        const k = KURALLAR[i];
        kagit.innerHTML = "";
        kagit.append(h("small", "Kapının altından gelen kâğıt"), h("span.co-zh", { lang: "zh" }, k.soru), ceviri ? h("em.co-tr", k.tr[0]) : "");
        cikti.innerHTML = "";
        cikti.append(h("small", "Sizin yazdığınız"), h("span.co-zh", { lang: "zh" }, yazi || "…"), ceviri && yazi === k.cevap ? h("em.co-tr", k.tr[1]) : "");
      }
      function yaz(c) {
        const k = KURALLAR[i];
        yazi += c;
        if (yazi === k.cevap) {
          dis.textContent = ["Dışarıdaki Çince konuşan: \"Harika, kusursuz Çince!\"", "Dışarıdaki: \"Ne güzel bir ad.\"", "Dışarıdaki: \"Belli, çok iyi anlıyorsun!\""][i];
          ciz();
          if (i === 0) oyGoster();
          setTimeout(() => { if (i < KURALLAR.length - 1) { i++; yazi = ""; ciz(); } }, 1600);
          return;
        }
        if (!k.cevap.startsWith(yazi)) { dis.textContent = "Bu şekil dizisi kural kitabında yok. Silip yeniden deneyin."; }
        else dis.textContent = "";
        ciz();
      }
      function oyGoster() {
        if (oyAlan.childNodes.length) return;
        Oy.secim(oyAlan, {
          anahtar: "s-cince-oda.anlama", soru: "Odadaki kişi Çince anlıyor mu?",
          secenekler: [
            { v: "hayir", ad: "Hayır, yalnızca şekil eşliyor", ilke: "Sözdizimi anlam için yeterli değildir: kurala göre sembol işlemek, sembolleri anlamak değildir.", filozof: ["searle", "leibniz"],
              itiraz: "Sistem yanıtı: Çince'yi kişi değil, kişi + kural kitabı + oda birlikte anlar. Beyninizdeki tek bir nöron da Türkçe bilmez." },
            { v: "sistem", ad: "Kişi değil, sistem anlıyor", ilke: "Anlama bir parçanın değil, bütün sistemin özelliğidir (işlevselcilik).", filozof: ["turing"],
              itiraz: "Searle: Kişi bütün kuralları ezberlese sistem onun kafasında olurdu; yine de tek sözcük anlamazdı." },
            { v: "kullanim", ad: "Doğru kullanmak anlamaktır", ilke: "Bir dili anlamak, onu doğru durumlarda doğru biçimde kullanabilmektir; içeride ayrıca bir \"anlam\" aramak gereksizdir.", filozof: ["wittgenstein", "turing"],
              itiraz: "Kural kitabı yalnızca belirli sorulara cevap veriyor; bir dili gerçekten kullanmak sonsuz yeni duruma uyum sağlamayı gerektirir. Ama yeterince büyük bir kitap?" },
          ],
        });
      }
      govde.append(h("div.co-oda", kagit, h("div.co-ok", "→"), cikti), kitap, palet, h("div.co-row", sil, cevir), dis, oyAlan);
      ciz();
      if (Oy.get("s-cince-oda.anlama")) oyGoster();
    }
    function goster(v) { v === "oda" ? oda() : turing(); }
    oda();
    return {};
  };

  /* --- Mary'nin odası ve felsefi zombi --- */
  D.mary = function (stage) {
    stage.classList.add("mary");
    const cv = h("canvas", { "aria-label": "Mary'nin odası" });
    const fill = h("div.fill", cv);
    const alt = h("div.pad.scroll.my-alt");
    const btn = h("button.btn.primary", { type: "button", onclick: () => cik() }, "Mary odadan çıkar");
    const ic = h("button.btn.ghost", { type: "button", onclick: () => { icGoster = !icGoster; ic.classList.toggle("on", icGoster); } }, "İçlerini göster");
    let mod = "mary", renk = 0, hedef = 0, icGoster = false, t = 0;
    const seg = L.seg([["mary", "Mary'nin odası"], ["zombi", "Felsefi zombi"]], "mary", (v) => { mod = v; kur(); });
    const ctl = h("div.controls", seg, h("span.spacer"), btn, ic);
    stage.append(fill, ctl, alt);
    const BILGI = ["Kırmızı ışığın dalga boyu yaklaşık 620–750 nm.", "Retinadaki L tipi koniler uzun dalga boyuna en duyarlı olanlardır.", "Sinyal görsel korteksin V4 bölgesinde renk olarak işlenir.", "\"Kırmızı\" sözcüğünü insanların hangi durumlarda kullandığını bilir."];
    function kur() {
      alt.innerHTML = "";
      btn.style.display = mod === "mary" ? "" : "none";
      ic.style.display = mod === "zombi" ? "" : "none";
      if (mod === "mary") {
        alt.append(h("ul.my-bilgi", BILGI.map((b) => h("li", b))));
        if (renk > 0.5 || Oy.get("s-mary-zombi.mary")) oyMary();
      } else {
        alt.append(h("p.my-z", "İki figür atomu atomuna aynı. İkisi de \"Kırmızıyı görüyorum\" diyor, ikisi de aynı hızla tepki veriyor. Birinin içinde bir deneyim var, ötekinde yok. Dışarıdan farkı bulabilir misiniz?"));
        Oy.secim(alt, {
          anahtar: "s-mary-zombi.zombi", soru: "Böyle bir zombi mümkün mü?",
          secenekler: [
            { v: "mumkun", ad: "Evet, düşünülebilir ve mümkün", ilke: "Bilinç fiziksel yapının üstünde ek bir olgudur; fiziksel bir kopya bilinçsiz olabilir.", filozof: ["chalmers", "descartes"],
              itiraz: "Bir şeyi düşünebilmemiz onun mümkün olduğunu göstermez: suyun H₂O olmadığını \"düşünebiliriz\", ama su H₂O'dur." },
            { v: "degil", ad: "Düşünülebilir ama gerçekte imkânsız", ilke: "Bilinç fiziksel süreçlerin ta kendisidir; aradaki boşluk dünyada değil, kavramlarımızdadır.", filozof: ["searle"],
              itiraz: "O zaman fiziksel süreçlerin neden bir deneyimle birlikte geldiğini açıklamak hâlâ borçtur (zor problem)." },
            { v: "tutarsiz", ad: "Tutarsız bir fikir", ilke: "Her davranışı aynı olan bir varlıktan bilinci çıkarınca geriye eksik hiçbir şey kalmaz; \"zombi\" kavramı boştur (Dennett).", filozof: [],
              itiraz: "Kendi deneyimimiz en kesin bildiğimiz şeydir; onu yok saymak açıklamak değil, konuyu değiştirmektir." },
          ],
        });
      }
    }
    function oyMary() {
      if (alt.querySelector(".secim")) return;
      Oy.secim(alt, {
        anahtar: "s-mary-zombi.mary", soru: "Mary odadan çıkınca yeni bir şey öğrendi mi?",
        secenekler: [
          { v: "evet", ad: "Evet, kırmızının nasıl bir şey olduğunu", ilke: "Deneyimin niteliği (qualia) fiziksel bilgiye indirgenemez.", filozof: ["jackson", "chalmers"],
            itiraz: "Jackson'ın kendisi de sonradan bu sonuçtan vazgeçti: Mary yeni bir olgu değil, eski bir olguyu tanımanın yeni bir yolunu edinir." },
          { v: "yetenek", ad: "Bilgi değil, bir yetenek kazandı", ilke: "Mary yeni bir olgu öğrenmez; kırmızıyı tanıma, hatırlama ve hayal etme yeteneği kazanır (Lewis, Nemirow).", filozof: [],
            itiraz: "Odadan çıkan Mary \"Demek böyleymiş!\" der; bu, bir yetenekten çok bir keşfe benziyor." },
          { v: "hayir", ad: "Hayır, zaten her şeyi biliyordu", ilke: "Gerçekten bütün fiziksel bilgiye sahip biri, kırmızı görünce şaşırmaz (Dennett).", filozof: [],
            itiraz: "Bu yanıt sezgimize çok aykırı: hiçbir ders kitabının rengi görmenin yerini tutamayacağını düşünüyoruz." },
        ],
      });
    }
    function cik() { hedef = hedef ? 0 : 1; btn.textContent = hedef ? "Odaya geri dön" : "Mary odadan çıkar"; if (hedef) setTimeout(oyMary, 900); }
    kur();
    let st;
    function gri(r, g, b, k) { const y = 0.3 * r + 0.59 * g + 0.11 * b; return `rgb(${Math.round(lerp(y, r, k))},${Math.round(lerp(y, g, k))},${Math.round(lerp(y, b, k))})`; }
    function figur(ctx, x, y, s, isik) {
      ctx.fillStyle = "#C9CED9";
      ctx.beginPath(); ctx.arc(x, y - s * 0.9, s * 0.28, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - s * 0.32, y + s * 0.6); ctx.quadraticCurveTo(x - s * 0.36, y - s * 0.5, x, y - s * 0.55); ctx.quadraticCurveTo(x + s * 0.36, y - s * 0.5, x + s * 0.32, y + s * 0.6); ctx.fill();
      if (isik > 0) {
        const g = ctx.createRadialGradient(x, y - s * 0.9, 1, x, y - s * 0.9, s * 0.5);
        g.addColorStop(0, `rgba(242,180,90,${0.9 * isik})`); g.addColorStop(1, "rgba(242,180,90,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - s * 0.9, s * 0.5, 0, 7); ctx.fill();
      }
    }
    function draw() {
      if (!st) return;
      const { ctx, w, h: H } = st;
      ctx.clearRect(0, 0, w, H);
      if (mod === "mary") {
        const k = renk;
        // oda: siyah beyaz duvarlar, pencere, masa üzerinde domates
        ctx.fillStyle = gri(38, 52, 84, k); ctx.fillRect(0, 0, w, H);
        ctx.fillStyle = gri(120, 170, 220, k); ctx.fillRect(w * 0.62, H * 0.14, w * 0.26, H * 0.3);
        ctx.fillStyle = gri(110, 160, 90, k); ctx.fillRect(w * 0.62, H * 0.34, w * 0.26, H * 0.1);
        ctx.strokeStyle = gri(200, 200, 200, 0); ctx.lineWidth = 3; ctx.strokeRect(w * 0.62, H * 0.14, w * 0.26, H * 0.3);
        ctx.fillStyle = gri(120, 84, 50, k); ctx.fillRect(w * 0.32, H * 0.66, w * 0.34, H * 0.04);
        ctx.fillStyle = gri(214, 40, 30, k); ctx.beginPath(); ctx.arc(w * 0.5, H * 0.6, Math.min(w, H) * 0.07, 0, 7); ctx.fill();
        ctx.fillStyle = gri(60, 140, 50, k); ctx.beginPath(); ctx.ellipse(w * 0.5, H * 0.53, 10, 4, 0, 0, 7); ctx.fill();
        figur(ctx, w * 0.2, H * 0.62, Math.min(w, H) * 0.22, 0);
        ctx.font = `italic 15px ${FONT.body}`; ctx.fillStyle = "#EDE7DC"; ctx.textAlign = "center";
        ctx.fillText(k < 0.5 ? "Mary her şeyi biliyor, ama hiç renk görmedi" : "\"Demek kırmızı böyleymiş.\"", w / 2, H * 0.92);
        ctx.textAlign = "left";
      } else {
        const s = Math.min(w * 0.18, H * 0.3);
        figur(ctx, w * 0.3, H * 0.55, s, icGoster ? 0.6 + 0.4 * Math.sin(t * 2) : 0);
        figur(ctx, w * 0.7, H * 0.55, s, 0);
        ctx.font = `600 14px ${FONT.ui}`; ctx.fillStyle = C.ink; ctx.textAlign = "center";
        ["\"Kırmızıyı görüyorum.\"", "\"Kırmızıyı görüyorum.\""].forEach((q, i) => ctx.fillText(q, w * (i ? 0.7 : 0.3), H * 0.55 - s * 1.35));
        if (icGoster) { ctx.fillStyle = C.muted; ctx.font = `400 12px ${FONT.ui}`; ctx.fillText("deneyim var", w * 0.3, H * 0.55 + s * 0.85); ctx.fillText("içerisi karanlık", w * 0.7, H * 0.55 + s * 0.85); }
        ctx.textAlign = "left";
      }
    }
    st = L.canvas(cv, draw);
    const lp = L.loop((dt) => { t += dt; renk += (hedef - renk) * Math.min(1, dt * 2.2); draw(); });
    return { enter: () => lp.start(), leave: () => lp.stop() };
  };
})();
