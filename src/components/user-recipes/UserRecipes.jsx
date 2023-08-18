import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import backend from "../../services/backend";
import classes from "./UserRecipes.module.css";
import { useGlobalContext } from "../../providers";

const UserRecipes = () => {
  const { userId, updateRecipe } = useGlobalContext();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // console.log("userId-> " + userId);
    // Fetch shared recipes data from the backend
    backend.get(`/get_user_recipes/${userId}`)
      .then((response) => {
        console.log(response);
        setRecipes(response.data.userRecipesData);
      })
      .catch((error) => {
        console.error("Error fetching shared recipes:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1 className={classes.title}>Suas receitas</h1>
      <section className={classes.userRecipeBody}>
        {recipes.map((recipe, index) => (
          <div key={index} className={classes.userRecipeCard}>
            <h2>{recipe.title}</h2>
            <p>Ingredientes</p>
            <ul>
              {recipe.ingredients.map((ingredient, ingredientIndex) => (
                <li key={ingredientIndex}>
                  {ingredient.quantity} {ingredient.unit_measure} de {ingredient.name}
                </li>
              ))}
            </ul>
            <p>Modo de preparo</p>
            <p>{
              recipe.instructions
                .split("@")
                .slice(0, 2)
                .map((step, index) => (
                  <span key={index}>{step}<br /></span>
                ))
            }</p>
            {/* You can replace the following link with the appropriate route */}
            <Link
              to={`/recipe-detail`}
              onClick={() => updateRecipe(recipe.id)}
            >
              Ler mais...
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default UserRecipes;
