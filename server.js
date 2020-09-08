const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
const port = process.env.PORT || 3000;
const mongodburl =
  process.env.mongodburl ||
  "mongodb+srv://user:12345@cluster0.70k9n.gcp.mongodb.net/laundry1?retryWrites=true&w=majority";

mongoose
  .connect(mongodburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
// app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(helmet());
app.use(compression());
app.use("/shops", require("./routes/laundryshop"));
app.use("/user", require("./routes/customer"));
app.use("/admin", require("./routes/admin"));
app.use("/book", require("./routes/pickup"));
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Project Running...<h1><h2>Roshan, Lalitha and Adhish<h2>");
});
