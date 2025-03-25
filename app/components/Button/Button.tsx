import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

// バリアント定数
export const VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TEXT: "text",
  DANGER: "danger",
  GHOST: "ghost",
} as const;

// サイズ定数
export const SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export type ButtonVariant = (typeof VARIANTS)[keyof typeof VARIANTS];
export type ButtonSize = (typeof SIZES)[keyof typeof SIZES];

// バリアントに基づくスタイル
const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case VARIANTS.PRIMARY:
      return css`
        background-color: var(--color-primary);
        color: var(--color-white);
        border: none;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01);

        &:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          transform: translateY(-1px);
        }

        &:active:not(:disabled) {
          background-color: var(--color-primary-dark);
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01);
          transform: translateY(0);
        }

        &:disabled {
          background-color: var(--color-gray-300);
          color: var(--color-gray-500);
          box-shadow: none;
          opacity: 0.6;
        }
      `;
    case VARIANTS.SECONDARY:
      return css`
        background-color: var(--color-primary-10);
        color: var(--color-primary-dark);
        border: var(--border-width-thin) solid var(--color-primary);
        box-shadow: none;

        &:hover:not(:disabled) {
          background-color: var(--color-primary-20);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);
          transform: translateY(-1px);
        }

        &:active:not(:disabled) {
          background-color: var(--color-primary-20);
          border-color: var(--color-primary-dark);
          box-shadow: none;
          transform: translateY(0);
        }

        &:disabled {
          background-color: var(--color-gray-100);
          color: var(--color-gray-500);
          border-color: var(--color-gray-300);
          box-shadow: none;
          opacity: 0.6;
        }
      `;
    case VARIANTS.TEXT:
      return css`
        background-color: transparent;
        color: var(--color-primary);
        border: none;
        padding-left: var(--space-2);
        padding-right: var(--space-2);

        &:hover:not(:disabled) {
          background-color: var(--color-primary-5);
          transform: translateY(-1px);
        }

        &:active:not(:disabled) {
          background-color: var(--color-primary-10);
          transform: translateY(0);
        }

        &:disabled {
          color: var(--color-gray-500);
          opacity: 0.6;
        }
      `;
    case VARIANTS.GHOST:
      return css`
        background-color: transparent;
        color: var(--color-gray-700);
        border: var(--border-width-thin) solid var(--color-gray-300);
        box-shadow: none;

        &:hover:not(:disabled) {
          background-color: var(--color-gray-100);
          border-color: var(--color-gray-400);
          color: var(--color-gray-800);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);
          transform: translateY(-1px);
        }

        &:active:not(:disabled) {
          background-color: var(--color-gray-200);
          border-color: var(--color-gray-400);
          box-shadow: none;
          transform: translateY(0);
        }

        &:disabled {
          color: var(--color-gray-500);
          border-color: var(--color-gray-200);
          box-shadow: none;
          opacity: 0.6;
        }
      `;
    case VARIANTS.DANGER:
      return css`
        background-color: var(--color-error);
        color: var(--color-white);
        border: none;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01);

        &:hover:not(:disabled) {
          background-color: var(--color-error-light);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          transform: translateY(-1px);
        }

        &:active:not(:disabled) {
          background-color: var(--color-error-light);
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01);
          transform: translateY(0);
        }

        &:disabled {
          background-color: var(--color-gray-300);
          color: var(--color-gray-500);
          box-shadow: none;
          opacity: 0.6;
        }
      `;
    default:
      return css``;
  }
};

// サイズに基づくスタイル
const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case SIZES.SMALL:
      return css`
        padding: var(--space-2) var(--space-3);
        font-size: var(--font-size-sm);
        border-radius: var(--border-radius-md);
      `;
    case SIZES.MEDIUM:
      return css`
        padding: var(--space-3) var(--space-5);
        font-size: var(--font-size-md);
        border-radius: var(--border-radius-md);
      `;
    case SIZES.LARGE:
      return css`
        padding: var(--space-4) var(--space-6);
        font-size: var(--font-size-lg);
        border-radius: var(--border-radius-md);
      `;
    default:
      return css``;
  }
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  text-align: center;
  text-decoration: none;
  transition: background-color var(--transition-fast) var(--transition-timing),
    border-color var(--transition-fast) var(--transition-timing),
    color var(--transition-fast) var(--transition-timing),
    box-shadow var(--transition-fast) var(--transition-timing);
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  gap: var(--space-3);
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--color-primary-20);
  }

  &:disabled {
    cursor: not-allowed;
  }

  /* バリアントとサイズのスタイルを適用 */
  ${(props) => getVariantStyles(props.$variant)}
  ${(props) => getSizeStyles(props.$size)}
  
  /* ローディング状態のスタイル */
  ${(props) =>
    props.$isLoading &&
    css`
      color: transparent !important;
      pointer-events: none;

      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid;
        border-radius: 50%;
        border-color: var(--color-white) transparent var(--color-white)
          transparent;
        animation: spin 1.2s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}
`;

const IconContainer = styled.span<{ $position: "left" | "right" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  order: ${(props) => (props.$position === "left" ? -1 : 1)};
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  children,
  variant = VARIANTS.PRIMARY,
  size = SIZES.MEDIUM,
  type = "button",
  disabled = false,
  isLoading = false,
  onClick,
  fullWidth = false,
  icon = null,
  iconPosition = "left",
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      {...props}
    >
      {!isLoading && icon && (
        <IconContainer $position={iconPosition}>{icon}</IconContainer>
      )}
      {children}
    </StyledButton>
  );
};

// バリアントとサイズの定数をエクスポート
Button.VARIANTS = VARIANTS;
Button.SIZES = SIZES;

export default Button;
