import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import RecipeContext from '../context/RecipeContext';
export default function Navbar() {
    const context = useContext(RecipeContext);
    const {setSearchVal}=context;
    const Location=useLocation();
    const navigate=useNavigate();
    const signout=(e)=>{
        localStorage.removeItem('token');
        navigate('/',{replace:true});
    }
    const searchSubmit=(e)=>{
        e.preventDefault();
        setSearchVal(document.getElementById('search').value);
    }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><i className="fa-solid fa-kitchen-set"></i> RecipeBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={`nav-link ${Location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${Location.pathname==='/addrecipe'?"active":""}`} to="/addrecipe">Add-Recipe</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${Location.pathname==='/yourrecipes'?"active":""}`} to="/yourrecipes">Your-Recipes</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${Location.pathname==='/account'?"active":""}`} to="/account">Account</Link>
                    </li>

                </ul>
                
                {(Location.pathname==="/" || Location.pathname==="/yourrecipes") &&<form className="d-flex me-5" role="search" onSubmit={searchSubmit}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>}
                <div className="vr"></div>
                {localStorage.getItem('token')===null ? <div><Link to="/login" className="btn btn-outline-success mx-1" type="button">Login</Link>
                <Link to="/signup" className="btn btn-outline-success mx-1" type="button">SignUp</Link></div>:<button className="btn btn-outline-success mt-2" type="button" onClick={signout}>SignOut</button>}
            </div>
                
            </div>
        </nav>
    </div>
  )
}
