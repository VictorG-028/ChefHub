import { Request, Response } from 'express';
import { ingredients_table, users_table } from '../fakeDB';
import { Ingredient } from '../beans/Ingredient';
import PromptCreator from '../utils/promptCreator';
import Consume_GPT_API from '../utils/consume_GPT_API';


export default class IngredientController {

  async create(req: Request, res: Response) {
    const { user_id, name, quantity, unit_measure } = req.body;

    // Verificar se o usuário existe
    const user = users_table.find((user) => user.id === user_id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Cria novo ingrediente
    ingredients_table.push(new Ingredient(user_id, name, quantity, unit_measure));

    res.status(200).json({ msg: 'New ingredient created!' });
  }

  async delete(req: Request, res: Response) {
    const { user_id, name, quantity, unit_measure } = req.body;

    // Verificar se o usuário existe
    const user = users_table.find((user) => user.id === user_id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Verificar se o ingrediente existe
    const ingredientIndex = ingredients_table.findIndex((ingredient) => ingredient.hash() === ingredient.hash());
    if (ingredientIndex === -1) {
      return res.status(404).json({ msg: 'Ingrediente não encontrado' });
    }

    // Verificar se o usuário é o dono do ingrediente
    const ingredient = ingredients_table[ingredientIndex];
    if (ingredient.user_id !== user_id) {
      return res.status(401).json({ msg: 'Usuário não autorizado' });
    }

    // Remover o ingrediente da tabela
    ingredients_table.splice(ingredientIndex, 1);

    return res.status(200).json({ msg: 'Ingrediente excluído com sucesso' });
  }

  async get_calorie(req: Request, res: Response) {
    const ingredients: Ingredient[] = req.body.ingredients;

    const prompt = PromptCreator.createCaloriesPrompt(ingredients);

    const response = await Consume_GPT_API.get_GPT_response(prompt);
    const lines = response.split('\n').map((linha) => linha.trim());

    return res.status(200).json({ calories: lines, msg: 'Lista de calorias gerada pelo chat GPT' });
  }
}
