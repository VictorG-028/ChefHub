// // import { mock, instance, when, anything } from 'ts-mockito';
// // import assert from 'assert';
// import express from 'express';
// import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';
// import UserController from '../../src/controllers/UserController';
// import User from '../../src/beans/User';
// import Helper from '../Helper';
// import { StatusCodes } from 'http-status-codes';
// import { app, server } from '../../src/server';
// import http from 'http';


// describe('Unit Tests of User Routes', () => {
//   let app: express.Application;
//   let server: http.Server;

//   beforeAll(async () => {
//     app = await Helper.getApp();
//     server = await Helper.getServer();
//   });
//   afterAll((done) => {
//     server.close(() => {
//       done();
//     });
//   });

//   const userController = new UserController();

//   it('Register valid user', async () => {
//     const email = validTestUser.email;
//     const password = validTestUser.password;

//     const req: express.Request = {
//       body: {
//         email,
//         password
//       }
//     } as express.Request;
//     const res: express.Response = { status: StatusCodes } as unknown as express.Response;

//     // Create new user
//     const response = await userController.register(req, res);
//     // const { msg, id }: { msg: string, id: string } = response.json();
//     const responseBody = response.json();

//     // Select the created new user
//     // const { data: testCreatedUser, error: selectError } = await supabase
//     //   .from('User')
//     //   .select("*")
//     //   .eq("email", email);

//     // const id = testCreatedUser ? testCreatedUser[0].id : NIL_UUID;

//     // expect(insertError).toBe(null);
//     // expect(selectError).toBe(null);
//     // expect(testCreatedUser).not.toBe(null);
//     // expect(testCreatedUser?.length).toBe(1);
//     // expect(testCreatedUser).toEqual([{ email, id, password }]);

//     expect(response.status).toBe(StatusCodes.OK);
//     // expect(responseBody.msg).toBe('New user created!');
//     // expect(responseBody).toEqual({ msg: 'New user created!', id: expect.anything() });
//   });

//   it('Login user', async () => {
//     const email = validTestUser.email;
//     const password = validTestUser.password;

//     const req: express.Request = {
//       body: {
//         email,
//         password
//       }
//     } as express.Request;
//     const res: express.Response = { status: StatusCodes } as unknown as express.Response;

//     // Login test user
//     const response = await userController.login(req, res);
//     const responseBody = response.json();

//     expect(response.status).toBe(StatusCodes.OK);
//     // expect(responseBody).toEqual({ msg: 'Login bem-sucedido', id: expect.anything() });
//   });


//   // it('Create and login valid user with hased password', async () => {
//   //   expect(2).toBe(1);
//   // });

// });
