
function main(){

    let day_of_birth = document.getElementById('day_of_birth');
    let month_of_birth = document.getElementById('month_of_birth');
    let day31 = document.getElementById('day31')
    let day30 = document.getElementById('day30')
    

}

/**
* @param {HTMLOptionElement} x
*/
function hide(x){
    x.style.visibility = 'hidden'; 
}

/**
* @param {HTMLOptionElement} x 
*/
function show(x){
    x.style.visibility = 'visible';
    
}
function verify_month(){
    show(day30);
    show(day31);
    if (month_of_birth.value == "fév"){
        hide(day30);
        hide(day31);
    } else if(month_of_birth.value == "avr"){
        hide(day31);
    } else if(month_of_birth.value == "jun"){
        hide(day31);
    } else if(month_of_birth.value == "sep"){
        hide(day31);
    } else if(month_of_birth.value == 'nov'){
        hide(day31);
    }
}