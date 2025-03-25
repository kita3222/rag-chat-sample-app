import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  margin-right: var(--space-1);
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

// フィルタータイプの定義
type FilterType = "all" | "pdf" | "text" | "webpage" | "faq";
type StatusType = "all" | "active" | "processing" | "error" | "inactive";

interface DocumentFilterBarProps {
  selectedType: FilterType;
  selectedStatus: StatusType;
  onTypeChange: (type: FilterType) => void;
  onStatusChange: (status: StatusType) => void;
}

export default function DocumentFilterBar({
  selectedType,
  selectedStatus,
  onTypeChange,
  onStatusChange,
}: DocumentFilterBarProps) {
  // フィルターの種類
  const typeFilters: { value: FilterType; label: string }[] = [
    { value: "all", label: "すべて" },
    { value: "pdf", label: "PDF" },
    { value: "text", label: "テキスト" },
    { value: "webpage", label: "ウェブページ" },
    { value: "faq", label: "FAQ" },
  ];

  // ステータスフィルター
  const statusFilters: { value: StatusType; label: string }[] = [
    { value: "all", label: "すべて" },
    { value: "active", label: "アクティブ" },
    { value: "processing", label: "処理中" },
    { value: "error", label: "エラー" },
    { value: "inactive", label: "非アクティブ" },
  ];

  return (
    <FilterContainer>
      <FilterLabel>種類:</FilterLabel>
      {typeFilters.map((filter) => (
        <FilterChip
          key={filter.value}
          $active={selectedType === filter.value}
          onClick={() => onTypeChange(filter.value)}
        >
          {filter.label}
        </FilterChip>
      ))}

      <FilterLabel style={{ marginLeft: "var(--space-4)" }}>
        ステータス:
      </FilterLabel>
      {statusFilters.map((filter) => (
        <FilterChip
          key={filter.value}
          $active={selectedStatus === filter.value}
          onClick={() => onStatusChange(filter.value)}
        >
          {filter.label}
        </FilterChip>
      ))}
    </FilterContainer>
  );
}
