import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useChat, Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FiSend, FiRefreshCw, FiStopCircle } from "react-icons/fi";

// ChatGPTスタイルに合わせてコンポーネントのスタイルを更新
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  gap: 0;

  /* スクロールバーのスタイリング */
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-300) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray-300);
    border-radius: 20px;
  }
`;

// メッセージ共通スタイル
const MessageBase = styled.div`
  width: 100%;
  line-height: var(--line-height-base);
  font-size: var(--font-size-md);

  p,
  ul,
  ol {
    margin-bottom: var(--space-3);
    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.9em;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    background-color: var(--color-gray-100);
  }

  pre {
    margin: var(--space-3) 0;
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
`;

// ユーザーメッセージ
const UserMessage = styled(MessageBase)`
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);
  padding: var(--space-4) calc(var(--space-4) * 2);
`;

// アシスタントメッセージ
const SystemMessage = styled(MessageBase)`
  background-color: var(--color-white);
  color: var(--color-gray-900);
  border-top: 1px solid var(--color-gray-200);
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--space-4) calc(var(--space-4) * 2);
`;

// 時間表示
const TimeDisplay = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  padding: 4px calc(var(--space-4) * 2);
  text-align: ${(props) => props.align || "left"};
`;

// 入力フォームのコンテナ
const InputContainer = styled.div`
  position: relative;
  padding: var(--space-4);
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-white);
`;

// テキスト入力エリア
const TextArea = styled.textarea`
  width: 100%;
  min-height: 44px;
  max-height: 200px;
  padding: var(--space-3) var(--space-10) var(--space-3) var(--space-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  box-sizing: border-box;
  transition: border-color var(--transition-fast) var(--transition-timing),
    box-shadow var(--transition-fast) var(--transition-timing);

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-10);
  }
`;

// 送信ボタン
const SendButton = styled.button`
  position: absolute;
  right: calc(var(--space-4) + var(--space-2));
  bottom: calc(var(--space-4) + 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-white);
  background-color: var(--color-primary);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-fast) var(--transition-timing);

  &:hover {
    background-color: var(--color-primary-dark);
  }

  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;

// 停止ボタン
const StopButton = styled.button`
  position: absolute;
  right: calc(var(--space-4) + var(--space-2));
  bottom: calc(var(--space-4) + 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-white);
  background-color: var(--color-error);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-fast) var(--transition-timing);

  &:hover {
    opacity: 0.9;
  }
`;

// 再生成ボタン
const RegenerateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-3);
  margin-left: auto;
  margin-right: auto;
  padding: var(--space-2) var(--space-4);
  color: var(--color-gray-600);
  background-color: var(--color-gray-100);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast) var(--transition-timing);

  &:hover {
    background-color: var(--color-gray-200);
    color: var(--color-gray-700);
  }
`;

// タイピングインジケーター
const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-md);
  width: fit-content;
  margin-bottom: var(--space-3);

  .dot {
    width: 6px;
    height: 6px;
    background-color: var(--color-gray-500);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-4px);
    }
  }
`;

export default function Chat({ conversationId }: { conversationId?: string }) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload,
    stop,
  } = useChat({
    api: conversationId ? `/api/chat/${conversationId}` : "/api/chat",
    initialInput: inputValue,
    onResponse: () => {
      // サーバーからレスポンスを受け取ったらスクロールダウン
      scrollToBottom();
    },
  });

  // ユーザー入力を処理
  const handleLocalInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleInputChange(e);
    setInputValue(e.target.value);
    adjustTextAreaHeight();
  };

  // ローカルのフォーム送信処理
  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") return;

    handleSubmit(e);
    setInputValue("");

    // テキストエリアの高さをリセット
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "44px";
    }
  };

  // テキストエリアの高さ自動調整
  const adjustTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    textArea.style.height = "44px";
    textArea.style.height = `${Math.min(textArea.scrollHeight, 200)}px`;
  };

  // 最下部へスクロール
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 新しいメッセージが追加されたらスクロールダウン
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enterキーで送信、Shift+Enterで改行
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleLocalSubmit(e);
    }
  };

  return (
    <ChatWrapper>
      <MessagesContainer>
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            {message.role === "user" ? (
              <>
                <UserMessage>{message.content}</UserMessage>
                <TimeDisplay align="right">
                  {new Date().toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TimeDisplay>
              </>
            ) : (
              <>
                <SystemMessage>
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>

                  {index === messages.length - 1 &&
                    message.role === "assistant" && (
                      <RegenerateButton onClick={reload}>
                        <FiRefreshCw size={14} />
                        再生成
                      </RegenerateButton>
                    )}
                </SystemMessage>
                <TimeDisplay>
                  {new Date().toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TimeDisplay>
              </>
            )}
          </React.Fragment>
        ))}

        {isLoading && (
          <SystemMessage>
            <TypingIndicator>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </TypingIndicator>
          </SystemMessage>
        )}

        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <form onSubmit={handleLocalSubmit}>
          <TextArea
            ref={textAreaRef}
            value={input}
            onChange={handleLocalInputChange}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力..."
            rows={1}
          />

          {isLoading ? (
            <StopButton type="button" onClick={stop}>
              <FiStopCircle size={16} />
            </StopButton>
          ) : (
            <SendButton type="submit" disabled={!input.trim()}>
              <FiSend size={16} />
            </SendButton>
          )}
        </form>
      </InputContainer>
    </ChatWrapper>
  );
}
