import { Request } from "express";

export type RequestWithBody<T> = Request<{},{},T>;
export type RequestWithQuery<T> = Request<{},{},{},T>;
export type RequestWithParamsAndBody<T,B> = Request<T, {}, B>;


export interface ICourse {
    id: number;
    title: string;
    studentsCount: number;
}

export interface IUser {
    id: number;
    userName: string;
}

export interface ICourseBindings {
    userId: number;
    courseId: number;
    userName: string;
    date: number;
}

export interface IDB {
    courses: ICourse[];
    users: IUser[];
    usersCourseBindings: ICourseBindings[];
}