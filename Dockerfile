FROM node:16-alpine

RUN yarn
CMD ["yarn", "start"]