# 使用Node.js作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 安装 git, python3 和其他必要的构建工具
RUN apk add --no-cache git openssh python3 make g++

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build:prod

# 使用nginx来serve静态文件
FROM nginx:alpine

# 复制构建产物到nginx目录
COPY --from=0 /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 