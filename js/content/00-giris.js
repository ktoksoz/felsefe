/* 0. Giriş: kapak, felsefe nedir, iki yol */
slayt(`
<section class="slide center cover" data-chapter="0" data-demo="kapak" id="kapak" data-title="Kapak">
  <div class="stage bare"></div>
  <div class="cover-text">
    <p class="orig-line no-gloss"><span lang="grc">φιλοσοφία</span> · <span lang="ar" class="orig ar">فلسفة</span> · <span lang="zh" class="orig zh">哲學</span> · <span lang="sa" class="orig dev">दर्शन</span></p>
    <h1>Bilgelik<br>sevgisi</h1>
    <p>Milet kıyısında sorulan bir sorudan bugünün yapay zekâ tartışmalarına uzanan bir yolculuk. Kronolojik bir zaman yolculuğu ve felsefenin büyük soruları; her adımda kendi sezginizi sınayacağınız bir deney.</p>
    <p class="byline">Koray Toksöz</p>
    <div class="cov-r">
    <div class="cover-actions">
      <button class="btn primary big" type="button" onclick="Narrator.start()">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Sesli anlatımla başla
      </button>
      <button class="btn big ghost" type="button" onclick="Deck.next()">Kendi hızımda gez</button>
    </div>
    <p class="hint">Anlatımlı tur slaytları kendiliğinden ilerletir; istediğiniz an durup deneylerle oynayabilirsiniz. Kendi hızınızda gezerken <kbd>→</kbd> ile ilerleyin, <kbd>O</kbd> ile tüm slaytları görün.</p>
    <div class="cover-meta">
      <a class="gh-link" href="https://github.com/ktoksoz/felsefe" target="_blank" rel="noopener">${GH}<span>Kaynak kodu GitHub'da</span></a>
      <a class="lic" href="https://creativecommons.org/licenses/by/4.0/deed.tr" target="_blank" rel="license noopener" title="İçerik: Creative Commons Atıf 4.0">
        <img src="img/cc-cc.svg" alt="Creative Commons" width="20" height="20"><img src="img/cc-by.svg" alt="Atıf" width="20" height="20">
        <span>İçerik CC BY 4.0 · Kod MIT</span>
      </a>
    </div>
    </div>
  </div>
  <aside class="notes"><ul>
    <li>Alttaki friz, sitenin zaman çizelgesinin kendisi: her şerit bir düşünce geleneği, her çizgi bir filozofun ömrü, yavaşça beliren eğriler etki ilişkileri.</li>
    <li>Renk kodu baştan söylenebilir: kil turuncusu Yunan ve Roma, zerdeçal Hint, mühür kırmızısı Çin, firuze İslam dünyası, mor Orta Çağ Avrupası, mavi modern, yeşil çağdaş.</li>
    <li>Kapaktaki dört sözcük "felsefe"nin dört dildeki adı: Yunanca philosophia, Arapça felsefe (Yunancadan), Çince zhexue (19. yüzyılda Japoncadan alınan bir karşılık), Sanskritçe darśana ("görüş, bakış").</li>
    <li>Kısayollar: N notlar, T metni gizle, O tüm slaytlar, A anlatım, B sapılan yere dön, F tam ekran.</li>
  </ul></aside>
</section>

<section class="slide" data-chapter="0" data-demo="dallar" id="felsefe-nedir">
  <div class="text">
    <h2>Felsefe nedir?</h2>
    <p class="lead">Bir çocuk "Neden?" diye sormayı bırakmazsa sonunda felsefeye varır.</p>
    <p>Sözcük Yunanca <span class="orig">φιλοσοφία</span>, <em>philo-sophia</em>: bilgelik sevgisi. Felsefe bir bilgi yığını değil, bir soru sorma biçimidir. Herkesin "zaten bildiği" şeyleri durup sorgular: Gerçekten var olan ne? Bir şeyi bildiğimden nasıl emin olurum? Doğru davranmak ne demek?</p>
    <p>Bu sorular dört büyük dala ayrılır: <strong>varlık</strong> (metafizik), <strong>bilgi</strong> (epistemoloji), <strong>değer</strong> (etik, siyaset, estetik) ve bunların hepsinin aracı olan <strong>mantık</strong>.</p>
    <p>Bilimden farkı: bilim sorularını deney ve ölçümle yanıtlar, felsefe ise ölçümün kendisinin neye dayandığını da sorar. Dinden farkı: din yanıtlarını çoğunlukla vahye ve geleneğe dayandırır, felsefe yalnızca akıl yürütmeye başvurur. Üçü tarih boyunca sık sık iç içe geçmiştir.</p>
    <p class="try">Ağacın dallarına tıklayın: her dalın sorduğu bir soruyu ve sitedeki deneyini görün.</p>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>"Felsefe" sözcüğünü ilk kullananın Pythagoras olduğu anlatılır (Diogenes Laertios, I.12; Cicero, Tusculum Sohbetleri V.8–9), ama bu geç bir anekdottur.</li>
    <li>Bilim–din–felsefe ayrımını kesin sınırlar gibi değil, ağırlık merkezleri gibi sunun. Aristoteles için fizik de felsefeydi; Newton'un kitabının adı "Doğa Felsefesinin Matematiksel İlkeleri"ydi.</li>
    <li>Dinleyiciye soru: "Bugün sizi en çok hangi dal ilgilendiriyor?" Elle oylama yapılabilir.</li>
  </ul></aside>
</section>

<section class="slide" data-chapter="0" data-demo="ikiyol" id="iki-yol">
  <div class="text">
    <h2>İki yol</h2>
    <p class="lead">Felsefeye iki kapıdan girilebilir: ne zaman, kim tarafından sorulduğundan ya da sorunun kendisinden.</p>
    <p><strong>Zaman yolculuğu</strong> MÖ 6. yüzyılda Ege kıyısında başlar. Hint ve Çin'deki çağdaş düşünürlere uğrar; Bağdat'ın çeviri okullarından Orta Çağ Avrupası'na, oradan modern ve çağdaş felsefeye gider. Ağırlık antik çağdadır: bugün sorduğumuz soruların çoğu ilk kez o zaman soruldu.</p>
    <p><strong>Büyük sorular</strong> sekiz soruyu doğrudan önünüze koyar: Neyi bilebilirim? Ben kimim? Doğru olan ne? Her birinde önce siz karar verirsiniz, sonra kararınızın hangi ilkeye dayandığını ve kimin sizinle aynı fikirde olduğunu görürsünüz.</p>
    <p>İki yol birbirine bağlıdır. Bir filozof bir soruya değindiğinde o soruya sapabilir, alt çubuktaki dönüş düğmesiyle kaldığınız yere dönebilirsiniz.</p>
    <p class="try">Bir yol seçin. Sunumda varsayılan sıra önce zaman yolculuğudur.</p>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Sunumda: önce zaman yolculuğu, sonra büyük sorular. Zaman kısıtlıysa her bölümden bir "ana deney" seçin: Sokratik sorgulama, mağara, kontrol ikiliği, uçan adam, tramvay, cehalet peçesi.</li>
    <li>Cevaplar yalnızca tarayıcıda saklanır; kapanış slaytı onlara göre "size yakın düşünürler"i gösterir.</li>
  </ul></aside>
</section>
`);
Object.assign(window.REHBER, {
  "felsefe-nedir": [{ click: "aria:Bilgi dalı" }, { wait: 1600 }, { click: "aria:Değer dalı" }],
  "iki-yol": { adimlar: [{ move: "Zaman yolculuğu" }], hedef: "css:.iy-kapi" },
});
