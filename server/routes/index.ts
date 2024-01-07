import express from "express";
const router = express.Router();


router.get('/', (req,res)=>{

 res.send("server connected")

});


module.exports = router;
