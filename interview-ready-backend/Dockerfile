FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install && npm run build

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
