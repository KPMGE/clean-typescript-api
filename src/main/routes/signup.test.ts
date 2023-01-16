import request from "supertest"
import { app } from "../config/app"

describe('Sigup Route', () => {
  it('should create an account', async () => {
    await request(app)
    .post('/api/signup')
    .send({
      name: 'kevin', 
      email: 'somemal@gmail.com',
      password: '1234',
      confirmPassword: '1234'
    })
    .expect(200)
  })
})
