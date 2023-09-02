import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import backend from "../../services/backend";
import classes from "./UserRecipes.module.css";
import { useGlobalContext } from "../../providers";
import sharePNG from "../../assets/share.png";

const UserRecipes = () => {
  const { userId, updateRecipe } = useGlobalContext();
  const [recipes, setRecipes] = useState([]);
  const [shareModalState, setShareModalState] = useState({
    isOpen: false,
    selectedRecipeId: null,
    description: ""
  });


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

  const handleRequest = async () => {
    await backend.post('/share_recipe', {
      user_id: userId,
      recipe_id: shareModalState.selectedRecipeId,
      description: description,
    });
    setShareModalState({ ...shareModalState, isOpen: false });
  };

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
            <div className={classes.bottomClickables}>
              <Link
                to={`/recipe-detail`}
                onClick={() => updateRecipe(recipe.id)}
              >
                Ler mais...
              </Link>
              <button
                type="button"
                className={classes.shareButton}
                onClick={() => {
                  if (shareModalState.selectedRecipeId == recipe.id) {
                    setShareModalState({
                      ...shareModalState,
                      isOpen: true,
                      selectedRecipeId: recipe.id
                    });
                  } else {
                    setShareModalState({
                      ...shareModalState,
                      isOpen: true,
                      selectedRecipeId: recipe.id,
                      description: ""
                    });
                  }
                }}
              >
                <img src={sharePNG} alt="Compartilhar" />
              </button>
            </div>
          </div>
        ))}
      </section >

      {shareModalState.isOpen && (
        <div className={classes.shareModalOverlay}>
          <div className={classes.shareModalContent}>
            <h2>Compartilhar Receita</h2>
            <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => {
                setShareModalState({
                  ...shareModalState,
                  description: e.target.value
                });
              }}
            />
            <button onClick={handleRequest}>Compartilhar</button>
            <button onClick={() => {
              setShareModalState({ ...shareModalState, isOpen: false });
            }}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRecipes;
