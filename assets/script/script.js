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
    <td class='col-1 hour'> <div>${i}AM</div></td> 
    <td class='col-10 description' timestamp='${i}AM'><textarea> </textarea></td>
    <td class='col-1'><input type='button' class='saveBtn'/><i>SAVE</i></td>
    </tr>`)
    }
    else if (i === 12) {
        tbody.append(`<tr class='row'> 
    <td class='col-1 hour'> <div>${i}PM</div></td> 
    <td class='col-10 description' timestamp='${i}PM'><textarea> </textarea></td>
    <td class='col-1'><input type='button' class='saveBtn'/><i>SAVE</i></td>
    </tr>`)
    }
    else {
        tbody.append(`<tr class='row'> 
    <td class='col-1 hour'> <div>${i - 12}PM</div></td> 
    <td class='col-10 description' timestamp='${i - 12}PM'><textarea> </textarea></td>
    <td class='col-1'><input type='button' class='saveBtn'/><i>SAVE</i></td>
    </tr>`)
    }
    ;
}

var rows = $(".row");
var hour = moment().format("hA"); // 3pm
var times = $(".hour");
var descriptions = $(".description");

descriptions.filter(function () {
    // console.log($(this).attr("timestamp").toLowerCase());
    return $(this).attr("timestamp") === hour;
}).addClass("present");

descriptions.filter(function () {
    var time = moment($(this).attr("timestamp"), "hA")
    // console.log(moment(hour, "hA"));
    return time < moment(hour, "hA");
}).addClass("past");

descriptions.filter(function () {
    var time = moment($(this).attr("timestamp"), "hA")
    // console.log(moment(hour, "hA"));
    return time > moment(hour, "hA");
}).addClass("future");

