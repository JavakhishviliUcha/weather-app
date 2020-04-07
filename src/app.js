const path = require("path");
const express = require("express");
const hbs = require("hbs");

const utils = require("./utils/utils");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Andrew",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "This is help page",
    name: "Andrew",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }

  utils.geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    utils.forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        temp: forecastData.temperature,
        location: data.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorText: "Help article was not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorText: "Page not found...",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
