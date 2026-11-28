# まぶ（Mabu）個人サイト

クリエイター「まぶ」の個人ポートフォリオサイトです。

| 項目 | 内容 |
|---|---|
| バージョン | v1.0.0 |
| 状態 | 公開中 |
| 公開先 | https://mabu.vercel.app |
| 実装 | Next.js（App Router）+ TypeScript、静的エクスポート、PWA |
| 更新履歴 | [CHANGELOG.md](CHANGELOG.md) |

## 📖 概要

作った Web サービスの一覧、運営している Discord コミュニティ「まぶ鯖」の紹介、リンク集を1ページにまとめています。2026-11-28 に Next.js で作り直しました（同日の静的 HTML 版 v1.0.0 を置き換える再実装）。サイト全体にアニメーションと動きを多用した演出（背景のオーロラと粒子、ヒーローの登場演出とカウントアップ、マーキー、スクロール連動の出現、カードのチルトとスポットライトなど）は、静的版からそのまま引き継いでいます。設計の詳細は [DESIGN.md](DESIGN.md) を参照してください。

## 📋 技術メモ

- Next.js の静的エクスポート（`output: "export"`）でビルドし、Vercel に静的サイトとして配信します。外部リソース（Web フォント・ライブラリ）は使わず、システムの日本語フォントスタックのみで表示します。
- Web サービスのカード（24件・4カテゴリ）は `lib/services.ts` のデータが正本です。各サービス（`https://<名前>.vercel.app/`、電車の運行情報ページのみ `https://densha.vercel.app/info/`）へ新しいタブでリンクします。検索ボックスとカテゴリチップで絞り込めます。
- お知らせは `public/news.json`（そのまま配信される正本）をブラウザ側で読み込み、新しい順に直近5件まで表示します。
- リンク集: X [@xx_mabu_xx](https://x.com/xx_mabu_xx)、GitHub 個人 [i-mabu](https://github.com/i-mabu)、GitHub org [mabu-works](https://github.com/mabu-works)、GitHub org [mabu-bots](https://github.com/mabu-bots)、GitHub org [aegis-app](https://github.com/aegis-app)。
- コミュニティ「まぶ鯖」: 公式サイト https://mabusaba.vercel.app / 参加リンク https://discord.gg/GKkW4wCAVp / 公式 X [@mabu_saba](https://x.com/mabu_saba)。
- テーマはダーク／ライトの手動切り替え（localStorage の `mabu-theme` に保存、静的版と互換）。`prefers-reduced-motion` 環境では演出を止め、内容を最初から表示します。

## 📁 ファイル構成

- `app/` — App Router のレイアウトとページ本体、`globals.css`（テーマ変数とレイアウト、アニメーション演出の定義）
- `components/` — 背景演出・進捗バー・ヒーロー・マーキー・お知らせ・サービス一覧などの React コンポーネント（演出はクライアントコンポーネントで実装）
- `lib/` — サービスカタログと絞り込み、お知らせ整形、テーマ解決の純粋ロジックと、出現演出・モーション設定のフック
- `tests/` — 純粋ロジックのテスト（Vitest）
- `public/news.json` — お知らせデータ（正本）
- `public/sw.js` — Service Worker（同一オリジン GET をキャッシュ、キャッシュ名 `mabu-next-v1`）
- `public/manifest.webmanifest` — PWA マニフェスト（name「まぶ（Mabu）個人サイト」、short_name「まぶ」、standalone）
- `public/icons/` — アイコン（角丸の単色背景＋白い「ま」、192 / 512）

## 🚀 開発とデプロイ

```bash
npm ci
npm run dev     # 開発サーバー
npm test        # テスト
npm run build   # 静的エクスポート（out/ に出力）
```

Vercel へ CLI デプロイのみ（Git 連携なし）。プロジェクトディレクトリで `vercel deploy --prod` を実行します。
