/* Büyük soru 6: Oyun ve işbirliği */
slayt(`
<section class="slide" data-chapter="17" data-demo="mahkum" id="s-mahkum">
  <div class="text">
    <h2>Mahkûmun ikilemi</h2>
    <p class="lead">İki suç ortağı ayrı odalarda sorgulanıyor. İkisi de susarsa ikisi de hafif ceza alır. Biri ötüp öteki susarsa öten kurtulur, susan ağır ceza yer. İkisi de öterse ikisi de orta ceza alır. Siz ne yapardınız?</p>
    <p>Karşınızdaki ne yaparsa yapsın, ötmek size daha az ceza getirir. Ama ikiniz de böyle düşünürseniz, ikiniz de susmuş olsaydınız alacağınızdan daha kötü bir sonuca varırsınız. Bireysel akılcılık ile ortak çıkar burada çatışır.</p>
    <p>Oyun tekrarlandığında durum değişir. 1980'de siyaset bilimci Robert Axelrod, dünyanın dört bir yanından araştırmacıları stratejilerini bilgisayar turnuvasına göndermeye çağırdı. Kazanan, en kısa programlardan biriydi: <strong>kısasa kısas</strong>. İlk turda işbirliği yap, sonra rakibin bir önceki hamlesini tekrarla.</p>
    <p>Axelrod'a göre başarılı stratejiler dört özellik paylaşıyordu: <em>nazik</em> (ilk ihaneti kendisi yapmaz), <em>misilleme yapan</em>, <em>affedici</em> ve <em>anlaşılır</em>.</p>
    <details class="more"><summary>Daha fazla: Hobbes'tan oyun kuramına</summary>
      <p>Hobbes'un doğa durumu bir mahkûmun ikilemi gibi okunabilir: herkes silahlanmayı seçer, çünkü öteki de silahlanabilir. Hobbes'un çözümü dışarıdan bir güçtü. Axelrod'unki ise içeriden: gelecekte yeniden karşılaşma ihtimali, yani "geleceğin gölgesi".</p>
      <p>Oyunu 1950'de Merrill Flood ve Melvin Dresher tasarladı; "mahkûm" öyküsünü Albert Tucker ekledi. Deneydeki puanlar Axelrod'un kullandığı değerlerdir: karşılıklı işbirliği 3, karşılıklı ihanet 1, tek taraflı ihanet 5 (aldatılan 0).</p>
      <p>Gürültü (yanlış anlaşılan hamleler) eklendiğinde kısasa kısas kendi kopyasıyla uzun misilleme döngülerine girebilir; bu yüzden affedici stratejiler öne çıkar. Hiçbir strateji her ortamda kazanmaz: sonuç, rakiplerin kimler olduğuna bağlıdır.</p>
    </details>
    <p class="try">Tek seferlik oyunda kararınızı verin. Sonra kendi stratejinizi kurup turnuvaya katın ve "Turnuvayı başlat"a basın.</p>
    <ul class="kim">
      <li data-f="hobbes">Ortak bir güç yoksa herkes saldırmayı seçer; barış için sözleşme gerekir.</li>
      <li data-f="axelrod">Tekrarlı oyunda işbirliği, merkezi bir otorite olmadan da ortaya çıkabilir.</li>
      <li data-f="konfucyus">Kendine yapılmasını istemediğini başkasına yapma; karşılıklılık (shu) bir ömür boyu yol gösterir.</li>
      <li data-f="kant">Herkes yapsaydı ne olurdu? İhanet evrenselleştirilemez.</li>
      <li data-f="mozi">Herkesi ayrım yapmadan sevmek, herkesin yararınadır.</li>
    </ul>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Kaynak: Robert Axelrod, "Effective Choice in the Prisoner's Dilemma", Journal of Conflict Resolution 24 (1980); <em>The Evolution of Cooperation</em> (1984). İlk turnuva 14 strateji + rastgele, 200 tur; kısasa kısası Anatol Rapoport gönderdi.</li>
    <li>Turnuva kodu js/mantik/oyun.js; Node testleri test/oyun.test.js.</li>
    <li>Konfüçyüs: Analektler 15.24 (shu, karşılıklılık).</li>
    <li>Sunumda: gürültüyü %5'e çıkarıp tekrar oynatın; affedici stratejiler yükselir.</li>
  </ul></aside>
</section>

<section class="slide" data-chapter="17" data-demo="otlak" id="s-ortak-mallar">
  <div class="text">
    <h2>Ortak mallar trajedisi</h2>
    <p class="lead">Köyün ortak bir otlağı var. Her çoban bir inek daha eklerse kazancın hepsi kendisine kalır, otlağın aşınması ise herkese bölünür. Siz bir inek daha ekler misiniz?</p>
    <p>Ekolojist Garrett Hardin 1968'de bu durumu <strong>ortak mallar trajedisi</strong> olarak adlandırdı: herkesin kendi çıkarı için makul davrandığı bir düzende ortak kaynak tükenir. Balıkçılık, yeraltı suları, atmosfer.</p>
    <p>Hardin'in önerdiği iki çıkış vardı: kaynağı bölüp özel mülke dönüştürmek ya da dışarıdan bir otoritenin koyduğu kurallar. Elinor Ostrom ise İsviçre otlaklarından Japon ormanlarına, İspanya'nın sulama birliklerinden Alanya'daki balıkçılara kadar sahada üçüncü bir yol buldu: kurallarını kendisi koyan, birbirini gözeten ve ihlallere kademeli yaptırım uygulayan topluluklar.</p>
    <p>Ostrom bu çalışmasıyla 2009'da ekonomi alanında Nobel ödülünü alan ilk kadın oldu.</p>
    <details class="more"><summary>Daha fazla: eski bir gözlem</summary>
      <p>Aristoteles aynı şeyi iki bin yıl önce fark etmişti: En çok kişinin ortak olduğu şeye en az özen gösterilir; herkes en çok kendi malını düşünür (<em>Politika</em> II.3, 1261b).</p>
      <p>Modeldeki otlak lojistik olarak büyür: az otu olan otlak yavaş, yarı dolu otlak en hızlı yenilenir. Sayılar gerçek bir köyü değil, ilkeyi göstermek için seçildi.</p>
    </details>
    <p class="try">Bir kural seçin ve sezonları ilerletin. Siz de inek ekleyip çıkararak oyuna katılın; "Serbest" ile "Ostrom kuralları"nı karşılaştırın.</p>
    <ul class="kim">
      <li data-f="aristoteles">Ortak olana en az özen gösterilir.</li>
      <li data-f="hardin">Ortak kaynak, kişisel akılcılığın toplamıyla tükenir.</li>
      <li data-f="ostrom">Topluluklar kendi kurallarını koyarak ortak kaynağı kuşaklarca koruyabilir.</li>
      <li data-f="hobbes">Ortak bir güç yoksa kimse kendini sınırlamaz.</li>
      <li data-f="laozi">Yeterliği bilen tükenmez.</li>
    </ul>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Kaynak: Garrett Hardin, "The Tragedy of the Commons", Science 162 (1968), 1243–1248. Hardin'in çözüm cümlesi: "karşılıklı olarak kabul edilmiş karşılıklı zorlama".</li>
    <li>Elinor Ostrom, <em>Governing the Commons</em> (1990); Alanya kıyı balıkçılığı kitapta incelenen örneklerden biridir. Sekiz tasarım ilkesi: açık sınırlar, yerel koşullara uygun kurallar, kullanıcıların kural yapımına katılması, gözetim, kademeli yaptırım, uyuşmazlık çözüm yolları, dışarıdan tanınma, iç içe kurumlar.</li>
    <li>Laozi: Tao Te Ching 44 ("Yeterliği bilen utanmaz, durmayı bilen tehlikeye düşmez"; çeviri bize ait).</li>
    <li>Mahkûmun ikileminin çok kişili hâli olarak anlatılabilir.</li>
  </ul></aside>
</section>
`);
Object.assign(window.REHBER, {
  "s-mahkum": [{ click: "Turnuvayı başlat" }],
  "s-ortak-mallar": [{ click: "=Serbest" }, { click: "20 sezon oynat" }],
});
