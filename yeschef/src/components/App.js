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
        fetch(`${process.env.REACT_APP_API_URL}`)
          .then((resp) => resp.json())
          .then((data) => {
            setRecipes(data);
            setFavoriteRecipes(data.filter((recipe) => recipe.favorited));
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
    
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    function handleFavoriteToggle (recipe, favorited) {
        if (favorited) {
            setFavoriteRecipes([...favoriteRecipes, recipe]);
        } else {
            setFavoriteRecipes(favoriteRecipes.filter(each => each.id !== recipe.id));
        }
        onUpdatedRecipe(recipe);
    };

    const veganRecipes = recipesToDisplay.filter((recipe) => recipe.vegan);
    const vegetarianRecipes = recipesToDisplay.filter((recipe) => recipe.vegetarian || recipe.vegan);
    
    return (
        <div>
            <NavBar setSearchText={setSearchText} 
            searchText={searchText}
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
                    <RecipeList recipes={vegetarianRecipes} handleFavoriteToggle={handleFavoriteToggle} />
                </Route>
                
                <Route path="/recipes/vegan">
                    <RecipeList recipes={veganRecipes} handleFavoriteToggle={handleFavoriteToggle} />
                </Route>

                <Route path="/recipes/favorites">
                    <RecipeList recipes={favoriteRecipes} handleFavoriteToggle={handleFavoriteToggle} />
                </Route>

                <Route path="/recipes/:id">
                    <SingleRecipe/>
                </Route>

                <Route path="/recipes">
                    <RecipeList recipes={recipesToDisplay} handleFavoriteToggle={handleFavoriteToggle} />
                </Route>

            </Switch>
            </div>
        </div>
    )
}

export default App