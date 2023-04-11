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
        let x = pageX - shiftX;
        let y = pageY - shiftY;
        document.getElementById("coordinate").innerHTML = x+' X '+y;
        if (x<405 && y>276){
            document.getElementById("msg").innerHTML = "Ohh! Don't do that:)";
        }
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

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
                leaveDroppable(currentDroppable);
                //changeImg();
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    feeder.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        feeder.onmouseup = null;
    };

};

function enterDroppable(elem) {
    document.getElementById("msg").innerHTML = "Yayyy! I love milk.";
    let sc = document.getElementById("score").innerHTML;
    let current_score = parseInt(sc);
    current_score = current_score + 1;
    document.getElementById("score").innerHTML = current_score;

    /*var elem1 = document.createElement("img");
    elem1.setAttribute("src", "images/happy_cat.png");
    elem1.setAttribute("id", "cat");
    elem1.setAttribute("class", "droppable");
    var image_x = document.getElementById('cat');
    image_x.parentNode.removeChild(cat);
    document.getElementById("area").appendChild(elem1);*/
}

function changeImg() {
    var elem1 = document.createElement("img");
    elem1.setAttribute("src", "./images/happy_cat.png");
    elem1.setAttribute("id", "cat");
    elem1.setAttribute("class", "droppable");
    var image_x = document.getElementById('cat');
    image_x.parentNode.removeChild(cat);
    document.getElementById("area").appendChild(elem1);
}

function leaveDroppable(elem) {

}

feeder.ondragstart = function() {
    document.getElementById("msg").innerHTML = "Milk is coming!";
    return false;
}

function reset() {
    location.reload();
}