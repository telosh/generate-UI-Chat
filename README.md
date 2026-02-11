## Interactive Generative Resume

Next.js + Vercel + AI SDK で構築した、生成UIベースのポートフォリオです。  
採用担当者が自然言語で質問すると、テキストだけでなくプロジェクトカードやスキル可視化などのUIがストリーミング表示されます。

### 主な機能

- Edge Middleware によるジオロケーション挨拶
- AI SDK (`streamText` + tool calling) による Generative UI
- ダークモード / ライトモード切り替え
- 動的 OGP (`@vercel/og`)
- Upstash レート制限（有効時）

## セットアップ

### 1) Install

```bash
pnpm install
```

### 2) Environment variables

`.env.example` を `.env.local` にコピーして値を設定します。

```bash
cp .env.example .env.local
```

必須:

- `GOOGLE_GENERATIVE_AI_API_KEY`

任意（設定時のみレート制限有効）:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### 3) Run locally

```bash
pnpm dev
```

http://localhost:3000 を開いて動作確認してください。

## Build / Lint

```bash
pnpm lint
pnpm build
```

## Vercel デプロイ

### CLI でデプロイ

```bash
npm i -g vercel
vercel
```

本番反映:

```bash
vercel --prod
```

### Vercel ダッシュボードで設定する環境変数

- `GOOGLE_GENERATIVE_AI_API_KEY` (Required)
- `UPSTASH_REDIS_REST_URL` (Optional)
- `UPSTASH_REDIS_REST_TOKEN` (Optional)

## 技術構成

- Next.js App Router
- TypeScript
- AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- Tailwind CSS v4 + shadcn/ui
- framer-motion
- next-themes
- @vercel/og
- @upstash/ratelimit / @upstash/redis

## Dependency Safety Policy

このプロジェクトは `pnpm` の `minimum-release-age` を有効化して、公開直後のパッケージを避ける設定にしています。

## Commit Quality Gate (Husky)

`husky` + `lint-staged` + `commitlint` + `commitizen(cz-git)` を導入しています。

- `pre-commit`: 変更ファイルの ESLint 自動修正 + TypeScript 型チェック
- `commit-msg`: Conventional Commits 形式の検証
- `pre-push`: `pnpm check` (`lint:strict` + `typecheck` + `build`)

### 推奨コミット手順

```bash
pnpm commit
```

対話形式でコミットメッセージを統一できます。
