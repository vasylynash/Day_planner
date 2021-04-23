var currentDate = $("#currentDay");
var container = $(".container");

$(currentDate).text(moment().format("dddd, MMMM Do"));

const table = $("<table>");
table.addClass("container");

const tbody = $("<tbody>");
tbody.addClass("container");
table.append(tbody);
container.append(table);

for (let i = 0; i < 24; i++) {
    var time = moment().hour(i).format("hA");
    tbody.append(`<tr class='row'> 
    <td class='col-1 hour'> <div>${time}</div></td>
    <td class='col-10 description' timestamp='${time}'><textarea> </textarea></td>
    <td class='col-1'><input type='button' class='saveBtn'/><i>Save</i></td>
    </tr>`);
}

var hour = moment().format("hA");
var times = $(".hour");
var descriptions = $(".description");
var buttons = $(".saveBtn");

descriptions.filter(function () {
    return $(this).attr("timestamp") === hour;
}).addClass("present");

descriptions.filter(function () {
    var time = moment($(this).attr("timestamp"), "hA")
    return time < moment(hour, "hA");
}).addClass("past");

descriptions.filter(function () {
    var time = moment($(this).attr("timestamp"), "hA")
    return time > moment(hour, "hA");
}).addClass("future");


buttons.on("click", function (event) {
    var entry = $(event.target).parent().siblings().eq(1).children().eq(0).val();
    var processedEntry = entry.split("\n");
    var time = $(event.target).parent().siblings().eq(1).attr("timestamp");
    localStorage.setItem(`${time}`, JSON.stringify(processedEntry));
})

function checkDateAndClearStorage() {
    var date = localStorage.getItem("date");
    var currentDate = moment().format("dddd, MMMM Do");
    if (date !== currentDate) {
        localStorage.clear();
        localStorage.setItem("date", currentDate);
    }
}

function populateFromStorage() {
    for (let i = 0; i < times.length; i++) {
        var time = $(times)[i].innerText.trim();
        if (JSON.parse(localStorage.getItem(time)) !== null) {
            var entry = JSON.parse(localStorage.getItem(time)).join("\n");
            var textarea = $("textarea");
            $(descriptions).find(textarea)[i].innerHTML = entry;
        }
    }
}

$(window).on("load", function () {
    checkDateAndClearStorage();
    populateFromStorage();
})
