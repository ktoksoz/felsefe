/* Büyük soru 5 (adil toplum): sözlük, tutarlılık, yakınlık */
SOZLUK.push(
  { k: ["cehalet peçesi"], t: "Cehalet peçesi", d: "Rawls'un düşünce deneyi: toplumun kurallarını, o toplumdaki yerimizi (servetimizi, yeteneğimizi, inancımızı) bilmeden seçtiğimizi varsaymak.", u: "https://tr.wikipedia.org/w/index.php?search=Cehalet+pe%C3%A7esi" },
  { k: ["fark ilkesi"], t: "Fark ilkesi", d: "Rawls'un ikinci adalet ilkesinin bir parçası: ekonomik eşitsizliklere ancak en dezavantajlıların durumunu iyileştiriyorlarsa izin verilir.", u: "https://en.wikipedia.org/wiki/Difference_principle" },
  { k: ["maximin"], t: "Maximin", d: "Karar kuramında, olası en kötü sonucu en iyi hâle getiren seçeneği seçme kuralı.", u: "https://en.wikipedia.org/wiki/Minimax" },
  { k: ["toplum sözleşmesi"], t: "Toplum sözleşmesi", d: "Devletin meşruiyetini, bireylerin (gerçek ya da varsayımsal) karşılıklı anlaşmasına dayandıran kuram. Hobbes, Locke, Rousseau, Kant ve Rawls.", u: "https://tr.wikipedia.org/w/index.php?search=Toplum+s%C3%B6zle%C5%9Fmesi" },
  { k: ["doğa durumu"], t: "Doğa durumu", d: "Devletten ve yasalardan önceki (ya da onların yokluğundaki) varsayımsal insan durumu. Sözleşme kuramlarının başlangıç noktası.", u: "https://tr.wikipedia.org/w/index.php?search=Do%C4%9Fa+durumu" },
  { k: ["leviathan"], t: "Leviathan", d: "Hobbes'un 1651'de yayımladığı kitap ve devleti benzettiği Tevrat'taki deniz canavarı: barışı sağlayan mutlak egemen güç.", u: "https://tr.wikipedia.org/w/index.php?search=Leviathan+Hobbes" },
);
TUTARLILIK.push(
  { kosul: [["s-pece.dagilim", "faydaci"], ["s-doga-durumu.guc", "az"]], mesaj: "Peçenin ardında toplam refahı en yükseğe çıkaran düzeni seçtiniz, ama devletin gücünü düşük tuttunuz. Toplamı büyütmek ile bölüşümü düzenlemek çoğu zaman güçlü kurumlar ister; bu iki tercih nasıl birleşir?" },
  { kosul: [["s-pece.dagilim", "esit"], ["s-doga-durumu.guc", "az"]], mesaj: "Tam eşitlik ve çok küçük bir devlet: eşitliği kim, hangi araçla koruyacak? Bu gerilimi anarşist düşünürler de tartıştı." },
  { kosul: [["s-doga-durumu.dogal", "savas"], ["s-doga-durumu.guc", "az"]], mesaj: "Doğa durumunu Hobbes gibi herkesin herkese savaşı olarak görüyorsunuz, ama devlete az güç veriyorsunuz. Hobbes buna şaşırırdı: ona göre savaşın tek ilacı güçlü bir egemendi." },
  { kosul: [["s-doga-durumu.dogal", "baris"], ["s-doga-durumu.guc", "cok"]], mesaj: "İnsanların doğası gereği barışçıl olduğunu söylediniz, ama devlete çok güç verdiniz. Rousseau'ya göre sorun insanlar değil, kurumlardı." },
);
Object.assign(YAKINLIK, {
  "s-pece.dagilim": { esit: { rousseau: 1 }, fark: { rawls: 2, kant: 1 }, faydaci: { bentham: 2, mill: 1 }, taban: { rousseau: 1, mill: 1 } },
  "s-doga-durumu.dogal": { savas: { hobbes: 2, xunzi: 1 }, haklar: { locke: 2 }, baris: { rousseau: 2, mengzi: 1 } },
  "s-doga-durumu.guc": { az: { locke: 1 }, orta: { locke: 1, rawls: 1 }, cok: { hobbes: 2 } },
});
