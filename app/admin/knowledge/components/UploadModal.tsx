import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(Card)`
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--space-5);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
`;

const ModalTitle = styled.h2`
  font-size: var(--font-size-xl);
  margin: 0;
  color: var(--color-gray-900);
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: var(--font-size-xl);
  cursor: pointer;
  color: var(--color-gray-600);
`;

const UploadArea = styled.div<{ $isDragActive?: boolean; $hasFile?: boolean }>`
  border: 2px dashed
    ${(props) =>
      props.$isDragActive
        ? "var(--color-primary)"
        : props.$hasFile
        ? "var(--color-success)"
        : "var(--color-gray-300)"};
  border-radius: var(--border-radius-md);
  padding: var(--space-6);
  text-align: center;
  margin-bottom: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-fast) var(--transition-timing);
  background-color: ${(props) =>
    props.$isDragActive
      ? "var(--color-primary-5)"
      : props.$hasFile
      ? "var(--color-success-5)"
      : "transparent"};

  &:hover {
    border-color: var(--color-primary);
    background-color: var(--color-primary-5);
  }
`;

const FormGroup = styled.div`
  margin-bottom: var(--space-4);
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-5);
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: var(--space-2);
  color: ${(props) => (props.color ? props.color : "var(--color-gray-500)")};
`;

const UploadText = styled.p`
  margin: var(--space-1) 0;
  color: var(--color-gray-700);
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-3);
`;

const FileIcon = styled.div`
  font-size: 1.5rem;
`;

const FileName = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-gray-800);
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileSize = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
`;

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: { file: File; title: string; tags: string[] }) => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
}: UploadModalProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [titleError, setTitleError] = useState("");

  // ドラッグ&ドロップ関連イベントハンドラ
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelect(droppedFile);
    }
  };

  // ファイル選択
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileSelect(selectedFile);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    if (!title && selectedFile.name) {
      // ファイル名からデフォルトのタイトルを設定（拡張子を除く）
      const fileName = selectedFile.name.split(".").slice(0, -1).join(".");
      setTitle(fileName);
    }
  };

  // フォーム入力変更ハンドラ
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value) {
      setTitleError("");
    }
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  // ファイルサイズのフォーマット
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // アップロード処理
  const handleUpload = () => {
    if (!file) {
      return;
    }

    if (!title.trim()) {
      setTitleError("タイトルは必須です");
      return;
    }

    // タグの処理（カンマ区切りの文字列を配列に変換）
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onUpload({
      file,
      title: title.trim(),
      tags: tagArray,
    });

    // 入力をクリア
    resetForm();
  };

  // フォームリセット
  const resetForm = () => {
    setFile(null);
    setTitle("");
    setTags("");
    setTitleError("");
  };

  // モーダルを閉じる
  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>新規ドキュメント追加</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <UploadArea
          $isDragActive={isDragActive}
          $hasFile={!!file}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".pdf,.txt,.doc,.docx,.md,.json"
          />

          {file ? (
            <>
              <UploadIcon color="var(--color-success)">✓</UploadIcon>
              <UploadText>ファイルが選択されました</UploadText>
              <FileInfo>
                <FileIcon>
                  {file.type.includes("pdf")
                    ? "📄"
                    : file.type.includes("text")
                    ? "📝"
                    : "📁"}
                </FileIcon>
                <div>
                  <FileName>{file.name}</FileName>
                  <FileSize>{formatFileSize(file.size)}</FileSize>
                </div>
              </FileInfo>
            </>
          ) : (
            <>
              <UploadIcon>📁</UploadIcon>
              <UploadText>ドキュメントをドラッグ＆ドロップ</UploadText>
              <UploadText>または</UploadText>
              <Button
                variant={Button.VARIANTS.SECONDARY}
                size={Button.SIZES.SMALL}
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("fileInput")?.click();
                }}
              >
                ファイルを選択
              </Button>
            </>
          )}
        </UploadArea>

        <FormGroup>
          <Input
            label="タイトル"
            placeholder="ドキュメントのタイトル"
            value={title}
            onChange={handleTitleChange}
            required
            error={titleError}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="タグ（カンマ区切り）"
            placeholder="例: 製品, マニュアル, 利用ガイド"
            value={tags}
            onChange={handleTagsChange}
          />
        </FormGroup>

        <ModalFooter>
          <Button variant={Button.VARIANTS.GHOST} onClick={handleClose}>
            キャンセル
          </Button>
          <Button
            variant={Button.VARIANTS.PRIMARY}
            onClick={handleUpload}
            disabled={!file}
          >
            アップロード
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
