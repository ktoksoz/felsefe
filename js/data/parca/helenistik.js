/* 06-helenistik: sözlük, tutarlılık ve yakınlık eklemeleri */
SOZLUK.push(
  { k: ["kinik"], t: "Kinik okul (kinizm)", o: "κυνικός", d: "Antisthenes ve Diogenes'in yolu: toplumsal uzlaşımları reddedip doğaya uygun, yalın ve kendi kendine yeten bir hayat. Ad, \"köpek gibi\" anlamındaki kynikos'tan gelir.", u: "https://tr.wikipedia.org/w/index.php?search=Kinizm" },
  { k: ["autarkeia"], t: "Autarkeia", o: "αὐτάρκεια", d: "Kendi kendine yetme. Kinikler, Epikurosçular ve Stoacılar için mutluluğun dış şeylere bağlı olmaması." },
  { k: ["kosmopolites"], t: "Kosmopolites (dünya yurttaşı)", o: "κοσμοπολίτης", d: "Bir kente değil bütün insanlığa ait olma fikri. Diogenes'e atfedilen bu söz Stoacılarca bir öğretiye dönüştürüldü." },
  { only: ["diogenes"], k: ["nomos"], t: "Physis ve nomos", o: "φύσις / νόμος", d: "Doğa ile uzlaşım (yasa, gelenek) arasındaki ayrım. Sofistlerden kiniklere uzanan bir tartışmanın temelidir." },
  { k: ["ataraksia"], t: "Ataraksia", o: "ἀταραξία", d: "Ruhun çalkantısızlığı, kaygısızlık. Epikurosçuların ve septiklerin hedeflediği huzur." },
  { k: ["tetrapharmakos"], t: "Tetrapharmakos (dörtlü ilaç)", o: "τετραφάρμακος", d: "Epikurosçu öğretinin dört maddelik özeti: Tanrıdan korkulmaz, ölüm kaygı vermez, iyi olan kolay elde edilir, kötü olana kolay katlanılır." },
  { k: ["stoa"], t: "Stoa (Stoacılık)", o: "στοά", d: "Kıbrıslı Zenon'un MÖ 300 civarında Atina'da kurduğu okul; adını ders verilen resimli sütunlu galeriden (Stoa Poikile) alır. Erdemi tek iyi sayar.", u: "https://tr.wikipedia.org/w/index.php?search=Stoacılık" },
  { k: ["apatheia"], t: "Apatheia", o: "ἀπάθεια", d: "Stoacılıkta yanlış yargılardan doğan aşırı tutkulardan kurtulmuşluk. Duygusuzluk değil, sükûnettir." },
  { only: ["stoacilar"], k: ["proegmena"], t: "Proegmena (tercih edilir kayıtsızlar)", o: "προηγμένα", d: "Stoacılara göre sağlık, varlık gibi dış şeyler iyi değildir ama doğaya uygun oldukları için tercih edilir." },
  { k: ["septisizm", "kuşkuculuk"], t: "Septisizm (kuşkuculuk)", o: "σκέψις", d: "Kesin bilgiye ulaşılabileceğinden kuşku duyan felsefi tutum. Pyrrhon ve Sextus Empiricus antik biçiminin temsilcileridir.", u: "https://tr.wikipedia.org/w/index.php?search=Kuşkuculuk" },
  { k: ["epokhe"], t: "Epokhe", o: "ἐποχή", d: "Yargıyı askıya alma. Septiklere göre her görüşün karşısına eşit güçte bir görüş konabildiği için en uygun tutum." },
  { k: ["yeni platonculuk"], t: "Yeni Platonculuk", d: "Plotinos'la başlayan, her şeyin Bir'den taştığını savunan Platon yorumu. İslam, Hristiyan ve Yahudi düşüncesini derinden etkiledi.", u: "https://tr.wikipedia.org/w/index.php?search=Yeni Platonculuk" },
  { only: ["plotinos"], k: ["bir'"], t: "Bir (to hen)", o: "τὸ ἕν", d: "Plotinos'ta her şeyin kaynağı olan, parçası ve niteliği olmayan ilk ilke." },
  { k: ["sudur", "emanasyon"], t: "Sudur (emanasyon)", o: "صدور", d: "Varlıkların ilk ilkeden, ışığın güneşten taşması gibi kademe kademe çıkması. Plotinos'tan Fârâbî ve İbn Sînâ'ya uzanır.", u: "https://tr.wikipedia.org/w/index.php?search=Sudur" }
);
TUTARLILIK.push(
  { kosul: [["septikler.duyu", "epokhe"], ["stoacilar.huzur", "evet"]],
    mesaj: "Hem yargıyı askıya almayı hem Stoacı ayrımı benimsediniz. Antik dünyada bu iki okul birbirinin en sert rakibiydi: Stoacılar bazı izlenimlerin kesin bilgi verdiğini (katalepsis) savunur, septikler bunu reddeder." },
  { kosul: [["diogenes.kural", "gereksiz"], ["epikuros.secim", ["sohret", "zenginlik"]]],
    mesaj: "Toplumsal uzlaşımları gereksiz bir yük saydınız, ama haz hesabında şöhret ya da servet seçtiniz. Şöhret ve servet tam da uzlaşımın verdiği ödüllerdir; Diogenes buna gülerdi." },
  { kosul: [["epikuros.secim", ["sade", "bahce"]], ["stoacilar.huzur", "evet"]],
    mesaj: "Hem Epikuros'un sade hazlarını hem Epiktetos'un kontrol ikiliğini seçtiniz. İki rakip okul burada buluşuyor: Seneka da mektuplarında Epikuros'tan sık sık alıntı yapardı." },
  { kosul: [["septikler.duyu", "guven"], ["epikuros.secim", ["sade", "bahce"]]],
    mesaj: "Duyulara güveniyor ve Epikuros'un yolunu seçiyorsunuz: tutarlı. Epikuros'a göre bütün algılar doğrudur, yanılgı yalnızca onlara eklediğimiz sanıdadır." }
);
Object.assign(YAKINLIK, {
  "diogenes.kural": { gereksiz: { diogenes: 2, antisthenes: 1 }, gerekli: { konfucyus: 2, aristoteles: 1 }, sorgula: { sokrates: 2 } },
  "epikuros.secim": { sade: { epikuros: 2 }, bahce: { epikuros: 2 }, perhiz: { diogenes: 1 } },
  "stoacilar.huzur": { evet: { epiktetos: 2, marcus_aurelius: 1, zenon_kition: 1 }, kismen: { seneka: 2 }, hayir: { aristoteles: 1 } },
  "septikler.duyu": { guven: { epikuros: 1, aristoteles: 1 }, akil: { platon: 2 }, epokhe: { pyrrhon: 2 } },
  "plotinos.kotuluk": { yokluk: { plotinos: 2, augustinus: 1 }, irade: { augustinus: 2 } },
});
