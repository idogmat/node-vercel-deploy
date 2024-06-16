import { Request, Response, Router } from "express";
import { IDB, IUser, RequestWithBody } from "../types";
import { UserCreateModel } from "../models/user/UserCreateModel";

export const usersRouter = (DB: IDB) => {

	const router = Router({});

	router.get('/:id', (req: Request<{ id: string }>, res: Response<IUser>) => {
		const foundCourse = DB.users.find(course => course.id === +req.params.id)
		if (!foundCourse) {
			res.sendStatus(404);
			return;
		}
		res.json({
			id: foundCourse.id,
			userName: foundCourse.userName
		});
	});

	router.get('/', (req: Request, res: Response<IUser[]>) => {
		res.json(DB.users);
	});

	router.post('/', (req: RequestWithBody<UserCreateModel>, res: Response<IUser | number>) => {
		if (!req.body.userName) {
			res.send(400)
		} else {
			const newUser = { id: +new Date(), userName: req.body.userName }
			DB.users.push(newUser)
			res.status(201).json(newUser)
		}
	});

	return router;
}