#!/bin/sh
# DreamHost'a yükle. Kullanım: tools/deploy.sh KULLANICI@SUNUCU
# CSS/JS sürüm etiketini (?v=...) tarih-saatle yeniler, sonra yalnızca değişen dosyaları gönderir.
# Sunucudaki dosyaları silmez (--delete yok); geliştirme dosyalarını göndermez.
set -e
[ -z "$1" ] && { echo "Kullanım: tools/deploy.sh KULLANICI@SUNUCU"; exit 1; }
cd "$(dirname "$0")/.."
V=$(date +%Y%m%d%H%M)
sed -i '' -E "s/\?v=[0-9]+\"/?v=$V\"/g" index.html
echo "Sürüm etiketi: $V"
rsync -avz \
  --exclude tools --exclude test --exclude README.md --exclude PLAN.md --exclude LICENSE \
  --exclude .DS_Store --exclude .git --exclude .gitignore --exclude node_modules \
  ./ "$1:~/felsefe.koraytoksoz.com/"
echo "Yüklendi: https://felsefe.koraytoksoz.com"
