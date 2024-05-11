FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install 
RUN npm run build

COPY . .

EXPOSE 5000

CMD ["node", "./dist/app.js"]
