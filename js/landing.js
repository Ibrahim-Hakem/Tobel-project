



function showCategories(){
    
    let categories = document.getElementById('categorie').children;
    
    for(let i=0; i < categories.length ;i++){
        if (categories[i].hidden == true){
            categories[i].hidden = false;
        }else{
            categories[i].hidden = true;
        }
        
        
    }
}




