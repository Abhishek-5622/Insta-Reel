// *********************************Sign up*****************************************

// import statement
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import { storage, database } from '../firebase';
import style from './signUp.module.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import image from "./phone.png";
import p1 from "./p1.jpg";
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    signup_btn: {
        marginLeft: 100,
        marginBottom: 20
      },
      login_btn:{
        marginLeft: 110,
        marginBottom: 20
      },
    
  }));

// sign up function 
function Signup() {
    const classes = useStyles();
    // create state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null)
    
    // consume context
    const {signup,currentUser} =useContext(AuthContext);
    
    // handle signup
    const handleSignup = async (e) => {
        // prevent default behaviour of submit => when u submit a form it reload a page.
        e.preventDefault();
        
        try {
            // set loading to true
            setLoading(true);
            // get response
            let res = await signup(email, password);
            // get user id
            let uid = res.user.uid;
            // uploadTaskListener is a listener. add profile image
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }
            // handle error
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false)
            }
            // success
            async function fn3() {
                // get download url of image
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                // set in database
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
                setLoading(false);
                console.log('User has Signed up');

                // setName("");
                // setEmail("");
                // setPassword("");
            }


        }

        catch (err) {
            setError(err)
            setTimeout(() => setError(''), 2000);
            setLoading(false)
        }
    }

    
    const handleFileSubmit = (e) => {
        // get file(profile image)
        let file = e.target.files[0];
        
        if (file != null) {
            setFile(file)
        }
    }
    useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])
    return (
        
            
        <div className={style.main_container}>
            <img className={style.p1_img} src={p1}></img>
            
        <div>
            <img className={style.img_container} src={image}></img>
        </div>
        <div className={style.signup_container}>
            
        
                <h1 className={style.heading}>𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺</h1>
            
            <form  className ={style.form_container}>
                <div>
                    {/* <label htmlFor=''>UserName</label> */}
                    <input className ={style.input_container} type='text' value={name} placeholder = "User Name" onChange={(e) => setName(e.target.value)} />

                </div>
                <div>
                    
                    <input className ={style.input_container} type='email' placeholder = "abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    
                    <input className ={style.input_container} type='password' value={password} placeholder = "Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={style.div_space}>
                    <label  htmlFor='profile'>Profile image :</label>
     
                    <input className ={style.input_container} type='file' accept='image/*' onChange={handleFileSubmit}></input>
                </div>
                {/* <button type='submit' disabled={loading}>Login</button> */}
                <Button variant="contained" color="primary" disabled={loading} className={classes.signup_btn} onClick={handleSignup}>Sign Up</Button>
                <hr></hr>
                <Button variant="contained" color="primary" disabled={loading} className={classes.login_btn} >Log In</Button>
                
            </form>
            
        </div>
        </div>
        
    )
}

export default Signup