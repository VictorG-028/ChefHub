import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import backend from "../../services/backend";
import classes from "./UserRecipies.module.css";
import { useGlobalContext } from "../../providers";

const UserRecipies = () => {
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
      <section className={classes.userRecipiesBody}>
        {recipes.map((recipe, index) => (
          <div key={index} className={classes.userRecipiesCard}>
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
            <p>{recipe.instructions}</p>
            {/* You can replace the following link with the appropriate route */}
            <Link
              to={`/recipe-detail`}>Ler mais...
              onClick={() => updateRecipe(recipe.id)}
            </Link>
          </div>
        ))}
      </section>
    </>
  );

};

export default UserRecipies;
