import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const EXPERIENCE_COLLECTION = db.collection('experience');

//get all experiences
router.get('/', async (req, res) => {
    let experienceResult = await EXPERIENCE_COLLECTION.find({}).toArray();
    res.send(experienceResult).status(200);
});

//get a single experience by id
router.get('/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id)};
    let oneExperienceResult = await EXPERIENCE_COLLECTION.findOne(query);

    (!oneExperienceResult) ? res.send('Not found').status(404) : res.send(oneExperienceResult).status(200);
});

//Add a singlle experience by id
router.post('/', async (req, res) => {
    try {
        let newExperience = {
            institution: req.body.institution,
            position: req.body.position,
            role: req.body.role,
            date: req.body.date,
        };
        let newExperienceResult = await EXPERIENCE_COLLECTION.insertOne(newExperience);
        res.send(newExperienceResult);
    } catch (error) {
        console.error(error)
    }
});

//update a single achievement
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const update = {
            $set: {
                institution: req.body.institution,
                position: req.body.position,
                role: req.body.role,
                date: req.body.date
            },
        };
        let experienceUpdateResults = await EXPERIENCE_COLLECTION.updateOne(query, update);
        res.send(experienceUpdateResults);
    } catch (error) {
        console.error(error);
    }
});

//deleting one item
router.delete('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        let deleteExperienceResult = await EXPERIENCE_COLLECTION.deleteOne(query);
        res.send(deleteExperienceResult).status(202);
    } catch (error) {
        console.error(error);
    }
});


export default router;