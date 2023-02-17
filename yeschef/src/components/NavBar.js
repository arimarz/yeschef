import { Link, NavLink, useLocation } from 'react-router-dom';
import Search from './Search';
import logo from '../yeschefsmall2.png';

function NavBar({setSearchText, searchText}) {
  const location = useLocation();
  const notRenderSmallLogo = location.pathname === '/';
  

  return (
    <header>
      <nav>
        {notRenderSmallLogo ? null : <Link to="/">
            <img className = "nav__image" src={logo} alt="yeschef"/>
        </Link>}
          <div className="search-icon">
            <Search setSearchText={setSearchText} searchText={searchText}/>
          </div>
        <div className="navigation">
          <NavLink className="button" exact to="/recipes">All Recipes</NavLink>
          <NavLink className="button" exact to="/recipes/new">Add A New Recipe</NavLink>
          <NavLink className="button" exact to="/recipes/favorites">Favorites</NavLink>
          <NavLink className="button" exact to="/recipes/vegan">Vegan</NavLink>
          <NavLink className="button" exact to="/recipes/vegetarian">Vegetarian</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;