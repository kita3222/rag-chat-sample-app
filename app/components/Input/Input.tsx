import React, { forwardRef, useState, ChangeEvent, FocusEvent } from "react";
import styled, { css } from "styled-components";

const VARIANTS = {
  DEFAULT: "default",
  PASSWORD: "password",
  SEARCH: "search",
} as const;

const SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

type VariantType = (typeof VARIANTS)[keyof typeof VARIANTS];
type SizeType = (typeof SIZES)[keyof typeof SIZES];

interface SizeStyleProps {
  inputSize: SizeType;
}

// サイズに基づくスタイル
const getSizeStyles = (inputSize: SizeType) => {
  switch (inputSize) {
    case SIZES.SMALL:
      return css`
        height: 32px;
        padding: 0 var(--space-3);
        font-size: var(--font-size-sm);
      `;
    case SIZES.LARGE:
      return css`
        height: 48px;
        padding: 0 var(--space-5);
        font-size: var(--font-size-md);
      `;
    case SIZES.MEDIUM:
    default:
      return css`
        height: 40px;
        padding: 0 var(--space-4);
        font-size: var(--font-size-md);
      `;
  }
};

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface InputFieldProps {
  hasError?: boolean;
  success?: boolean;
  inputSize: SizeType;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
}

const InputField = styled.input<InputFieldProps>`
  width: 100%;
  border: var(--border-width-thin) solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  background-color: var(--color-white);
  font-family: var(--font-family-base);
  color: var(--color-gray-900);
  transition: all var(--transition-fast) var(--transition-timing);
  outline: none;

  /* サイズスタイル */
  ${(props) => getSizeStyles(props.inputSize)}

  /* 状態スタイル */
  ${(props) =>
    props.hasError &&
    css`
      border-color: var(--color-error);
      background-color: var(--color-error-10, rgba(227, 73, 53, 0.1));
    `}
  
  ${(props) =>
    props.success &&
    css`
      border-color: var(--color-success);
    `}
  
  /* 無効状態 */
  &:disabled {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-300);
    color: var(--color-gray-500);
    cursor: not-allowed;
  }

  /* フォーカス状態 */
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-20);
  }

  /* アイコン付きの場合の余白調整 */
  ${(props) =>
    props.hasLeftIcon &&
    css`
      padding-left: calc(var(--space-5) + 20px);
    `}

  ${(props) =>
    props.hasRightIcon &&
    css`
      padding-right: calc(var(--space-5) + 20px);
    `}
  
  /* プレースホルダースタイル */
  &::placeholder {
    color: var(--color-gray-500);
  }
`;

const LeftIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: var(--space-3);
  transform: translateY(-50%);
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface RightIconWrapperProps {
  clickable?: boolean;
}

const RightIconWrapper = styled.div<RightIconWrapperProps>`
  position: absolute;
  top: 50%;
  right: var(--space-3);
  transform: translateY(-50%);
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
`;

const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-2);
`;

const HelperText = styled.div<{ $hasError: boolean }>`
  color: ${(props) =>
    props.$hasError ? "var(--color-error)" : "var(--color-gray-600)"};
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-2);
`;

const Label = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-800);
  margin-bottom: var(--space-2);
`;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  inputSize?: SizeType;
  error?: string;
  success?: boolean;
  label?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  className?: string;
}

// Inputコンポーネントの型にVARIANTSとSIZESプロパティを追加
type InputComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> & {
  VARIANTS: typeof VARIANTS;
  SIZES: typeof SIZES;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type = "text",
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      disabled = false,
      inputSize = SIZES.MEDIUM,
      error,
      success = false,
      label,
      required = false,
      leftIcon,
      rightIcon,
      onRightIconClick,
      className,
      ...props
    },
    ref
  ) => {
    // パスワード表示切り替え用の状態管理（パスワードフィールドの場合）
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";

    // パスワード表示/非表示の切り替え処理
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // 入力タイプの決定（パスワードフィールドの場合、表示/非表示によって変わる）
    const inputType = isPasswordField
      ? showPassword
        ? "text"
        : "password"
      : type;

    // パスワード表示アイコン（簡易的な表現）
    const PasswordIcon = () => (
      <div onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
        {showPassword ? (
          <span>👁️</span> // 目を閉じるアイコン（実際にはSVGなどを使用）
        ) : (
          <span>👁️‍🗨️</span> // 目を開くアイコン（実際にはSVGなどを使用）
        )}
      </div>
    );

    return (
      <div className={className}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && (
              <span style={{ color: "var(--color-error)" }}> *</span>
            )}
          </Label>
        )}
        <InputWrapper>
          <InputField
            id={id}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            inputSize={inputSize}
            hasError={!!error}
            success={success}
            hasLeftIcon={!!leftIcon}
            hasRightIcon={!!rightIcon || isPasswordField}
            ref={ref}
            {...props}
          />
          {leftIcon && <LeftIconWrapper>{leftIcon}</LeftIconWrapper>}
          {(rightIcon || isPasswordField) && (
            <RightIconWrapper
              clickable={!!onRightIconClick || isPasswordField}
              onClick={
                isPasswordField ? togglePasswordVisibility : onRightIconClick
              }
            >
              {isPasswordField ? <PasswordIcon /> : rightIcon}
            </RightIconWrapper>
          )}
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
) as InputComponent; // InputComponentとして型アサーション

Input.displayName = "Input";

// バリアントとサイズの定数をエクスポート
Input.VARIANTS = VARIANTS;
Input.SIZES = SIZES;

export default Input;
