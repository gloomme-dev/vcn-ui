## develop stage
#FROM node:13.14-alpine as develop-stage
#WORKDIR /nnpcCargo
#COPY package*.json ./
#RUN yarn global add @quasar/cli
##COPY . .
## build stage
#FROM develop-stage as build-stage
#RUN yarn
#RUN quasar build -m pwa
## production stage
#FROM nginx:1.17.5-alpine as production-stage
#COPY --from=build-stage /nnpcCargo/dist/pwa /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]


FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install
    CMD ["yarn", "run", "start"]
