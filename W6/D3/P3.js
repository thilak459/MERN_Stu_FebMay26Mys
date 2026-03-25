// Reading & writing files asynchronously with callbacks
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"async-note.txt");

//To write to a file
fs.writeFile(
    filePath,"This is written asyncronously using writeFile().",function(writeError){
        if(writeError){
            console.log("Write error:",writeError.message);
            return;
        }
        console.log("File written asynchronously.");
    }
);

const content = fs.readFile(filePath,"utf-8",
    function(readError,content){
        if(readError){
            console.log("Read error:",readError.message);
            return;
        }
        console.log(content)
    }  
);
console.log("Script continues while file operations are in progress.");