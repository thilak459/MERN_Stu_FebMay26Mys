const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/auth.middleware");
const {authorize} = require("../middleware/role.middleware");

// Public route
router.get("/",(req,res)=>{
    res.send("Get movies");
});

// Admin only route
router.post("/",protect,authorize("admin"),(req,res)=>{
    res.send("Create movie");
});
module.exports = router;