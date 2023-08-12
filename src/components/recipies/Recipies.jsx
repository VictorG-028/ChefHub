import { Link } from "react-router-dom";

import classes from "./Recipies.module.css";
import img1 from "../../assets/canjiquinha.png";
import img2 from "../../assets/Creme-de-Fuba.png";
import img3 from "../../assets/Caldo-grao-de-bico.png";

const Recipies = () => {
  return (
    <section className={classes.homeBody}>
      <Link to={"/recipies-detail"} className={classes.recipeCard}>
        <div className={classes.recipeContainer}>
          <span className={classes.recipeImg}>
            <img src={img1} />
          </span>
          <span className={classes.recipeText}>
            <h2>Canjiquinha com costela</h2>
            <p>
              Canjiquinha com costela é uma receita fácil de ser feita e que
              pode render muito. Aprenda dica para saborizar outros preparos com
              os ossos que sobram!
            </p>
            <em>
              <p>Por Roselma Soares</p>
            </em>
          </span>
        </div>
      </Link>

      <div className={classes.recipeContainer}>
        <span className={classes.recipeImg}>
          <img src={img2} />
        </span>
        <span className={classes.recipeText}>
          <h2>Creme de Fubá</h2>
          <p>
            Aprenda como fazer creme de fubá com frango da Ana Maria Braga.
            Receita rápida de fazer combina com a Festa Junina e com os dias
            frios do inverno
          </p>
          <em>
            <p>Por Ana Maria Braga</p>
          </em>
        </span>
      </div>

      <div className={classes.recipeContainer}>
        <span className={classes.recipeImg}>
          <img src={img3} />
        </span>
        <span className={classes.recipeText}>
          <h2>Caldo de grão-de-bico com camarão e macarrão de abóbora</h2>
          <p className={classes.recipeDescription}>
            Receita nutritiva de caldo de grão-de-bico com camarão e macarrão de
            abóbora cremoso tem preparo fácil e dá energia; veja como fazer o
            prato do 'É de Casa'
          </p>
          <em>
            <p>Por Ana Maria Braga</p>
          </em>
        </span>
      </div>
    </section>
  );
};

export default Recipies;
