import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ToggleContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-1);
  width: 56px;
  height: 28px;
  background-color: ${({ isDark }) =>
    isDark ? "var(--color-gray-800)" : "var(--color-primary-20)"};
  border-radius: 30px;
  border: 2px solid
    ${({ isDark }) =>
      isDark ? "var(--color-gray-700)" : "var(--color-primary-40)"};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-20);
  }
`;

const Icons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-1);
  z-index: 1;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const SunIcon = styled.svg`
  color: ${({ isDark }) =>
    isDark ? "var(--color-gray-600)" : "var(--color-primary)"};
  transition: color 0.3s ease;
`;

const MoonIcon = styled.svg`
  color: ${({ isDark }) =>
    isDark ? "var(--color-white)" : "var(--color-gray-600)"};
  transition: color 0.3s ease;
`;

const ToggleThumb = styled.div`
  position: absolute;
  top: 2px;
  left: ${({ isDark }) => (isDark ? "28px" : "2px")};
  width: 20px;
  height: 20px;
  background-color: ${({ isDark }) =>
    isDark ? "var(--color-gray-200)" : "var(--color-white)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const ThemeToggle = ({ onChange, initialTheme = "light" }) => {
  const [isDark, setIsDark] = useState(initialTheme === "dark");

  // ユーザーの設定したテーマを保存
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      // システムのテーマ設定を確認
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  // テーマの切り替え処理
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");

    // CSSの切り替え（実際の実装では、グローバルなテーマプロバイダーに統合することが望ましい）
    document.documentElement.setAttribute(
      "data-theme",
      newIsDark ? "dark" : "light"
    );

    // 親コンポーネントに通知
    if (onChange) {
      onChange(newIsDark ? "dark" : "light");
    }
  };

  return (
    <ToggleContainer
      isDark={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      title={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
    >
      <Icons>
        <SunIcon
          isDark={isDark}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SunIcon>

        <MoonIcon
          isDark={isDark}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </MoonIcon>
      </Icons>
      <ToggleThumb isDark={isDark} />
    </ToggleContainer>
  );
};

export default ThemeToggle;
