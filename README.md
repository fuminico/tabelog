# 簡易レビューサイト

## 概要

このプロジェクトは、Next.jsを使用して構築されたシンプルな店舗レビューサイトです。ユーザーは店舗情報を登録し、各店舗に対してレビュー（評価とコメント）を投稿することができます。

## 主な機能

- **店舗管理機能**
  - 店舗の一覧表示
  - 店舗の詳細情報の表示
  - 新規店舗の登録
- **レビュー機能**
  - 店舗ごとのレビュー一覧表示
  - レビューの投稿

## 使用技術スタック

本プロジェクトでは、モダンなWeb開発技術を採用しています。

- **フロントエンド**:
  - フレームワーク: Next.js (App Router)
  - 言語: TypeScript
  - UI: Tailwind CSS, shadcn/ui, Radix UI
  - アニメーション: Framer Motion
- **バックエンド**:
  - API: Next.js API Routes
- **データベース**:
  - 開発環境: SQLite
  - 本番環境（移行想定）: Supabase (PostgreSQL)
- **スパム対策**:
  - 簡易CAPTCHA
  - 投稿間隔の制御

## データベース設計

### ER図

```
+-------------------+        +-------------------+
|     stores        | 1    n |     reviews       |
+-------------------+        +-------------------+
| id (PK)           |<------>| id (PK)           |
| name              |        | store_id (FK)     |
| address           |        | rating            |
| category          |        | comment           |
| photo_url         |        | created_at        |
| description       |        +-------------------+
| created_at        |
+-------------------+
```

## API設計

### 店舗管理API

- `GET /api/stores`: 店舗一覧を取得
- `GET /api/stores/{id}`: 指定した店舗の詳細情報を取得
- `POST /api/stores`: 新しい店舗を登録

### レビュー管理API

- `GET /api/reviews?store_id={id}`: 指定した店舗のレビュー一覧を取得
- `POST /api/reviews`: 新しいレビューを投稿

## 開発環境のセットアップ（予定）

```bash
# 1. 依存関係のインストール
npm install

# 2. データベースのマイグレーション
npx prisma migrate dev

# 3. 開発サーバーの起動
npm run dev
```
