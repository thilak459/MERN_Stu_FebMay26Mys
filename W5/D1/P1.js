// Introduction to Node.js

const runtimeName = "Node.js";
console.log("Introduction to Node.js");
console.log(`${runtimeName} runs javascript outside the browser`);

const commonUser = [
    "used for server-side app",
    "automation scripts can be created"
];
//array destructuring
// console.log(commonUser[0]);
// console.log(commonUser[1]);
commonUser.forEach((commonUse,index)=>{
    console.log(`${index+1}.${commonUse}`);
});