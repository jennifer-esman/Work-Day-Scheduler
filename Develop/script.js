// gets data for the header date
dateHeader = () => {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

dateHeader();

// variable with string of objects for hour slots
let myPlans = [
    {
        id: "0",
        hour: "9",
        time: "09",
        meridiem: "AM",
        notes: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "AM",
        notes: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "AM",
        notes: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "PM",
        notes: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "PM",
        notes: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "PM",
        notes: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "PM",
        notes: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "PM",
        notes: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "PM",
        notes: ""
    },
    
]

// saving and setting data to local storage for viewing. 
saveSchedule = () => {
    localStorage.setItem("myPlans", JSON.stringify(myPlans));
}

// sets any data in localStorage to the view
displaySchedule = () => {
    myPlans.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.notes);
    })
}

// function to view any existing (if applicable) localStorage to view in planner
viewSchedule = () => {
    var storedPlans = JSON.parse(localStorage.getItem("myPlans"));

    if (storedPlans) {
        myPlans = storedPlans;
    }

    saveSchedule();
    displaySchedule();
}

// construction of the planner
myPlans.forEach(function(thisTime) {
    //rows for the planner
    var hrRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hrRow);

    // A place to input text into the planner
    var hourPlace = $("<div>")
        .text(`${thisTime.hour}${thisTime.meridiem}`)
        .attr({
            "class": "col-md-1 hour"
    });

    // styling the planner display colors for times in the past present and future
    var hourText = $("<div>")
        .attr({
            "class": "col-md-10 description p-0"
        });
    var plannerData = $("<textarea>");
    hourText.append(plannerData);
    plannerData.attr("id", thisTime.id);
    if (thisTime.time < moment().format("HH")) {
        plannerData.attr ({
            "class": "past", 
        })
    } else if (thisTime.time === moment().format("HH")) {
        plannerData.attr({
            "class": "present"
        })
    } else if (thisTime.time > moment().format("HH")) {
        plannerData.attr({
            "class": "future"
        })
    }

    // code for the save button and style
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlannerInfo = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlannerInfo.append(saveButton);
    hrRow.append(hourPlace, hourText, savePlannerInfo);
})


viewSchedule();


// to save data that will be put into local storage, then calling the functions to view new and existing items
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var savePlanner = $(this).siblings(".description").children(".future").attr("id");
    myPlans[savePlanner].notes = $(this).siblings(".description").children(".future").val();
    
    saveSchedule();
    displaySchedule();
})