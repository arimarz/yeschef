import {Link, NavLink, useLocation} from 'react-router-dom';
import Search from './Search';

function NavBar({setSearchText, searchText}){
    const location = useLocation();
    const shouldRenderSearch = location.pathname === '/recipes';
    const notRenderSmallLogo = location.pathname === '/';

    return(
        <header>
            <nav>
                {notRenderSmallLogo ? null : <Link to="/"><h1 className="title">yes, chef.</h1></Link>}
                <div className="navigation">
                {shouldRenderSearch && (
                    <div>
                    <Search setSearchText={setSearchText} searchText={searchText} />
                    <NavLink className="button" exact to= "/recipes/vegan">Vegan</NavLink>
                    <NavLink className="button" exact to= "/recipes/vegetarian">Vegetarian</NavLink>
                    </div>
                    )}
                    <NavLink className="button" exact to="/recipes">All Recipes</NavLink>
                    <NavLink className="button" exact to="/recipes/new">Add A New Recipe</NavLink>
                    <NavLink className="button"  exact to="/recipes/favorites">Favorites</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default NavBar