
export default interface Recipe {
  id: number | undefined;
  user_id: string | undefined; // UUID // Cada Recipe pertence a um usuário
  title: string;
  // ingredients: Ingredient[];
  instructions: string;
  // img_path: string = "./generated_images/not_found.png";
  // is_shared: boolean = false;
}

// export class Recipe {
//   id: number;
//   user_id: string; // UUID // Cada Recipe pertence a um usuário
//   title: string;
//   // ingredients: Ingredient[];
//   instructions: string;
//   // img_path: string = "./generated_images/not_found.png";
//   // is_shared: boolean = false;

//   constructor(id: number, user_id: string, title: string, instructions: string) {
//     this.id = id;
//     this.user_id = user_id;
//     this.title = title;
//     // this.ingredients = ingredients;
//     this.instructions = instructions;
//   }
// }
