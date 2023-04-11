import logo from "../images/logo.png";
import footerLogo from "../images/logo192.png";
import style from "./Navigation.module.css"
import {NavLink} from "react-router-dom"; // the curly braces are used to import a specific function from a module
function Nav(props) {
  return (
    <>
      <nav className="navBackground flex items-center justify-between flex-wrap font-nav-font p-6 topNav">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={logo} alt="logo" className="w-100 h-28"/>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center border-b border-b-gold lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <NavLink
              to="/"
              id="home"
              className={({isActive}) => isActive ? style.navItemActive : style.navItemInactive}
            >
              Home
            </NavLink>
            <NavLink
              to="/Game"
              id="game"
              className={({isActive}) => isActive ? style.navItemActive : style.navItemInactive}
            >
              Game
            </NavLink>
            <NavLink
              to="/About"
              id="about"
              className={({isActive}) => isActive ? style.navItemActive : style.navItemInactive}
            >
              About Game
            </NavLink>
          </div>
        </div>
      </nav>
      {/* {props.children}
      <footer className="fixed bottom-0 w-full bodyBackground text-gold text-center p-4">
      <img src={footerLogo} className="inline-block w-20 h-20 mr-2" />
      <p>© 2023 Mafia Game</p>
      </footer> */}
    </>
  );
}
export default Nav;
