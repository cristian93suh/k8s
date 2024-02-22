
FROM node:alpine
COPY ./ ./
RUN npm install --save express prom-client prometheus-api-metrics --legacy-peer-deps
EXPOSE 8081

CMD ["npm", "start"]
