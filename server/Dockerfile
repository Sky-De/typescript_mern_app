FROM node:18
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2323
CMD ["node","server.js"]
