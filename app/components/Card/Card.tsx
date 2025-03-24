import React, { ReactNode, HTMLAttributes } from "react";
import styled, { css } from "styled-components";

export const VARIANTS = {
  DEFAULT: "default",
  ELEVATED: "elevated",
  OUTLINED: "outlined",
  INTERACTIVE: "interactive",
  FLAT: "flat",
} as const;

export type CardVariant = (typeof VARIANTS)[keyof typeof VARIANTS];

// バリアントに基づくスタイル
const getVariantStyles = (variant: CardVariant) => {
  switch (variant) {
    case VARIANTS.ELEVATED:
      return css`
        box-shadow: var(--shadow-md);
        border: none;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(8px);
      `;
    case VARIANTS.OUTLINED:
      return css`
        border: var(--border-width-thin) solid var(--color-gray-200);
        box-shadow: none;
        background-color: rgba(255, 255, 255, 0.5);
      `;
    case VARIANTS.INTERACTIVE:
      return css`
        border: var(--border-width-thin) solid var(--color-gray-200);
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: transform var(--transition-fast) var(--transition-timing),
          box-shadow var(--transition-fast) var(--transition-timing),
          border-color var(--transition-fast) var(--transition-timing),
          background-color var(--transition-fast) var(--transition-timing);
        background-color: rgba(255, 255, 255, 0.7);

        &:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-gray-300);
          background-color: rgba(255, 255, 255, 0.9);
        }

        &:active {
          transform: translateY(0);
          box-shadow: var(--shadow-sm);
          background-color: rgba(255, 255, 255, 0.8);
        }
      `;
    case VARIANTS.FLAT:
      return css`
        border: none;
        box-shadow: none;
        background-color: transparent;
        padding: var(--space-2);
      `;
    case VARIANTS.DEFAULT:
    default:
      return css`
        box-shadow: var(--shadow-sm);
        border: none;
        background-color: rgba(255, 255, 255, 0.7);
      `;
  }
};

// 異なるサイズのスタイル
const getSizeStyles = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return css`
        padding: var(--space-2);
      `;
    case "large":
      return css`
        padding: var(--space-4);
      `;
    case "medium":
    default:
      return css`
        padding: var(--space-3);
      `;
  }
};

const CardContainer = styled.div<{
  $variant: CardVariant;
  $selected: boolean;
  $size: "small" | "medium" | "large";
  $noPadding: boolean;
}>`
  border-radius: var(--border-radius-md);
  overflow: hidden;

  /* サイズスタイル */
  ${(props) => !props.$noPadding && getSizeStyles(props.$size)}

  /* バリアントスタイル */
  ${(props) => getVariantStyles(props.$variant)}

  /* 選択状態 */
  ${(props) =>
    props.$selected &&
    css`
      border: var(--border-width-thin) solid var(--color-primary);
      background-color: var(--color-primary-5);
      box-shadow: 0 0 0 1px var(--color-primary-10);
    `}
`;

const CardHeader = styled.div<{ $compact?: boolean }>`
  margin-bottom: ${(props) =>
    props.$compact ? "var(--space-1)" : "var(--space-2)"};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h3<{ $size?: "small" | "medium" | "large" }>`
  margin: 0;
  font-size: ${(props) =>
    props.$size === "small"
      ? "var(--font-size-sm)"
      : props.$size === "large"
      ? "var(--font-size-lg)"
      : "var(--font-size-md)"};
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  letter-spacing: 0.01em;
`;

const CardSubtitle = styled.p`
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-top: var(--space-0-5);
  opacity: 0.9;
`;

const CardContent = styled.div<{ $compact?: boolean }>`
  /* コンテンツスタイリング */
  line-height: 1.45;
  font-size: ${(props) => (props.$compact ? "var(--font-size-sm)" : "inherit")};
  color: var(--color-gray-800);
`;

const CardFooter = styled.div<{
  $compact?: boolean;
  $align?: "left" | "right" | "center" | "space-between";
}>`
  margin-top: ${(props) =>
    props.$compact ? "var(--space-2)" : "var(--space-3)"};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$align || "flex-end"};
  gap: var(--space-2);
  opacity: 0.95;
  font-size: ${(props) => (props.$compact ? "var(--font-size-sm)" : "inherit")};
`;

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children?: ReactNode | null;
  variant?: CardVariant;
  size?: "small" | "medium" | "large";
  title?: ReactNode | string;
  subtitle?: ReactNode | string | null;
  headerActions?: ReactNode | null;
  footer?: ReactNode | null;
  footerAlign?: "left" | "right" | "center" | "space-between";
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
  className?: string;
  compact?: boolean;
  noPadding?: boolean;
}

const Card = ({
  children,
  variant = VARIANTS.DEFAULT,
  size = "medium",
  title,
  subtitle,
  headerActions,
  footer,
  footerAlign = "right",
  onClick,
  selected = false,
  className,
  compact = false,
  noPadding = false,
  ...props
}: CardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <CardContainer
      $variant={variant}
      onClick={handleClick}
      $selected={selected}
      $size={size}
      $noPadding={noPadding}
      className={className}
      {...props}
    >
      {(title || headerActions) && (
        <CardHeader $compact={compact}>
          <div>
            {title && <CardTitle $size={size}>{title}</CardTitle>}
            {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </CardHeader>
      )}
      <CardContent $compact={compact}>{children}</CardContent>
      {footer && (
        <CardFooter $compact={compact} $align={footerAlign}>
          {footer}
        </CardFooter>
      )}
    </CardContainer>
  );
};

// バリアントの定数をエクスポート
Card.VARIANTS = VARIANTS;

export default Card;
