// Event loop with multiple asynchronous tasks
console.log("Main script started.");
//Task 1
setTimeout(()=>{
    console.log("Timer A finished after 500ms");
},500);
//Task 2
setTimeout(()=>{
    console.log("Timer B finished after 100ms");
},100);
//Task 3
setTimeout(()=>{
    console.log("Timer C finished after 0ms, but still waits for sync code to completed");
},0);

console.log("Main script ended");