# スペーシングシステム

一貫性のあるレイアウトとコンポーネント間の調和を実現するためのスペーシングシステムです。

## 基本スペーシング

スペーシングシステムは 4px（0.25rem）を基本単位とし、これを積み重ねることで段階的なスケールを形成しています。

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
```

## スペーシングの用途

| 変数名       | 値        | ピクセル相当 | 推奨用途                                         |
| ------------ | --------- | ------------ | ------------------------------------------------ |
| `--space-1`  | `0.25rem` | 4px          | 関連性の高い要素間、アイコンとラベルの間         |
| `--space-2`  | `0.5rem`  | 8px          | 関連コンテンツ内の間隔、ボタン内のパディング     |
| `--space-3`  | `0.75rem` | 12px         | 要素のパディング、小コンポーネント間             |
| `--space-4`  | `1rem`    | 16px         | 標準パディング、中コンポーネント間               |
| `--space-5`  | `1.25rem` | 20px         | セクション内の要素間                             |
| `--space-6`  | `1.5rem`  | 24px         | セクション間、中レベルのマージン                 |
| `--space-8`  | `2rem`    | 32px         | 大きなセクション間、コンテナのパディング         |
| `--space-10` | `2.5rem`  | 40px         | 主要セクション間の大きな間隔                     |
| `--space-12` | `3rem`    | 48px         | ページセクション間の標準マージン                 |
| `--space-16` | `4rem`    | 64px         | 大規模なセクション区切り                         |
| `--space-20` | `5rem`    | 80px         | ページレベルのトップマージン、ヒーローセクション |

## グリッドシステム

レイアウト構築のための 12 カラムグリッドシステムです。

```css
--grid-columns: 12;
--grid-gutter: 1.5rem; /* 24px */
--grid-margin: 1rem; /* 16px、モバイル用 */
```

## コンテナ幅

異なるビューポートサイズに対応するコンテナ幅です。

```css
--container-sm: 540px; /* 小型デバイス */
--container-md: 720px; /* タブレット */
--container-lg: 960px; /* 小型デスクトップ */
--container-xl: 1140px; /* 標準デスクトップ */
--container-xxl: 1320px; /* 大型デスクトップ */
```

## ブレークポイント

レスポンシブデザインのためのブレークポイントです。

```css
--breakpoint-sm: 576px;
--breakpoint-md: 768px;
--breakpoint-lg: 992px;
--breakpoint-xl: 1200px;
--breakpoint-xxl: 1400px;
```

## コンポーネントスペーシング

特定のコンポーネントに適用される標準スペーシングの例です。

### ボタン

```css
--button-padding-sm: var(--space-1) var(--space-2); /* 4px 8px */
--button-padding-md: var(--space-2) var(--space-4); /* 8px 16px */
--button-padding-lg: var(--space-3) var(--space-6); /* 12px 24px */
```

### カード

```css
--card-padding: var(--space-4); /* 16px */
--card-spacing: var(--space-3); /* 12px、カード内の要素間 */
--card-margin-bottom: var(--space-6); /* 24px、カード間のマージン */
```

### フォーム要素

```css
--form-spacing: var(--space-4); /* 16px、フォーム要素間 */
--input-padding: var(--space-2) var(--space-3); /* 8px 12px */
--input-margin-bottom: var(--space-3); /* 12px */
```

### リスト

```css
--list-item-spacing: var(--space-2); /* 8px、リストアイテム間 */
--list-margin: var(--space-4) 0; /* 16px 0、リストのマージン */
```

### チャット特有のスペーシング

```css
--message-padding: var(--space-3) var(--space-4); /* 12px 16px */
--message-spacing: var(--space-3); /* 12px、メッセージ間 */
--chat-section-spacing: var(--space-6); /* 24px、チャットセクション間 */
```

## スペーシングユーティリティクラス

```css
/* マージン */
.m-0 {
  margin: 0;
}
.m-1 {
  margin: var(--space-1);
}
.m-2 {
  margin: var(--space-2);
}
/* ... 他のサイズも同様 */

/* 方向別マージン */
.mt-1 {
  margin-top: var(--space-1);
}
.mr-1 {
  margin-right: var(--space-1);
}
.mb-1 {
  margin-bottom: var(--space-1);
}
.ml-1 {
  margin-left: var(--space-1);
}
/* ... 他のサイズと方向も同様 */

/* パディング */
.p-0 {
  padding: 0;
}
.p-1 {
  padding: var(--space-1);
}
.p-2 {
  padding: var(--space-2);
}
/* ... 他のサイズも同様 */

/* 方向別パディング */
.pt-1 {
  padding-top: var(--space-1);
}
.pr-1 {
  padding-right: var(--space-1);
}
.pb-1 {
  padding-bottom: var(--space-1);
}
.pl-1 {
  padding-left: var(--space-1);
}
/* ... 他のサイズと方向も同様 */

/* ギャップ */
.gap-1 {
  gap: var(--space-1);
}
.gap-2 {
  gap: var(--space-2);
}
/* ... 他のサイズも同様 */
```

## スペーシングの使用ガイドライン

1. **一貫性**: 視覚的なリズムを生み出すために、定義済みのスペーシングスケールを一貫して使用する
2. **目的**: 関連性の高い要素間には小さいスペース、関連性の低い要素間には大きいスペースを使用
3. **レスポンシブ**: 小さい画面では比例的にスペーシングを縮小する場合がある
4. **階層**: スペーシングを使って視覚的階層を強化する（重要な要素には余白を多く）
5. **コンテキスト**: コンポーネントの用途と周囲の環境に応じてスペーシングを調整する

## 実装例

```jsx
// ボタングループの例
<div className="gap-2" style={{ display: 'flex' }}>
  <Button>保存</Button>
  <Button variant="secondary">キャンセル</Button>
</div>

// カード例
<div className="p-4 mb-6" style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--border-radius-md)' }}>
  <h3 className="mb-3">カードタイトル</h3>
  <p className="mb-4">カードの内容がここに表示されます。</p>
  <Button>詳細を見る</Button>
</div>

// フォーム例
<form className="p-4">
  <div className="mb-4">
    <label className="mb-2 block">ユーザー名</label>
    <input type="text" className="p-2" />
  </div>
  <div className="mb-4">
    <label className="mb-2 block">パスワード</label>
    <input type="password" className="p-2" />
  </div>
  <Button className="mt-2">ログイン</Button>
</form>
```
