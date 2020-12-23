import React, { Component } from 'react';
import classes from './App.module.css'
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';


class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }
  state = {
    persons: [
      {id: 1, name: "Ivan", age: 27},
      {id: 2, name: "Ismet", age: 26},
      {id: 3, name: "Ben", age: 34},
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }
  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }
  componentDidMount () {
    console.log('[App.js] did mount');
  }
  componentWillUnmount(){
    console.log('[App.js] componentDidUpdate');
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  };
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1)
    this.setState({
      persons: persons
    });
  };

  loginHandler = () => {
    this.setState({
      authenticated: true
    })
  }
  render() {
    console.log('[App.js] render');
    let persons = null;
    
    if(this.state.showPersons){
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}/>  
    }
    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push('red');
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push('bold');
    }
    
    return (
      <Aux>
        <button onClick={() => {
            this.setState({showCockpit: false});
          }}
        >Remove Cockpit
        </button>
        <AuthContext.Provider 
          value={{authenticated: this.state.authenticated, 
          login: this.loginHandler
          }}>
          {this.state.showCockpit ? (
            <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
