import React from 'react';

const UserOutput = (props) => {
    return(
        <div className="user_output">
            <p>Welcome to React!</p>
            <p style={{fontStyle:"italic", fontSize:"30px", margin: "1rem", color: "red"}}>{props.username}</p>
            <p>Feel free to explore all of the glorious features of this library!</p>
        </div>
    )
}
export default UserOutput