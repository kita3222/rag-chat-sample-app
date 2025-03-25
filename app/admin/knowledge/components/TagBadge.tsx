import React from "react";
import styled from "styled-components";

interface TagBadgeProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Badge = styled.span<{ $clickable: boolean }>`
  display: inline-block;
  padding: var(--space-0-5) var(--space-2);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  background-color: var(--color-primary-10);
  color: var(--color-primary);
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};

  &:hover {
    ${(props) =>
      props.$clickable &&
      `
      background-color: var(--color-primary-20);
    `}
  }
`;

/**
 * タグを表示するためのバッジコンポーネント
 */
export default function TagBadge({
  children,
  onClick,
  className,
}: TagBadgeProps) {
  return (
    <Badge $clickable={!!onClick} onClick={onClick} className={className}>
      {children}
    </Badge>
  );
}

/**
 * 複数のタグを表示するコンテナコンポーネント
 */
export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
`;
