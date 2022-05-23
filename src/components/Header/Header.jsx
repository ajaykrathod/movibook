import { useFeatureContext } from 'Context/NavigationContext';
import React,{useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import 'styles/components/Header/Header.css'
function Header() {
    const [Features,dispatch] = useFeatureContext()
    useEffect(() => {
        document.addEventListener("click",(e) => {
            if(e.target.className === "hamburger" || e.target.className === "bar"){
                document.getElementById('header').classList.toggle("active")
            }
            else {
                if(document.getElementById('header').classList.contains("active")){
                    document.getElementById('header').classList.remove("active")
                }
            }
        })
    },[]);
    const handleToggle = () => {
        document.getElementById('header').classList.toggle("active")
    }
  return (
    <nav className="navbar" id='header'>
        <div className="brand">MoviBook</div>
        <div className="hamburger" onClick={handleToggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
        <ul>
            <li><NavLink to="/" >Home</NavLink></li>
            <li><NavLink to="/movies">Movies</NavLink></li>
            <li><NavLink to="/books">Books</NavLink></li>
            {/* <li><NavLink to="/about">About</NavLink></li> */}
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">SignUp</NavLink></li>
        </ul>
    </nav>
  )
}

export default Header