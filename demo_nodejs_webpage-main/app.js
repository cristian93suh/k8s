const express = require('express');
const app = express();
const path = require('path');
const prometheus = require('prom-client');

// Inizializza il registro metriche di Prometheus
const register = new prometheus.Registry();

// Definisci e registra una metrica personalizzata
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'statusCode'],
  registers: [register],
  buckets: [0.1, 5, 15, 50, 100, 500]
});

// Middleware per registrare la durata delle richieste HTTP
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const durationInMilliseconds = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route.path, res.statusCode)
      .observe(durationInMilliseconds);
  });
  next();
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/about', (req,res) => {
  res.sendFile(path.join(__dirname+'/about.html'));
});

// Esponi le metriche di Prometheus tramite un endpoint HTTP
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Avvia il server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
