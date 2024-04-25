FROM node:21.2-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm set strict-ssl false

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
