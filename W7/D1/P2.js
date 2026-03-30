// Basic routing in Express
const express = require("express");

const app = express();

app.get("/",function(req,res){
    res.send("Home route in express server");
});

app.get("/about",function(req,res){
    res.send("About route in express server");
});

app.get("/products",function(req,res){
    res.send("Products route in express server");
});

app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});