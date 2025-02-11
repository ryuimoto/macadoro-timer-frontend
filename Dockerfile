# Node.js 18 (M1 Mac対応)
FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json ./

# 依存関係のインストール
RUN npm install

# Next.js のコードをコピー
COPY . .

# （オプション）Next.js のビルド（開発中は必須ではない場合もあります）
# RUN npm run build

# ポート開放
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
