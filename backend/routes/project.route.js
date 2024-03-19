import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const SKILLS_COLLECTION = db.collection("skills");

//End point to get all projects
router.get('/', async (req,res)=>{
let projectResults = await SKILLS_COLLECTION.find({}).toArray();
res.send(projectResults).status(200);
});

//Endpoint to get a single project by id
router.get('/:id', async(req,res)=>{
let query = {_id: new ObjectId (req.params.id)};
});
//Endpoint to add a project (project details to add-->name, link, description,image )

