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
      

  // forecastWeather FUNCTION
  /*Description: Function collects weather data forecast from the next five days for place selected and diplays in a separate card on page per forecasted day*/
  function forecastWeather() {
    
        //uvIndex DISPLAY
        
        //fiveDayForecast DISPLAY
        
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
