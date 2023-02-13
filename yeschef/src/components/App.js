import React from "react";
import RecipeList from "./RecipeList"
import NewRecipeForm from "./NewRecipeForm";
import NavBar from "./NavBar";

function App(){
    return (
        <div>
            <NavBar />
            <NewRecipeForm />
            <RecipeList />
        </div>
    )
}

export default App