import {useState} from "react"
import { useHistory } from "react-router-dom";

function NewRecipeForm ({onAddRecipe}){

    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [cuisine, setCuisine] = useState('');
    const [image, setImage] = useState('');
    const [vegan, setVegan] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);

    const [ingredientCount, setIngredientCount] = useState(1);

    function handleName(e){
        setName(e.target.value)
    }

    function handleDescription(e){
        setDescription(e.target.value)
    }

    function ingredientCounter(){
        setIngredientCount(ingredientCount + 1)
    }

    function handleIngredients(e){
        const ingKey = e.target.name;
        const ingValue = e.target.value;
        console.log(ingKey);
        console.log(ingValue);

        ingredients[ingKey] = ingValue

        // const newArray = ingredients.map((item)=>{
        //     if (item.id === ingKey) {
        //         return [...item, ingValue]
        //     } else {return item}
        // })
        // setIngredients(newArray);

        // const newIngredient = e.target.value
        // setIngredients((previousIngredients)=>[...previousIngredients, ingKey: ingValue])
        console.log(ingredients);
    }

    function handleInstructions(){
        setInstructions("test")
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
        setVegetarian(!vegetarian)
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

    // console.log(newRecipe);

    function handleSubmit(e){
        e.preventDefault();
        const configObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe),
        };
    
        fetch("http://localhost:3001/recipes", configObj)
            .then((resp) => resp.json())
            .then((data) => {
            onAddRecipe(data);
            // setFormData({initialState});
            history.push("/recipes")
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
                    {/* <input type="textbox" id="ingredients" name="ingredients" onChange={handleIngredients} value={ingredients} /> */}
                
                    {Array.from(Array(ingredientCount)).map((c, index) => {
                    return <input key={index} type="textbox" id={`ingredients[${index}]`} name={`${index}`} onChange={handleIngredients}></input>;
                })}
                <button type='button' onClick={ingredientCounter} >Add Additional Ingredient</button>
                </li>



                <li>
                    <label htmlFor="instructions">Instructions: </label>
                    <input type="textbox" id="instructions" name="instructions" onChange={handleInstructions} value={instructions}/>
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