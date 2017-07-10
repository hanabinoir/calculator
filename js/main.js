$(document).ready(function() {
    var input = $("input#input"),
    display = $("p#display");
    vKey = $("button");
    inputVal = input.val(),
    displayVal = display.html(),
    vKeyVal = vKey.val(),
    vals = [];

    input.prop('disabled', true);

    vKey.on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        if ($(this).val() == "AC") {
            vals = [];
            inputVal = "0";
            displayVal = inputVal;
            input.val(inputVal);
            display.html(displayVal);
        }

        if ($(this).val() == "CE") {
            inputVal = "0";
            input.val(inputVal);
        }
    });

    $(document).on('keypress', function(event) {
        event.preventDefault();
        /* Act on the event */
        var key = parseInt(event.which);

        if (inputVal == "0" && displayVal == "0") {
            inputVal = "";
            displayVal = "";
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
                    displayVal += " " +
                    String.fromCharCode(key) + " ";
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
    });
});

function isOperator(key) {
    return [43, 45, 42, 47, 13, 61].indexOf(key) > -1;
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
        default:
            return 0;
    }
}
