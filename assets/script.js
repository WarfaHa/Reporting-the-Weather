// 

var apiKey = "d2e8a2ba66ffa64874aae0ac89d15d3c";
var searchCityEl = document.getElementById("searchCity");
var searchHistory = [];



var time = "";

function displayTime() {
    var rightNow = dayjs().format('(MM/DD/YYYY)');
    time= rightNow;
    
  }
  

displayTime();
setInterval(displayTime, 1000);

function getWeather(){
  
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
        document.getElementById("cityname").textContent = data.name +" " + time;
        var temperature = Math.ceil((data.main.temp  - 273.15) * 1.80 + 32);
       document.getElementById("temp").textContent = "Temp: " + temperature +"°F";
       var windSpeed = Math.ceil(data.wind.speed*2.237);
       document.getElementById("wind").textContent = "Wind: " + windSpeed +"mph";
       var humidity = data.main.humidity;
       document.getElementById("humidity").textContent = "Humidity: " + humidity + "%";
    //   Testing Fetching API city name
       console.log(data);
       
       searchHistory=JSON.parse(localStorage.getItem("cityname"));
      //  testing to see if local storage works
      //  console.log(searchHistory);
            if (searchHistory==null){
                searchHistory=[];
                searchHistory.push(currentCity.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(searchHistory));
            }
            else{
                searchHistory.push(currentCity.toUpperCase());
                localStorage.setItem("cityname",JSON.stringify(searchHistory));
            }
            
       forecast();
       previousCity();
    });
  }




function forecast(){
  var currentCity = searchCityEl.value;
  apiURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&APPID=" + apiKey;

  fetch(apiURL, {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
 
      for (let i = 0; i < 5; i++) {
        document.getElementById(`day${i+1}`).textContent = `Day ${i+1}`;
        var temperature = Math.ceil((data.list[i].main.temp  - 273.15) * 1.80 + 32);
        document.getElementById(`dayTemp${i+1}`).textContent = "Temp: " + temperature +"°F";
        var windSpeed = Math.ceil(data.list[i].wind.speed*2.237);
        document.getElementById(`dayWind${i+1}`).textContent = "Wind: " + windSpeed +"mph";
        var humidity = data.list[i].main.humidity;
        document.getElementById(`dayHumidity${i+1}`).textContent = "Humidity: " + humidity +"%";
      }


});
}

function previousCity(){
  const searchHistory = JSON.parse(localStorage.getItem("cityname"));
 for (let i = 0; i< searchHistory.length; i++) {
  var city = searchHistory[i];
  document.getElementById("cityButton").textContent= city;
  console.log(city);
 }

}

$(".search-button").on("click", getWeather);

$(".clear-history").on("click", function() {
    // testing search button
    console.log("clear history button works");
    searchHistory=[];
    localStorage.removeItem("cityname");
    document.location.reload();
});


