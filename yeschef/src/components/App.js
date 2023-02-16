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
    const [randomRecipes, setRandomRecipes] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:3001/recipes")
          .then((resp) => resp.json())
          .then((data) => {
            setRecipes(data);
            const randomIndices = getRandomIndices(data.length, 4);
            const randomRecipeList = randomIndices.map((index) => data[index]);
            setRandomRecipes(randomRecipeList);
        });
    }, [])

    const newRecipes = recipes.slice(-4)

    function getRandomIndices(maxIndex, count) {
        const indices = [];
        while (indices.length < count) {
          const index = Math.floor(Math.random() * maxIndex);
          if (!indices.includes(index)) {
            indices.push(index);
          }
        }
        return indices;
      }

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

    function onAddRecipe(newRecipe) {
        setRecipes((recipes)=> [...recipes, newRecipe])
    }

    const [searchText, setSearchText] = useState("")

    const recipesToDisplay = recipes.filter((recipe) => (recipe.name.toLowerCase().includes(searchText.toLowerCase())) || (recipe.cuisine.toLowerCase().includes(searchText.toLowerCase())))


    const favoriteRecipes = recipesToDisplay.filter((recipe) => recipe.favorited);
    const veganRecipes = recipesToDisplay.filter((recipe) => recipe.vegan);
    const vegetarianRecipes = recipesToDisplay.filter((recipe) => recipe.vegetarian || recipe.vegan);
    
    return (
        <div>
            <NavBar setSearchText={setSearchText} 
            searchText={searchText} 
            veganRecipes= {veganRecipes}
            vegetarianRecipes ={vegetarianRecipes}
            />
            <div className="main-body">
            <Switch>
                
                <Route exact path="/">
                    <Home randomRecipes={randomRecipes}
                    newRecipes= {newRecipes}/>
                </Route>

                <Route path="/recipes/:id/edit">
                    <RecipeEdit onUpdatedRecipe = {onUpdatedRecipe}/>
                </Route>

                <Route path="/recipes/new">
                    <NewRecipeForm onAddRecipe={onAddRecipe}/>
                </Route>

                <Route path="/recipes/vegetarian">
                    <RecipeList recipes={vegetarianRecipes}/>
                </Route>
                
                <Route path="/recipes/vegan">
                    <RecipeList recipes={veganRecipes}/>
                </Route>

                <Route path="/recipes/favorites">
                    <RecipeList recipes={favoriteRecipes} />
                </Route>

                <Route path="/recipes/:id">
                    <SingleRecipe/>
                </Route>

                <Route path="/recipes">
                    <RecipeList recipes={recipesToDisplay}/>
                </Route>

            </Switch>
            </div>
        </div>
    )
}

export default App