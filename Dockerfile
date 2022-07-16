FROM node:16-alpine

WORKDIR /bot/


COPY . /bot/

RUN yarn
CMD ["yarn", "start"]