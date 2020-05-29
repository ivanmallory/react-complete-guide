import React from 'react';

const ValidationComponent = (props) => {
    let text = ''
    if(props.textlength < 5){
        text = "Text too short"
    }
    else if(props.textlength > 20){
        text = "Text too long"
    }
    return(
        <div>
            <p>{props.usertext}</p>
            {text}
        </div>
    )
}

export default ValidationComponent