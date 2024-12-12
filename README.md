生成AIは利用せず学習

log

ver 2^

```
npm install msw@latest --save-dev
```

page.tsx にてハンドラーでモックしたリクエストをフェッチしてみる

```
export default async function Home() {
    await fetch("https://example.com/hello")
    .then((res) => res.json())
    .then((data) => console.log("data", data));

    return <></>;
}
```

next.js13 で msw が使えない可能性があるので、（公式も言及）アップグレードする（15 に）

```
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

完了

--

jsonplaceholder でトライ

何をテストするのか->
loading status
500
404
200
(本リポジトリ)

今後

```
ユーザーイベント（ボタン押下等）→データ取得→データ加工→データ表示までのE2E？テスト
```

```
モックデータと本番 API のデータ整合性を保つようにする仕組み作り(モックデータを API に揃える)
```

```
テストサーバーハンドラーの管理しやすいアーキテクチャ
```

```
デプロイ時（プロダクション）に無駄なテスト用の処理が走らないか確認
```

use  
https://mswjs.io/docs/api/setup-server/use#one-time-override

use (Request を検知し、モックを指定できる。資料が古いが、挙動は変わっていない様子)

https://v1.mswjs.io/docs/api/setup-server/use

mocking response (モックの対象が少ない場合、シンプルめで以下を参考にモックを行う)  
https://mswjs.io/docs/basics/mocking-responses/

setup server （service worker ではない。node.js による別サーバーが用意できる →ssr に対応？setupworker はブラウザからのリクエスト処理のインターセプトで使える。next.js15 ではサーバーアクションを使うのが一般的な気がするので出番は少なくなるかもしれない？）  
https://mswjs.io/docs/api/setup-server/

以下サイトの手順よりスタート
https://zenn.dev/kattsuuya/articles/2795cc3fa80412  
（テスト目的では全 request をインターセプトしなくても良かったため、Instrumentation を飛ばして OK、テスト用サーバーの起動もテストファイルで行うようにした）
