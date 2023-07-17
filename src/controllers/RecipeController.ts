import { Request, Response } from 'express';
import { ingredients_table, recipes_table, shared_recipes_table, users_table } from '../fakeDB';
// import { generateImageFiles, generateImagesLinks } from "bimg";
import { generateImagesLinks } from '../utils/bimg/imagen';
import { Recipe } from '../beans/Recipe';
import { SharedRecipe } from '../beans/SharedRecipe';
import { Ingredient } from '../beans/Ingredient';
import PromptCreator from '../utils/promptCreator';
import Consume_GPT_API from '../utils/consume_GPT_API';

interface shared_recipe_data {
  title: string;
  created_by: string;
  description: string;
  image: string;
}

export default class RecipeController {

  async get_all_shared_recipes(req: Request, res: Response) {
    var shared_recipes_data: shared_recipe_data[] = [];

    shared_recipes_table.forEach((shared_recipe) => {

      const recipe_data = recipes_table.find((recipe) => recipe.id == shared_recipe.recipe_id)
      if (!recipe_data) {
        return res.status(500).json({ msg: "Error desconhecido" })
      }

      const user_data = users_table.find((user) => user.id == shared_recipe.user_id)
      if (!user_data) {
        return res.status(500).json({ msg: "Error desconhecido" })
      }

      shared_recipes_data.push({
        title: recipe_data.title,
        created_by: user_data.email,
        description: shared_recipe.description,
        image: shared_recipe.img_link
      });
    });

    return res.status(200).json({ shared_recipes: shared_recipes_data })
  }

  async create(req: Request, res: Response) {
    const { user_id, ingredients, preferences } = req.body;

    const prompt = PromptCreator.createRecipePrompt(ingredients, preferences);
    const response = await Consume_GPT_API.get_GPT_response(prompt);

    // Extrai o título, os ingredientes e as instruções do texto response

    // Separa em linhas e título
    const lines = response.split('\n').map((linha) => linha.trim());
    const title = lines[0].substring(17);

    // Filtra os ingredientes
    const start_i = lines.indexOf('Ingredientes:') + 1;
    const ingredientsAsString: string[] = [];
    for (let i = start_i; lines[i].at(0) == '-' && i < lines.length; i++) {
      ingredientsAsString.push(lines[i]);
    }

    // Separa os ingredientes em (nome, quantidade e unidade de medida)
    const recipeIngredients: Ingredient[] = [];
    const regex = /(.+)\[(\d+(?:\.\d+)?)\s*([^\]]+)?\]/;
    ingredientsAsString.forEach((ingredient) => {
      const something = ingredient.match(regex);
      if (something) {
        const name = something[1].trim();
        const quantity = something[2] ? something[2].trim() : ''; //parseFloat(something[2]);
        const unit_measure = something[3] ? something[3].trim() : '';

        recipeIngredients.push(
          new Ingredient(user_id, name, quantity, unit_measure)
        );
      } else {
        console.log(`Ingrediente ${ingredient} veio no formato errado`);
      }
    });

    // Filtra as instruções
    const start_j = lines.indexOf('Instruções:') + 1;
    const instructions: string[] = [];
    const isNumeric = (text: any) => { return !isNaN(text) };
    for (let j = start_j; isNumeric(lines[j].at(0)) && j < lines.length; j++) {
      instructions.push(lines[j]);
    }

    recipes_table.push(
      new Recipe(recipes_table.length, user_id, title, recipeIngredients, instructions)
    );

    res.status(200).json({
      title,
      ingredientes: recipeIngredients,
      instructions,
      msg: 'New recipe created!'
    });
  }

  async share(req: Request, res: Response) {
    const { user_id, recipe_id, description } = req.body;

    const recipe = recipes_table[recipe_id];

    const prompt = PromptCreator.createShareRecipePrompt(recipe.title);
    const imageLinks = await generateImagesLinks(prompt);
    // const imageFiles = await generateImageFiles(prompt);

    shared_recipes_table.push(new SharedRecipe(user_id, recipe_id, description, imageLinks[0]));

    return res.status(200).json({ msg: 'Receita compartilhada!' });
  }

  async computeIngredientsDifenteToActualInventory(req: Request, res: Response) {
    const { user_id, recipe_id } = req.body;

    const recipe = recipes_table.find((recipe) => recipe.id == recipe_id);
    if (!recipe) {
      return res.status(404).json({ msg: "Receita inexistente" })
    }

    // Verificar se o usuário é o dono da receita
    if (user_id == recipe.user_id) {
      return res.status(401).json({ msg: 'Usuário não autorizado' });
    }

    const user_inventory = ingredients_table.filter((i) => i.user_id == user_id);
    const recipe_needs = recipe.ingredients;

    var remain_ingredients = [];
    var missing_ingredients = [];
    var zeroed_ingredientes = [];
    // const ingredients_types = {
    //   "remain": [],
    //   "missing": [],
    //   "zeroed": [],
    // }
    for (const recipe_ingredient of recipe_needs) {
      const foundIngredient = user_inventory.find(
        (inventory_ingredient) =>
          inventory_ingredient.name === recipe_ingredient.name &&
          inventory_ingredient.unit_measure === recipe_ingredient.unit_measure
      );
      if (!foundIngredient) continue // search;

      const recipe_quantity = Number.parseFloat(recipe_ingredient.quantity)
      const inventory_quantity = Number.parseFloat(foundIngredient.quantity)

      if (inventory_quantity > recipe_quantity) {
        // Sobra ingrediente
        remain_ingredients.push({ name: recipe_ingredient.name, balance: inventory_quantity - recipe_quantity });
      } else if (inventory_quantity < recipe_quantity) {
        // Falta ingrediente
        missing_ingredients.push({ name: recipe_ingredient.name, balance: inventory_quantity - recipe_quantity });
      } else {
        // Zera a quantidade do ingrediente
        zeroed_ingredientes.push({ name: recipe_ingredient.name, balance: inventory_quantity - recipe_quantity });
      }
    }

    return res.status(200).json({ missing_ingredients, remain_ingredients, zeroed_ingredientes });
  }
}
