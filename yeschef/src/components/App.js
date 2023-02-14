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
    console.log(recipes)

    return (
        <div>
            <NavBar />
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
                    <RecipeList recipes={recipes}/>
                </Route>

            </Switch>
        </div>
    )
}

export default App