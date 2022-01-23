var currentDate = document.querySelector("#current-date");
var currentTime = moment();

currentDate.textContent = currentTime.format("MMM DD, YYYY - hh:mm:ss a");

// tasks object to store in localStorage.
var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};

// local storage
var setTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load the tasks from localStorage and create tasks in the right row
var getTasks = function() {
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
        tasks = loadedTasks

        // for each key/value pair in tasks, create a task
        $.each(tasks, function(hour, task) {
            var hourDiv = $("#" + hour);
            createTask(task, hourDiv);
        })
    }

    // make sure the past/current/future time is reflected
    auditTasks()
}

var createTask = function(taskText, hourDiv) {
    var taskDiv = hourDiv.find(".task");
    // create the task element
    var taskP = $("<p>")
        .addClass("task-text")
        .text(taskText)
    taskDiv.html(taskP);
}

var auditTasks = function() {
    // changes color based on time of day and current time 

    var currentHour = moment().hour();
    $(".task-info").each( function() {
        var elementHour = parseInt($(this).attr("id"));

        // timing mechanisms for color change
        if ( elementHour < currentHour ) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if ( elementHour === currentHour ) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};

var replaceTextarea = function(textareaElement) {
    /* keeps text in local storage and keeps it in p */

    // elements
    var taskInfo = textareaElement.closest(".task-info");
    var textArea = taskInfo.find("textarea");

    // get the time and task
    var time = taskInfo.attr("id");
    var text = textArea.val().trim();

    // persist the data
    tasks[time] = [text];  
    setTasks();

    // replaces text area with p element
    createTask(text, taskInfo);
}

// click handler
$(".task").click(function() {

    // save the other tasks if they've already been clicked
    $("textarea").each(function() {
        replaceTextarea($(this));
    })

    // convert to a textarea element if the time hasn't passed
    var time = $(this).closest(".task-info").attr("id");
    if (parseInt(time) >= moment().hour())


    // create a textInput element
    var text = $(this).text();
    // create a textInput element
    var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);
    // add the textInput element to the parent div
    $(this).html(textInput);
    textInput.trigger("focus");
})

// click handler
$(".save").on("click", function() {
    var taskInfo = $(this).closest(".task-info");
    var textArea = taskInfo.find("textarea");
    var time = taskInfo.attr("id");
    var text = textArea.val().trim();
    tasks[time] = text;
    setTasks();
    var taskP = $("<p>")
        .addClass("task-text")
        .text(text)
    textArea.replaceWith(taskP);
})

// save button click handler
$(".saveBtn").click(function() {
    replaceTextarea($(this));
})


// get the tasks from localStorage on load.
getTasks();