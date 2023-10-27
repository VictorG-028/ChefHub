import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../providers";
import backend from "../../services/backend";
import logoPNG from "../../assets/ChefHubIcon.png";
import chefPNG from "../../assets/chef.png";
import classes from "./Loading.module.css";

const Loading = () => {
  const navigate = useNavigate();
  const {
    userId, selectedIngredients, selectedPreferences,
    updateIngredients, updatePreferences
  } = useGlobalContext();

  useEffect(() => {
    async function createRecipe() {
      const parsedIngredients = selectedIngredients.map((ingredient) => {
        const [name, quantity, unitMeasure] = ingredient.split(',')
        return {
          name,
          quantity,
          unitMeasure
        }
      });
      // Reset previous chosen ingredients and preferences
      updateIngredients([]);
      updatePreferences([]);

      console.log(parsedIngredients);
      await backend.post('/create_recipe', {
        user_id: userId,
        ingredients: parsedIngredients,
        preferences: selectedPreferences,
      });
    };
    createRecipe();
    console.log("Requisitou para gerar receita");
    setTimeout(() => {
      navigate("/user-recipes");
    }, 10000); // Wait for 5 seconds
  }, []);

  return (
    <div className={classes.loadingContainer}>
      <img src={chefPNG} alt="Imagem de carregamento" className={classes.loadingIcon} />
    </div>
  );
}

export default Loading;
