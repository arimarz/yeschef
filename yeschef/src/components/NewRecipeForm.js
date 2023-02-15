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
        fetch("http://localhost:3001/recipes", configObj)
            .then((resp) => resp.json())
            .then((data) => {
            onAddRecipe(data);
            history.push(`/recipes/${data.id}`)
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <ul>
                <li>
                    <label htmlFor="name">Recipe Name: </label>
                    <input type="text" id="name" name="name" onChange={handleName} value={name}/>
                </li>
                <li>
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" name="description" onChange={handleDescription} value={description}/>
                </li>

                <li>
                    <label htmlFor="ingredients">Ingredients: </label>
                    {ingredients.map((ing, index) => {
                        return <input 
                            key={index} 
                            type="text" 
                            name={`${index}`} 
                            value={ing} 
                            onChange={handleIngredients}   
                        />;
                    })}
                    <button type='button' onClick={handleAddIngredient} >Add Additional Ingredient</button>
                </li>

                <li>
                    <label htmlFor="instructions">Instructions: </label>
                    {instructions.map((ins, index) => {
                        return <input 
                            key={index} 
                            type="text" 
                            name={`${index}`} 
                            value={ins} 
                            onChange={handleInstructions}   
                        />;
                    })}
                    <button type='button' onClick={handleAddInstruction} >Add Additional Step</button>
                </li>

                <li>
                    <label htmlFor="cuisine">Type of Cuisine: </label>
                    <input type="text" id="cuisine" name="cuisine" onChange={handleCuisine} value={cuisine}/>
                </li>
                <li>
                    <label htmlFor="image">Recipe Image Link: </label>
                    <input type="text" id="image" name="image" onChange={handleImage} value={image}/>
                </li>

                <label htmlFor="vegan">Vegan</label>
                <input type="checkbox" id="vegan" name="vegan" onChange={handleVegan} checked={vegan}/>

                <label htmlFor="vegetarian">Vegetarian</label>
                <input type="checkbox" id="vegetarian" name="vegetarian" onChange={handleVegetarian} checked={vegetarian}/>

                <button type="submit">Submit</button>
           </ul>
        </form>
    ) 
}

export default NewRecipeForm























////////////////////////////////////////////////////////



// import {useState} from "react"
// import { useHistory } from "react-router-dom";

// function NewRecipeForm({onAddRecipe}){
//     const history = useHistory();
//     const initialState = {
//         name: "",
//         description: "",
//         ingredients: "",
//         instructions: "",
//         cuisine: "",
//         image: "",
//         vegan: false,
//         vegetarian: false,
//     };

//     const [formData, setFormData] = useState(initialState);

//     const {name, description, ingredients, instructions, cuisine, image, vegan, vegetarian} = formData;

//     function handleVeganCheckbox(){
//         setFormData(() => ({ ...formData, "vegan": !vegan }));
//     }

//     function handleVegetarianCheckbox(){
//         setFormData(() => ({ ...formData, "vegetarian": !vegetarian }));
//     }

//     function handleChange (e) {
//         if(e.target.type === "text" || "textbox"){
//             const { name, value } = e.target;
//             setFormData(() => ({ ...formData, [name]: value }));
//         } else if (e.target.type === "checkbox"){
//             const { name, checked } = e.target;
//             setFormData(() => ({ ...formData, [name]: !checked }));
//         }
//     };

//     console.log(formData);

//     function handleSubmit(e){
//         e.preventDefault();
//         const configObj = {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(formData),
//         };
    
//         fetch("http://localhost:3001/recipes", configObj)
//           .then((resp) => resp.json())
//           .then((data) => {
//             onAddRecipe(data);
//             setFormData({initialState});
//             history.push("/recipes")
//           });
//       };

//     const [ingredientValue, setIngredientValue] = useState('')
//     const [ingredientArray, setIngredientArray] = useState([])
//     function handleIngredientChange(e){
//         const {value} = e.target;
//         setIngredientValue(value);
//         const lines = value.split('\n');
//         setIngredientArray(lines)
//     }
//     console.log(ingredientArray);

//     function handleKeyDown(e){
//         if (e.key === 'Enter'){
//             e.preventDefault();
//             setIngredientValue(ingredientValue +'\n')
//         }
//     }

//     return(
//         <form onSubmit={handleSubmit}>
//             <ul>
//                 <li>
//                     <label htmlFor="name">Recipe Name: </label>
//                     <input type="text" id="name" name="name" onChange={handleChange} value={name}/>
//                 </li>
//                 <li>
//                     <label htmlFor="description">Description: </label>
//                     <input type="text" id="description" name="description" onChange={handleChange} value={description}/>
//                 </li>
//                 <li>
//                     <label htmlFor="ingredients">Ingredients: </label>
//                     <input type="textbox" id="ingredients" name="ingredients" onChange={handleIngredientChange} value={ingredientValue} onKeyDown={handleKeyDown}/>
//                 </li>
//                 <li>
//                     <label htmlFor="instructions">Instructions: </label>
//                     <input type="textbox" id="instructions" name="instructions" onChange={handleChange} value={instructions}/>
//                 </li>
//                 <li>
//                     <label htmlFor="cuisine">Type of Cuisine: </label>
//                     <input type="text" id="cuisine" name="cuisine" onChange={handleChange} value={cuisine}/>
//                 </li>
//                 <li>
//                     <label htmlFor="image">Recipe Image Link: </label>
//                     <input type="text" id="image" name="image" onChange={handleChange} value={image}/>
//                 </li>

//                 <label htmlFor="vegan">Vegan</label>
//                 <input type="checkbox" id="vegan" name="vegan" onChange={handleVeganCheckbox} checked={vegan}/>

//                 <label htmlFor="vegetarian">Vegetarian</label>
//                 <input type="checkbox" id="vegetarian" name="vegetarian" onChange={handleVegetarianCheckbox} checked={vegetarian}/>

//                 <button type="submit">Submit</button>
//            </ul>
//         </form>
//     )
// }

// export default NewRecipeForm