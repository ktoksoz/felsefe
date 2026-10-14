/* Sözlük ve filozof balonları: metindeki terimlerin ve filozof adlarının üzerine gelince açılır.
   Terimler js/data/sozluk.js, filozoflar js/data/filozoflar.js dosyasından gelir.
   Her terim ve her ad slayt başına yalnızca ilk geçtiği yerde işaretlenir. */
(function () {
  const S = window.STR;
  const F = window.FELSEFE;
  const trw = (q) => "https://tr.wikipedia.org/w/index.php?search=" + encodeURIComponent(q);

  // karşılaştırma için: Türkçe küçük harf, ı/i ayrımı ve düzeltme işareti kaldırılır (uzunluk değişmez)
  const lower = (s) => s.toLocaleLowerCase("tr").replace(/ı/g, "i").replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
  const L_ = "a-zçğıöşüâîûA-ZÇĞİÖŞÜÂÎÛ";

  // terimler + filozoflar tek listede
  // farklı bölümlerde aynı kökle iki kez tanımlanan terimlerde ilk tanım geçerli
  const gorulen = new Set();
  const TERMS = (window.SOZLUK || []).filter((t) => {
    if (t.only) return true;
    const yeni = t.k.some((k) => !gorulen.has(k));
    t.k.forEach((k) => gorulen.add(k));
    return yeni;
  }).map((t) => ({ ...t, tip: "terim" }));
  F.FILOZOFLAR.forEach((f) => {
    let k = f.k;
    if (!k) {
      const ad = f.ad.replace(/\s*\(.*\)/, "");
      const parts = ad.split(" ");
      k = [ad];
      // modern adlarda soyadı tek başına da tanınır (ör. "Kant")
      if ((f.gelenek === "modern" || f.gelenek === "cagdas") && parts.length > 1) k.push(parts[parts.length - 1]);
    }
    TERMS.push({ k, f, tip: "kisi" });
  });
  TERMS.forEach((term) => {
    term.re = term.k.map((k) => new RegExp(`(^|[^${L_}])(${lower(k).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[${L_}'’]*)`));
  });
  const SKIP = "h1, h2, h3, h4, .chapter-tag, .num, summary, a, .term, .try, button, .license, .cover-meta, .kisiler, .kim, .soru-bag, .orig, .no-gloss";

  function markSlide(root) {
    const sid = root.closest(".slide").id;
    const done = new Set(TERMS.map((t, i) => (t.only && !t.only.includes(sid) ? i : -1)).filter((i) => i >= 0));
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement.closest(SKIP) || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      let text = node.nodeValue;
      let parts = null;
      for (;;) {
        let best = null;
        const low = lower(text);
        TERMS.forEach((term, ti) => {
          if (done.has(ti)) return;
          term.re.forEach((re) => {
            const m = re.exec(low);
            if (!m) return;
            const i = m.index + m[1].length;
            // aynı yerde başlayan daha uzun eşleşme kazanır ("Kıbrıslı Zenon" > "Zenon")
            if (!best || i < best.i || (i === best.i && m[2].length > best.len)) best = { i, len: m[2].length, ti };
          });
        });
        if (!best) break;
        done.add(best.ti);
        parts = parts || [];
        parts.push(text.slice(0, best.i));
        const span = document.createElement("span");
        const t = TERMS[best.ti];
        span.className = t.tip === "kisi" ? "term kisi" : "term";
        if (t.tip === "kisi") span.style.setProperty("--gel", L.gc(t.f.gelenek));
        span.tabIndex = 0; span.dataset.ti = best.ti;
        span.textContent = text.slice(best.i, best.i + best.len);
        parts.push(span);
        text = text.slice(best.i + best.len);
      }
      if (parts) { parts.push(text); node.replaceWith(...parts); }
    });
  }
  document.querySelectorAll(".slide .text, .slide .cover-text").forEach(markSlide);

  /* --- balon --- */
  const { h } = L;
  const pop = h("div#gloss", { role: "tooltip" });
  document.body.append(pop);
  let cur = null, hideT = 0;

  function kisiBalon(f) {
    const g = F.GELENEKLER[f.gelenek];
    const Y = F.YERLER[f.dogumYeri];
    const yer = Y ? (Y.ad === Y.bugun || Y.bugun.startsWith(Y.ad) ? Y.bugun : `${Y.ad} (bugün ${Y.bugun})`) : "";
    const kids = [
      h("div.g-head", window.Medalyon ? Medalyon(f, 40) : "", h("div",
        h("h4", f.ad.replace(/\s*\(.*\)/, "")),
        h("p.g-orig", { style: { fontFamily: L.scriptFont(f.ozgun) } }, f.ozgun !== f.ad ? f.ozgun : ""))),
      h("p.g-meta", h("i.g-dot"), `${g.kisa} · ${F.aralik(f)}`),
      yer ? h("p.g-meta", `${S.dogdu}: ${yer}`) : "",
      f.tarihNot ? h("p.g-note", f.tarihNot) : "",
      h("p", f.fikir),
    ];
    const links = h("div.g-links");
    const slide = document.getElementById(f.slayt);
    const curSlide = document.querySelector(".slide.active");
    if (slide && slide !== curSlide) links.append(h("a.g-jump", { href: "#" + f.slayt, onclick: () => hide(0) }, S.zamanYolculugunda));
    links.append(h("a", { href: trw(f.wiki), target: "_blank", rel: "noopener" }, S.vikipedi));
    kids.push(links);
    return kids;
  }

  function show(el) {
    clearTimeout(hideT);
    if (cur === el && pop.classList.contains("open")) return;
    cur = el;
    const t = TERMS[+el.dataset.ti];
    pop.innerHTML = "";
    pop.classList.toggle("kisi", t.tip === "kisi");
    if (t.tip === "kisi") {
      pop.style.setProperty("--gel", L.gc(t.f.gelenek));
      pop.append(...kisiBalon(t.f));
    } else {
      pop.style.removeProperty("--gel");
      const kids = [h("h4", t.t)];
      if (t.o) kids.push(h("p.g-orig", { style: { fontFamily: L.scriptFont(t.o) } }, t.o));
      kids.push(h("p", t.d));
      kids.push(h("div.g-links", h("a", { href: t.u || trw(t.t), target: "_blank", rel: "noopener" },
        !t.u || t.u.includes("tr.wikipedia") ? S.vikipedi : S.wikipedia)));
      pop.append(...kids);
    }
    pop.classList.add("open");
    const r = el.getBoundingClientRect();
    const pw = pop.offsetWidth, ph = pop.offsetHeight;
    const x = Math.min(Math.max(12, r.left + r.width / 2 - pw / 2), window.innerWidth - pw - 12);
    let y = r.top - ph - 10;
    pop.classList.toggle("below", y < 8);
    if (y < 8) y = r.bottom + 10;
    pop.style.left = x + "px"; pop.style.top = y + "px";
  }
  function hide(delay = 180) {
    clearTimeout(hideT);
    hideT = setTimeout(() => { pop.classList.remove("open"); cur = null; }, delay);
  }
  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest && e.target.closest(".term, [data-balon]");
    if (el) show(balonFor(el));
    else if (e.target.closest && e.target.closest("#gloss")) clearTimeout(hideT);
    else if (cur) hide();
  });
  // [data-balon="filozof-id"] öğeleri (madalyonlar, zaman çizelgesi etiketleri) de balon açar
  function balonFor(el) {
    if (!el.dataset.balon) return el;
    if (el.dataset.ti == null) {
      const i = TERMS.findIndex((t) => t.tip === "kisi" && t.f.id === el.dataset.balon);
      el.dataset.ti = i;
    }
    return el;
  }
  document.addEventListener("focusin", (e) => { if (e.target.matches && e.target.matches(".term, [data-balon]")) show(balonFor(e.target)); });
  document.addEventListener("focusout", (e) => { if (e.target.matches && e.target.matches(".term, [data-balon]")) hide(250); });
  // dokunmatik: dokununca aç/kapa
  document.addEventListener("click", (e) => {
    if (e.target.closest(".zaman canvas, .harita canvas, .ag svg")) return; // bu bileşenler balonu kendileri açar
    const el = e.target.closest(".term, [data-balon]");
    if (el && el.tagName === "A") { hide(0); return; } // bağlantı: kendi işini yapsın
    if (el) { e.preventDefault(); balonFor(el); cur === el && pop.classList.contains("open") ? hide(0) : show(el); }
    else if (!e.target.closest("#gloss")) hide(0);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(0); });
  document.getElementById("deck").addEventListener("scroll", () => hide(0), true);
  window.addEventListener("slidechange", () => hide(0));
  window.Balon = { show: (el) => show(balonFor(el)), hide };
})();
