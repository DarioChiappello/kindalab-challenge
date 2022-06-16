import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import CocktailDescription from "./CocktailDescription";
import classes from './CocktailList.module.css';

const CocktailList = () => {
    const [cocktailList, setCocktailList] = useState([]);
    

    useEffect(()=>{
        fetchData();
    }, [cocktailList]);

    const fetchData = () => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`)
        .then((response) => {
           
            const res = response.data.drinks;
            let urls = [];
            res.map((element) => {
                return urls.push(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${element.idDrink}`);
            })

            axios.all(urls.map((endpoint) => axios.get(endpoint))).then(
                (data) => {

                    res.map((el, index)=>{

                        return Object.assign(el,data[index].data.drinks);
                    })
                    setCocktailList(res);
                },
              );

            
            
          })
          .catch( (error) => {
            console.log(error);
          });
    
    }

    return (
        <div>
            {cocktailList && cocktailList.map((cocktail,index) => {
                return (
                    <div key={cocktail.idDrink} className={classes.card}>
                        <div className={classes.content}>
                            <NavLink to={`/cocktail/${cocktail.idDrink}`} className={classes.link}>
                                <h1 className={classes.title}>{cocktail.strDrink}</h1>
                            </NavLink>
                            <CocktailDescription title={cocktail.strDrink} id={cocktail.idDrink} data={cocktail[0]} />
                        </div>
                        <div className={classes.square+' '+classes.content}>
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className={classes.img} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CocktailList;