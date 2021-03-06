const path = require("path");
const express = require("express");
const hbs = require("hbs");
const env = require("dotenv").config();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Lemon Drop Kid"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Lemon Drop Kid"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help Page",
    name: "Lemon Drop Kid"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must include an address"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(longitude, latitude, (error, forecast) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          location,
          forecast,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/currentlocation", (req, res) => {
  const { latitude, longitude } = req.query;
  forecast(longitude, latitude, (error, forecast) => {
    if (error) {
      return res.send({
        error
      });
    }
    res.send({
      location: "At your current location",
      forecast,
      address: req.query.address
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  const url = req.url.split("/");
  res.render("404", {
    title: "Page Not Found",
    notFoundMessage: url[2] + " article not found",
    name: "Lemon Drop Kid"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    notFoundMessage: "Page not found",
    name: "Lemon Drop Kid"
  });
});

app.listen(port, () => console.log("Connected to server..."));
