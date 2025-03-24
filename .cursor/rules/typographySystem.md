# タイポグラフィシステム

レイアウトとコンテンツの可読性を確保するためのタイポグラフィシステムの定義です。

## フォントファミリー

```css
--font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;
```

システム全体で使用する主要なフォントは Inter（Google Fonts）です。これはシンプルで読みやすく、異なるウェイトやスタイルが豊富に揃っている現代的なサンセリフフォントです。Inter が利用できない場合は、各 OS に最適化されたシステムフォントにフォールバックします。

## フォントウェイト

```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
```

| 変数名                  | 値    | 用途                               |
| ----------------------- | ----- | ---------------------------------- |
| `--font-weight-regular` | `400` | 本文テキスト、通常の表示           |
| `--font-weight-medium`  | `500` | 小見出し、やや強調したいテキスト   |
| `--font-weight-bold`    | `700` | 見出し、強調テキスト、ボタンラベル |

## フォントサイズ

```css
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-md: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem; /* 36px */
```

| 変数名            | 値         | ピクセル相当 | 用途                               |
| ----------------- | ---------- | ------------ | ---------------------------------- |
| `--font-size-xs`  | `0.75rem`  | 12px         | 補足情報、メタデータ、フッター     |
| `--font-size-sm`  | `0.875rem` | 14px         | セカンダリテキスト、ラベル、タグ   |
| `--font-size-md`  | `1rem`     | 16px         | 本文テキスト（標準サイズ）、ボタン |
| `--font-size-lg`  | `1.125rem` | 18px         | サブ見出し、強調テキスト           |
| `--font-size-xl`  | `1.25rem`  | 20px         | 小見出し                           |
| `--font-size-2xl` | `1.5rem`   | 24px         | セクション見出し                   |
| `--font-size-3xl` | `1.875rem` | 30px         | ページ見出し                       |
| `--font-size-4xl` | `2.25rem`  | 36px         | 大見出し、ヒーローテキスト         |

## 行の高さ

```css
--line-height-tight: 1.25;
--line-height-base: 1.5;
--line-height-loose: 1.75;
```

| 変数名                | 値     | 用途                                 |
| --------------------- | ------ | ------------------------------------ |
| `--line-height-tight` | `1.25` | 見出し、短いテキストブロック         |
| `--line-height-base`  | `1.5`  | 本文テキスト（標準）                 |
| `--line-height-loose` | `1.75` | 長文テキスト、読みやすさが必要な場所 |

## タイポグラフィスケール

異なるテキスト要素のための一貫したスケール定義です。CSS クラスまたはコンポーネントとして実装されます。

### 見出し

```css
h1,
.h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: 1rem;
}

h2,
.h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: 0.875rem;
}

h3,
.h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: 0.75rem;
}

h4,
.h4 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  margin-bottom: 0.5rem;
}

h5,
.h5 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  margin-bottom: 0.5rem;
}

h6,
.h6 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  margin-bottom: 0.5rem;
}
```

### ボディテキスト

```css
.text-base {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
}

.text-sm {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
}

.text-xs {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-base);
}

.text-lg {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-base);
}

.text-xl {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-base);
}
```

## レスポンシブ対応

異なるビューポートサイズでの可読性を確保するため、特定のブレークポイントでフォントサイズを調整します。

```css
@media (max-width: 768px) {
  :root {
    /* モバイルでは基本サイズを少し小さく調整 */
    --font-size-4xl: 2rem; /* 32px */
    --font-size-3xl: 1.75rem; /* 28px */
    --font-size-2xl: 1.375rem; /* 22px */
    --font-size-xl: 1.125rem; /* 18px */
  }
}
```

## アクセシビリティガイドライン

1. **最小フォントサイズ**: 本文テキストは常に最低 16px（1rem）を維持
2. **行の長さ**: テキストブロックの幅は 1 行あたり 45〜75 文字に制限
3. **コントラスト**: テキストと背景のコントラスト比は WCAG AA レベル（4.5:1）以上を確保
4. **文字間隔**: 必要に応じて`letter-spacing`プロパティを使用して可読性を向上

## 使用例

```jsx
// 見出しの例
<h1>Almondo RAG Chat</h1>
<h2>ナレッジベース</h2>

// ボディテキストの例
<p className="text-base">
  RAGは外部情報源を利用して生成AIの回答を向上させる技術です。
</p>

// 補足情報の例
<span className="text-sm text-gray-600">
  最終更新: 2023年8月5日
</span>
```
