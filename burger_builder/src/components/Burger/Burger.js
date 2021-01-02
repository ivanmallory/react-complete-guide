import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //Have to convert object of key value pairs to an array
    let transformedIngredients = Object.keys(props.ingredients) 
        .map(igKey => { //Maps out objects in a list
            return [...Array(props.ingredients[igKey])].map((_, i) => { //Maps out objects in an array
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        //Flattening an array- When you take multiple arrays and make them into one array
        .reduce((arr, el) => {
            return arr.concat(el); //Takes the current element (el) and adds it to the array
        }, []); //Reduce is a built-in function which allows transforming an array into something else. You must use this existing array and the new element in an argument 
        console.log(transformedIngredients);
    if(transformedIngredients.length === 0){ //If no ingredients are selected, have screen display message
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );  
};

export default burger;