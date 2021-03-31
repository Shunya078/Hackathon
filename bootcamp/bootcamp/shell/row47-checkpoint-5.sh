#!/bin/sh
# 各コマンドの使用説明については bootcamp > log > 202009 > 20200902.md に記載

# 実際に動いているプロセスを全て出力
ps -a

# コロナの感染者数を取得できるエンドポイントを実際にcurlで叩いてみてデータを取得できるか確認してみた
curl -v 'https://covid19-japan-web-api.now.sh/api/v1/total?predict=true' -H "Content-Type: application/json"

# 実行中プロセスのうちpidで指定したプロセスのCPU利用率を表示する
top -pid 85355

# row18-echo.shファイルからechoの入った行を検索、大文字小文字の区別はなし
grep -i echo row18-echo.sh

# row18-echo.shのファイルの最終行から3行を出力
tail -n 3 row18-echo.sh

# outディレクトリからdir-とついたファイルを検索
find ./out -name dir-*

# row47-checkpoint-5.shのパーミッションを「実行可能」に変更
chmod +x row47-checkpoint-5.sh

# row47-checkpoint-5.shの所有者を確認したのち、chownコマンドにてhoge(ユーザー)とfuga(グループ)に所有者を変更
ls -l row47-checkpoint-5.sh && chown -v hoge:fuga row47-checkpoint-5.sh

# row47-checkpoint-5.shの所有者を確認しつつ、chownコマンドにてhoge(ユーザー)とfuga(グループ)に所有者を変更
ls -l row47-checkpoint-5.sh & chown -v hoge:fuga row47-checkpoint-5.sh