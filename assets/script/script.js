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
    if (i < 12) {
        tbody.append(`<tr class='row'> 
    <td class='col-1 hour' id="hour"> <div>${i}AM</div></td> 
    <td class='col-10 description' timestamp='${i}AM' id="description"><textarea> </textarea></td>
    <td class='col-1'><input type='button' class='saveBtn' id="save"/><i>SAVE</i></td>
    </tr>`)
    }
    else if (i === 12) {
        tbody.append(`<tr class='row'> 
    <td class='col-1 hour' id="hour"> <div>${i}PM</div></td>
    <td class='col-10 description' timestamp='${i}PM' id="description"><textarea> </textarea></td>
    <td class='col-1'><input type='button' class='saveBtn' id="save"/><i>SAVE</i></td>
    </tr>`)
    }
    else {
        tbody.append(`<tr class='row'> 
    <td class='col-1 hour' id="hour"> <div>${i - 12}PM</div></td>
    <td class='col-10 description' timestamp='${i - 12}PM' id="description"><textarea> </textarea></td>
    <td class='col-1'><input type='button' class='saveBtn' id="save"/><i>SAVE</i></td>
    </tr>`)
    }
    ;
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
    console.log(entry);
    var time = $(event.target).parent().siblings().eq(1).attr("timestamp");
    localStorage.setItem(`${time}`, entry);
    console.log(time);
})


$(window).on("load", function () {
    for (let i = 0; i < times.length; i++) {
        var time = $(times)[i].innerText.trim();
        var entry = localStorage.getItem(time);
        var textarea = $("textarea");
        $(descriptions).find(textarea)[i].innerText = entry;
    }
})
