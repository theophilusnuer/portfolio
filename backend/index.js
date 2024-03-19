import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import skillsRouter from "./routes/skills.route.js"
import projectRouter from "./routes/project.route.js"


const PORT = process.env.PORT || 4000

const app = express ();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/skills', skillsRouter);
app.use('/project', projectRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})