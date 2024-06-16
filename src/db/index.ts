import { IDB } from "../types";

export let db: IDB = {
    courses: [
        {id: 1, title: 'frontend', studentsCount: 1},
        {id: 2, title: 'backend', studentsCount: 2},
        {id: 3, title: 'automation-qa', studentsCount: 1},
        {id: 4, title: 'devops', studentsCount: 1}
    ],
    users: [
        {id: 1, userName: 'Jack'},
        {id: 2, userName: 'Lerchik'},
    ],
    usersCourseBindings: [
        {userId: 1, courseId: 1, userName: 'Jack', date: +new Date(2022,10,1)},
        {userId: 2, courseId: 2, userName: 'Jack', date: +new Date(2022,10,1)},
        {userId: 1, courseId: 2, userName: 'Jack', date: +new Date(2022,10,1)}
    ]
} 