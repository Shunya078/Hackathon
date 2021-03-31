- 演算子式
  - 演算子には実行優先順位がある <-知らなかった、、、
  [優先順位、参考：https://docs.ruby-lang.org/ja/2.6.0/doc/spec=2foperator.html]
  
  - 多重代入
    - 左辺の各式はそれぞれ代入可能である必要がある
      - 右辺の方が多い場合
        - 残りの要素は無視される
      - 右辺が1つの場合
        - 配列として入れられるが、左辺の方が多い場合はnilが入る
    - 変数の前に*をつけると、対応する余った要素が配列として代入される

  - 条件としての範囲式
    - 2.6.0 ~ 2.6.3では使用できなくなっている
    - 2つの式を..と...で並べると、それぞれの条件を超えた後に新たな次の条件を評価する
      - ..と...の違いは..だと1つ目の式が真になると、初期条件まで戻る
  
  - 条件演算子
    - 式1 ? 式2 : 式3 <- 三項演算子
    - 式1がtrueだと式2、falseだと式3を実行する

- 制御構造
  - Rubyではif - elsifで返す
  - unlessはifと逆の処理で偽だったら通す <- ifの方がよく使う印象。
  - case文
    - 1つの式に対する一致判定を行う、when節で指定された値と最初の式を比較する
  
  - forでは配列要素を複数個ずつ取得しながらループはできない <- [1,2,3]とおいた時に1,2でとってこれない、という意
  - breakでは内側のループを抜け出す
    - while,until,for実行中にループを抜ける