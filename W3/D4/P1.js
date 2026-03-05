// Array basics
console.log("Array basics");
//Creating arrays
let emptyArray=[];
let number=[1,2,3,4];
let mixedArray=[42,"hello",true,null,{name:"gola"},[5,6]];
console.log(emptyArray);
console.log(number);
console.log(mixedArray);

//Using constructor
let fruits = new Array("Apple","Mango","Orange");
console.log(fruits);
console.log("Is fruits an array?",Array.isArray(fruits));

//push:add
fruits.push("cherry");
console.log(fruits);

//pop:remove
fruits.pop();
console.log(fruits);

//unshift:adds to beginning
fruits.unshift("Cherry");
console.log(fruits);

//shift:remove from beginning
fruits.shift();
console.log(fruits);