//date functions
var today = new Date();
var y = today.getFullYear();
document.getElementById('current-year').innerHTML = y;

var update = document.lastModified;
document.getElementById('update-time').innerHTML = update;

const dayNumber = today.getDay();

let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//navigation menu function
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

// weather api
const apiURLcurrent = "//api.openweathermap.org/data/2.5/weather?id=3530103&appid=d22907017fd3e32a422553d0e2603101&units=imperial";

fetch(apiURLcurrent)
    .then((response) => response.json())
    .then((weatherInfo) => {
        console.log(weatherInfo);

        document.getElementById('condition').innerHTML = weatherInfo.weather[0].main;
        document.getElementById('temp').innerHTML = weatherInfo.main.temp;
        document.getElementById('humid').innerHTML = weatherInfo.main.humidity;
        document.getElementById('speed').innerHTML = weatherInfo.wind.speed;
    });

const apiURLforecast = "//api.openweathermap.org/data/2.5/forecast?id=3530103&appid=d22907017fd3e32a422553d0e2603101&units=imperial";

let forecastDayNumber = dayNumber;

fetch (apiURLforecast)
    .then((response) => response.json())
    .then((forecastInfo) => {
        console.log(forecastInfo);
        let mylist = forecastInfo.list;

        for (i=0; i<mylist.length; i++) {
            var time = mylist[i].dt_txt;
            if(time.includes('18:00:00')) {
                forecastDayNumber += 1;
                if (forecastDayNumber === 7)
                {
                    forecastDayNumber = 0;
                }
                let theDayName = document.createElement('span');
                theDayName.textContent = weekday[forecastDayNumber];
                let theTemp = document.createElement('p');
                theTemp.textContent = forecastInfo.list[i].main.temp + "\xB0";

                let iconcode = forecastInfo.list[i].weather[0].icon;
                let iconPath = "//openweathermap.org/img/w/" + iconcode + ".png";
                let theIcon = document.createElement('img');
                theIcon.src = iconPath;

                let theDay = document.createElement('div');
                theDay.appendChild(theDayName);
                theDay.appendChild(theIcon);
                theDay.appendChild(theTemp);

                document.getElementById('forecast').appendChild(theDay);
            }
        }
    });

// rentals page table
const requestVehicles = '/json/rentals.json';

fetch(requestVehicles)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        console.table(jsonObject);
    });