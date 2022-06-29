const express = require("express");
const app = express();
const https = require("https"); //native node module that allows us to make http requests
const bodyParser = require("body-parser");


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName
  const key = "009ea7329a00e154a5058c6747e3418e"
  const units = "imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + units
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + description + "</p>")
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Farenheit</h1>") //res refers to our app.send response
      res.write("<img src =" + imageURL + ">");
      res.send();
    })
  })
})
