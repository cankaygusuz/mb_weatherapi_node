const request = require("request")
const geoCode = (address, callback) => {
    const geoCodeURL = 'http://api.weatherstack.com/current?access_key=27cc730e0430908e5b94169da6e54132&query=' + encodeURIComponent(address);
    request({ url: geoCodeURL, json: true}, (error, response) => {
        if (error){
            callback('unable to connect to location service!', undefined);
        } else if (response.body.location === undefined){
            callback('cannot find the location information', undefined)
        } else callback(undefined, {
            'lat' : response.body.location.lat,
            'lon' : response.body.location.lon,
            'temp': response.body.current.temperature
        })
        


    })
    
}

// geoCode('Karlsruhe', (error, data) => {   //commentli idi
//     if(error){
//         console.log(error)
//     };
//     if(data){
//         console.log('Data', data)
//     };
// })

// geoCode("karlsruhe", (error, {latitude, longitude, location}) => { //geoCode(req.query.address, (error, {latitude, longitude, location}) => { 
//     if (error){
//         return res.send({ error })
//     }
//     forecast(latitude, longitude, (error, forecastData) => {
//         if(error){
//             return res.send({ error })

//         }
//         res.send({
//             forecast: forecastData,
//             location,
//             addresss: req.query.address
//         })
//     })
// })

module.exports = geoCode