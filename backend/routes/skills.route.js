import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const SKILLS_COLLECTION = db.collection("skills");

//Endpoint to get all skills
router.get("/", async (req, res) => {
  let skillsResults = await SKILLS_COLLECTION.find({}).toArray();
  res.send(skillsResults).status(200);
});

//Endpoint for getting a single skill by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let oneSkillResults = await SKILLS_COLLECTION.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(oneSkillResults).status(200);
});

//Endpoint for adding a single skill
router.post("/", async (req, res) => {
  try {
    let newSkill = {
      skill: req.body.skill,
      proficiency: req.body.proficiency,
    };
    let newSkillResult = await SKILLS_COLLECTION.insertOne(newSkill);
    res.send(newSkillResult).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for updating a skill by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        skill: req.body.skill,
        proficiency: req.body.proficiency,
      },
    };
    let updateResult = await SKILLS_COLLECTION.updateOne(query, update);
    res.send(updateResult).status(201);
  } catch (error) {
    console.error(error);
  }
});

// Endpoint for deleting a single skill by id
router.delete('/:id', async (req, res)=>{
try {
  const query = { _id: new ObjectId(req.params.id) };
    let deleteSkillResult = await SKILLS_COLLECTION.deleteOne(query);
    res.send(deleteSkillResult).status(202);
} catch (error) {
  console.error(error)
}
});

export default router;
