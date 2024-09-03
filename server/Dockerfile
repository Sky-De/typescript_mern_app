FROM node:18
WORKDIR /server
COPY package*.jsom ./
RUN npm install
COPY . .
EXPOSE 2323
CMD ["node","server.js"]
