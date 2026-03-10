// CreateElement() & appendChild()
const list = document.getElementById("list");
const message = document.getElementById("message");
let counter = 1;

document.getElementById("addBtn").addEventListener("click",function(){
    message.textContent = "";
    const li = document.createElement("li");
    li.textContent = "Item " + counter++;
    list.appendChild(li);
});

document.getElementById("rmBtn").addEventListener("click",function(){
    if(list.lastElementChild){
        list.removeChild(list.lastElementChild);
    } 
    else {
        message.textContent = "There is no item to be deleted";
    }
});
