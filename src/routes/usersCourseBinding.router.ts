import { Request, Response, Router } from "express";
import { IDB, IUser, RequestWithBody } from "../types";
import { UserCreateModel } from "../models/user/UserCreateModel";
import { AddUserCourseBinding } from "../models/UsersCourseBindings/AddUserCourseBinding";
import { UserCourseBindingViewModel } from "../models/UsersCourseBindings/UserCourseBindingViewModel";

export const usersCourseBindingRouter = (DB: IDB) => {

	const router = Router({});

	router.post('/', (req: RequestWithBody<AddUserCourseBinding>, res: Response<UserCourseBindingViewModel>) => {
		const foundCourse = DB.courses.find(course => course.id === +req.body.courseId)
    const foundUser = DB.users.find(user => user.id === +req.body.userId)
		if (!foundCourse || !foundUser) {
			res.sendStatus(404);
			return;
		}

    const alreadyBindedCourse = DB.usersCourseBindings.find(bind => {
      return (bind.userId === foundUser.id && bind.courseId === foundCourse.id)
    })
    if (alreadyBindedCourse) {
      res.sendStatus(404);
			return;
    }
    const bindedUserCourse = {
      userId: foundUser.id,
      courseId: foundCourse.id,
			userName: foundUser.userName,
      date: +new Date()
    }
    DB.usersCourseBindings.push(bindedUserCourse)
		res.status(201).json(bindedUserCourse);
	});

	router.get('/', (req: Request, res: Response<UserCourseBindingViewModel[]>) => {
		res.status(200).json(DB.usersCourseBindings);
	});

	return router;
}