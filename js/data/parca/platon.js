/* 4. Platon: sözlük, tutarlılık ve yakınlık eklemeleri */
SOZLUK.push(
  { k: ["idealar", "idea"], t: "İdea (biçim)", o: "ἰδέα, εἶδος", d: "Platon'da duyularla değil akılla kavranan, değişmeyen ve mükemmel gerçeklik. Güzel şeyler güzelliğin ideasından pay alır.", u: "https://tr.wikipedia.org/w/index.php?search=İdealar+kuramı" },
  { k: ["doksa", "sanı"], t: "Doksa (sanı)", o: "δόξα", d: "Görünür dünya hakkındaki kanı. Doğru olabilir ama gerekçesi sağlam değildir; bilgiden (episteme) ayrılır." },
  { k: ["episteme"], t: "Episteme (bilgi)", o: "ἐπιστήμη", d: "Gerekçesiyle kavranmış, değişmeyen şeylere dair bilgi. \"Epistemoloji\" (bilgi kuramı) sözcüğü buradan gelir." },
  { k: ["bölünmüş çizgi"], t: "Bölünmüş çizgi", d: "Platon'un Devlet'te (509d–511e) bilgi türlerini dört basamaklı bir çizgiyle anlattığı benzetme: imgeler, nesneler, matematik, idealar.", u: "https://en.wikipedia.org/wiki/Analogy_of_the_divided_line" },
  { k: ["anamnesis"], t: "Anamnesis (hatırlama)", o: "ἀνάμνησις", d: "Platon'a göre öğrenmek, ruhun doğumdan önce gördüğü ideaları hatırlamasıdır (Menon, Phaidon).", u: "https://en.wikipedia.org/wiki/Anamnesis_(philosophy)" },
  { k: ["thymos", "yürek"], only: ["ruh-arabasi"], t: "Thymos (yürek, öfke)", o: "θυμός", d: "Platon'da ruhun onur, öfke ve cesaretle ilgili parçası. Akla yardım edebilir ya da isteklere katılabilir." },
  { k: ["paideia"], t: "Paideia (eğitim)", o: "παιδεία", d: "Antik Yunan'da insanı bütünüyle yetiştiren eğitim ve kültür ideali." },
  { k: ["akademia"], t: "Akademia", o: "Ἀκαδήμεια", d: "Platon'un MÖ 387 civarında Atina dışındaki Akademos korusunda kurduğu okul. \"Akademi\" sözcüğü buradan gelir.", u: "https://tr.wikipedia.org/w/index.php?search=Platon+Akademisi" },
);
TUTARLILIK.push(
  { kosul: [["nehir", "baska"], ["idealar.daire", "anamnesis"]], mesaj: "Nehir için suyu değişince başka bir nehir olur dediniz; daire için ise değişmeyen bir biçimin bilgisine güvendiniz. Platon tam olarak bunu söyler: duyulur dünya akar, kalıcı olan idealardır." },
  { kosul: [["magara.don", "suphe"], ["idealar.daire", "anamnesis"]], mesaj: "Mağaranın dışının da bir mağara olabileceğinden kuşkulandınız, ama matematikte aklın kesin bilgisine güveniyorsunuz. Descartes da böyle düşündü: her şeyden kuşkulanıp aklın açık seçik bildiklerine yeniden ulaşmaya çalıştı." },
  { kosul: [["magara.don", "kal"], ["idealar.daire", "anamnesis"]], mesaj: "İdeaları aklın kavrayabileceğine inanıyorsunuz ama gördüklerinizi mağaradakilerle paylaşmak istemediniz. Platon bunu bilgiyle değil adaletle ilgili bir sorun sayar: bilen, bilmeyenlere borçludur." },
);
Object.assign(YAKINLIK, {
  "magara.don": { don: { platon: 2, sokrates: 1 }, kal: { epikuros: 2, pyrrhon: 1 }, suphe: { zhuangzi: 1, descartes: 1, bostrom: 1 } },
  "idealar.daire": { anamnesis: { platon: 2, descartes: 1, leibniz: 1 }, soyutlama: { aristoteles: 2, locke: 1 }, uzlasim: { ockham: 2, wittgenstein: 1 } },
});
