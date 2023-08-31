import { useState } from "react";
import api from "../../services/api";
import Navbar from "../navbar/Navbar";
import classes from "./Preferences.module.css";
import trash from "../../assets/trash.svg";

const Preferences = () => {
  const [preference, setPreference] = useState("");
  const [addPrefInput, setAddPrefInput] = useState(false);

  const addPreference = () => {
    setAddPrefInput(true);
  };

  const closeInput = () => {
    setAddPrefInput(false);
  };

  const deleteIngredient = () => { };

  let array = [];
  let selectedPreferences = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  for (let i = 0; i < selectedPreferences.length; i++) {
    array.push(selectedPreferences[i].value);
  }
  console.log(array);

  const clearIngredients = () => {
    for (let i = 0; i < selectedPreferences.length; i++) {
      selectedPreferences[i].checked = false;
    }
    array.length = 0;
    console.log(array);
  };

  const handleSubmit = async () => {
    await api.post("/create_recipe", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(array),
    });
  };

  return (
    <>
      <Navbar />
      <h1 className={classes.title}>Escolha suas preferências culinárias</h1>
      <section className={classes.preferenceBody}>
        <label className={classes.checkboxFilter}>
          Japonesa
          <input
            type="checkbox"
            value="Japonesa"
            id="Japonesa"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Chinesa
          <input
            type="checkbox"
            value="Chinesa"
            id="Chinesa"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Italiana
          <input
            type="checkbox"
            value="Italiana"
            id="Italiana"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>

        <label className={classes.checkboxFilter}>
          Brasileira
          <input
            type="checkbox"
            value="Brasileira"
            id="Brasileira"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Tailandesa
          <input
            type="checkbox"
            value="Tailandesa"
            id="Tailandesa"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Indiana
          <input
            type="checkbox"
            value="Indiana"
            id="Indiana"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Mexicana
          <input
            type="checkbox"
            value="Mexicana"
            id="Mexicana"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Grega
          <input
            type="checkbox"
            value="Grega"
            id="Grega"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Francesa
          <input
            type="checkbox"
            value="Francesa"
            id="Francesa"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>

        <label className={classes.checkboxFilter}>
          Argentina
          <input
            type="checkbox"
            value="Argentina"
            id="Argentina"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Portuguesa
          <input
            type="checkbox"
            value="Portuguesa"
            id="Portuguesa"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
        <label className={classes.checkboxFilter}>
          Espanhola
          <input
            type="checkbox"
            value="Espanhola"
            id="Espanhola"
            name="preference"
            onChange={(e) => setPreference(e.target.value)}
          />
          <button className={classes.trashIconBtn} onClick={deleteIngredient}>
            <img src={trash} className={classes.trashIcon} />
          </button>
        </label>
      </section>
      <section className={classes.footer}>
        {addPrefInput ? (
          <span className={classes.addPrefInput}>
            <input type="text" placeholder="Digite a preferência desejada" />
            <button onClick={closeInput} className={classes.closeButton}>
              X
            </button>
            <button type="button" className={classes.addButton}>
              Adicionar
            </button>
          </span>
        ) : (
          ""
        )}
        <div className={classes.preferencesButtons}>
          <button
            type="button"
            className={classes.deleteButton}
            onClick={clearIngredients}
          >
            Limpar selecionados
          </button>
          <button
            type="button"
            onClick={addPreference}
            className={classes.addPrefButton}
          >
            Adicionar preferência
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={classes.nextButton}
          >
            Próxima etapa
          </button>
        </div>
      </section>
    </>
  );
};

export default Preferences;
