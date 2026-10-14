/* 5. Aristoteles: sözlük, tutarlılık ve yakınlık eklemeleri */
SOZLUK.push(
  { k: ["lykeion"], t: "Lykeion", o: "Λύκειον", d: "Aristoteles'in MÖ 335'te Atina'da kurduğu okul. Öğrencilerine yürüyerek ders verdiği anlatıldığı için okula \"Peripatetik\" denir. \"Lise\" sözcüğü buradan gelir.", u: "https://tr.wikipedia.org/w/index.php?search=Lykeion" },
  { k: ["assos"], t: "Assos", d: "Bugünkü Behramkale (Ayvacık, Çanakkale). Aristoteles MÖ 347–345 civarında burada yaşadı ve felsefe yaptı.", u: "https://tr.wikipedia.org/w/index.php?search=Assos" },
  { k: ["kıyas", "syllogismos"], t: "Kıyas (tasım)", o: "συλλογισμός", d: "İki öncülden zorunlu olarak bir sonuç çıkaran akıl yürütme. Aristoteles'in Birinci Analitikler'de sistemleştirdiği mantığın temeli.", u: "https://tr.wikipedia.org/w/index.php?search=Kıyas+(mantık)" },
  { k: ["öncül"], t: "Öncül", d: "Bir akıl yürütmede sonucun dayandığı önerme." },
  { k: ["orta terim"], t: "Orta terim", d: "Kıyasta iki öncülde de geçen, sonuçta görünmeyen terim. Öncülleri birbirine bağlayan köprüdür." },
  { k: ["geçerli", "geçerlilik"], only: ["kiyas"], t: "Geçerlilik", d: "Bir akıl yürütmenin biçim özelliği: öncüller doğruysa sonucun yanlış olması imkânsızdır. Öncüllerin gerçekten doğru olup olmadığından bağımsızdır." },
  { k: ["telos"], t: "Telos (amaç)", o: "τέλος", d: "Bir şeyin yöneldiği amaç ya da tamamlanma noktası. Aristoteles'in amaç nedeni." },
  { k: ["entelekheia"], t: "Entelekheia", o: "ἐντελέχεια", d: "Bir şeyin içindeki olanağın (dynamis) tam olarak gerçekleşmiş hâli: meşe, palamudun entelekheiasıdır." },
  { k: ["dört neden", "madde nedeni", "amaç nedeni"], t: "Dört neden", d: "Aristoteles'e göre bir şeyi açıklamanın dört yolu: madde, biçim, etken ve amaç nedenleri (Fizik II.3).", u: "https://en.wikipedia.org/wiki/Four_causes" },
  { k: ["erdem", "arete"], t: "Erdem (arete)", o: "ἀρετή", d: "Bir şeyin kendi işini iyi yapmasını sağlayan üstünlük. İnsanda karakter ve akıl üstünlükleri; Aristoteles'te alışkanlıkla kazanılır." },
  { k: ["eudaimonia"], t: "Eudaimonia", o: "εὐδαιμονία", d: "Genellikle \"mutluluk\" diye çevrilir; daha doğrusu iyi yaşamak, insan olarak serpilip gelişmek. Aristoteles'e göre ruhun erdeme uygun etkinliği.", u: "https://tr.wikipedia.org/w/index.php?search=Eudaimonia" },
  { k: ["phronesis", "pratik bilgelik"], t: "Phronesis (pratik bilgelik)", o: "φρόνησις", d: "Belirli bir durumda neyin yapılması gerektiğini doğru kavrama yetisi. Aristoteles'e göre altın ortayı bulan yeti." },
  { k: ["altın orta"], t: "Altın orta", d: "Aristoteles'te erdemin aşırılık ile eksiklik arasındaki \"bize göre orta\" olduğu fikri (Nikomakhos'a Etik II.6).", u: "https://en.wikipedia.org/wiki/Golden_mean_(philosophy)" },
);
TUTARLILIK.push(
  { kosul: [["idealar.daire", "soyutlama"], ["altinorta.kaynak", "phronesis"]], mesaj: "Bilgide duyulardan, ahlakta deneyimli muhakemeden başladınız. İki cevabınız da Aristoteles'in yolunda: önce örnekler, sonra kavram." },
  { kosul: [["idealar.daire", "anamnesis"], ["altinorta.kaynak", "phronesis"]], mesaj: "Matematikte Platon gibi değişmeyen biçimlere, ahlakta ise Aristoteles gibi duruma göre değişen ölçüye güveniyorsunuz. Bu bir çelişki değil, ama Platon iyinin de bir ideası olduğunu, onun da akılla kesin bilinebileceğini söylerdi." },
  { kosul: [["magara.don", "don"], ["altinorta.kaynak", "kural"]], mesaj: "Mağaraya dönmeyi bir yükümlülük gibi gördünüz ve ahlakta evrensel kuralları seçtiniz. Kant da başkalarını aydınlatmayı, kendi aklını kullanma cesaretiyle birlikte bir ödev sayardı." },
);
Object.assign(YAKINLIK, {
  "altinorta.kaynak": { phronesis: { aristoteles: 2 }, kural: { kant: 2 }, sonuc: { bentham: 1, mill: 1 }, adap: { konfucyus: 2, mengzi: 1 } },
});
