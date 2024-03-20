import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const ACHIEVEMENT_COLLECTION = db.collection("achievement");

//get all achievements
router.get("/", async (req, res) => {
  let achieveResult = await ACHIEVEMENT_COLLECTION.find({}).toArray();
  res.send(achieveResult).status(200);
});

//get a single achievement by id
router.get("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  let oneAchieveResult = await ACHIEVEMENT_COLLECTION.findOne(query);
  (!oneAchieveResult) ? res.send("Not Found").status(404) : res.send(oneAchieveResult).status(200);
});

//post an achievement(details--> title, content and cert image)
router.post("/", async (req, res) => {
  try {
    let newAchieve = {
      title: req.body.title,
      content: req.body.content,
      // certImage: url,
    };
    let newAchieveResult = await ACHIEVEMENT_COLLECTION.insertOne(newAchieve);
    res.send(newAchieveResult).status(201);
  } catch (error) {
    console.error(error);
  }
});

//update a single achievement
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        title: req.body.title,
        content: req.body.content,
        // certImage: url,
      },
    };
    let achieveUpdateResults = await ACHIEVEMENT_COLLECTION.updateOne(query, update);
    res.send(achieveUpdateResults).status(201);
  } catch (error) {
    console.error(error);
  }
});

//deleting one item
router.delete('/:id', async(req,res)=>{
try {
    const query = {_id: new ObjectId(req.params.id)};
    let deleteAchieveResult = await ACHIEVEMENT_COLLECTION.deleteOne(query);
    res.send(deleteAchieveResult).status(202);
} catch (error) {
    console.error(error);
}
});

export default  router;