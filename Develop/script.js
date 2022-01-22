var currentDate = document.querySelector("#current-date");
var currentTime = moment();

currentDate.textContent = currentTime.format("MMM DD, YYYY - hh:mm:ss a");