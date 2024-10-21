FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm i yarn
RUN yarn
COPY . .
RUN npx prisma generate
RUN yarn build
EXPOSE 4200
CMD [ "yarn","start:prod" ]