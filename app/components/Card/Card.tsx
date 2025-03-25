import React, { ReactNode, HTMLAttributes } from "react";
import styled, { css } from "styled-components";

export const VARIANTS = {
  DEFAULT: "default",
  ELEVATED: "elevated",
  OUTLINED: "outlined",
  INTERACTIVE: "interactive",
} as const;

export type CardVariant = (typeof VARIANTS)[keyof typeof VARIANTS];

// バリアントに基づくスタイル
const getVariantStyles = (variant: CardVariant) => {
  switch (variant) {
    case VARIANTS.ELEVATED:
      return css`
        box-shadow: var(--shadow-md);
        border: none;
      `;
    case VARIANTS.OUTLINED:
      return css`
        border: var(--border-width-thin) solid var(--color-gray-300);
        box-shadow: none;
      `;
    case VARIANTS.INTERACTIVE:
      return css`
        border: var(--border-width-thin) solid var(--color-gray-300);
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: transform var(--transition-fast) var(--transition-timing),
          box-shadow var(--transition-fast) var(--transition-timing);

        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-gray-400);
        }

        &:active {
          transform: translateY(0);
          box-shadow: var(--shadow-sm);
        }
      `;
    case VARIANTS.DEFAULT:
    default:
      return css`
        box-shadow: var(--shadow-sm);
        border: none;
      `;
  }
};

const CardContainer = styled.div<{
  $variant: CardVariant;
  $selected: boolean;
  $borderStyle?: string;
  $shadow?: string;
  $overflow?: string;
  $width?: string;
}>`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  border: ${(props) =>
    props.$borderStyle ||
    "var(--border-width-thin) solid var(--color-gray-200)"};
  box-shadow: ${(props) => props.$shadow || "var(--shadow-sm)"};
  overflow: ${(props) => (props.$overflow ? props.$overflow : "hidden")};
  padding: var(--space-4);
  width: ${(props) => props.$width || "100%"};
  transition: box-shadow var(--transition-fast) var(--transition-timing),
    transform var(--transition-fast) var(--transition-timing);

  /* バリアントスタイル */
  ${(props) => getVariantStyles(props.$variant)}

  /* 選択状態 */
  ${(props) =>
    props.$selected &&
    css`
      border: var(--border-width-thin) solid var(--color-primary);
      background-color: var(--color-primary-10);
    `}
`;

const CardHeader = styled.div`
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h3<{ $isCenter?: boolean }>`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0;
  text-align: ${(props) => (props.$isCenter ? "center" : "left")};
`;

const CardSubtitle = styled.p`
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-top: var(--space-2);
`;

const CardContent = styled.div`
  /* コンテンツスタイリング */
`;

const CardFooter = styled.div`
  margin-top: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
`;

const CardDescription = styled.p`
  margin: 0;
  color: var(--color-gray-700);
  font-size: var(--font-size-md);
  margin-top: var(--space-2);
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
`;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | null;
  variant?: CardVariant;
  subtitle?: ReactNode | string | null;
  headerActions?: ReactNode | null;
  footer?: ReactNode | null;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
  className?: string;
  borderStyle?: string;
  shadow?: string;
  overflow?: string;
  width?: string;
}

const Card = ({
  children,
  variant = VARIANTS.DEFAULT,
  title,
  subtitle,
  headerActions,
  footer,
  onClick,
  selected = false,
  className,
  borderStyle,
  shadow,
  overflow,
  width,
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
      $borderStyle={borderStyle}
      $shadow={shadow}
      $overflow={overflow}
      $width={width}
      className={className}
      {...props}
    >
      {(title || headerActions) && (
        <CardHeader>
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

// バリアントの定数をエクスポート
Card.VARIANTS = VARIANTS;

export default Card;
