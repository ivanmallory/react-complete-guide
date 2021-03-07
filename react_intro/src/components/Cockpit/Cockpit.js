import React, { useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.module.css'
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated)
    
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
<<<<<<< HEAD
        setTimeout(() =>{
            alert('Saved data to cloud!');
        }, 1000);
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect')
        };
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect')
        };
    });

=======
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js cleanup work in useEffect')
        };
    }, []);
>>>>>>> 629841ef13299d5137d1c09581bef06e2aac27cf
    const assignedClasses = [];
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }
<<<<<<< HEAD
    if(props.personsLength <= 2){
      assignedClasses.push(classes.red);
    }
    if(props.personsLengths <= 1){
      assignedClasses.push(classes.bold);
=======
    if(props.persons.length <= 2){
        assignedClasses.push(classes.red);
    }
    if(props.persons.length <= 1){
        assignedClasses.push(classes.bold);
>>>>>>> 629841ef13299d5137d1c09581bef06e2aac27cf
    }
    return(
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>Toggle Users</button>
            <button onClick={authContext.login}>Log In</button>
        </div>
    );
};
export default React.memo(Cockpit);