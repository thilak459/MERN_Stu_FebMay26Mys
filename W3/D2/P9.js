//IIFE
//without parameters
(function(){
    console.log("basic IIFE executed immediatly");
})();

//with parameters
(function(appName,version){
    console.log("App:",appName,"Version:",version);
})("NodeJS","V22.22.0");

//with return value
const result=(function(){
    const a = 10,b=20;
    return a+b;
})();
console.log("Sum is",result);