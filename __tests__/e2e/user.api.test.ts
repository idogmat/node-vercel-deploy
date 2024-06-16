import request from 'supertest'
import { app } from '../../src/app'
import userTestManager from '../utils/userTestManager';

describe('/users', () => {
    let newUser: any = null;
    let server: any = null;

    beforeAll(() => {
        server = app.listen(2000);
    })
    afterAll(()=>{
        server.close()
    })

    it('should return 200 and entity array', async () => {
        await request(app).get(`/users`)
        .expect(200, [
            {id: 1, userName: 'Jack'},
            {id: 2, userName: 'Lerchik'},
        ])
    })

    it('should return 200 and entity', async () => {
        await request(app).get(`/users/1`)
        .expect(200, {id: 1, userName: 'Jack'})
    })

    it('should return 201 and created entity', async () => {
        newUser = await userTestManager.createEntity(`/users`, { userName:'Ignat' })
        expect(newUser).toEqual({
            id: newUser.id,
            userName: 'Ignat'
        })
    })
})