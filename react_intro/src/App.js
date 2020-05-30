import React, { Component } from 'react';
import classes from './App.module.css'
import Person from './Person/Person';


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
    
   let btnClass = '';
   let persons = null;
    
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
                  key={person.id}
                  click={() => this.deletePersonHandler(index)}
                  name={person.name} 
                  age={person.age}
                  changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      btnClass= classes.Red;   
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
        <h1>Hello World!</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>
          Toggle Users
        </button>
          {persons}
      </div>
    );
  }
}

export default App;
