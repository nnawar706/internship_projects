let currentDroppable = null;
let feeder = document.getElementById("feeder");


feeder.onmousedown = function(event) {
    let shiftX = event.clientX - feeder.getBoundingClientRect().left;
    let shiftY = event.clientY - feeder.getBoundingClientRect().top;


    feeder.style.position = 'absolute';
    feeder.style.zIndex = 1000;
    document.body.append(feeder);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        feeder.style.left = pageX - shiftX + 'px';
        feeder.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        let x = event.pageX - shiftX;
        let y = event.pageY - shiftY;
        document.getElementById("coordinate").innerHTML = x+' X '+y;
        if (x<405 && y>276){
            document.getElementById("msg").innerHTML = "Ohh! Don't do that:)";
        }
        if (x>405 && x<1262){
            document.getElementById("msg").innerHTML = "Milk is coming*_*";
        }
        if (x>1175) {
            document.getElementById("sad_cat").style.display = "None";
            document.getElementById("happy_cat").style.display = "block";
        }
        if (x<1175) {
            document.getElementById("happy_cat").style.display = "None";
            document.getElementById("sad_cat").style.display = "block";
        }

        feeder.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        feeder.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
                enterDroppable(currentDroppable);
                //leaveDroppable(currentDroppable);
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    feeder.onmouseup = function(event) {
        document.removeEventListener('mousemove', onMouseMove);
        feeder.onmouseup = null;
    }
}

function enterDroppable(elem) {
    document.getElementById("msg").innerHTML = "Yayyy! I love milk.";
    let sc = document.getElementById("score").innerHTML;
    localStorage.setItem("val1", sc);
    let score = localStorage.getItem("val1");
    score = parseInt(score);
    score++;
    document.getElementById("score").innerHTML = score;
}

function leaveDroppable(elem) {
    document.getElementById("msg").innerHTML = "Milk is coming!";
}

feeder.ondragstart = function() {
    return false;
}

function reset() {
    location.reload();
}

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

let arr = [];
let times = [];

document.addEventListener('mousedown', function () {
    timer = true;
    stopWatch();
});

document.addEventListener('mouseup', function () {
    timer = false;
    second = 0;
    count = 0;

    if(document.getElementById("msg").innerHTML === "Yayyy! I love milk."){
        times.push(arr.slice(-1));
        document.getElementById("timerDisplay").innerHTML = arr.slice(-1);
    }

    let times_L = "";
    for (let i=1; i<=times.length; i++) {
        times_L += "#"+i+" "
        times_L += times[i-1];
        times_L += " | ";
    }
    document.getElementById("demo").innerHTML = times_L;
});

function stopWatch() {
    if (timer) {
        count++;

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let secString = second;
        let countString = count;

        if (second < 10) {
            secString = "0" + secString;
        }

        if (count < 10) {
            countString = "0" + countString;
        }

        let timeStr = secString+"."+countString+" seconds";
        arr.push(timeStr);
        setTimeout(stopWatch, 10);
    }
}