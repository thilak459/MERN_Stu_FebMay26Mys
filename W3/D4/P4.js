//Filter method
let marks=[75,49,56,70,82,51,68];
let passed = marks.filter(mark => mark >= 70);
console.log(marks);
console.log(passed);

let students=[
    {name:"Vishnu", score:75},
    {name:"Vinay", score:49},
    {name:"Rohit",score:56},
    {name:"Kumar",score:70},
    {name:"Rakshith",score:82},
    {name:"Puneeth",score:51},
    {name:"Manoj",score:68}

];
let passedStudent=students.filter(s=>s.score >= 70);
let pasname=passedStudent.map(stu=>stu.name);

let passedStudent1=students.filter(s=>s.score >= 70).map(stu=>stu.name);
console.log("QualifiedStudents:",passedStudent1);
