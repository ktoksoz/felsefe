/* Büyük soru 2 (Mantık ve akıl yürütme): sözlük, tutarlılık ve yakınlık eklemeleri */
SOZLUK.push(
  { k: ["geçerli", "geçerlilik"], only: ["s-dogruluk", "kiyas"], t: "Geçerlilik", d: "Bir çıkarımın, öncülleri doğruyken sonucunun yanlış olmasının imkânsız olması. Öncüllerin gerçekten doğru olup olmadığından bağımsızdır.", u: "https://tr.wikipedia.org/w/index.php?search=Geçerlilik (mantık)" },
  { k: ["doğruluk tablosu"], t: "Doğruluk tablosu", d: "Bir bileşik önermenin, bileşenlerinin bütün doğru/yanlış kombinasyonlarında hangi değeri aldığını gösteren tablo.", u: "https://tr.wikipedia.org/w/index.php?search=Doğruluk tablosu" },
  { k: ["karşı örnek"], only: ["s-dogruluk"], t: "Karşı örnek", d: "Öncüllerin hepsinin doğru, sonucun yanlış olduğu durum. Tek bir karşı örnek, bir çıkarım biçiminin geçersiz olduğunu gösterir." },
  { k: ["maddi gerektirme"], t: "Maddi gerektirme", d: "Mantıktaki \"p ise q\" bağlacı: yalnızca p doğru, q yanlışken yanlıştır. Gündelik dildeki \"ise\"den daha geniştir.", u: "https://en.wikipedia.org/wiki/Material_conditional" },
  { k: ["safsata"], t: "Safsata", d: "Sonucunu gerçekte desteklemediği hâlde destekliyormuş gibi görünen akıl yürütme. Yunanca sophisma, Arapça safsata (Yunancadan).", u: "https://tr.wikipedia.org/w/index.php?search=Safsata" },
  { k: ["hetvābhāsa", "hetvabhasa"], t: "Hetvābhāsa (sahte gerekçe)", o: "हेत्वाभास", d: "Nyaya mantığında, gerekçe gibi görünen ama sonucu kanıtlamayan kusurlu gerekçe. Nyaya Sutraları beş türünü sayar.", u: "https://en.wikipedia.org/wiki/Hetvabhasa" },
  { k: ["sofistik çürütmeler"], t: "Sofistik Çürütmeler", d: "Aristoteles'in safsataları inceleyen eseri; Organon'un son kitabı. Dilden kaynaklanan ve dil dışı safsataları ayırır.", u: "https://en.wikipedia.org/wiki/Sophistical_Refutations" }
);
TUTARLILIK.push(
  { kosul: [["s-dogruluk.mp", "gecerli"], ["s-dogruluk.so", "gecerli"]],
    mesaj: "Az önce \"Yağmur yağıyor, o hâlde yer ıslak\" çıkarımını geçerli buldunuz; şimdi \"Yer ıslak, o hâlde yağmur yağdı\" çıkarımını da geçerli buluyorsunuz. İkisi aynı öncülü farklı yönlerde kullanıyor. İkincisinde yeri ıslatan başka bir şey (hortum, çeşme) olabilir mi?" },
  { kosul: [["s-dogruluk.mt", "gecerli"], ["s-dogruluk.or", "gecerli"]],
    mesaj: "\"Yer ıslak değil, o hâlde yağmur yağmıyor\" çıkarımını geçerli buldunuz; \"Yağmur yağmıyor, o hâlde yer ıslak değil\" çıkarımını da. İlki koşulun sonucunu, ikincisi öncülünü reddediyor. Yağmur yağmadığı hâlde yerin ıslak olabileceği bir durum düşünebilir misiniz?" },
  { kosul: [["s-dogruluk.mp", "gecersiz"], ["s-dogruluk.mt", "gecerli"]],
    mesaj: "Modus tollens'i geçerli, modus ponens'i geçersiz buldunuz. Doğruluk tablosunda ikisi de aynı koşul önermesine dayanıyor. Sizi modus ponens'te kuşkuya düşüren, belki de \"yağmur yağarsa yer ıslanır\" öncülünün kendisi mi?" }
);
Object.assign(YAKINLIK, {
  "s-dogruluk.mp": { gecerli: { aristoteles: 1, frege: 1 }, gecersiz: { hume: 1 } },
  "s-dogruluk.mt": { gecerli: { popper: 1, aristoteles: 1 }, gecersiz: {} },
  "s-dogruluk.so": { gecerli: {}, gecersiz: { aristoteles: 1, nyaya: 1, frege: 1 } },
  "s-dogruluk.or": { gecerli: {}, gecersiz: { aristoteles: 1, frege: 1 } },
});
