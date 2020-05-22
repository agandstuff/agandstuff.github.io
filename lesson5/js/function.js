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