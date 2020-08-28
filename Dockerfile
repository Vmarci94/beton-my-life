FROM node:latest

LABEL author=varga_marton@4dsoft.hu

WORKDIR /workspace

#RUN npm i -g @nestjs/cli

COPY ./dist ./dist
COPY ./package.json ./package.json

RUN npm install

EXPOSE 3000

CMD node ./dist/main
