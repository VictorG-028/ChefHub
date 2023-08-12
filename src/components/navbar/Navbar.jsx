import { Link } from "react-router-dom";

import logo from "../../assets/ChefHubIcon.png";
import classes from "./Navbar.module.css";

const Navbar = () => {

  return (
    <div className={classes.navbar}>
        <ul className={classes.menu}>
          <Link to={'/'}><li>Home</li></Link>
          <Link to={'/user-recipies'}><li>Suas receitas</li></Link>
          <Link to={'/ingredients'}><li>Ingredientes</li></Link>
        </ul>
      <Link to={"/"}>
        <span className={classes.logo}>
          <img src={logo} />
          <h1 className={classes.title}>ChefHub</h1>
        </span>
      </Link>
      <input
        type="text"
        placeholder="Buscar receitas"
        className={classes.searchInput}
      />
    </div>
  );
};

export default Navbar;
