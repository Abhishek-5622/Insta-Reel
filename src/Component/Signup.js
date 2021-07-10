// import statement
import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider';

// signup function
function Signup() {
    //  create state
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const {signup} =useContext(AuthContext);
    
    // handleSignUp
    const handleSignup =async (e)=>{
        // prevent default behaviour of form ( prevent reload of page)
        e.preventDefault();
        // set loading to true
        setLoading(true);
        // get response
        let res = await signup(email,password);
        // get user id
        let uid = res.user.uid;
        // set loading to false
        setLoading(false);
    }
    // return
    return (
        <div>
            {/* form */}
            <form onSubmit={handleSignup} >
                <div>
                    <label htmlFor=''>UserName</label>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

                </div>
                <div>
                <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit' disabled={loading}>Login</button>
            </form>
        </div>
    )
}

export default Signup