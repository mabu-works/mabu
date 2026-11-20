# まぶ（Mabu）個人サイト

クリエイター「まぶ」の個人ポートフォリオサイトです。作った Web サービスの一覧、運営している Discord コミュニティ「まぶ鯖」の紹介、リンク集を1ページにまとめています。

## 構成

- `index.html` — 本体（ヒーロー / About / Webサービス24件のカードグリッド / コミュニティ / その他の開発 / リンク集 / フッター）
- `style.css` — モバイルファースト、`prefers-color-scheme` でダークモード対応
- `app.js` — 最小限の JS（フッターの年表示、ページ内リンクのスムーズスクロール補助）
- `sw.js` — Service Worker（同一オリジン GET をキャッシュ、キャッシュ名 `mabu-v4`）
- `manifest.webmanifest` — PWA マニフェスト（name「まぶ（Mabu）個人サイト」、short_name「まぶ」、standalone）
- `icons/` — PIL 生成アイコン（角丸の単色背景＋白い「ま」、192 / 512）

## 技術メモ

- ビルド不要の静的サイト。外部リソース（Web フォント・ライブラリ）は使わず、システムの日本語フォントスタックのみで表示します。
- Web サービスのカードは各サービス（`https://<名前>.vercel.app/`、電車の運行情報ページのみ `https://densha.vercel.app/info/`）へ新しいタブでリンクします。
- リンク集: X [@xx_mabu_xx](https://x.com/xx_mabu_xx)、GitHub 個人 [i-mabu](https://github.com/i-mabu)、GitHub org [mabu-works](https://github.com/mabu-works)、GitHub org [mabu-bots](https://github.com/mabu-bots)、GitHub org [aegis-app](https://github.com/aegis-app)。
- コミュニティ「まぶ鯖」: 公式サイト https://mabusaba.vercel.app / 参加リンク https://discord.gg/GKkW4wCAVp / 公式 X [@mabu_saba](https://x.com/mabu_saba)。
