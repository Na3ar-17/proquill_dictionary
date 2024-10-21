FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm i yarn
RUN yarn
COPY . .
RUN yarn build
RUN npx prisma generate
EXPOSE 4200
CMD [ "yarn","start:prod" ]