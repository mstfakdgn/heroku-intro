const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geocode.js");
const weather = require("./utils/weather.js");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine(hbs) dynamic template
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directroy
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mustafa Akdoğan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "helpText",
    title: "Help",
  });
});

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Provide a search parameter",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide a address parameter",
    });
  }

  geoCode(req.query.address, (error, { latitute, longitute, place } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    } else {
      weather(latitute, longitute, (weatherError, weatherData) => {
        if (weatherError) {
          return res.send({
            error: weatherError,
          });
        }
        res.send({
          weather: weatherData,
          address: place,
        });
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "NotFound 404",
  });
});

app.listen(3000, () => {
  console.log("Server up in 3000");
});
