# Docker Next.js PostgreSQL setup

Next.js (App Router), Prisma, PostgreSQL を使用した Todo アプリケーションの Docker 開発環境です。

## 前提条件

- [Docker](https://www.docker.com/) Desktop がインストールされていること

## 環境構築手順

### 1. 初期セットアップ

まず、環境変数ファイルを準備し、コンテナを起動します。

```bash
# 環境変数ファイルの作成
cp .env.example .env
cp src/.env.example src/.env

# コンテナのビルドと起動
docker compose up -d
```

> [!IMPORTANT]
> `src/.env` を作成した後、`.env` 内の `DATABASE_URL` の値を `src/.env` にもコピー（または書き換え）してください。

### 2. パッケージのインストールとセットアップ

コンテナ内で以下のコマンドを実行し、依存関係のインストールとデータベースのセットアップを行います。

```bash
# アプリケーションコンテナに入る
docker compose exec app bash

# 依存パッケージのインストール
npm install

# データベースのマイグレーションとクライアント生成
npx prisma migrate dev

# 初期データ（Seeder）の投入
npx prisma db seed
```

### 3. アプリケーションの動作確認

```bash
# 開発サーバーの起動（コンテナ内）
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## 開発コマンド

### データベース操作

```bash
# コンテナに入る
docker compose exec app bash

# マイグレーションの作成と適用
npx prisma migrate dev --name <migration_name>

# Seeder の再実行
npx prisma db seed
```

### テストの実行

```bash
# テストの実行（コンテナ内）
npm test
```

## 技術スタック

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL 17
- **ORM**: Prisma 7
- **Environment**: Docker
