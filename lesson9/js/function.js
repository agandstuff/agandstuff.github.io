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
                rain.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall;
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