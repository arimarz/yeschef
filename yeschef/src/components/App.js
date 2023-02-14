import {Switch, Route} from 'react-router-dom';
import React, {useEffect, useState} from "react";

import RecipeList from "./RecipeList"
import NewRecipeForm from "./NewRecipeForm";
import NavBar from "./NavBar";
import Home from "./Home"
import SingleRecipe from "./SingleRecipe"

function App(){
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        fetch("http://localhost:3001/recipes")
          .then((resp) => resp.json())
          .then((data) => {
            setRecipes(data)
        });
    }, []);

    const [searchText, setSearchText] = useState("")

    const recipesToDisplay = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchText.toLowerCase()))
    console.log(recipesToDisplay);

    return (
        <div>
            <NavBar setSearchText={setSearchText} searchText={searchText} />
            <Switch>
                
                <Route exact path="/">
                    <Home />
                </Route>

                {/* <Route path="/recipes/:id/edit">
                    <RecipeEdit />
                </Route> */}

                <Route path="/recipes/new">
                    <NewRecipeForm />
                </Route>

                <Route path="/recipes/:id">
                    <SingleRecipe recipes={recipes}/>
                </Route>

                <Route path="/recipes">
                    <RecipeList recipes={recipesToDisplay}/>
                </Route>

            </Switch>
        </div>
    )
}

export default App