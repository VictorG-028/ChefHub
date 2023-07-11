export class SharedRecipe {
  user_id: string; // Cada SharedRecipe pertence a um User
  recipe_id: number; // Cada SharedRecipe possui dados duma Recipe
  description: string;
  img_path: string = "./generated_images/not_found.png";

  constructor(user_id: string, recipe_id: number, description: string) {
    this.user_id = user_id;
    this.recipe_id = recipe_id;
    this.description = description;
  }
}
