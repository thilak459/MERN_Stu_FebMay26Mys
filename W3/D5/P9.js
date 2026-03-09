const onceBtn = document.getElementById("onceBtn");

//Limiting listener to once event listen
onceBtn.addEventListener("click",function(){
    console.log("This click listener works only once.");
},{once:true});

//Global keyboard shortcut creation
document.addEventListener("keydown",function(event){
    if(event.ctrlKey && event.key.toLowerCase()==="s"){
        event.preventDefault();
        console.log("Custom ctrl+s shortcut triggered");
    }
});