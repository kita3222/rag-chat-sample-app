import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ChatInput from "./ChatInput";

const meta = {
  title: "Features/RAG Chat/ChatInput",
  component: ChatInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "プレースホルダーテキスト",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
    isLoading: {
      control: "boolean",
      description: "ローディング状態",
    },
    value: {
      control: "text",
      description: "入力値",
    },
    onSubmit: { action: "submitted" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  args: {
    placeholder: "メッセージを入力...",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "メッセージを入力...",
    value: "RAGについて教えてください",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "メッセージを入力...",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    placeholder: "メッセージを入力...",
    isLoading: true,
  },
};

export const Interactive: Story = {
  render: () => {
    // React hooksを使用するためのラッパーコンポーネント
    const InteractiveChatInput = () => {
      const [value, setValue] = React.useState("");
      const [isLoading, setIsLoading] = React.useState(false);
      const [messages, setMessages] = React.useState<
        Array<{ text: string; type: "user" | "system" }>
      >([]);

      const handleSubmit = (text: string) => {
        // メッセージを追加
        setMessages((prev) => [...prev, { text, type: "user" }]);
        setValue("");

        // ローディング状態を設定
        setIsLoading(true);

        // 応答をシミュレート
        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              text: `「${text}」に対する応答です。RAGチャットのデモ応答です。`,
              type: "system",
            },
          ]);
        }, 1500);
      };

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "16px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {messages.length === 0 ? (
              <div style={{ color: "#888", textAlign: "center" }}>
                メッセージを送信してください
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.type === "user" ? "#1a73e8" : "#e1e1e1",
                    color: msg.type === "user" ? "white" : "black",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          <ChatInput
            placeholder="メッセージを入力..."
            value={value}
            onChange={setValue}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      );
    };

    return <InteractiveChatInput />;
  },
};
