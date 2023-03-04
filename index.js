const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const electivedata = require("./studentelectiveform/elective.model");
const router = express.Router();
const serverless = require("serverless-http");
const Url = "mongodb://localhost:27017/student";
mongoose.connect(Url, { useNewUrlParser: true });
const port = 3000;
const con = mongoose.connection;
try {
  con.on("open", () => {
    console.log("Connected to database");
  });
} catch (error) {
  console.log("Error" + error);
}

const app = express();

const exp = require("constants");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors({ credentials: true, origin: true, exposedHeaders: "*" }));
router.get("/get/elective", async (req, res) => {
  let get_electivedata = await electivedata.find();
  //   let arr = [];
  //   for (let i = 0; i < get_electivedata.length; i++) {
  //     arr.push(get_electivedata[i].Elective);
  //   }
  res.render("index", { electives: get_electivedata });
});
app.use("/netlify/functions/student", router);
app.listen(port, () => {
  console.log("Server Started");
});
