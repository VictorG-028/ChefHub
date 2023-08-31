import request from 'supertest';
import express from 'express';
import Helper from '../Helper';
import { StatusCodes } from 'http-status-codes';
import http from 'http';

describe('Integration Tests of User Routes', () => {
  let app: express.Application;
  let server: http.Server;
  let createRecipeRes: undefined | {
    msg: string, recipe_id: number, title: string, ingrediets: {
      recipe_id: number;
      name: string;
      quantity: string;
      unit_measure: string;
    }[], instructions: string[]
  } = undefined;
  const port: number = 4002;

  beforeAll(async () => {
    app = await Helper.getApp();
    server = await Helper.getServer(port);
    await Helper.databaseInsertValidUser();
    await Helper.databaseInsertValidIngredient();
    // await Helper.databaseGenerateRecipe(); // Broken
  });
  afterAll(async () => {
    server.close(); // Close open handles
    await Helper.databaseDeleteValidUser();
  });

  it('Successfully GET /get_shared_recipes', async () => {
    await request(app)
      .get('/get_shared_recipes')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK);
  });

  it('Successfully GET /get_user_recipes/:user_id', async () => {
    const id = Helper.validTestUser.id;
    await request(app)
      .get(`/get_user_recipes/${id}`)
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK);
  });

  it('Successfully POST /create_recipe passing valid body', async () => {
    const validIngredient = Helper.generateInventoryIngredient();
    const preference = Helper.generatePreference();

    const body = {
      user_id: Helper.validTestUser.id,
      ingredients: [validIngredient],
      preferences: [preference],
    };

    const res = await request(app)
      .post('/create_recipe')
      .set('Accept', 'application/json')
      .send(body)

    // Wait for 40 seconds
    await new Promise(resolve => setTimeout(resolve, 40000));

    // console.log(res.headers);
    // "{
    //   'x-powered-by': 'Express',
    //   'access-control-allow-origin': '*',
    //   'content-type': 'application/json; charset=utf-8',
    //   'content-length': '70',
    //   etag: 'W/"46-YGz+E4a4J0Di60fmp0mn6+E+d8w"',
    //   date: 'Thu, 31 Aug 2023 03:01:58 GMT',
    //   connection: 'close'
    // }"

    expect(res.type).toBe('application/json');
    // expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body).not.toBeUndefined();
    expect(res.body.msg).toBe('New recipe created!');
    expect(res.body.recipe_id).not.toBe(undefined);
    expect(res.body.title).not.toBe(undefined);
    expect(res.body.ingredients).not.toBe(undefined);
    expect(res.body.instructions).not.toBe(undefined);
    expect(res.statusCode).toBe(StatusCodes.OK);

    createRecipeRes = res.body;
  }, 120000);

  it('/get_recipe/:id', async () => {
    const id = createRecipeRes ? createRecipeRes.recipe_id : "a";
    expect(id).not.toBe("a");

    await request(app)
      .get(`/get_recipe/${id}`)
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK);
  });

  it('Successfully POST /share_recipe passing valid body', async () => {
    const user_id = Helper.validTestUser.id;
    const recipe_id = createRecipeRes ? createRecipeRes.recipe_id : undefined;
    const description = "lore ipsun";

    const body = {
      user_id,
      recipe_id,
      description,
    };

    await request(app)
      .post('/share_recipe')
      .set('Accept', 'application/json')
      .send(body)
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('Receita compartilhada!');
      })
      .expect(StatusCodes.OK);
  }, 120000);

  it('Successfully POST /check_ingredients_difference passing valid body', async () => {
    const user_id = Helper.validTestUser.id;
    const recipe_id = createRecipeRes ? createRecipeRes.recipe_id : undefined;

    const body = {
      user_id,
      recipe_id,
    };

    await request(app)
      .post(`/check_ingredients_difference`)
      .set('Accept', 'application/json')
      .send(body)
      .expect('Content-Type', /json/)
      .expect((res: request.Response) => { // use console.log(res.text); to debug
        expect(res.body.msg).toBe('Difference computed!');
        expect(res.body.missingIngredients).not.toBe(undefined);
        expect(res.body.remainIngredients).not.toBe(undefined);
        expect(res.body.zeroedIngredientes).not.toBe(undefined);
      })
      .expect(StatusCodes.OK);
  });
});
