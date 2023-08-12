import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import classes from "./Ingredients.module.css";
import api from "../../services/api";

const Ingredients = () => {
  const getData = async () => {
   await api.get("/get_shared_recipes")
    .then((resp) => {
      console.log(resp.data);
    });
  };

  useEffect(() => {
    void getData();
  }, []);

  const [ingredients, setIngredient] = useState([""]);
  console.log(ingredients);

  const clearIngredients = () => {
    setIngredient([""]);
  };

  return (
    <>
      <Navbar />
      <h1 className={classes.title}>Escolha os ingredientes</h1>
      <section className={classes.ingredientsBody}>
        <label className={classes.checkboxFilter}>
          Ovo
          <input
            type="checkbox"
            value="Ovo"
            id="Ovo"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Farinha
          <input
            type="checkbox"
            value="Farinha"
            id="Farinha"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Tomate
          <input
            type="checkbox"
            value="Tomate"
            id="Tomate"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>

        <label className={classes.checkboxFilter}>
          Milho
          <input
            type="checkbox"
            value="Milho"
            id="Milho"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Frango
          <input
            type="checkbox"
            value="Frango"
            id="Frango"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Acelga
          <input
            type="checkbox"
            value="Acelga"
            id="Acelga"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Peixe
          <input
            type="checkbox"
            value="Peixe"
            id="Peixe"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Cebola
          <input
            type="checkbox"
            value="Cebola"
            id="Cebola"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Calabresa
          <input
            type="checkbox"
            value="Calabresa"
            id="Calabresa"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>

        <label className={classes.checkboxFilter}>
          Cenoura
          <input
            type="checkbox"
            value="Cenoura"
            id="Cenoura"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Espinafre
          <input
            type="checkbox"
            value="Espinafre"
            id="Espinafre"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label className={classes.checkboxFilter}>
          Berinjela
          <input
            type="checkbox"
            value="Berinjela"
            id="Berinjela"
            name="categoryfilter"
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
      </section>
      <section className={classes.footer}>
        <div className={classes.ingredientsButtons}>
          <button
            type="reset"
            className={classes.deleteButton}
            onClick={clearIngredients}
          >
            Limpar selecionados
          </button>
          <button type="button" className={classes.addIngredientButton}>
            Adicionar ingrediente
          </button>
          <button type="button" className={classes.nextButton}>
            Próxima etapa
          </button>
        </div>
      </section>
    </>
  );
};

export default Ingredients;
