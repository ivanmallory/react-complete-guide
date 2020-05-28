import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      {name: "Ivan", age: 27},
      {name: "Ismet", age: 26},
      {name: "Ben", age: 34},
    ]
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {name: newName, age: 25},
        {name: "Ismet", age: 26},
        {name: "Howard", age: 38},
      ]
    })
  }
  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {name: 'Ivan', age: 25},
        {name: event.target.value, age: 26},
        {name: "Howard", age: 38},
      ]
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
        <button style={{
            padding: "8px", 
            borderRadius: "5px", 
            backgroundColor: "coral", 
            font: "inherit",
            border: "1px solid blue"
          }} 
          onClick={() => this.switchNameHandler('Von!!!')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name}
          click={this.switchNameHandler.bind(this, 'Ivan!!!')} 
          age={this.state.persons[0].age}>My Hobbies: Music
        </Person>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          changed={this.nameChangedHandler}
        />
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}
        />
      </div>
    );
  }
}

export default App;
