import React, { Component } from 'react';
import ValidationComponent from './ValidationComponent'
import CharComponents from './CharComponents'

class App extends Component {
    state={
        usertext: ''
    }
    handleTextLength = (event) => {
        this.setState({
            usertext: event.target.value
        })
    }
    handleCharacterDelete = (index) => {
        const characters = this.state.usertext.split('');
        characters.splice(index, 1)
        const newText = characters.join('')
        this.setState({
            usertext: newText
        });
    }
    render(){
        const charList = this.state.usertext.split('').map((character, index) => {
            return <CharComponents 
            character={character}
            key={index} 
            onClick={() => this.handleCharacterDelete(index)}/>;
    });
        return(
            <div>
                <input type="text" value={this.state.usertext} onChange={this.handleTextLength}/>
                <p>{this.state.usertext.length}</p>
                <ValidationComponent usertext={this.state.usertext} textlength={this.state.usertext.length}/>
                {charList}
            </div>
        )
    }
}

export default App