import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import api from "../../services/api";

import classes from "./Signup.module.css";
import background from "../../assets/backgroundlogin.png";
import background2 from "../../assets/backgroundlogin2.png";

const Signup = () => {

  const CreateUser = async () => {
    await api.post("/register_user")
    .then((resp) => {
      console.log(resp.data);
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(password);

  return (
    <>
      <Navbar />
      <h1 className={classes.title}>Criar conta</h1>
      <div className={classes.signupBody}>
        <form className={classes.formContainer}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </form>
        <button
          className={classes.signupButton}
          onClick={CreateUser}
        >
          Criar conta
        </button>
        <p className={classes.linkToLogin}>
          Já tem uma conta?{" "}
          <Link to={"/login"}>
            <em>Faça login!</em>
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

export default Signup;
