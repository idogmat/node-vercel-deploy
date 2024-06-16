import request from 'supertest'
import { app } from '../../src/app'
const userTestManager = {
	async createEntity(path: string, body: string | object | undefined) {
		return (await request(app).post(path).send(body).expect(201)).body
	},
	async updateEntity(path: string, body: string | object | undefined) {
		return (await request(app).put(path).send(body).expect(200)).body
	}
}

export default userTestManager