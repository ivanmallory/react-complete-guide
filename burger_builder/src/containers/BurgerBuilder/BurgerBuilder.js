import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false, //becomes true once you can buy the burger i.e when an ingredient is one ore more
        purchasing: false,
        loading: false
    }

    componentDidMount (){
        axios.get('https://react-my-burger-8755b-default-rtdb.firebaseio.com/ingredients')
            .then(response => {
                this.setState ({
                    ingredients: response.data
                });
            });
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => { 
                return sum + el;
            }, 0); //Reduce array to turn into single number
            this.setState({purchasable: sum > 0}); //checks if purhaseable is greater than zero, changing it to true

    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type] //Takes original amount and adds additional
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]; //Takes original price and adds ingredient prices
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients); //Runs updatePurchaseState if ingredients are added, allowing the order button to be enabled. Also must pass updatedIngredients to pull the new state
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type] //Takes original amount and adds additional
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type]; //Takes original price and adds ingredient prices
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients); //Runs updatePurchaseState if ingredients are removed, allowing the order button to be enabled. Also must pass updatedIngredients to pull the new state
    }
    purchaseHandler = () => { //Must use arrow function in order to retreive state otherwise an error will occur
        this.setState({purchasing: true})
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        //alert('You continue!')
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ivan Mallory',
                address: {
                    street: 'Washington',
                    zipCode: '53208',
                    country: 'USA'
                },
                email: 'ivanmallory1992@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState ({loading: false, purchasing: false}); //Shows success case
            })
            .catch(error => {
                this.setState ({loading: false, purchasing: false}); //Shows error case
            })
            //MUST use .json to store data in Firebase database correctly
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){ //Loops through state.ingredients to check if any ingredients are equal to/less than zero
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}  Checks if it's true or false and if true, it should be disabled
        
        let orderSummary = null;

        let orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
        />
        if (this.state.loading){
            orderSummary = <Spinner />;
        }

        let burger = <Spinner />

        if(this.state.ingredients){
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Auxiliary>
            );
            }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios); //Must pass axios for proper error handling