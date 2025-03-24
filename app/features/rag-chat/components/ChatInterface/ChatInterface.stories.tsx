import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ChatInterface from "./ChatInterface";

const meta = {
  title: "Features/RAG Chat/ChatInterface",
  component: ChatInterface,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatInterface>;

export default meta;
type Story = StoryObj<typeof ChatInterface>;

export const Default: Story = {
  args: {},
};

export const WithPredefinedMessages: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const ChatInterfaceWithMessages = () => {
      const [messages, setMessages] = React.useState([
        {
          id: "1",
          type: "assistant" as const,
          content:
            "こんにちは！RAGチャットへようこそ。何かお手伝いできることはありますか？",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          id: "2",
          type: "user" as const,
          content: "RAGについて簡単に説明してください。",
          timestamp: new Date(Date.now() - 45000).toISOString(),
        },
        {
          id: "3",
          type: "assistant" as const,
          content:
            "RAG（Retrieval Augmented Generation）は、情報検索と生成AIを組み合わせた技術です。\n\nRAGの基本的な仕組みは以下の通りです：\n\n1. ユーザーが質問を入力\n2. システムが関連ドキュメントをデータベースから検索\n3. 検索結果を元に、AIが回答を生成\n\nこの方法の利点は、AIが自身の知識だけでなく、外部の最新かつ正確な情報源に基づいて回答できることです。特に事実に基づく回答や、AIの訓練データに含まれていない専門的な情報が必要な場合に有効です。",
          timestamp: new Date(Date.now() - 30000).toISOString(),
        },
      ]);
      const [isLoading, setIsLoading] = React.useState(false);

      const handleSubmit = (message: string) => {
        // 新しいユーザーメッセージを追加
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            type: "user" as const,
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);

        // ローディング状態を設定
        setIsLoading(true);

        // AIの応答をシミュレート
        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now() + 1),
              type: "assistant" as const,
              content: `あなたの質問「${message}」に対する応答です。RAGチャットのデモ応答として、この内容がAIによって生成されたと想定してください。`,
              timestamp: new Date().toISOString(),
            },
          ]);
        }, 2000);
      };

      return (
        <ChatInterface
          messages={messages}
          onSendMessage={handleSubmit}
          isLoading={isLoading}
        />
      );
    };

    return <ChatInterfaceWithMessages />;
  },
};

export const DetailedRAGConversation: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const DetailedConversationExample = () => {
      const [messages, setMessages] = React.useState([
        {
          id: "1",
          sender: "system",
          content:
            "こんにちは！RAG対応のAIアシスタントです。どのようなご質問にもお答えします。何かお手伝いできることはありますか？",
          timestamp: new Date("2023-03-24T10:00:00").toISOString(),
        },
        {
          id: "2",
          sender: "user",
          content: "RAGとは何ですか？詳しく教えてください。",
          timestamp: new Date("2023-03-24T10:01:12").toISOString(),
        },
        {
          id: "3",
          sender: "system",
          content:
            "RAG（Retrieval Augmented Generation）は、AIの応答生成能力と外部知識源からの情報検索を組み合わせた手法です。\n\n簡単に言うと、質問を受け取ったとき、次のステップで回答を生成します：\n\n1. 質問内容を分析\n2. 関連する情報を外部データベースから検索\n3. 検索結果を参照しながら、回答を生成\n\nこれにより、AIが学習していない最新の情報や専門的な知識も回答に含めることができます。",
          timestamp: new Date("2023-03-24T10:01:45").toISOString(),
          source: "RAG技術解説書 2023年版",
        },
        {
          id: "4",
          sender: "user",
          content: "なるほど。RAGと通常のAIチャットの違いは何ですか？",
          timestamp: new Date("2023-03-24T10:02:30").toISOString(),
        },
        {
          id: "5",
          sender: "system",
          content:
            "RAGと通常のAIチャット（従来のLLMベースのチャット）の主な違いは次のとおりです：\n\n【情報の新しさ】\n• 通常のAIチャット：学習済みデータの範囲内（通常は訓練時点までの情報）\n• RAG：外部データベースから最新情報を取得可能\n\n【情報の正確性】\n• 通常のAIチャット：時に「幻覚」（事実と異なる情報の生成）が起きる\n• RAG：検索した情報に基づくため、幻覚が減少\n\n【情報の透明性】\n• 通常のAIチャット：情報源の提示が困難\n• RAG：回答の根拠となった情報源を明示できる\n\n【カスタマイズ性】\n• 通常のAIチャット：全ユーザーに同じ知識ベース\n• RAG：組織や目的に特化したデータベースを使用可能",
          timestamp: new Date("2023-03-24T10:03:15").toISOString(),
        },
        {
          id: "6",
          sender: "user",
          content:
            "RAGを実装するにはどうすればいいですか？必要な技術スタックを教えてください。",
          timestamp: new Date("2023-03-24T10:04:00").toISOString(),
        },
        {
          id: "7",
          sender: "system",
          content:
            "RAGを実装するための基本的な技術スタックとステップは以下の通りです：\n\n【必要なコンポーネント】\n\n1. 言語モデル（LLM）\n  • OpenAI GPT、Anthropic Claude、Llama 2などの大規模言語モデル\n  • 自社でホスティングするか、APIを使用\n\n2. ベクトルデータベース\n  • Pinecone、Milvus、Weaviate、Qdrantなど\n  • または単純なケースではFaissやScikit-learn\n\n3. 埋め込み（Embedding）モデル\n  • テキストをベクトル化するためのモデル\n  • OpenAI Embeddings、Sentence-Transformersなど\n\n4. 検索エンジン\n  • ベクトル検索機能\n  • 必要に応じてハイブリッド検索（キーワード＋セマンティック）\n\n【実装ステップ】\n\n1. ドキュメントの収集と前処理\n2. ドキュメントをチャンク（小さな断片）に分割\n3. 各チャンクをベクトル化（埋め込み生成）\n4. ベクトルデータベースにインデックス化\n5. ユーザークエリに対する検索ロジックの実装\n6. 検索結果とクエリを組み合わせてプロンプトを作成\n7. LLMに送信して回答を生成\n\n【フレームワーク】\n\n実装を簡略化するためのフレームワークもあります：\n• LangChain\n• LlamaIndex\n• Haystack\n\nこれらのフレームワークはRAGパイプラインの多くのコンポーネントを簡単に統合できるようにしています。",
          timestamp: new Date("2023-03-24T10:04:45").toISOString(),
        },
        {
          id: "8",
          sender: "user",
          content:
            "素晴らしい説明をありがとう。RAGの実際の応用例にはどのようなものがありますか？",
          timestamp: new Date("2023-03-24T10:05:30").toISOString(),
        },
      ]);
      const [isLoading, setIsLoading] = React.useState(true);

      const handleSubmit = (message: string) => {
        // 新しいユーザーメッセージを追加
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            sender: "user",
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);

        // ローディング状態を設定
        setIsLoading(true);

        // AIの応答をシミュレート
        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now() + 1),
              sender: "system",
              content:
                "RAGの実際の応用例には以下のようなものがあります：\n\n1. **カスタマーサポート**：企業固有の製品マニュアル、FAQなどを検索して正確な回答を提供\n\n2. **法律・医療支援**：最新の法律文書や医療文献を検索して専門家をサポート\n\n3. **社内ナレッジベース**：企業内の文書、議事録、報告書などから情報を検索して回答\n\n4. **教育支援**：教材や学術論文を基にした質問応答システム\n\n5. **ニュース分析**：最新ニュースソースを検索して時事問題に対応\n\n6. **研究支援**：研究論文を検索して最新の科学的知見を提供\n\n7. **コンテンツ作成**：事実に基づいた記事や報告書の作成支援\n\n8. **パーソナライズされた推薦**：ユーザー固有のドキュメントを基にした推奨\n\nこれらの応用では、RAGが従来の生成AIの限界（古い情報、事実確認の困難さなど）を克服し、より信頼性の高いシステムを実現しています。",
              timestamp: new Date().toISOString(),
              source: "AI応用事例集 2023",
            },
          ]);
        }, 2000);
      };

      return (
        <ChatInterface
          title="RAG Chat デモ"
          messages={messages}
          onSendMessage={handleSubmit}
          isLoading={isLoading}
        />
      );
    };

    return <DetailedConversationExample />;
  },
};

export const EmptyState: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const EmptyChatInterface = () => {
      const [messages, setMessages] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(false);

      const handleSubmit = (message: string) => {
        // 新しいユーザーメッセージを追加
        setMessages((prev: any[]) => [
          ...prev,
          {
            id: String(Date.now()),
            type: "user" as const,
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);

        // ローディング状態を設定
        setIsLoading(true);

        // AIの応答をシミュレート
        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev: any[]) => [
            ...prev,
            {
              id: String(Date.now() + 1),
              type: "assistant" as const,
              content: `あなたの質問「${message}」に対する応答です。RAGチャットのデモ応答として、この内容がAIによって生成されたと想定してください。`,
              timestamp: new Date().toISOString(),
            },
          ]);
        }, 2000);
      };

      return (
        <ChatInterface
          messages={messages}
          onSendMessage={handleSubmit}
          isLoading={isLoading}
        />
      );
    };

    return <EmptyChatInterface />;
  },
};

export const LoadingState: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const LoadingChatInterface = () => {
      const [messages, setMessages] = React.useState([
        {
          id: "1",
          type: "user" as const,
          content: "RAGシステムでは、どのような種類のデータを検索できますか？",
          timestamp: new Date().toISOString(),
        },
      ]);

      return (
        <ChatInterface
          messages={messages}
          onSendMessage={() => {}}
          isLoading={true}
        />
      );
    };

    return <LoadingChatInterface />;
  },
};

export const WithError: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const ErrorChatInterface = () => {
      const [messages, setMessages] = React.useState([
        {
          id: "1",
          type: "user" as const,
          content: "RAGシステムでは、どのような種類のデータを検索できますか？",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
      ]);
      const [hasError, setHasError] = React.useState(true);

      const handleSubmit = (message: string) => {
        // 新しいユーザーメッセージを追加
        setMessages((prev: any[]) => [
          ...prev,
          {
            id: String(Date.now()),
            type: "user" as const,
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);

        // エラー状態をリセット
        setHasError(false);
      };

      return (
        <ChatInterface
          messages={messages}
          onSendMessage={handleSubmit}
          isLoading={false}
          hasError={hasError}
        />
      );
    };

    return <ErrorChatInterface />;
  },
};
