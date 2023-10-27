export default interface User {
  id: string | undefined; // UUID
  email: string;
  password: string;
}

// export class User {
//   id: string; // UUID
//   email: string;
//   password: string;

//   constructor(id: string, email: string, password: string) {
//     this.id = id;
//     this.email = email;
//     this.password = password;
//   }
// }
