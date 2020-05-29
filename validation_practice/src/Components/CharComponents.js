import React from 'react';

const CharComponents = (props) => {
    return(
        <div onClick={props.onClick} style={{display: "inline-block", padding: "16px", textAlign: "center", margin: "16px", border: "1px solid black"}}>{props.character}</div>
    )
}
export default CharComponents