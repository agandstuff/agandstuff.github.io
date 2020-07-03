const fishURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(fishURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        console.table(jsonObject);

        const towns = jsonObject['towns'];

        for (let i = 0; i < towns.length; i++) {
            if (i == 1) {
                let card = document.createElement('div');
                let title = document.createElement('h2');
                let e1 = document.createElement('p');
                let e2 = document.createElement('p');
                let e3 = document.createElement('p');
                let e4 = document.createElement('p');

                title.textContent = 'Upcoming Events:';
                e1.textContent = towns[i].events[0];
                e2.textContent = towns[i].events[1];
                e3.textContent = towns[i].events[2];
                e4.textContent = towns[i].events[3];

                card.appendChild(title);
                card.appendChild(e1);
                card.appendChild(e2);
                card.appendChild(e3);
                card.appendChild(e4);

                document.querySelector('section.fishEvents').appendChild(card);
            }
        }
    });

//CURRENT WEATHER SUMMARY
const apiURLcurrent = "//api.openweathermap.org/data/2.5/weather?id=5585000&appid=d22907017fd3e32a422553d0e2603101&units=imperial";

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
const apiUrlforecast = "//api.openweathermap.org/data/2.5/forecast?id=5585000&appid=d22907017fd3e32a422553d0e2603101&units=imperial";

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

                document.getElementById('fweatherforecast').appendChild(theDay);
            }
        }
    });