/* 7. Doğu'nun antik bilgeliği: sözlük, yakınlık ve tutarlılık eklemeleri */
SOZLUK.push(
  { k: ["eksen çağı"], t: "Eksen Çağı", d: "Karl Jaspers'in MÖ 800–200 arasına verdiği ad: Yunan, Hint, Çin ve İran'da bugün de süren düşünce geleneklerinin aynı dönemde ortaya çıktığı çağ. Kavram tartışmalıdır.", u: "https://en.wikipedia.org/wiki/Axial_Age" },
  { only: ["upanisadlar", "buda"], k: ["atman"], t: "Atman", o: "आत्मन्", d: "Upanişadlarda bireyin en içteki, değişmeyen özü. Upanişadların büyük iddiası atmanın Brahman ile bir olduğudur." },
  { k: ["brahman"], t: "Brahman", o: "ब्रह्मन्", d: "Upanişadlarda evrenin temelindeki, her şeyi kapsayan gerçeklik. (Tanrı Brahma ve rahip sınıfı Brahmin ile karıştırılmamalı.)" },
  { k: ["dharma"], t: "Dharma", o: "धर्म", d: "Hint geleneklerinde düzen, görev ve doğru yaşam; Budizmde ayrıca Buda'nın öğretisi." },
  { only: ["upanisadlar", "buda"], k: ["karma"], t: "Karma", o: "कर्म", d: "Eylem ve eylemin sonuçları: yapılan her eylemin, yapan için iz bırakan bir etkisi olduğu düşüncesi." },
  { k: ["nirvana"], t: "Nirvana", o: "निर्वाण", d: "Budizmde arzunun ve acının \"sönmesi\"; yeniden doğuş döngüsünden kurtuluş." },
  { k: ["anatta", "anātman"], t: "Anatta (ben-sizlik)", o: "अनात्मन्", d: "Budizmin temel öğretisi: kalıcı, değişmeyen bir ben ya da öz yoktur; kişi değişen süreçlerin bir bileşimidir." },
  { k: ["dukkha"], t: "Dukkha", o: "दुःख", d: "Acı, doyumsuzluk, huzursuzluk. Dört yüce gerçeğin ilki: hayat dukkha ile iç içedir." },
  { k: ["dört yüce gerçek"], t: "Dört yüce gerçek", d: "Buda'nın ilk vaazındaki öğreti: acı vardır; acının kaynağı tutunmadır; acı sona erebilir; bunun yolu sekiz dilimli yoldur." },
  { k: ["sekiz dilimli yol"], t: "Sekiz dilimli yol", d: "Acıdan kurtuluş yolu: doğru görüş, niyet, söz, eylem, geçim, çaba, farkındalık ve yoğunlaşma." },
  { k: ["ren (insanlık)"], t: "Ren (insanlık)", o: "仁", d: "Konfüçyüsçülükte başkalarına karşı içten gelen iyilik, insan olmanın erdemi." },
  { k: ["li (adap)"], t: "Li (adap)", o: "禮", d: "Konfüçyüsçülükte törenler, görgü ve saygı biçimleri: iyiliğin toplum içindeki doğru biçimi." },
  { k: ["junzi"], t: "Junzi (erdemli insan)", o: "君子", d: "Konfüçyüs'ün ideal insanı: soyu değil, erdemi ve kendini yetiştirmesiyle soylu olan kişi." },
  { k: ["tao"], t: "Tao (yol)", o: "道", d: "Daoizmde her şeyin kendiliğinden işleyişi, adlandırılamayan kaynak. Konfüçyüs'te ise doğru yaşam yolu." },
  { k: ["wu wei"], t: "Wu wei", o: "無為", d: "\"Eylemsiz eylem\": zorlamadan, doğal akışa uyarak davranmak. Hiçbir şey yapmamak değil, zorlamamaktır." },
  { k: ["yin–yang", "yin-yang"], t: "Yin–yang", o: "陰陽", d: "Birbirine karşıt ama birbirini tamamlayan ve birbirine dönüşen iki ilke: karanlık ve aydınlık, yumuşak ve sert." },
  { k: ["śūnyatā", "sunyata"], t: "Śūnyatā (boşluk)", o: "शून्यता", d: "Nagarjuna'nın merkezî kavramı: hiçbir şeyin kendi başına, bağımsız bir özü yoktur; her şey başka şeylere bağlı olarak var olur." },
  { k: ["catuṣkoṭi", "catuskoti"], t: "Catuṣkoṭi (dörtlü önerme)", o: "चतुष्कोटि", d: "Bir soru karşısında dört olasılık: A; değil-A; hem A hem değil-A; ne A ne değil-A. Nagarjuna son kertede dördünü de reddeder." },
  { k: ["nyaya"], t: "Nyaya", o: "न्याय", d: "Hint felsefesinin mantık ve bilgi kuramı okulu. Doğru bilginin kaynaklarını ve beş adımlı çıkarımı sistemleştirdi." },
);

Object.assign(YAKINLIK, {
  "eksen-cagi.neden": { ortak: { jaspers: 2 }, etkilesim: { nagasena: 1 }, desen: {} },
  "upanisadlar.ben": { bir: { upanisadlar: 2, shankara: 2 }, bagli: { upanisadlar: 2 }, yok: { buda: 2, nagasena: 1, hume: 1 } },
  "buda.araba": { ad: { buda: 2, nagasena: 2, hume: 1, parfit: 1 }, duzen: { aristoteles: 2 }, butun: { nyaya: 2, upanisadlar: 1 } },
  "konfucyus.kural": { olumsuz: { konfucyus: 2, mengzi: 1 }, olumlu: { mozi: 2 }, evrensel: { kant: 2 } },
  "laozi.eylem": { su: { laozi: 2, zhuangzi: 1 }, tas: { xunzi: 2 }, duruma: { konfucyus: 1, aristoteles: 1 } },
  "zhuangzi.ruya": { zhou: { descartes: 1 }, bilemem: { zhuangzi: 1, descartes: 1, bostrom: 1 }, donusum: { zhuangzi: 2 } },
  "nagarjuna.kose": { a: {}, degil: {}, hem: {}, ne: { nagarjuna: 1 }, hicbiri: { nagarjuna: 2, buda: 1 } },
});

TUTARLILIK.push(
  { kosul: [["upanisadlar.ben", "bir"], ["buda.araba", "ad"]],
    mesaj: "Upanişad slaytında özünüzün evrenin özüyle bir olduğunu seçtiniz; arabada ise parçaların ardında bir öz olmadığını. Hint felsefesinde tam bu iki görüş yüzyıllarca tartışıldı. Birini bırakmanız gerekmeyebilir: Advaita için de ayrı ve kalıcı bir \"bireysel ben\" yanılgıdır." },
  { kosul: [["upanisadlar.ben", "yok"], ["buda.araba", "butun"]],
    mesaj: "Upanişad slaytında kalıcı bir öz olmadığını seçtiniz; şimdi arabanın parçalarından ayrı, gerçek bir bütün olduğunu söylüyorsunuz. Bütün araba için gerçekse, \"ben\" için neden olmasın?" },
  { kosul: [["konfucyus.kural", "olumsuz"], ["laozi.eylem", "tas"]],
    mesaj: "Altın kuralın olumsuz biçimini, yani önce zarar vermemeyi seçtiniz; haksızlık karşısında ise kararlı direnişi. Bu bir çelişki değil: Konfüçyüsçü gelenek de Xunzi'den beri iyiliğin emek ve kararlılık istediğini söyler." },
);
