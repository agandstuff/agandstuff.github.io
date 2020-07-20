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
const requestVehicles = 'https://agandstuff.github.io/scoots/js/json/rentals.json';

fetch(requestVehicles)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        console.table(jsonObject);
        const rental = jsonObject['rentals'];

        let table = document.createElement('table');
        let head = document.createElement('tr');
        let title = document.createElement('th');
        let subhead1 = document.createElement('tr');
        let subtitle1a = document.createElement('th');
        let subtitle1b = document.createElement('th');
        let subtitle1c = document.createElement('th');
        let subhead2 = document.createElement('tr');
        let subtitle2a = document.createElement('th');
        let subtitle2b = document.createElement('th');
        let subtitle2c = document.createElement('th');
        let subtitle2d = document.createElement('th');
        let subtitle2e = document.createElement('th');
        let subtitle2f = document.createElement('th');

        title.textContent = "Max Persons and Price Chart (includes Tax)";
        title.setAttribute('colspan', '6');
        title.setAttribute('id', 'title');
        subhead1.setAttribute('id', 'subhead1');
        subhead2.setAttribute('id', 'subhead2');
        subtitle1a.textContent = " ";
        subtitle1a.setAttribute('colspan', '2');
        subtitle1b.textContent = "Reservation";
        subtitle1b.setAttribute('colspan', '2');        
        subtitle1c.textContent = "Walk-In";
        subtitle1c.setAttribute('colspan', '2');
        subtitle2a.textContent = "Rental Type";
        subtitle2b.textContent = "Max. Persons";
        subtitle2c.textContent = "Half Day (3 hrs)";
        subtitle2d.textContent = "Full Day";
        subtitle2e.textContent = "Half Day (3 hrs)";
        subtitle2f.textContent = "Full Day";

        table.appendChild(head);
        table.appendChild(subhead1);
        table.appendChild(subhead2);
        head.appendChild(title);
        subhead1.appendChild(subtitle1a);
        subhead1.appendChild(subtitle1b);
        subhead1.appendChild(subtitle1c);
        subhead2.appendChild(subtitle2a);
        subhead2.appendChild(subtitle2b);
        subhead2.appendChild(subtitle2c);
        subhead2.appendChild(subtitle2d);
        subhead2.appendChild(subtitle2e);
        subhead2.appendChild(subtitle2f);

        for (let i = 0; i < rental.length; i++) {
            let row = document.createElement('tr');
            let name = document.createElement('td');
            let cap = document.createElement('td');
            let rhalf = document.createElement('td');
            let rfull = document.createElement('td');
            let whalf = document.createElement('td');
            let wfull = document.createElement('td');

            name.textContent = rental[i].name;
            cap.textContent = rental[i].maxPersons;
            rhalf.textContent = "\$" + rental[i].reserveHalf;
            rfull.textContent = "\$" + rental[i].reserveFull;
            whalf.textContent = "\$" + rental[i].walkHalf;
            wfull.textContent = "\$" +
            rental[i].walkFull; 

            table.appendChild(row);
            row.appendChild(name);
            row.appendChild(cap);
            row.appendChild(rhalf);
            row.appendChild(rfull);
            row.appendChild(whalf);
            row.appendChild(wfull);
        }
        
        document.querySelector('section.vehicles').appendChild(table);
    });