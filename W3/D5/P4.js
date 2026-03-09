const input = document.getElementById("nameInput");
const display = document.getElementById("display");

input.addEventListener("keydown",function(event){
    display.textContent = "Last Key pressed:"+event.key;
    console.log("Key pressed:",event.key);
});
