FROM node:14.15.4-alpine
RUN mkdir -p /app
RUN npm config set registry https://registry.npm.taobao.org
COPY . /app
WORKDIR /app
EXPOSE 5000
RUN npm install
CMD ["npm", "run", "prod"]
