import React from "react";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AppLayout from "../../components/layouts/AppLayout";
import { MockAuthProvider } from "../../auth/MockAuthProvider";

// オリジナルのUsersPageと同じインタフェース定義
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
  status: "active" | "inactive" | "pending";
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
  width: 300px;
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

const StatusBadge = styled.span<{ $status: "active" | "inactive" | "pending" }>`
  display: inline-block;
  padding: var(--space-0-5) var(--space-2);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);

  ${({ $status }) => {
    switch ($status) {
      case "active":
        return `
          background-color: var(--color-success-10);
          color: var(--color-success);
        `;
      case "inactive":
        return `
          background-color: var(--color-error-10);
          color: var(--color-error);
        `;
      case "pending":
        return `
          background-color: var(--color-warning-10);
          color: var(--color-warning);
        `;
      default:
        return "";
    }
  }}
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

// ストーリー用のコンポーネント
export default function UsersPageStory() {
  // モックデータ
  const users: User[] = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      lastLogin: "2023/03/24 10:30",
      status: "active",
    },
    {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      role: "user",
      lastLogin: "2023/03/23 15:45",
      status: "active",
    },
    {
      id: "3",
      name: "Test User",
      email: "test@example.com",
      role: "user",
      lastLogin: "2023/03/22 09:15",
      status: "inactive",
    },
    {
      id: "4",
      name: "New User",
      email: "new@example.com",
      role: "user",
      status: "pending",
    },
  ];

  // 検索用の空のステート
  const searchTerm = "";
  const currentPage = 1;
  const isLoading = false;

  // ページネーション設定
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users;
  const totalPages = Math.ceil(users.length / usersPerPage);

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
        <PageHeader>
          <PageTitle>ユーザー管理</PageTitle>
          <SearchContainer>
            <Input
              type="text"
              placeholder="ユーザーを検索..."
              value={searchTerm}
              onChange={() => {}}
              inputSize={Input.SIZES.SMALL}
            />
          </SearchContainer>
        </PageHeader>

        <TableContainer variant={Card.VARIANTS.FLAT}>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>名前</TableHeader>
                <TableHeader>メールアドレス</TableHeader>
                <TableHeader>権限</TableHeader>
                <TableHeader>最終ログイン</TableHeader>
                <TableHeader>ステータス</TableHeader>
                <TableHeader>アクション</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    読み込み中...
                  </TableCell>
                </TableRow>
              ) : currentUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    ユーザーが見つかりませんでした
                  </TableCell>
                </TableRow>
              ) : (
                currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.role === "admin" ? "管理者" : "一般ユーザー"}
                    </TableCell>
                    <TableCell>{user.lastLogin || "未ログイン"}</TableCell>
                    <TableCell>
                      <StatusBadge $status={user.status}>
                        {user.status === "active"
                          ? "アクティブ"
                          : user.status === "inactive"
                          ? "無効"
                          : "保留中"}
                      </StatusBadge>
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
                        {user.status === "active" ? (
                          <Button
                            variant={Button.VARIANTS.GHOST}
                            size={Button.SIZES.SMALL}
                            onClick={() => {}}
                          >
                            無効化
                          </Button>
                        ) : (
                          <Button
                            variant={Button.VARIANTS.GHOST}
                            size={Button.SIZES.SMALL}
                            onClick={() => {}}
                          >
                            有効化
                          </Button>
                        )}
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <Pagination>
            <PaginationInfo>
              {users.length} 件中 {indexOfFirstUser + 1} から{" "}
              {Math.min(indexOfLastUser, users.length)} を表示
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
      </AppLayout>
    </MockAuthProvider>
  );
}
