let card = document.getElementById("card");

let em_birthdate,em_startdate,em_enddate,em_nid,em_email,em_contact,em_name;
let em_education = [];

function openRegister(){
    let caution_str = "";
    em_birthdate = document.register.birthdate.value.toString();
    em_startdate = document.register.start.value.toString();
    em_enddate = document.register.end.value.toString();
    em_nid = document.register.nid.value.toString();
    em_email = document.register.email.value.toString();
    em_contact = document.register.contact.value.toString();
    em_name = document.register.name.value.toString();
    let regex_name = /^[A-Za-z.-]*$/;
    let regex_contact = /([+]{1}[8]{2})?(01){1}[3-9]{1}[0-9]{8}$/;
    let regex_nid1 = /1[0-9]{3}-5[0-9]{2}-6[0-9]$/;
    let regex_nid2 = /[0-9]{2}1[0-9]{3}-5[0-9]{3}-[0-9]{2}$/;
    let regex_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.io)*$/;
    let m = 0;
    if(!regex_name.test(name)){
        caution_str += "Name is not valid!<br>";
    }
    if((new Date().getTime()-new Date(em_startdate).getTime()) < 0 || (new Date(em_enddate).getTime()-new Date(em_startdate).getTime()) < 0){
        caution_str += "Given start/end date is not valid!<br>";
    }
    if((new Date().getFullYear()-new Date(em_birthdate).getFullYear()) < 18){
        caution_str += "Your age must be greater than 18 years old!<br>";
    }
    if(!regex_email.test(em_email)){
        caution_str += "Given email address is not valid!<br>";
    }
    if(!regex_contact.test(em_contact)){
        caution_str += "Given contact number is not valid!<br>";
    }
    if(regex_nid1.test(em_nid)){
        m = 1;
    }
    if(regex_nid2.test(em_nid)){
        m = 1;
    }
    if(m == 0){
        caution_str += "NID is not valid!<br>";
    }
    document.getElementById("caution").innerHTML = caution_str;
    if(caution_str == ""){
        card.style.transform = "rotateY(-180deg)";
    }
}

function openLogin(){
    card.style.transform = "rotateY(0deg)";
}

function add_more() {
    let row = document.getElementById("table-rows");
    let table = document.getElementById("education-table");
    let clone = row.cloneNode(true);
    table.appendChild(clone);
}

function details() {
    let input1 = document.getElementsByName('select[]');
    let input2 = document.getElementsByName('year_started[]');
    let input3 = document.getElementsByName('year_completed[]');
    
    let checker = 0;
    for (let i = 0; i < input1.length; i++) {
        if (new Date(input2[i].value).getFullYear() >= new Date(input3[i].value).getFullYear()) {
            checker = 1;
        }
    }
    if (checker === 1) {
        document.getElementById("caution_2").innerHTML = "Invalid degree start/completion year!";
    } else {
        for (let i = 0; i < input1.length; i++) {
            let a = input1[i].value + " | " + input2[i].value + " | " + input3[i].value;
            em_education.push(a);
        }
        
        if (!em_contact.includes("+88")) {
            em_contact = "+88" + em_contact;
        }
        document.querySelector("#show").removeAttribute("id");
        document.querySelector("#main").setAttribute("class","display");
        document.getElementById("show_name").innerHTML = em_name;
        document.getElementById("show_email").innerHTML = em_email;
        document.getElementById("show_contact").innerHTML = em_contact;
        document.getElementById("show_nid").innerHTML = em_nid;
        document.getElementById("show_birth").innerHTML = em_birthdate;
        document.getElementById("show_start").innerHTML = em_startdate;
        document.getElementById("show_end").innerHTML = em_enddate;
        for(let i=0;i<em_education.length;i++){
            let table = document.getElementById("degree_table");
            let str1 = em_education[i].split(" | ");
            let row = document.createElement("tr");
            let c1 = document.createElement("td")
            let c2 = document.createElement("td")
            let c3 = document.createElement("td")
            c1.innerText = str1[0];
            c2.innerText = str1[1];
            c3.innerText = str1[2];
            row.appendChild(c1);
            row.appendChild(c2);
            row.appendChild(c3);
            table.appendChild(row)
        }
    }
}

function submit_data() {
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: em_name,
            email: em_email,
            contact: em_contact,
            nid: em_nid,
            birth_date: em_birthdate,
            start_date: em_startdate,
            end_date: em_enddate,
            education_info: em_education
        }),
    }
    fetch("https://63a9a2037d7edb3ae61349f0.mockapi.io/api/v1/employees", options)
        .then((response) => response.json())
        .then((json) => console.log(json));
}