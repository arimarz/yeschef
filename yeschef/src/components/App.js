import {Switch, Route} from 'react-router-dom';
import React, {useEffect, useState} from "react";

import RecipeList from "./RecipeList"
import NewRecipeForm from "./NewRecipeForm";
import NavBar from "./NavBar";
import Home from "./Home"
import SingleRecipe from "./SingleRecipe"
import RecipeEdit from "./RecipeEdit"

function App(){
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/recipes")
          .then((resp) => resp.json())
          .then((data) => {
            setRecipes(data)
        });
    }, []);

    function onUpdatedRecipe(updatedRecipe) {
        const updatedRecipes = recipes.map((ogRecipe) => {
            if (ogRecipe.id === updatedRecipe.id) {
              return updatedRecipe;
            } else {
              return ogRecipe;
            }
          });
          setRecipes(updatedRecipes);
        };
    

    return (
        <div>
            <NavBar />
            <Switch>
                
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/recipes/:id/edit">
                    <RecipeEdit onUpdatedRecipe = {onUpdatedRecipe}/>
                </Route>

                <Route path="/recipes/new">
                    <NewRecipeForm />
                </Route>

                <Route path="/recipes/:id">
                    <SingleRecipe/>
                </Route>

                <Route path="/recipes">
                    <RecipeList recipes={recipes}/>
                </Route>

            </Switch>
        </div>
    )
}

export default App