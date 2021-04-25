FROM node:10.23.1

COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app
WORKDIR /app

# install dependencies
RUN npm install

# expose server port
EXPOSE 3000

ENTRYPOINT ["npm", "start"]