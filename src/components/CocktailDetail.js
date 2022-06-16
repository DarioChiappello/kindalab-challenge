import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from './CocktailDetail.module.css';

const CocktailDetail = () => {
    
    const params = useParams();
    const idCocktail = params.cocktailId;
    const [cocktail, setCocktail] = useState([]);
    const [ingredientsList, setIngredientsList] = useState([]);

    useEffect(()=>{
        fetchData();
    },[cocktail]);

    const fetchData = () => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idCocktail}`)
        .then((response) => {
            const res = response.data.drinks[0];
            setCocktail(res);
            const drinks = Object.keys(cocktail)
                                .filter(key => key.match(/ingredient/i))
                                .filter(key => !!cocktail[key])
                                .map(key => cocktail[key].trim())

            const measures = Object.keys(cocktail)
                                .filter(key => key.match(/measure/i))
                                .filter(key => !!cocktail[key])
                                .map(key => cocktail[key].trim())
            
            const ingredients = drinks.map((drink, index) => {
                return { drink: drinks[index], measure: measures[index] }
            })

            setIngredientsList(ingredients);
          })
          .catch( (error) => {
            console.log(error);
          });
    
    }

    return (
        <div>
            <h1 className={classes.title}>{cocktail.strDrink}</h1>
            <div className={classes.card}>
                <div className={classes.square}>
                    <img src={cocktail.strDrinkThumb} className={classes.img} alt={cocktail.strDrink} />
                </div>
                {ingredientsList.map((ing,index) => {
                    return <p key={index} className={classes.text}>{ing.measure + ' ' + ing.drink}</p>
                })}
                <li className={classes.text}>How to prepare</li>
                <p className={classes.text}>{cocktail.strInstructions}</p>
            </div>
        </div>
    );
}

export default CocktailDetail;