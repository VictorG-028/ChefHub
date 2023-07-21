export default interface Ingredient {
  id: number | undefined,
  user_id: string | undefined,
  name: string,
  quantity: string,
  unit_measure: string,
}


// export class Ingredient {
//   id: number;
//   user_id: string; // UUID  // Cada Ingredient pertence a um usuário
//   name: string;
//   quantity: string;
//   unit_measure: string;

//   constructor(id: number, user_id: string, name: string, quantity: string, unit_measure: string) {
//     this.id = id;
//     this.user_id = user_id;
//     this.name = name;
//     this.quantity = quantity;
//     this.unit_measure = unit_measure;
//   }

//   static fromString(rawIngredients: string): Ingredient[] {
//     // TODO
//     return [];
//   }

//   /** Cria um ID provavelmente único da instância do Ingredient
//    * Esse hash tende a colidir no MAX_SAFE_INTEGER quando string_to_hash é muito longo.
//    */
//   hash(): number {
//     var hash_value = 0;
//     const string_to_hash = this.name + this.quantity + this.unit_measure

//     for (var i = 0; i < string_to_hash.length; i++) {
//       const unicode = string_to_hash.charCodeAt(i);
//       hash_value += unicode;

//       if (hash_value > Number.MAX_SAFE_INTEGER) {
//         const msg = `[WARNING] Hash value atingiu valor máximo name \n
//                      name -> ${this.name} \n
//                      quantity -> ${this.quantity} \n
//                      unit_measure -> ${this.unit_measure}`;
//         console.log(msg);
//         hash_value = Number.MAX_SAFE_INTEGER;
//       }
//     }

//     return hash_value
//   }
// }
