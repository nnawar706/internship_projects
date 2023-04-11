var count = 0;

function display(event) {
    let x = event.screenX;
    let y = event.screenY;
    let position = document.getElementById("coordinate");
    position.innerHTML = x + " X " + y;
}

function Tick() {
    count = count + 1;
    window.setTimeout("Tick()", 1000);
}

function drag(ev) {
    Tick();
    var el = ev.target;
    ev.dataTransfer.setData("text", ev.target.id);
    var parent = el.getAttribute("data-parent");
    // if the parent data attribute is not yet set, set it to current parent
    if(!parent){
        el.setAttribute("data-parent", el.parentNode.id);
    }
}

function dragEnter() {
    document.getElementById("post_msg").innerHTML = "Yay! Milk is coming..";

}
function dragEnd(ev){
    var sc = document.getElementById("score").innerHTML;
    var current_score = parseInt(sc);
    current_score = current_score + 1;
    document.getElementById("score").innerHTML = current_score;
    document.getElementById("post_msg").innerHTML = "Yayy! I love milk..";
    document.getElementById("timer").innerHTML = count;
    count = 0;
    if(ev.dataTransfer.dropEffect == "none"){
        var parent = document.getElementById(ev.target.getAttribute("data-parent"));
        // append back to the original parent
        parent.appendChild(ev.target);
    }
    var elem = document.createElement("img");
    elem.setAttribute("src", "images/happy_cat.png");
    elem.setAttribute("id", "cat");
    elem.setAttribute("class", "cat_img");
    var image_x = document.getElementById('cat');
    image_x.parentNode.removeChild(cat);
    document.getElementById("div1").appendChild(elem);
}

function drop_feeder(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
