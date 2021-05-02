import React, {useState, useEffect} from "react";
import firebase from "./firebase/fire";
import Login from "./Login/Login";
import "../src/App.css";
import Hero from "./Login/Hero";
import * as Constants from './constants';
import axios from 'axios';
import Cookies from 'js-cookie';

const App = () => {

    const [user, setUser] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [emailError , setEmailError] = useState('');
    const [passwordError , setPasswordError] = useState('');
    const [hasAccount , setHasAccount] = useState(false);

    const [dataUser, setDataUser] = useState('');


    const clearInputs = () =>{
        setEmail('');
        setPassword('');
    }

    const clearErrors = () =>{
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then( () =>{
              console.log("Hello")
            })
            .catch(err =>{
                switch(err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                    case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
                }
            });
    }

    const handleSignUp = () =>{
        clearErrors();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err =>{
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                    
                    setEmailError(err.message);
                    break;
                    case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
                }
            });
    };

    const handleLogout = () =>{
        firebase.auth().signOut();
    };

    const authListener = () =>{
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                clearErrors();
                setUser(user);

            }else{
                setUser("");
            }
        });
    };
  

    useEffect( () =>{
     
        // setUser("");

        // const fetchData = async () => {
        //   const queryResult = await axios.post(
        //     Constants.GRAPHQL_API, {
            

        //       // query: Constants.GET_USER_QUERY,
        //       query: `
        //       query{
        //         getUser(id: ${num}){
        //           id
        //           first_name
        //           last_name
        //           email
        //         }
        //       }
        //       `             
        //     }            
        //   );
        //   console.log(queryResult);
        //   // Call GraphQL API
        //   let result = queryResult.data.data;
        //     setDataUser(result.getUser);
        //     console.log(dataUser);            
        //   //Cookies.set("userInfo", dataUser.id);            
        // };        

        authListener();

        var num  = 1;        
        let body = {
            query : `
            query{
                getUser(id: ${num}){
                    id
                    first_name
                    last_name
                    email
                }
            }`,
            variables:{}
        
        }
        let options = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        axios.post("http://localhost:8080/query",body, options
                
        ).then(res =>{
            
            setDataUser(res.data.data)
            //console.log(dataUser)
        }).catch(err => {console.log("Error", err.response)})


    }, []);
    useEffect( () => {
        console.log(dataUser)
    }, [dataUser])
    
    return (
        <>
        
        {user ? (
            <Hero 
                email={email}
                setEmail={setEmail}
                user = {user}
                setUser = {setUser}
                handleLogout={handleLogout}
            />
        ):(
            <Login 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword = {setPassword}
            handleLogin = {handleLogin}
            handleSignUp = {handleSignUp}
            hasAccount = {hasAccount}
            setHasAccount = {setHasAccount}
            emailError = {emailError}
            passwordError = {passwordError}
            
            />
            
        )}
        
        </>

    );
};
export default App;