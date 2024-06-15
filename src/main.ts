import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { RequestWithBody, RequestWithParamsAndBody, RequestWithQuery } from './types';
import { CourseUpdateModel } from './models/CourseUpdateModel';
import { CourseCreateModel } from './models/CourseCreateModel';
import { CoursesGetQueryModel } from './models/GetCoursesQueryModel';
import { CourseViewModel } from './models/CourseViewModel';
dotenv.config();

interface ICourse {
    id: number;
    title: string;
    studentsCount: number;
}

let db: ICourse[] = [
    {id: 1, title: 'frontend', studentsCount: 1},
    {id: 2, title: 'backend', studentsCount: 1},
    {id: 3, title: 'automation-qa', studentsCount: 1},
    {id: 4, title: 'devops', studentsCount: 1}
];
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())


app.get('/', (req: RequestWithBody<{title: string}> , res: Response) => {
    res.send({message: 'Hello samurais!'})
})
app.get('/200', (req , res) => {
    res.send(200) || res.sendStatus(200)
})
app.get('/400', (req , res) => {
    res.send(400) || res.sendStatus(400)
})
app.get('/json', (req , res) => {
    res.json({message: 'json method send!'})
})
app.get('/courses/:id', (req: Request<{id: string}>, res: Response<CourseViewModel>) => {
    const foundCourse = db.find(course=> course.id === +req.params.id)
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.json({
        id: foundCourse.id,
        title: foundCourse.title
    });
})

app.get('/courses', (req: RequestWithQuery<CoursesGetQueryModel> , res: Response<CourseViewModel[]>) => {
    let foundCourse = db
    if (!req.query.title) {
        res.sendStatus(404)
        return;
    }
    foundCourse = foundCourse.filter(course=> course.title.indexOf(req.query.title) > -1)    
    res.json(foundCourse.map(dbCourse=>{
        return {
            id: dbCourse.id,
            title: dbCourse.title
        }
    }));
})

app.post('/courses', (req: RequestWithBody<CourseCreateModel> , res) => {
    if (!req.body.title) {
        res.sendStatus(400)
        return;
    }
    const course: ICourse = {
        id: +(new Date()),
        title: req.body.title,
        studentsCount: 1
    };
    db.push(course);
    res.status(201).json(course);
})

app.delete('/courses/:id', (req: Request<{ id: string }>, res) => {
    if (!req.params.id) {
        res.sendStatus(404)
        return;
    }
    db = db.filter(course=> course.id != +req.params.id)
    res.sendStatus(204);
})

app.put('/courses/:id', (req: RequestWithParamsAndBody<{ id: string }, CourseUpdateModel>, res) => {
    const foundCourse = db.find(course=> course.id === +req.params.id)
    if (!foundCourse || !req.body.title) {
        res.sendStatus(400);
        return;
    }
    foundCourse.title = req.body.title
    console.log(db)
    res.status(200).json(foundCourse);
})

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})