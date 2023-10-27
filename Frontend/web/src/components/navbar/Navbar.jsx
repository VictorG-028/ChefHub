import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/ChefHubIcon.png";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  //   const searchInput = search.filter((search) =>
  //   search.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className={classes.navbar}>
      <ul className={classes.menu}>
        <Link to={"/home"}>
          <li>Home</li>
        </Link>
        <Link to={"/user-recipes"}>
          <li>Suas receitas</li>
        </Link>
        <Link to={"/ingredients"}>
          <li>Ingredientes</li>
        </Link>
      </ul>
      <Link to={"/home"}>
        <span className={classes.logo}>
          <img src={logo} />
          <h1 className={classes.title}>ChefHub</h1>
        </span>
      </Link>
      <input
        type="text"
        placeholder="Buscar receitas"
        className={classes.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Navbar;
