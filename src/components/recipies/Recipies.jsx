import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backend from "../../services/backend";
import { useGlobalContext } from "../../providers";

import classes from "./Recipies.module.css";

const Recipies = () => {
  const { updateRecipe } = useGlobalContext();
  const [sharedRecipes, setSharedRecipes] = useState([]);

  useEffect(() => {
    // Fetch shared recipes data from the backend
    backend.get("/get_shared_recipes")
      .then((response) => {
        console.log(response);
        setSharedRecipes(response.data.sharedRecipesData);
      })
      .catch((error) => {
        console.error("Error fetching shared recipes:", error);
      });
  }, []);

  return (
    <section className={classes.homeBody}>
      {sharedRecipes.map((recipe, index) => (
        <Link
          key={index}
          to={"/recipies-detail"}
          onClick={() => updateRecipe(recipe.id)}
          className={classes.recipeCard}
        >
          <div className={classes.recipeContainer}>
            <span className={classes.recipeImg}>
              <img src={recipe.image} alt={recipe.title} />
            </span>
            <span className={classes.recipeText}>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <em>
                <p>Por {recipe.created_by}</p>
              </em>
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Recipies;
