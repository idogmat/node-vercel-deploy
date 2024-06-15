"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
};
let db = [
    { id: 1, title: 'frontend' },
    { id: 2, title: 'backend' },
    { id: 3, title: 'automation-qa' },
    { id: 4, title: 'devops' }
];
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send({ message: 'Hello samurais!' });
});
app.get('/200', (req, res) => {
    res.send(200) || res.sendStatus(200);
});
app.get('/400', (req, res) => {
    res.send(400) || res.sendStatus(400);
});
app.get('/json', (req, res) => {
    res.json({ message: 'json method send!' });
});
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.find(course => course.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.json(foundCourse);
});
app.get('/courses', (req, res) => {
    let foundCourse = db;
    if (req.query.title)
        foundCourse = foundCourse.filter(course => course.title.indexOf(req.query.title) > -1);
    res.json(foundCourse);
});
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const course = {
        id: +(new Date()),
        title: req.body.title
    };
    db.push(course);
    res.status(201).json(course);
});
app.delete('/courses/:id', (req, res) => {
    if (!req.params.id) {
        res.sendStatus(404);
        return;
    }
    db = db.filter(course => course.id != +req.params.id);
    res.sendStatus(204);
});
app.put('/courses/:id', (req, res) => {
    const foundCourse = db.find(course => course.id === +req.params.id);
    if (!foundCourse || !req.body.title) {
        res.sendStatus(400);
        return;
    }
    foundCourse.title = req.body.title;
    console.log(db);
    res.status(200).json(foundCourse);
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
exports.default = app;
