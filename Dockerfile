FROM node:20-slim

# 基本的なツールのインストール（手動操作を容易にするため）
RUN apt-get update && apt-get install -y \
    postgresql-client \
    git \
    procps \
    && rm -rf /var/lib/apt/lists/*

# npmの最新化
RUN npm install -g npm@latest

WORKDIR /app

# コンテナを起動し続けるための設定
CMD ["tail", "-f", "/dev/null"]
