import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ChatBubble from "./ChatBubble";

const meta = {
  title: "Features/RAG Chat/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: Object.values(ChatBubble.VARIANTS),
      description: "メッセージのバリアント（ユーザー/システム/リファレンス）",
    },
    state: {
      control: { type: "select" },
      options: Object.values(ChatBubble.STATES),
      description: "メッセージの状態（通常/ローディング/エラー）",
    },
    timestamp: {
      control: "text",
      description: "メッセージのタイムスタンプ",
    },
    source: {
      control: "text",
      description: "情報源（引用元）",
    },
    errorMessage: {
      control: "text",
      description: "エラーメッセージ",
    },
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const UserMessage: Story = {
  args: {
    variant: ChatBubble.VARIANTS.USER,
    children:
      "こんにちは！RAGチャットについて質問があります。どのように使用すればよいですか？",
    timestamp: "2023-03-24T19:12:00",
  },
};

export const SystemMessage: Story = {
  args: {
    variant: ChatBubble.VARIANTS.SYSTEM,
    children:
      "こんにちは！RAG（Retrieval Augmented Generation）チャットへようこそ。このアプリケーションでは、あなたの質問に対して、データベースから関連情報を検索し、それを基に回答を生成します。\n\n質問を入力するだけで、システムが自動的に関連ドキュメントを検索し、その情報を使って回答します。特定のトピックや詳細な質問にも対応できますので、お気軽にお試しください。",
    timestamp: "2023-03-24T19:12:15",
  },
};

export const ReferenceMessage: Story = {
  args: {
    variant: ChatBubble.VARIANTS.REFERENCE,
    children:
      "RAGは検索拡張生成（Retrieval Augmented Generation）の略で、大規模言語モデルの回答生成能力と、外部知識源からの情報検索を組み合わせた手法です。",
    source: "Technical Paper: RAG Overview 2023",
    timestamp: "2023-03-24T19:12:30",
  },
};

export const LoadingState: Story = {
  args: {
    variant: ChatBubble.VARIANTS.SYSTEM,
    state: ChatBubble.STATES.LOADING,
    children: "回答を生成しています",
    timestamp: "2023-03-24T19:12:45",
  },
};

export const ErrorState: Story = {
  args: {
    variant: ChatBubble.VARIANTS.SYSTEM,
    state: ChatBubble.STATES.ERROR,
    children: "回答の生成中にエラーが発生しました",
    errorMessage:
      "サーバーに接続できません。ネットワーク接続を確認してください。",
    timestamp: "2023-03-24T19:13:00",
  },
};

export const Conversation: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
        padding: "20px",
        backgroundColor: "var(--color-gray-50)",
        borderRadius: "8px",
      }}
    >
      <ChatBubble
        variant={ChatBubble.VARIANTS.USER}
        timestamp="2023-03-24T19:12:00"
      >
        RAGとは何ですか？
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.SYSTEM}
        timestamp="2023-03-24T19:12:15"
      >
        RAG（Retrieval Augmented
        Generation）は、情報検索と言語生成を組み合わせた技術です。質問に対して、まず関連する情報をデータベースから検索し、その結果を基に回答を生成します。これにより、最新の情報や特定のドメイン知識を含んだ正確な回答が可能になります。
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.USER}
        timestamp="2023-03-24T19:12:30"
      >
        RAGの主な利点は何ですか？
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.SYSTEM}
        timestamp="2023-03-24T19:12:45"
      >
        RAGの主な利点は以下の通りです： 1.
        最新情報へのアクセス：事前学習済みモデルの知識カットオフ後の情報も提供できます
        2. 情報源の透明性：回答の根拠となる情報源を示すことができます 3.
        特定ドメインへの特化：特定分野の専門知識を容易に組み込めます 4.
        幻覚の減少：根拠に基づいた回答生成により、AI特有の「幻覚」（事実と異なる情報の生成）を減らせます
        5. カスタマイズ性：組織固有のデータを活用した回答が可能です
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.USER}
        timestamp="2023-03-24T19:13:00"
      >
        このアプリケーションではどのようなデータベースを使用していますか？
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.SYSTEM}
        state={ChatBubble.STATES.LOADING}
        timestamp="2023-03-24T19:13:15"
      >
        回答を生成しています
      </ChatBubble>
    </div>
  ),
};

export const DetailedConversation: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "750px",
        padding: "20px",
        backgroundColor: "var(--color-gray-50)",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* 会話開始 */}
      <ChatBubble
        variant={ChatBubble.VARIANTS.SYSTEM}
        timestamp="2023-03-24T10:00:00"
      >
        こんにちは！RAG対応のAIアシスタントです。どのようなご質問にもお答えします。何かお手伝いできることはありますか？
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.USER}
        timestamp="2023-03-24T10:01:12"
      >
        RAGとは何ですか？詳しく教えてください。
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.SYSTEM}
        timestamp="2023-03-24T10:01:45"
      >
        RAG（Retrieval Augmented
        Generation）は、AIの応答生成能力と外部知識源からの情報検索を組み合わせた手法です。
        簡単に言うと、質問を受け取ったとき、次のステップで回答を生成します： 1.
        質問内容を分析 2. 関連する情報を外部データベースから検索 3.
        検索結果を参照しながら、回答を生成
        これにより、AIが学習していない最新の情報や専門的な知識も回答に含めることができます。
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.REFERENCE}
        timestamp="2023-03-24T10:01:46"
        source="RAG技術解説書 2023年版"
      >
        RAG（検索拡張生成）は、大規模言語モデルに外部知識を動的に提供するアーキテクチャであり、回答の正確性と信頼性を向上させる手法として広く採用されています。
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.USER}
        timestamp="2023-03-24T10:02:30"
      >
        なるほど。RAGと通常のAIチャットの違いは何ですか？
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.SYSTEM}
        timestamp="2023-03-24T10:03:15"
      >
        RAGと通常のAIチャット（従来のLLMベースのチャット）の主な違いは次のとおりです：
        【情報の新しさ】 •
        通常のAIチャット：学習済みデータの範囲内（通常は訓練時点までの情報） •
        RAG：外部データベースから最新情報を取得可能 【情報の正確性】 •
        通常のAIチャット：時に「幻覚」（事実と異なる情報の生成）が起きる •
        RAG：検索した情報に基づくため、幻覚が減少 【情報の透明性】 •
        通常のAIチャット：情報源の提示が困難 •
        RAG：回答の根拠となった情報源を明示できる 【カスタマイズ性】 •
        通常のAIチャット：全ユーザーに同じ知識ベース •
        RAG：組織や目的に特化したデータベースを使用可能
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.USER}
        timestamp="2023-03-24T10:04:00"
      >
        RAGを実装するにはどうすればいいですか？必要な技術スタックを教えてください。
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.SYSTEM}
        timestamp="2023-03-24T10:04:45"
      >
        RAGを実装するための基本的な技術スタックとステップは以下の通りです：
        【必要なコンポーネント】 1. 言語モデル（LLM） • OpenAI GPT、Anthropic
        Claude、Llama 2などの大規模言語モデル •
        自社でホスティングするか、APIを使用 2. ベクトルデータベース •
        Pinecone、Milvus、Weaviate、Qdrantなど •
        または単純なケースではFaissやScikit-learn 3. 埋め込み（Embedding）モデル
        • テキストをベクトル化するためのモデル • OpenAI
        Embeddings、Sentence-Transformersなど 4. 検索エンジン • ベクトル検索機能
        • 必要に応じてハイブリッド検索（キーワード＋セマンティック）
        【実装ステップ】 1. ドキュメントの収集と前処理 2.
        ドキュメントをチャンク（小さな断片）に分割 3.
        各チャンクをベクトル化（埋め込み生成） 4.
        ベクトルデータベースにインデックス化 5.
        ユーザークエリに対する検索ロジックの実装 6.
        検索結果とクエリを組み合わせてプロンプトを作成 7.
        LLMに送信して回答を生成 【フレームワーク】
        実装を簡略化するためのフレームワークもあります： • LangChain •
        LlamaIndex • Haystack
        これらのフレームワークはRAGパイプラインの多くのコンポーネントを簡単に統合できるようにしています。
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.USER}
        timestamp="2023-03-24T10:05:30"
      >
        素晴らしい説明をありがとう。RAGの実際の応用例にはどのようなものがありますか？
      </ChatBubble>

      <ChatBubble
        variant={ChatBubble.VARIANTS.SYSTEM}
        state={ChatBubble.STATES.LOADING}
        timestamp="2023-03-24T10:05:45"
      >
        回答を生成しています
      </ChatBubble>
    </div>
  ),
};

export const FormattedContent: Story = {
  args: {
    variant: ChatBubble.VARIANTS.SYSTEM,
    children:
      "# RAGアーキテクチャの概要\n\n## 主要コンポーネント\n\n- **ドキュメントインデックス**: ベクターデータベースに保存された文書\n- **検索エンジン**: 意味的類似性に基づいてドキュメントを検索\n- **言語モデル**: 検索結果を利用して回答を生成\n\n```javascript\nasync function processQuery(query) {\n  // 1. ユーザークエリをベクトル化\n  const queryEmbedding = await embedText(query);\n  \n  // 2. 類似ドキュメントを検索\n  const relevantDocs = await vectorDb.similaritySearch(queryEmbedding);\n  \n  // 3. コンテキストと共に言語モデルに送信\n  const response = await llm.generate(query, relevantDocs);\n  \n  return response;\n}\n```\n\nRAGシステムの効果は、ドキュメントの品質と検索アルゴリズムの精度に大きく依存します。",
    timestamp: "2023-03-24T10:06:30",
  },
};
