import { Request, Response, Router } from "express";
import { CourseViewModel } from "../models/course/CourseViewModel";
import { ICourse, IDB, RequestWithBody, RequestWithParamsAndBody, RequestWithQuery } from "../types";
import { CourseUpdateModel } from "../models/course/CourseUpdateModel";
import { CoursesGetQueryModel } from "../models/course/GetCoursesQueryModel";
import { CourseCreateModel } from "../models/course/CourseCreateModel";

export const coursesRouter = (DB: IDB) => {
	const router = Router({});

	router.get('/:id', (req: Request<{ id: string }>, res: Response<CourseViewModel>) => {
		const foundCourse = DB.courses.find(course => course.id === +req.params.id)
		if (!foundCourse) {
			res.sendStatus(404);
			return;
		}
		res.status(200).json({
			id: foundCourse.id,
			title: foundCourse.title
		});
	});

	router.get('/', (req: RequestWithQuery<CoursesGetQueryModel>, res: Response<CourseViewModel[]>) => {
		let foundCourse = DB.courses
		if (req.query.title) {
			foundCourse = foundCourse.filter(course => course.title.indexOf(req.query.title) > -1)
			res.json(foundCourse.map(course => {
				return {
					id: course.id,
					title: course.title
				}
			}))
		} else {
			res.json(foundCourse.map(course => {
				return {
					id: course.id,
					title: course.title
				}
			}))
		}
	});

	router.post('/', (req: RequestWithBody<CourseCreateModel>, res) => {
		if (!req.body.title?.trim()) {
			res.sendStatus(400)
			return;
		}
		const course: ICourse = {
			id: +(new Date()),
			title: req.body.title.trim(),
			studentsCount: 1
		};
		DB.courses.push(course);
		res.status(201).json({
			id: course.id,
			title: course.title
		});
	})

	router.delete('/:id', (req: Request<{ id: string }>, res) => {
		if (!req.params.id) {
			res.sendStatus(404)
			return;
		}
		DB.courses = DB.courses.filter(course => course.id != +req.params.id)
		res.sendStatus(200);
	})

	router.put('/:id',
		(req: RequestWithParamsAndBody<{ id: string }, CourseUpdateModel>, res) => {
			const foundCourse = DB.courses.find(course => course.id === +req.params.id)
			if (!foundCourse || !req.body.title?.trim()) {
				res.sendStatus(400);
				return;
			}
			foundCourse.title = req.body.title?.trim()
			res.status(200).json({
				id: foundCourse.id,
				title: foundCourse.title
			});
		})
	return router
}
