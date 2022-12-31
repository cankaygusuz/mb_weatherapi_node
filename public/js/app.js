console.log('client side javascript code');

const weatherForm = document.querySelector('form')
const searchedVal = document.querySelector('input')
const message1    = document.querySelector('#message-1')
const message2    = document.querySelector('#message-2')

message1.textContent = 'Location: ' + searchedVal.value
message2.textContent = 'Current temperature: '

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    var location = searchedVal.value
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
                
            }

        })
    })
    
})