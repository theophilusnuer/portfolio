import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const POST_COLLECTION = db.collection("post");

//End point to get all posts
router.get("/", async (req, res) => {
  let postResults = await POST_COLLECTION.find({}).toArray();
  res.send(postResults).status(200);
});

//Endpoint to get a single post by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let onePostResult = await POST_COLLECTION.findOne(query);

  (!onePostResult) ? res.send("not found").status(404) : res.send(onePostResult).status(200);
});

//Endpoint to add a post (post details to add--> heading, content,image )
router.post("/", async (req, res) => {
  try {
    let newpost = {
      heading: req.body.heading,
      content: req.body.content,
      // image: urlencoded,
    };
    let newPostResult = await POST_COLLECTION.insertOne(newpost);
    res.send(newPostResult).status(201);
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
        heading: req.body.heading,
        content: req.body.content,
        // image: urlencoded,
      },
    };
    let postUpdateResult = await POST_COLLECTION.updateOne(query,update);
    res.send(postUpdateResult).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for deleting a single skill by id
router.delete('/:id', async (req,res)=>{
    try {
        const query = {_id: new ObjectId(req.params.id)};
        let deletePostResult = await POST_COLLECTION.deleteOne(query);
        res.send(deletePostResult).status(202);
    } catch (error) {
        console.error(error);
    }
})

export default router;