import * as React from 'react';
import { useState,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import image2 from '../img/login2.jpg'
import '../styles/SignIn.css'
import { UserContext } from '../../Context/UserContext';
import {Checkbox, TextField} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import DotLoader from 'react-spinners/DotLoader';

export default function SignIn() {

const [Email, setEmail] = useState('');

const [Password, setPassword] = useState('');

const navigate = useNavigate()

const { setUserData } = useContext(UserContext);

const handleEmailChange = (event) => {

  setEmail(event.target.value);
}

const handlePasswordChange = (event) => {

  setPassword(event.target.value);
}

const isButtonDisabled = Email.length === 0 || Password.length === 0;


const [loading,setloading] = useState(true)

useEffect(()=> {
    setloading(true)
    setTimeout(()=>{
    setloading(false)
    },500) 
},[])

let loginerror;
  const handleSubmit = async(event) => {

    event.preventDefault();

    const loginresponse = await fetch("http://localhost:8000/login",{
      method:'post',
      headers:{"Content-Type":"application/json"},
      body:
      JSON.stringify({
        "Email":Email,
        "Password":Password,
      })
    })

    if(loginresponse.ok)
    {
      const loginresult = await loginresponse.json();

      const {token} = loginresult;

      localStorage.setItem('token',token);

      const storedtoken = localStorage.getItem('token'); 

        if (storedtoken) {

          const decodedToken = jwt_decode(storedtoken);

          const {verifieduser} = decodedToken;

          setUserData(verifieduser);

          
        }

      navigate('/product')

      
    }
    else{
      const loginresult = await loginresponse.json();
       loginerror = loginresult.error;
    }

}

const signup = ()=>{
  navigate('/signup');
}

  return(
    <div className='logform'>
    {loading ? (
      <DotLoader
           color="black" 
           margin={2}
           cssOverride={{display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"300px"}}
           loading={loading}
           size={60}
           aria-label="Loading Spinner"
           data-testid="loader"/>
    ):(
      <>
      <form onSubmit={handleSubmit} className='mylogform'>
        <div className='mylogform-div2'>
          <div className='field-container'>
            <h4>welcome back !</h4>
          </div>
          <div className='field-container'>
            <p>Thank you for getting back,<br></br>
            please login to your account by filling these form:</p>
          </div>
          <div className='field-container'>
            <div className='icon'>
              <i className='bx bxs-envelope' ></i>
            </div>
            <TextField
              type='Email'
              required
              label='Email'
              autoSave='off'
              autoComplete='off'
              sx={{width:"350px"}}
              onChange={handleEmailChange}
            >
            {loginerror && loginerror==="Incorrect Email" ? (<h4>{loginerror}</h4>):(" ")}
            </TextField>
          </div>
          <div className='field-container'>
            <div className='icon'>
              <i className='bx bxs-lock' ></i>
            </div>
            <TextField
              type='password'
              required
              label='Password'
              autoSave='off'
              autoComplete='off'
              onChange={handlePasswordChange}
              sx={{width:"350px"}}
            >
            </TextField>
          </div>
          <div className='field-checker'>
              <FormControlLabel control={<Checkbox />} label="Remember" />
              <h5>Forget password</h5>
          </div>
          <div className='field-buttons'>
              <button disabled={isButtonDisabled}>LOGIN</button>
              <button className='signup' onClick={signup}>SIGN UP</button>
          </div>
        </div>
        <div className='mylogform-div1'>
          <img src={image2} alt='loading...'></img>
        </div>
      </form>
      </>
    )}
    </div>
  )
}



