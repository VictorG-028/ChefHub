alter table "public"."InventoryIngredient" drop constraint "InventoryIngredient_user_id_fkey";

alter table "public"."RecipeIngredient" drop constraint "RecipeIngredient_recipe_id_fkey";

alter table "public"."SharedRecipe" drop constraint "SharedRecipe_recipe_id_fkey";

alter table "public"."SharedRecipe" drop constraint "SharedRecipe_user_id_fkey";

alter table "public"."RecipeIngredient" alter column "recipe_id" set data type bigint using "recipe_id"::bigint;

alter table "public"."SharedRecipe" alter column "recipe_id" set data type bigint using "recipe_id"::bigint;

alter table "public"."InventoryIngredient" add constraint "InventoryIngredient_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE not valid;

alter table "public"."InventoryIngredient" validate constraint "InventoryIngredient_user_id_fkey";

alter table "public"."RecipeIngredient" add constraint "RecipeIngredient_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES "Recipe"(id) ON DELETE CASCADE not valid;

alter table "public"."RecipeIngredient" validate constraint "RecipeIngredient_recipe_id_fkey";

alter table "public"."SharedRecipe" add constraint "SharedRecipe_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES "Recipe"(id) ON DELETE CASCADE not valid;

alter table "public"."SharedRecipe" validate constraint "SharedRecipe_recipe_id_fkey";

alter table "public"."SharedRecipe" add constraint "SharedRecipe_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE not valid;

alter table "public"."SharedRecipe" validate constraint "SharedRecipe_user_id_fkey";


