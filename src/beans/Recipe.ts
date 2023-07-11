import { Ingredient } from "./Ingredient";

export class Recipe {
  id: number;
  user_id: number; // Cada Recipe pertence a um usuário
  title: string;
  ingredients: Ingredient[];
  instructions: string[];
  // img_path: string = "./generated_images/not_found.png";
  // is_shared: boolean = false;

  constructor(id: number, user_id: number, title: string, ingredients: Ingredient[], instructions: string[]) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}
