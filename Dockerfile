FROM node:14.16.0-alpine

ENV NODE_ENV production

WORKDIR /server/app

COPY package.json /server/app/package.json
COPY package-lock.json /server/app/package-lock.json

RUN npm install

COPY . /server/app

CMD [ "npm", "start" ]