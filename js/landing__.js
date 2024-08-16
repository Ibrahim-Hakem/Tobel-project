
const activateNotif = document.getElementById("activate-notif");

var isNotifActivated = false;

const form = document.querySelector("form.sending-message");

const inputMessage = document.getElementById("message");
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
            form.reset(); // Réinitialise le formulaire
            console.log("Message envoyé avec succès");
            /*
            setTimeout(() => {
                chat.scrollTop = chat.scrollHeight;
            }, 500);
*/
            
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

let last_data = "";
let data = "";
    
setInterval(() => {
    
    
    let ajax = new XMLHttpRequest();
    let body = document.getElementsByTagName("body");


    ajax.open("GET", "loading_landing.php", true);
    ajax.onload = () => {
        if (ajax.status == 200 && ajax.readyState == XMLHttpRequest.DONE) {

            if (isNotifActivated) {
                if (ajax.responseText.length > last_data.length) {
                    let notification = new Audio("sounds/message-notification2.mp3");
                    notification.play();
                }
            }

            if (ajax.responseText !== last_data) {
                console.log("Refresh without refreshing.");
                data = ajax.responseText;
                console.log("last_data :");
                console.log(last_data);
                chat.innerHTML = data;
                last_data = data;
                chat.scrollTop = chat.scrollHeight;
                
            } 




        }
    };

    let formData = new FormData(form);
    ajax.send(formData);
}, 500);


activateNotif.addEventListener("click", function () {      
    console.log(isNotifActivated);
    if (isNotifActivated == false) {
        isNotifActivated = true;
        let notification = new Audio("sounds/message-notification2.mp3");
        notification.play();
    } else {
        isNotifActivated = false;
    }
});