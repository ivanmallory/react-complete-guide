import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
//Summary of ingredients added. Should only display when 'Order Now' button is clicked. //On clicking background, modal disappears
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){ //Checks if the next props is not equal to the previous props, then return 'true' 
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    componentWillUpdate(){ //Controls whether OrderSummary will update. Clicking 'Order Now' will cause OrderSummary to update, avoiding additional rendering
        console.log('[Modal] will update')
    }
    render(){
        return(
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/> 
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
};

export default Modal;