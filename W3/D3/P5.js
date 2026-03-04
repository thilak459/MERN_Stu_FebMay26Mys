//basics of objects 
const person={name:"Rahul", age:30, isStudent:false};
console.log("Person",person);
console.log("Name:",person.name);
console.log("Age:",person['age']);

//Add a new property
person.city="Mysore";
console.log("person",person);
//Modify
person.age=31;
console.log("person",person);
//delete
delete person.isStudent;
console.log("person",person);

//Object constructor
const car = new Object();
car.make="Audi";
car.model="A4";
car.year=2026;
console.log("car",car);