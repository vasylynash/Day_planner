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
    if (i <= 12) {
        tbody.append(`<tr class='row'> 
    <td class='col-1 hour'> <div>${i}AM</div></td> 
    <td class='col-10 description'><div> </div></td> 
    <td class='col-1'><input type='button' class='saveBtn'/><i>SAVE</i></td>
    </tr>`)
    }
    else {
        tbody.append(`<tr class='row'> 
    <td class='col-1 hour'> <div>${i - 12}PM</div></td> 
    <td class='col-10 description'><div> </div></td> 
    <td class='col-1'><input type='button' class='saveBtn'/><i>SAVE</i></td>
    </tr>`)
    }
    ;
}

var rows = $(".row");
var hour = moment().format("hA");
var times = $(".hour");

for (let i = 0; i < times.length; i++) {
    const element = times[i];
    if (element.innerText.trim() === hour) {
        rows.addClass("present")
    }

}
// times.forEach(element => {
//     if (element.val() === hour) {
//         $(".description").addClass("present")
//     }
// });

