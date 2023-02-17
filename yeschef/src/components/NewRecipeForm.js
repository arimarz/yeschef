import {useState} from "react"
import { useHistory } from "react-router-dom";

function NewRecipeForm ({onAddRecipe}){

    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);
    const [cuisine, setCuisine] = useState('');
    const [image, setImage] = useState('');
    const [vegan, setVegan] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);

    function handleName(e){
        setName(e.target.value)
    }

    function handleDescription(e){
        setDescription(e.target.value)
    }

    function handleAddIngredient(){
        setIngredients([...ingredients, ""])
    }

    function handleIngredients(e){
        // ingredients[e.target.name] = e.target.value
        const newIngs = ingredients.slice()
        newIngs[e.target.name] = e.target.value
        setIngredients(newIngs)
    }

    function handleAddInstruction(){
        setInstructions([...instructions, ""])
    }

    function handleInstructions(e){
        const newInst = instructions.slice()
        newInst[e.target.name] = e.target.value
        setInstructions(newInst)
    }

    function handleCuisine(e){
        setCuisine(e.target.value)
    }

    function handleImage(e){
        setImage(e.target.value)
    }

    function handleVegan(){
        setVegan(!vegan);
        setVegetarian(true);
    }

    function handleVegetarian(){
        if(vegan){
            setVegetarian(true)
        }else{
            setVegetarian(!vegetarian)}
    }

    const newRecipe = {
        name: name,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        cuisine: cuisine,
        image: image,
        vegan: vegan,
        vegetarian: vegetarian,
    }

    const configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(newRecipe),
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}`, configObj)
            .then((resp) => resp.json())
            .then((data) => {
            onAddRecipe(data);
            history.push(`/recipes/${data.id}`)
        });
    };

    return(
        <div className="recipeForm">
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label htmlFor="name">Recipe Name: </label>
                        <input type="text" className="form-text-input" id="name" name="name" onChange={handleName} value={name}/>
                    </li>
                    <li>
                        <label htmlFor="description">Description: </label>
                        <input type="text" className="form-text-input" id="description" name="description" onChange={handleDescription} value={description}/>
                    </li>

                    <li>
                        <label htmlFor="ingredients">Ingredients: </label>
                        {ingredients.map((ing, index) => {
                            return <input 
                                className="form-text-input"
                                key={index} 
                                type="text" 
                                name={`${index}`} 
                                value={ing} 
                                onChange={handleIngredients}   
                            />;
                        })}
                        <button type='button' className="form-button" onClick={handleAddIngredient} >Add Additional Ingredient</button>
                    </li>

                    <li>
                        <label htmlFor="instructions">Instructions: </label>
                        {instructions.map((ins, index) => {
                            return <input 
                                className="form-text-input"
                                key={index} 
                                type="text" 
                                name={`${index}`} 
                                value={ins} 
                                onChange={handleInstructions}   
                            />;
                        })}
                        <button type='button' className="form-button" onClick={handleAddInstruction} >Add Additional Step</button>
                    </li>

                    <li>
                        <label htmlFor="cuisine">Type of Cuisine: </label>
                        <input type="text" className="form-text-input" id="cuisine" name="cuisine" onChange={handleCuisine} value={cuisine}/>
                    </li>
                    <li>
                        <label htmlFor="image">Recipe Image Link: </label>
                        <input type="text" className="form-text-input" id="image" name="image" onChange={handleImage} value={image}/>
                    </li>

                    <label htmlFor="vegan">Vegan</label>
                    <input type="checkbox" className="checkbox" id="vegan" name="vegan" onChange={handleVegan} checked={vegan}/>

                    <label htmlFor="vegetarian">Vegetarian</label>
                    <input type="checkbox" className="checkbox" id="vegetarian" name="vegetarian" onChange={handleVegetarian} checked={vegetarian}/>

                    <button className="form-button" type="submit">Submit</button>
            </ul>
            </form>
        </div>
    ) 
}

export default NewRecipeForm
