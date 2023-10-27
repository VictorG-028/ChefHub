import express, { Request, Response } from 'express';
import UserController from './controllers/UserController';
import IngredientController from './controllers/InventoryIngredientController';
import RecipeController from './controllers/RecipeController';
// import { generateImagesLinks } from 'bimg';
import { generateImagesLinks } from './utils/bimg/imagen';
import { abbreviate } from './utils/strOperations';


const userController = new UserController();
const ingredientController = new IngredientController();
const recipeController = new RecipeController();

const routes = express.Router();

// Só pra testar que tá funcionando
routes.get('/', async (req: Request, res: Response) => {
  const PORT = process.env.PORT || 3000;
  const result = abbreviate("min latas");
  res.status(200).json({ msg: 'Express + TypeScript ChefHub Server', port: PORT, result });
});
routes.get('/gen/:shouldGenerateFlag', async (req: Request, res: Response) => {
  const PORT = process.env.PORT || 3000;
  const shouldGenerateFlag: string = req.params.shouldGenerateFlag;
  let links = ["write 'true' in the path to generate links"];
  if (shouldGenerateFlag.toLowerCase() === 'true') {
    console.log("Generating images with Bing, please wait...");
    links = await generateImagesLinks("bolo de cenoura");
  }

  res.status(200).json({ msg: 'Express + TypeScript ChefHub Server', port: PORT, links });
});

// userController
routes.get('/all_users', userController.getAll);
routes.post('/register_user', userController.register);
routes.post('/login_user', userController.login);

// ingredientController
routes.get('/all_ingredients/:shouldGetUserId?', ingredientController.getAll);
routes.get('/get_user_ingredients/:user_id?', ingredientController.getUserIngredients);
routes.post('/create_ingredient', ingredientController.create);
routes.post('/delete_ingredient', ingredientController.delete);
routes.post('/consult_calories', ingredientController.consultCalorie);

// recipeController
routes.get('/get_shared_recipes', recipeController.getAllSharedRecipes);
routes.get('/get_user_recipes/:user_id', recipeController.getAllUserRecipes);
routes.get('/get_recipe/:id', recipeController.getRecipe);
routes.post('/create_recipe', recipeController.create);
routes.post('/share_recipe', recipeController.share);
routes.post('/check_ingredients_difference', recipeController.computeIngredientsDifferenceToActualInventory);

export { routes };
