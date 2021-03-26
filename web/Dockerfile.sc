FROM node:14.15.4-alpine
RUN mkdir -p /app
RUN npm config set registry https://registry.npm.taobao.org
COPY . /app
WORKDIR /app
EXPOSE 4000
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
