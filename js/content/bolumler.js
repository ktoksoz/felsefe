/* Bölümler ve yollar. yol: 0 giriş, 1 zaman yolculuğu, 2 büyük sorular, 3 kapanış.
   gelenek: bölümün baskın geleneği (renk için). Slaytlar data-chapter ile bu dizinin sırasına bağlanır. */
window.BOLUMLER = [
  { ad: "Giriş", yol: 0 },
  { ad: "Mitostan logosa: İyonya", yol: 1, gelenek: "yunan" },
  { ad: "Varlık ve değişim", yol: 1, gelenek: "yunan" },
  { ad: "Sofistler ve Sokrates", yol: 1, gelenek: "yunan" },
  { ad: "Platon", yol: 1, gelenek: "yunan" },
  { ad: "Aristoteles", yol: 1, gelenek: "yunan" },
  { ad: "Helenistik ve Roma dönemi", yol: 1, gelenek: "yunan" },
  { ad: "Doğu'nun antik bilgeliği", yol: 1, gelenek: "hint" },
  { ad: "İslam felsefesi", yol: 1, gelenek: "islam" },
  { ad: "Orta Çağ Avrupası", yol: 1, gelenek: "ortacag" },
  { ad: "Modern felsefe", yol: 1, gelenek: "modern" },
  { ad: "Çağdaş felsefe", yol: 1, gelenek: "cagdas" },
  { ad: "Neyi bilebilirim?", yol: 2, no: 1 },
  { ad: "Mantık ve akıl yürütme", yol: 2, no: 2 },
  { ad: "Ben kimim?", yol: 2, no: 3 },
  { ad: "Doğru olan ne?", yol: 2, no: 4 },
  { ad: "Adil toplum", yol: 2, no: 5 },
  { ad: "Oyun ve işbirliği", yol: 2, no: 6 },
  { ad: "Zihin ve makine", yol: 2, no: 7 },
  { ad: "Anlam", yol: 2, no: 8 },
  { ad: "Kapanış", yol: 3 },
];
/* Slayt ekleme yardımcısı: içerik dosyaları HTML'i sırayla #deck'e ekler */
window.slayt = (html) => document.getElementById("deck").insertAdjacentHTML("beforeend", html);
/* GitHub simgesi (Octicons mark-github, MIT) */
window.GH = '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
/* Hayalet el senaryoları: her içerik dosyası kendi slaytlarınınkini ekler (bkz. js/guide.js) */
window.REHBER = window.REHBER || {};
