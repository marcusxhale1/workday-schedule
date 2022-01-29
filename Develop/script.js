var saveButton = $(".saveButton");
$("#currentDay").text(moment().format('dddd MMMM Do YYYY, h:mma'));


// each specific time is it's own color wether time has past, right now, or in the future
function goalsColor() {
    var hour = moment().hours();

    $(".static-time").each(function() {
        var currTime = parseInt($(this).attr("id"));

        if (currTime > hour) {
            $(this).addClass("future");
        } else if (currTime === hour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("past");
        }
    })
};

// Clicking the save button on the page to save to local storage
saveButton.on("click", function() {
    var time = $(this).siblings(".time-hour").text();
    var goal = $(this).siblings(".goal").val();
    localStorage.setItem(time, goal);
});

//Referesh and see the the same goals listed for the day
function useGoal() {

    $(".time-hour").each(function() {
        var currTime = $(this).text();
        var currGoal = localStorage.getItem(currTime);

        if(currGoal !== null) {
            $(this).siblings(".goal").val(currGoal);
        }
    });
}

goalsColor();
useGoal();
