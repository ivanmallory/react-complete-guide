import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //Have to convert object of key value pairs to an array
    const transformedIngredients = Object.keys(props.ingredients) 
        .map(igKey => { //Maps out objects in a list
            return [...Array(props.ingredients[igKey])].map((_, i) => { //Maps out objects in an array
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        });
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );  
};

export default burger;