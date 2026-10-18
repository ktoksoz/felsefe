# Bilgelik Sevgisi: Felsefe Yolculuğu

**Canlı site:** https://egitim.koraytoksoz.com/felsefe/ (eski adres https://felsefe.koraytoksoz.com buraya yönlendirilir; bütün eğitimler: https://egitim.koraytoksoz.com)

Milet'ten bugüne felsefe tarihi ve felsefenin büyük soruları: haritalar, zaman çizelgeleri ve oynanabilir düşünce deneyleriyle, sesli anlatımlı etkileşimli bir sunum.
Hazırlayan: **Koray Toksöz**

*An interactive Turkish presentation on the history of philosophy and its big questions, with maps, timelines and playable thought experiments. Code: MIT · Content: CC BY 4.0*

## İçerik

Site iki yoldan oluşur ve 68 slayttır. **Zaman yolculuğu** kronolojiktir ve ağırlığı antik çağdadır. **Büyük sorular** bölümünde ziyaretçi önce karar verir, sonra kararının dayandığı ilkeyi, aynı fikirdeki filozofu ve karşı argümanı görür. İki yol birbirine bağlıdır. Bir filozoftan ilgili soruya sapılabilir; alt çubuktaki dönüş düğmesi ya da <kbd>B</kbd> tuşu kaldığınız yere geri götürür.

| Bölüm | Konu | Slaytlar ve deneyler |
|---|---|---|
| — | Giriş | Bilgelik sevgisi (canlı zaman frizi) · Felsefe nedir? (dallar ağacı) · İki yol |
| 1 | Mitostan logosa: İyonya | Neden İyonya? (Ege haritası) · Arkhe makinesi · Herakleitos'un nehri · Pythagoras'ın monokordu · Ksenofanes'in vazoları |
| 2 | Varlık ve değişim | Parmenides · Zenon: Aşil ve kaplumbağa · Zenon: uçan ok · Dört öğe, sevgi ve nefret · Atomcular: kesme deneyi |
| 3 | Sofistler ve Sokrates | Protagoras: üç kova · Sokrates: Delfi kâhini · Cesaret nedir? (Sokratik diyalog) · Sokrates'in ölümü |
| 4 | Platon | Mağara · İdealar ve mükemmel daire · Ruhun üç parçası |
| 5 | Aristoteles | Akademia'dan Lykeion'a (yolculuk haritası) · Kıyas makinesi · Dört neden · Altın orta |
| 6 | Helenistik ve Roma | Sinoplu Diogenes · Epikuros: haz hesabı · Stoacılar: kontrol ikiliği · Septikler: yanılsamalar · Plotinos: Bir'den taşma |
| 7 | Doğu'nun antik bilgeliği | Eksen Çağı · Upanişadlar: tuz ve su · Buda: araba nerede? · Konfüçyüs: ren ve li · Laozi: su ve taş · Zhuangzi: kelebek rüyası · Hint mantığı |
| 8 | İslam felsefesi | Çeviri hareketi ve Beytü'l-Hikme (etki ağı) · Fârâbî: erdemli şehir · İbn Sina: uçan adam · Gazali ve İbn Rüşd: ateş mi yakar? · İbn Tufeyl, Sühreverdi, İbn Arabi · İbn Haldun: asabiyye simülasyonu |
| 9 | Orta Çağ Avrupası | Augustinus ve Aquinas · Ockham'ın usturası |
| 10 | Modern felsefe | Descartes: kuşku yöntemi · Akıl mı, deneyim mi? (terazi) · Kant: renkli gözlük · Hegel ve Marx · Kierkegaard ve Nietzsche |
| 11 | Çağdaş felsefe | Dil oyunları ve varoluş · Bilim felsefesi: 2-4-6 görevi · Felsefe bugün |
| Soru 1 | Neyi bilebilirim? | Dört kuşku · Gettier vakaları |
| Soru 2 | Mantık ve akıl yürütme | Doğruluk tabloları · Safsata avı |
| Soru 3 | Ben kimim? | Theseus'un gemisi · Anılar, bedenler, kopyalar |
| Soru 4 | Doğru olan ne? | Tramvay problemi (tutarlılık sayacı) · Faydacılık hesabı ve Kant'ın testi |
| Soru 5 | Adil toplum | Cehalet peçesi · Doğa durumu |
| Soru 6 | Oyun ve işbirliği | Mahkûmun ikilemi turnuvası · Ortak mallar trajedisi |
| Soru 7 | Zihin ve makine | Turing testi ve Çince oda · Mary'nin odası ve felsefi zombiler |
| Soru 8 | Anlam | Hayatın anlamı |
| — | Kapanış | Size yakın düşünürler (cevaplara göre, cihazda hesaplanır) |

Düşünce deneylerindeki cevaplar yalnızca tarayıcıda (localStorage) saklanır, hiçbir yere gönderilmez. Kapanış slaytındaki "Cevaplarımı sil" düğmesi hepsini temizler.

## Çalıştırma

Derleme adımı yoktur. `index.html` dosyasını tarayıcıda açmak yeterlidir (`file://` ile de çalışır; fontlar Google Fonts'tan yüklenir).

Geliştirirken önbelleksiz yerel sunucu:

```
python3 tools/serve.py 8790
```

Sonra http://localhost:8790 adresini açın.

## Kısayollar

| Tuş | İşlev |
|---|---|
| <kbd>→</kbd> / <kbd>Boşluk</kbd> | Sonraki slayt |
| <kbd>←</kbd> | Önceki slayt |
| <kbd>B</kbd> | Yollar arası sapmadan sonra kaldığınız yere dön |
| <kbd>A</kbd> | Sesli anlatımı aç/kapat (<kbd>P</kbd> duraklat) |
| <kbd>G</kbd> | Deney gösterimlerini (hayalet el) aç/kapat |
| <kbd>N</kbd> | Sunucu notları |
| <kbd>T</kbd> | Açıklama metnini gizle (sunum modu) |
| <kbd>O</kbd> | Tüm slaytlar |
| <kbd>F</kbd> | Tam ekran |

## Yapı

```
index.html              sayfa iskeleti (slaytlar js/content/ içinden eklenir)
css/style.css           görsel sistem: "friz ve lacivert taş"
css/bilesen.css         ortak bileşen stilleri
css/d/*.css             bölüm deneylerinin stilleri
js/lib.js               tuval, animasyon döngüsü, h() DOM yardımcısı, kaydırıcı, segment, sürükle-bırak, depo
js/strings.js           arayüz metinleri (çeviri için tek dosya)
js/app.js               slayt motoru: iki yol, friz ilerleme çubuğu, geri dönüş yığını, notlar, genel bakış
js/narrator.js          sesli anlatım (audio/<slayt-id>.mp3)
js/guide.js             hayalet el ve "Göster" düğmeleri
js/glossary.js          sözlük ve filozof balonları
js/bilesen/             ortak bileşenler: zaman çizelgesi, harita, etki ağı, diyalog, oylama ve tutarlılık, madalyonlar
js/mantik/              hesaplama mantığı (tarayıcıda ve Node'da çalışır): oyun teorisi, İbn Haldun modeli
js/content/NN-*.js      slayt içerikleri (metin, sunucu notları, hayalet el senaryoları)
js/demos/*.js           bölüm deneyleri
js/data/filozoflar.js   tek veri kaynağı: filozoflar, gelenekler, yerler, büyük sorular
js/data/harita*.js      kıyı çizgileri (Natural Earth)
js/data/sozluk.js, diyaloglar.js, tutarlilik.js, parca/*.js   sözlük, diyalog ağaçları, tutarlılık ve yakınlık kuralları
audio/                  anlatım sesleri
img/                    Creative Commons simgeleri
test/                   Node testleri
tools/                  yerel sunucu, yayın, harita üretimi, ekran görüntüsü ve denetim araçları, anlatım metinleri
```

## Testler ve denetim

```
node test/veri.test.js      # filozof kayıtları: zorunlu alanlar, tarihler, etki bağları, koordinatlar
node test/icerik.test.js    # diyalog ağaçları, tutarlılık ve yakınlık tabloları, sözlük
node test/oyun.test.js      # mahkûmun ikilemi ve ortak mallar hesapları
node test/haldun.test.js    # İbn Haldun modeli
```

Tarayıcı denetimleri `playwright-core` ister (`NODE_PATH` ile gösterilir):

```
node tools/ekran.js 8790 ekran 1440x860,1180x820,390x844   # bütün slaytların ekran görüntüsü + konsol hataları
node tools/rehber_kontrol.js 8790                           # hayalet el hedeflerinin varlığı
```

## Yeniden üretme

- **Harita:** Natural Earth GeoJSON dosyalarını (ne_50m_land, ne_50m_lakes, ne_50m_rivers_lake_centerlines, ne_10m_land) bir klasöre indirip o klasörde `node tools/harita_uret.js <proje>/js/data/harita.js` çalıştırın.
- **Anlatım sesleri:** Metinler `tools/narration.json` dosyasında. ElevenLabs, "İrem - Velvet Acoustics & Fairytale Storyteller" sesi (voice id `hy7OAv1nH3Eqqj96Aude`), model `eleven_multilingual_v2`, dil `tr`; her slayt için `audio/<slayt-id>.mp3`. Yabancı adlar metinde Türkçe okunuşlarıyla yazılmıştır (Dekart, Niçe, Lao Zı…).

## Yayınlama

```
tools/deploy.sh koray@koraytoksoz.com
```

Betik CSS/JS bağlantılarındaki `?v=` sürüm etiketini yeniler ve rsync ile yalnızca değişen dosyaları `~/egitim.koraytoksoz.com/felsefe/` klasörüne gönderir. `tools/`, `test/` ve README gibi geliştirme dosyalarını göndermez, sunucudaki dosyaları silmez.

## Kaynaklar ve ileri okuma

Sitedeki tarih, yer ve atıflar aşağıdaki kaynaklarla karşılaştırılmıştır; her alıntının eseri ve yeri ilgili slaytın sunucu notlarındadır. Antik dönem tarihlerinin çoğu yaklaşıktır ("y.") ve tartışmalı olanlar not edilmiştir.

**Başvuru kaynakları**
- *Stanford Encyclopedia of Philosophy*: https://plato.stanford.edu
- *Internet Encyclopedia of Philosophy*: https://iep.utm.edu
- *Encyclopaedia Britannica*: https://www.britannica.com
- Vikipedi (Türkçe ve İngilizce): her sözlük ve filozof balonunda ilgili maddeye bağlantı vardır.

**Birincil metinler (kamu malı; alıntılar yazar tarafından çevrilmiştir)**
- H. Diels ve W. Kranz, *Die Fragmente der Vorsokratiker* (DK numaraları)
- Platon (Stephanus numaraları), Aristoteles (Bekker numaraları)
- Diogenes Laertios, *Ünlü Filozofların Yaşamları ve Öğretileri*
- Epiktetos, *Encheiridion*; Seneca, *Lucilius'a Mektuplar*; Marcus Aurelius, *Kendime Düşünceler*
- Konfüçyüs, *Analektler*; *Tao Te Ching*; *Zhuangzi*; *Chandogya Upanişad*; *Milinda'nın Soruları*
- Fârâbî, *el-Medinetü'l-Fazıla*; İbn Sina, *Kitabü'ş-Şifa*; Gazali, *Tehâfütü'l-Felâsife*; İbn Rüşd, *Tehâfütü't-Tehâfüt*; İbn Tufeyl, *Hay bin Yakzan*; İbn Haldun, *Mukaddime*

**İleri okuma için öneriler**
- G. S. Kirk, J. E. Raven, M. Schofield, *The Presocratic Philosophers*, 2. baskı, Cambridge University Press, 1983.
- Peter Adamson, *A History of Philosophy Without Any Gaps* (podcast ve Oxford University Press'ten çıkan kitap dizisi): https://historyofphilosophy.net
- Macit Gökberk, *Felsefe Tarihi*, Remzi Kitabevi.
- Diogenes Laertios, *Ünlü Filozofların Yaşamları ve Öğretileri*, Türkçe çeviri: Candan Şentuna, Yapı Kredi Yayınları.
- Bryan Van Norden, *Introduction to Classical Chinese Philosophy*, Hackett, 2011.
- Robert Axelrod, *The Evolution of Cooperation*, Basic Books, 1984.

## Lisans

| Ne | Lisans |
|---|---|
| Kaynak kod (`js/`, `css/`, `tools/`, `test/`, `index.html`) | MIT |
| İçerik (slayt metinleri, notlar, sözlük, filozof kayıtları, anlatım metinleri ve sesleri) | CC BY 4.0 |
| Harita verisi | Natural Earth, kamu malı |
| Fontlar | SIL Open Font License 1.1 (Google Fonts) |

Ayrıntılar ve üçüncü taraf bileşenler: [LICENSE](LICENSE). GitHub bu dosyayı "Other" olarak gösterir; çift lisans tek bir standart lisansa uymadığı için bu normaldir.

Önerilen atıf:

> Koray Toksöz, *Bilgelik Sevgisi: Felsefe Yolculuğu*, https://egitim.koraytoksoz.com/felsefe/ (CC BY 4.0)
