npm install msw@latest --save-dev

以下サイトの手順よりスタート
https://zenn.dev/kattsuuya/articles/2795cc3fa80412

page.tsx にてフェッチしてみる

```
export default async function Home() {
await fetch("https://example.com/hello")
.then((res) => res.json())
.then((data) => console.log("data", data));
return <></>;
}
```

next.js13 で msw が使えない可能性が高いため、（公式も言及）アップグレードする（14 に）

```
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

できた

何をテストするのか
loading status
500
404

モックデータと本番 API のデータ整合性を保つようにする(モックデータを API に揃える)
