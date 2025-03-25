import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title: string;
  rightComponents?: React.ReactNode;
  className?: string;
}

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-5);
  width: 100%;
  gap: var(--space-4);
`;

const BreadcrumbNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1 1 auto;
  min-width: 0;
  max-width: calc(100% - 300px);
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: "/";
    margin: 0 var(--space-2);
    color: var(--color-gray-400);
  }
`;

const BreadcrumbLink = styled(Link)`
  color: var(--color-gray-600);
  text-decoration: none;
  transition: color var(--transition-fast) var(--transition-timing);

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

const BreadcrumbText = styled.span`
  color: var(--color-gray-500);
`;

const PageTitle = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RightComponentsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  justify-content: flex-end;
  flex: 0 0 auto;
`;

/**
 * パンくずリストとページタイトル、右側のコンポーネントを表示する汎用コンポーネント
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  title,
  rightComponents,
  className,
}) => {
  const pathname = usePathname();

  return (
    <BreadcrumbContainer className={className}>
      <BreadcrumbNav aria-label="パンくずリスト">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((item, index) => (
            <BreadcrumbItem key={index}>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbText>{item.label}</BreadcrumbText>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>

        <PageTitle>{title}</PageTitle>
      </BreadcrumbNav>

      {rightComponents && (
        <RightComponentsContainer>{rightComponents}</RightComponentsContainer>
      )}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
