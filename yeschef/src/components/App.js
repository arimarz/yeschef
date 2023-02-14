import React, {useEffect, useState} from "react";
import RecipeList from "./RecipeList"
import NewRecipeForm from "./NewRecipeForm";
import NavBar from "./NavBar";
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
            <NewRecipeForm />
            <RecipeList recipes={recipes}/>
            <SingleRecipe recipes={recipes}/>
        </div>
    )
}

export default App