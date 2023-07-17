import express, { Request, Response } from 'express';
import UserController from './controllers/UserController';
import IngredientController from './controllers/IngredientController';
import RecipeController from './controllers/RecipeController';
// import { generateImagesLinks } from 'bimg';
import { generateImagesLinks } from './utils/bimg/imagen';


const userController = new UserController();
const ingredientController = new IngredientController();
const recipeController = new RecipeController();

const routes = express.Router();

// Só pra testar que tá funcionando
routes.get('/', async (req: Request, res: Response) => {
  const PORT = process.env.PORT || 3000;
  const links = await generateImagesLinks("car");
  res.status(200).json({ msg: 'Express + TypeScript ChefHub Server', port: PORT, links });
});

// userController
routes.post('/register_user', userController.register);
routes.post('/login_user', userController.login);

// ingredientController
routes.post('/create_ingredient', ingredientController.create);
routes.post('/delete_ingredient', ingredientController.delete);
routes.post('/consult_calories', ingredientController.get_calorie);

// recipeController
routes.get('/get_shared_recipes', recipeController.get_all_shared_recipes);
routes.post('/create_recipe', recipeController.create);
routes.post('/share_recipe', recipeController.share);
routes.post('/check_ingredients_difference', recipeController.computeIngredientsDifenteToActualInventory);

export { routes };