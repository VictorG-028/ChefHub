import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./providers";
import Home from "./components/home/Home";
import UserRecipes from "./components/user-recipes/UserRecipes";
import Ingredients from "./components/ingredients/Ingredients";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Preferences from "./components/preferences/Preferences";
import Loading from "./components/loading/Loading";
import RecipeDetail from "./components/recipe-detail/RecipeDetail";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe-detail" element={<RecipeDetail />} />
          <Route path="/user-recipes" element={<UserRecipes />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/loading" element={<Loading />} />
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
