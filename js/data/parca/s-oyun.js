/* Büyük soru 6 (oyun ve işbirliği): sözlük, tutarlılık, yakınlık */
SOZLUK.push(
  { k: ["mahkûmun ikilemi", "mahkumun ikilemi"], t: "Mahkûmun ikilemi", d: "İki oyuncunun da kendi çıkarına en uygun hamleyi (ihaneti) seçtiğinde, ikisinin de işbirliği yapmış olsalar alacağından daha kötü sonuca vardığı oyun.", u: "https://tr.wikipedia.org/w/index.php?search=Mahk%C3%BBm+ikilemi" },
  { k: ["kısasa kısas"], t: "Kısasa kısas (tit for tat)", d: "Tekrarlı oyunlarda ilk turda işbirliği yapıp sonra rakibin bir önceki hamlesini tekrarlayan strateji. Axelrod'un turnuvalarının kazananı.", u: "https://en.wikipedia.org/wiki/Tit_for_tat" },
  { k: ["baskın strateji"], t: "Baskın strateji", d: "Rakip ne yaparsa yapsın, oyuncuya her zaman daha iyi (ya da en az aynı) sonucu getiren hamle.", u: "https://en.wikipedia.org/wiki/Strategic_dominance" },
  { k: ["ortak mallar trajedisi"], t: "Ortak mallar trajedisi", d: "Herkesin kullanımına açık bir kaynağın, kullanıcıların her biri kendi çıkarını gözettiği için aşırı kullanılıp tükenmesi. Hardin, 1968.", u: "https://tr.wikipedia.org/w/index.php?search=Ortak+mal+trajedisi" },
);
TUTARLILIK.push(
  { kosul: [["s-mahkum.tek", "ihanet"], ["s-pece.dagilim", "fark"]], mesaj: "Peçenin ardında en kötü durumdakini korudunuz, ama tek seferlik oyunda ihaneti seçtiniz. Birinde riskten kaçınıyor, ötekinde karşınızdakini en kötü sonuca bırakıyorsunuz; fark nereden geliyor?" },
  { kosul: [["s-mahkum.tek", "isbirligi"], ["s-mahkum.strateji", "DDD"]], mesaj: "Tek seferlik oyunda işbirliği yapacağınızı söylediniz, ama turnuva için her durumda ihanet eden bir strateji kurdunuz. Tekrarlanan oyunda neden daha az güveniyorsunuz?" },
  { kosul: [["s-mahkum.tek", "ihanet"], ["s-ortak-mallar.cozum", "topluluk"]], mesaj: "Tek seferlik oyunda ihaneti seçtiniz, ama ortak kaynakları en iyi topluluğun koruyacağını düşünüyorsunuz. Ostrom'un toplulukları tam da tekrarlanan karşılaşmalar ve güvenle işler; tek seferlik ilişkilerde aynı güven kurulabilir mi?" },
  { kosul: [["s-doga-durumu.dogal", "savas"], ["s-ortak-mallar.cozum", "topluluk"]], mesaj: "Devletsiz insanları Hobbes gibi gördünüz, ama ortak kaynakları dışarıdan bir güç olmadan topluluğun koruyabileceğini söylüyorsunuz. Ostrom, Hobbes'a karşı tam bu noktada çıktı." },
);
Object.assign(YAKINLIK, {
  "s-mahkum.tek": { isbirligi: { kant: 1, konfucyus: 1, mozi: 1 }, ihanet: { hobbes: 1 } },
  "s-mahkum.strateji": { CCD: { axelrod: 2 }, CCC: { mozi: 1 }, DDD: { hobbes: 1 } },
  "s-ortak-mallar.cozum": { devlet: { hobbes: 1, hardin: 1 }, mulk: { locke: 1, hardin: 1 }, topluluk: { ostrom: 2, aristoteles: 1 } },
});
