$(document).ready(() => {
  //Variables
  //  var apiKey = '236f61cf86e4cbb6234939b6635ebc9c';
  var searchHistory = localStorage.getItem("searchHistory")
    ? JSON.parse(localStorage.getItem("searchHistory"))
    : [];

  console.log("start:", searchHistory.length, searchHistory);
  if (searchHistory.length > 0) {
    searchHistoryDisplay();
  }

  //SEARCH BUTTON
  /*Description: Button, that once pressed, provides information on city input into the search form to be displayed as current weather and five day forecast*/

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-term").val();
    console.log(city);

    if (searchHistory.indexOf(city) === -1) {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }

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
        var currentTemperature = Math.round(response.main.temp);
        var currentHumidity = Math.round(response.main.humidity);
        var currentWindSpeed = Math.round(response.wind.speed);

        $("#cityDate").html(
          "<h2>" + cityName + " (" + currentDateTime + ")" + "<h2>"
        );
        $("#currentIcon").attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.weather[0].icon +
            "@2x.png"
        );
        $("#temp").text(currentTemperature + '°F');
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
            "<p>" + Math.round(response.daily[i].temp.night) + "°F   -  " + Math.round(response.daily[i].temp.day) + "°F</p>"
          );
          $("#card-humid" + hourString).html(
            "<p>" + "Humdity: " + response.daily[i].humidity + "%</p>"
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
    $("#cityHistory").empty();

    console.log("len:", searchHistory.length, searchHistory);

    for (var i = 0; i < searchHistory.length; i++) {
      console.log(i, searchHistory[i]);
      var historyButton = $("<button>");
      historyButton.addClass("searched-cities btn btn-light btn-lg btn-block");
      historyButton.text(searchHistory[i]);
      $("#cityHistory").prepend(historyButton);
    }

    $(".searched-cities").on("click", function () {
      $(".weatherContainer").removeClass("hide");
      var searchedCity = $(this).text();
      currentWeather(searchedCity);
      forecastWeather(searchedCity);
    });

    //Displays last search if a search has been conducted

    if (searchHistory.length > 0) {
        var city = searchHistory[searchHistory.length - 1]
        $("#search-term").val(city);
        currentWeather(city);
        forecastWeather(city);
    $(".weatherContainer").removeClass("hide");
  }
  }
  //CLEAR BUTTON
  /* Clear history function*/
  $("#clearHistory").on("click", function () {
    $("#cityHistory").empty();
    $("#search-term").val("");
    searchHistory = [];
    localStorage.clear();
    location.reload();
  });

  
});
