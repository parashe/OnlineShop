const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://Nanubabu:Bct71045@nanubabu.08qrm.mongodb.net/onlineshop?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});
