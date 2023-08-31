import { app, USE_TEST_ENV, PORT } from '../src/server';
import database from '../src/database';
import http from 'http';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';
import User from '../src/beans/User';
import InventoryIngredient from '../src/beans/InventoryIngredient';
import RecipeController from '../src/controllers/RecipeController';
import { Request, Response } from 'express';

const recipeController = new RecipeController();

export default class Helper {

  // Mono-instance
  public static appInstance: typeof app;
  public static databaseInstance: typeof database;

  public static validTestUser: User = {
    email: "test@test.com",
    id: uuidv4(),
    password: "test"
  };
  public static invalidTestUser: User = {
    email: "test@test.com", // Repeated email makes it invalid
    id: NIL_UUID,
    password: "test"
  };

  public static async getApp(): Promise<typeof app> {
    if (this.appInstance) {
      return this.appInstance;
    }

    this.appInstance = app;
    return this.appInstance;
  }

  public static async getServer(port: string | number): Promise<http.Server> {

    const server = app.listen(port, () => {
      console.log(`Test suite open a listener on port ${port}`)
    })

    return server;
  }

  public static async getDatabase(): Promise<typeof database> {
    if (this.databaseInstance) {
      return this.databaseInstance;
    }

    this.databaseInstance = database;
    return this.databaseInstance;
  }

  public static async databaseDeleteValidUser(): Promise<void> {
    const database = await Helper.getDatabase();
    const { error } = await database
      .from('User')
      .delete()
      .eq('email', this.validTestUser.email);
    if (error) {
      console.log("Deleting test created user has failed! Maybe a test has failed, maybe the deletion failed.");
    }
  }

  public static async databaseInsertValidUser(): Promise<void> {
    const database = await Helper.getDatabase();
    const { error } = await database
      .from('User')
      .insert({
        id: this.validTestUser.id,
        email: this.validTestUser.email,
        password: this.validTestUser.password,
      });
    if (error) {
      console.log("Creting test user has failed! Maybe a test has failed, maybe the insertion failed.");
    }
  }

  public static async databaseInsertValidIngredient(): Promise<void> {
    const database = await Helper.getDatabase();
    const validIngredient = this.generateInventoryIngredient();

    const { error } = await database
      .from('InventoryIngredient')
      .insert({
        user_id: validIngredient.user_id as string,
        name: validIngredient.name,
        quantity: validIngredient.quantity,
        unit_measure: validIngredient.unit_measure,
      });
    if (error) {
      console.log("Creting inventory ingredient has failed! Maybe a test has failed, maybe the insertion failed.");
    }
  }

  public static generateInventoryIngredient(isValid: boolean = true): InventoryIngredient {

    const exampleIngredients = [
      { name: "açucar", quantity: "50", unit_measure: "g" },
      { name: "chocolate", quantity: "20", unit_measure: "g" },
      { name: "água", quantity: "1", unit_measure: "copo" },
      { name: "chocolate em pó", quantity: "2", unit_measure: "kg" },
      { name: "leite", quantity: "2", unit_measure: "L" }
    ];

    const randomIndex = Math.floor(Math.random() * exampleIngredients.length);
    const randomIngredient = exampleIngredients[randomIndex];

    return {
      user_id: isValid ? this.validTestUser.id : NIL_UUID,
      id: undefined,
      name: randomIngredient.name,
      quantity: randomIngredient.quantity,
      unit_measure: randomIngredient.unit_measure,
    };
  }

  public static generateIngredientExamples(howManyExamples: number = 1): InventoryIngredient[] {

    const exampleIngredients = [
      { name: "açucar", quantity: "50", unit_measure: "g" },
      { name: "chocolate", quantity: "20", unit_measure: "g" },
      { name: "água", quantity: "1", unit_measure: "copo" },
      { name: "chocolate em pó", quantity: "2", unit_measure: "kg" },
      { name: "leite", quantity: "2", unit_measure: "L" }
    ] as InventoryIngredient[];

    for (let i = 5; i < howManyExamples; i++) {
      const randomIndex = Math.floor(Math.random() * exampleIngredients.length);
      exampleIngredients.push(exampleIngredients[randomIndex]);
    }

    return exampleIngredients.slice(0, howManyExamples);
  }

  public static generatePreference(isValid: boolean = true): string {

    const examplePreferences = [
      "Gosta de comida japonesa",
      "Gosta de comida chinesa",
      "Gosta de comida indiana",
      "Gosta de comida mexicana",
      "Gosta de comida apimentada",
      "Gosta de comida doce",
      "Gosta de comida salgada",
    ];

    const randomIndex = Math.floor(Math.random() * examplePreferences.length);
    const randomPreference = examplePreferences[randomIndex];

    return randomPreference;
  }

  public static async databaseGenerateRecipe(): Promise<void> {

    const database = this.getDatabase();
    const validIngredient = this.generateInventoryIngredient();
    const preference = this.generatePreference();

    const body = {
      user_id: this.validTestUser.id,
      ingredients: [validIngredient],
      preferences: [preference],
    }

    const req: Request = { body } as Request;
    const res: Response = {} as Response; // This line is broken

    await recipeController.create(req, res);
    // const response = await recipeController.create(req, res);
    // const resBody = response.json();
    // if (response.status == StatusCodes.OK) {
    //   console.log("OK");
    // }

    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
    // console.log(response);
    // console.log(response.json());
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
  }
}
