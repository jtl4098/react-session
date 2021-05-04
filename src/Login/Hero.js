import React, {useState, useEffect} from "react";

import firebase from '../firebase/fire';
import Cookies from 'js-cookie';
import * as Constants from '../constants';
import axios from 'axios';
const Hero = (props) => {
    const {email, setEmail,handleLogout, user, setUser} = props;
    const [userEmail, setUserEmail] = useState('');
 
    useEffect( ()=> {
        const fetchData = async () => {
            console.log(userEmail)
            const queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                
                // query: Constants.GET_USER_QUERY,
                // the user id should be user email
                query: `
                query{
                    getPostsByUser(user: 1){
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

        // get current user 
        firebase.auth().onAuthStateChanged(user =>{
            //logging in
            if(user){
                console.log(user);
                
                setUserEmail(user.ac.email)
                //fetch data base on current user email but the query needs to be changed 
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