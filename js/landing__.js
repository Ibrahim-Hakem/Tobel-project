
const form = document.querySelector("form.sending-message");

const sendBtn = document.getElementById("send-btn");

const chat = document.querySelector(".chat");

function showCategories() {

    let categories = document.getElementById('categorie').children;

    for (let i = 0; i < categories.length; i++) {
        if (categories[i].hidden == true) {
            categories[i].hidden = false;
        } else {
            categories[i].hidden = true;
        }


    }
}


sendBtn.onclick = (e) => {
    e.preventDefault();

    console.log("The code enters <script>");
    
    let ajax = new XMLHttpRequest();

    ajax.open("POST", "landing.php", true);
    ajax.onload = () => {
        if (ajax.status == 200 && ajax.readyState == XMLHttpRequest.DONE) {
            
            console.log("AJAX from onsubmit status : 200");
            
        }
    };

    let formData = new FormData(form);
    ajax.send(formData);
}
/*
sendBtn.onclick = () => {
    
    console.log("The code enters <script>");
    
    let ajax = new XMLHttpRequest();
    let body = document.getElementsByTagName("body");

    ajax.open("POST", "loading_landing.php", true);
    ajax.onload = () => {
        if (ajax.status == 200 && ajax.readyState == XMLHttpRequest.DONE) {
            
            console.log(ajax.responseText);
            
        }
    };

    let formData = new FormData(form);
    ajax.send(formData);
}
*/
setInterval(() => {
    
    
    let ajax = new XMLHttpRequest();
    let body = document.getElementsByTagName("body");

    ajax.open("GET", "loading_landing.php", true);
    ajax.onload = () => {
        if (ajax.status == 200 && ajax.readyState == XMLHttpRequest.DONE) {
            let data = ajax.responseText;
            console.log("Refresh without refreshing.");
            chat.innerHTML = data;
        }
    };

    let formData = new FormData(form);
    ajax.send(formData);
}, 500);


