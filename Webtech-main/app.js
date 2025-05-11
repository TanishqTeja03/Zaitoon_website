const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { Timestamp } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/Reservations";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("error");
  });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/booking", (req, res) => {
  res.render("booking");
});
app.get("/confirmed", (req, res) => {
  res.render("confirmed");
});
app.get("/menu", (req, res) => {
  res.render("menu");
});


var reservationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  tableType: String,
  guestNumber: Number,
  placement: String,
  date: Date,
  time: String,
  note: String,
});
var User = mongoose.model("User", reservationSchema);

app.post("/confirmed", (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then(item => {
      User.find()
        .then(confirmed => {
          res.render("confirmed", { confirmed: confirmed });
        })
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Unable to confirm booking");
    });
});

app.get('/confirmed', function(req, res) {
  User.find({}, function(err, confirmed) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('confirmed', { confirmed: confirmed });
    }
  });
});

app.listen(8000, () => console.log("listening on 8000"));