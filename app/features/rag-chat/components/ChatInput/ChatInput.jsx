import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border: var(--border-width-thin) solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-3);
  position: relative;
`;

const TextareaWrapper = styled.div`
  position: relative;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  border: var(--border-width-thin) solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  padding: var(--space-3);
  min-height: 60px;
  max-height: 150px;
  resize: none;
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  color: var(--color-gray-900);
  outline: none;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-20);
  }

  &:disabled {
    background-color: var(--color-gray-100);
    color: var(--color-gray-500);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--color-gray-500);
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-2);
`;

const CharCount = styled.span`
  font-size: var(--font-size-sm);
  color: ${(props) =>
    props.isNearLimit ? "var(--color-warning)" : "var(--color-gray-600)"};
  margin-right: var(--space-2);
`;

const FileActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const FileInputButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: var(--space-1);
  color: var(--color-gray-700);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }

  &:disabled {
    color: var(--color-gray-400);
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const AttachedFilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--color-gray-600);
    display: flex;
    align-items: center;

    &:hover {
      color: var(--color-error);
    }
  }
`;

// 簡易的なアイコンコンポーネント
const PaperClipIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChatInput = ({
  placeholder = "メッセージを入力...",
  maxLength = 1000,
  isSubmitting = false,
  onSubmit,
  disabled = false,
  allowFiles = true,
  maxFiles = 3,
  acceptedFileTypes = ".pdf,.doc,.docx,.txt",
}) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // テキストエリアの高さを自動調整
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [message]);

  // 文字数制限に近づいているかをチェック（90%以上）
  const isNearCharLimit = message.length > maxLength * 0.9;

  // ファイル選択ハンドラー
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > maxFiles) {
      alert(`ファイルは最大${maxFiles}個までアップロードできます。`);
      return;
    }
    setFiles([...files, ...selectedFiles]);
    fileInputRef.current.value = null; // 入力をリセット
  };

  // ファイル削除ハンドラー
  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // 送信ハンドラー
  const handleSubmit = () => {
    if (!message.trim() && files.length === 0) return;
    if (onSubmit) {
      onSubmit({ message, files });
    }
    setMessage("");
    setFiles([]);
  };

  // Enterキーでの送信（Shift+Enterは改行）
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isSubmitting && !disabled) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ChatInputContainer>
      {files.length > 0 && (
        <AttachedFilesContainer>
          {files.map((file, index) => (
            <FileItem key={index}>
              {file.name}
              <button
                type="button"
                onClick={() => handleFileRemove(index)}
                aria-label={`Remove ${file.name}`}
              >
                <CloseIcon />
              </button>
            </FileItem>
          ))}
        </AttachedFilesContainer>
      )}

      <TextareaWrapper>
        <StyledTextarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isSubmitting}
          maxLength={maxLength}
        />
      </TextareaWrapper>

      <ActionsContainer>
        <FileActionContainer>
          {allowFiles && (
            <>
              <FileInputButton
                type="button"
                onClick={() => fileInputRef.current.click()}
                disabled={disabled || isSubmitting || files.length >= maxFiles}
                aria-label="Attach files"
              >
                <PaperClipIcon />
              </FileInputButton>
              <FileInput
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedFileTypes}
                onChange={handleFileSelect}
                disabled={disabled || isSubmitting || files.length >= maxFiles}
              />
            </>
          )}

          <CharCount isNearLimit={isNearCharLimit}>
            {message.length}/{maxLength}
          </CharCount>
        </FileActionContainer>

        <Button
          onClick={handleSubmit}
          disabled={
            disabled || isSubmitting || (!message.trim() && files.length === 0)
          }
          isLoading={isSubmitting}
          size={Button.SIZES.SMALL}
        >
          送信
        </Button>
      </ActionsContainer>
    </ChatInputContainer>
  );
};

export default ChatInput;
