import { useState, useEffect, useCallback } from "react";
import classes from './CocktailList.module.css';

const CocktailDescription = (props) => {
    const [description, setDescription] = useState([]);
    
    
    

    const fetchData = useCallback(() => {
        const drinks = Object.keys(props.data)
                .filter(key => key.match(/ingredient/i))
                .filter(key => !!props.data[key])
                .map(key => props.data[key].trim())

        const measures = Object.keys(props.data)
                .filter(key => key.match(/measure/i))
                .filter(key => !!props.data[key])
                .map(key => props.data[key].trim())

        const ingredients = drinks.map((drink, index) => {
        return { drink: drinks[index], measure: measures[index] }
        })

        let descriptionPlus = ingredients.length-2 > 0 ? ingredients.length-2+' and ingredients more' : '';
        setDescription([ingredients[0].measure +' ' + ingredients[0].drink, ingredients[1].measure + ' ' + ingredients[1].drink, descriptionPlus]);
        
    
    },[props.data]);

    useEffect(()=>{
        fetchData();
    },[props.data,fetchData]);

    return (
        <div>
            {description.length > 0 && description.map((desc,index) =>{
                if(desc !== ""){
                    return <li key={index} className={classes.text}>{desc}</li>;
                }else{
                    return '';
                }
            })}
        </div>
    );
}

export default CocktailDescription;