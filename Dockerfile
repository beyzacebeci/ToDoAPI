FROM node:10

WORKDIR /home/node/app

COPY . /home/node/app 

RUN npm install -g nodemon && \
    npm install express cors morgan body-parser dotenv && \
    npm install --save-dev @babel/cli @babel/core @babel/node && \
    npm install swagger-jsdoc swagger-ui-express
CMD npm run start

EXPOSE 4001