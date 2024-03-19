import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import skillsRouter from "./routes/skills.route.js"
import projectRouter from "./routes/project.route.js"
import postRouter from "./routes/post.route.js"
import experienceRouter from "./routes/experience.route.js"
import achievementRouter from "./routes/achievement.route.js"



const PORT = process.env.PORT || 4000

const app = express ();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/skills', skillsRouter);
app.use('/project', projectRouter);
app.use('/post', postRouter);
app.use('/experience', experienceRouter);
app.use('/achievement', achievementRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})