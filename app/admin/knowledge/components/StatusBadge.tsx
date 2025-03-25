import React from "react";
import styled from "styled-components";

export type DocumentStatus = "processing" | "active" | "error" | "inactive";

interface StatusBadgeProps {
  status: DocumentStatus;
  children?: React.ReactNode;
  className?: string;
}

const Badge = styled.span<{ $status: DocumentStatus }>`
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
      case "processing":
        return `
          background-color: var(--color-warning-10);
          color: var(--color-warning);
        `;
      case "error":
        return `
          background-color: var(--color-error-10);
          color: var(--color-error);
        `;
      case "inactive":
        return `
          background-color: var(--color-gray-200);
          color: var(--color-gray-700);
        `;
      default:
        return "";
    }
  }}
`;

/**
 * ドキュメントや他のエンティティのステータスを表示するためのバッジコンポーネント
 */
export default function StatusBadge({
  status,
  children,
  className,
}: StatusBadgeProps) {
  // ステータスの日本語表記を返す関数
  const getStatusText = (status: DocumentStatus) => {
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

  return (
    <Badge $status={status} className={className}>
      {children || getStatusText(status)}
    </Badge>
  );
}
