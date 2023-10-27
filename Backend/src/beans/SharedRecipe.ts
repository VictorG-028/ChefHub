export default interface SharedRecipe {
  user_id: string; // UUID // Cada SharedRecipe pertence a um User
  recipe_id: number; // Cada SharedRecipe possui dados duma Recipe
  description: string;
  img_link: string;
}

// export class SharedRecipe {
//   user_id: string; // UUID // Cada SharedRecipe pertence a um User
//   recipe_id: number; // Cada SharedRecipe possui dados duma Recipe
//   description: string;
//   img_link: string = "./generated_images/not_found.png";

//   constructor(user_id: string, recipe_id: number, description: string, img_link: string) {
//     this.user_id = user_id;
//     this.recipe_id = recipe_id;
//     this.description = description;
//     this.img_link = img_link;
//   }
// }
