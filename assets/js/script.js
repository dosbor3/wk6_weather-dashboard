
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var dataContainerEl = document.querySelector("#data-container");
var citySearchTerm = document.querySelector("#city-search-term");
var dateEl = document.querySelector("#current-date-display");
var apiKey = "8d4e7337b0329ab52081ed5c7aef9126";
var historyDivEl = document.querySelector("#history");
var temp = "";
var wind = "";
var humidity = "";
var index = "";
var target = "";
var newCity = "";



cityFormEl.addEventListener("submit", function(event) {    
    event.preventDefault();    
    var city = cityInputEl.value.trim();    

    if (city) {
        getWeatherData(city);
        saveCities(city);
        cityInputEl.value = ""; 
    }
    else {  
        alert("Please enter a City Name.");
    }
});


var getWeatherData = function(city) {   
    var apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {  
            response.json().then(function(data) {
            displayWeatherData(data, city);
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
var displayWeatherData = function(weatherData, searchTerm){
    if(weatherData.length === 0) {
        dataEl.textContent = "No weather data found for " + searchTerm;
        alert(JSON.stringify(weatherData));
        return;
    }

    dataContainerEl.textContent = "";
    var date = moment().format('L');
    citySearchTerm.innerHTML = searchTerm + "<span id='current-date-display'> (" + date + ")</span>"; 
          
    temp = "Temp: " + weatherData.main.temp + " \u00B0F";    

    wind = "Wind: " +  Math.trunc(weatherData.wind.speed) + " MPH";

    humidity = "Humidity: " + Math.trunc(weatherData.main.humidity) + " %";        
    
    var dataEl = document.createElement("div");
    dataEl.classList = "list-group";    
        
    var tempEl = document.createElement("h3");
    tempEl.textContent = temp;

    var windEl = document.createElement("h3");
    windEl.textContent = wind;

    var humidityEl = document.createElement("h3");
    humidityEl.textContent = humidity;

    dataEl.appendChild(tempEl);
    dataEl.appendChild(windEl);
    dataEl.appendChild(humidityEl);
    dataContainerEl.appendChild(dataEl);        
    
}

var saveCities = function(city) {
    var cities = [];
    cities = JSON.parse(localStorage.getItem("session")) || [];
   
    // Push the new data (whether it be an object or anything else) onto the array
   cities.push(city);   
   
   // Re-serialize the array back into a string and store it in localStorage
   localStorage.setItem("session", JSON.stringify(cities));
   
   for (var i = 0; i < 8; i++) {
       var historyEl = document.createElement("button");
       var name = "btn-" + i;
       newCity = cities[i]
       historyEl.classList = "btn btn-secondary btn-outline-dark btn-lg text-white";
       historyEl.setAttribute("type", "button");
       historyEl.setAttribute("id", name);
       historyEl.setAttribute("data-city", city);
       historyEl.addEventListener("click", function(event) {
           target = this.id;
           newCity = historyEl.getAttribute("data-city");
           cityHistoryBtnClick(target);
       })
       historyEl.textContent = cities[i];

       historyDivEl.appendChild(historyEl);

   }  


};

var cityHistoryBtnClick = function(target){
    if (target) {  
        var cityUpdateEl = document.querySelector("#" + target).textContent;
        getWeatherData(cityUpdateEl);
       
    }
    
    
};

