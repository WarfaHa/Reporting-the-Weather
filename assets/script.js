// 

var apiKey = "d2e8a2ba66ffa64874aae0ac89d15d3c";
var searchCityEl = document.getElementById("searchCity");




var timeDisplayEl = $('#currentDay');

function displayTime() {
    var rightNow = dayjs().format('dddd, MMMM D, YYYY');
    timeDisplayEl.text(rightNow);
    
  }
  

displayTime();
setInterval(displayTime, 1000);


$(".search-button").on("click", function() {
 var currentCity = searchCityEl.value;
  apiURL= "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&APPID=" + apiKey;

  fetch(apiURL, {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: 'reload',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        document.getElementById("cityname").textContent = "City: " + data.name;
        var temperature = Math.ceil((data.main.temp  - 273.15) * 1.80 + 32);
       document.getElementById("temp").textContent = "Temp: " + temperature +"°F";
       var windSpeed = Math.ceil(data.wind.speed*2.237);
       document.getElementById("wind").textContent = "Wind: " + windSpeed +" mph";
       document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
    //   Testing Fetching API city name
       console.log(data.name);
    });
    

});

$(".clear-history").on("click", function() {
    // testing search button
    console.log("clear history button works");

});



