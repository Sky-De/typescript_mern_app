FROM node:18
WORKDIR /app
COPY package*.jsom ./
RUN npm install
COPY . .
EXPOSE 2323
CMD ["node","server.js"]