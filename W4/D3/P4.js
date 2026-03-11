const jsonOutput = document.getElementById("jsonOutput");
document.getElementById("saveBtn").addEventListener("click",function(){
    const user = {
        id:"123",
        name:"Thilak",
        role:"software engg",
        skill:["html","css","JS"]};
        localStorage.setItem("userProfile",JSON.stringify(user));
        jsonOutput.textContent = "user object saved as string to localStorage";
});

document.getElementById("readBtn").addEventListener("click",function(){
    const item = localStorage.getItem("userProfile");
    console.log(JSON.parse(item));
    console.log(item);
    jsonOutput.innerText = item;
});