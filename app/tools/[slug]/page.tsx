import { notFound } from "next/navigation";
import { CardGrid } from "@/app/components/generative/card-grid";
import { BarChart } from "@/app/components/generative/bar-chart";
import { Timeline } from "@/app/components/generative/timeline";
import { ProfileCard } from "@/app/components/generative/profile-card";
import { DataTable } from "@/app/components/generative/data-table";
import { StatsGrid } from "@/app/components/generative/stats-grid";
import { StyledList } from "@/app/components/generative/styled-list";
import { ComparisonCard } from "@/app/components/generative/comparison-card";
import { StepsGuide } from "@/app/components/generative/steps-guide";
import { QuoteCard } from "@/app/components/generative/quote-card";
import { copy } from "@/app/lib/ui/copy";

const samples: Record<
  string,
  { title: string; description: string; component: React.ReactNode }
> = {
  cards: {
    title: "カードグリッド",
    description:
      "プロジェクト、作品、おすすめなどをカード形式で表示するサンプルです。",
    component: (
      <CardGrid
        title="おすすめのJavaScriptフレームワーク"
        cards={[
          {
            id: "1",
            title: "React",
            description:
              "宣言的なUIを構築するためのJavaScriptライブラリ。コンポーネントベースで、大規模なSPA開発によく使われます。",
            badges: ["JavaScript", "UIライブラリ", "SPA"],
            links: [{ label: "公式サイト", url: "https://react.dev/" }],
          },
          {
            id: "2",
            title: "Vue.js",
            description:
              "プログレッシブなJavaScriptフレームワーク。学習しやすく、小規模から大規模まで柔軟に対応できます。",
            badges: ["JavaScript", "プログレッシブフレームワーク"],
            links: [{ label: "公式サイト", url: "https://vuejs.org/" }],
          },
          {
            id: "3",
            title: "Next.js",
            description:
              "Reactベースのフルスタックフレームワーク。SSR、SSG、App Routerなどモダンな機能を提供します。",
            badges: ["React", "フルスタック", "SSR"],
            links: [{ label: "公式サイト", url: "https://nextjs.org/" }],
          },
        ]}
      />
    ),
  },
  chart: {
    title: "棒グラフ",
    description:
      "スキル、比較、ランキング、割合などを図で表示するサンプルです。",
    component: (
      <BarChart
        title="人気のプログラミング言語"
        items={[
          { name: "JavaScript", value: 95, subtitle: "Web開発の定番" },
          { name: "TypeScript", value: 85, subtitle: "型安全なJS" },
          { name: "Python", value: 88, subtitle: "AI・データ分析" },
          { name: "Rust", value: 72, subtitle: "システムプログラミング" },
        ]}
      />
    ),
  },
  timeline: {
    title: "タイムライン",
    description:
      "経歴、履歴、年表、イベントなどを時系列で表示するサンプルです。",
    component: (
      <Timeline
        title="Reactの歴史"
        items={[
          {
            title: "React 0.3.0 リリース",
            subtitle: "2013年 - Meta",
            points: ["初のオープンソースリリース", "コンポーネントベースのUI"],
          },
          {
            title: "React 16 リリース",
            subtitle: "2017年",
            points: ["Fiber アーキテクチャ", "Hooks の前兆"],
          },
          {
            title: "React 18 リリース",
            subtitle: "2022年",
            points: ["Concurrent レンダリング", "Automatic Batching"],
          },
        ]}
      />
    ),
  },
  profile: {
    title: "プロフィールカード",
    description:
      "連絡先、プロフィール、問い合わせ先などを表示するサンプルです。",
    component: (
      <ProfileCard
        name="山田 太郎"
        role="フロントエンドエンジニア"
        summary="React と TypeScript を中心に、モダンなWebアプリケーション開発を得意としています。アクセシビリティとパフォーマンスにこだわった設計を心がけています。"
        links={[
          { label: "GitHub", url: "https://github.com" },
          { label: "Portfolio", url: "https://example.com" },
        ]}
      />
    ),
  },
  table: {
    title: "データテーブル",
    description:
      "表、一覧、データ、天気などを表形式で表示するサンプルです。",
    component: (
      <DataTable
        title="中野区の週間降水量（例）"
        columns={["日付", "降水量 (mm)", "天気"]}
        rows={[
          ["2/1", 0, "晴れ"],
          ["2/2", 2.5, "曇り"],
          ["2/3", 15, "雨"],
          ["2/4", 0, "晴れ"],
          ["2/5", 8, "雨"],
        ]}
      />
    ),
  },
  stats: {
    title: "指標グリッド",
    description:
      "サマリー、指標、KPI、数値のまとめを表示するサンプルです。",
    component: (
      <StatsGrid
        title="TypeScriptの主なメリット"
        items={[
          { label: "型安全性", value: "高" },
          { label: "エディタ補完", value: "優秀" },
          { label: "リファクタ容易性", value: "◎" },
          { label: "学習コスト", value: "中" },
        ]}
      />
    ),
  },
  list: {
    title: "スタイル付きリスト",
    description:
      "一覧、箇条書き、チェックリストなどを表示するサンプルです。",
    component: (
      <StyledList
        title="Web開発のベストプラクティス"
        items={[
          "セマンティックHTMLを使う",
          "アクセシビリティを考慮する",
          "モバイルファーストで設計する",
          "パフォーマンスを最適化する",
          "セキュリティを意識する",
        ]}
        style="checklist"
      />
    ),
  },
  comparison: {
    title: "比較カード",
    description:
      "2つ以上の比較、メリット・デメリットを表示するサンプルです。",
    component: (
      <ComparisonCard
        title="Next.js vs Remix"
        items={[
          {
            name: "Next.js",
            pros: [
              "豊富なエコシステム",
              "Vercelとの統合",
              "App Routerでの進化",
            ],
            cons: ["学習曲線がやや急"],
          },
          {
            name: "Remix",
            pros: [
              "Web標準に忠実",
              "優れたデータローディング",
              "フォームネイティブ",
            ],
            cons: ["エコシステムが小さい"],
          },
        ]}
      />
    ),
  },
  steps: {
    title: "手順ガイド",
    description:
      "手順、ステップ、やり方などの流れを表示するサンプルです。",
    component: (
      <StepsGuide
        title="効率的な開発の手順"
        steps={[
          {
            step: 1,
            title: "要件を明確にする",
            description:
              "何を実現したいか、誰のための機能かを整理します。",
          },
          {
            step: 2,
            title: "設計を行う",
            description:
              "コンポーネント構成やデータフローを設計します。",
          },
          {
            step: 3,
            title: "実装とテスト",
            description:
              "小さな単位で実装し、それぞれをテストします。",
          },
        ]}
      />
    ),
  },
  quote: {
    title: "引用カード",
    description:
      "名言、メッセージ、ポイント、一言を強調表示するサンプルです。",
    component: (
      <div className="space-y-4">
        <QuoteCard
          text="シンプルさは究極の洗練である。"
          source="レオナルド・ダ・ヴィンチ"
        />
        <QuoteCard
          text="良いコードは、それ自体が最良のドキュメントである。"
          source="Steve McConnell"
          variant="info"
        />
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return copy.tools.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sample = samples[slug];
  const toolItem = copy.tools.items.find((item) => item.slug === slug);
  if (!sample || !toolItem) return { title: "サンプル | genUIAI" };
  return {
    title: `${toolItem.name} サンプル | genUIAI`,
    description: toolItem.description,
  };
}

export default async function ToolSamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sample = samples[slug];
  const toolItem = copy.tools.items.find((item) => item.slug === slug);

  if (!sample || !toolItem) {
    notFound();
  }

  return (
    <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-2">
            {toolItem.name}
          </h1>
          <p className="text-muted-foreground">{toolItem.description}</p>
        </div>

        <div className="space-y-6">{sample.component}</div>
      </div>
    </main>
  );
}
