// setImmediate vs setTimeout
console.log("Scheduling setTimeout and setImmediet");

// callback timer
setTimeout(()=>{
    console.log("Timer callback from setTimeout");
},0);

// setImmediet callback
setImmediate(function(){
    console.log("SetImmediet callback executed.");
});


console.log("Both callbacks are now waiting for the event loop");
//setTimeout and setImmediet both are macrotasks