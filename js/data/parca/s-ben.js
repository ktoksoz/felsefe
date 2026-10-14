/* Büyük soru 3 (Ben kimim?): sözlük, tutarlılık ve yakınlık eklemeleri */
SOZLUK.push(
  { k: ["kişisel kimlik"], t: "Kişisel kimlik", d: "Bir kişiyi zaman içinde aynı kişi yapan şeyin ne olduğu sorusu: beden mi, hafıza mı, ruh mu, yoksa hiçbiri mi?", u: "https://en.wikipedia.org/wiki/Personal_identity" },
  { k: ["psikolojik süreklilik"], t: "Psikolojik süreklilik", d: "Anılar, niyetler, inançlar ve karakter arasındaki örtüşen bağlantıların zincirleme sürmesi. Parfit'e göre hayatta kalmada asıl önemli olan budur.", u: "https://en.wikipedia.org/wiki/Psychological_continuity" },
  { k: ["yığın paradoksu", "sorites"], t: "Yığın paradoksu (sorites)", o: "σωρίτης", d: "Bir kum yığınından tek bir tane almak onu yığın olmaktan çıkarmaz; ama bunu tekrarlarsak sonunda yığın kalmaz. Keskin sınırı olmayan kavramların bilmecesi.", u: "https://tr.wikipedia.org/w/index.php?search=Sorites paradoksu" },
  { k: ["skandha", "beş küme"], t: "Beş küme (skandha)", o: "स्कन्ध", d: "Budist öğretide kişiyi oluşturan beş bileşen: biçim (beden), duyum, algı, zihinsel oluşumlar ve bilinç. Bunların ötesinde ayrı bir ben yoktur.", u: "https://tr.wikipedia.org/w/index.php?search=Skandha" }
);
TUTARLILIK.push(
  { kosul: [["nehir", "baska"], ["s-theseus.tam", "evet"]],
    mesaj: "Herakleitos'un nehrinde, suyu değişince \"başka bir nehir\" demiştiniz; burada bütün tahtası değişen gemiye \"hâlâ aynı gemi\" diyorsunuz. Nehri gemiden ayıran bir ilke var mı? Belki geminin onarımını bir insanın bilerek yapması?" },
  { kosul: [["nehir", "ayni"], ["s-theseus.tam", "hayir"]],
    mesaj: "Nehrin, suyu değişse de aynı nehir olduğunu söylemiştiniz; gemi ise tahtaları değişince başka bir gemi oldu. Akış ile onarım arasında, kimlik için belirleyici bir fark görüyor musunuz?" },
  { kosul: [["nehir", "ayni"], ["s-theseus.asil", "eski"]],
    mesaj: "Nehirde kimliği akışın sürekliliğine bağlamıştınız; gemide ise asıl olanı eski malzemede görüyorsunuz. İkinci bir aday (eski tahtalardan kurulan gemi) ortaya çıkınca mı ölçütünüz değişti?" },
  { kosul: [["nehir", "baska"], ["s-theseus.asil", "limandaki"]],
    mesaj: "Nehirde maddenin değişmesini kimliğin bitmesi saymıştınız; gemide maddesi tümüyle değişmiş limandaki gemiyi asıl sayıyorsunuz. Sizce fark nerede?" },
  { kosul: [["s-theseus.yari", "hayir"], ["s-theseus.tam", "evet"]],
    mesaj: "Tahtaların yarısı değişince \"artık başka bir gemi\" demiştiniz; hepsi değişince \"hâlâ aynı gemi\" diyorsunuz. Gemi bir ara başka bir gemi olup sonra yeniden aynı gemi mi oldu?" },
  { kosul: [["s-theseus.tam", "evet"], ["s-theseus.asil", "eski"]],
    mesaj: "Bütün tahtalar değişince limandaki gemiye \"hâlâ aynı gemi\" demiştiniz; ikinci gemi kurulunca asıl olarak eski tahtalardan kurulanı seçtiniz. Bir rakip ortaya çıkınca ölçütünüz değişti. Hobbes'un göstermek istediği tam da buydu: \"aynı\" derken ne kastettiğimizi seçmek zorundayız." },
  { kosul: [["s-theseus.tam", "hayir"], ["s-theseus.asil", "limandaki"]],
    mesaj: "Tahtaların hepsi değişince limandaki geminin artık başka bir gemi olduğunu söylemiştiniz; şimdi asıl gemi olarak yine onu seçiyorsunuz. Belki de \"asıl\" ile \"aynı\" sizin için farklı şeyler?" },
  { kosul: [["s-theseus.asil", "eski"], ["s-kimlik.isinlanma", "ben"]],
    mesaj: "Gemide asıl olanı aynı tahtalarda gördünüz; ama ışınlanmada, buradaki bedeninizden tek bir atom bile taşımayan Mars'taki kişiyi \"ben\" saydınız. Gemi için madde, kişi için düzen mi belirleyici?" },
  { kosul: [["s-theseus.asil", "limandaki"], ["s-kimlik.prens", "hafiza"]],
    mesaj: "Gemide kesintisiz süreklilik ölçütünü seçtiniz; prens vakasında ise anıların bir bedenden ötekine \"atlamasını\" kimliğin taşınması saydınız. Kişiler için süreklilik ölçütü neden gevşiyor?" },
  { kosul: [["s-kimlik.prens", "hafiza"], ["s-kimlik.isinlanma", "kopya"]],
    mesaj: "Prens vakasında Locke ile birlikte kişiyi anıların sürekliliğine bağladınız. Işınlanan kişide de anılar eksiksiz sürüyor, ama onu kopya saydınız. Sizi ayıran ne: bedenin yok edilmesi mi, maddenin değişmesi mi?" },
  { kosul: [["s-kimlik.prens", "beden"], ["s-kimlik.isinlanma", "ben"]],
    mesaj: "Prens vakasında kişiyi bedene bağladınız; ışınlanmada ise yeni atomlardan kurulan bedeni \"ben\" saydınız. Beden ölçütünüzde önemli olan maddenin kendisi mi, biçimi mi?" },
  { kosul: [["s-kimlik.isinlanma", "ben"], ["s-kimlik.bolunme", "hicbiri"]],
    mesaj: "Işınlanmada Mars'taki kişiyi \"ben\" saydınız; bölünmede iki yarıdan hiçbirini saymadınız. Oysa her biri sizinle, Mars'taki kişi kadar psikolojik süreklilik taşıyor. Tek fark, ortada iki aday olması. Parfit'in sorusu tam burada: Önemli olan kimlik mi, süreklilik mi?" },
  { kosul: [["s-kimlik.prens", "hafiza"], ["s-kimlik.bolunme", "biri"]],
    mesaj: "Kişiyi anılara bağladınız; bölünmede iki yarının anıları aynı, ama yalnızca birini \"siz\" saydınız. Anılar eşitse, seçimi ne belirliyor?" }
);
Object.assign(YAKINLIK, {
  "s-theseus.yari": { evet: { aristoteles: 1, locke: 1 }, hayir: { hobbes: 1 } },
  "s-theseus.tam": { evet: { aristoteles: 1, herakleitos: 1 }, hayir: { demokritos: 1 } },
  "s-theseus.asil": { limandaki: { aristoteles: 2, herakleitos: 1 }, eski: { hobbes: 2, demokritos: 1 }, hicbiri: { nagasena: 2, buda: 1, hume: 1 } },
  "s-kimlik.prens": { hafiza: { locke: 2, parfit: 1 }, beden: { aristoteles: 1 } },
  "s-kimlik.isinlanma": { ben: { parfit: 2, locke: 1 }, kopya: { aristoteles: 1, descartes: 1 } },
  "s-kimlik.bolunme": { ikisi: { locke: 1 }, biri: { descartes: 1, ibn_sina: 1 }, hicbiri: { aristoteles: 1 }, onemsiz: { parfit: 2, buda: 2, hume: 1 } },
});
