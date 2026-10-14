/* 10. Modern felsefe: sözlük, tutarlılık ve yakınlık eklemeleri */
window.SOZLUK.push(
  { k: ["cogito"], t: "Cogito", o: "cogito, ergo sum", d: "Descartes'ın \"Düşünüyorum, öyleyse varım\" ilkesi: her şeyden kuşku duysam bile, kuşku duyan bir düşünenin var olduğu kesindir." },
  { k: ["kötü cin"], t: "Kötü cin", o: "genius malignus", d: "Descartes'ın düşünce deneyi: Beni her konuda, matematikte bile aldatan güçlü bir varlık olabilir mi?" },
  { k: ["rasyonali"], t: "Rasyonalizm (akılcılık)", d: "En sağlam bilginin duyulardan değil akıldan geldiğini savunan görüş. Descartes, Spinoza ve Leibniz." },
  { k: ["empiri"], t: "Empirizm (deneycilik)", d: "Bütün bilginin sonunda deneyimden geldiğini savunan görüş. Locke, Berkeley ve Hume." },
  { k: ["tabula rasa", "beyaz kâğıt", "boş levha"], t: "Tabula rasa", o: "tabula rasa", d: "\"Silinmiş levha\": zihnin doğuşta hiçbir bilgi taşımadığı fikri. Locke'un \"beyaz kâğıt\" benzetmesiyle anılır." },
  { k: ["a priori"], t: "A priori", d: "Deneyimden önce, ondan bağımsız olarak bilinen. Örneğin \"Bütün bekârlar evlenmemiştir\" ya da matematik doğruları." },
  { k: ["a posteriori"], t: "A posteriori", d: "Ancak deneyimle bilinebilen. Örneğin \"Bu çay sıcak.\"" },
  { k: ["kendinde şey"], t: "Kendinde şey", o: "Ding an sich", d: "Kant'ta nesnenin bizim algı biçimlerimizden bağımsız, kendi başına hâli. Kant'a göre bilinemez." },
  { k: ["kategorik imperatif"], t: "Kategorik imperatif", d: "Kant'ın koşulsuz ahlak yasası: Yalnızca evrensel bir yasa olmasını isteyebileceğin ilkeye göre davran." },
  { k: ["transandantal", "aşkınsal"], t: "Transandantal (aşkınsal)", d: "Kant'ta: deneyimin kendisini mümkün kılan, deneyimden önce gelen koşullarla ilgili." },
  { k: ["diyalektik"], t: "Diyalektik", d: "Karşıtların gerilimiyle ilerleyen düşünme ya da gelişme. Sokrates'te soru-cevap yöntemi, Hegel'de kavramların ve tarihin hareketi." },
  { k: ["aufhebung"], t: "Aufhebung", d: "Hegel'in terimi: bir şeyin aynı anda kaldırılması, saklanması ve daha yüksek bir düzeye taşınması." },
  { k: ["tarihsel materyalizm"], t: "Tarihsel materyalizm", d: "Marx'ın görüşü: Toplumların tarihini belirleyen temel etken, maddi üretim ilişkileri ve sınıf çatışmalarıdır." },
  { k: ["varoluşçu"], t: "Varoluşçuluk", d: "İnsanın önceden belirlenmiş bir özü olmadığını, seçimleriyle kendini oluşturduğunu vurgulayan felsefe akımı." },
  { k: ["nihilizm"], t: "Nihilizm (hiççilik)", d: "Değerlerin, anlamın ya da hakikatin hiçbir dayanağı olmadığı görüşü ya da bu durumun yaşanması." },
  { k: ["ebedî dönüş", "ebedi dönüş"], t: "Ebedî dönüş", d: "Nietzsche'nin düşünce deneyi: Hayatını aynen, sonsuz kez yeniden yaşayacak olsaydın bunu isteyebilir miydin?" },
  { k: ["üstinsan"], t: "Üstinsan", o: "Übermensch", d: "Nietzsche'de kendi değerlerini yaratan insan ideali. Biyolojik bir ırk kavramı değildir." },
  { k: ["amor fati"], t: "Amor fati", d: "\"Kaderini sev\": Nietzsche'de hayatı olduğu gibi bütünüyle onaylama tutumu." }
);
window.TUTARLILIK.push(
  { kosul: [["descartes.cogito", "kesin"], ["rasyonalist-empirist.egilim", "deney"]],
    mesaj: "Cogito'yu kesin bilgi saydınız; bu bilgi deneyimden değil, düşünmenin kendisinden geliyordu. Terazide ise deneyim ağır bastı. Hume'a göre içe bakış da bir tür algıdır; bu ikisini nasıl birleştirirsiniz?" },
  { kosul: [["rasyonalist-empirist.egilim", "deney"], ["kant.gozluk", "bicim"]],
    mesaj: "Terazide deneyimi seçtiniz, gözlükte ise zihnin deneyime biçim verdiğini kabul ettiniz. Kant da tam bu ikisini birleştirmeye çalışıyordu." },
  { kosul: [["descartes.cogito", "ben-yok"], ["kierkegaard-nietzsche.donus", "bagli"]],
    mesaj: "Kalıcı bir \"ben\" olduğundan kuşku duydunuz, ama ebedî dönüşte seçimlerin sahibi olan bir benden söz ettiniz. Seçen kim?" }
);
Object.assign(window.YAKINLIK, {
  "descartes.cogito": { kesin: { descartes: 2, augustinus: 1, ibn_sina: 1 }, "ben-yok": { hume: 2, buda: 2 }, dil: { wittgenstein: 2 } },
  "rasyonalist-empirist.egilim": { akil: { descartes: 1, leibniz: 2, spinoza: 1, platon: 1 }, deney: { locke: 2, hume: 2, aristoteles: 1 }, denge: { kant: 2 } },
  "kant.gozluk": { bicim: { kant: 2 }, bilim: { locke: 1, popper: 1 }, yok: { berkeley: 2, hegel: 1 } },
  "hegel-marx.tarih": { fikir: { hegel: 2 }, madde: { marx: 2 }, etkilesim: { ibn_haldun: 1, arendt: 1 } },
  "kierkegaard-nietzsche.donus": { lanet: { schopenhauer: 2, buda: 1 }, kucak: { nietzsche: 2, camus: 1 }, bagli: { kierkegaard: 2, sartre: 1 } },
});
