/* Büyük soru 4 (Doğru olan ne?): sözlük, tutarlılık ve yakınlık eklemeleri.
   "uyum: true" olan kurallar gerilim değil, tutarlı bir çizgiyi gösterir (tramvay sayacı bunları gerilim saymaz). */
SOZLUK.push(
  { k: ["faydacılık"], t: "Faydacılık", d: "Bir eylemin doğruluğunu, etkilediği herkesin toplam mutluluğuna ya da refahına katkısıyla ölçen etik görüş. Bentham ve Mill ile tanınır.", u: "https://tr.wikipedia.org/w/index.php?search=Faydacılık" },
  { k: ["sonuççuluk"], t: "Sonuççuluk", d: "Eylemlerin ahlaki değerini yalnızca sonuçlarına göre belirleyen görüşler ailesi. Faydacılık en bilinen biçimidir.", u: "https://en.wikipedia.org/wiki/Consequentialism" },
  { k: ["ödev etiği", "deontoloji"], t: "Ödev etiği (deontoloji)", d: "Bazı eylemlerin sonuçlarından bağımsız olarak doğru ya da yanlış olduğunu, ahlakın ödevlere ve kurallara dayandığını savunan etik görüş. Kant en önemli temsilcisidir.", u: "https://tr.wikipedia.org/w/index.php?search=Deontoloji" },
  { k: ["erdem etiği"], t: "Erdem etiği", d: "Ahlakın merkezine tek tek eylemleri değil, kişinin karakterini ve erdemlerini koyan gelenek: Aristoteles, Konfüçyüs ve çağdaş takipçileri.", u: "https://en.wikipedia.org/wiki/Virtue_ethics" },
  { k: ["kategorik imperatif", "koşulsuz buyruk"], t: "Kategorik imperatif (koşulsuz buyruk)", d: "Kant'ın ahlak yasası: Yalnızca evrensel bir yasa olmasını isteyebileceğin maksime göre davran. İnsanlığı hiçbir zaman yalnızca bir araç olarak kullanma.", u: "https://tr.wikipedia.org/w/index.php?search=Kategorik imperatif" },
  { k: ["maksim"], only: ["s-etik-araclar"], t: "Maksim", d: "Kant'ta bir kişinin eylemini yönlendiren öznel ilke: \"Şu durumda şunu yaparım.\"", u: "https://en.wikipedia.org/wiki/Maxim_(philosophy)" },
  { k: ["çifte etki ilkesi"], t: "Çifte etki ilkesi", d: "İyi bir amaç için yapılan eylemin, istenmeyen ama öngörülen kötü bir yan etkisinin belirli koşullarda kabul edilebileceği ilkesi. Kötü sonuç amaca giden araç olmamalıdır. Aquinas'a dayandırılır.", u: "https://en.wikipedia.org/wiki/Principle_of_double_effect" },
  { k: ["haz hesabı"], t: "Haz hesabı", d: "Bentham'ın, bir eylemin doğurduğu hazları ve acıları yoğunluk, süre, kesinlik, yakınlık, verimlilik, saflık ve yaygınlık ölçütleriyle tartma yöntemi (1789).", u: "https://en.wikipedia.org/wiki/Felicific_calculus" }
);
TUTARLILIK.push(
  { kosul: [["s-tramvay.makas", "mudahale"], ["s-tramvay.kopru", "birak"]],
    mesaj: "Makasta beş kişi için bir kişiyi feda etmeyi kabul ettiniz, köprüde etmediniz. İkisinde de sonuç aynı: bir ölüm, beş kurtuluş. Sizi ayıran ilke ne olabilir? İnsanların çoğu böyle cevap veriyor. Bir açıklama çifte etki ilkesi: makasta ölüm bir yan etki, köprüde ise aracın kendisi." },
  { kosul: [["s-tramvay.makas", "mudahale"], ["s-tramvay.kopru", "birak"], ["s-tramvay.dongu", "mudahale"]],
    mesaj: "Döngüde de kişinin bedeni tramvayı durduran araç, tıpkı köprüdeki adam gibi. Köprüde itmediniz ama döngüde makası çevirdiniz. Belirleyici olan fiziksel temas mı, yoksa hareketin kendisi mi? Thomson döngü vakasını tam da bu soruyu sormak için kurdu." },
  { kosul: [["s-tramvay.kopru", "mudahale"], ["s-tramvay.cerrah", "birak"]],
    mesaj: "Köprüde bir kişiyi beş kişi için feda etmeyi kabul ettiniz, hastanede etmediniz. İkisinde de bir insanın bedeni diğerlerini kurtarmak için kullanılıyor. Sizi ayıran ne: hastaneye duyulan güven mi, acil bir anda karar vermek mi?" },
  { kosul: [["s-tramvay.makas", "birak"], ["s-tramvay.kopru", "mudahale"]],
    mesaj: "Makası çevirmediniz ama köprüden adamı ittiniz. Çoğu insan tam tersini seçiyor. Sizin için köprüyü makastan ayıran bir ilke var mı?" },
  { kosul: [["s-tramvay.makas", "birak"], ["s-tramvay.dongu", "mudahale"]],
    mesaj: "Makas vakasında müdahale etmediniz, döngüde ettiniz. İkisinde de yaptığınız hareket aynı: makası çevirmek. Döngünün biçimi sizin için neyi değiştirdi?" },
  { kosul: [["s-tramvay.dongu", "birak"], ["s-tramvay.kopru", "mudahale"]],
    mesaj: "Döngüde makası çevirmediniz ama köprüden adamı ittiniz. İki vakada da bir kişinin bedeni tramvayı durduruyor; köprüde ise ona doğrudan dokunuyorsunuz. Hangisi sizin için daha kabul edilebilir olmalıydı?" },
  { uyum: true, kosul: [["s-tramvay.makas", "mudahale"], ["s-tramvay.kopru", "mudahale"], ["s-tramvay.dongu", "mudahale"], ["s-tramvay.cerrah", "mudahale"]],
    mesaj: "Dört vakada da sonuca baktınız: tutarlı bir faydacı çizgi. Bentham sizinle aynı fikirde. Ama dikkat: Çoğu faydacı cerrah vakasında, hastanelere güvenin çökmesi gibi uzun vadeli sonuçları da hesaba katarak ameliyatı reddeder." },
  { uyum: true, kosul: [["s-tramvay.makas", "birak"], ["s-tramvay.kopru", "birak"], ["s-tramvay.dongu", "birak"], ["s-tramvay.cerrah", "birak"]],
    mesaj: "Hiçbir vakada müdahale etmediniz: öldürmek ile ölmesine izin vermek arasındaki farka büyük ağırlık veriyorsunuz. Thomson 2008'de vardığı sonuçta size yaklaştı: makastaki yabancının da müdahale etmeye hakkı olmayabilir." },
  { uyum: true, kosul: [["s-tramvay.makas", "mudahale"], ["s-tramvay.kopru", "birak"], ["s-tramvay.dongu", "birak"], ["s-tramvay.cerrah", "birak"]],
    mesaj: "Yalnızca ölümün yan etki olduğu makas vakasında müdahale ettiniz; bir insanın araç olarak kullanıldığı üç vakada etmediniz. Bu, çifte etki ilkesiyle tam uyumlu bir çizgi (Aquinas, Foot)." },
  { kosul: [["s-tramvay.makas", "mudahale"], ["s-etik-araclar.kapi", "dogru"]],
    mesaj: "Tramvayda sonuçlara bakıp makası çevirdiniz; kapıdaki katile ise, sonucu ne olursa olsun doğruyu söylemeyi seçtiniz. Bir durumda sonuçları, ötekinde ilkeyi esas aldınız. İkisini ayıran nedir: öldürmemek ile yalan söylememek arasında bir derece farkı mı?" },
  { kosul: [["s-tramvay.kopru", "birak"], ["s-tramvay.cerrah", "birak"], ["s-etik-araclar.kapi", "yalan"]],
    mesaj: "Köprüde ve hastanede bir insanı araç olarak kullanmayı reddettiniz, Kant'a yakın durdunuz; kapıdaki katile ise yalan söylemeyi seçtiniz. Kant'ın kendisi yalanı da reddederdi. Ama bugün birçok Kantçı sizinle aynı fikirde: Katil, sizi kendi kötülüğünün aracı yapmaya çalışıyor." },
  { kosul: [["s-tramvay.cerrah", "mudahale"], ["s-etik-araclar.kapi", "dogru"]],
    mesaj: "Ameliyatta beş hasta için bir masumu feda edecek kadar sonuçlara baktınız; ama kapıdaki katile, arkadaşınızın hayatı pahasına doğruyu söylüyorsunuz. Hangi ilke bu iki cevabı birleştirebilir?" }
);
Object.assign(YAKINLIK, {
  "s-tramvay.makas": { mudahale: { bentham: 1, foot: 1, mozi: 1 }, birak: { kant: 1 } },
  "s-tramvay.kopru": { mudahale: { bentham: 2, singer: 1 }, birak: { kant: 1, aquinas: 1, foot: 1 } },
  "s-tramvay.dongu": { mudahale: { thomson: 1, bentham: 1 }, birak: { kant: 1, aquinas: 1 } },
  "s-tramvay.cerrah": { mudahale: { bentham: 1 }, birak: { kant: 1, thomson: 1, mill: 1 } },
  "s-etik-araclar.kapi": { yalan: { bentham: 1, mill: 1 }, dogru: { kant: 2 }, kacamak: { aristoteles: 1, konfucyus: 1 } },
});
