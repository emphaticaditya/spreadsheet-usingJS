var total_rows = 15;
var total_cols = 10;
//adds row
var addRow = function(){
    var row = document.querySelector("table").insertRow(-1);
    for (var j=0; j<total_cols; j++) {
        var name_letter = String.fromCharCode("A".charCodeAt(0)+j-1);
        row.insertCell(-1).innerHTML = j>0 ? "<input id='"+ name_letter+total_rows +"'/>" : total_rows;
    }
    total_rows++;
};
//deletes row
var deleteRow = function () {
    if(total_rows>2){
        var row = document.querySelector("table").deleteRow(-1);
        total_rows--;
    }
    else {
        return;
    }
};
//for rows
for (var i=0; i<total_rows; i++) {
    var row = document.querySelector("table").insertRow(-1);
    //for columns
    for (var j=0; j<total_cols; j++) {
        var name_letter = String.fromCharCode("A".charCodeAt(0)+j-1);
        row.insertCell(-1).innerHTML = i&&j>0 ? "<input id='"+ name_letter+i +"'/>" : i||name_letter;
    }
}
var DATA={}, INPUTS=[].slice.call(document.querySelectorAll("input"));
INPUTS.forEach(function(elm) {
    //lets user edit cell & save data in localstorage
    elm.onfocus = function(e) {
        e.target.value = localStorage[e.target.id] || "";
    };
    //insert data and compute code in cell
    elm.onblur = function(e) {
        localStorage[e.target.id] = e.target.value;
        answer();
    };
    //lets you evaluate value similar to excel eg: =A1+B10-C5
    var getter = function() {
        var value = localStorage[elm.id] || "";
        if (value.charAt(0) == "=") {
            with (DATA) return eval(value.substring(1));
        }
        else
        {
            return isNaN(parseFloat(value)) ? value : parseFloat(value);
        }
    };
    Object.defineProperty(DATA, elm.id, {get:getter});
    Object.defineProperty(DATA, elm.id.toLowerCase(), {get:getter});
});
//evaluates answer for this =A1+B10-C5
(window.answer = function() {
    INPUTS.forEach(function(elm) { try { elm.value = DATA[elm.id]; } catch(e) {} });
})();
var row = document.querySelector("input").multiple = true;
