# spellcast-solver

[SpellCast](https://discord.fandom.com/wiki/SpellCast) (Discord activity) の指定された盤面における、最高点の単語を求めるデスクトップアプリです。

## Overview

<img src="https://github.com/parad8816/spellcast-solver/blob/master/spellcast-solver.png" alt="Picture" width="50%">

## How to Use

1. ゲーム内の盤面に従って、空欄に文字を入力します。
2. `DL (=Double Letter)` / `TL (=Triple Letter)` / `DW (=Double Word)` 付きの文字がある場合、そのマスを選択し、下部の `Set` ボタンを押して設定します。
3. Swapできる回数 (ジェム×3) を指定します。
4. `Analyze!` を押して、少し待ちます。
5. 右側に、各Swap数に対応する最高点の単語が表示されます。`◀️` ボタンを押すと、辿るべき経路が分かります。

## Get Started

リポジトリをクローンし、依存パッケージをインストールします。
```
git clone https://github.com/parad8816/spellcast-solver.git
cd spellcast-solver
npm install
```

アプリを (開発者モードで) 起動します。
```
npm start
```

アプリをパッケージ化します。
```
npm run package
```

## Credits

- このアプリは[Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)によって作成されました。
  - Copyright (c) 2015-present Electron React Boilerplate<br/>
  - Released under the [MIT License](https://github.com/electron-react-boilerplate/electron-react-boilerplate/blob/main/LICENSE)

- 英単語リストは[wordlist-english](https://github.com/jacksonrayhamilton/wordlist-english)に基づいています。
