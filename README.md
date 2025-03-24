# design-system-cursor-rules

このリポジトリは、Cursor 上でデザインシステムを構築・管理するためのルールを提供します。


## リポジトリ構造

```
design-system/
├── .cursor/                    # Cursorルール
│   ├── memory/                 # メモリ管理
│   ├── flow/                   # デザインシステム開発フロー定義
│   └── rules/                  # デザインシステム開発ルール
├── docs/                       # ドキュメント
│   ├── tokens/                 # デザイントークンのドキュメント
│   ├── components/             # コンポーネントのドキュメント
│   └── patterns/               # パターンのドキュメント
├── src/                        # ソースコード
│   ├── components/             # 基本コンポーネント
│   │   ├── button/             
│   │   ├── input/             
│   │   └── ...                 
│   ├── layouts/                # レイアウトコンポーネント
│   │   ├── header/             
│   │   ├── footer/             
│   │   ├── sidebar/            
│   │   └── grid/               
│   └── features/               # 機能別実装
│       ├── <segment1>/         
│       │   └── components/     
│       └── <segment2>/         
│           └── components/    
└── .storybook/                 # Storybook設定ファイル
```

## デザインシステム開発フロー

以下のようなフローでデザインシステムの開発を行います。
2~5で生成された内容をStoryBook上で検討・検証を繰り返し行います。

1. **デザイントークン定義**: 色、タイポグラフィ、スペーシングなどの基本要素を定義
2. **基本コンポーネント設計**: ボタン、入力フィールドなどの基本的な UI 要素のデザインと実装
3. **レイアウトコンポーネント設計**: 基本コンポーネントを組み合わせたレイアウトの設計と実装
4. **機能別複合コンポーネント設計**: 特定機能向けの複合コンポーネントの設計と実装
5. **画面実装**: 実際の画面をコンポーネントとパターンを組み合わせて実装

## 始め方

1. Use this template からリポジトリを新たに作成
2. `.cursor` ディレクトリの内容を確認し、デザインシステム開発ルールを把握
3. `.cursor/flow/designSystemFlow.md` に定義された開発フローに従ってデザインシステムを構築する。
4. `npm run storybook` を実行して生成したコンポーネントを確認し、検証を行う。
5. 生成したコンポーネントに基づき、各画面の実装を進める
