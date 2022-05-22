const express = require('express');
const axios = require('axios')
const ejs = require('ejs');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.post('/weather', (req, res) => {
    
    let dt = new Date();

    let place = req.body.location;
    let currDate = dt.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
    let currYear = dt.getFullYear();
    let currTime = dt.toLocaleTimeString('en-IN');

    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
            q: place,
            lang: 'en',
            units: 'metric'
        },
        headers: {
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
          'X-RapidAPI-Key': 'c3b5dff568msh80627f4f0d7354ap100bfbjsn38619fbe82a0'
        }
    };
    
    axios.request(options).then(function (response) {
        
        console.log(response.data);

        res.render('weather.ejs', {
            loc: place,
            date: currDate,
            year: currYear,
            time: currTime,
            icon: response.data.weather[0].icon,
            temp: response.data.main.temp,
            desc: response.data.weather[0].description, 
            type: response.data.weather[0].main
        });

    }).catch(function (error) {
        console.error(error);
    });
      
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`weather app running on http://localhost:${PORT}`));