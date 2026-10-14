/* Diyalog ağaçları (bkz. js/bilesen/diyalog.js). Metinler kodun dışında durur; çeviri için tek yer. */
window.DIYALOGLAR = {};

/* Sokratik sorgulama: "Cesaret nedir?" (Platon, Lakhes'e dayalı) */
Object.assign(window.DIYALOGLAR, {
  cesaret: {
    baslangic: "basla",
    konusmacilar: { sokrates: { ad: "Sokrates", f: "sokrates" }, sen: { ad: "Siz" } },
    dugumler: {
      basla: { kim: "sokrates", metin: "Cesaretin ne olduğunu sana sormak istiyorum. Herkes bildiğini söylüyor. Sen söyle: cesaret nedir?",
        secenekler: [
          { metin: "Savaşta yerinden kaçmayan, düşmana karşı direnen cesurdur.", sonraki: "a1", ilke: "Lakhes'in ilk tanımı" },
          { metin: "Cesaret ruhun dayanıklılığıdır: zorluklara katlanmak.", sonraki: "b1", ilke: "Lakhes'in ikinci tanımı" },
          { metin: "Cesaret korkmamaktır.", sonraki: "d1" },
          { metin: "Cesaret, neden korkup neden korkmamak gerektiğini bilmektir.", sonraki: "c1", ilke: "Nikias'ın tanımı" },
        ] },
      a1: { kim: "sokrates", metin: "Peki İskitler kaçar gibi yapıp geri çekilerek savaşır. Plataia'da Spartalılar da önce geri çekildi, sonra dönüp kazandı. Onlar korkak mı? Hem cesaret yalnızca savaşta mı olur? Denizde, hastalıkta, yoksullukta cesur olan yok mu?",
        secenekler: [
          { metin: "Haklısın, tanım çok dar. Bütün bu durumlarda ortak olan bir şey olmalı.", sonraki: "a3", ilke: "Karşı örnek kabul edildi" },
          { metin: "Hayır. Gerçek cesaret yalnızca savaşta görülür.", sonraki: "a2" },
        ] },
      a2: { kim: "sokrates", metin: "Ölümcül bir hastalığa ya da güçlü birinin haksızlığına sonuna dek göğüs geren birine cesur demez misin? Ben derim. Demek ki aradığımız şey savaş meydanından daha geniş.",
        secenekler: [{ metin: "Peki, kabul. Ortak olan şeyi arayalım.", sonraki: "a3" }] },
      a3: { kim: "sokrates", metin: "Güzel. Hız nedir diye sorsam, koşuda da, konuşmada da, öğrenmede de aynı olan şeyi söylerdin: az zamanda çok iş. Cesaret için de bütün durumlarda aynı olan şeyi söyle.",
        secenekler: [{ metin: "Ruhun bir tür dayanıklılığı, katlanma gücü.", sonraki: "b1" }] },
      d1: { kim: "sokrates", metin: "Ateşin yakacağını bilmeyen bir çocuk korkmaz. Tehlikeyi göremeyen bir hayvan da korkmaz. Onlara cesur mu diyeceğiz, yoksa düşüncesiz mi? Nikias da korkusuzluğun cesaretle aynı şey olmadığını söyler.",
        secenekler: [
          { metin: "Düşüncesiz. Demek ki cesarette bir tür bilgi olmalı.", sonraki: "c1" },
          { metin: "O hâlde cesaret, korkuya rağmen dayanmaktır.", sonraki: "b1" },
        ] },
      b1: { kim: "sokrates", metin: "Her dayanıklılık güzel midir? Akılsızca, kendi zararına direnen birini düşün: inatla yanlış yolda yürüyen. Bunu güzel ve iyi bir şey sayar mısın?",
        secenekler: [
          { metin: "Hayır. O hâlde cesaret, akıllıca dayanıklılıktır.", sonraki: "b2", ilke: "Tanım düzeltildi" },
          { metin: "Evet, her direniş cesarettir.", sonraki: "b3" },
        ] },
      b3: { kim: "sokrates", metin: "Ama cesaretin güzel ve övülecek bir şey olduğunda anlaşmıştık. Zarar veren bir inat, övülecek bir şey olabilir mi?",
        secenekler: [{ metin: "Olamaz. Akıllıca dayanıklılık diyelim.", sonraki: "b2" }] },
      b2: { kim: "sokrates", metin: "Savaşta iki kişi düşün. Biri, takviye geleceğini, düşmanın sayıca az ve zayıf olduğunu hesaplayıp direniyor. Öteki hiçbir şey bilmeden, kötü koşullarda direniyor. Hangisi daha cesur?",
        secenekler: [
          { metin: "Bilmeden, kötü koşullarda direnen.", sonraki: "b4" },
          { metin: "Hesaplayıp akıllıca direnen.", sonraki: "b5" },
        ] },
      b4: { kim: "sokrates", metin: "Ama o zaman daha akılsızca olan dayanıklılık daha cesur oldu. Az önce akılsızca dayanıklılığın çirkin ve zararlı olduğunu söylemiştik. Kendimizle çeliştik.",
        secenekler: [{ metin: "Belki de cesaret bir tür bilgidir.", sonraki: "c1" }] },
      b5: { kim: "sokrates", metin: "Peki kuyuya dalmayı bilen dalgıç, bilmeden dalan birinden daha mı cesurdur? Çoğumuz tersini söyleriz: bilmeden göze alana cesur deriz. Senin tanımın bu sezgiyle çatışıyor.",
        secenekler: [{ metin: "O hâlde cesaretin ne bildiğine bakmalıyız: belki o bir tür bilgidir.", sonraki: "c1" }] },
      c1: { kim: "sokrates", metin: "Nikias'ın tanımı: korkulacak ve korkulmayacak şeylerin bilgisi. Ama korku, gelecekteki kötülüklerin beklentisidir. Gelecekteki iyiyi ve kötüyü bilen, geçmişteki ve şimdiki iyiyi ve kötüyü de bilmez mi? Hekimin bilgisi zamana bölünmez.",
        secenekler: [
          { metin: "Evet, bunu bilen hepsini bilir.", sonraki: "c2" },
          { metin: "Hayır, cesaret yalnızca geleceğe bakar.", sonraki: "c3" },
        ] },
      c3: { kim: "sokrates", metin: "Bir hekim hastalığın nasıl seyredeceğini, bugün ve dün nasıl olduğunu bilmeden bilebilir mi? Aynı bilgidir. Gelecek için bilgi, şimdi ve geçmiş için de bilgidir.",
        secenekler: [{ metin: "Haklısın. Cesaret iyinin ve kötünün bilgisidir.", sonraki: "c2" }] },
      c2: { kim: "sokrates", metin: "O hâlde cesaret, bütün iyilerin ve kötülerin bilgisi oldu. Ama böyle biri ölçülü, adil ve dindar da olur; ona hiçbir erdem eksik kalmaz. Oysa başta cesaretin erdemin yalnızca bir parçası olduğunu söylemiştik. Şimdi erdemin tamamı oldu.",
        secenekler: [{ metin: "Demek ki bu tanım da çöktü…", sonraki: "son" }] },
      son: { kim: "sokrates", son: true, metin: "Demek ki cesaretin ne olduğunu bulamadık, sevgili dostum.",
        ozet: "<p><b>Aporia: çıkmaz.</b> Denediğiniz her tanım bir karşı örneğe ya da bir çelişkiye takıldı. Platon'un <em>Lakhes</em> diyaloğu da tam burada, bir çıkmazla biter (199e).</p><p>Bu bir yenilgi değil. Artık neyi <em>bilmediğinizi</em> biliyorsunuz: cesaretin dayanıklılıkla, bilgiyle ve öteki erdemlerle ilişkisi sandığınızdan karmaşık. Sokrates'e göre felsefe tam bu noktadan başlar.</p>" },
    },
  },
});
