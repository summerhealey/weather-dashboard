$(document).ready(() => {
  //Variables
  //  var apiKey = '236f61cf86e4cbb6234939b6635ebc9c';
  

  //SEARCH BUTTON
  /*Description: Button, that once pressed, provides information on city input into the search form to be displayed as current weather and five day forecast*/

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    var city = $("#search-term").val();
    console.log(city);

    currentWeather(city);
    searchHistoryDisplay();
  });

  //currentWeather FUNCTION
  /*Description: Function collects current weather data on place selected and diplays in separate card on page*/

  function currentWeather(city) {
    $.ajax({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=236f61cf86e4cbb6234939b6635ebc9c&units=imperial`,
      dataType: "json",
      success: function (response) {
        console.log(response);

        //currentWeather Variables
        var currentDateTime = moment().format("LLL");
        var cityName = response.name;
        var currentTemperature = Math.round(response.main.temp_min);
        var currentHumidity = Math.round(response.main.humidity);
        var currentWindSpeed = Math.round(response.wind.speed);

        $("#cityDate").html(
          "<h2>" + cityName + "(" + currentDateTime + ")" + "<h2>"
        );
        $("#currentIcon").attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.weather[0].icon +
            "@2x.png"
        );
        $("#humidity").text(currentHumidity + "%");
        $("#windSpeed").text(currentWindSpeed + " MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        forecastWeather(lat, lon);
      },
    });
  }

  // forecastWeather FUNCTION
  /*Description: Function collects weather data forecast from the next five days for place selected and diplays in a separate card on page per forecasted day*/
  function forecastWeather(lat, lon) {
    $.ajax({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=236f61cf86e4cbb6234939b6635ebc9c&units=imperial`,
      dataType: "json",
      success: function (response) {
        console.log(response);

        //uvIndex DISPLAY
        $("#uvIndex").html(response.current.uvi);
        if (response.current.uvi > 11) {
          $("#uvIndex").addClass("red");
        }
        if (response.current.uvi < 10) {
          $("#uvIndex").addClass("green");
        }
        if (response.current.uvi >= 10 && response.current.uvi <= 11) {
          $("#uvIndex").addClass("yellow");
        }

        //fiveDayForecast DISPLAY
        for (let i = 1; i < 6; i++) {
          console.log(response.daily[i]);

          var hourString = i.toString();
          let day = moment.unix(response.daily[i].dt).format("MM-DD");

          $("#card-date" + hourString).html("<p>" + day + "</p>");
          $("#card-temp" + hourString).html(
            "<p>" + response.daily[i].temp.day + "</p>"
          );
          $("#card-humid" + hourString).html(
            "<p>" + response.daily[i].humidity + "%</p>"
          );
          $("#card-icon" + hourString)
            .attr(
              "src",
              "http://openweathermap.org/img/w/" +
                response.daily[i].weather[0].icon +
                ".png"
            )
            .html(
              '<img src="http://openweathermap.org/img/w/"' +
                response.daily[i].weather[0].icon +
                ".png"
            );
        }
      },
    });
  }

  // searchHistoryDisplay FUNCTION
  /*Description: Displays recent searches as buttons in a list*/
  function searchHistoryDisplay() {
   
  }
  //CLEAR BUTTON
  /* Clear history function*/
  

  
});
