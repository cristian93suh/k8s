const express = require('express');
const app = express();
const path = require('path');
var apiMetrics = require('prometheus-api-metrics');

app.use(apiMetrics());

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
  
});


app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname+'/about.html'));
   
  });

app.listen(8081, () => {
    console.log('Listening on port 8081');
});
