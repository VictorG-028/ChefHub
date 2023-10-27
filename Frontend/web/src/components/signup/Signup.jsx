import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backend from "../../services/backend";
import { useGlobalContext } from "../../providers";

import classes from "./Signup.module.css";
import background from "../../assets/backgroundlogin.png";
import background2 from "../../assets/backgroundlogin2.png";
import logo from "../../assets/ChefHubIcon.png";

const Signup = () => {
  const navigate = useNavigate();
  const { updateUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(email);
  // console.log(password);

  const createUser = async () => {
    try {
      const response = await backend.post("/register_user", {
        email: email,
        password: password,
      });

      console.log(`${response}`);

      // Check if id is valid
      if (response.data.id === "00000000-0000-0000-0000-000000000000") {
        console.log("Erro no servidor ou email/senha incorreta");
        return;
      }

      updateUser(response.data.id);

      // If the ID is not NIL, navigate to /home
      navigate("/home");
    } catch (error) {
      // Handle error here
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <div className={classes.navbar}>
        <Link to={"/home"}>
          <span className={classes.logo}>
            <img src={logo} />
            <h1 className={classes.titleLogo}>ChefHub</h1>
          </span>
        </Link>
      </div>
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
          type="button"
          className={classes.signupButton}
          onClick={createUser}
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
