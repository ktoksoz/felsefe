/* 03 Sofistler ve Sokrates: sözlük, diyalog, tutarlılık ve yakınlık eklemeleri */
SOZLUK.push(
  { k: ["sofist"], t: "Sofist", o: "σοφιστής", d: "MÖ 5. yüzyılda kentten kente dolaşıp para karşılığı retorik ve erdem öğreten hocalar. Protagoras ve Gorgias en ünlüleridir.", u: "https://tr.wikipedia.org/wiki/Sofist" },
  { k: ["retorik"], t: "Retorik", o: "ῥητορική", d: "İkna etme sanatı. Atina demokrasisinde mecliste ve mahkemede başarının anahtarıydı.", u: "https://tr.wikipedia.org/wiki/Retorik" },
  { k: ["görecelik"], t: "Görecelik", d: "Doğrunun ya da değerin kişiye, topluma ya da bakış açısına göre değiştiği görüşü. Protagoras'ın \"insan her şeyin ölçüsüdür\" sözüyle başlar.", u: "https://tr.wikipedia.org/wiki/Görecelik_(felsefe)" },
  { k: ["pythia"], t: "Pythia", o: "Πυθία", d: "Delfi'deki Apollon tapınağının kâhin rahibesi. Danışanların sorularına tanrı adına yanıt verirdi.", u: "https://tr.wikipedia.org/wiki/Pythia" },
  { k: ["elenkhos"], t: "Elenkhos (sorgulama)", o: "ἔλεγχος", d: "Sokrates'in yöntemi: karşısındakinin tanımını sorular ve karşı örneklerle sınayıp tutarsızlığını göstermek.", u: "https://en.wikipedia.org/wiki/Socratic_method" },
  { k: ["aporia"], t: "Aporia (çıkmaz)", o: "ἀπορία", d: "\"Yolsuzluk\", geçit bulamamak. Bir sorgulamanın, hiçbir tanımın ayakta kalmadığı bir şaşkınlıkla bitmesi.", u: "https://en.wikipedia.org/wiki/Aporia" },
  { k: ["baldıran"], t: "Baldıran (Conium maculatum)", d: "Zehirli bir bitki. Atina'da ölüm cezası baldırandan hazırlanan bir içecekle uygulanırdı.", u: "https://tr.wikipedia.org/wiki/Baldıran" },
  { k: ["sivil itaatsizlik"], t: "Sivil itaatsizlik", d: "Haksız bulunan bir yasaya açıkça ve şiddetsizce uymamak, ama bunun cezasını kabul etmek. Thoreau, Gandhi ve Martin Luther King ile anılır.", u: "https://tr.wikipedia.org/wiki/Sivil_itaatsizlik" },
  { k: ["erdem"], only: ["sokratik-sorgulama"], t: "Erdem (arete)", o: "ἀρετή", d: "Bir şeyin kendi işini iyi yapma yetkinliği; insan için iyi bir karakter. Cesaret, ölçülülük, adalet ve bilgelik başlıca erdemlerdir." }
);
/* Sokratik sorgulama diyalog ağacı js/data/diyaloglar.js dosyasında. */
TUTARLILIK.push(
  { kosul: [["protagoras", "goreli"], ["sokrates-olum", "kal"]], mesaj: "Protagoras slaytında doğrunun kişiye göre değiştiğini söylemiştiniz; şimdi kendi yargınızın önüne yasaya verilen sözü koyuyorsunuz. Protagoras da yasaların bir toplum uzlaşımı olarak uyulması gereken şeyler olduğunu savunurdu; gerilim var ama çelişki şart değil." },
  { kosul: [["protagoras", "goreli"], ["sokrates", "bilmedigini"]], mesaj: "Hem herkesin kendi ölçüsü olduğunu hem de bilgeliğin bilmediğini bilmek olduğunu söylediniz. Sokrates'in sorusu: herkes kendi ölçüsüyse, kimse yanılamaz; o zaman \"bilmediğini bilmek\" ne anlama gelir?" },
  { kosul: [["sokrates", "bilmedigini"], ["protagoras", "gercek"]], mesaj: "Tutarlı: hem suyun gerçek bir sıcaklığı olduğuna hem de bilgeliğin bilmediğini bilmek olduğuna inanıyorsunuz. Sokrates de doğrunun var olduğuna, ama ona ulaşmanın zor olduğuna inanırdı." },
  { kosul: [["sokrates-olum", "kac"], ["protagoras", "goreli"]], mesaj: "Tutarlı bir çizgi: yasaları insan uzlaşımı saydınız ve haksız bir karara uymak zorunda olmadığınızı söylediniz." }
);
Object.assign(YAKINLIK, {
  protagoras: { gercek: { platon: 2, demokritos: 2 }, goreli: { protagoras: 3 }, askiya: { pyrrhon: 3 } },
  sokrates: { cok: {}, bilmedigini: { sokrates: 3 }, pratik: { aristoteles: 2, konfucyus: 1 } },
  "sokrates-olum": { kac: { epikuros: 1 }, kal: { sokrates: 3 }, itaatsizlik: { rawls: 2, sokrates: 1 } },
});
