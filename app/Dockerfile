FROM dockerhub.timeweb.cloud/library/alpine:latest
WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Запускаем приложение
CMD ["node", "app.js"]
