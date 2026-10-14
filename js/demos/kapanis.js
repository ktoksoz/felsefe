/* Kapanış: bütün filozoflarla zaman çizelgesi; cevaplara göre "size yakın düşünürler" */
(function () {
  const { h } = L;
  const D = window.Demos;
  const F = window.FELSEFE;
  // anahtar öneki slayt kimliği değilse, ait olduğu slayt
  const ANAHTAR_SLAYT = { nehir: "herakleitos" };

  function slaytAdi(anahtar) {
    const on = anahtar.split(".")[0];
    const id = ANAHTAR_SLAYT[on] || on;
    const s = document.getElementById(id);
    return s ? [id, (s.querySelector("h2, h1") || {}).textContent || id] : [null, on];
  }

  D.kapanis = function (stage, slide) {
    const z = Zaman(stage, { etkiler: false, kontroller: true });
    const kutu = slide.querySelector(".kp-yakin");
    slide.querySelector(".kp-sil").addEventListener("click", () => { Oy.sil(); yaz(); });

    function yaz() {
      const p = Oy.yakinlik();
      const sira = Object.keys(p).filter((id) => F.byId[id] && p[id] > 0).sort((a, b) => p[b] - p[a]);
      const ust = sira.slice(0, 5);
      z.vurgula(ust);
      kutu.innerHTML = "";
      if (!ust.length) {
        kutu.append(h("p.kp-bos", Oy.sayi()
          ? "Cevaplarınız henüz bir düşünürle eşleşmedi. Birkaç düşünce deneyi daha deneyin."
          : "Henüz bir düşünce deneyinde cevap vermediniz. Tramvay problemi, cehalet peçesi ya da Theseus'un gemisiyle başlayabilirsiniz; sonra buraya dönün."));
        const yol = h("p.kp-oneri");
        [["s-tramvay", "Tramvay problemi"], ["s-pece", "Cehalet peçesi"], ["s-theseus", "Theseus'un gemisi"], ["s-anlam", "Hayatın anlamı"]].forEach(([id, ad]) => {
          if (document.getElementById(id)) yol.append(h("a.f-chip", { href: "#" + id }, ad), " ");
        });
        kutu.append(yol);
        return;
      }
      // her düşünürün hangi cevaplarla eşleştiği
      const neden = {};
      const cev = Oy.all();
      Object.entries(window.YAKINLIK || {}).forEach(([k, tablo]) => {
        const v = cev[k];
        if (v == null || !tablo[v]) return;
        Object.keys(tablo[v]).forEach((fid) => { if (tablo[v][fid] > 0) (neden[fid] = neden[fid] || new Set()).add(k); });
      });
      kutu.append(h("h3", "Size yakın düşünürler"));
      const ul = h("ol.kp-liste");
      ust.forEach((id) => {
        const f = F.byId[id];
        const bag = [...(neden[id] || [])].map(slaytAdi);
        const uniq = [];
        bag.forEach(([sid, ad]) => { if (!uniq.some((u) => u[1] === ad)) uniq.push([sid, ad]); });
        ul.append(h("li", { style: { "--gel": L.gc(f.gelenek) } }, Oy.fChip(id),
          uniq.length ? h("small", " · ", ...uniq.slice(0, 3).flatMap(([sid, ad], i) => [i ? ", " : "", sid ? h("a", { href: "#" + sid }, ad) : ad])) : ""));
      });
      kutu.append(ul, h("p.kp-not", `${Oy.sayi()} cevaba göre. Bir deneyde fikrinizi değiştirirseniz bu liste de değişir.`));
    }
    return { enter() { yaz(); z.enter(); }, leave: z.leave };
  };
})();
