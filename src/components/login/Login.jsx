import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backend from "../../services/backend";
import { useGlobalContext } from "../../providers";

import classes from "./Login.module.css";
import logo from "../../assets/ChefHubIcon.png";
import background from "../../assets/backgroundlogin.png";
import background2 from "../../assets/backgroundlogin2.png";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(email);
  // console.log(password);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Tentou login");
    try {
      const response = await backend.post("/login_user", {
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
      navigate("/");
    } catch (error) {
      // Handle error here
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className={classes.navbar}>
        <Link to={"/"}>
          <span className={classes.logo}>
            <img src={logo} />
            <h1 className={classes.titleLogo}>ChefHub</h1>
          </span>
        </Link>
      </div>
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
          type="button"
          className={classes.loginButton}
          onClick={handleLogin}
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
