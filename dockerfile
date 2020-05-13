FROM node:lts-alpine

MAINTAINER Xiao

LABEL description="Creater is Xiao"

COPY ./dist ./

RUN npm install

RUN node ./dist/server
