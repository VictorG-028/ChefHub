import Ingredient from "./Ingredient";

// export class InventoryIngredient extends Ingredient { }
export default interface InventoryIngredient extends Ingredient {
  user_id: string | undefined,
}
