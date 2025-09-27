# Tabelog Clone | モダンな店舗レビューサイト

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffuminico%2Ftabelog)

これは、Next.js (App Router), Prisma, Supabase (PostgreSQL) を使用して構築された、高機能な店舗レビューサイトのプロトタイプです。洗練されたダークテーマのUIと、堅牢なバックエンドを備えています。

---

## 機能要件 (Features)

-   **店舗管理**:
    -   店舗の一覧表示（画像付きカードレイアウト）
    -   店舗の詳細情報の表示
    -   画像URLを含む、新規店舗の登録
-   **レビュー機能**:
    -   店舗ごとのレビュー一覧表示
    -   評価（5段階）とコメントの投稿
-   **UI/UX**:
    -   Framer Motionによるスムーズなページ遷移とアイテム表示アニメーション
    -   shadcn/ui と Tailwind CSS による、モダンでレスポンシブなダークテーマUI
-   **スパム対策**:
    -   レビュー投稿時の簡易CAPTCHA（計算問題）
    -   APIレベルでのレートリミット（同一IPからの連続投稿を制限）

## 技術スタック (Tech Stack)

-   **フレームワーク**: [Next.js](https://nextjs.org/) (App Router)
-   **言語**: [TypeScript](https://www.typescriptlang.org/)
-   **UI**: [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **データベース**: [PostgreSQL](https://www.postgresql.org/) ([Supabase](https://supabase.com/))
-   **デプロイ**: [Vercel](https://vercel.com/)

## データベース設計 (Database Schema)

IDには、SupabaseのConnection Poolerと互換性のあるUUID形式を採用しています。

```prisma
model Store {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String
  address     String
  category    String
  photo_url   String?
  description String?
  created_at  DateTime @default(now())
  reviews     Review[]
}

model Review {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  store_id   String   @db.Uuid
  rating     Int
  comment    String
  created_at DateTime @default(now())
  store      Store    @relation(fields: [store_id], references: [id], onDelete: Cascade)
}
```

---

## 開発環境の構築 (Getting Started)

### 1. 前提条件 (Prerequisites)

-   [Node.js](https://nodejs.org/en/) (v18.x 以降)
-   [npm](https://www.npmjs.com/) (v8.x 以降)
-   [Git](https://git-scm.com/)
-   [Supabase](https://supabase.com/) アカウント

### 2. インストールとセットアップ

1.  **リポジトリをクローンします。**
    ```bash
    git clone https://github.com/fuminico/tabelog.git
    cd tabelog
    ```

2.  **依存関係をインストールします。**
    ```bash
    npm install
    ```

3.  **データベースをセットアップします。**
    -   Supabaseで新しいプロジェクトを作成します。
    -   プロジェクトのルートに `.env` ファイルを作成します。
    -   プロジェクトの `Settings` > `Database` に移動し、**Connection Pooling**用の接続文字列（URI）をコピーします。
    -   コピーした接続文字列を `DATABASE_URL` として `.env` ファイルに貼り付けます。
      ```.env
      # Supabase Connection Pooler URL
      DATABASE_URL="postgresql://postgres.[YOUR-REF]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
      ```

4.  **データベーススキーマを適用します。**
    SupabaseのSQL Editorを開き、`prisma/migrations/.../migration.sql` の内容を貼り付けて実行するか、手動でテーブルを作成してください。（`prisma migrate` はConnection Poolerでは動作しません）

5.  **(任意) 初期データを投入します。**
    デモ用の店舗データを投入するには、SupabaseのSQL Editorで `prisma/seed.sql` (手動で作成) を実行するか、アプリケーションから店舗を登録してください。

6.  **開発サーバーを起動します。**
    ```bash
    npm run dev
    ```
    ブラウザで `http://localhost:3001` を開くと、アプリケーションが表示されます。

## デプロイ (Deployment)

このプロジェクトはVercelへのデプロイに最適化されています。

1.  リポジトリをGitHubにプッシュします。
2.  Vercelで新しいプロジェクトを作成し、GitHubリポジトリをインポートします。
3.  **環境変数を設定します。**
    -   Vercelのプロジェクト設定で、`DATABASE_URL` という名前の環境変数を追加します。
    -   値には、Supabaseの**Connection Pooling**用接続文字列を貼り付けます。
    -   **重要**: 接続文字列の末尾に、必ず `?sslmode=require&pgbouncer=true` を追加してください。
      ```
      postgresql://postgres.[REF]:[PASS]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
      ```
4.  「Deploy」ボタンを押すと、ビルドとデプロイが自動的に開始されます。