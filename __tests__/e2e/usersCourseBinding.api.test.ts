import request from 'supertest'
import { app } from '../../src/app'
import userTestManager from '../utils/userTestManager';
import { db } from '../../src/db';

describe('/users', () => {
    let courseId = 3;
    let userId = 1;
    let server: any = null;
    beforeAll(() => {
        server = app.listen(2000);
    })
    afterAll(()=>{
        server.close()
    })

    it('should return 200 and array entities', async () => {
        await request(app).get(`/bidingCourses`)
        .expect(200, db.usersCourseBindings)
    })

    it('should return 201', async () => {
      console.log(db.usersCourseBindings)
        const result = await userTestManager.createEntity(`/bidingCourses`, {courseId, userId});
        expect(result).toEqual({
          courseId,
          userId,
          date: expect.any(Number),
          userName: expect.any(String),
        })
    })

    // it('should return 201 and created entity', async () => {
    //     newUser = await userTestManager.createEntity(`/users`, { userName: 'Ignat' })
    //     expect(newUser).toEqual({
    //         id: newUser.id,
    //         userName: 'Ignat'
    //     })
    // })
})