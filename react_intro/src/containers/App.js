import React, { Component } from 'react';
import classes from './App.module.css'
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'


class App extends Component {
  state = {
    persons: [
      {id: 1, name: "Ivan", age: 27},
      {id: 2, name: "Ismet", age: 26},
      {id: 3, name: "Ben", age: 34},
    ],
    showPersons: false
  }
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons: persons
    })
  }
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1)
    this.setState({
      persons: persons
    })
  }
  render() {
    let persons = null;
    
    if(this.state.showPersons){
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>  
    }
    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push('red');
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push('bold');
    }
    
    return (
      <div className={classes.App}>
          <Cockpit 
          showPersons={this.state.showPersons} 
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>
          {persons}
      </div>
    );
  }
}

export default App;
