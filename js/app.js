/* Slayt motoru: iki yollu gezinme, friz ilerleme çubuğu, yollar arası "geri dön" yığını,
   notlar, genel bakış, demo yaşam döngüsü */
(function () {
  const { h, store } = L;
  const BOL = window.BOLUMLER; // [{ad, yol, gelenek?}]
  const S = window.STR;

  const slides = [...document.querySelectorAll(".slide")];
  const deck = document.getElementById("deck");
  const notesEl = document.getElementById("notes");
  const overview = document.getElementById("overview");
  const progress = document.getElementById("progress");
  const counter = document.querySelector("#bar .counter");
  const chapterName = document.querySelector("#bar .chapter-name");
  const backBtn = document.getElementById("btn-back");
  const instances = new Map();
  let cur = -1;
  const seen = new Set(store.get("gorulen", []));

  const chOf = (s) => +s.dataset.chapter || 0;
  const yolOf = (s) => BOL[chOf(s)].yol;
  const colorOf = (ch) => (BOL[ch].gelenek ? L.gc(BOL[ch].gelenek) : "var(--brass)");

  // Slayt kimlikleri ve bölüm etiketleri
  slides.forEach((s, i) => {
    if (!s.id) s.id = "s" + (i + 1);
    const ch = chOf(s);
    s.dataset.yol = BOL[ch].yol;
    s.style.setProperty("--gel", s.dataset.gelenek ? L.gc(s.dataset.gelenek) : colorOf(ch));
    const text = s.querySelector(".text");
    if (text && ch > 0 && !text.querySelector(".chapter-tag")) {
      const yol = BOL[ch].yol;
      const no = yol === 2 ? BOL[ch].no : ch;
      text.prepend(h("p.chapter-tag", h("span.yol", S.yollar[yol]), h("b", String(no)), BOL[ch].ad));
    }
  });

  function title(s) {
    return s.dataset.title || (s.querySelector("h1,h2") || {}).textContent || "";
  }

  // İlerleme çubuğu: her yol ayrı bir friz, içinde bölümler, bölüm içinde slayt çentikleri
  const dots = [];
  [0, 1, 2, 3].forEach((yol) => {
    const chs = BOL.map((b, ci) => [b, ci]).filter(([b]) => b.yol === yol);
    const n = slides.filter((s) => yolOf(s) === yol).length;
    if (!n) return;
    const band = h("div.friz", { "data-yol": yol, style: { "--n": n } });
    if (yol === 1 || yol === 2) band.append(h("span.friz-ad", S.yollar[yol]));
    const row = h("div.friz-row");
    chs.forEach(([b, ci]) => {
      const members = slides.map((s, i) => [s, i]).filter(([s]) => chOf(s) === ci);
      if (!members.length) return;
      const grp = h("div.ch", { style: { "--n": members.length, "--gel": colorOf(ci) }, title: b.ad });
      members.forEach(([s, i]) => {
        const d = h("button.dot", { type: "button", "aria-label": `${i + 1}. ${S.slayt}: ${title(s)}`, onclick: () => go(i) });
        dots[i] = d; grp.append(d);
      });
      row.append(grp);
    });
    band.append(row);
    progress.append(band);
  });

  // Genel bakış: iki yol yan yana sütunlar
  function buildOverview() {
    const body = h("div.ov");
    body.append(h("h2", S.tumSlaytlar));
    const cols = h("div.ov-cols");
    [[0, 3], [1], [2]].forEach((yols) => {
      const col = h("div.ov-col", { "data-yol": yols[0] });
      if (yols[0] !== 0) col.append(h("h3.ov-yol", S.yollar[yols[0]]));
      BOL.forEach((b, ci) => {
        if (!yols.includes(b.yol)) return;
        const items = slides.map((s, i) => [s, i]).filter(([s]) => chOf(s) === ci);
        if (!items.length) return;
        col.append(h("div.ov-ch", { style: { "--gel": colorOf(ci) } },
          h("h4", (b.yol === 2 ? b.no + ". " : ci && b.yol === 1 ? ci + ". " : "") + b.ad),
          h("div.ov-list", items.map(([s, i]) =>
            h("button.ov-item", { type: "button", "data-i": i, onclick: () => { toggleOverview(false); go(i); } },
              h("span", String(i + 1)), title(s))))));
      });
      cols.append(col);
    });
    body.append(cols, h("p.keys", { html: S.kisayollar }));
    overview.append(body);
  }
  buildOverview();

  function toggleOverview(force) {
    const open = force ?? !overview.classList.contains("open");
    overview.classList.toggle("open", open);
    overview.querySelectorAll(".ov-item").forEach((b) => {
      b.classList.toggle("cur", +b.dataset.i === cur);
      b.classList.toggle("seen", seen.has(slides[+b.dataset.i].id));
    });
    document.getElementById("btn-overview").classList.toggle("on", open);
    if (open) (overview.querySelector(".ov-item.cur") || overview.querySelector(".ov-item")).focus();
  }

  function renderNotes() {
    const s = slides[cur];
    const n = s.querySelector("aside.notes");
    notesEl.innerHTML = "";
    notesEl.append(h("h4", `${S.sunucuNotu} · ${cur + 1}/${slides.length}`));
    if (n) notesEl.insertAdjacentHTML("beforeend", n.innerHTML);
    else notesEl.append(h("p", S.notYok));
  }

  function instance(i) {
    const s = slides[i];
    if (!s) return null;
    const name = s.dataset.demo;
    if (!name) return null;
    if (!instances.has(i)) {
      const fn = window.Demos[name];
      if (!fn) { console.warn("Demo bulunamadı:", name); instances.set(i, null); return null; }
      try {
        instances.set(i, fn(s.querySelector(".stage") || s, s) || {});
      } catch (e) { console.error(name, e); instances.set(i, null); }
    }
    return instances.get(i);
  }

  /* --- Yollar arası sapma ve geri dönüş --- */
  let back = []; // slayt dizinleri yığını
  function renderBack() {
    const top = back[back.length - 1];
    if (top == null || top === cur) { backBtn.hidden = true; return; }
    backBtn.hidden = false;
    backBtn.querySelector("span").textContent = title(slides[top]);
    backBtn.title = S.geriDon(title(slides[top])) + " (B)";
    backBtn.style.setProperty("--gel", slides[top].style.getPropertyValue("--gel"));
  }
  function goBack() {
    if (!back.length) return;
    const i = back.pop();
    go(i);
  }
  backBtn.addEventListener("click", goBack);
  // slayta işaret eden iç bağlantılar: başka bir slayta sapınca geri dönüş kaydı tutulur
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const i = slides.findIndex((s) => "#" + s.id === a.getAttribute("href"));
    if (i < 0) return;
    e.preventDefault();
    if (i === cur) return;
    if (back[back.length - 1] !== cur) back.push(cur);
    if (back.length > 6) back.shift();
    go(i);
  });

  function go(i, fromHash) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i === cur) return;
    const prev = cur;
    if (prev >= 0) {
      const inst = instances.get(prev);
      inst && inst.leave && inst.leave();
    }
    cur = i;
    slides.forEach((s, k) => {
      s.classList.toggle("active", k === i);
      s.classList.toggle("before", k < i);
      s.setAttribute("aria-hidden", k === i ? "false" : "true");
      if ("inert" in s) s.inert = k !== i;
    });
    seen.add(slides[i].id);
    store.set("gorulen", [...seen]);
    dots.forEach((d, k) => { if (!d) return; d.classList.toggle("cur", k === i); d.classList.toggle("seen", seen.has(slides[k].id) && k !== i); });
    const s = slides[i], ch = chOf(s), yol = BOL[ch].yol;
    document.body.dataset.yol = yol;
    chapterName.innerHTML = "";
    chapterName.style.setProperty("--gel", s.style.getPropertyValue("--gel"));
    if (ch) chapterName.append(h("b", yol === 2 ? `${BOL[ch].no}. ` : yol === 1 ? `${ch}. ` : ""), BOL[ch].ad);
    else chapterName.append(BOL[ch].ad);
    counter.textContent = `${i + 1} / ${slides.length}`;
    // geri dönüş yığınındaki slayta normal yoldan ulaşıldıysa kaydı düşür
    if (back[back.length - 1] === i) back.pop();
    renderBack();
    if (!fromHash) history.replaceState(null, "", "#" + s.id);
    renderNotes();
    window.dispatchEvent(new CustomEvent("slidechange", { detail: { index: i, id: s.id, last: i === slides.length - 1 } }));
    const inst = instance(i);
    inst && inst.enter && requestAnimationFrame(() => inst.enter());
    // sonraki slaytın demosunu önceden hazırla
    setTimeout(() => instance(i + 1), 400);
    if (window.innerWidth <= 860) window.scrollTo(0, 0);
    else { const t = s.querySelector(".text"); if (t) t.scrollTop = 0; }
  }

  const next = () => go(cur + 1);
  const prev = () => go(cur - 1);
  document.getElementById("btn-next").addEventListener("click", next);
  document.getElementById("btn-prev").addEventListener("click", prev);
  document.getElementById("btn-overview").addEventListener("click", () => toggleOverview());
  const btnNotes = document.getElementById("btn-notes");
  function toggleNotes() { notesEl.classList.toggle("open"); btnNotes.classList.toggle("on", notesEl.classList.contains("open")); }
  btnNotes.addEventListener("click", toggleNotes);
  const btnText = document.getElementById("btn-text");
  function toggleText() { document.body.classList.toggle("text-hidden"); btnText.classList.toggle("on", document.body.classList.contains("text-hidden")); }
  btnText.addEventListener("click", toggleText);

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    const typing = t.matches && t.matches("input[type=text], input[type=number], textarea, [contenteditable], select");
    const onRange = t.matches && t.matches("input[type=range]");
    if (typing) return;
    if (overview.classList.contains("open")) {
      if (e.key === "Escape" || e.key === "o" || e.key === "O") { toggleOverview(false); e.preventDefault(); }
      return;
    }
    switch (e.key) {
      case "ArrowRight": case "PageDown":
        if (onRange) return; next(); e.preventDefault(); break;
      case " ":
        if (t.matches && t.matches("button, summary, a, [role=button]")) return;
        next(); e.preventDefault(); break;
      case "ArrowLeft": case "PageUp":
        if (onRange) return; prev(); e.preventDefault(); break;
      case "Home": go(0); break;
      case "End": go(slides.length - 1); break;
      case "n": case "N": toggleNotes(); break;
      case "o": case "O": toggleOverview(); break;
      case "t": case "T": toggleText(); break;
      case "b": case "B": goBack(); break;
      case "f": case "F":
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
        break;
    }
  });

  // Mobilde yatay kaydırma ile gezinme (deney alanı dışında)
  let tx = 0, ty = 0, tOk = false;
  deck.addEventListener("touchstart", (e) => {
    tOk = !e.target.closest(".stage, input, .seg, button, svg, canvas");
    tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive: true });
  deck.addEventListener("touchend", (e) => {
    if (!tOk) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) (dx < 0 ? next : prev)();
  }, { passive: true });

  function fromHash() {
    const id = location.hash.slice(1);
    const i = slides.findIndex((s) => s.id === id);
    go(i >= 0 ? i : 0, true);
  }
  window.Deck = {
    go, next, prev, goBack,
    goId(id) { const i = slides.findIndex((s) => s.id === id); if (i >= 0) go(i); },
    get current() { return cur; }, get id() { return slides[cur].id; }, get count() { return slides.length; },
    get slides() { return slides; },
  };
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
