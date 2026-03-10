const container = document.getElementById("container");
// position: beforebegin
// afterbegin
// beforeend
// aftreend
document.getElementById("btn").addEventListener("click",function(){
    container.insertAdjacentHTML("afterend","<P>Dynamically inserted</p>");
});
