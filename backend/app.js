const { server } = require("./index");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
require("dotenv").config();
const dotenv = require("dotenv").config();
const uri = `${process.env.DB_MONGO_DB}`;

mongoose.set('useCreateIndex', true)
mongoose.connect(uri)
// mongoose.connect('mongodb://localhost:27017/notes');
// mongoose.connect('mongodb://admin-abe2:Alpha123num@ds125486.mlab.com:25486/avanced-notes-app')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
