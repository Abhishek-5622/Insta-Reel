// import React , usestate and useContext and useEffect
import React,{useState,useContext,useEffect} from 'react'
// import firebase
import {auth} from '../firebase'
// create context
export const AuthContext = React.createContext();

// function
function AuthProvider({children}) {
    // create state currentUser
    const[currentUser,setCurrentUser] =useState();
    // create loading state
    const[loading,setLoading] =useState(true);
    // sign up function
    function signup(email,password)
    {
        // create user in firebase
        return auth.createUserWithEmailAndPassword(email,password);
    }
    // login function
    function login(email,password)
    {
        // sign in with email
        return auth.signInWithEmailAndPassword(email,password);
    }
    // sign out function 
    function logout()
    {
        // sign out
        return auth.signOut();
    }
    // useeffect => variation 2: ComponentDidMount => run after 1st render
    useEffect(()=>{
        // set states
        const unsubscribe  = auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        })
        // clean up
        return ()=>{
            unsubscribe();
        }
    },[])
    // create value that contents all functions
    const value = {
        currentUser,
        login,
        signup,
        logout
    }
    // return 
    return (
        
        <AuthContext.Provider value={value}>
            {/* if loading is false and children is present then children render */}
            {!loading&&children}
        </AuthContext.Provider>
    )
}

export default AuthProvider