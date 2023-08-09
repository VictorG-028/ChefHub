import { Request, Response } from 'express';
import PromptCreator from '../utils/promptCreator';
import Consume_GPT_API from '../utils/consume_GPT_API';
import supabase from '../database';
import Ingredient from '../beans/Ingredient';
import InventoryIngredient from '../beans/InventoryIngredient';

// [Start of] Requests body types

interface CreateReqBody {
  user_id: string,
  name: string,
  quantity: string,
  unit_measure: string
}

interface DeleteReqBody {
  user_id: string,
  ingredients: InventoryIngredient[]
}

interface GetCalorieReqBody {
  ingredients: Ingredient[]
}

// [End of] Requests body types
// [Start of] Response body types
// empty
// [End of] Response body types

export default class IngredientController {

  async getAll(req: Request, res: Response) {
    const shouldGetUserId: string = req.params.shouldGetUserId;

    let selectColums = 'name, quantity, unit_measure';
    if (shouldGetUserId && shouldGetUserId.toLocaleLowerCase() == 'true') {
      selectColums = 'user_id, name, quantity, unit_measure';
    }

    const { data: allInvIngredients, error } = await supabase
      .from('InventoryIngredient')
      .select(selectColums);

    if (error) {
      const msg = "[IngredientController] Error selecting all InventoryIngredient";
      return res.status(500).json({ msg });
    }

    return res.status(200).json({ msg: "Successfully  returned all Invetory Ingredients", allInvIngredients });
  }

  async create(req: Request, res: Response) {
    const { user_id, name, quantity, unit_measure }: CreateReqBody = req.body;

    // // Verificar se o usuário existe
    // const user = users_table.find((user) => user.id === user_id);
    // if (!user) {
    //   return res.status(404).json({ msg: 'Usuário não encontrado' });
    // }
    if (!user_id) {
      return res.status(404).json({ msg: 'user_id inválido' });
    }

    const { error } = await supabase
      .from('InventoryIngredient')
      .insert({ user_id, name, quantity, unit_measure });
    if (error) {
      const msg = "[IngredientController] Error inserting new ingredient";
      return res.status(500).json({ msg });
    }

    res.status(200).json({ msg: 'New ingredient created!' });
  }

  async delete(req: Request, res: Response) {
    // const { user_id, name, quantity, unit_measure } = req.body;
    const { user_id, ingredients }: DeleteReqBody = req.body;

    // Verificar se o usuário existe
    // const user = users_table.find((user) => user.id === user_id);
    // if (!user) {
    //   return res.status(404).json({ msg: 'Usuário não encontrado' });
    // }

    // Verificar se o ingrediente existe
    // const ingredientIndex = ingredients_table.findIndex((ingredient) => ingredient.hash() === ingredient.hash());
    // if (ingredientIndex === -1) {
    //   return res.status(404).json({ msg: 'Ingrediente não encontrado' });
    // }

    // Verificar se o usuário é o dono do ingrediente
    // const ingredient = ingredients_table[ingredientIndex];
    // if (ingredient.user_id !== user_id) {
    //   return res.status(401).json({ msg: 'Usuário não autorizado' });
    // }

    // Remover o ingrediente da tabela
    const { error } = await supabase
      .from('InventoryIngredient')
      .delete()
      .eq("user_id", user_id)
      .in("name", ingredients.map((i) => { return i.name }))
      .in("quantity", ingredients.map((i) => { return i.quantity }))
      .in("unit_measure", ingredients.map((i) => { return i.unit_measure }));
    // .eq("name", name)
    // .eq("quantity", quantity)
    // .eq("unit_measure", unit_measure);
    if (error) {
      const msg = "[IngredientController] Error deleting ingredient";
      res.status(500).json(msg);
    }

    return res.status(200).json({ msg: 'Ingrediente excluído com sucesso' });
  }

  async consultCalorie(req: Request, res: Response) {
    const { ingredients }: GetCalorieReqBody = req.body;

    const prompt = PromptCreator.createCaloriesPrompt(ingredients);

    const response = await Consume_GPT_API.get_GPT_response(prompt, 0);
    if (response.includes("error")) {
      const msg = "[IngredientController.get_calorie] Error in chatGPT completion";
      return res.status(500).json({ msg, calories: [] });
    }
    const lines = response.split('\n').map((linha) => linha.trim());

    return res.status(200).json({
      msg: 'Lista de calorias gerada pelo chat GPT',
      calories: lines,
    });
  }
}
