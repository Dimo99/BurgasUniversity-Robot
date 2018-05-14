(function () {
    var upButtonPressed = false;
    var downButtonPressed = false;
    var leftButtonPressed = false;
    var rightButtonPressed = false;
    var lightClickcked = false;
    var xhttp = new XMLHttpRequest();
    document.getElementById('range').onchange = function() {
        xhttp.open("GET", `speed?s=${this.valueAsNumber}`);
        xhttp.send();
    };
    document.getElementById('upButton').onmousedown = function () {
        xhttp.open("GET", "up", true);
        xhttp.send();
    };
    document.getElementById('upButton').onmouseup = function () {
        xhttp.open("GET", "release", true);
        xhttp.send();
    };
    document.getElementById('rightButton').onmousedown = function () {
        xhttp.open("GET", "right", true);
        xhttp.send();
    }
    document.getElementById('rightButton').onmouseup = function () {
        xhttp.open("GET", "release", true);
        xhttp.send();
    }

    document.getElementById('leftButton').onmousedown = function () {
        xhttp.open("GET", "left", true);
        xhttp.send();
    }
    document.getElementById('leftButton').onmouseup = function () {
        xhttp.open("GET", "release", true);
        xhttp.send();
    }

    document.getElementById('downButton').onmousedown = function () {
        xhttp.open("GET", "down", true);
        xhttp.send();
    }
    document.getElementById('downButton').onmouseup = function () {
        xhttp.open("GET", "release", true);
        xhttp.send();
    }


    document.getElementById('upButton').ontouchstart = function () {
        xhttp.open("GET", "up", true);
        xhttp.send();
    };
    document.getElementById('upButton').ontouchend = function () {
        xhttp.open("GET", "release", true);
        xhttp.send();
    };
    document.getElementById('rightButton').ontouchstart = function () {
        xhttp.open("GET", "right", true);
        xhttp.send();
    }
    document.getElementById('rightButton').ontouchend = function () {
        xhttp.open("GET", "release", true);
        xhttp.send();
    }

    document.getElementById('leftButton').ontouchstart = function () {
        xhttp.open("GET", "left", true);
        xhttp.send();
    }
    document.getElementById('leftButton').ontouchend = function () {
        xhttp.open("GET", "release", true);
        xhttp.send();
    }

    document.getElementById('downButton').ontouchstart = function () {
        xhttp.open("GET", "down", true);
        xhttp.send();
    }
    document.getElementById('downButton').ontouchend = function () {
        xhttp.open("GET", "release", true);
        xhttp.send();
    }


    document.getElementById('light').onclick = function () {
        if (!lightClickcked) {
            lightClickcked = true;
            xhttp.open("GET", "far", true);
            xhttp.send();
        } else {
            lightClickcked = false;
            xhttp.open("GET", "lightrelease", true);
            xhttp.send();
        }
    }
    document.onkeydown = function (event) {
        let code = event.keyCode;
        let anybuttonpressed = upButtonPressed || downButtonPressed || rightButtonPressed || leftButtonPressed;
        if ((code == 38 || code == 87) && !anybuttonpressed) {
            xhttp.open("GET", "up", true);
            xhttp.send();
            upButtonPressed = true;
        }
        if ((code == 37 || code == 65) && !anybuttonpressed) {
            xhttp.open("GET", "left", true);
            xhttp.send();
            leftButtonPressed = true;
        }
        if ((code == 40 || code == 83) && !anybuttonpressed) {
            xhttp.open("GET", "down", true);
            xhttp.send();
            downButtonPressed = true;
        }
        if ((code == 68 || code == 39) && !anybuttonpressed) {
            xhttp.open("GET", "right", true);
            xhttp.send();
            rightButtonPressed = true;
        }
        if (code == 70) {
            if (!lightClickcked) {
                lightClickcked = true;
                xhttp.open("GET", "far", true);
                xhttp.send();
            } else {
                lightClickcked = false;
                xhttp.open("GET", "lightrelease", true);
                xhttp.send();
            }
        }
    }
    document.onkeyup = function (event) {
        let code = event.keyCode;
        if (code == 38 || code == 87 || code == 37 || code == 65 || code == 40 || code == 83 || code == 68 || code == 39) {
            xhttp.open("GET", "release", true);
            xhttp.send();
            upButtonPressed = false;
            leftButtonPressed = false;
            downButtonPressed = false;
            rightButtonPressed = false;
        }
    }

})();