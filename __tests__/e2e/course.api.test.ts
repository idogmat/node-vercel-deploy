import request from 'supertest'
import { app } from '../../src/app'
import userTestManager from '../utils/userTestManager';

describe('/courses', () => {
    let cretedCourse: any = null;
    let updatedCourse: any = null;
    let server: any = null;
    beforeAll(() => {
        server = app.listen(2000);
    })
    afterAll(()=>{
        server.close()
    })

    it('should return 200 and entity array', async () => {
        await request(app).get('/courses').expect(200, [
            {id: 1, title: 'frontend'},
            {id: 2, title: 'backend'},
            {id: 3, title: 'automation-qa'},
            {id: 4, title: 'devops'}
        ])
    })

    it('should return 200 and entity array matched query title', async () => {
        await request(app).get('/courses').query({ title: 'front' }).expect(200, [
            {id: 1, title: 'frontend'},
        ])
    })

    it('should return 200 and entity array matched query title', async () => {
        await request(app).get('/courses/1')
            .expect(200, {id: 1, title: 'frontend'})
    })

    it('should return 404 for undefined course', async () => {
        await request(app).get('/courses/9999')
            .expect(404)
    })

    it('should create new entity, return 201 and creted entity', async () => {
        cretedCourse = await userTestManager.createEntity('/courses', {title: 'newCourse'})
            await request(app).get(`/courses/${cretedCourse.id}`)
            .expect(200, cretedCourse)
    })

    it('shouldn\'t create new entity, return 400 for empty title field', async () => {
        await request(app).post('/courses').send({title: ' '})
            .expect(400)
    })

    it('should update, return 200 and entity with new title', async () => {
        updatedCourse = await userTestManager.updateEntity(
            `/courses/${cretedCourse.id}`,
            { title: 'updatedCourse'}
        )
        expect(updatedCourse).toEqual({
            id: cretedCourse.id,
            title: 'updatedCourse'
        })
        await request(app).get(`/courses/${updatedCourse.id}`)
        .expect(200, updatedCourse)
    })

    it('should return 200', async () => {
        await request(app).delete(`/courses/${updatedCourse.id}`)
            .expect(200)
            await request(app).get(`/courses/${updatedCourse.id}`)
            .expect(404)
    })
})