/* 11. Çağdaş felsefe: sözlük, tutarlılık ve yakınlık eklemeleri */
window.SOZLUK.push(
  { k: ["analitik felsefe"], t: "Analitik felsefe", d: "Sorunları dilin ve mantığın titiz çözümlemesiyle ele alan, özellikle İngilizce konuşulan dünyada güçlenen felsefe üslubu." },
  { k: ["kıta felsefesi"], t: "Kıta felsefesi", d: "Fenomenoloji, varoluşçuluk ve eleştirel kuram gibi, Fransa ve Almanya'da gelişen akımların genel adı." },
  { k: ["aile benzerliği"], t: "Aile benzerliği", o: "Familienähnlichkeit", d: "Wittgenstein: Bir kavramın örnekleri tek bir ortak özle değil, bir ailenin yüzleri gibi örtüşen benzerliklerle bağlanır." },
  { k: ["dil oyun"], t: "Dil oyunu", o: "Sprachspiel", d: "Wittgenstein'ın terimi: Dil, kurallarını yaşamın içinde öğrendiğimiz etkinliklerden oluşur; bir sözcüğün anlamı kullanımıdır." },
  { k: ["varoluş özden önce"], t: "Varoluş özden önce gelir", d: "Sartre'ın formülü: İnsanın önceden verilmiş bir özü yoktur; önce vardır, sonra seçimleriyle kendini tanımlar." },
  { k: ["kötülüğün sıradanlığı"], t: "Kötülüğün sıradanlığı", d: "Arendt'in Eichmann davası üzerine deyimi: Büyük kötülükler çoğu zaman canavarlar değil, düşünmeyi bırakan sıradan insanlar eliyle yapılır." },
  { k: ["yanlışlanabilir"], t: "Yanlışlanabilirlik", d: "Popper'ın ölçütü: Bilimsel bir kuram, hangi gözlemin onu çürüteceğini söyleyebilmelidir." },
  { k: ["paradigma"], t: "Paradigma", d: "Kuhn'da bir bilim topluluğunun ortak kuramları, yöntemleri ve örnek çözümleri. Değiştiğinde \"bilimsel devrim\" olur." },
  { k: ["doğrulama yanlılığı"], t: "Doğrulama yanlılığı", d: "İnanılan görüşü destekleyen kanıtları arama ve öne çıkarma eğilimi." },
  { k: ["biyoetik"], t: "Biyoetik", d: "Tıp ve biyolojideki ahlaki soruları inceleyen uygulamalı etik alanı: ötanazi, gen düzenleme, organ bağışı." },
  { k: ["çevre etiği"], t: "Çevre etiği", d: "Doğaya, hayvanlara ve gelecek kuşaklara karşı ahlaki yükümlülüklerimizi inceleyen alan." }
);
window.TUTARLILIK.push(
  { kosul: [["felsefe-bugun.havuz", "evet"], ["felsefe-bugun.uzak", "gonullu"]],
    mesaj: "Havuzdaki çocuğu kurtarmayı bir zorunluluk saydınız, ama uzaktaki çocuğa yardımı gönüllü buldunuz. Singer aradaki farkın yalnızca uzaklık olduğunu söylerdi. Size göre başka bir fark var mı?" },
  { kosul: [["felsefe-bugun.havuz", "evet"], ["felsefe-bugun.uzak", "yakin"]],
    mesaj: "Önünüzdeki çocuğu kurtarırsınız ama yakınlığın yükümlülüğü değiştirdiğini düşünüyorsunuz. Konfüçyüsçü ilişkiler etiği sizinle aynı fikirde; Singer ve Mozi değil." },
  { kosul: [["felsefe-bugun.havuz", "evet"], ["felsefe-bugun.uzak", "ayni"]],
    mesaj: "İki yanıtınız birbiriyle tutarlı: uzaklığı ahlaken önemsiz saydınız. Bu ilke tutarlı uygulanırsa günlük harcamalarımızın çoğunu sorgulatır." },
  { kosul: [["felsefe-bugun.uzak", "ayni"], ["felsefe-bugun.cevre", "az"]],
    mesaj: "Mekânda uzaklığı önemsiz saydınız, ama zamanda uzak olanların çıkarlarını daha az saydınız. Parfit bu ikisinin aynı biçimde değerlendirilmesi gerektiğini söylerdi." },
  { kosul: [["felsefe-bugun.yz", "davranis"], ["descartes.cogito", "kesin"]],
    mesaj: "Kendi düşündüğünüzden içeriden emin oldunuz; makine için ise dışarıdan bakan bir ölçüt seçtiniz. Diğer zihinler sorunu tam da bu asimetridir." }
);
Object.assign(window.YAKINLIK, {
  "analitik-kita.oyun": { var: { sokrates: 2, platon: 1 }, aile: { wittgenstein: 2 }, kullanim: { wittgenstein: 2 } },
  "bilim-felsefesi.strateji": { yanlislama: { popper: 2 }, dogrulama: { kuhn: 1 } },
  "felsefe-bugun.yz": { metin: { searle: 2 }, davranis: { turing: 2 }, temkin: { chalmers: 2 } },
  "felsefe-bugun.havuz": { evet: { singer: 1 }, hayir: {} },
  "felsefe-bugun.uzak": { ayni: { singer: 2, mozi: 1 }, yakin: { konfucyus: 2 }, gonullu: { aquinas: 1 } },
  "felsefe-bugun.cevre": { esit: { parfit: 2 }, az: {}, yok: {} },
});
