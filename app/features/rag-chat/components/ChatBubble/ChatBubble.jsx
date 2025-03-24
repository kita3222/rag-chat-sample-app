import React from "react";
import styled, { css } from "styled-components";

const VARIANTS = {
  USER: "user",
  SYSTEM: "system",
  REFERENCE: "reference",
};

const STATES = {
  DEFAULT: "default",
  LOADING: "loading",
  ERROR: "error",
};

// バリアントに基づくスタイル
const getVariantStyles = (variant) => {
  switch (variant) {
    case VARIANTS.USER:
      return css`
        background-color: var(--color-primary-10);
        border: var(--border-width-thin) solid var(--color-primary-20);
        color: var(--color-gray-900);
        align-self: flex-end;
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0
          var(--border-radius-lg);

        /* 右下の矢印部分を修正 */
        &::before {
          content: "";
          position: absolute;
          bottom: -10px;
          right: 10px;
          width: 20px;
          height: 20px;
          background-color: var(--color-primary-10);
          border-right: var(--border-width-thin) solid var(--color-primary-20);
          border-bottom: var(--border-width-thin) solid var(--color-primary-20);
          transform: rotate(45deg);
          border-radius: 0 0 4px 0;
        }
      `;
    case VARIANTS.REFERENCE:
      return css`
        background-color: var(--color-secondary-10, rgba(91, 99, 165, 0.1));
        border: var(--border-width-thin) solid
          var(--color-secondary-20, rgba(91, 99, 165, 0.2));
        color: var(--color-gray-900);
        align-self: flex-start;
        border-radius: var(--border-radius-lg);
        font-style: italic;

        &::before {
          content: '"';
          font-size: 1.5em;
          line-height: 0;
          vertical-align: -0.25em;
          margin-right: 0.1em;
        }

        &::after {
          content: '"';
          font-size: 1.5em;
          line-height: 0;
          vertical-align: -0.25em;
          margin-left: 0.1em;
        }
      `;
    case VARIANTS.SYSTEM:
    default:
      return css`
        background-color: var(--color-white);
        border: var(--border-width-thin) solid var(--color-gray-300);
        color: var(--color-gray-900);
        align-self: flex-start;
        border-radius: var(--border-radius-lg) var(--border-radius-lg)
          var(--border-radius-lg) 0;

        /* 左下の矢印部分を修正 */
        &::before {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 10px;
          width: 20px;
          height: 20px;
          background-color: var(--color-white);
          border-left: var(--border-width-thin) solid var(--color-gray-300);
          border-bottom: var(--border-width-thin) solid var(--color-gray-300);
          transform: rotate(45deg);
          border-radius: 0 0 0 4px;
        }
      `;
  }
};

// 状態に基づくスタイル
const getStateStyles = (state) => {
  switch (state) {
    case STATES.LOADING:
      return css`
        opacity: 0.7;

        &::after {
          content: "...";
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0%,
          20% {
            content: ".";
          }
          40%,
          60% {
            content: "..";
          }
          80%,
          100% {
            content: "...";
          }
        }
      `;
    case STATES.ERROR:
      return css`
        border-color: var(--color-error);
        background-color: var(--color-error-10, rgba(227, 73, 53, 0.1));
      `;
    case STATES.DEFAULT:
    default:
      return css``;
  }
};

const BubbleContainer = styled.div`
  position: relative;
  padding: var(--message-padding);
  max-width: 70%;
  word-wrap: break-word;
  margin-bottom: var(--message-spacing, 16px);
  transition: all var(--transition-fast) var(--transition-timing);
  /* 矢印部分のためにマージンを追加 */
  margin-bottom: calc(var(--message-spacing, 16px) + 10px);

  /* バリアントスタイル */
  ${(props) => getVariantStyles(props.variant)}

  /* 状態スタイル */
  ${(props) => getStateStyles(props.state)}
`;

const MessageContent = styled.div`
  white-space: pre-wrap;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
`;

const Timestamp = styled.span`
  /* スタイリング */
`;

const SourceInfo = styled.div`
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-secondary);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorInfo = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-2);
`;

const ChatBubble = ({
  children,
  variant = VARIANTS.SYSTEM,
  state = STATES.DEFAULT,
  timestamp,
  source,
  onSourceClick,
  errorMessage,
  className,
  ...props
}) => {
  return (
    <BubbleContainer
      variant={variant}
      state={state}
      className={className}
      {...props}
    >
      <MessageContent>{children}</MessageContent>

      {state === STATES.ERROR && errorMessage && (
        <ErrorInfo>{errorMessage}</ErrorInfo>
      )}

      {source && (
        <SourceInfo onClick={onSourceClick}>出典: {source}</SourceInfo>
      )}

      {timestamp && (
        <MetaInfo>
          <Timestamp>{timestamp}</Timestamp>
        </MetaInfo>
      )}
    </BubbleContainer>
  );
};

// 定数をエクスポート
ChatBubble.VARIANTS = VARIANTS;
ChatBubble.STATES = STATES;

export default ChatBubble;
