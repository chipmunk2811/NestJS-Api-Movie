FROM node:16

WORKDIR /usr/src/app_api_movie

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN yarn run build
EXPOSE 8080
# Start the application, 'npm start' or 'node src/index.js'
CMD ["yarn", "run","start:prod"]

# docker build . -t img-node

# Chạy trên VPS đổi lại host: localhost thành ID của VPS

