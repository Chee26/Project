# 使用官方Node.js镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json到工作目录
COPY package*.json ./

# 安装项目依赖
RUN yarn

# 复制项目文件到工作目录
COPY . .

# 构建项目（确保在生产模式下构建）
RUN yarn build

# 暴露容器运行时监听的端口
EXPOSE 3000

# 配置容器启动时运行的命令
CMD ["npm", "run", "dev"]
