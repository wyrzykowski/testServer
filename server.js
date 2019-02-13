const express = require("express");
const hbs = require("hbs");
var app = express(); //making new express app
const fs = require("fs");
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs"); // w set to perwsze to key co chce ustawić a drugie to value

//MIDDLEWERE
app.use((req, res, next) => {
  //when next(); is call application can run again
  // if i don't call next() here nothing will load!
  var now = new Date().toString();

  console.log(`${now}: ${req.method} ${req.url}`);
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\r\n", err => {
    if (err) {
      console.log("Unable to apped to server.log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public")); // to get static path to file, __dirname is actual directrory of project
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
}); // It's use to use in partial function definated here
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    helloMessage: "Hello on Home Page!"
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Unable to hande request!" });
});

//This below can run without second argument
app.listen(port, () => {
  console.log(`server is up on port ${port} `);
});
