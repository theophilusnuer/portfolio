import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const PROJECT_COLLECTION = db.collection("project");

//End point to get all projects
router.get("/", async (req, res) => {
  let projectResults = await PROJECT_COLLECTION.find({}).toArray();
  res.send(projectResults).status(200);
});

//Endpoint to get a single project by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let oneProjectResult = await PROJECT_COLLECTION.findOne(query);

  (!oneProjectResult) ? res.send("not found").status(404): res.send(oneProjectResult).status(200);
});

//Endpoint to add a project (project details to add-->name, link, description,image )
router.post("/", async (req, res) => {
  try {
    let newProject = {
      name: req.body.name,
      description: req.body.description,
    //   image: urlencoded,
    };
    let newProjectResult = await PROJECT_COLLECTION.insertOne(newProject);
    res.send(newProjectResult).status(201);
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
        name: req.body.name,
        description: req.body.description,
        // image: urlencoded,
      },
    };
    let projectUpdateResult = await PROJECT_COLLECTION.updateOne(query,update);
    res.send(projectUpdateResult).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for deleting a single skill by id
router.delete('/:id', async (req,res)=>{
    try {
        const query = {_id: new ObjectId(req.params.id)};
        let deleteProjectResult = await PROJECT_COLLECTION.deleteOne(query);
        res.send(deleteProjectResult).status(202);
    } catch (error) {
        console.error(error);
    }
})

export default router;