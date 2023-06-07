const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {


  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
const apikey = "d2dfedead404d28131c1d847dfd7b5ad";
const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+apikey+"&units="+unit;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);
      const temp = weatherData.main.temp;
      res.write("<p>this is the weather description of the "+ query +" at this time :" +"<h2>"+weatherDescription+"</h2>"+"</p>");
      res.write("<h1> the temperature in the "+ query +" at this time is: " + temp +" degree celcius</h1>");
      const icon = weatherData.weather[0].icon;
      const imgurl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<img src="+imgurl + ">");
      res.send();
      console.log(temp);
    });
  });

});

app.listen(3000, function (req, res) {
  console.log("server is running on the port 3000");
});
