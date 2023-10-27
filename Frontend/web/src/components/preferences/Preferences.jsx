import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import classes from "./Preferences.module.css";
import trash from "../../assets/trash.svg";
import { useGlobalContext } from "../../providers";

const Preferences = () => {
  const [showAddPreferenceModal, setShowAddPreferenceModal] = useState(false);
  const { selectedPreferences, updatePreferences } = useGlobalContext();

  const addPreference = (newPreference) => {
    updatePreferences([...selectedPreferences, newPreference]);
  };

  const clearIngredients = () => {
    const selectedPreferencesInput = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    for (let i = 0; i < selectedPreferencesInput.length; i++) {
      selectedPreferencesInput[i].checked = false;
    }
  };

  return (
    <>
      <Navbar />
      <h1 className={classes.title}>Escolha suas preferências culinárias</h1>
      <section className={classes.preferenceBody}>
        <label className={classes.checkboxFilter}>
          Salgado
          <input
            type="checkbox"
            value="Gosta de comida Salgada"
            id="Salgado"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Doce
          <input
            type="checkbox"
            value="Gosta de comida Doce"
            id="Doce"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Regra: Não ingredientes extras
          <input
            type="checkbox"
            value="O que o cliente pode fazer somente com os seus componente ? Não pode utilizar componente fora da lista do cliente. Os componente da receita devem ser exclusivamente os componente do usuário"
            id="Regra: Não ingredientes extras"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Regra: receita criativa
          <input
            type="checkbox"
            value="Não escreva uma receita de bolo. Escreva uma receita incomum."
            id="Regra: receita criativa"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Regra: receita simples
          <input
            type="checkbox"
            value="O cliente precisa de uma receita fácil de fazer."
            id="Regra: receita simples"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Regra: passo a passo mais detalhado
          <input
            type="checkbox"
            value="O cliente quer um passo a passo mais detalhado."
            id="Regra: passo a passo mais detalhado"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Japonesa
          <input
            type="checkbox"
            value="Gosta de comida Japonesa"
            id="Japonesa"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Chinesa
          <input
            type="checkbox"
            value="Gosta de comida Chinesa"
            id="Chinesa"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Italiana
          <input
            type="checkbox"
            value="Gosta de comida Italiana"
            id="Italiana"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>

        <label className={classes.checkboxFilter}>
          Brasileira
          <input
            type="checkbox"
            value="Gosta de comida Brasileira"
            id="Brasileira"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Tailandesa
          <input
            type="checkbox"
            value="Gosta de comida Tailandesa"
            id="Tailandesa"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Indiana
          <input
            type="checkbox"
            value="Gosta de comida Indiana"
            id="Indiana"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Mexicana
          <input
            type="checkbox"
            value="Gosta de comida Mexicana"
            id="Mexicana"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Grega
          <input
            type="checkbox"
            value="Gosta de comida Grega"
            id="Grega"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Francesa
          <input
            type="checkbox"
            value="Gosta de comida Francesa"
            id="Francesa"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>

        <label className={classes.checkboxFilter}>
          Argentina
          <input
            type="checkbox"
            value="Gosta de comida Argentina"
            id="Argentina"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Portuguesa
          <input
            type="checkbox"
            value="Gosta de comida Portuguesa"
            id="Portuguesa"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
        <label className={classes.checkboxFilter}>
          Espanhola
          <input
            type="checkbox"
            value="Gosta de comida Espanhola"
            id="Espanhola"
            name="preference"
            onChange={(e) => {
              e.target.checked && addPreference(e.target.value);
            }}
          />
          {/* <button className={classes.trashIconBtn} onClick={() => {}}>
            <img src={trash} className={classes.trashIcon} />
          </button> */}
        </label>
      </section>
      <section className={classes.footer}>
        {showAddPreferenceModal ? (
          <span className={classes.addPrefInput}>
            <input type="text" placeholder="Digite a preferência desejada" />
            <button onClick={() => { setShowAddPreferenceModal(false) }} className={classes.closeButton}>
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
          {/* <button
            type="button"
            onClick={addPreference}
            className={classes.addPrefButton}
          >
            Adicionar preferência
          </button> */}
          {/* <button
            type="button"
            onClick={handleSubmit}
            className={classes.nextButton}
          > */}
          <Link
            to={"/loading"}
            className={classes.nextButton}
          >
            Criar Receita
          </Link>
        </div>
      </section>
    </>
  );
};

export default Preferences;
