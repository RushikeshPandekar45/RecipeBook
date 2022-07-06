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
import Alert from './components/Alert';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null)
  const giveAlert=(type,msg)=>{
    setAlert({type,msg})
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <RecipeState>
    <Router>
      <Navbar giveAlert={giveAlert}/>
      <Alert alert={alert}/>
      <Routes>
        <Route path="/" element={<Home giveAlert={giveAlert}/>}/>
        <Route path="/account" element={<Account giveAlert={giveAlert}/>}/>
        <Route path="/addrecipe" element={<AddRecipe giveAlert={giveAlert}/>}/>
        <Route path="/yourrecipes" element={<YourRecipes giveAlert={giveAlert}/>}/>
        <Route path="/login" element={<Login giveAlert={giveAlert}/>}/>
        <Route path="/signup" element={<Signup giveAlert={giveAlert}/>}/>
        <Route path="/detailedRecipe" element={<DetailedRecipe/>}/>
      </Routes>
    </Router>
    </RecipeState>
  );
}

export default App;
