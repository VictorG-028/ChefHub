alter table "public"."Recipe" drop constraint "Recipe_user_id_fkey";

alter table "public"."Recipe" add constraint "Recipe_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE not valid;

alter table "public"."Recipe" validate constraint "Recipe_user_id_fkey";


