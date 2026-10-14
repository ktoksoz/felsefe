/* Büyük soru 1 (Neyi bilebilirim?): sözlük, tutarlılık ve yakınlık eklemeleri */
SOZLUK.push(
  { k: ["epistemoloji", "bilgi kuramı"], t: "Epistemoloji (bilgi kuramı)", o: "ἐπιστήμη", d: "Bilginin kaynağını, sınırlarını ve doğruluğunu inceleyen felsefe dalı. Yunanca epistēmē (bilgi) sözcüğünden.", u: "https://tr.wikipedia.org/w/index.php?search=Epistemoloji" },
  { k: ["kuşkuculuk", "septisizm"], t: "Kuşkuculuk (septisizm)", d: "Kesin bilginin mümkün olup olmadığından kuşku duyan felsefi tutum. Antik Pyrrhoncu kuşkuculuktan Descartes'ın yöntemsel kuşkusuna kadar birçok biçimi vardır." },
  { k: ["haklı gerekçelendirilmiş doğru inanç"], t: "Haklı gerekçelendirilmiş doğru inanç", d: "Bilginin klasik tanımı: bir şeyi bilmek için ona inanmak, inandığın şeyin doğru olması ve inanmak için iyi bir gerekçen olması gerekir. Gettier vakaları bu tanımın yetmediğini gösterir.", u: "https://en.wikipedia.org/wiki/Definitions_of_knowledge" },
  { k: ["simülasyon argümanı", "benzetim"], only: ["s-bilgi-kusku"], t: "Simülasyon argümanı", d: "Nick Bostrom'un 2003 argümanı: Gelişmiş uygarlıklar çok sayıda benzetim çalıştırıyorsa, bilinçli varlıkların çoğu benzetimde yaşıyor olmalıdır.", u: "https://en.wikipedia.org/wiki/Simulation_hypothesis" }
);
TUTARLILIK.push(
  { kosul: [["s-bilgi-kusku.magara", "disla"], ["s-bilgi-kusku.simulasyon", "kalir"]],
    mesaj: "Az önce mağara kuşkusunu dışlayabildiğinizi söylemiştiniz, şimdi simülasyonu dışlayamıyorsunuz. İkisinin yapısı aynı: içeriden bakınca görüntü ile gerçek ayırt edilemiyor. Sizin için ikisini ayıran bir ilke var mı? Belki simülasyonu yapan bir teknolojinin akla daha yatkın gelmesi?" },
  { kosul: [["s-bilgi-kusku.cin", "disla"], ["s-bilgi-kusku.simulasyon", "kalir"]],
    mesaj: "Kötü cini dışladınız ama simülasyonu dışlayamadınız. Simülasyonu çalıştıran uygarlık, kötü cinin bilgisayarlı bir hâli gibi düşünülebilir. Aradaki farkı yaratan ne: olasılık hesabı mı, cinin kötü niyeti mi?" },
  { kosul: [["s-bilgi-kusku.simulasyon", "disla"], ["s-bilgi-kusku.cin", "kalir"]],
    mesaj: "Simülasyonu dışlayıp kötü cini dışlayamadınız. Oysa benzetim, aldatıcı varlığın bir türüdür. İkisini ayıran bir ilke bulabilir misiniz?" },
  { kosul: [["s-bilgi-kusku.kelebek", "kalir"], ["s-bilgi-kusku.magara", "disla"]],
    mesaj: "Rüyada olmadığınızı gösteremeyeceğinizi düşünüyorsunuz ama mağarada olmadığınızı gösterebileceğinizi düşünüyorsunuz. Rüyadan uyanmak ile mağaradan çıkmak arasında, sizin için hangi fark belirleyici?" },
  { kosul: [["s-gettier.saat", "degil"], ["s-gettier.ahir", "bilgi"]],
    mesaj: "Durmuş saat vakasında \"bilgi değil\" demiştiniz, sahte ahırlarda \"biliyor\" diyorsunuz. İkisinde de kişi doğruya şans eseri ulaşıyor. Farkı belki şurada: Ali gerçekten bir ahıra bakıyor, Ayşe ise işlemeyen bir saate. Sizce belirleyici olan bu mu?" },
  { kosul: [["s-gettier.saat", "bilgi"], ["s-gettier.koyun", "degil"]],
    mesaj: "Durmuş saatte \"biliyor\", ahırdaki koyunda \"bilgi değil\" dediniz. Saat vakasında kişi gerçekten saate bakıyor, koyun vakasında ise başka bir hayvana. Bu farkı mı esas alıyorsunuz?" },
  { kosul: [["s-gettier.is", "bilgi"], ["s-gettier.koyun", "degil"]],
    mesaj: "Bozuk para vakasında \"biliyor\", koyun vakasında \"bilgi değil\" dediniz. İkisinde de inanç, yanlış bir öncülden (Can işi alacak / gördüğüm şey koyun) çıkıyor. Sizin için ikisini ayıran ne?" },
  { kosul: [["s-bilgi-kusku.magara", "kalir"], ["s-bilgi-kusku.cin", "kalir"], ["s-bilgi-kusku.kelebek", "kalir"], ["s-bilgi-kusku.simulasyon", "kalir"], ["s-gettier.saat", "bilgi"]],
    mesaj: "Dört kuşkunun hiçbirini dışlayamadığınızı söylediniz ama durmuş saate bakan Ayşe'nin saati bildiğini kabul ettiniz. Bu kadar katı bir kuşkuyla, gündelik bilgi iddialarında bu kadar cömert olmak nasıl bağdaşır?" }
);
Object.assign(YAKINLIK, {
  "s-bilgi-kusku.magara": { disla: { platon: 1, aristoteles: 1 }, kalir: { kant: 1, platon: 1 } },
  "s-bilgi-kusku.cin": { disla: { descartes: 1 }, kalir: { descartes: 1, augustinus: 1, pyrrhon: 1 } },
  "s-bilgi-kusku.kelebek": { disla: { descartes: 1, aristoteles: 1 }, kalir: { zhuangzi: 2 } },
  "s-bilgi-kusku.simulasyon": { disla: { ockham: 1, hume: 1 }, kalir: { bostrom: 2, pyrrhon: 1 } },
  "s-gettier.saat": { bilgi: { locke: 1 }, degil: { gettier: 1, platon: 1 } },
  "s-gettier.koyun": { bilgi: { locke: 1 }, degil: { gettier: 1 } },
  "s-gettier.is": { bilgi: { locke: 1 }, degil: { gettier: 2 } },
  "s-gettier.ahir": { bilgi: { locke: 1 }, degil: { nyaya: 1, russell: 1 } },
});
