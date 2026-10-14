/* Oyun teorisi mantığı: tekrarlı mahkûmun ikilemi, Axelrod tarzı turnuva ve ortak mallar (otlak) modeli.
   Metin içermez; tarayıcıda window.OyunTeorisi, Node'da module.exports olarak kullanılır. */
(function () {
  const ODEME = { T: 5, R: 3, P: 1, S: 0 }; // Axelrod (1980) değerleri

  // Tek turun puanları: [a'nın puanı, b'nin puanı]
  function puan(a, b, O = ODEME) {
    if (a === "C" && b === "C") return [O.R, O.R];
    if (a === "C" && b === "D") return [O.S, O.T];
    if (a === "D" && b === "C") return [O.T, O.S];
    return [O.P, O.P];
  }

  // Tekrar edilebilir rastgele sayı üreteci
  function rng(seed = 1) {
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Stratejiler: (benim hamlelerim, rakibin hamleleri, rastgele) → "C" (işbirliği) | "D" (ihanet) */
  const STRATEJI = {
    kisas: (ben, o) => (o.length ? o[o.length - 1] : "C"),
    hepIhanet: () => "D",
    hepIsbirligi: () => "C",
    rastgele: (ben, o, r) => (r() < 0.5 ? "C" : "D"),
    kinci: (ben, o) => (o.includes("D") ? "D" : "C"),
    affedici: (ben, o) => (o.length >= 2 && o[o.length - 1] === "D" && o[o.length - 2] === "D" ? "D" : "C"),
    pavlov: (ben, o) => (!ben.length ? "C" : ben[ben.length - 1] === o[o.length - 1] ? "C" : "D"),
  };

  // Tepkisel özel strateji: ilk hamle, rakip işbirliği yapınca, rakip ihanet edince
  function ozel(ilk, cSonra, dSonra) {
    return (ben, o) => (!o.length ? ilk : o[o.length - 1] === "C" ? cSonra : dSonra);
  }

  function strateji(s) { return typeof s === "function" ? s : STRATEJI[s]; }

  /* İki strateji arasında n turluk maç. gurultu: her hamlenin ters dönme olasılığı */
  function mac(a, b, n, { gurultu = 0, r = rng(1), odeme = ODEME } = {}) {
    const fa = strateji(a), fb = strateji(b);
    const A = [], B = [];
    let sa = 0, sb = 0;
    for (let i = 0; i < n; i++) {
      let x = fa(A, B, r), y = fb(B, A, r);
      if (gurultu && r() < gurultu) x = x === "C" ? "D" : "C";
      if (gurultu && r() < gurultu) y = y === "C" ? "D" : "C";
      A.push(x); B.push(y);
      const [p, q] = puan(x, y, odeme);
      sa += p; sb += q;
    }
    return { A, B, sa, sb };
  }

  /* Herkes herkesle (kendisiyle de) oynar. katilimci: { id: strateji adı ya da fonksiyon } */
  function turnuva(katilimci, n, { gurultu = 0, tohum = 1, kendisiyle = true } = {}) {
    const ids = Object.keys(katilimci);
    const r = rng(tohum);
    const toplam = {}, matris = {};
    ids.forEach((i) => { toplam[i] = 0; matris[i] = {}; });
    for (let i = 0; i < ids.length; i++) {
      for (let j = i; j < ids.length; j++) {
        if (i === j && !kendisiyle) continue;
        const m = mac(katilimci[ids[i]], katilimci[ids[j]], n, { gurultu, r });
        if (i === j) { toplam[ids[i]] += m.sa; matris[ids[i]][ids[i]] = m.sa; continue; }
        toplam[ids[i]] += m.sa; toplam[ids[j]] += m.sb;
        matris[ids[i]][ids[j]] = m.sa; matris[ids[j]][ids[i]] = m.sb;
      }
    }
    const sira = ids.slice().sort((a, b) => toplam[b] - toplam[a]);
    return { toplam, matris, sira };
  }

  /* ---------- Ortak mallar: otlak modeli ----------
     Ot lojistik büyür (K kapasite, r hız). Her inek sezonda 1 birim ot ister; ot yetmezse paylaşılır.
     İneğin getirisi aldığı payla orantılıdır. En yüksek sürdürülebilir verim G = K/2 iken r·K/4'tür. */
  function otlak({ suru = 6, K = 100, r = 0.5, baslangic = 2, kural = "serbest", tohum = 1 } = {}) {
    const R = rng(tohum);
    const st = {
      ot: K, K, r, kural, sezon: 0,
      inek: Array(suru).fill(baslangic), // 0. çoban ziyaretçi
      gelir: Array(suru).fill(0),
      ceza: Array(suru).fill(0),
      son: { verim: 1, yakalandi: [] },
      gecmis: [],
    };
    const kota = Math.max(1, Math.floor((r * K) / 4 / suru)); // sürdürülebilir pay
    st.kota = kota;
    // yapay çobanların kararı: +1 ekle, 0 tut, -1 azalt
    function karar(i) {
      const v = st.son.verim;
      if (kural === "serbest") return v > 0.35 ? 1 : v < 0.15 && st.inek[i] > 0 ? -1 : 0;
      if (kural === "kota") return st.inek[i] < kota ? 1 : st.inek[i] > kota ? -1 : 0;
      // ostrom: anlaşılan sınıra uyulur; ara sıra biri ayartılır
      if (st.inek[i] > kota) return -1;
      return R() < 0.12 ? 1 : st.inek[i] < kota ? 1 : 0;
    }
    function sezon(ziyaretci = 0) {
      const n = st.inek.length;
      const deg = st.inek.map((c, i) => (i === 0 ? ziyaretci : karar(i)));
      st.son.yakalandi = [];
      for (let i = 0; i < n; i++) {
        let c = Math.max(0, st.inek[i] + deg[i]);
        if (kural === "kota") c = Math.min(c, kota);
        st.inek[i] = c;
      }
      // Ostrom: topluluk gözetimi ve kademeli yaptırım
      if (kural === "ostrom") {
        for (let i = 0; i < n; i++) {
          if (st.inek[i] > kota && R() < 0.8) {
            st.ceza[i]++;
            st.son.yakalandi.push(i);
            st.inek[i] = Math.max(0, kota - (st.ceza[i] > 2 ? 1 : 0));
          }
        }
      }
      const talep = st.inek.reduce((a, b) => a + b, 0);
      const yenen = Math.min(talep, st.ot);
      const verim = talep ? yenen / talep : 1;
      st.ot = Math.max(0, st.ot - yenen);
      st.ot = Math.min(K, st.ot + r * st.ot * (1 - st.ot / K) + 0.2); // küçük bir tohum bankası
      for (let i = 0; i < n; i++) st.gelir[i] += st.inek[i] * verim;
      st.son.verim = verim;
      st.sezon++;
      st.gecmis.push({ ot: st.ot, verim, toplamInek: talep, ziyaretciGelir: st.gelir[0] });
      return st;
    }
    return { st, sezon };
  }

  const X = { ODEME, puan, rng, STRATEJI, ozel, mac, turnuva, otlak };
  if (typeof module !== "undefined") module.exports = X; else window.OyunTeorisi = X;
})();
