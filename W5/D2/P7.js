//callback handling with name functions
function loadUser(next){
    setTimeout(function(){
        console.log("Step 1: User loaded.");
        next();
    },400);
}
function loadOrders(next){
    setTimeout(function(){
        console.log("Step 2: Orders loaded.");
        next();
    },400);
}
function loadPay(next){
    setTimeout(function(){
        console.log("Step 3: Payment loaded.");
        next();
    },400);
}
function loadShipment(){
    setTimeout(function(){
        console.log("Step 4: Shipment loaded.");
        console.log("Same flow but easier to read");
    },400);
}
loadUser(function(){
    loadOrders(function(){
        loadPay(function(){
            loadShipment();
        });
    });
});