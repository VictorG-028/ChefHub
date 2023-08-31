import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import backend from "../../services/backend";
import Navbar from "../navbar/Navbar";
import classes from "./Ingredients.module.css";
import { useGlobalContext } from "../../providers";

const Ingredients = () => {
  const navigate = useNavigate();
  const { userId } = useGlobalContext();
  const [ingredients, setIngredients] = useState([]);
  const { selectedIngredients, updateIngredients } = useGlobalContext();
  const checkboxRefs = useRef([]);
  console.log(ingredients);
  console.log(selectedIngredients);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");

  // Fetch user ingredients data from the backend
  const fetchIngredients = () => {
    // console.log("userId-> " + userId);
    backend.get(`/get_user_ingredients/${userId}`)
      .then((response) => {
        console.log(response);
        setIngredients(response.data.userInvIngredients);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
      });
  };

  useEffect(() => {
    fetchIngredients()
  }, [userId]);

  const deleteIngredients = async () => {
    const ingredientsToDelete = selectedIngredients.map((i) => {
      const [name, quantity, unitMeasure] = i.split(",");
      return {
        name: name,
        quantity: quantity,
        unit_measure: unitMeasure,
      }
    });
    await backend.post('/delete_ingredient', {
      user_id: userId,
      ingredients: ingredientsToDelete
    });
    updateIngredients([]);
    fetchIngredients(); // Refresh ingredients
  };

  const uncheckAllIngredients = () => {
    checkboxRefs.current.forEach((checkbox) => {
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  };

  const openModal = () => {
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleRequest = async () => {
    await backend.post('/create_ingredient', {
      user_id: userId,
      name: name,
      quantity: quantity,
      unit_measure: unitMeasure,
    });
    setShowModal(false);
    fetchIngredients(); // Refresh ingredients
  };

  return (
    <>
      <Navbar />
      <h1 className={classes.title}>Escolha os ingredientes</h1>
      <section className={classes.ingredientsBody}>
        {ingredients.map((ingredient, index) => (
          <label className={classes.checkboxFilter} key={index}>
            {ingredient.name}{" "}{ingredient.quantity}{" "}{ingredient.unit_measure}{" "}
            <input
              ref={(element) => (checkboxRefs.current[index] = element)}
              type="checkbox"
              value={ingredient.name + "," + ingredient.quantity + "," + ingredient.unit_measure}
              id={ingredient.name}
              name="ingredientFilter"
              onChange={(e) => {
                const value = e.target.value;
                console.log("Checkbox checked log:", e.target.checked);

                updateIngredients((prevIngredients) =>
                  e.target.checked
                    ? [...prevIngredients, value]
                    : prevIngredients.filter((ingredient) => ingredient !== value)
                );
              }}
            />
          </label>
        ))}
      </section>
      <section className={classes.footer}>
        <div className={classes.ingredientsButtons}>
          <button
            type="button"
            className={classes.deleteButton}
            onClick={deleteIngredients}
          >
            Deletar selecionados
          </button>
          <button
            type="reset"
            className={classes.cleanSelectionButton}
            onClick={() => {
              updateIngredients([]); // Clear the selectedIngredients array
              uncheckAllIngredients(); // Reset the checked values of checkboxes
            }}>
            Limpar selecionados
          </button>
          <button
            type="button"
            onClick={openModal} // mexe aqui
            className={classes.addIngredientButton}
          >
            Adicionar ingrediente
          </button>
          <Link to={"/preferences"} className={classes.nextButton}>
            Próxima etapa
          </Link>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className={classes.modalOverlay}>
          <div className={classes.modalContent}>
            <h2>Adicionar Ingrediente</h2>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Quantidade"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Unidade de Medida"
              value={unitMeasure}
              onChange={(e) => setUnitMeasure(e.target.value)}
            />
            <button onClick={handleRequest}>Adicionar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Ingredients;
