import React from 'react';

const UserInput = (props) => {
    return(
        <div className="user_input">
            <h1>Please Enter Your Username:</h1>
            <input type="text" value={props.username} onChange={props.onChange}/>
        </div>
    )
}


export default UserInput