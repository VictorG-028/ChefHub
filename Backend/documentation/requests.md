# 📔 API Documentation

:information_source: Usefull Info:
- Pode ajudar a entender as rotas :point_right: [Video enviado na entrega do backend](https://www.youtube.com/watch?v=zdY9avCcq_c) 
- Click on the little arrow next to each route name to expand the route details.
- [How to use insomnia doc](https://github.com/VictorG-028/ChefHub-Backend/blob/main/documentation/insomnia_guide.md)
- UUID is string type
- { ... }[] -> array of objects

### Como usar esse arquivo para escrever o código

Usando o axios ou flutter https module é possível fazer uma requisição POST ou GET.

Nas requisições POST é necessário passar um body em formato JSON com os campos de input listados nesse arquivo.
Cada requisição usa tem uma rota do backend. Requisição é sinônimo de Rota.

Exemplo prático na requisição de criar usuário:

- **Route:** `POST /register_user`
Observando a informação da rota, é preciso fazer um POST localhost.com/register_user

- **JSON input:**
```json
{
  "email": "string",
  "password": "string"
}
```
Observando inputs, é preciso enviar no body algo assim. 
Os nomes email e password são obrigatórios e se tiverem um erro de digitação, vai gerar variáveis undefined e, consequentemente, um erro no backend.
```javascript
const body = {email: "string email aqui", password: "string password aqui"}
```

- **JSON output:**
```json
{
  "msg": "string",
  "id": "string"
}
```
Observando output, é preciso acessar o objeto de resposta mais ou menos assim:
```javascript
const raw_response = await create_user(...);
const response = json.parse(raw_response);

// Acessando propriedade como se fosse uma instância de uma classe
const msg = response.msg;
const id = response.id;
// Acessando propriedade como se fosse uma dicionário em python
const msg = response["msg"];
const id = response["id"];
```

---

## 👥 User Routes

```typescript
interface User {
  id: string | undefined; // UUID
  email: string;
  password: string;
}
```

<details>
<summary>Get All Users</summary>

Returns a list of all registered users.

- **Route:** `GET /all_users`
- **JSON input:** No input. GET requests don't expect a body.
- **JSON output:**
```json
{
  "msg": "string",
  "user_data": "User[]"
}
```
</details>

<details>
<summary>Register User</summary>

Registers a new user in the system.

- **Route:** `POST /register_user`
- **JSON input:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **JSON output:**
```json
{
  "msg": "string",
  "id": "string"
}
```

</details>

<details>
<summary>Login User</summary>

Logs in an existing user.

- **Route:** `POST /login_user`
- **JSON input:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **JSON output:**
```json
{
  "msg": "string",
  "id": "string"
}
```

</details>

</details>

## 🧂 Ingredient Routes

```typescript
interface Ingredient {
  id: number | undefined,
  user_id: string | undefined,
  name: string,
  quantity: string,
  unit_measure: string,
}
interface InventoryIngredient extends Ingredient { }
interface RecipeIngredient extends Ingredient { }
```

<details>
<summary>Create Ingredient</summary>

Creates a new ingredient in the user account.

- **Route:** `POST /create_ingredient`
- **JSON input:**
```json
{
  "user_id": "string", 
  "name": "string", 
  "quantity": "string", 
  "unit_measure": "string" 
}
```
- **JSON output:**
```json
{ 
  "msg": "string" 
}
```

</details>

<details>
<summary>Delete Ingredient</summary>

Deletes an existing ingredient from the system. Input JSON object don't need to have ingredient_id field.

- **Route:** `POST /delete_ingredient`
- **JSON input:**
```json
{
  "user_id": "string", 
  "ingredients": "InventoryIngredient[]", // Only need ingredient name, quantity and unit_measure
}
```
- **JSON output:**
```json
{ 
  "msg": "string" 
}
```

</details>

<details>
<summary>Consult Calories</summary>

Retrieves the calorie information for an ingredient.

- **Route:** `POST /consult_calories`
- **JSON input:**
```json
{
  "ingredients": "Ingredient[]"
}
```
- **JSON output:**
```json
{ 
  "msg": "string",
  "colories": "string[]"
}
```

</details>

## 📜 Recipe Routes

```typescript
interface Recipe {
  id: number | undefined;
  user_id: string | undefined; // UUID // Each Recipe belongs to an User
  title: string;
  instructions: string;
}
interface SharedRecipe {
  user_id: string; // UUID // Each SharedRecipe belongs to an User
  recipe_id: number; // Each SharedRecipe should access data of a Recipe
  description: string; // Optional, can be empty string
  img_link: string;
}
interface SharedRecipeData {
  title: string;
  created_by: string;
  description: string;
  image: string;
}
```

<details>
<summary>Get Shared Recipes</summary>

Retrieves a list of all shared recipes.

- **Route:** `GET /get_shared_recipes`
- **JSON input:** No input. GET requests don't expect a body.
- **JSON output:**
```json
{ 
  "msg": "string",
  "sharedRecipesData": "SharedRecipesData[]"
}
```
</details>

<details>
<summary>Create Recipe</summary>

Creates a new recipe in the system.

- **Route:** `POST /create_recipe`
- **JSON input:**
```json
{
  "ingredients": "Ingredient[]"
}
```
- **JSON output:**
```json
{ 
  "msg": "string",
  "recipe_id": "number",
  "title": "string",
  "ingredients": "RecipeIngredient[]",
  "ingredients": "string[]"
}
```

</details>

<details>
<summary>Share Recipe</summary>

Shares a recipe with other users.

- **Route:** `POST /share_recipe`
- **JSON input:**
```json
{
  "user_id": "string", 
  "recipe_id": "number", 
  "description": "string"
}
```
- **JSON output:**
```json
{ 
  "msg": "string"
}
```

</details>

<details>
<summary>Check Ingredients Difference</summary>

Computes the difference in ingredients between a recipe and the actual inventory.

- **Route:** `POST /check_ingredients_difference`
- **JSON input:**
```json
{
  "user_id": "string", 
  "recipe_id": "number"
}
```
- **JSON output:**
```json
{ 
  "msg": "string",
  "missingIngredients": "{name: string, balance: number, unit_measure: string}[]",
  "remainIngredients": "{name: string, balance: number, unit_measure: string}[]",
  "zeroedIngredientes": "{name: string, balance: number, unit_measure: string}[]"
}
```

</details>
