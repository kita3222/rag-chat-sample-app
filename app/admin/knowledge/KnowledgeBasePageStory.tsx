import React, { useState } from "react";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AppLayout from "../../components/layouts/AppLayout";
import { MockAuthProvider } from "../../auth/MockAuthProvider";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import UploadModal from "./components/UploadModal";
import DocumentFilterBar from "./components/DocumentFilterBar";
import StatusBadge from "./components/StatusBadge";
import TagBadge, { TagList } from "./components/TagBadge";

// ナレッジベースドキュメントのインターフェース定義
interface KnowledgeDocument {
  id: string;
  title: string;
  type: "pdf" | "text" | "webpage" | "faq";
  uploadedAt: string;
  updatedAt: string;
  size: string;
  status: "processing" | "active" | "error" | "inactive";
  tags: string[];
}

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-5);
`;

const PageTitle = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
`;

const SearchContainer = styled.div`
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
`;

const TableContainer = styled(Card)`
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: var(--color-gray-50);
  border-bottom: var(--border-width-thin) solid var(--color-gray-200);
`;

const TableHeader = styled.th`
  padding: var(--space-3);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
  font-size: var(--font-size-sm);
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: var(--border-width-thin) solid var(--color-gray-200);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const TableCell = styled.td`
  padding: var(--space-3);
  color: var(--color-gray-800);
  font-size: var(--font-size-sm);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-2);
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3);
  border-top: var(--border-width-thin) solid var(--color-gray-200);
`;

const PaginationInfo = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: var(--space-2);
`;

// アップロードモーダル関連のスタイル
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
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: var(--font-size-xl);
  cursor: pointer;
  color: var(--color-gray-600);
`;

const UploadArea = styled.div`
  border: 2px dashed var(--color-gray-300);
  border-radius: var(--border-radius-md);
  padding: var(--space-6);
  text-align: center;
  margin-bottom: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-fast) var(--transition-timing);

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
  margin-top: var(--space-4);
`;

const FilterContainer = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
`;

const FilterChip = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast) var(--transition-timing);
  background-color: ${(props) =>
    props.$active ? "var(--color-primary-10)" : "var(--color-gray-100)"};
  color: ${(props) =>
    props.$active ? "var(--color-primary)" : "var(--color-gray-600)"};
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--color-primary)" : "var(--color-gray-200)"};

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--color-primary-20)" : "var(--color-gray-200)"};
  }
`;

// ストーリー用のコンポーネント
export default function KnowledgeBasePageStory() {
  // モックデータ
  const documents: KnowledgeDocument[] = [
    {
      id: "1",
      title: "製品マニュアルv1.0",
      type: "pdf",
      uploadedAt: "2023/03/24 10:30",
      updatedAt: "2023/03/24 10:30",
      size: "2.4 MB",
      status: "active",
      tags: ["製品", "マニュアル", "利用ガイド"],
    },
    {
      id: "2",
      title: "よくある質問と回答",
      type: "faq",
      uploadedAt: "2023/03/23 15:45",
      updatedAt: "2023/03/25 09:20",
      size: "450 KB",
      status: "active",
      tags: ["FAQ", "サポート"],
    },
    {
      id: "3",
      title: "技術仕様書",
      type: "pdf",
      uploadedAt: "2023/03/22 09:15",
      updatedAt: "2023/03/22 09:15",
      size: "5.1 MB",
      status: "processing",
      tags: ["技術", "仕様", "開発者向け"],
    },
    {
      id: "4",
      title: "サポートページ",
      type: "webpage",
      uploadedAt: "2023/03/21 14:30",
      updatedAt: "2023/03/21 14:30",
      size: "120 KB",
      status: "error",
      tags: ["サポート", "ウェブ"],
    },
    {
      id: "5",
      title: "利用規約",
      type: "text",
      uploadedAt: "2023/03/20 11:20",
      updatedAt: "2023/03/20 11:20",
      size: "320 KB",
      status: "inactive",
      tags: ["法的", "規約"],
    },
  ];

  // ステート（ストーリー用なので実際は空）
  const searchTerm = "";
  const currentPage = 1;
  const isLoading = false;
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "all" | "pdf" | "text" | "webpage" | "faq"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "active" | "processing" | "error" | "inactive"
  >("all");

  // ページネーション設定
  const docsPerPage = 10;
  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = documents;
  const totalPages = Math.ceil(documents.length / docsPerPage);

  // 検索コンポーネント
  const searchComponent = (
    <Input
      type="text"
      placeholder="ドキュメントを検索..."
      value={searchTerm}
      onChange={() => {}}
      inputSize={Input.SIZES.SMALL}
      style={{
        width: "150px",
      }}
    />
  );

  // 新規ドキュメントアップロードボタンのクリックハンドラ
  const handleUploadDocument = () => {
    setShowUploadModal(true);
  };

  // アップロード処理（ストーリー用なので実際の処理は行わない）
  const handleUpload = (data: {
    file: File;
    title: string;
    tags: string[];
  }) => {
    console.log("アップロードされたデータ:", data);
    // ストーリー用なので実際の処理は行わない
    setShowUploadModal(false);
  };

  // フィルターバー
  const filterBar = (
    <DocumentFilterBar
      selectedType={selectedType}
      selectedStatus={selectedStatus}
      onTypeChange={setSelectedType}
      onStatusChange={setSelectedStatus}
    />
  );

  // ステータスの日本語表記を返す関数
  const getStatusText = (
    status: "processing" | "active" | "error" | "inactive"
  ) => {
    switch (status) {
      case "processing":
        return "処理中";
      case "active":
        return "アクティブ";
      case "error":
        return "エラー";
      case "inactive":
        return "非アクティブ";
      default:
        return status;
    }
  };

  // タイプの日本語表記を返す関数
  const getTypeText = (type: "pdf" | "text" | "webpage" | "faq") => {
    switch (type) {
      case "pdf":
        return "PDF";
      case "text":
        return "テキスト";
      case "webpage":
        return "ウェブページ";
      case "faq":
        return "FAQ";
      default:
        return type;
    }
  };

  return (
    <MockAuthProvider
      authState={{
        user: {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
        },
        loading: false,
        error: null,
      }}
    >
      <AppLayout>
        <Breadcrumb
          items={[
            { label: "管理", href: "/admin" },
            { label: "ナレッジベース管理" },
          ]}
          title="ナレッジベース管理"
          actionComponents={
            <SearchContainer>
              {searchComponent}
              <Button
                variant={Button.VARIANTS.PRIMARY}
                size={Button.SIZES.SMALL}
                onClick={handleUploadDocument}
              >
                ドキュメント追加
              </Button>
            </SearchContainer>
          }
        />

        {filterBar}

        <TableContainer variant={Card.VARIANTS.OUTLINED}>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>タイトル</TableHeader>
                <TableHeader>種類</TableHeader>
                <TableHeader>アップロード日時</TableHeader>
                <TableHeader>最終更新日時</TableHeader>
                <TableHeader>サイズ</TableHeader>
                <TableHeader>タグ</TableHeader>
                <TableHeader>ステータス</TableHeader>
                <TableHeader>アクション</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} style={{ textAlign: "center" }}>
                    読み込み中...
                  </TableCell>
                </TableRow>
              ) : currentDocs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} style={{ textAlign: "center" }}>
                    ドキュメントが見つかりませんでした
                  </TableCell>
                </TableRow>
              ) : (
                currentDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>{getTypeText(doc.type)}</TableCell>
                    <TableCell>{doc.uploadedAt}</TableCell>
                    <TableCell>{doc.updatedAt}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      <TagList>
                        {doc.tags.slice(0, 2).map((tag, index) => (
                          <TagBadge key={index}>{tag}</TagBadge>
                        ))}
                        {doc.tags.length > 2 && (
                          <TagBadge>+{doc.tags.length - 2}</TagBadge>
                        )}
                      </TagList>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={doc.status} />
                    </TableCell>
                    <TableCell>
                      <ActionButtons>
                        <Button
                          variant={Button.VARIANTS.GHOST}
                          size={Button.SIZES.SMALL}
                          onClick={() => {}}
                        >
                          編集
                        </Button>
                        <Button
                          variant={Button.VARIANTS.GHOST}
                          size={Button.SIZES.SMALL}
                          onClick={() => {}}
                        >
                          {doc.status === "active" ? "無効化" : "有効化"}
                        </Button>
                        <Button
                          variant={Button.VARIANTS.GHOST}
                          size={Button.SIZES.SMALL}
                          onClick={() => {}}
                        >
                          削除
                        </Button>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <Pagination>
            <PaginationInfo>
              {documents.length} 件中 {indexOfFirstDoc + 1} から{" "}
              {Math.min(indexOfLastDoc, documents.length)} を表示
            </PaginationInfo>
            <PaginationButtons>
              <Button
                variant={Button.VARIANTS.GHOST}
                size={Button.SIZES.SMALL}
                onClick={() => {}}
                disabled={currentPage === 1}
              >
                前へ
              </Button>
              <Button
                variant={Button.VARIANTS.GHOST}
                size={Button.SIZES.SMALL}
                onClick={() => {}}
                disabled={currentPage === totalPages}
              >
                次へ
              </Button>
            </PaginationButtons>
          </Pagination>
        </TableContainer>

        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      </AppLayout>
    </MockAuthProvider>
  );
}
