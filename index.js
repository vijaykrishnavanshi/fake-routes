const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectToDatabase = require("./connectDB");
const Result = require("./result");
var fs = require('fs');
const port = 4000

app.use(bodyParser.json({limit: 10241020, type: 'application/json'}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan());

app.get('/', async (request, response) => {
  return response.send('Hello from Express!')
});

app.post('/', async (request, response) => {
  await connectToDatabase();
  console.log("request.body: ", request.body);
  const result = new Result({ responseBody: request.body });
  await result.save();
  return response.status(200).send();
});

app.listen(process.env.PORT || port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});

