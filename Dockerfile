FROM node:14.14.0-alpine
WORKDIR /usr/my-server
ADD package*.json ./
RUN npm i
ADD ./ ./
CMD [ "npm", "run", "dev" ]