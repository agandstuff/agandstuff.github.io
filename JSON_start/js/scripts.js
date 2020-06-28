//ADD the key and change units to imperial
const apiURL = "//api.openweathermap.org/data/2.5/weather?zip=80013,us&appid=d22907017fd3e32a422553d0e2603101&units=imperial";

//Go fetch it and then wait for a response.
fetch(apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
    //Once it comes back, display it to the console.
    console.log(weatherInfo);
    
    document.getElementById('place').innerHTML=weatherInfo.name;
    document.getElementById('currentTemp').innerHTML=weatherInfo.main.temp;
    document.getElementById('windSpeed').innerHTML=weatherInfo.wind.speed;

    const iconcode = weatherInfo.weather[0].icon;
    const icon_path = '//openweathermap.org/img/w/' + iconcode + '.png';

    document.getElementById('weather_icon').src = icon_path;
 }); //end of "then" fat arrow function

 const apiURLforecast = "//api.openweathermap.org/data/2.5/forecast?zip=80013,us&appid=d22907017fd3e32a422553d0e2603101&units=imperial";

 const mydate = new Date();
 const y = mydate.getDay();
 
 const myweekday = new Array(7);
 myweekday[0]="Sunday";
 myweekday[1]="Monday";
 myweekday[2]="Tuesday";
 myweekday[3]="Wednesday";
 myweekday[4]="Thursday";
 myweekday[5]="Friday";
 myweekday[6]="Saturday";

 let forecastDayNumber = y;

 fetch(apiURLforecast)
  .then((response) => response.json())
  .then((weatherInfoForecast) => {
    console.log(weatherInfoForecast);
    document.getElementById('townName').innerHTML = weatherInfoForecast.city.name;
    let mylist = weatherInfoForecast.list;
    for (i=0; i<mylist.length; i++) {
      var time = mylist[i].dt_txt;
      if(time.includes('18:00:00')){
        forecastDayNumber += 1;
        if (forecastDayNumber === 7) {
          forecastDayNumber = 0;
        }
        let theDayName = document.createElement('span');
        theDayName.textContent = myweekday[forecastDayNumber];
        let theTemp = document.createElement('p');
        theTemp.textContent = weatherInfoForecast.list[i].main.temp + "\xB0";

        let iconcode = weatherInfoForecast.list[i].weather[0].icon;
        let iconPath = "//openweathermap.org/img/w/" + iconcode + ".png";
        let theIcon = document.createElement('img');
        theIcon.src = iconPath;

        let theDay = document.createElement('div');
        theDay.appendChild(theDayName);
        theDay.appendChild(theTemp);
        theDay.appendChild(theIcon);

        document.getElementById('weatherforecast').appendChild(theDay);
      }
    }
  });