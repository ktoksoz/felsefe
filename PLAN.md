# Felsefe sitesi: plan (onay için)

Ağırlık: **A** = ağır (özel motor/simülasyon, uzun iş), **O** = orta, **H** = hafif.
`→` yollar arası bağlantı. Kimlikler `#slayt-id` olarak kullanılacak.

## 1. Tasarım planı

### Ana fikir: "Friz ve lacivert taş"
Bütün geleneklerin ortak paydası iki şey:
- **Friz (yatay bant):** Yunan vazoları bantlar hâlinde boyanır. Çin el tomarları yatay açılır ve zamanla okunur. Hint el yazmalarında resimler çerçeveli bantlarda durur. İslam çinilerinde yazı kuşakları vardır. Sitedeki her şey bu bant mantığıyla kurulacak: zaman çizelgesi, gelenek şeritleri, ilerleme çubuğu ve kapak.
- **Lacivert taş (lapis lazuli):** Bedahşan'dan çıkan aynı taş Mısır'a, Hindistan'a, Çin'e, İslam çinilerine ve Avrupa el yazmalarının "ultramarin" mavisine gitti. Gece gökyüzü ile usturlap pirinci bu zeminde buluşur.

Çizgiler **kazınmış pirinç / usturlap** gibi ince ve hassas olacak. Dolgu yerine çizgi, doku yerine boşluk (sumi-e'den) kullanılacak. Fotoğraf, parşömen dokusu ve büst olmayacak.

### Renk (zemin)
| Ad | Hex | Görev |
|---|---|---|
| Lacivert taş (gece) | `#14213D` | ana zemin |
| Derin lacivert | `#0E1830` | sahne, panel içi |
| Mermer | `#EDE7DC` | metin |
| Kül | `#A9B0C2` | ikincil metin |
| Pirinç | `#C9A55C` | çizgi, vurgu, odak halkası (usturlap) |
| İnce çizgi | `#2C3B5E` | ayırıcılar, ızgara |

### Sabit gelenek renkleri (pigment mantığı)
| Gelenek | Pigment | Hex |
|---|---|---|
| Yunan / Helenistik | Attika kili (kırmızı figür) | `#E08A4F` |
| Hint | zerdeçal / safran | `#E9BE3B` |
| Çin | zinober mühür kırmızısı | `#E0524A` |
| İslam | firuze (çini) | `#3FC1B0` |
| Orta Çağ Avrupa | el yazması moru | `#A48BE6` |
| Modern Avrupa | gök mavisi | `#79AEEA` |
| Çağdaş | bakır pası yeşili | `#9CCB72` |

**Argümanlar:** Lehte argümanlar `#F3E3B3` renginde (kandil ışığı, dolu ● işaretiyle), aleyhte argümanlar `#8C9BC4` renginde (gece, boş ○ işaretiyle). Ayrım yalnızca renge dayanmaz; renk körleri için işaret biçimi de farklı.

### Tipografi (Google Fonts, Türkçe tam)
- **Başlıklar: Marcellus.** Roma yazıtlarından esinlenmiş, uçları hafif çatallı, ama küçük harfi de olan bir yazı. Büyük başlıklarda geniş harf aralığıyla bir "yazıt" gibi durur.
- **Metin: Alegreya.** Edebî, kaligrafik bir serif; politonik Yunanca desteği var (λόγος, ἀρχή doğru görünür).
- **Arayüz ve etiketler: Alegreya Sans.** Aynı aileden; tarihler için tablo rakamları.
- **Süs yazıları:**
  - Arapça: Amiri (عقل)
  - Çince: Noto Serif SC, yalnızca gereken karakterlerle (`&text=` alt kümesi, birkaç KB): 道 仁 禮 無為
  - Devanagari: Tiro Devanagari Sanskrit (आत्मन्)
  - Kurulumda hepsinin doğru göründüğü ekran görüntüsüyle kontrol edilecek.

### Düzen
```
┌───────────────────────────────────────────────────────────────┐
│ METİN SÜTUNU (≤ 62 karakter)  │  SAHNE (deney)                  │
│ gelenek rengi şerit + bölüm    │  ince pirinç çerçeve, köşelerde │
│ Başlık (Marcellus)             │  usturlap ölçek çentikleri       │
│ Soru / sezgi (lead)            │                                 │
│ Açıklama                       │                                 │
│ ▸ Daha fazla (katlanır)        │                                 │
│ Dene: …  [Göster]              │                                 │
│ Kim ne dedi? (renkli adlar)    │                                 │
├───────────────────────────────────────────────────────────────┤
│ ═══ Zaman yolculuğu frizi ═══════════ ║ ═══ Büyük sorular ═══   │  ← ilerleme çubuğu: iki ayrı friz
│ ‹  bölüm adı      ↩ Platon'a dön     12/68   N T A G O F  ›    │
└───────────────────────────────────────────────────────────────┘
```
- Metin sola hizalı. Kapak ve kapanış ortalı.
- Telefonda tek sütun: önce metin, sonra deney. Yön bildiren ifade kullanılmayacak ("deneyde", "haritada" denecek).

### İlkeler
1. **Cesaret tek yerde: zaman frizi.** Kapak, ilerleme çubuğu ve zaman çizelgesi aynı nesne. Geri kalan her şey sakin ve disiplinli.
2. **Renk bilgi taşır.** Gelenek renkleri yalnızca gelenek anlamına gelir. Pirinç yalnızca etkileşim ve odak anlamına gelir.
3. **Çizgi, dolgu değil.** Filozoflar fotoğraf ya da sahte portreyle değil, gelenek renginde ince çizgili monogram madalyonlarla gösterilir: "ΣΩ" Sokrates, "ابن سينا" İbn Sina, "孔" Konfüçyüs.
4. **Boşluk kullanılır.** Sahnelerde bir ana nesne olur; sumi-e gibi bol boş alan bırakılır.
5. **Hareket yalnızca kullanıcı eylemine cevap verir.** Tek istisna kapaktaki yavaş beliren etki çizgileri.

### Plan, brief'e karşı gözden geçirildi
- **İlk aklıma gelen:** krem zemin, Cormorant, terrakota. Bu yasak klişenin ta kendisi; çıkardım.
- **İkinci seçenek:** siyah zemin, tek altın renk. Bu da "siyah + tek neon" klişesine yakın. Yerine renk tonu taşıyan lacivert taş zemin koydum. Yanına geleneğe bağlı yedi pigment ekledim; pirinç yalnızca işlev rengi.
- **Kartlar:** "Her şey aynı kart" görünümünden kaçınmak için kart yok. Bantlar, çizgiler ve madalyonlar var.

## 2. Paylaşılan bileşenler (altyapı)
| Bileşen | Ağırlık | Not |
|---|---|---|
| Slayt motoru (iki yol + "geri dön" yığını) | O | app.js uyarlaması. Yollar arası bağlantı `data-from` ile geçmişe yazılır. Alt çubukta "↩ Kaldığınız yere dönün: Platon" görünür. |
| `filozoflar.js` + Node veri testleri | A | ~75 kayıt. SEP, Britannica ve Vikipedi ile doğrulanacak. |
| Zaman çizelgesi (yakınlaştır/kaydır, 7 şerit) | A | MÖ 800 → bugün. Yakınlaştırınca adlar, uzaklaştırınca dönem adları çıkar. "Bu yıl kim yaşıyordu" dikey çizgisi olacak. |
| Harita | A | Kıyı çizgisi verisi Natural Earth 1:50m'den (kamu malı). Önceden işlenip `js/data/harita.js` dosyasına konur, `file://` ile de çalışır. Antik ad yanında bugünkü ad gösterilir. |
| Etki ağı | O | Kronolojik yerleşim; tıklanan filozofun etkilendikleri ve etkiledikleri vurgulanır. |
| Diyalog motoru (`diyaloglar.js`) | O | Dallanan ağaç verisi. |
| Oylama + tutarlılık sayacı | O | localStorage, try/catch ile sarılı. Kurallar veri olarak tutulur: "makas=çevir, köprü=itme → tutarsızlık notu". |
| Sözlük + filozof balonları | H | Filozof balonu `filozoflar.js`'den beslenir. |
| Anlatıcı, hayalet el, `strings.js`, `tools/` | H | Referanstan uyarlanır. |

## 3. İçerik akışı

### 0. Giriş (3)
| id | Slayt | Deney | Ağ. |
|---|---|---|---|
| `kapak` | Kapak | Canlı zaman frizi önizlemesi: şeritler, noktalar, yavaş beliren etki çizgileri | O |
| `felsefe-nedir` | Felsefe nedir? | Dallar ağacı (varlık, bilgi, değer, mantık). Bir dala tıklayınca örnek soru ve sitedeki slaytı açılır. | H |
| `iki-yol` | İki yol | Yol seçimi; varsayılan sıra Zaman yolculuğu | H |

### YOL 1: ZAMAN YOLCULUĞU

**1. Mitostan logosa: İyonya (5)**
| id | Slayt | Deney | → Soru | Ağ. |
|---|---|---|---|---|
| `iyonya` | Neden İyonya? | Harita: Milet→Balat, Efes→Selçuk, Klazomenai→Urla, Kolophon→Değirmendere, Samos→Sisam. Ticaret yolları katmanı. | | A* |
| `arkhe` | Arkhe makinesi | Su / apeiron / hava seçilir. Anaksimenes için sıkışma kaydırıcısı: ateş↔hava↔su↔toprak | Neyi bilebilirim | O |
| `herakleitos` | Her şey akar | Akan nehir parçacıkları. "Aynı nehir mi?" oylaması (kimlik sorusuna bağlanır) | Ben kimim | O |
| `pythagoras` | Her şey sayıdır | Monokord (Web Audio): 1/2, 2/3, 3/4 ve serbest köprü; uyumsuzluk eğrisi. muzik.koraytoksoz.com bağlantısı | | O |
| `ksenofanes` | Tanrıları kendimize benzetmek | Atlar, öküzler, Habeşliler, Trakyalılar: "çizen kim olursa" seçimiyle siluet değişir (fragman B15, B16) | | H |

**2. Varlık ve değişim (5)**
| `parmenides` | Varlık vardır | "İki yol" seçimi: duyular mı, akıl mı? Kısa diyalog | Neyi bilebilirim | H |
| `zenon-asil` | Aşil ve ikiye bölme | Adım adım animasyon + canlı toplam ½+¼+… → 1 | Mantık | O |
| `zenon-ok` | Uçan ok | Zamanı dondurma kaydırıcısı; her "an"da ok hareketsiz *(isteğe bağlı: zenon-asil ile birleşebilir)* | Mantık | H |
| `empedokles` | Dört öğe, sevgi ve nefret | Parçacık simülasyonu: sevgi/nefret kaydırıcısı. Anaksagoras'ın nous'u düğmesi | | O |
| `atomcular` | Kesme deneyi | Elmayı tekrar tekrar ikiye böl; "durmak zorunda mısın?" oylaması. Antik ve modern atom farkı | | H |

**3. Sofistler ve Sokrates (4)**
| `protagoras` | İnsan her şeyin ölçüsü | Üç kova deneyi (soğuk/ılık/sıcak su, iki el) | Doğru olan ne | H |
| `sokrates` | Bilmediğini bilmek | Delfi kâhini: Sokrates'in politikacı, şair ve zanaatkârla görüşme turu | Neyi bilebilirim | H |
| `sokratik-sorgulama` | Cesaret nedir? (ana deney) | Diyalog ağacı (Lakhes'e dayalı): tanım → karşı örnek → düzeltme → aporia | Mantık | A (içerik) |
| `sokrates-olum` | Kaçmalı mı? | Kriton'un önerisi: ziyaretçi oy verir. Yasaların konuşması, karşı argümanlar | Adil toplum | H |

**4. Platon (3)**
| `magara` | Mağara (ana deney) | Katmanlı sahne: mahkûmu çöz, adım adım yukarı çıkar (gölge → nesne → ateş → yansıma → güneş) | Neyi bilebilirim | A |
| `idealar` | Mükemmel daire | Elle daire çiz, yuvarlaklık ölçülür (asla %100 olmaz). Bölünmüş çizgi şeması | Neyi bilebilirim | O |
| `ruh-arabasi` | At arabası ve devlet | Akıl, öfke ve istek kaydırıcıları; araba sapar. Devletteki üç sınıf. Diotima notu "Daha fazla"da | Adil toplum | O |

**5. Aristoteles (4)**
| `aristoteles` | Akademia'dan Lykeion'a, Assos | Harita yolculuğu: Stageira → Atina → Assos (Behramkale) → Midilli → Makedonya → Atina. Eser haritası | | O |
| `kiyas` | Kıyas makinesi | Öncül sürükle-bırak; Venn şeması ile geçerlilik denetimi | Mantık | A |
| `dort-neden` | Dört neden | Heykel / ev / meşe palamudu: neden eşleştirme | | H |
| `altin-orta` | Altın orta | Üç erdem kaydırıcısı; eudaimonia göstergesi | Doğru olan ne | H |

**6. Helenistik ve Roma (5)**
| `diogenes` | Sinoplu Diogenes | "Bu kural doğal mı, uzlaşım mı?" kart ayıklama; İskender anekdotu (anekdot olduğu belirtilir) | Anlam | H |
| `epikuros` | Haz hesabı | Seçenekler (ziyafet, dostluk, şöhret…) için kısa ve uzun vadeli haz/acı grafiği. Tetrapharmakos | Anlam | O |
| `stoacilar` | Kontrol ikiliği | Kaygı kartlarını "bana bağlı / bağlı değil" kutularına sürükle; Epiktetos geri bildirimi (Encheiridion 1) | Anlam | O |
| `septikler` | Duyular yanıltır mı? | Müller-Lyer, Adelson dama tahtası, eğik çubuk. Epokhe düğmesi | Neyi bilebilirim | O |
| `plotinos` | Bir'den taşma | Merkezden katman katman ışık; İslam ve Hristiyan düşüncesine köprü. Hypatia "Daha fazla"da | | H |

**7. Doğu'nun antik bilgeliği (7)**
| `eksen-cagi` | Eksen Çağı | Zaman çizelgesi MÖ 800–200; "Sokrates öldüğünde (MÖ 399)" çizgisi. Jaspers ve tartışma | | A* |
| `upanisadlar` | Tuz ve su | Tuz çözünür; "tat al" düğmesiyle her noktada tuz (Chandogya 6.13) | Ben kimim | H |
| `buda` | Araba nerede? | Arabayı parçalarına ayır (Milinda Panha); dört yüce gerçek | Ben kimim → Theseus | O |
| `konfucyus` | Ren ve li | Beş ilişki çarkı; altın kuralın biçimleri karşılaştırmalı (Analektler 15.24) | Doğru olan ne | H |
| `laozi` | Su ve taş | Damla zamanla taşı aşındırır (hız kaydırıcısı); yin–yang; Laozi'nin tarihselliği tartışmalı | | O |
| `zhuangzi` | Kelebek rüyası | Rüya/uyanıklık katman geçişi; "hangisi?" oylaması | Neyi bilebilirim | H |
| `nyaya-nagarjuna` | Hint mantığı | Nyaya'nın beş adımı ile kıyas yan yana; catuṣkoṭi dörtlüsü *(isteğe bağlı)* | Mantık | H |

**Antik çağ toplamı: 33 slayt.**

**8. İslam felsefesi (6)**
| `beytul-hikme` | Çeviri hareketi | Etki ağı akış animasyonu: Yunanca → Süryanice → Arapça → Latince. Kindi | | A* |
| `farabi` | Erdemli şehir | Şehir = beden: organları eşleştir; Platon'un devletiyle karşılaştır | Adil toplum | H |
| `ibn-sina` | Uçan adam | Duyuları tek tek kapat; "hâlâ var mısın?" Zorunlu ve mümkün varlık. Descartes'tan ~600 yıl önce | Ben kimim | O |
| `gazali-ibn-rusd` | Ateş mi yakar? | Pamuk ve ateş: "zorunlu bağ" ve "alışkanlık" katmanları; Hume'a köprü. İki taraf dengeli | Neyi bilebilirim | O |
| `ibn-tufeyl` | Hay bin Yakzan | Ada üzerinde yaşam evreleri zaman çizgisi; Sühreverdi ve İbn Arabi kısa *(isteğe bağlı)* | | H |
| `ibn-haldun` | Asabiyye döngüsü | Kuşak simülasyonu (kaydırıcılar); basitleştirilmiş model uyarısı | Adil toplum | A |

**9. Orta Çağ Avrupası (2)**
| `aquinas` | İnanç ve akıl | Etki ağı zinciri: Aristoteles → Farabi → İbn Sina → İbn Rüşd → Aquinas; Augustinus | | O* |
| `ockham` | Ockham'ın usturası | İki kuram; varsayımları kes, öngörü gücü değişmiyor | Mantık | O |

**10. Modern felsefe (5)**
| `descartes` | Kuşku yöntemi | Kuşku katmanları: duyular → rüya → kötü cin → kalan: cogito | Neyi bilebilirim | O |
| `rasyonalist-empirist` | Boş levha mı? | İki taraflı terazi: argüman ağırlıkları; Hume → Gazali | Neyi bilebilirim | H |
| `kant` | Renkli gözlük | Gözlük katmanları: uzay, zaman, kategoriler. Kategorik imperatife bağlantı | Doğru olan ne | O |
| `hegel-marx` | Diyalektik | Kavram çatışması animasyonu ("tez-antitez-sentez" notu); Marx tek cümle | | H |
| `kierkegaard-nietzsche` | Varoluşçuluğun öncüleri | Ebedî dönüş düşünce deneyi (Şen Bilim 341) oylaması; "Tanrı öldü" bağlamı (Şen Bilim 125) | Anlam | H |

**11. Çağdaş felsefe (3)**
| `analitik-kita` | Dil oyunları ve varoluş | "Oyun"un tanımı: aile benzerliği ağı; Beauvoir ve Arendt | | H |
| `bilim-felsefesi` | 2-4-6 görevi | Wason oyunu; Popper ve Kuhn | Mantık | O |
| `felsefe-bugun` | Felsefe bugün | Zihin/YZ, biyoetik, çevre: Büyük sorulara köprü *(isteğe bağlı)* | Zihin | H |

### YOL 2: BÜYÜK SORULAR
Her slaytın sonunda "Kim ne dedi?" şeridi olacak: gelenek renginde adlar, her biri zaman yolculuğundaki slayta bağlı.

| id | Soru | Deney | ← Filozoflar | Ağ. |
|---|---|---|---|---|
| `s-bilgi-kusku` | 1. Neyi bilebilirim? | Dört kuşku yan yana: mağara, kötü cin, kelebek, simülasyon. "Hangisini dışlayabilirsin?" | Platon, Descartes, Zhuangzi, Pyrrhon | O |
| `s-gettier` | 1. | Gettier vakaları (durmuş saat, ahırdaki koyun): "Bilgi mi?" oylaması | Platon (Theaitetos) | H |
| `s-dogruluk` | 2. Mantık | Doğruluk tablosu kurucu | Aristoteles, Nyaya, Frege | O |
| `s-safsata` | 2. | Safsata avı: örnek tartışmada işaretle (8 tür) | Aristoteles (Sofistik Çürütmeler) | A (içerik) |
| `s-theseus` | 3. Ben kimim? | Tahtaları tek tek değiştir; eskilerden ikinci gemi; oyla | Plutarkhos, Hobbes, Buda | A |
| `s-kimlik` | 3. | Locke'un hafıza ölçütü, ışınlanma, bölünme vakaları (Parfit); tutarlılık sayacı | Locke, İbn Sina, Hume | O |
| `s-tramvay` | 4. Doğru olan ne? | Makas, köprü, döngü, cerrah; tutarlılık sayacı | Foot, Thomson, Kant, Bentham | A |
| `s-etik-araclar` | 4. | Faydacılık hesaplayıcısı + Kant'ın evrenselleştirme testi | Bentham, Mill, Kant, Aristoteles, Konfüçyüs | O |
| `s-pece` | 5. Adil toplum | Cehalet peçesi: kuralları seç, rol kurayla belirlenir | Rawls, Platon, Farabi | A |
| `s-doga-durumu` | 5. | Hobbes ve Locke: devlet gücü kaydırıcısı; İbn Haldun'a bağlantı | Hobbes, Locke, İbn Haldun | O |
| `s-mahkum` | 6. Oyun ve işbirliği | Mahkûmun ikilemi turnuvası (+ Node testleri) | Hobbes, Axelrod | A |
| `s-ortak-mallar` | 6. | Ortak mallar trajedisi (otlak) | Aristoteles (Politika II), Hardin, Ostrom | O |
| `s-cince-oda` | 7. Zihin ve makine | Turing testi + Çince oda (kural kitabıyla cevap üret) → yz.koraytoksoz.com | Turing, Searle | O |
| `s-mary-zombi` | 7. | Mary'nin odası (renk açılır) + felsefi zombi oylaması *(isteğe bağlı)* | Jackson, Chalmers, Descartes | H |
| `s-anlam` | 8. Anlam | Camus, Stoacılar, Epikuros, Buda yan yana; cevaplarına en yakını | Camus, Epiktetos, Epikuros, Buda | O |
| `kapanis` | Kapanış | Tüm filozoflarla zaman frizi; "size yakın düşünürler" (alçakgönüllü dille) | | O |

**Toplam: 3 + 49 + 16 = 68 slayt.** Bu, önerilen 50–60 bandının üstünde. İsteğe bağlı işaretli 5 slayt (`zenon-ok`, `nyaya-nagarjuna`, `ibn-tufeyl`, `felsefe-bugun`, `s-mary-zombi`) çıkarılır ya da birleştirilirse **63** olur.
Anlatım: slayt başı ~30 sn → ~33 dk; tahminen ~30 bin karakter (kesin sayım metinler yazılınca).

## 4. Doğruluk notları (şimdiden işaretli)
- **Ksenofanes:** Doğduğu Kolophon bugün Değirmendere (Menderes, İzmir) yakınında. Kesin konumu kontrol edilecek.
- **Pythagoras:** Monokord ve "demirci örsü" anlatıları geç dönem efsanesi; öyle sunulacak.
- **Hierapolis:** Epiktetos'un doğum yeri Hierapolis (Pamukkale) olarak kabul ediliyor, ama bu tek bir kaynağa dayanıyor; not düşülecek.
- **Laozi:** Tarihsel varlığı tartışmalı. Konfüçyüs, Buda ve Upanişadların tarihleri yaklaşık verilecek.
- **"Tez–antitez–sentez":** Fichte/Chalybäus'a dayanıyor, Hegel'in formülü değil.
