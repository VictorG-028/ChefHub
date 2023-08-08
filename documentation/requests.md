# 📔 API Documentation

:information_source: Usefull Info:
- Click on the little arrow next to each route name to expand the route details.
- **./documentation/Insomnia_Request_without_env_var.json** file can be loaded into Insomnia to manualy test each route.
- UUID is string type
- { ... }[] -> array of objects

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
