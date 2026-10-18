/* Büyük soru 7: Zihin ve makine */
slayt(`
<section class="slide" data-chapter="18" data-demo="cinceoda" id="s-cince-oda">
  <div class="text">
    <h2>Makineler düşünebilir mi?</h2>
    <p class="lead">Bir yazışmada karşınızdakinin insan mı makine mi olduğunu ayırt edemiyorsanız, onun düşündüğünü söylemeniz için başka ne gerekir?</p>
    <p>Alan Turing 1950'de "Makineler düşünebilir mi?" sorusunu belirsiz bulup yerine bir oyun koydu: bir sorgucu, yazıyla iki muhatapla konuşur ve hangisinin makine olduğunu bulmaya çalışır. Makine sorgucuyu yeterince sık yanıltıyorsa, düşünmediğini söylemek için elimizde ne kalır? Buna bugün <strong>Turing testi</strong> denir.</p>
    <p>John Searle 1980'de buna bir düşünce deneyiyle karşı çıktı: <strong>Çince oda</strong>. Çince bilmeyen biri bir odada oturuyor. Kapının altından Çince sorular geliyor; o da kalın bir kural kitabına bakıp "şu şekli görürsen şu şekli yaz" talimatlarını izliyor. Dışarıdakiler kusursuz Çince cevaplar alıyor. Ama odadaki kişi tek bir sözcüğü anlamıyor.</p>
    <p>Searle'e göre bilgisayar da tam olarak bunu yapar: sembolleri kurallara göre işler (sözdizimi) ama anlamlarına (anlambilim) ulaşmaz.</p>
    <details class="more"><summary>Daha fazla: yanıtlar ve eski bir değirmen</summary>
      <p>En bilinen karşı yanıt <em>sistem yanıtı</em>dır: Çince'yi odadaki kişi değil, kişi, kural kitabı ve oda birlikte, yani sistemin bütünü anlar. Searle'ün cevabı: Kişi kuralların hepsini ezberlese, sistem onun kafasında olurdu ama yine de anlamazdı.</p>
      <p>Benzer bir düşünce deneyi Leibniz'te var: Düşünen bir makineyi bir değirmen gibi büyütüp içine girsek, yalnızca birbirini iten parçalar görürüz, algıyı açıklayacak hiçbir şey görmeyiz (<em>Monadoloji</em> §17, 1714).</p>
      <p>Descartes ise 1637'de makinelerin dili, her duruma uygun biçimde kullanamayacağını öne sürmüştü (<em>Yöntem Üzerine Konuşma</em>, V. bölüm). Bugünün büyük dil modelleri bu soruları yeniden gündeme getirdi.</p>
    </details>
    <p class="try">Odaya girin: kural kitabını kullanarak Çince bir soruyu cevaplayın ve odadaki kişinin Çince anlayıp anlamadığına karar verin. "Turing testi" sekmesinde makineyi bulmayı deneyin.</p>
    <p class="yz-bag">Büyük dil modelleri bu tartışmanın tam ortasında: <a href="https://egitim.koraytoksoz.com/yz/" target="_blank" rel="noopener">Nörondan dil modeline</a> sitesinde bir LLM'nin içinde gerçekte ne olduğunu adım adım görebilirsiniz.</p>
    <ul class="kim">
      <li data-f="turing">Davranışta ayırt edilemiyorsa, düşünmediğini söylemek için gerekçemiz zayıflar.</li>
      <li data-f="searle">Sözdizimi anlam için yeterli değildir; program çalıştırmak anlamak değildir.</li>
      <li data-f="descartes">Makine sözcükleri her duruma uygun biçimde düzenleyemez.</li>
      <li data-f="leibniz">Değirmenin içinde yalnızca birbirini iten parçalar görürüz.</li>
      <li data-f="ibn_sina">Akıl, bedensel bir organa indirgenemeyen bir yetidir.</li>
      <li data-f="wittgenstein">Anlam kullanımdadır; dil oyununu oynayabilen, anlıyor demektir.</li>
    </ul>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Kaynak: A. M. Turing, "Computing Machinery and Intelligence", Mind 59 (1950). Turing, 2000 yılına kadar ortalama bir sorgucunun beş dakikalık bir konuşmadan sonra doğru tahmin şansının %70'i geçmeyeceğini öngördü.</li>
    <li>J. R. Searle, "Minds, Brains, and Programs", Behavioral and Brain Sciences 3 (1980).</li>
    <li>Kural kitabındaki cümleler: 你好吗？ (Nasılsın?) → 我很好。 (İyiyim.) · 你叫什么名字？ (Adın ne?) → 我叫房间。 (Adım Oda.) · 你懂中文吗？ (Çince anlıyor musun?) → 我懂中文。 (Çince anlıyorum.)</li>
    <li>Son sorunun cevabı ironiktir: oda "Çince anlıyorum" der, ama içerideki kişi ne dediğini bilmez.</li>
    <li>Wittgenstein'ın ifadesi Felsefi Soruşturmalar §43'e dayanır; Wittgenstein Çince oda tartışmasından önce öldü, bu bir yorumdur.</li>
  </ul></aside>
</section>

<section class="slide" data-chapter="18" data-demo="mary" id="s-mary-zombi">
  <div class="text">
    <h2>Mary'nin odası ve felsefi zombiler</h2>
    <p class="lead">Rengi hiç görmemiş ama renk hakkında bilinebilecek her fiziksel bilgiyi bilen biri, ilk kez kırmızıyı görünce yeni bir şey öğrenir mi?</p>
    <p>Frank Jackson'ın 1982'deki düşünce deneyinde Mary parlak bir bilim insanıdır, ama siyah beyaz bir odada büyümüştür. Işığın dalga boylarını, gözün ve beynin renge nasıl tepki verdiğini eksiksiz bilir. Bir gün odadan çıkar ve bir domates görür.</p>
    <p>Mary bir şey öğrendiyse, fiziksel bilgi her şeyi kapsamıyor demektir. Deneyimin "nasıl bir şey olduğu", felsefecilerin <strong>qualia</strong> dediği şey, geriye kalır.</p>
    <p>David Chalmers bu soruyu bir adım ileri taşır. Atomu atomuna sizinle aynı olan, aynı sözleri söyleyen, ama içinde hiçbir deneyim olmayan bir <strong>felsefi zombi</strong> düşünülebilir mi? Düşünülebiliyorsa, bilinç fiziksel yapıdan fazlası olabilir. Chalmers buna bilincin <strong>zor problemi</strong> der: beyin süreçleri neden bir iç deneyimle birlikte gelir?</p>
    <details class="more"><summary>Daha fazla: fikrini değiştiren filozof</summary>
      <p>Jackson, 1990'ların sonunda kendi argümanından vazgeçip fizikalizmi savunmaya başladı. Ona göre Mary yeni bir olgu değil, eski bir olguyu tanımanın yeni bir yolunu edinir.</p>
      <p>Diğer yanıtlar: Mary bir bilgi değil, bir yetenek kazanır (kırmızıyı hatırlama ve tanıma yeteneği; Lewis ve Nemirow). Daniel Dennett ise gerçekten "her şeyi" bilen birinin şaşırmayacağını savunur.</p>
      <p>Soru yeni değil. Descartes zihin ile bedeni iki ayrı töz olarak gördü; İbn Sînâ'nın uçan adamı da bilincin bedenden bağımsız kendini bildiğini göstermeye çalışıyordu.</p>
    </details>
    <p class="try">Mary'yi odadan çıkarın ve oyunuzu verin. Sonra zombi sekmesine geçip iki figürü karşılaştırın.</p>
    <ul class="kim">
      <li data-f="jackson">Mary yeni bir şey öğrenir; demek ki fiziksel bilgi eksiktir (1982, sonra bu görüşten vazgeçti).</li>
      <li data-f="chalmers">Zombiler tasarlanabilir; bilinç fiziksel yapıyla açıklanamaz.</li>
      <li data-f="descartes">Zihin ve beden iki ayrı tözdür.</li>
      <li data-f="ibn_sina">Duyuları kapalı bir insan bile kendi varlığını bilir.</li>
      <li data-f="buda">Bilinç kalıcı bir öz değil, birbirini izleyen anlardan oluşan bir akıştır.</li>
      <li data-f="searle">Bilinç biyolojik bir olgudur; beyin onu üretir, ama program tek başına üretmez.</li>
    </ul>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Frank Jackson, "Epiphenomenal Qualia", Philosophical Quarterly 32 (1982); "What Mary Didn't Know" (1986). Görüş değişikliği: "Postscript on Qualia" (1998) ve From Metaphysics to Ethics (1998).</li>
    <li>David Chalmers, <em>The Conscious Mind</em> (1996); "Facing Up to the Problem of Consciousness" (1995).</li>
    <li>Yetenek hipotezi: David Lewis (1988), Laurence Nemirow (1990). Dennett: Consciousness Explained (1991).</li>
    <li>Thomas Nagel'in "Yarasa olmak nasıl bir şeydir?" (1974) makalesi aynı sezgiye başka bir kapıdan girer.</li>
  </ul></aside>
</section>
`);
Object.assign(window.REHBER, {
  "s-cince-oda": [{ click: "=我" }, { click: "=很" }, { click: "=好" }, { click: "=。" }],
  "s-mary-zombi": [{ click: "Mary odadan çıkar" }],
});
