import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

import classes from "./Login.module.css";
import background from "../../assets/backgroundlogin.png";
import background2 from "../../assets/backgroundlogin2.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email)
  console.log(password)

  return (
    <>
      <Navbar />
      <h1 className={classes.title}>Login</h1>
      <div className={classes.loginBody}>
        <form className={classes.formContainer}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <button
          type="submit"
          className={classes.loginButton}
        >
          Login
        </button>
        <p className={classes.linkToSignup}>
          Não tem uma conta?{" "}
          <Link to={"/signup"}>
            <em>Cadastre-se!</em>
          </Link>
        </p>
        <span className={classes.background}>
          <img src={background2} />
          <img src={background} />
        </span>
      </div>
    </>
  );
};

export default Login;
