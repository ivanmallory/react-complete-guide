import React, { Component } from 'react';
import UserOutput from './UserOutput'
import UserInput from './UserInput'
import './App.css'

class App extends Component {
    state = {
        username: 'react_ninja101',
    }
    updateUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    render(){
        return(
            <div className="username_card">
                <UserInput username={this.state.username} onChange={this.updateUsername}/>
                <UserOutput username={this.state.username}/>
            </div>
        )
    }
}
export default App