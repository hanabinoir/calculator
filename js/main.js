var input = $("input#input"),
display = $("p#display");
inputVal = input.val(),
displayVal = display.html(),
vals = [];

$(document).ready(function() {
    var vKey = $("button");

    $("input#input").prop('disabled', true);

    vKey.on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        var vKeyVal = $(this).val(),
        vKeyCode = parseInt(vKeyVal);

        if (vKeyVal == "AC") {
            vals = [];
            inputVal = "0";
            displayVal = inputVal;
            input.val(inputVal);
            display.html(displayVal);
        }

        if (vKeyVal == "CE") {
            inputVal = "0";
            input.val(inputVal);
        }

        if (!isNaN(vKeyCode)) {
            getKey(vKeyCode);
        }
    });

    $(document).on('keydown', function(event) {
        event.preventDefault();
        /* Act on the event */
        var key = parseInt(event.which);
        getKey(key);
    });
});

function getKey(key) {
    console.log("keycode: " + key);

    if (inputVal == "0" && displayVal == "0") {
        inputVal = "";
        displayVal = "";
    }

    if (key == 8 && inputVal != "" && inputVal != "0") {
        inputVal = inputVal.substring(0, (inputVal.length - 1));
        displayVal = displayVal.substring(0, (displayVal.length - 1));
        if (inputVal.length == 0) {
            inputVal = "0";
        }
        if (displayVal.length == 0) {
            displayVal = "0";
        }
        input.val(inputVal);
        display.html(displayVal);
    }

    if ((key >= 48 && key <= 57) || key == 46) {
        inputVal += String.fromCharCode(key);
        displayVal += String.fromCharCode(key);
        input.val(inputVal);
        display.html(displayVal);
    }

    if (isOperator(key)) {
        if (vals.length <= 2) {
            if (inputVal != 0 && vals.length != 1) {
                vals.push(parseFloat(inputVal));
                inputVal = "";
            }

            if (!(key == 13 || key == 61)) {
                vals.push(key);
                var vKey = "";

                if (key == -1 || key == -3) {
                    vals.push(2);
                }

                if (key >= 0) {
                    vKey = String.fromCharCode(key);
                } else {
                    switch (key) {
                        case -1:
                        case -2:
                            vKey = "^";
                            break;
                        case -3:
                        case -4:
                            vKey = "&radic;";
                            break;
                        default:
                            vKey = "?";
                    }
                }

                displayVal += " " + vKey + " ";
                display.html(displayVal);
            }
        }

        if (vals.length >= 3) {
            var result = Calc(vals[1]);
            if(Math.round(result) == result) {
                displayVal = Math.round(result);
            } else {
                displayVal = result;
            }

            if (vals.length == 4) {
                displayVal += " " +
                String.fromCharCode(vals[3]) + " ";
            }

            display.html(displayVal);
            vals = vals.slice(2);
            vals.splice(0, 1, result);
            console.log(displayVal);
            console.log(vals);
        }
    }
}

function isOperator(key) {
    return (
        ([43, 45, 42, 47, 13, 61].indexOf(key) > -1) ||
        (key >= -4 && key <= -1)
    );
}

function Calc(operator) {
    switch (operator) {
        case 43:
            return vals[0] + vals[2];
            break;
        case 45:
            return vals[0] - vals[2];
            break;
        case 42:
            return vals[0] * vals[2];
            break;
        case 47:
            return vals[0] / vals[2];
            break;
        case -1:
        case -2:
            return Math.pow(vals[0], vals[2]);
            break;
        case -3:
        case -4:
            return Math.pow(vals[0], (1 / vals[2]));
            break;
        default:
            return 0;
    }
}
