/* Büyük soru 2: Mantık ve akıl yürütme */
slayt(`
<section class="slide" data-chapter="13" data-demo="dogruluk" id="s-dogruluk">
  <div class="text">
    <h2>Doğruluk tabloları</h2>
    <p class="lead">"Yağmur yağarsa yer ıslanır. Yer ıslak. O hâlde yağmur yağdı." Bu çıkarım sağlam mı?</p>
    <p>Bir akıl yürütmenin <strong>geçerli</strong> olması, öncüller doğruyken sonucun yanlış olmasının <em>imkânsız</em> olması demektir. Geçerlilik, cümlelerin konusuna değil biçimine bağlıdır: "Yağmur" yerine "kar", "yer" yerine "çatı" koysanız da sonuç değişmez.</p>
    <p><strong>Doğruluk tablosu</strong> bu biçimi görünür kılar. "p" ve "q" iki önermeyse, ikisinin doğru (D) ya da yanlış (Y) olabileceği dört durum vardır. "ve", "veya", "ise" gibi bağlaçlar bu dört durumda bileşik önermenin doğruluk değerini belirler.</p>
    <p>Bir çıkarım biçiminin geçerli olup olmadığını anlamak için bütün satırlara bakılır. Öncüllerin hepsinin doğru, sonucun yanlış olduğu tek bir satır bile varsa, biçim geçersizdir. O satıra <strong>karşı örnek</strong> denir.</p>
    <details class="more"><summary>Daha fazla: "ise" neden tuhaf?</summary>
      <p>Mantıkta "p ise q" yalnızca p doğru, q yanlışken yanlıştır. Yani p yanlışsa, q ne olursa olsun bileşik önerme doğru sayılır: "Ay peynirden yapılmışsa ben de padişahım" mantıkça doğrudur. Buna <em>maddi gerektirme</em> denir. Gündelik dildeki "ise" ile tam örtüşmediği için tartışmalıdır.</p>
      <p>Önermeler mantığının bugünkü sembolik biçimi Frege (1879) ile başladı; doğruluk tabloları 1920'lerin başında Wittgenstein ve Emil Post tarafından yaygınlaştı. Ama koşul önermesinin bu tanımı çok daha eskidir: Diyalektik okuldan Megaralı Philon'a (MÖ 4.–3. yy) atfedilir; Stoacılar da bu tanımı tartıştı.</p>
    </details>
    <p class="try">Önce bir bağlacın tablosunu kendiniz doldurup denetleyin. Sonra dört çıkarım biçimi için karar verin: geçerli mi?</p>
    <ul class="kim">
      <li data-f="aristoteles">Geçerliliği biçime bağlayan ilk sistem: terimler yerine harfler koyarak kıyas biçimlerini inceledi.</li>
      <li data-f="nyaya">Beş adımlı çıkarımda, gerekçenin sonuçla her durumda birlikte bulunması (vyāpti) aranır; tek bir karşı örnek gerekçeyi çürütür.</li>
      <li data-f="leibniz">Akıl yürütmeyi bir hesaba çevirmeyi düşledi; anlaşmazlıklar \"Hesaplayalım!\" diyerek çözülecekti.</li>
      <li data-f="frege">Bugünkü sembolik mantığın kurucusu; önermeleri ve niceleyicileri tek bir biçimsel dilde topladı (1879).</li>
      <li data-f="wittgenstein">Doğruluk tablolarını mantık önermelerinin yapısını göstermek için kullandı (Tractatus, 1921).</li>
    </ul>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Dört biçim: modus ponens (geçerli), modus tollens (geçerli), sonucu onaylama (geçersiz), öncülü reddetme (geçersiz).</li>
    <li>Gündelik akıl yürütmede "sonucu onaylama" çoğu zaman makul bir tahmindir (en iyi açıklamaya çıkarım, abdüksiyon). Ama mantıkça zorunlu değildir: yer, hortumla sulandığı için de ıslak olabilir.</li>
    <li>Kıyas makinesi slaytına geri bağlantı: Aristoteles'in terim mantığı ile önermeler mantığı farklı sistemlerdir; ikisi Frege'de birleşir.</li>
    <li>Kaynaklar: Frege, Begriffsschrift (1879); Wittgenstein, Tractatus 4.31 vd.; Post, "Introduction to a General Theory of Elementary Propositions" (1921).</li>
  </ul></aside>
</section>

<section class="slide" data-chapter="13" data-demo="safsata" id="s-safsata">
  <div class="text">
    <h2>Safsata avı</h2>
    <p class="lead">İkna edici görünen her akıl yürütme sağlam değildir.</p>
    <p><strong>Safsata</strong>, mantıksal olarak sonucunu desteklemediği hâlde destekliyormuş gibi görünen akıl yürütmedir. Bazı kalıplar o kadar sık tekrar eder ki adları vardır. Aristoteles bunların ilk sistemli listesini <em>Sofistik Çürütmeler</em>'de verdi. Hint mantıkçıları da "sahte gerekçeler" (hetvābhāsa) için ayrıntılı bir sınıflama kurdu.</p>
    <ul>
      <li><strong>Adam karalama:</strong> Argümana değil, onu söyleyen kişiye saldırmak.</li>
      <li><strong>Korkuluk:</strong> Karşı görüşü çarpıtıp zayıf hâlini çürütmek.</li>
      <li><strong>Kaygan zemin:</strong> Bir adımın, kanıtsız olarak felaketle biten bir zincir başlatacağını öne sürmek.</li>
      <li><strong>Yanlış ikilem:</strong> Başka seçenekler varken yalnızca iki seçenek sunmak.</li>
      <li><strong>Otoriteye başvuru:</strong> Konunun uzmanı olmayan ünlü birinin sözünü kanıt saymak.</li>
      <li><strong>Kitleye başvuru:</strong> "Herkes böyle düşünüyor" demeyi gerekçe saymak.</li>
      <li><strong>Döngüsel akıl yürütme:</strong> Kanıtlanacak şeyi öncülde varsaymak.</li>
      <li><strong>Aceleci genelleme:</strong> Birkaç örnekten genel bir yargıya atlamak.</li>
    </ul>
    <details class="more"><summary>Daha fazla: safsatayı bulmak tartışmayı bitirmez</summary>
      <p>Bir argümanda safsata bulmak, sonucunun yanlış olduğunu göstermez; yalnızca o gerekçenin sonucu desteklemediğini gösterir. "Safsata safsatası" denen hata budur.</p>
      <p>Ayrıca her uzmana başvuru safsata değildir: Konusunda uzman birinin görüşü iyi bir gerekçe olabilir. Her kayma uyarısı da safsata değildir: Zincirin halkaları kanıtlanırsa argüman sağlamlaşır.</p>
      <p>"Ad hominem" gibi Latince adları ilk kez sistemli biçimde kullananlardan biri John Locke'tur (<em>İnsan Anlığı Üzerine Bir Deneme</em>, IV.17).</p>
    </details>
    <p class="try">Tartışmada bir cümleye tıklayın, sonra onda gördüğünüz safsatayı seçin. Sekizini de bulmaya çalışın; her cümlede safsata yok.</p>
    <ul class="kim">
      <li data-f="aristoteles">Sofistik Çürütmeler'de on üç safsata türünü dilden kaynaklananlar ve dil dışı olanlar diye ayırdı.</li>
      <li data-f="nyaya">Beş tür sahte gerekçe (hetvābhāsa) tanımladı: tutarsız, çelişen, kanıtlanmamış gerekçeler…</li>
      <li data-f="locke">Ad hominem, ad verecundiam (saygınlığa başvuru) ve ad ignorantiam gibi adlandırmaları yaygınlaştırdı.</li>
      <li data-f="schopenhauer">Haklı Çıkma Sanatı'nda tartışmada kazanmak için kullanılan 38 hileyi alaycı bir dille sıraladı.</li>
      <li data-f="gorgias">Retoriğin gücünü savundu; Platon'a göre bu güç, doğruyu değil inandırıcı olanı arıyordu.</li>
    </ul>
  </div>
  <div class="stage"></div>
  <aside class="notes"><ul>
    <li>Kaynaklar: Aristoteles, Sofistik Çürütmeler 165b–169b; Nyaya Sutraları I.2.4–9 (hetvābhāsa); Locke, Deneme IV.17.19–22; Schopenhauer, Eristische Dialektik (yazılış y. 1830, yayın 1864).</li>
    <li>Örnek tartışma kurmacadır; kişiler ve olay hayal ürünüdür.</li>
    <li>Sunumda salona bir cümleyi okuyup elle oylama yapılabilir: "Hangi safsata?"</li>
  </ul></aside>
</section>
`);
Object.assign(window.REHBER, {
  "s-dogruluk": [{ click: "=p ise q" }, { click: "aria:Satır 2 sonucu" }, { wait: 500 }, { click: "Denetle" }],
  "s-safsata": [{ click: "css:.sf-cumle[data-i='1']" }, { wait: 500 }, { click: "=Adam karalama" }],
});
