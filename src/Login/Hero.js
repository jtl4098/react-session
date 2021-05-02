import React, {useState, useEffect} from "react";

import firebase from '../firebase/fire';
import Cookies from 'js-cookie';
import * as Constants from '../constants';
import axios from 'axios';
const Hero = (props) => {
    const {email, setEmail,handleLogout, user, setUser} = props;
    const userId = Cookies.get("userInfo");
 
    useEffect( ()=> {
        const fetchData = async () => {
            console.log(userId);
            const queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                
                // query: Constants.GET_USER_QUERY,
                query: `
                query{
                    getPostsByUser(user: ${userId}){
                    id
                    title
                    user_id
                    description
                    
                    }
                }

                `
                
                }
            ); 
            const postResult = queryResult.data.data;
            console.log(postResult);
        };
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                console.log(user);
                fetchData();

            }else{
                setUser("");
            }
        });
            

            

        
        
            
        
        
        
    }, [])

    return(

        
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
              


                    <button onClick={handleLogout}>Log Out</button>
                
                
            </nav>
            
           
        </section>
    )
}

export default Hero;