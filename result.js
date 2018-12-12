const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const dbURI =
  process.env.MONGOURI ||
  "mongodb://ind:ind@ds.mlab.com:27604/indorse";
const connection = mongoose.createConnection(dbURI);
autoIncrement.initialize(connection);

const ResultSchema = new mongoose.Schema({
  responseBody: { type: Object, required: true },
});

ResultSchema.plugin(autoIncrement.plugin, { model: "Result", field: "result_id" });

module.exports = mongoose.model("Result", ResultSchema);
