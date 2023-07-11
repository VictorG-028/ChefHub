import express, { Request, Response } from 'express';
import UserController from './controllers/UserController';
import IngredientController from './controllers/IngredientController';
import RecipeController from './controllers/RecipeController';


const userController = new UserController();
const ingredientController = new IngredientController();
const recipeController = new RecipeController();

const routes = express.Router();


routes.get('/', (req: Request, res: Response) => {
  const PORT = process.env.PORT || 3000;
  res.status(200).json({ msg: 'Express + TypeScript ChefHub Server', port: PORT });
});

routes.post('/register_user', userController.register);
routes.post('/login_user', userController.login);

routes.post('/create_ingredient', ingredientController.create); // TODO
routes.post('/delete_ingredient', ingredientController.delete);
routes.post('/consult_calories', ingredientController.get_calorie); // TODO

routes.get('/get_shared_recipes', recipeController.get_all_shared_recipes);
routes.post('/create_recipe', recipeController.create);
routes.post('/share_recipe', recipeController.share);
routes.post('/check_ingredients_difference', recipeController.computeIngredientsDifenteToActualInventory);

export { routes };
