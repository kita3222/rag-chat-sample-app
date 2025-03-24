import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ChatHistory from "./ChatHistory";

const meta = {
  title: "Features/RAG Chat/ChatHistory",
  component: ChatHistory,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    messages: {
      control: { type: "object" },
      description: "メッセージの配列",
    },
    isLoading: {
      control: "boolean",
      description: "ローディング状態",
    },
    hasError: {
      control: "boolean",
      description: "エラー状態",
    },
  },
} satisfies Meta<typeof ChatHistory>;

export default meta;
type Story = StoryObj<typeof ChatHistory>;

// サンプルメッセージ定義
const sampleMessages = [
  {
    id: "1",
    type: "user",
    content: "RAGとは何ですか？",
    timestamp: "2023-05-15T10:12:00Z",
  },
  {
    id: "2",
    type: "assistant",
    content:
      "RAG（Retrieval Augmented Generation）は、言語モデルが生成する回答の品質と正確性を向上させるために、外部知識源からの情報検索を組み合わせたアプローチです。\n\nRAGは以下のステップで動作します：\n\n1. ユーザークエリを受け取る\n2. 関連する情報を外部データソースから検索する\n3. 検索された情報を言語モデルの入力に追加する\n4. 言語モデルが拡張された情報を基に回答を生成する\n\nこのアプローチにより、最新の情報や特定のドメイン知識を含んだ、より正確な回答が可能になります。",
    timestamp: "2023-05-15T10:12:30Z",
  },
  {
    id: "3",
    type: "user",
    content: "RAGシステムの主要なコンポーネントは何ですか？",
    timestamp: "2023-05-15T10:13:15Z",
  },
  {
    id: "4",
    type: "assistant",
    content:
      "RAGシステムの主要なコンポーネントは以下の通りです：\n\n1. **ドキュメントインデックス**：検索対象となる文書やデータのコレクション。通常、ベクトルデータベースとして実装され、効率的な類似性検索が可能です。\n\n2. **検索エンジン**：ユーザークエリに基づいて、最も関連性の高いドキュメントを取得するコンポーネント。セマンティック検索技術を活用して、意味的に関連する情報を検索します。\n\n3. **埋め込みモデル**：テキストをベクトル表現に変換するためのモデル。クエリとドキュメントの両方を同じベクトル空間に埋め込みます。\n\n4. **言語モデル（LLM）**：検索結果とユーザークエリを基に、最終的な応答を生成するモデル。\n\n5. **プロンプトエンジン**：検索結果をユーザークエリと効果的に組み合わせ、言語モデルに送信するためのコンポーネント。\n\nこれらのコンポーネントが連携して、ユーザーの質問に対する情報に基づいた回答を生成します。",
    timestamp: "2023-05-15T10:13:45Z",
  },
];

export const Default: Story = {
  args: {
    messages: sampleMessages,
  },
};

export const EmptyHistory: Story = {
  args: {
    messages: [],
  },
};

export const Loading: Story = {
  args: {
    messages: sampleMessages,
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    messages: [
      ...sampleMessages,
      {
        id: "5",
        type: "user",
        content: "RAGシステムの利点を教えてください",
        timestamp: "2023-05-15T10:15:00Z",
      },
    ],
    hasError: true,
  },
};

export const LongConversation: Story = {
  args: {
    messages: [
      ...sampleMessages,
      {
        id: "5",
        type: "user",
        content: "RAGの利点と制限は何ですか？",
        timestamp: "2023-05-15T10:15:00Z",
      },
      {
        id: "6",
        type: "assistant",
        content:
          "### RAGの利点：\n\n1. **知識の最新性**：事前学習モデルの知識カットオフ日以降の情報にアクセスできます\n\n2. **情報源の透明性**：回答の根拠となった情報源を明示できます\n\n3. **ドメイン特化**：特定分野の専門的な情報や企業固有の知識を活用できます\n\n4. **幻覚の削減**：根拠に基づいた回答生成で、AIが事実と異なる情報を生成する「幻覚」を減らせます\n\n5. **カスタマイズ性**：組織の要件に合わせて情報源を調整できます\n\n### RAGの制限：\n\n1. **検索品質への依存**：検索エンジンが関連情報を見つけられない場合、回答品質が低下します\n\n2. **長文処理の課題**：言語モデルのコンテキスト窓サイズに制限があり、大量の検索結果を処理できない場合があります\n\n3. **情報統合の複雑さ**：複数の情報源から一貫した回答を生成するのが難しい場合があります\n\n4. **計算リソース**：検索と生成の両方を実行するため、従来のLLMアプリケーションより計算コストが高くなります\n\n5. **データ品質依存**：インデックスのデータ品質が低いと、回答の品質も低下します",
        timestamp: "2023-05-15T10:15:30Z",
      },
      {
        id: "7",
        type: "user",
        content:
          "このアプリケーションではどのような埋め込みモデルを使用していますか？",
        timestamp: "2023-05-15T10:16:15Z",
      },
      {
        id: "8",
        type: "assistant",
        content:
          "このアプリケーションでは、OpenAIの「text-embedding-ada-002」埋め込みモデルを使用しています。このモデルは以下の特徴を持っています：\n\n- 1536次元のベクトル表現を生成\n- テキストの意味を効率的に捉える能力が高い\n- 多言語対応（英語以外の言語でも効果的）\n- コスト効率が良く、大量のテキスト埋め込みに適している\n\n埋め込みモデルはユーザークエリとドキュメントの両方を同じベクトル空間に変換し、セマンティック検索を可能にする重要なコンポーネントです。「text-embedding-ada-002」は、その精度とコストのバランスから、RAGアプリケーションで広く使用されています。",
        timestamp: "2023-05-15T10:16:45Z",
      },
      {
        id: "9",
        type: "user",
        content:
          "このRAGアプリケーションのベクトルデータベースについて教えてください。",
        timestamp: "2023-05-15T10:17:30Z",
      },
      {
        id: "10",
        type: "assistant",
        content:
          "このRAGアプリケーションでは、ベクトルデータベースとして**Pinecone**を使用しています。\n\n**Pineconeの主な特徴：**\n\n1. **高速な類似性検索**: 数十億のベクトルからミリ秒単位で高次元ベクトルの近傍検索が可能\n\n2. **スケーラビリティ**: 大規模なデータセットにも対応し、需要に応じて自動的にスケーリング\n\n3. **リアルタイム更新**: インデックスへのデータ追加・更新・削除をリアルタイムで実行可能\n\n4. **持続性**: データの耐久性を確保し、システム障害からの回復機能を提供\n\n5. **メタデータフィルタリング**: ベクトル検索と同時にメタデータによるフィルタリングが可能\n\n6. **クラウドホスティング**: マネージドサービスとして提供され、運用管理の負担が少ない\n\n当アプリケーションでは、ドキュメントをチャンク（小さな断片）に分割し、各チャンクを埋め込みベクトルに変換して Pinecone に格納しています。ユーザークエリも同様に埋め込みベクトルに変換し、コサイン類似度を使用して最も関連性の高いドキュメントチャンクを検索します。",
        timestamp: "2023-05-15T10:18:00Z",
      },
    ],
  },
};
