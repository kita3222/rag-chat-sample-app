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
        border-radius: var(--border-radius-lg);
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
        border-radius: var(--border-radius-lg);
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

const BubbleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-bottom: var(--message-spacing, 16px);
  flex-direction: ${(props) =>
    props.variant === VARIANTS.USER ? "row-reverse" : "row"};
  gap: 8px;
`;

const BubbleContainer = styled.div`
  position: relative;
  padding: var(--message-padding);
  max-width: 70%;
  word-wrap: break-word;
  transition: all var(--transition-fast) var(--transition-timing);

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
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  align-self: flex-end;
  white-space: nowrap;
  padding-bottom: 8px;
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

// 時間をフォーマットする関数
const formatTime = (timeString) => {
  try {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      // 数値形式のタイムスタンプや "HH:MM:SS" 形式を処理
      if (timeString.includes(":")) {
        const [hours, minutes] = timeString.split(":");
        const hour = parseInt(hours, 10);
        const isPM = hour >= 12;
        const formattedHour = hour % 12 || 12;
        return `${isPM ? "午後" : "午前"} ${formattedHour
          .toString()
          .padStart(2, "0")}:${minutes}`;
      }
      // フォーマットできない場合はそのまま返す
      return timeString;
    }

    // ISO形式のタイムスタンプを処理
    const hours = date.getHours();
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12;
    const minutes = date.getMinutes();
    return `${isPM ? "午後" : "午前"} ${formattedHours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  } catch (error) {
    console.error("時間のフォーマットに失敗しました:", error);
    return timeString;
  }
};

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
  const formattedTime = timestamp ? formatTime(timestamp) : null;

  return (
    <BubbleWrapper variant={variant}>
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
      </BubbleContainer>

      {formattedTime && <Timestamp>{formattedTime}</Timestamp>}
    </BubbleWrapper>
  );
};

// 定数をエクスポート
ChatBubble.VARIANTS = VARIANTS;
ChatBubble.STATES = STATES;

export default ChatBubble;
