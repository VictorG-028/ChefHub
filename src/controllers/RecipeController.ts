import { Request, Response } from 'express';
// import { generateImageFiles, generateImagesLinks } from "bimg";
import { generateImagesLinks } from '../utils/bimg/imagen';
import JSON5 from 'json5'
import PromptCreator from '../utils/promptCreator';
import supabase from '../database';
import Consume_GPT_API from '../utils/consume_GPT_API';
import { parseToCompare } from '../utils/strOperations';
import InventoryIngredient from '../beans/InventoryIngredient';
import RecipeIngredient from '../beans/RecipeIngredient';

// [Start of] Requests body types

interface CreateRecipeReqBody {
  user_id: string,
  ingredients: InventoryIngredient[],
  preferences: string[]
}

interface ShareRecipeReqBody {
  user_id: string,
  recipe_id: number,
  description: string
}

interface ComputeDifferenceReqBody {
  user_id: string,
  recipe_id: number
}

// [End of] Requests body types
// [Start of] Response body types

// Remember and decide: This interface might go to beans
interface SharedRecipeData {
  title: string;
  created_by: string;
  description: string;
  image: string;
}
interface SharedRecipeResBody extends SharedRecipeData { }

// [End of] Response body types


interface GPT_IngredientResBody {
  // id?: number
  // user_id?: string,
  nome: string;
  quantidade: string;
  unidade_de_medida: string;
}

interface GPT_RecipeResBody {
  error?: string;
  // id?: number,
  // user_id?: string,
  nome: string;
  componentes: GPT_IngredientResBody[];
  passos: string[];
}

//////////////////////////////////////////


export default class RecipeController {

  async getAllSharedRecipes(req: Request, res: Response) {

    // Selecting shared recipes
    const { data: allSharedRecipes, error: selectSRError } = await supabase
      .from('SharedRecipe')
      .select('*');
    if (selectSRError) {
      const msg = "[RecipeController.getAllSharedRecipes] Error selecting shared recipes";
      return res.status(500)
        .json({ msg, sharedRecipesData: [] });
    }

    const allRecipeIds = allSharedRecipes.map((sr) => sr.recipe_id);
    const allUserIds = allSharedRecipes.map((sr) => sr.user_id);

    // Selecting Recipes data
    const { data: recipesData, error: selectRError } = await supabase
      .from('Recipe')
      .select(`title`)
      .in('id', allRecipeIds);
    if (!recipesData || selectRError) {
      // console.log(allSharedRecipes);
      console.log(selectRError);
      const msg = "[RecipeController.getAllSharedRecipes] Error selecting recipe data";
      return res.status(500).json({ msg, sharedRecipesData: [] });
    }

    // Selecting users data
    const { data: usersData, error: selectUError } = await supabase
      .from('User')
      .select(`email`)
      .in('id', allUserIds);
    if (!usersData || selectUError) {
      const msg = "[RecipeController.getAllSharedRecipes] Error selecting user data";
      return res.status(500).json({ msg, sharedRecipesData: [] });
    }

    // zip as informações em um único array
    const sharedRecipesData: SharedRecipeResBody[] = allSharedRecipes.map((sr, i) => {
      return {
        title: recipesData[i].title,
        created_by: usersData[i].email,
        description: sr.description,
        image: sr.img_link
      };
    });

    return res.status(200)
      .json({
        msg: 'SharedRecipe data collected successfuly!',
        sharedRecipesData
      });
  }

  async create(req: Request, res: Response) {
    const { user_id, ingredients, preferences }: CreateRecipeReqBody = req.body;

    const temperature = 1;
    const messages = PromptCreator.createRecipePrompt(ingredients, preferences);
    const raw_response = await Consume_GPT_API.get_GPT_response(messages, temperature);
    // console.log(raw_response)
    // console.log("<-----------------------------");
    // console.log(JSON5.stringify(raw_response))
    // console.log("<-----------------------------");
    // console.log(JSON5.parse(raw_response))
    const response: GPT_RecipeResBody = JSON5.parse(raw_response);

    // console.log(response.nome);
    // console.log(response.componentes);
    // console.log(response.passos);
    // console.log("aqui <-----------------------------");
    if (response.error) {
      const msg = "error -> " + response.error;
      return res.status(500).json({ msg });
    }

    // Extrai o título, os ingredientes e as instruções do texto response

    // Extraí título
    const title = response["nome"];

    // Filtra as instruções
    const instructions: string[] = response["passos"];
    const instructionsAsStr: string = response["passos"].join("@");

    // Armazena receita no banco de dados
    const { data, error: errorRInsert } = await supabase
      .from('Recipe')
      .upsert(
        { user_id, title, instructions: instructionsAsStr },
        { count: "exact" })
      .select();
    if (errorRInsert) {
      const msg = "[RecipeController.create] Error inserting new recipe";
      return res.status(500)
        .json({ msg, id: -1 });
    }
    const recipe_id = data[0].id;

    // Filtra os ingredientes
    const recipeIngredients = response.componentes.map((ingredient) => {
      return {
        recipe_id,
        name: ingredient.nome,
        quantity: ingredient.quantidade,
        unit_measure: ingredient.unidade_de_medida,
      };
    });

    // Armazena ingredientes da receita no banco de dados
    const { error: errorIInsert } = await supabase
      .from('RecipeIngredient')
      .insert(
        recipeIngredients,
        { count: "exact" });
    if (errorIInsert) {
      const msg = "[RecipeController.create] Error inserting recipe ingredients";
      return res.status(500)
        .json({ msg, id: -1 });
    }

    return res.status(200).json({
      msg: 'New recipe created!',
      recipe_id,
      title,
      ingredients: recipeIngredients,
      instructions
    });
  }

  async share(req: Request, res: Response) {
    const { user_id, recipe_id, description }: ShareRecipeReqBody = req.body;

    // Seleciona título da receita para usar no prompt da imagem
    const { data: recipeData, error: selectError } = await supabase
      .from('Recipe')
      .select(`title`)
      .eq('id', recipe_id);
    if (selectError) {
      const msg = "[RecipeController.share] Error selecting recipe title";
      return res.status(500).json(msg);
    }

    // Gera uma imagem para a receita
    const prompt = PromptCreator.createShareRecipePrompt(recipeData[0].title);
    const imageLinks = await generateImagesLinks(prompt);
    // const imageFiles = await generateImageFiles(prompt);

    // Insere na tabela a receita compartilhada
    const { error: insertError } = await supabase
      .from('SharedRecipe')
      .insert({ user_id, recipe_id, description, img_link: imageLinks[0] });
    if (insertError) {
      const msg = "[RecipeController.share] Error inserting shared recipe";
      return res.status(500).json(msg);
    }

    return res.status(200).json({ msg: 'Receita compartilhada!' });
  }

  async computeIngredientsDifferenceToActualInventory(req: Request, res: Response) {
    const { user_id, recipe_id }: ComputeDifferenceReqBody = req.body;

    // Carrega os ingredientes do iventário do usuário
    const { data: inventoryIngredients, error: selectIIError } = await supabase
      .from('InventoryIngredient')
      .select('name, quantity, unit_measure')
      .eq('user_id', user_id);
    if (selectIIError) {
      const msg = "[RecipeController.compute...Inventory] Error selecting all columns from Recipe table";
      return res.status(500).json({ msg });
    }

    // Carrega os ingredientes da receita
    const { data: recipeIngredients, error: selectRIError } = await supabase
      .from('RecipeIngredient')
      .select('name, quantity, unit_measure')
      .eq('recipe_id', recipe_id);
    if (selectRIError) {
      const msg = "[RecipeController.compute...Inventory] Error selecting all columns from Recipe table";
      return res.status(500).json({ msg });
    }

    // Verificar se o usuário é o dono da receita
    // if (user_id == recipe.user_id) {
    //   return res.status(401).json({ msg: 'Usuário não autorizado' });
    // }

    const remainIngredients = [];
    const missingIngredients = [];
    const zeroedIngredientes = [];
    console.log(recipeIngredients);
    console.log(inventoryIngredients);
    for (const recipeIngredient of recipeIngredients) {
      console.log(recipeIngredient);
      // Pass ingredients that doesn't have a defined quantity
      if (parseToCompare(recipeIngredient.quantity) === "a gosto"
        || !recipeIngredient.quantity.length) {
        continue
      }

      // Inner loop
      const foundIngredient = inventoryIngredients.find(
        (invIngredient) =>
          parseToCompare(invIngredient.name) === parseToCompare(recipeIngredient.name) &&
          parseToCompare(invIngredient.unit_measure) === parseToCompare(recipeIngredient.unit_measure)
      );

      // Push the ingredient to one of 3 arrays

      if (!foundIngredient) {
        missingIngredients.push({
          name: recipeIngredient.name,
          balance: Number.parseFloat(recipeIngredient.quantity),
          unit_measure: recipeIngredient.unit_measure
        });
        continue
      }

      const recipeQuantity = Number.parseFloat(recipeIngredient.quantity)
      const inventoryQuantity = Number.parseFloat(foundIngredient.quantity)

      if (inventoryQuantity > recipeQuantity) {
        // Sobra ingrediente
        remainIngredients.push({
          name: recipeIngredient.name,
          balance: inventoryQuantity - recipeQuantity,
          unit_measure: recipeIngredient.unit_measure
        });
      } else if (inventoryQuantity < recipeQuantity) {
        // Falta ingrediente
        missingIngredients.push({
          name: recipeIngredient.name,
          balance: inventoryQuantity - recipeQuantity,
          unit_measure: recipeIngredient.unit_measure
        });
      } else {
        // Zera a quantidade do ingrediente
        zeroedIngredientes.push({
          name: recipeIngredient.name,
          balance: inventoryQuantity - recipeQuantity,
          unit_measure: recipeIngredient.unit_measure
        });
      }
    }

    return res.status(200).json({
      msg: "Difference computed!",
      missingIngredients,
      remainIngredients,
      zeroedIngredientes
    });
  }
}
