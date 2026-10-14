/* Büyük soru 1: Neyi bilebilirim? */
slayt(`
<section class="slide" data-chapter="12" data-demo="kuskular" id="s-bilgi-kusku">
  <div class="text">
    <h2>Dört kuşku</h2>
    <p class="lead">Şu an bu satırları okuduğunuzdan emin misiniz? Bunu kanıtlayabilir misiniz?</p>
    <p>Felsefe tarihinde dört düşünce deneyi, birbirinden bağımsız olarak aynı rahatsız edici soruyu sorar: Deneyimlediğim her şey, gerçeğin yalnızca bir görüntüsü olabilir mi?</p>
    <ul>
      <li><strong>Mağara</strong> (Platon): Ömrü boyunca yalnızca duvardaki gölgeleri görmüş biri, gölgeleri gerçeğin kendisi sanır.</li>
      <li><strong>Kötü cin</strong> (Descartes): Güçlü ve aldatıcı bir varlık, bütün duyumlarımı bana bir oyun gibi oynatıyor olabilir.</li>
      <li><strong>Kelebek</strong> (Zhuangzi): Rüyadayken rüyada olduğumu bilmem; uyanıklığın da bir rüya olmadığından nasıl emin olurum?</li>
      <li><strong>Simülasyon</strong> (Bostrom): Bütün dünyamız, çok gelişmiş bir uygarlığın bilgisayarında çalışan bir benzetim olabilir.</li>
    </ul>
    <p>Dördünün yapısı aynıdır: İçeriden bakınca "gerçek" ile "görüntü" ayırt edilemiyorsa, gerçekte hangisinin içinde olduğumu bilebilir miyim? Bu soruya verilen cevaplar, bilgi kuramının (epistemoloji) temel tartışmalarını oluşturur.</p>
    <details class="more"><summary>Daha fazla: kuşkudan çıkış yolları</summary>
      <p><strong>Descartes</strong> en köklü kuşkudan bile sağ çıkan bir şey buldu: Aldatılıyorsam bile, aldatılan bir ben vardır. "Düşünüyorum, öyleyse varım."</p>
      <p><strong>Ortak duyu</strong> yanıtı: G. E. Moore 1939'da bir elini kaldırıp "İşte bir el" dedi. Bir felsefi kuşku argümanının öncüllerine güvenmek, ellerimin varlığına güvenmekten daha makul olamaz.</p>
      <p><strong>Pyrrhoncu</strong> yanıt: Kesin bir hüküm vermeden yargıyı askıya almak ve bunun getirdiği huzurla yaşamak.</p>
      <p>Bostrom'un argümanı, Descartes'ınkinden farklı olarak bir olasılık hesabıdır: Simülasyon kuran uygarlıklar varsa ve çok sayıda benzetim çalıştırıyorlarsa, bilinçli varlıkların çoğu benzetimde olur (Bostrom, "Are You Living in a Computer Simulation?", 2003).</p>
    </details>
    <p class="try">Her kuşkuyu açın ve kendinize sorun: Bunun içinde olmadığımı gösterebilir miyim? Dördünü de cevaplayınca geriye ne kaldığını görün.</p>
    <ul class="kim">
      <li data-f="platon">Duyular gölgeleri gösterir; gerçek bilgi akılla, değişmeyen idealara yönelerek kazanılır.</li>
      <li data-f="descartes">Her şeyden kuşku duyabilirim ama kuşku duyan benden kuşku duyamam; bilgi bu sarsılmaz noktadan yeniden kurulmalı.</li>
      <li data-f="zhuangzi">Rüya ile uyanıklığı kesin ayıramayız; bu belirsizlik bir dert değil, şeylerin dönüşümüne açılan bir kapıdır.</li>
      <li data-f="bostrom">Belirli varsayımlar altında bir benzetimde yaşıyor olma olasılığımız ciddiye alınmalıdır.</li>
      <li data-f="pyrrhon">Hiçbir yargı kesin değildir; yargıyı askıya almak (epokhe) huzur getirir.</li>
      <li data-f="augustinus">Yanılıyorsam, varım: aldanmak için bile önce var olmak gerekir.</li>
    </ul>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Kaynaklar: Platon, Devlet VII, 514a–520a; Descartes, Meditasyonlar I–II (1641); Zhuangzi, 2. bölüm (Qiwulun) sonu; Bostrom 2003, Philosophical Quarterly 53(211).</li>
    <li>Augustinus'un "Si fallor, sum" (Yanılıyorsam, varım): Tanrı Devleti XI.26. Descartes'tan yaklaşık 1200 yıl önce.</li>
    <li>Moore: "Proof of an External World" (1939).</li>
    <li>Salona soru: "Hangisini dışlamak en zor?" Genellikle simülasyon çıkıyor; neden en modern kuşku en ikna edici geliyor?</li>
  </ul></aside>
</section>

<section class="slide" data-chapter="12" data-demo="gettier" id="s-gettier">
  <div class="text">
    <h2>Haklı, doğru ama bilgi mi?</h2>
    <p class="lead">Durmuş bir saate bakıyorsunuz ve saat tam da o anın saatini gösteriyor. Saati biliyor musunuz?</p>
    <p>Platon'dan beri bilginin tanımı şöyle özetlenir: <strong>bilgi, haklı gerekçelendirilmiş doğru inançtır</strong>. Üç koşul var: Bir şeye inanıyorum, inandığım şey doğru ve inanmak için iyi bir gerekçem var.</p>
    <p>1963'te Edmund Gettier üç sayfalık bir makale yayımladı. Bu makalede üç koşulun da sağlandığı ama içimizden "bu bilgi değil" demek gelen vakalar anlattı. İnanç doğru çıkıyor, ama şans eseri; gerekçe ile doğruluk birbirine yanlış yerden bağlanıyor.</p>
    <p>O günden beri dördüncü koşul arayışı sürüyor. Henüz herkesin kabul ettiği bir çözüm yok.</p>
    <details class="more"><summary>Daha fazla: Gettier'den önce Gettier</summary>
      <p>Benzer örnekler çok daha eskidir. 8. yüzyıl Budist filozofu Dharmottara'ya atfedilen bir örnekte, çölde serap gören bir yolcu su olduğuna inanır. Vardığında, tesadüfen tam orada gerçekten su vardır.</p>
      <p>Durmuş saat örneği Bertrand Russell'ındır (<em>Human Knowledge</em>, 1948). Ahırdaki koyun Roderick Chisholm'un (<em>Theory of Knowledge</em>, 1966), sahte ahırlar Carl Ginet'nin örneğidir; ikincisini Alvin Goldman 1976'da yayımladı.</p>
      <p>Platon da tanımdan memnun değildi: <em>Theaitetos</em> diyaloğu, bilginin "gerekçeli doğru sanı" olduğu önerisini tartışır ve bir çıkmazla biter (201c–210b).</p>
    </details>
    <p class="try">Dört vakayı tek tek okuyun ve karar verin: Bu kişi biliyor mu?</p>
    <ul class="kim">
      <li data-f="platon">Doğru sanı bilgi değildir; bilgi, sanıyı gerekçesine "bağlayan" bir açıklama ister (Menon 97e–98a).</li>
      <li data-f="gettier">Haklı gerekçelendirilmiş doğru inanç, bilgi için yeterli değildir.</li>
      <li data-f="russell">Durmuş saat örneğiyle, doğru bir inancın şans eseri doğru olabileceğini gösterdi.</li>
      <li data-f="nyaya">Doğru bilgi (pramāṇa), güvenilir bir kaynaktan, örneğin algı ya da çıkarımdan doğan bilgidir; şans eseri doğru olan bilgi sayılmaz.</li>
    </ul>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Gettier, "Is Justified True Belief Knowledge?", Analysis 23(6), 1963, s. 121–123.</li>
    <li>Gettier'nin birinci vakası: Smith, işi Jones'un alacağına ve Jones'un cebinde on bozuk para olduğuna dair güçlü kanıtlara sahiptir. Buradan "İşi alacak kişinin cebinde on bozuk para var" sonucunu çıkarır. İşi Smith alır; kendi cebinde de, bilmeden, on bozuk para vardır.</li>
    <li>Dharmottara örneği için: Dreyfus, Recognizing Reality (1997) ve Stoltz, "Gettier and Factivity in Indo-Tibetan Epistemology" (2007).</li>
    <li>Önerilen çözümler: "yanlış öncülden çıkarım olmasın", güvenilircilik (reliabilism), duyarlılık ve güvenlik koşulları, erdem epistemolojisi.</li>
  </ul></aside>
</section>
`);
Object.assign(window.REHBER, {
  "s-bilgi-kusku": [{ click: "aria:Mağara kuşkusu" }, { wait: 500 }, { click: "Dışlayabilirim" }, { wait: 1400 }, { click: "aria:Kötü cin kuşkusu" }],
  "s-gettier": [{ click: "Bilgi değil" }, { wait: 1600 }, { click: "Sonraki vaka" }],
});
