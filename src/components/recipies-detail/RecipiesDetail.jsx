import classes from "./RecipiesDetail.module.css";
import { useState, useEffect } from "react";
import backend from "../../services/backend";
import Navbar from "../navbar/Navbar";
import { useGlobalContext } from "../../providers";

const RecipiesDetail = () => {
  const { recipeId } = useGlobalContext();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    // Fetch 1 recipe data from the backend
    backend.get(`/get_recipe/${recipeId}`)
      .then((response) => {
        console.log(response);
        setRecipe(response.data.compactedRecipeData);
      })
      .catch((error) => {
        console.error("Error fetching shared recipes:", error);
      });
  }, [recipeId]);

  return (
    <>
      <Navbar />
      <div className={classes.recipeContainer}>
        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />
        <span className={classes.recipeText}>
          <p>{recipe.description}</p>
          <em>
            <p>Por {recipe.created_by}</p>
          </em>
          {recipe.instructions && (
            <div>
              <h2>Modo de preparo</h2>
              <ol>
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
          <h2>Ingredientes</h2>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.unit_measure} de {ingredient.name}
                </li>
              ))}
          </ul>
        </span>
      </div>
    </>
  );
};

export default RecipiesDetail;



/*

{
 "msg": "New recipe created!",
 "recipe_id": 6,
 "title": "Macarrão doce com Leite",
 "ingredients": [
  {
   "recipe_id": 6,
   "name": "Açúcar",
   "quantity": "50",
   "unit_measure": "gramas"
  },
  {
   "recipe_id": 6,
   "name": "Leite",
   "quantity": "2",
   "unit_measure": "Litros"
  },
  {
   "recipe_id": 6,
   "name": "Macarrão Parafuso",
   "quantity": "500",
   "unit_measure": "gramas"
  },
  {
   "recipe_id": 6,
   "name": "Canela em pó",
   "quantity": "a gosto",
   "unit_measure": ""
  }
 ],
 "instructions": [
  "Em uma panela, adicione o leite e o açúcar e deixe ferver em fogo médio.",
  "Adicione o macarrão parafuso e cozinhe até ficar al dente, mexendo de vez em quando.",
  "Escorra o macarrão e reserve um pouco do leite.",
  "Sirva o macarrão doce em pratos individuais, regue com um pouco do leite reservado e polvilhe canela em pó por cima.",
  "Sirva quente e aproveite!"
 ]
}




*/
