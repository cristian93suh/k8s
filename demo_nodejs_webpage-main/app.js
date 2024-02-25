const express = require('express');
const promClient = require('prom-client');
const app = express();
const path = require('path');

const PORT = 8081;

// Inizializza il registro per le metriche di Prometheus
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Definisci metriche personalizzate
const customMetric = new promClient.Gauge({
  name: 'custom_metric',
  help: 'Descrizione della metrica personalizzata'
});

// Registra metriche personalizzate nel registro
register.registerMetric(customMetric);

// Rotta per esporre le metriche
app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});

// Altri gestori di rotte dell'applicazione
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname+'/about.html'));
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
