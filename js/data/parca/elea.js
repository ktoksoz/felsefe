/* 02 Elea ve atomcular: sözlük, tutarlılık ve yakınlık eklemeleri */
SOZLUK.push(
  { k: ["aletheia"], t: "Aletheia (hakikat)", o: "ἀλήθεια", d: "Yunanca \"hakikat\"; sözcük anlamı \"gizli olmayan, unutulmamış\". Parmenides'in şiirinde tanrıçanın gösterdiği akıl yolu." },
  { k: ["doksa"], t: "Doksa (sanı)", o: "δόξα", d: "Görüş, kanı. Parmenides'te duyulara dayanan ölümlülerin güvenilmez yolu; Platon'da bilgiden (episteme) ayrılan sanı." },
  { k: ["paradoks"], t: "Paradoks", o: "παράδοξον", d: "Kabul edilebilir görünen öncüllerden kabul edilmesi zor bir sonuca götüren akıl yürütme. Zenon'unkiler en eskileri arasındadır.", u: "https://tr.wikipedia.org/wiki/Paradoks" },
  { k: ["limit"], only: ["zenon-asil", "zenon-ok"], t: "Limit", d: "Bir dizinin terimlerinin giderek yaklaştığı değer. ½ + ¼ + ⅛ + … toplamının limiti 1'dir. Kesin tanımı 19. yüzyılda Cauchy ve Weierstrass'a dayanır.", u: "https://tr.wikipedia.org/wiki/Limit_(matematik)" },
  { k: ["süper görev"], t: "Süper görev", d: "Sonsuz sayıda adımın sonlu bir sürede tamamlandığı varsayılan işlem. Zenon'un paradokslarından doğan çağdaş tartışma.", u: "https://en.wikipedia.org/wiki/Supertask" },
  { k: ["kalkülüs"], t: "Kalkülüs", d: "Değişimi ve birikimi inceleyen matematik dalı (türev ve integral). 17. yüzyılda Newton ve Leibniz birbirinden bağımsız geliştirdi.", u: "https://tr.wikipedia.org/wiki/Kalkülüs" },
  { k: ["dört öğe", "dört kök"], t: "Dört öğe", d: "Empedokles'e göre her şeyi oluşturan dört kalıcı kök: toprak, su, hava, ateş. Aristoteles benimsedi; iki bin yıl boyunca temel doğa kuramı oldu.", u: "https://tr.wikipedia.org/wiki/Klasik_elementler" },
  { k: ["nous"], t: "Nous (akıl)", o: "νοῦς", d: "Akıl, zihin. Anaksagoras'ta evrene düzen veren ve hareketi başlatan ilke; sonra Platon, Aristoteles ve Plotinos'ta temel bir kavram." },
  { k: ["atom"], only: ["atomcular", "zenon-asil"], t: "Atom (antik)", o: "ἄτομον", d: "\"Kesilemez\". Leukippos ve Demokritos'a göre boşlukta hareket eden, bölünemeyen, sayısız en küçük parçacık. Modern atom bu anlamda bölünemez değildir.", u: "https://tr.wikipedia.org/wiki/Atomculuk" },
  { k: ["boşluk"], only: ["atomcular", "parmenides"], t: "Boşluk (kenon)", o: "κενόν", d: "Atomcularda atomların içinde hareket ettiği \"var olmayan\". Parmenides'e karşı: olmayan da bir anlamda vardır." },
  { k: ["uzlaşım"], only: ["atomcular", "protagoras"], t: "Uzlaşım (nomos)", o: "νόμος", d: "Yasa, gelenek, insanlar arasında kabul görmüş olan. Doğaya (physis) karşıt olarak kullanılır." }
);
TUTARLILIK.push(
  { kosul: [["zenon-asil", "bolunmez"], ["atomcular", "sonsuz"]], mesaj: "Aşil slaytında uzay ve zamanın sonsuza dek bölünemeyeceğini söylemiştiniz; şimdi elmanın sonsuza dek bölünebileceğini söylüyorsunuz. Madde uzayı doldurduğuna göre bu ikisi arasında bir gerilim var." },
  { kosul: [["zenon-asil", "bolunmez"], ["atomcular", "durur"]], mesaj: "Tutarlı: Aşil slaytında da sonsuz bölünmeye karşı çıkmıştınız. Atomcular da tam böyle düşünüyordu." },
  { kosul: [["zenon-asil", "yetisir"], ["atomcular", "durur"]], mesaj: "Aşil'de sonsuz bölünebilir bir yolu kabul ettiniz, burada maddenin bölünmesinde duruyorsunuz. Çelişki değil: Aristoteles de uzayı sonsuz bölünebilir sayar, ama bölmenin hiç tamamlanmadığını söylerdi." },
  { kosul: [["parmenides", "p4"], ["atomcular", "durur"]], mesaj: "Parmenides'te boşluğun var olabileceğini kabul etmiştiniz; şimdi atomlarda duruyorsunuz. Tam bir atomcu tablosu: atomlar ve boşluk." },
  { kosul: [["parmenides", "hepsi"], ["zenon-asil", "yetisir"]], mesaj: "Parmenides'in bütün öncüllerini kabul ettiniz (değişim bir yanılsama), ama Aşil'in kaplumbağayı geçtiğini söylüyorsunuz. Zenon tam olarak bu gerilimi göstermek istiyordu." },
  { kosul: [["parmenides", "hepsi"], ["zenon-asil", "yanilsama"]], mesaj: "Tutarlı bir Elealısınız: Parmenides'in öncüllerini kabul ettiniz ve Zenon'la birlikte hareketin yanılsama olduğunu söylediniz." },
  { kosul: [["zenon-ok", "durur"], ["zenon-asil", "yetisir"]], mesaj: "Aşil'in kaplumbağayı geçtiğini kabul ettiniz, ama okun hiç hareket etmediğini söylüyorsunuz. İki paradoks aynı yanıtı ister mi, yoksa farklı mı?" },
  { kosul: [["nehir", "baska"], ["parmenides", "hepsi"]], mesaj: "Herakleitos'un nehrinde her değişimin onu başka bir nehir yaptığını söylemiştiniz; Parmenides'te de değişimi yanılsama saydınız. İki uç birden: her şey değişir ve hiçbir şey değişmez." }
);
Object.assign(YAKINLIK, {
  parmenides: { hepsi: { parmenides: 3, zenon_elea: 2 }, p1: { platon: 2 }, p2: { aristoteles: 2 }, p3: { gorgias: 1 }, p4: { leukippos: 2, demokritos: 2 } },
  "zenon-asil": { yetisir: { aristoteles: 2, leibniz: 1 }, yanilsama: { zenon_elea: 3, parmenides: 2 }, bolunmez: { demokritos: 2, epikuros: 1 } },
  "zenon-ok": { durur: { zenon_elea: 2, parmenides: 1 }, aralik: { aristoteles: 2 }, limit: { leibniz: 2 } },
  empedokles: { kuvvet: { empedokles: 3 }, nous: { anaksagoras: 3, aristoteles: 1 }, rastlanti: { demokritos: 3 } },
  atomcular: { durur: { leukippos: 2, demokritos: 3, epikuros: 1 }, sonsuz: { anaksagoras: 2, aristoteles: 2 } },
});
