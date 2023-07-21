create policy "Enable read access for all users"
on "public"."InventoryIngredient"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable read access for all users"
on "public"."Recipe"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable read access for all users"
on "public"."RecipeIngredient"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable read access for all users"
on "public"."SharedRecipe"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable read access for all users"
on "public"."User"
as permissive
for all
to public
using (true)
with check (true);



