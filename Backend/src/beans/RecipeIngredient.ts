import Ingredient from "./Ingredient";

// export class RecipeIngredient extends Ingredient { }
export default interface RecipeIngredient extends Ingredient {
  recipe_id: number | undefined,
}
