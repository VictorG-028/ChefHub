import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../../providers";
import backend from "../../services/backend";
import logo from "../../assets/ChefHubIcon.png";
import chef from "../../assets/chef.png";
import classes from "./Loading.module.css";

const Loading = () => {
  const navigate = useNavigate();
  const { userId, selectedIngredients, selectedPreferences } = useGlobalContext();

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const handleSubmit = async () => {
    // // Simulate a 20-second delay using setTimeout
    // setTimeout(async () => {
    //   await backend.post('/create_recipe', {
    //     user_id: userId,
    //     ingredients: selectedIngredients,
    //     preferences: selectedPreferences,
    //   });

    //   navigate("/user-recipes");
    // }, 20000); // 20 seconds in milliseconds

    const parsedIngredients = selectedIngredients.map((ingredient) => {
      const [name, quantity, unitMeasure] = ingredient.split(',')
      return {
        name,
        quantity,
        unitMeasure
      }
    })
    console.log(parsedIngredients);
    backend.post('/create_recipe', {
      user_id: userId,
      ingredients: parsedIngredients,
      preferences: selectedPreferences,
    });

    await sleep(5000); // Wait for 5 seconds

    navigate("/user-recipes");
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className={classes.loadingContainer}>
      <img src={chef} alt="Loading Icon" className={classes.loadingIcon} />
    </div>
  );
}

export default Loading;
