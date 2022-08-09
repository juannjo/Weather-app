const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.listen(3000, () => console.log("running in port 3000"));

app.post('/', (req, res) => {
    console.log(req.body.cityName);
    const apiKey = "94bb80dec4c50fa34c1aa513f45f497a";
    const query = req.body.cityName;
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    https.get(url, (response) => {
        console.log(response.statusCode);
        
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const city = weatherData.name;
            const currentTemp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<h1>The temperature in ${city} is ${currentTemp}</h1>`);
            res.write(`<h2>The weather is currently ${weatherDescription}</h2>`);
            res.write(`<img src='${iconUrl}'>`);
            res.send();
        })
    })
})




// app.get("/", (req, res) => {
    
// });

// 