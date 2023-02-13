import React, {useEffect, useState} from "react";
import RecipeList from "./RecipeList"
import NewRecipeForm from "./NewRecipeForm";
import NavBar from "./NavBar";

function App(){

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/recipes")
          .then((resp) => resp.json())
          .then((recipes) => setRecipes(recipes));
      }, []);

    return (
        <div>
            <NavBar />
            <NewRecipeForm />
            <RecipeList />
        </div>
    )
}

export default App