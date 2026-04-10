// Applied filters to the query using comparison operators
const mongoose = require("mongoose");

async function runFilterDemo(){
    try{
        await mongoose.connect("mongodb://localhost:27017/merntraining");
        console.log("MongoDB connected successfully");

        const productSchema = new mongoose.Schema({
            name: String,
            price: Number,
            category: String,
            status: String
        });

        const Product = mongoose.models.Product || mongoose.model("Product",productSchema);

        const firstProduct = await Product.create([
            {
                name: "Book",
                price: 300,
                category: "Stationary",
                status:"active"
            },
            {
                name:"Laptop",
                price: 40000,
                category:"Electronics",
                status:"active"
            },
            {
                name:"CD",
                price:300,
                category:"Electronics",
                status:"inactive"
            },
            {
                name:"pen",
                price:30,
                category:"Stationary",
                status:"inactive"
            }
        ]);

        const equalQuery = await Product.find({status:{$eq:"active"}});
        console.log("Products which are active:",equalQuery);

        const greaterQuery = await Product.find({price:{$gt:5000}});
        console.log("Greater than 5000:",greaterQuery);

        const lesserQuery = await Product.find({price:{$lt:5000}});
        console.log("Less than 5000:",lesserQuery);

        const notQuery = await Product.find({name:{$ne:"Laptop"}});
        console.log("Not equal to Laptop:",notQuery);

        await mongoose.connection.close();
        console.log("Connection closed");
    }
    catch(error){
        console.log("Crud demo error:",error.message);
    }
}
runFilterDemo();