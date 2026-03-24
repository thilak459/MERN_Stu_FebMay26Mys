// Using the EventEmitter class
const EventEmitter = require("events");

//create a new event emitter instance
//This object can publish events and allow listeners to subscribe
const orderEmitter = new EventEmitter();

//Register a listener fot the "orderPlaced" event.
//whenever the event is emitted, the function will execute
//once() registers a listener that automatically removes itself after running for the first time.
orderEmitter.once("OrderPlaced",function(orderId,customerName){
        console.log("Hello ",customerName)
        console.log("Waiting for restaurant to accept order.",orderId);
    }
);

orderEmitter.on("OrderPlaced",function(orderId,customerName){
        console.log("Hello ",customerName)
        console.log("Restaurant to accept order.",orderId);
    }
);

orderEmitter.on("OrderPlaced",function(orderId,customerName){
        console.log("Hello ",customerName)
        console.log("Assigining delivery partner.");
    }
);

orderEmitter.on("OrderPlaced",function(orderId,customerName,bill){
        console.log("Bill ",bill);
        console.log("Ramesh is delivering your order.",orderId);
    }
);

//Emit the event with extra data
//The listener recieves the orderId value.
orderEmitter.emit("OrderPlaced","ORD-2403001","Thilak",10000);
orderEmitter.emit("OrderPlaced","ORD-2403001","Thilak",10000);