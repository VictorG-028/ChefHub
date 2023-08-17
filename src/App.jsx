import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipiesDetail from "./components/recipies-detail/RecipiesDetail";
import { GlobalProvider } from "./providers";

import Home from "./components/home/Home";
import UserRecipies from "./components/user-recipies/UserRecipies";
import Ingredients from "./components/ingredients/Ingredients";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

const LoginPage = () => {
  return <Login />
}

const SignupPage = () => {
  return <Signup />
}

const Homepage = () => {
  return <Home />;
};

const RecipiesDetailPage = () => {
  return <RecipiesDetail />;
};

const UserRecipiesPage = () => {
  return <UserRecipies />
}

const IngredientsPage = () => {
  return <Ingredients />
}

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recipies-detail" element={<RecipiesDetailPage />} />
          <Route path="/user-recipies" element={<UserRecipiesPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
