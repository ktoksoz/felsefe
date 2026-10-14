/* Giriş deneyleri: kapak frizi, felsefenin dalları, iki yol */
(function () {
  const { h } = L;
  const D = window.Demos;
  const F = window.FELSEFE;

  /* Kapak: zaman çizelgesinin canlı önizlemesi; etki çizgileri yavaşça belirir */
  D.kapak = function (stage) {
    const z = Zaman(stage, { kapak: true, etkiler: true, aralik: [-700, 2030] });
    return z;
  };

  /* Felsefenin dalları: merkezden dört ana dal, her dalda alt dallar */
  const DALLAR = [
    { id: "varlik", ad: "Varlık", ek: "metafizik", aci: -150,
      soru: "Gerçekten var olan ne? Her şey değişiyor mu, yoksa değişmeyen bir şey var mı?",
      ornek: "Thales'in suyu, Parmenides'in değişmeyen varlığı, Buda'nın \"ben\"siz dünyası.",
      bag: [["arkhe", "Arkhe makinesi"], ["s-theseus", "Theseus'un gemisi"]],
      alt: [["Ontoloji", "Var olmanın ne demek olduğunu ve ne tür şeylerin var olduğunu inceler."],
            ["Zihin felsefesi", "Zihin ile beden, bilinç ile madde arasındaki ilişkiyi sorar.", "s-cince-oda"]] },
    { id: "bilgi", ad: "Bilgi", ek: "epistemoloji", aci: -30,
      soru: "Bir şeyi bildiğimden nasıl emin olabilirim? Duyular mı yanıltır, akıl mı?",
      ornek: "Platon'un mağarası, Descartes'ın kuşkusu, Zhuangzi'nin kelebeği.",
      bag: [["magara", "Mağara alegorisi"], ["s-bilgi-kusku", "Neyi bilebilirim?"]],
      alt: [["Epistemoloji", "Bilginin kaynaklarını, sınırlarını ve doğruluk ölçütlerini araştırır."],
            ["Bilim felsefesi", "Bilimsel bir kuramı bilim dışı bir iddiadan ayıran şeyi sorar.", "bilim-felsefesi"]] },
    { id: "deger", ad: "Değer", ek: "etik, siyaset, estetik", aci: 30,
      soru: "Ne yapmalıyım? İyi bir hayat nedir? Adil bir toplum nasıl kurulur?",
      ornek: "Aristoteles'in altın ortası, Konfüçyüs'ün ilişkiler etiği, Rawls'un cehalet peçesi.",
      bag: [["s-tramvay", "Tramvay problemi"], ["s-pece", "Cehalet peçesi"]],
      alt: [["Etik", "İyi ve kötü, doğru ve yanlış eylem üzerine düşünür.", "altin-orta"],
            ["Siyaset felsefesi", "Devletin meşruiyetini, adaleti ve özgürlüğü sorar.", "ibn-haldun"],
            ["Estetik", "Güzelin ve sanatın doğasını inceler.", "pythagoras"]] },
    { id: "mantik", ad: "Mantık", ek: "doğru akıl yürütme", aci: 150,
      soru: "İyi bir akıl yürütmeyi kötüsünden ne ayırır? Bir sonuç öncüllerinden gerçekten çıkıyor mu?",
      ornek: "Aristoteles'in kıyası, Nyaya'nın beş adımı, Zenon'un paradoksları.",
      bag: [["kiyas", "Kıyas makinesi"], ["s-safsata", "Safsata avı"]],
      alt: [["Biçimsel mantık", "Geçerli çıkarımın kurallarını sembollerle inceler.", "s-dogruluk"],
            ["Dil felsefesi", "Sözcüklerin nasıl anlam taşıdığını sorar.", "analitik-kita"]] },
  ];

  D.dallar = function (stage) {
    stage.classList.add("dallar");
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.classList.add("dal-svg");
    const field = h("div.dal-alan");
    const info = h("div.dal-info", { "aria-live": "polite" });
    const fill = h("div.fill", svg, field);
    stage.append(fill, info);
    const nodes = [];
    const merkez = h("div.dal-merkez", h("span.orig", "φιλοσοφία"), h("b", "Felsefe"));
    field.append(merkez);
    DALLAR.forEach((d) => {
      const b = h("button.dal-ana", { type: "button", "aria-label": d.ad + " dalı", onclick: () => sec(d) }, h("b", d.ad), h("small", d.ek));
      field.append(b);
      const alts = d.alt.map((a) => {
        const ab = h("button.dal-alt", { type: "button", onclick: () => sec(d, a) }, a[0]);
        field.append(ab);
        return ab;
      });
      nodes.push({ d, b, alts });
    });

    let secili = null;
    function layout() {
      const r = fill.getBoundingClientRect();
      if (!r.width) return;
      const W = r.width, H = r.height, cx = W / 2, cy = H * 0.5;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = "";
      const R1 = Math.min(W * 0.27, H * 0.3), R2 = Math.min(W * 0.43, H * 0.46);
      const narrow = W < 520;
      // ince yörünge halkaları (usturlap)
      [R1, R2].forEach((R) => {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", R);
        c.setAttribute("class", "dal-halka");
        svg.append(c);
      });
      merkez.style.left = cx + "px"; merkez.style.top = cy + "px";
      nodes.forEach(({ d, b, alts }) => {
        const a = (d.aci * Math.PI) / 180;
        const x = cx + Math.cos(a) * R1 * (narrow ? 0.9 : 1), y = cy + Math.sin(a) * R1;
        b.style.left = x + "px"; b.style.top = y + "px";
        const on = secili && secili.id === d.id;
        b.classList.toggle("on", !!on);
        line(cx, cy, x, y, on ? "dal-cizgi on" : "dal-cizgi");
        alts.forEach((ab, i) => {
          const spread = 0.42;
          const aa = a + (i - (alts.length - 1) / 2) * spread;
          const x2 = cx + Math.cos(aa) * R2, y2 = cy + Math.sin(aa) * R2 * 0.96;
          ab.style.left = x2 + "px"; ab.style.top = y2 + "px";
          ab.classList.toggle("on", !!on);
          line(x, y, x2, y2, on ? "dal-cizgi alt on" : "dal-cizgi alt");
        });
      });
    }
    function line(x1, y1, x2, y2, cls) {
      const p = document.createElementNS(NS, "path");
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      p.setAttribute("d", `M${x1},${y1} Q${mx + (y2 - y1) * 0.12},${my - (x2 - x1) * 0.12} ${x2},${y2}`);
      p.setAttribute("class", cls);
      svg.append(p);
    }
    function sec(d, alt) {
      secili = d;
      layout();
      info.innerHTML = "";
      info.classList.add("open");
      if (alt) {
        info.append(h("h4", alt[0]), h("p", alt[1]));
        if (alt[2]) info.append(h("p.dal-bag", h("a", { href: "#" + alt[2] }, "Deneyi aç: " + baslik(alt[2]))));
        return;
      }
      info.append(h("h4", d.ad, h("small", " · " + d.ek)), h("p.dal-soru", d.soru), h("p", d.ornek),
        h("p.dal-bag", ...d.bag.map(([id, ad]) => h("a", { href: "#" + id }, ad))));
    }
    const baslik = (id) => { const s = document.getElementById(id); return s ? (s.querySelector("h2") || {}).textContent || id : id; };
    new ResizeObserver(layout).observe(fill);
    return { enter: layout };
  };

  /* İki yol: zaman yolculuğu ya da büyük sorular */
  D.ikiyol = function (stage) {
    stage.classList.add("ikiyol");
    const sol = h("div.iy-kapi", { "data-yol": "1" });
    const zk = h("div.iy-zaman");
    sol.append(h("h3", "Zaman yolculuğu"), h("p", "MÖ 6. yüzyıldan bugüne, yedi düşünce geleneği yan yana."), zk,
      h("button.btn.primary", { type: "button", onclick: () => Deck.goId("iyonya") }, "Zaman yolculuğu: İyonya'dan başla"));
    const sag = h("div.iy-kapi", { "data-yol": "2" });
    const ul = h("ol.iy-sorular");
    Object.values(F.SORULAR).forEach((q) => ul.append(h("li", h("a", { href: "#" + q.slayt }, q.ad))));
    sag.append(h("h3", "Büyük sorular"), h("p", "Sekiz soru; her birinde önce siz karar verirsiniz."), ul);
    stage.append(h("div.iy-wrap", sol, sag));
    const z = Zaman(zk, { kapak: "mini", etkiler: false, aralik: [-700, 2030] });
    return { enter: z.enter, leave: z.leave };
  };
})();
