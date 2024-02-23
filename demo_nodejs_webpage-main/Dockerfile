
FROM node:alpine
COPY ./ ./
RUN npm install --save prom-client@13 prometheus-api-metrics --legacy-peer-deps
EXPOSE 8081

CMD ["npm", "start"]
