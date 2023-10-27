import request from 'supertest';
import express from 'express';
import Helper from '../Helper';
import { StatusCodes } from 'http-status-codes';
import http from 'http';
import { NIL as NIL_UUID } from 'uuid';

describe('Integration Tests of User Routes', () => {
  let app: express.Application;
  let server: http.Server;
  const port: number = 4003;

  beforeAll(async () => {
    app = await Helper.getApp();
    server = await Helper.getServer(port);
  });
  afterAll(async () => {
    server.close(); // Close open handles
    await Helper.databaseDeleteValidUser();
  });

  it('Successfully GET /all_users', async () => {
    await request(app)
      .get('/all_users')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK);
  });

  it('Successfully POST /register_user passing valid user', async () => {
    const email = Helper.validTestUser.email;
    const password = Helper.validTestUser.password;

    await request(app)
      .post('/register_user')
      .set('Accept', 'application/json')
      .send({ email, password })
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('New user created!');
        expect(res.body.id).not.toBe(NIL_UUID);
      })
      .expect(StatusCodes.OK);
  });

  it('Successfully POST /login_user passing valid user', async () => {
    const email = Helper.validTestUser.email;
    const password = Helper.validTestUser.password;

    await request(app)
      .post('/login_user')
      .set('Accept', 'application/json')
      .send({ email, password })
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('Login bem-sucedido');
        expect(res.body.id).not.toBe(NIL_UUID);
      })
      .expect(StatusCodes.OK);
  });

  it('Fail POST /register_user passing invalid user', async () => {
    const email = Helper.invalidTestUser.email;
    const password = Helper.invalidTestUser.password;

    await request(app)
      .post('/register_user')
      .set('Accept', 'application/json')
      .send({ email, password })
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('[UserController.register] Email already in use');
        expect(res.body.id).toBe(NIL_UUID);
      })
      .expect(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
