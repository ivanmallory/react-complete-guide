import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context';

import classes from './Person.module.css'
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass'

class Person extends Component {
    
    //Highlights/focuses on the current input when cockpit is shown
    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount(){
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }
    
    render(){
        console.log('[Person.js rendering...')
        return (
            <Aux> 
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                <p key="i1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old</p>
                <p key="i2">{this.props.children}</p>
                <input 
                    ref={this.inputElementRef} 
                    key="i3" 
                    type="text" 
                    value={this.props.name} 
                    onChange={this.props.changed}
                />
            </Aux>
        );
    }
}
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);

