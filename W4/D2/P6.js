const livePassward = document.getElementById("livePassward");
const message = document.getElementById("message");

livePassward.addEventListener("input",function(){
    //Passward validation
    const passward = livePassward.value;
    if(!passward){
        message.textContent = "Passward is required";
        message.style.color = "red";
        livePassward.focus();
        return;
    }
    //Check length of the passward
    if(passward.length < 8){
        message.textContent = "Passward must be atleast 8 characters long.";
        message.style.color = "red";
        livePassward.focus();
        return;
    }
    //Check UPPERCASE characters
    if(!/[A-Z]/.test(passward)){
        message.textContent = "Passward must have atleast 1 UPPERCASE character.";
        message.style.color = "red";
        livePassward.focus();
        return;
    }
    //Check lowercase characters
    if(!/[a-z]/.test(passward)){
        message.textContent = "Passward must have atleast 1 lowercase character.";
        message.style.color = "red";
        livePassward.focus();
        return;
    }
    //Check number
    if(!/\d/.test(passward)){
        message.textContent = "Passward must have atleast 1 digit in it.";
        message.style.color = "red";
        livePassward.focus();
        return;
    }
    //Check special chars
    if(!/[@#$%&*!]/.test(passward)){
        message.textContent = "Passward must have atleast 1 special character @#$%&*!";
        message.style.color = "red";
        livePassward.focus();
        return;
    }
    message.textContent = "Valid email & passward entered";
    message.style.color = "green";
    console.log("Success!",{passward});
})