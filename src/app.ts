import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { coursesRouter } from './routes/courses.router';
import { usersRouter } from './routes/users.router';
import { db } from './db';
import { usersCourseBindingRouter } from './routes/usersCourseBinding.router';
dotenv.config();


const ROUTER_PATH = {
    courses: '/courses',
    usesrs: '/users',
    bidingCourses: '/bidingCourses'
}


export const app = express();

app.use(express.json());

app.use(ROUTER_PATH.courses, coursesRouter(db));
app.use(ROUTER_PATH.usesrs, usersRouter(db));
app.use(ROUTER_PATH.bidingCourses, usersCourseBindingRouter(db));

app.get('/', (req: Request , res: Response) => {
    res.send({message: 'Hello samurais!'})
})
app.get('/200', (req , res) => {
    res.send(200) || res.sendStatus(200)
})
app.get('/400', (req , res) => {
    res.send(400) || res.sendStatus(400)
})
app.get('/json', (req , res) => {
    res.status(200).json({message: 'json method send!'})
})
