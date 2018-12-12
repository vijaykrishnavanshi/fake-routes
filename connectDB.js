const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;

// Build the connection string
const dbURI =
  process.env.MONGOURI ||
  "mongodb://ind:ind@ds.mlab.com:27604/indorse";

// Create the database connection
module.exports = () => {
  if (isConnected) {
    return Promise.resolve();
  }

  return mongoose
    .connect(dbURI)
    .then(db => {
      console.log(dbURI);
      console.log("MongoDB Connected");
      isConnected = db.connections[0].readyState;
      return isConnected;
    })
    .catch(error => {
      console.log("DB Error: ", error);
      throw error;
    });
};

