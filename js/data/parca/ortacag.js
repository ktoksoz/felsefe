/* 9. Orta Çağ Avrupası: sözlük, tutarlılık ve yakınlık eklemeleri */
window.SOZLUK.push(
  { k: ["skolastik"], t: "Skolastik", d: "Orta Çağ Avrupa üniversitelerinde gelişen, inanç ile aklı mantık ve tartışma yoluyla uzlaştırmaya çalışan okul felsefesi.", u: "https://tr.wikipedia.org/w/index.php?search=Skolastik" },
  { k: ["summa theologiae"], t: "Summa Theologiae", d: "Thomas Aquinas'ın soru–itiraz–yanıt biçiminde yazılmış büyük teoloji özeti (1265–1274, tamamlanmadı)." },
  { k: ["beş yol"], t: "Beş yol", d: "Aquinas'ın Tanrı'nın varlığına akılla ulaşan beş kanıtı: hareket, etken neden, olumsallık, dereceler ve düzen." },
  { k: ["çifte hakikat"], t: "Çifte hakikat", d: "Bir şeyin felsefede doğru, inançta yanlış olabileceği görüşü. Latin İbn Rüşdçülere atfedildi ve 1277'de Paris'te mahkûm edildi." },
  { k: ["ockham'ın usturası"], t: "Ockham'ın usturası", d: "Aynı şeyi açıklayan iki açıklamadan daha az varsayım kullananı tercih etme ilkesi. Bir kanıt değil, bir çalışma kuralıdır.", u: "https://tr.wikipedia.org/w/index.php?search=Ockham%27%C4%B1n+usturas%C4%B1" },
  { k: ["nominalizm"], t: "Nominalizm", d: "Tümellerin (\"insanlık\", \"kırmızılık\") zihnin dışında ayrı varlıkları olmadığı, var olanın yalnızca tek tek şeyler olduğu görüşü.", u: "https://tr.wikipedia.org/w/index.php?search=Nominalizm" },
  { k: ["tümel"], t: "Tümel", d: "Birçok tek tek şeye ortak olan nitelik ya da tür: \"insan\", \"beyaz\", \"üçgen\" gibi." }
);
window.TUTARLILIK.push(
  { kosul: [["aquinas.iman-akil", "akil"], ["ockham.basit", "evet"]],
    mesaj: "Yalnızca akla ve kanıta güvendiğinizi söylemiştiniz; şimdi \"doğa basittir\" diyorsunuz. Ama doğanın basit olduğu da kanıtlanmış bir şey değil, bir inanç. Ockham'ın kendisi usturayı bir kanıt değil, bir kural olarak görüyordu." },
  { kosul: [["aquinas.iman-akil", "ayri"], ["ockham.basit", "kural"]],
    mesaj: "İnanç ile aklı ayrı alanlar olarak görüyor, usturayı da yalnızca bir çalışma kuralı sayıyorsunuz: bu ikisi Ockhamlı William'ın kendi tutumuna çok yakın." }
);
Object.assign(window.YAKINLIK, {
  "aquinas.iman-akil": { uyum: { aquinas: 2, ibn_rusd: 1 }, inan: { augustinus: 2, anselmus: 1 }, ayri: { ockham: 2 }, akil: { hume: 1 } },
  "ockham.basit": { evet: { aristoteles: 1 }, kural: { ockham: 2, popper: 1 } },
});
