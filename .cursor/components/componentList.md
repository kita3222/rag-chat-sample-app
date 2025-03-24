# コンポーネント一覧

このドキュメントでは、デザインシステムに含まれるコンポーネントの一覧を管理します。コンポーネントの追加や変更の際には、このリストを更新してください。

## コアコンポーネント

基本的な UI の構成要素となるシンプルで汎用性の高いコンポーネント群です。

| コンポーネント名 | 説明                                         | 状態   | 実装パス                   | ユーザー優先度 |
| ---------------- | -------------------------------------------- | ------ | -------------------------- | -------------- |
| Button           | ユーザーアクションを促すボタンコンポーネント | 計画中 | components/core/Button     | 未定           |
| Input            | テキスト入力フィールド                       | 計画中 | components/core/Input      | 未定           |
| Checkbox         | チェックボックス入力                         | 計画中 | components/core/Checkbox   | 未定           |
| Radio            | ラジオボタン入力                             | 計画中 | components/core/Radio      | 未定           |
| Select           | ドロップダウン選択メニュー                   | 計画中 | components/core/Select     | 未定           |
| TextArea         | 複数行テキスト入力                           | 計画中 | components/core/TextArea   | 未定           |
| Icon             | アイコン表示                                 | 計画中 | components/core/Icon       | 未定           |
| Typography       | テキスト表示用コンポーネント                 | 計画中 | components/core/Typography | 未定           |
| Toggle           | オン/オフ切り替えスイッチ                    | 計画中 | components/core/Toggle     | 未定           |
| Link             | ハイパーリンク                               | 計画中 | components/core/Link       | 未定           |

## レイアウトコンポーネント

ページレイアウトを構築するためのコンポーネント群です。

| コンポーネント名 | 説明                       | 状態   | 実装パス                    | ユーザー優先度 |
| ---------------- | -------------------------- | ------ | --------------------------- | -------------- |
| Container        | コンテンツの最大幅を制御   | 計画中 | components/layout/Container | 未定           |
| Grid             | グリッドレイアウトシステム | 計画中 | components/layout/Grid      | 未定           |
| Stack            | 要素の垂直/水平配置        | 計画中 | components/layout/Stack     | 未定           |
| Header           | ページヘッダー             | 計画中 | components/layout/Header    | 未定           |
| Footer           | ページフッター             | 計画中 | components/layout/Footer    | 未定           |
| Sidebar          | サイドバー                 | 計画中 | components/layout/Sidebar   | 未定           |
| Main             | メインコンテンツエリア     | 計画中 | components/layout/Main      | 未定           |
| Section          | セクション区切り           | 計画中 | components/layout/Section   | 未定           |
| Divider          | 区切り線                   | 計画中 | components/layout/Divider   | 未定           |

## 複合コンポーネント

コアコンポーネントを組み合わせた、より複雑な機能を持つコンポーネント群です。

| コンポーネント名 | 説明                         | 状態   | 実装パス                        | ユーザー優先度 |
| ---------------- | ---------------------------- | ------ | ------------------------------- | -------------- |
| Card             | 情報をカード形式で表示       | 計画中 | components/composite/Card       | 未定           |
| Modal            | モーダルダイアログ           | 計画中 | components/composite/Modal      | 未定           |
| Navigation       | ナビゲーションメニュー       | 計画中 | components/composite/Navigation | 未定           |
| Form             | フォームレイアウト           | 計画中 | components/composite/Form       | 未定           |
| Tabs             | タブ切り替え                 | 計画中 | components/composite/Tabs       | 未定           |
| Table            | データテーブル               | 計画中 | components/composite/Table      | 未定           |
| Pagination       | ページネーションコントロール | 計画中 | components/composite/Pagination | 未定           |
| Alert            | 通知・アラートメッセージ     | 計画中 | components/composite/Alert      | 未定           |
| Tooltip          | ツールチップ                 | 計画中 | components/composite/Tooltip    | 未定           |
| Accordion        | アコーディオンパネル         | 計画中 | components/composite/Accordion  | 未定           |
| Dropdown         | ドロップダウンメニュー       | 計画中 | components/composite/Dropdown   | 未定           |
| Breadcrumb       | パンくずリスト               | 計画中 | components/composite/Breadcrumb | 未定           |

## 状態の定義

コンポーネントの開発状態を以下のように定義します：

- **計画中**: 要件定義や設計前の初期状態
- **設計中**: デザイン仕様の作成中
- **実装中**: コード実装の進行中
- **レビュー中**: 実装完了後のレビューフェーズ
- **完了**: 実装・テスト・ドキュメント化が完了した状態
- **廃止予定**: 将来的に廃止される予定のコンポーネント
- **廃止**: 使用が推奨されないコンポーネント

## ユーザー優先度の定義

ユーザーとの対話によって決定されるコンポーネントの優先度を以下のように定義します：

- **最高**: 最優先で開発すべきコンポーネント。プロジェクトの成功に不可欠
- **高**: 初期リリースに含めるべき重要なコンポーネント
- **中**: 可能であれば初期リリースに含めたいコンポーネント
- **低**: 後続のリリースで対応可能なコンポーネント
- **未定**: ユーザーとの対話によって優先度が未決定のコンポーネント

## ユーザーフィードバック収集状況

| コンポーネント | フィードバック収集日 | 主要な要求事項 | 優先度変更 |
| -------------- | -------------------- | -------------- | ---------- |
|                |                      |                |            |

## コンポーネント追加のガイドライン

新しいコンポーネントを追加する際は、以下の点を考慮してください：

1. **必要性**: 既存のコンポーネントで代替できないか確認
2. **汎用性**: 多くのユースケースで使用できる汎用的な設計を心がける
3. **整合性**: 既存のデザイン原則と一貫性を保つ
4. **アクセシビリティ**: WCAG AA レベルの基準を満たすよう設計・実装
5. **テスト可能性**: 自動テストが可能な設計にする
6. **ユーザーニーズ**: ユーザーからのフィードバックと優先度に基づいて実装を計画する
