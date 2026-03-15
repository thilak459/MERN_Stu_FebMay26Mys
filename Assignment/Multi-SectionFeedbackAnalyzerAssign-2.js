const userName = document.getElementById("name");
const email = document.getElementById("email");
const type = document.getElementById("type");
const text = document.getElementById("text");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const feedbackData = document.getElementById("feedbackData");

addBtn.addEventListener("click",function(event){
    event.preventDefault();
    const validEmail = email.value.trim();
    if(!validEmail){
        message.textContent = "Email is required";
        message.style.color = "red";
        email.focus();
        return;
    }
    if(!validEmail.includes('@') || !validEmail.includes('.')){
        message.textContent = "Please enter valid email";
        message.style.color = "red";
        email.focus();
        return;
    }
    const validText = text.value.trim();
    if(validText < 20){
        message.textContent = "The feedback text must be above 20 character";
        message.style.color = "red";
        return;
    }
    const pName = document.createElement("h3");
    pName.textContent = userName.value;
    feedbackData.appendChild(pName);

    const pEmail = document.createElement("p");
    pEmail.textContent = email.value;
    feedbackData.appendChild(pEmail);

    const pType = document.createElement("h4");
    pType.textContent = type.value;
    feedbackData.appendChild(pType);

    const pText = document.createElement("p");
    pText.textContent = text.value;
    feedbackData.appendChild(pText);

    message.textContent = "";

    const count = document.getElementById("count");
    const total = 0;
    count.textContent = total++;
});
deleteBtn.addEventListener("click",function(){
    feedbackData.removeChild(feedbackData.lastElementChild);
})