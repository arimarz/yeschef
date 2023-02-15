import {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom"

function RecipeEdit ({onUpdatedRecipe}){

    const history = useHistory();
    const{id} = useParams();
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);
    const [cuisine, setCuisine] = useState('');
    const [image, setImage] = useState('');
    const [vegan, setVegan] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);
    
    useEffect(()=> {
        fetch(`http://localhost:3001/recipes/${id}`)
            .then((r)=> r.json())
            .then((recipe) => {
                setName(recipe.name);
                setDescription(recipe.description);
                setIngredients(recipe.ingredients);
                setInstructions(recipe.instructions);
                setCuisine(recipe.cuisine);
                setImage(recipe.image);
                setVegan(recipe.vegan);
                setVegetarian(recipe.vegetarian);
            })
    }, [id]);

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

    const updatedRecipe = {
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
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedRecipe),
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch(`http://localhost:3001/recipes/${id}`, configObj)
          .then((resp) => resp.json())
          .then((updatedRecipe) => {
            onUpdatedRecipe(updatedRecipe);
            history.push(`/recipes/${id}`)
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

export default RecipeEdit




































































































































































//////////////////////////////////////////////////////


// import {useState, useEffect} from "react";
// import {useParams, useHistory} from "react-router-dom"

// function RecipeEdit({onUpdatedRecipe}){

//     const initialState = {
//         name: "",
//         description: "",
//         ingredients: "",
//         instructions: "",
//         cuisine: "",
//         image: "",
//         vegan: false,
//         vegetarian: false,
//       };

//     const [formData, setFormData] = useState(initialState);

//     const {name, description, ingredients, instructions, cuisine, image, vegan, vegetarian} = formData;

//     const history = useHistory()

//     const{id} = useParams();

//     useEffect(()=> {
//     fetch(`http://localhost:3001/recipes/${id}`)
//     .then((r)=> r.json())
//     .then((recipe) => setFormData(recipe))
//     }, [id]);

//     function handleVeganCheckbox() {
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           vegan: !prevFormData.vegan,
//           vegetarian: true
//         }));
//       }

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

//     // console.log(formData);

//     function handleSubmit(e){
//         e.preventDefault();
//         const configObj = {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(formData),
//         };
    
//         fetch(`http://localhost:3001/recipes/${id}`, configObj)
//           .then((resp) => resp.json())
//           .then((updatedRecipe) => {
//             onUpdatedRecipe(updatedRecipe);
//             history.push(`/recipes/${id}`)
//           });
//       };

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
//                     <input type="textbox" id="ingredients" name="ingredients" onChange={handleChange} value={ingredients}/>
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

// export default RecipeEdit