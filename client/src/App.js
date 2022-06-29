import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Account from './components/Account';
import Navbar from './components/Navbar';
import RecipeState from './context/RecipeState'
import DetailedRecipe from './components/DetailedRecipe';
import AddRecipe from './components/AddRecipe';
import YourRecipes from './components/YourRecipes';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <RecipeState>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/addrecipe" element={<AddRecipe/>}/>
        <Route path="/yourrecipes" element={<YourRecipes/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/detailedRecipe" element={<DetailedRecipe/>}/>
      </Routes>
    </Router>
    </RecipeState>
  );
}

export default App;
