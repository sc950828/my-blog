FROM node:10.15.3

LABEL maintainer="randy"

COPY . /app

WORKDIR /app

RUN ls

RUN npm install

RUN ls 

EXPOSE 3000

CMD [ "npm", "start"]
