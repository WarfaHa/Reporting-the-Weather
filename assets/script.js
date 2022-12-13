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
       document.getElementById("temp").textContent = "Temp: " + data.main.temp;
       document.getElementById("wind").textContent = "Wind: " + data.wind.speed;
       document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity;
    //   Testing Fetching API city name
       console.log(data.name);
    });
    // testing search button
    // console.log(currentCity);

});

$(".clear-history").on("click", function() {
    // testing search button
    console.log("clear history button works");

});


// Console logs API in the console log


