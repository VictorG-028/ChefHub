import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeDetail from "./components/recipe-detail/RecipeDetail";
import { GlobalProvider } from "./providers";

import Home from "./components/home/Home";
import UserRecipes from "./components/user-recipes/UserRecipes";
import Ingredients from "./components/ingredients/Ingredients";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Preferences from "./components/preferences/Preferences";

const LoginPage = () => {
  return <Login />
}

const SignupPage = () => {
  return <Signup />
}

const Homepage = () => {
  return <Home />;
};

const RecipeDetailPage = () => {
  return <RecipeDetail />;
};

const UserRecipesPage = () => {
  return <UserRecipes />
}

const IngredientsPage = () => {
  return <Ingredients />
}

const PreferencesPage = () => {
  return <Preferences />
}

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recipe-detail" element={<RecipeDetailPage />} />
          <Route path="/user-recipes" element={<UserRecipesPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
