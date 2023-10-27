import request from 'supertest';
import express from 'express';
import Helper from '../Helper';
import { StatusCodes } from 'http-status-codes';
import http from 'http';

describe('Integration Tests of User Routes', () => {
  let app: express.Application;
  let server: http.Server;
  const port: number = 4001;

  beforeAll(async () => {
    app = await Helper.getApp();
    server = await Helper.getServer(port);
    await Helper.databaseInsertValidUser();
  });
  afterAll(async () => {
    server.close(); // Close open handles
    await Helper.databaseDeleteValidUser();
  });

  it('Successfully GET /all_ingredients/:shouldGetUserId?', async () => {
    await request(app)
      .get(`/all_ingredients/true`)
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK);
  });

  it('Successfully GET /get_user_ingredients/:user_id?', async () => {
    const id = Helper.validTestUser.id;
    await request(app)
      .get(`/all_ingredients/${id}`)
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK);
  });

  it('Successfully POST /create_ingredient passing valid ingredient', async () => {
    const validIngredient = Helper.generateInventoryIngredient();

    await request(app)
      .post('/create_ingredient')
      .set('Accept', 'application/json')
      .send(validIngredient)
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('New ingredient created!');
      })
      .expect(StatusCodes.OK);
  });

  it('Fail POST /create_ingredient passing invalid ingredient', async () => {
    const invalidIngredient = Helper.generateInventoryIngredient(false);

    await request(app)
      .post('/create_ingredient')
      .set('Accept', 'application/json')
      .send(invalidIngredient)
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('[IngredientController] Error inserting new ingredient');
      })
      .expect(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Successfully POST /delete_ingredient passing valid user_id and ingredient', async () => {
    const user_id = Helper.validTestUser.id;
    const validIngredient = Helper.generateInventoryIngredient();
    const ingredients = [validIngredient];

    await request(app)
      .post(`/delete_ingredient`)
      .set('Accept', 'application/json')
      .send({ user_id, ingredients })
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('Ingrediente excluído com sucesso');
      })
      .expect(StatusCodes.OK);
  });

  // it('Fail POST /delete_ingredient passing invalid user_id and ingredient', async () => {
  //   const user_id = Helper.invalidTestUser.id;
  //   const invalidIngredient = Helper.generateInventoryIngredient(false);
  //   const ingredients = [invalidIngredient];

  //   await request(app)
  //     .post(`/delete_ingredient`)
  //     .set('Accept', 'application/json')
  //     .send({ user_id, ingredients })
  //     .expect('Content-Type', /json/)
  //     .expect((res: request.Response) => { // use console.log(res.text); to debug
  //       expect(res.body.msg).toBe('[IngredientController.delete] Error deleting ingredient');
  //     })
  //     .expect(StatusCodes.INTERNAL_SERVER_ERROR);
  // });

  it('Successfully POST /consult_calories passing valid ingredient', async () => {
    const validIngredient = Helper.generateInventoryIngredient();
    const ingredients = [validIngredient];

    await request(app)
      .post('/consult_calories')
      .set('Accept', 'application/json')
      .send({ ingredients })
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('Lista de calorias gerada pelo chat GPT');
        expect(res.body.calories).not.toBe(undefined);
      })
      .expect(StatusCodes.OK);
  });
});
