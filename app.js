var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const sqlite3 = require("sqlite3").verbose();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.get("/123", (req, res) => {
  res.status(200).send("HELLO!!!");
});

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
