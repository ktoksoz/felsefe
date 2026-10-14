/* Etkileşim denetimi: gerçek tarayıcıda tıklayarak dener.
   Kullanım: NODE_PATH=<playwright-core node_modules> node tools/etkilesim.js <port> */
const { chromium } = require("playwright-core");
const fs = require("fs"), path = require("path"), os = require("os");
const port = process.argv[2] || "8790";
const base = path.join(os.homedir(), "Library/Caches/ms-playwright");
const d = fs.readdirSync(base).filter((x) => x.startsWith("chromium-")).sort().pop();
const exe = path.join(base, d, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
let gecti = 0, kaldi = 0;
const ok = (ad, kosul, ek = "") => { kosul ? gecti++ : kaldi++; console.log(`${kosul ? "✓" : "✗"} ${ad}${ek ? " — " + ek : ""}`); };
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ["--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 860 } });
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await page.goto(`http://localhost:${port}/index.html#kapak`, { waitUntil: "networkidle" });
  const id = () => page.evaluate(() => Deck.id);

  // 1) Gezinme ve yollar arası atlama + geri dönüş
  await page.evaluate(() => Deck.goId("herakleitos"));
  await page.click('#herakleitos .soru-bag a');
  ok("Soru bağlantısı Theseus slaytına götürür", (await id()) === "s-theseus", await id());
  ok("Geri dön düğmesi görünür", await page.isVisible("#btn-back"));
  ok("Geri dön düğmesinde kaynak slaytın adı", (await page.textContent("#btn-back span")).includes("Herakleitos"));
  await page.keyboard.press("b");
  ok("B tuşu kaynak slayta döndürür", (await id()) === "herakleitos");
  ok("Dönünce düğme gizlenir", !(await page.isVisible("#btn-back")));
  await page.evaluate(() => Deck.goId("s-theseus"));
  const kimLink = await page.$('#s-theseus ul.kim a.kim-ad');
  ok("'Kim ne dedi?' şeridinde zaman yolculuğu bağlantısı var", !!kimLink);
  if (kimLink) { const href = await kimLink.getAttribute("href"); await kimLink.click(); ok("Filozof bağlantısı zaman yolculuğu slaytına gider", "#" + (await id()) === href, href); await page.keyboard.press("b"); ok("Ve geri döner", (await id()) === "s-theseus"); }

  // 2) Klavye kısayolları
  await page.evaluate(() => Deck.goId("arkhe"));
  await page.keyboard.press("ArrowRight"); ok("→ ilerletir", (await id()) === "herakleitos");
  await page.keyboard.press("ArrowLeft"); ok("← geri alır", (await id()) === "arkhe");
  await page.keyboard.press("n"); ok("N notları açar", await page.isVisible("#notes.open"));
  await page.keyboard.press("n");
  await page.keyboard.press("o"); ok("O genel bakışı açar", await page.isVisible("#overview.open"));
  ok("Genel bakışta iki yol ayrı sütun", (await page.$$("#overview .ov-yol")).length === 2);
  await page.keyboard.press("Escape");
  await page.keyboard.press("t"); ok("T metni gizler", await page.evaluate(() => document.body.classList.contains("text-hidden")));
  await page.keyboard.press("t");

  // 3) Sözlük ve filozof balonu
  await page.hover("#arkhe .text .term.kisi");
  ok("Filozof balonu açılır", await page.isVisible("#gloss.open"));
  ok("Balonda tarih ve doğum yeri", /Doğduğu yer/.test(await page.textContent("#gloss")));
  await page.mouse.move(5, 5);

  // 4) Oylama ve tutarlılık
  await page.evaluate(() => { Oy.sil(); Deck.goId("herakleitos"); });
  await page.click('#herakleitos .stage button:has-text("Hayır, başka bir nehir")');
  ok("Oy ilke panelini açar", await page.isVisible("#herakleitos .ilke-panel"));
  ok("Oy kaydedildi", (await page.evaluate(() => Oy.get("nehir"))) === "baska");
  const tut = await page.evaluate(() => { Oy.set("s-theseus.tam", "evet"); return Oy.tutarlilik("s-theseus.tam").map((r) => r.mesaj); });
  ok("Tutarlılık kuralı nehir ↔ Theseus tetiklenir", tut.length > 0, (tut[0] || "").slice(0, 70));
  const yak = await page.evaluate(() => Object.keys(Oy.yakinlik()).length);
  ok("Yakınlık puanı hesaplanır", yak > 0, yak + " filozof");
  await page.evaluate(() => Deck.goId("kapanis"));
  await page.waitForTimeout(600);
  ok("Kapanışta yakın düşünürler listelenir", /Platon|Aristoteles|Herakleitos|Locke|Plutarkhos|Hobbes/.test(await page.textContent("#kapanis")));
  await page.evaluate(() => Oy.sil());

  // 5) Zaman çizelgesi yakınlaştırma
  await page.evaluate(() => Deck.goId("eksen-cagi"));
  await page.waitForTimeout(500);
  const cv = await page.$("#eksen-cagi .zaman canvas");
  if (cv) {
    const bb = await cv.boundingBox();
    const once = await cv.screenshot();
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(300);
    const sonra = await cv.screenshot();
    ok("Zaman çizelgesi tekerlekle yakınlaşır", Buffer.compare(once, sonra) !== 0);
  } else ok("Eksen Çağı zaman çizelgesi", false, "tuval yok");

  // 6) Harita tıklama
  await page.evaluate(() => Deck.goId("iyonya"));
  await page.click('#iyonya .stage button[aria-label="Milet"]');
  ok("Harita kent bilgisi açılır", /Balat/.test(await page.textContent("#iyonya .h-info")));

  // 7) Etki ağı
  await page.evaluate(() => Deck.goId("aquinas"));
  await page.waitForTimeout(500);
  const n = await page.$('#aquinas .ag-n[data-id="ibn_rusd"]');
  if (n) { await n.click(); ok("Etki ağında seçim etkilendiklerini gösterir", await page.isVisible("#aquinas .ag-info.open")); }
  else ok("Aquinas etki ağı düğümü", false);

  // 8) Diyalog
  await page.evaluate(() => Deck.goId("sokratik-sorgulama"));
  await page.waitForTimeout(400);
  let adim = 0;
  while (adim < 12 && (await page.$("#sokratik-sorgulama .dy-sec"))) { await page.click("#sokratik-sorgulama .dy-sec >> nth=0"); await page.waitForTimeout(550); adim++; }
  ok("Sokratik diyalog sona (aporia) ulaşır", !!(await page.$("#sokratik-sorgulama .dy-ozet")), adim + " seçim");

  // 9) Hayalet el ve "Göster"
  await page.evaluate(() => { try { localStorage.removeItem("felsefe.rehber.kapali"); } catch (e) {} Deck.goId("pythagoras"); });
  await page.click("#pythagoras .try-live");
  await page.waitForTimeout(900);
  ok("'Göster' hayalet eli oynatır", await page.isVisible("#ghost-hand.on"));
  await page.waitForTimeout(3500);
  ok("Hayalet el gerçek kontrolü kullandı (Oktav seçili)", await page.evaluate(() => [...document.querySelectorAll("#pythagoras .stage .btn.on")].some((b) => b.textContent.startsWith("Oktav"))));
  await page.keyboard.press("g");
  ok("G tuşu gösterimleri kapatır", await page.evaluate(() => localStorage.getItem("felsefe.rehber.kapali") === "1"));

  // 10) Anlatım: ses yüklenir, biter ve sonraki slayta geçer
  await page.evaluate(() => Deck.goId("kapak"));
  await page.click('#kapak button:has-text("Sesli anlatımla başla")');
  await page.waitForTimeout(1500);
  ok("Anlatım çubuğu açılır", await page.isVisible("#narrator.open"));
  const dur = await page.evaluate(() => { const a = [...document.querySelectorAll("audio")][0]; return 0; });
  // sesin sonuna sar ve otomatik geçişi bekle
  await page.evaluate(() => { const t = document.querySelector(".np-track"); const r = t.getBoundingClientRect(); t.dispatchEvent(new MouseEvent("click", { clientX: r.right - 2, clientY: r.top + 2, bubbles: true })); });
  await page.waitForTimeout(4500);
  ok("Ses bitince sonraki slayta geçer", (await id()) === "felsefe-nedir", await id());
  // deneyle oynayınca otomatik geçiş kapanır
  await page.click("#felsefe-nedir .dal-ana >> nth=0");
  ok("Deneyle oynayınca otomatik geçiş kapanır", !(await page.isChecked(".np-auto input")));
  await page.keyboard.press("a");

  ok("Konsol hatası yok", errs.length === 0, errs.slice(0, 3).join(" | "));
  console.log(`\n${gecti} geçti, ${kaldi} kaldı`);
  await browser.close();
  process.exit(kaldi ? 1 : 0);
})();
