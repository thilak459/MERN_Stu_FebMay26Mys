// Basics of embedding and referencing
const mongoose = require("mongoose");

async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/embrel')
        console.log("Connected to MongoDB");

        const orderSchema = new mongoose.Schema({
            product:String,
            price:Number
        });
        const userSchema = new mongoose.Schema({
            name:String,
            orders:[orderSchema] //embedded document
        });
        const User = mongoose.model('User',userSchema);
        const embeddedUser = await User.create({
            name:"Thilak",
            orders:[
                {product:"Laptop",price:50000},
                {product:"Printer",price:10000},
                {product:"Projector",price:70000},
            ]
        });
        console.log("Users:\n");
        // It prints all the data
        const users = await User.find().lean();
        console.log(JSON.stringify(users,null,2));
        // console.log(embeddedUser);

        // Referencing
        const userRefSchema = new mongoose.Schema({
            name:String
        });
        const orderRefSchema = new mongoose.Schema({
            product:String,
            price:Number,
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'UserRef'
            }
        });
        const UserRef = mongoose.model('UserRef',userRefSchema);
        const OrderRef = mongoose.model('OrderRef',orderRefSchema);

        const refUser = await UserRef.create({
            name:"Rakesh"
        });
        await OrderRef.create([
            {product:"Phone",price:50000,user:refUser._id},
            {product:"Charger",price:2000,user:refUser._id}
        ]);
        console.log("Referenced orders");
        console.log(await OrderRef.find().populate());
    }
    catch(error){
        console.log("Error:",error.message);
    }
    finally{
        await mongoose.disconnect();
        console.log("Disconnected from DB.");
    }
}
main();