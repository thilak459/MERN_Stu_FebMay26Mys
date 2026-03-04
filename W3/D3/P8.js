//JSON stringify parse
const employee={
    id:101,
    name:"Sandeep",
    dept:"ME",
    isActive:true
};
const jsonString = JSON.stringify(employee);
console.log(jsonString);
console.log(employee);

//JSON parsing
const parseObject = JSON.parse(jsonString);
console.log(parseObject);