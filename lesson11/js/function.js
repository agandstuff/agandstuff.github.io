function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

const today = new Date();
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];
document.getElementById('currentDate').innerHTML = weekday[today.getDay()]+', '+today.getDate()+' '+month[today.getMonth()]+' '+today.getFullYear();

const dayNumber = today.getDay();
const element = document.getElementById('message');
if (dayNumber == 5) {
    element.classList.add('showme');
}
else {
    element.classList.add('hideme');
}

function changeRating(rating) {
    document.getElementById('ratingValue').innerHTML = rating;
}

const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        console.table(jsonObject);

        const towns = jsonObject['towns'];

        for (let i = 0; i < towns.length; i++) {
            if (i == 1 || i == 4 || i == 5) {
                let card = document.createElement('article');
                let info = document.createElement('div');
                let name = document.createElement('h1');
                let motto = document.createElement('h5');
                let date = document.createElement('p');
                let pop = document.createElement('p');
                let rain = document.createElement('p');
                let image = document.createElement('img');

                info.setAttribute('class', 'info');
                name.textContent = towns[i].name;
                motto.textContent = towns[i].motto;
                date.textContent = 'Year Founded: ' + towns[i].yearFounded;
                pop.textContent = 'Population: ' + towns[i].currentPopulation;
                rain.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall + '\"';
                image.setAttribute('src', towns[i].photo);
                image.setAttribute('alt', towns[i].name + ' Hometown');

                card.appendChild(info);
                info.appendChild(name);
                info.appendChild(motto);
                info.appendChild(date);
                info.appendChild(pop);
                info.appendChild(rain);
                card.appendChild(image);

                document.querySelector('section.towncards').appendChild(card);
            }
        }
    });

//CURRENT WEATHER SUMMARY
const apiURLcurrent = "//api.openweathermap.org/data/2.5/weather?id=5604473&appid=d22907017fd3e32a422553d0e2603101&units=imperial";

fetch(apiURLcurrent)
    .then((response) => response.json())
    .then((weatherInfo) => {
        console.log(weatherInfo);

        document.getElementById('condition').innerHTML = weatherInfo.weather[0].main;
        document.getElementById('temp').innerHTML = weatherInfo.main.temp;
        document.getElementById('humid').innerHTML = weatherInfo.main.humidity;
        document.getElementById('windspeed').innerHTML = weatherInfo.wind.speed;
    });

//FORECAST WEATHER
const apiUrlforecast = "//api.openweathermap.org/data/2.5/forecast?id=5604473&appid=d22907017fd3e32a422553d0e2603101&units=imperial";

let forecastDayNumber = dayNumber;

fetch (apiUrlforecast)
    .then((response) => response.json())
    .then((forecastInfo) => {
        console.log(forecastInfo);
        let mylist = forecastInfo.list;

        for (i=0; i<mylist.length; i++) {
            var time = mylist[i].dt_txt;
            if(time.includes('18:00:00')) {
                forecastDayNumber +=1;
                if (forecastDayNumber === 7) {
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

                document.getElementById('weatherforecast').appendChild(theDay);
            }
        }
    });