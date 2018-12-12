const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');
var fs = require('fs');
const port = 3000

app.use(bodyParser.json({limit: 10241020, type: 'application/json'}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan());

app.get('/partner', (request, response) => {
  return response.send('Hello from Express!')
});

app.post('/partner', (request, response) => {
  console.log("request.body: ", request.body);
  const json = JSON.stringify(request.body);
  fs.writeFileSync(`response.json`, json, 'utf8');
  return response.status(200).send();
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});

