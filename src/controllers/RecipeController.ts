import { Request, Response } from 'express';
import { ingredients_table, recipes_table, shared_recipes_table, users_table } from '../fakeDB';
import { Recipe } from '../beans/Recipe';
import { SharedRecipe } from '../beans/SharedRecipe';

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
        image: "TODO: não implementado"
      })
    });

    return res.status(200).json({ shared_recipes: shared_recipes_data })
  }

  async create(req: Request, res: Response) {
    const { user_id, ingredients, preferences } = req.body;

    var template_prompt = `Você é um chef de cozinha renomado que fornece receitas que qualquer pessoa conseguiria fazer. Seu trabalho é levar em consideração os ingredientes e preferências do cliente e gerar uma receita bem detalhada composta de nome, ingredientes e instrução. Você pode acrescentar ou não utilizar ingredientes do cliente. Não acrescente comentários antes e depois da receita.\n
    \n
    Considere lista de ingredientes = ["abacate", "tomate", "queijo ralado"]\n
    O cliente não gosta de guaca mole, gosta de comida japonesa.\n
    \n
    Nome da receita {{insira nome aqui}}\n
    \n
    Ingredientes:
    \n
    - {{Preencha os ingredientes aqui}}\n
    \n
    Intruções:\n
    \n
    1. {{Preencha instruções aqui}}`;
    // TODO: requisição para API do chat GPT
    var title = "";
    var instructions = [""]; // Faz um processamento do texto de resposta para extrair as instruções

    recipes_table.push(new Recipe(recipes_table.length, user_id, title, ingredients, instructions))

    res.status(200).json({ msg: 'TODO: não implementaod ainda | New ingredient created!' });
  }

  async share(req: Request, res: Response) {
    const { user_id, recipe_id, description } = req.body;

    shared_recipes_table.push(new SharedRecipe(user_id, recipe_id, description))

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
