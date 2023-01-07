console.log('client side javascript code');

const weatherForm = document.querySelector('form')
const searchedVal = document.querySelector('input')
const message1    = document.querySelector('#message-1')
const message2    = document.querySelector('#message-2')
const message3    = document.querySelector('#message-3')

message1.textContent = 'Location: ' + searchedVal.value
message2.textContent = 'Current temperature: '

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let location = searchedVal.value
    location = location.charAt(0).toUpperCase() + location.slice(1);
    console.log("locat:" + location)
    message1.textContent = 'Location: ' + location
    
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    //     response.json().then((data) => {
    //         console.log(data)
    //         if (data.error) {
    //             console.log(data.error)
    //         }
    //     })
    // })
    fetch('http://api.weatherstack.com/current?access_key=27cc730e0430908e5b94169da6e54132&query=' + location ).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
                message2.textContent = 'System could not find given location.'
            } else{
                console.log(data)
                console.log(data.current.temperature)
                message2.textContent = 'Current temperature: ' + data.current.temperature

            console.log(data.current.weather_descriptions[0])

            let snowy = data.current.weather_descriptions[0].includes("Snow");
            console.log(snowy)
            if (data.current.weather_descriptions[0] == "Partly cloudy"){
                document.getElementById("weather_logo").src = '/img/overcast.png';
             } else if (data.current.weather_descriptions[0] == "Overcast"){
                document.getElementById("weather_logo").src = '/img/cloudy.png';
             } else if (data.current.weather_descriptions[0] == "Sunny"){
                document.getElementById("weather_logo").src = '/img/sun.png';
             } else if (data.current.weather_descriptions[0] == "Mist"){
                document.getElementById("weather_logo").src = '/img/mist.png';
             }  else if (data.current.weather_descriptions[0] == "Light Snow, Mist"){
                document.getElementById("weather_logo").src = '/img/snowy.png';
             } 
             else {
                document.getElementById("weather_logo").src = '';
             }

            if (snowy == true){
                document.getElementById("weather_logo").src = '/img/snowy.png';
            }

            }

        })
    })
    
})