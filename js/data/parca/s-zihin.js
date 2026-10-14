/* Büyük soru 7 (zihin ve makine): sözlük, tutarlılık, yakınlık */
SOZLUK.push(
  { k: ["turing testi"], t: "Turing testi", d: "Turing'in 1950'de önerdiği taklit oyunu: yazışmada makine ile insanı ayırt edemeyen bir sorgucu, makinenin düşündüğünü kabul etmek için ne gerekir?", u: "https://tr.wikipedia.org/w/index.php?search=Turing+testi" },
  { k: ["çince oda"], t: "Çince oda", d: "Searle'ün 1980'deki düşünce deneyi: kurallara göre sembol işleyen biri, anlamadığı bir dilde kusursuz cevaplar üretebilir. Program çalıştırmak anlamak mıdır?", u: "https://tr.wikipedia.org/w/index.php?search=%C3%87ince+oda" },
  { k: ["qualia"], t: "Qualia", o: "qualia", d: "Deneyimin öznel nitelikleri: kırmızıyı görmenin, kahve kokusunu almanın \"nasıl bir şey olduğu\".", u: "https://tr.wikipedia.org/w/index.php?search=Qualia" },
  { k: ["felsefi zombi"], t: "Felsefi zombi", d: "Fiziksel olarak bir insanla tıpatıp aynı olan, aynı davranan ama hiçbir iç deneyimi olmayan varsayımsal varlık.", u: "https://tr.wikipedia.org/w/index.php?search=Felsefi+zombi" },
  { k: ["zor problem"], t: "Bilincin zor problemi", d: "Chalmers'ın adlandırması: beyin süreçlerinin neden ve nasıl öznel bir deneyimle birlikte geldiği sorusu.", u: "https://en.wikipedia.org/wiki/Hard_problem_of_consciousness" },
  { k: ["fizikalizm"], t: "Fizikalizm", d: "Var olan her şeyin fiziksel olduğu, ya da fiziksel olana dayandığı görüşü.", u: "https://tr.wikipedia.org/w/index.php?search=Fizikalizm" },
  { k: ["işlevselcilik"], t: "İşlevselcilik", d: "Zihinsel durumları, neyden yapıldıklarıyla değil, sistem içinde gördükleri işlevle tanımlayan görüş.", u: "https://en.wikipedia.org/wiki/Functionalism_(philosophy_of_mind)" },
);
TUTARLILIK.push(
  { kosul: [["s-cince-oda.anlama", "hayir"], ["s-mary-zombi.zombi", "tutarsiz"]], mesaj: "Çince odada davranışın anlamaya yetmediğini söylediniz, ama aynı davranan bir zombinin tutarsız bir fikir olduğunu düşünüyorsunuz. Davranış birinde yetmiyor, ötekinde her şey mi?" },
  { kosul: [["s-cince-oda.anlama", ["sistem", "kullanim"]], ["s-mary-zombi.zombi", "mumkun"]], mesaj: "Çince odada anlamanın sistemin işlevinde olduğunu söylediniz, ama işlevi aynı olan bir zombinin bilinçsiz olabileceğini kabul ediyorsunuz. Anlamak ile deneyimlemek sizin için farklı şeyler mi?" },
);
Object.assign(YAKINLIK, {
  "s-cince-oda.anlama": { hayir: { searle: 2, leibniz: 1 }, sistem: { turing: 2 }, kullanim: { wittgenstein: 2, turing: 1 } },
  "s-mary-zombi.mary": { evet: { jackson: 2, chalmers: 1 }, yetenek: {}, hayir: {} },
  "s-mary-zombi.zombi": { mumkun: { chalmers: 2, descartes: 1 }, degil: { searle: 1 }, tutarsiz: {} },
});
