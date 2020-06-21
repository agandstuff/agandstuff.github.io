const temp = parseFloat(document.getElementById('temp').textContent);
const speed = parseFloat(document.getElementById('windspeed').textContent);

const s = Math.pow(speed, 0.16);
let chill = 35.74 + (0.6215 * temp) - (35.75 * s) + (0.4275 * temp * s);

chill = Math.round(chill);

if (speed > 3 && temp <= 50) {
    document.getElementById('windchill').textContent = chill + '\xB0F';
} else {
    document.getElementById('windchill').textContent = "N/A"
}