// Asynchronous approach of Node.js
console.log("Step 1: script started.");
setTimeout(()=>{
    console.log("Step 3: Delayed callback finished. F1.");
},10000);
setTimeout(function(){
    console.log("Step 3: Delayed callback finished. F2.");
},3000);

console.log("Step 2: Script did not while waiting.");