import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const ACHIEVEMENT_COLLECTION = db.collection('achievement');

//get all achievements
router.get('/', async(req,res)=>{
let achieveResult = await ACHIEVEMENT_COLLECTION.find({}).toArray();
res.send(achieveResult).status(200);
});

//post an achievement(details--> title, content and cert image)
router.post('/', async(req,res)=>{
try {
    let newAchieve = {
        title: req.body.title,
        content: req.body.content,
        certImage: url
    }
    let 
} catch (error) {
    
}
});
