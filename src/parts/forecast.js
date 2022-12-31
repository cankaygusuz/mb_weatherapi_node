const request = require("request")




const forecast = (lat,lon, callback) => {
    const forecastURL = 'http://api.weatherstack.com/current?access_key=27cc730e0430908e5b94169da6e54132&query=' + [encodeURIComponent(lat) , encodeURIComponent(lon)];
    console.log("coordinates:" + forecastURL);
    request({ url: forecastURL, json: true}, (error, response) => {
        if (error){
            callback('unable to connect to forecast service!', undefined);
        } else if (response.body.current === undefined){
            callback('incorrect coordination!', undefined)
        } else callback(undefined, {
            'currentTemp': response.body.current.temperature
        })
        var currentTemp = response.body.current.temperature;
        console.log("temp:" + currentTemp);
    })
    
}


  module.exports = forecast;