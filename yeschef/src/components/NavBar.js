import {Link, NavLink} from 'react-router-dom';
import Search from './Search';

function NavBar({setSearchText, searchText}){

    return(
        <header>
            <nav>
                <Link to="/"><h1 className="title">yes, chef.</h1></Link>
                <Search setSearchText={setSearchText} searchText={searchText} />
                <div className="navigation">
                    <NavLink className="button" exact to="/recipes">All Recipes</NavLink>
                    <NavLink className="button" exact to="/recipes/new">Add A New Recipe</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default NavBar