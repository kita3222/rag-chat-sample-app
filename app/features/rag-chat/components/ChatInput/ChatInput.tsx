"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import styled from "styled-components";
import Input from "../../../../components/Input/Input";

// 入力コンテナ
const InputContainer = styled.div`
  position: relative;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-white);
`;

// 送信ボタン
const SendButton = styled.button<{ disabled: boolean }>`
  position: absolute;
  right: 10px;
  bottom: 50%;
  transform: translateY(50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.disabled ? "var(--color-gray-200)" : "var(--color-primary)"};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.15s ease-in-out;
  z-index: 2;

  &:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
  }

  &:active:not(:disabled) {
    opacity: 0.9;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// 文字カウンター
const CharCounter = styled.div<{ isNearLimit: boolean; show: boolean }>`
  position: absolute;
  right: 50px;
  bottom: 50%;
  transform: translateY(50%);
  font-size: 12px;
  color: ${(props) =>
    props.isNearLimit ? "var(--color-warning)" : "var(--color-gray-500)"};
  pointer-events: none;
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 0.15s ease-in-out;
  z-index: 2;
`;

// 送信アイコン
const SendIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.5 8L3 14.5V9.5M14.5 8L3 1.5V6.5M14.5 8H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// カスタムスタイル付きInput
const StyledInput = styled(Input)`
  .input-field {
    padding-right: 48px;
  }
`;

interface File {
  name: string;
  size: number;
  type: string;
  // その他ファイルに関する属性
}

interface ChatInputProps {
  onSubmit?: (data: { content: string; files: File[] }) => void;
  onChange?: (value: string) => void;
  value?: string;
  isSubmitting?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  showCounter?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  onChange,
  value,
  isSubmitting = false,
  isLoading = false,
  disabled = false,
  placeholder = "メッセージを入力...",
  maxLength = 4000,
  showCounter = true,
}) => {
  const [message, setMessage] = useState<string>(value || "");
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 外部で管理される値が変更された場合に内部状態を更新
  useEffect(() => {
    if (value !== undefined) {
      setMessage(value);
    }
  }, [value]);

  // メッセージの変更を処理
  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);

    // 外部のonChangeハンドラーがあれば呼び出す
    if (onChange) {
      onChange(newValue);
    }
  };

  // キー操作を処理
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enterキーで送信（Shiftキーとの組み合わせは改行）
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 送信処理
  const handleSubmit = () => {
    if (isSubmitting || isLoading || disabled || !message.trim()) return;

    if (onSubmit) {
      onSubmit({ content: message.trim(), files });
    }

    // 外部で値が管理されていない場合のみ内部状態をクリア
    if (value === undefined) {
      setMessage("");
    }

    setFiles([]);

    // フォーカスを維持
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 残り文字数
  const remainingChars = maxLength - message.length;
  const isNearLimit = remainingChars < maxLength * 0.1; // 残り10%で警告色に
  const showCharCounter = showCounter && message.length > 0;

  return (
    <InputContainer>
      <StyledInput
        ref={inputRef}
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isSubmitting || isLoading || disabled}
        maxLength={maxLength}
        aria-label="チャットメッセージ入力"
        inputSize="LARGE"
      />

      {showCharCounter && (
        <CharCounter isNearLimit={isNearLimit} show={showCharCounter}>
          {remainingChars}
        </CharCounter>
      )}

      <SendButton
        onClick={handleSubmit}
        disabled={isSubmitting || isLoading || disabled || !message.trim()}
        aria-label="メッセージを送信"
        title="送信"
      >
        <SendIcon />
      </SendButton>
    </InputContainer>
  );
};

export default ChatInput;
