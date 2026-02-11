/**
 * UI copy - 日本語
 * Generative UI Demo 用
 */

export const copy = {
  sidebar: {
    title: "Generative UI Demo",
    description:
      "様々なプロンプトを試して、AIが動的に生成するUIを体験できます。カード・チャート・表・比較など、色んなUIがストリーミングで表示されます。",
    quickPrompts: "クイックプロンプト",
    newChat: "新規チャット",
    footer: "Next.js, AI SDK & Vercel で構築",
  },
  header: {
    navLabel: "メインナビゲーション",
    menuOpen: "メニューを開く",
    menu: "メニュー",
    toolsList: "一覧ページ",
    mobileTitle: "genUIAI",
  },
  toolsNav: {
    label: "ナビゲーション",
  },
  layout: {
    skipToContent: "本文へスキップ",
  },
  prompts: [
    "おすすめのフレームワークをカードで",
    "人気のプログラミング言語をチャートで",
    "言語の割合を円グラフで",
    "Reactの歴史をタイムラインで",
    "Next.js と Remix を比較して",
    "効率的な開発の手順を",
    "Web開発のベストプラクティス5つ",
    "TypeScriptのメリットを指標で",
    "重要なメッセージを一言で",
  ] as const,
  searchPrompts: [
    "ビットコイン価格を調べてチャートで",
    "主要仮想通貨の時価総額を円グラフで",
    "今日の主要ニュースを表で",
    "最新のReactの情報をカードで",
    "仮想通貨の時価総額を比較して",
    "Vercelの最新動向をまとめて",
    "主要株価を指標で教えて",
  ] as const,
  toolMode: {
    single: "シングル（1回）",
    multiple: "複数（複数回）",
    label: "ツール呼び出し",
    singleDesc: "ツールを1回のみ呼び出し",
    multipleDesc: "ツールを複数回呼び出し可能",
  },
  searchMode: {
    label: "モード",
    ui: "UI生成",
    search: "検索+UI",
    uiDesc: "カード・チャートなどUIを生成（知識ベース）",
    searchDesc: "最新情報を検索してUIに反映（株価・ニュース→チャート等）",
  },
  model: {
    label: "モデル",
    ariaLabel: "使用するAIモデルを選択",
  },
  chat: {
    title: "Generative UI Demo",
    emptyState:
      "チャットで質問すると、AI がカード・チャート・表・比較など様々なUIを動的に生成します。自由にプロンプトを試してください。",
    emptyStateSearch:
      "検索モードでは、最新情報を検索してそのデータをチャート・表などUIに反映します。株価・ニュース・技術動向などを試してください。",
    placeholder: "カード・チャート・表など、試したいプロンプトを入力…",
    placeholderSearch: "ニュース・株価・URLの要約など、検索したい内容を入力…",
    send: "送信",
    sending: "送信中…",
    inputLabel: "質問を入力",
    newChat: "新規チャット",
    startPrompt: "下のプロンプトを選ぶか、自由に質問を入力してください",
    startPromptSearch: "下のプロンプトを選ぶか、検索したい内容を入力してください",
    quotaError:
      "リクエストが多すぎます。無料枠の制限に達しました。約1分後に再試行してください。",
    quotaErrorRetryIn: (seconds: number) =>
      `リクエストが多すぎます。約${Math.ceil(seconds)}秒後に再試行してください。`,
    quotaCountdown: (seconds: number) =>
      `あと${seconds}秒で再試行できます`,
    quotaRetryReady: "再試行できます",
  },
  message: {
    you: "あなた",
    assistant: "アシスタント",
  },
  streaming: {
    thinking: "考え中…",
  },
  phase: {
    searching: "検索中…",
    generatingUi: "UI生成中…",
    default: "処理中…",
  },
  toolLoading: {
    googleSearch: "検索中…",
    urlContext: "URL取得中…",
    showCards: "カードを生成中…",
    showChart: "チャートを生成中…",
    showTimeline: "タイムラインを生成中…",
    showProfile: "プロフィールを生成中…",
    showTable: "表を生成中…",
    showStats: "指標を生成中…",
    showList: "リストを生成中…",
    showComparison: "比較を生成中…",
    showSteps: "手順を生成中…",
    showQuote: "引用を生成中…",
    default: "生成中…",
  },
  toolError: "生成中にエラーが発生しました",
  themeToggle: {
    dark: "ダーク",
    light: "ライト",
    ariaLabel: (themeLabel: string) => `${themeLabel}モードに切り替える`,
  },
  contact: {
    title: "連絡先",
    email: "メール",
    website: "Web",
    emailMe: "メールを送る",
  },
  experience: {
    title: "経験",
  },
  githubRepos: {
    title: "GitHub リポジトリ",
    open: "開く",
  },
  projectCard: {
    noMatch: "該当なし",
    github: "GitHub",
    liveDemo: "デモを見る",
  },
  skillChart: {
    frontend: "フロントエンド",
    backend: "バックエンド",
    cloud: "クラウド",
    levelSuffix: "%",
    years: "年",
  },
  tools: {
    title: "生成できるUI一覧",
    description:
      "チャットでプロンプトを送ると、AIが以下のいずれかのUIを動的に生成します。",
    linkLabel: "生成できるUI一覧",
    backToChat: "チャットに戻る",
    backToList: "一覧に戻る",
    sampleLabel: "サンプルを見る",
    items: [
      {
        slug: "cards",
        name: "カードグリッド",
        description: "プロジェクト、作品、おすすめなどをカード形式で表示",
        example: "おすすめのフレームワークをカードで",
      },
      {
        slug: "chart",
        name: "チャート（棒・折れ線・エリア・円）",
        description: "棒・折れ線・エリア・円グラフ。比較、推移、構成比などを表示",
        example: "人気のプログラミング言語をチャートで",
      },
      {
        slug: "timeline",
        name: "タイムライン",
        description: "経歴、履歴、年表、イベントなどを時系列で表示",
        example: "Reactの歴史をタイムラインで",
      },
      {
        slug: "profile",
        name: "プロフィールカード",
        description: "連絡先、プロフィール、問い合わせ先などを表示",
        example: "○○さんのプロフィールを表示して",
      },
      {
        slug: "table",
        name: "データテーブル",
        description: "表、一覧、データ、天気などを表形式で表示",
        example: "中野区の降水量を表で返して",
      },
      {
        slug: "stats",
        name: "指標グリッド",
        description: "サマリー、指標、KPI、数値のまとめを表示",
        example: "TypeScriptのメリットを指標で",
      },
      {
        slug: "list",
        name: "スタイル付きリスト",
        description: "一覧、箇条書き、チェックリストなどを表示",
        example: "Web開発のベストプラクティス5つ",
      },
      {
        slug: "comparison",
        name: "比較カード",
        description: "2つ以上の比較、メリット・デメリットを表示",
        example: "Next.js と Remix を比較して",
      },
      {
        slug: "steps",
        name: "手順ガイド",
        description: "手順、ステップ、やり方などの流れを表示",
        example: "効率的な開発の手順を",
      },
      {
        slug: "quote",
        name: "引用カード",
        description: "名言、メッセージ、ポイント、一言を強調表示",
        example: "重要なメッセージを一言で",
      },
    ] as const,
  },
} as const;
