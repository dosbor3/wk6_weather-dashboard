/*
*/

//OpenWeather API key
var apiKey = "8d4e7337b0329ab52081ed5c7aef9126";


var getWeatherData = function(city) {   
    var apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    console.log(apiUrl);

    fetch(apiUrl).then(function(response) {
        if (response.ok) {  
            response.json().then(function(data) {
            console.log(data);
        });
        } 
        else {
            alert('Error: City Not Found');
        }
    })       
        
        .catch(function(error) {
            
            alert("Unable to connect to Open Weather");
        });
    };

    getWeatherData("Atlanta");