function tagPassward(passward){
    if(typeof passward !=="string"){
        return "INVALID";
    }
    const length = passward.length;
    if(length<8){
        return "WEAK";
    }
    else if(length>=8 && length<12){
        return "MEDIUM";
    }
    else if(length>=12){
        return "STRONG";
    }
}
let passward=12345;
console.log(tagPassward(passward));
