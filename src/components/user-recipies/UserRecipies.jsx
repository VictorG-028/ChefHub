import Navbar from "../navbar/Navbar";
import classes from "./UserRecipies.module.css";

const UserRecipies = () => {
  return (
    <>
      <Navbar />
      <h1 className={classes.title}>Suas receitas</h1>
      <section className={classes.userRecipiesBody}>
        <div className={classes.userRecipiesCard}>
          <h2>Brownie de chocolate</h2>
          <p>Ingredientes</p>
          <ul>
            <li>2 xícaras de achocolatado em pó</li>
            <li>1 xícara de farinha de trigo</li>
            <li>1 xícara de açúcar</li>
            <li>200 gramas de manteiga</li>
            <li>4 ovos</li>
          </ul>
          <a href="">Ler mais...</a>
        </div>

        <div className={classes.userRecipiesCard}>
          <h2>Pipoca doce</h2>
          <p>Ingredientes</p>
          <ul>
            <li>4 colheres de sopa de milho para pipoca</li>
            <li>4 colheres de sopa de açúcar</li>
            <li>4 colheres de sopa de água</li>
            <li>3 colheres de sopa de óleo</li>
          </ul>
          <a href="">Ler mais...</a>
        </div>
      </section>
    </>
  );
};

export default UserRecipies;
