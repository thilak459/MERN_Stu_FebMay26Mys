const signupForm = document.getElementById("signupForm");
const signupEmail = document.getElementById("signupEmail");
const signupPassward = document.getElementById("signupPassward");
const message = document.getElementById("message");

signupForm.addEventListener("submit",function(event){
    event.preventDefault();
    const email = signupEmail.value.trim();
    if(!email){
        message.textContent = "Email is required";
        message.style.color = "red";
        signupEmail.focus();
        return;
    }
    if(!email.includes('@') || !email.includes('.')){
        message.textContent = "Please enter valid email";
        message.style.color = "red";
        signupEmail.focus();
        return;
    }
    //Passward validation
    const passward = signupPassward.value;
    // console.log(signupEmail.elements.signupPassward.value);
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
    message.textContent = "Valid email & passward entered";
    message.style.color = "green";
    console.log("Success!",{email,passward:"***Hidden***"});
});
//clear message on input
signupEmail.addEventListener("input",() => message.textContent = "");
signupPassward.addEventListener("input",() => message.textContent = "");