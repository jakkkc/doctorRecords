const express = require("express");

const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

const users = fs.readFileSync("users.json");
const parsedUsers = JSON.parse(users);

const patients = fs.readFileSync("patients.json");
const parsedpatients = JSON.parse(patients);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", "views");

const port = 3000;

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  for (let i = 0; i < parsedUsers.length; i++) {
    if (
      req.body.email === parsedUsers[0].email &&
      req.body.password === parsedUsers[0].password &&
      req.body.role === "doctor"
    ) {
      res.redirect("/patientsrecords");
    } else if (
      req.body.email === parsedUsers[1].email &&
      req.body.password === parsedUsers[1].password &&
      req.body.role === "receptionist"
    ) {
      res.redirect("/newpatient");
    } else {
      res.redirect("/");
    }
  }
});

app.get("/patientsrecords", (req, res) => {
  res.render("allpatients", { parsedpatients });
});

app.get("/newPatient", (req, res) => {
  res.render("addpatients");
});

app.post("/newPatient", (req, res) => {
  parsedpatients.push(req.body);
  fs.writeFileSync("./patients.json", JSON.stringify(parsedpatients));
  res.redirect("/newPatient");
});

app.listen(port, () => {
  console.log("app is running on port ", port);
});
