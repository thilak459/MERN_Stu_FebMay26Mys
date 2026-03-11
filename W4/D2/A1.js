const passwardForm = document.getElementById("passwardForm");
const signupPassward = document.getElementById("signupPassward");
const confirmPassward =document.getElementById("confirmPassward");
const message = document.getElementById("message");

passwardForm.addEventListener("submit",function(event){
    event.preventDefault();
    //Passward validation
    const passward = signupPassward.value;
    if(!passward){
        message.textContent = "Passward is required";
        message.style.color = "red";
        signupPassward.focus();
        return;
    }
    //Check length of the passward
    if(passward.length < 8){
        message.textContent = "Passward must be atleast 8 characters long.";
        message.style.color = "red";
        signupPassward.focus();
        return;
    }
    //Check UPPERCASE characters
    if(!/[A-Z]/.test(passward)){
        message.textContent = "Passward must have atleast 1 UPPERCASE character.";
        message.style.color = "red";
        signupPassward.focus();
        return;
    }
    //Check lowercase characters
    if(!/[a-z]/.test(passward)){
        message.textContent = "Passward must have atleast 1 lowercase character.";
        message.style.color = "red";
        signupPassward.focus();
        return;
    }
    //Check number
    if(!/\d/.test(passward)){
        message.textContent = "Passward must have atleast 1 digit in it.";
        message.style.color = "red";
        signupPassward.focus();
        return;
    }
    //Check special chars
    if(!/[@#$%&*!]/.test(passward)){
        message.textContent = "Passward must have atleast 1 special character @#$%&*!";
        message.style.color = "red";
        signupPassward.focus();
        return;
    }
    const confirm = confirmPassward.value;
    if(passward!=confirm){
        message.textContent = "Passward not matches"
        message.style.color = "red";
    }
    if(passward==confirm){
        message.textContent = "Passward matches"
        message.style.color = "green";
    }
});
//clear message on input
signupPassward.addEventListener("input",() => message.textContent = "");
confirmPassward.addEventListener("input",() => message.textContent = "");