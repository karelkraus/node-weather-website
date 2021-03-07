const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine  and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    firstName: "Karlik",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    firstName: "Karlik",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help yourself",
    msg: "We will not help",
    firstName: "Karlik",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "You must provide an address" });

  const address = req.query.address;

  geocode(address, (error, { lat, lng, location } = {}) => {
    if (error) return res.send({ error });

    forecast(lng, lat, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found",
    firstName: "Karlik",
    title: "Help 404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Page not found",
    firstName: "Karlik",
    title: 404,
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});