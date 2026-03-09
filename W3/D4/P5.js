//Reduce method
let nums = [5,10,15];

let total = nums.reduce((intermediateSum,current) => intermediateSum + current,0);
console.log(total/nums.length);

//Reduce to object count by category
let items = ["pen","pencil","pen","eraser"];
let count = items.reduce((intermediatevalue,item)=>{intermediatevalue[item]=(intermediatevalue[item] ||0)+1;
    return intermediatevalue;
},{});
console.log("Item count:",count);