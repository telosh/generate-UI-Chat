# Agent Guidelines for genUIAI

## プロジェクト概要

**genUIAI** は **AI SDK による Generative UI の検証・デモ用サイト**です。  
チャットで質問すると、カード・チャート・表・タイムライン・比較・手順など様々なUIがストリーミングで動的生成されます。ポートフォリオに限定せず、色んなプロンプトを試せます。

### 技術スタック

- Next.js 16 App Router / TypeScript
- AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- Tailwind CSS v4 + shadcn/ui (Radix)
- framer-motion / next-themes
- Upstash Redis (レート制限)

### アーキテクチャ

```
app/
├── api/chat/        # Edge runtime, streaming UI
├── components/
│   ├── chat/        # ChatInput, ChatMessage, SuggestedPrompts
│   ├── generative/ # CardGrid, BarChart, Timeline, ProfileCard, DataTable, StatsGrid, StyledList, ComparisonCard, StepsGuide, QuoteCard
│   └── layout/      # AppHeader, ChatLayout
├── lib/
│   ├── ai/          # system-prompt, tools (汎用ツール)
│   ├── ui/          # copy.ts (UI文言統一)
│   └── ratelimit.ts
```

### 動作確認済み機能

- チャット・クイックプロンプト → カード・チャート・表・比較など多様なUIの生成
- ダーク/ライトモード切替（スムーズなトランジション）
- メニュー: ドロップダウン（新規チャット・ツール一覧・各UIサンプル）
- レート制限: Upstash Redis（`RATE_LIMIT_REQUESTS`, `RATE_LIMIT_WINDOW` で設定可能）

---

## UI ガイドライン

Vercel Web Interface Guidelines に準拠: https://vercel.com/design/guidelines

### Interactions

- Keyboard: 全キーボード操作対応、可視フォーカスリング
- Targets: モバイル ≥44px、入力 ≥16px
- Placeholders: `…` で終端、例示パターン

### Forms

- Enter で送信、ローディング時は「送信中…」などラベル維持
- 送信開始までボタン有効、送信中は無効化

### Content & Accessibility

- Skip to content、h1–h6 階層
- アイコンボタンは `aria-label`
- 空/エラー状態の設計

### Layout

- メニュー: ヘッダーのドロップダウン
- スクロール: スクロールバー非表示（サイト全体）

### テーマ

- `theme-color` メタ、`prefers-reduced-motion` 対応
- 切り替え時は 0.2s トランジション

### 言語

- UI 全文: `app/lib/ui/copy.ts` で管理
- 日本語をデフォルト

---

## Performance

- アニメーション: `transform`, `opacity` のみ
- `transition: all` 禁止
- `next/image` は明示的 width/height（CLS 防止）
- ミドルウェアで `fetch` 禁止

---

## 関連リソース

- `.cursor/rules/ui-components.mdc` — コンポーネントのパターン
- `.cursor/rules/vercel-performance.mdc` — パフォーマンス
- `.cursor/skills/ui-development/SKILL.md` — UI 開発
- `.cursor/skills/vercel-performance/SKILL.md` — キャッシュ・画像
- `.cursor/skills/ai-sdk-chat/SKILL.md` — AI SDK・チャット・ツール
- `.cursor/skills/nextjs-app-router/SKILL.md` — App Router・ルーティング
- `.cursor/skills/shadcn-radix/SKILL.md` — shadcn/ui・Radix コンポーネント
