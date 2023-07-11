import { Request, Response } from 'express';
import { ingredients_table, users_table } from '../fakeDB';
import { Ingredient } from '../beans/Ingredient';


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
    const names = ingredients.map((ingredient) => ingredient.name)
    var template_prompt = `
    Você é uma calculadora de caloria de qualquer ingrediente. Para realizar suas tarefas, preencha os campos abaixo:\n
    Exemplo\n
    - Nome_do_ingrediente <Quantidade opicional de ingrediente> {{preencha aqui}}\n
    - Macarrão 100g, 371 calorias;\n
    \n
    Ingredientes:\n`;

    names.forEach((name) => {
      template_prompt += "- " + name + "\n"
    })

    template_prompt += "Ingredientes com caloria: \n - "

    // Faz requisição ao chat GPT para receber a caloria

    return res.status(200).json({ msg: 'TODO: não implementado ainda' });
  }
}
