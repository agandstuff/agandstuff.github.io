var document;
var today = new Date();
var y = today.getFullYear();
document.getElementById('current-year').innerHTML = y;

var update = document.lastModified;
document.getElementById('update-time').innerHTML = update;