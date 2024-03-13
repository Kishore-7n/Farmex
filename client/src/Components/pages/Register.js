import { TextField,Grid,Button,Box } from '@mui/material';

import {  useEffect, useState } from 'react';

import DotLoader from 'react-spinners/DotLoader';

import { useNavigate } from 'react-router-dom';

import '../styles/Register.css';

import image1 from '../img/register3.jpg'


export default function Register() {

    const [image, setImage] = useState(null);

    const [loading,setloading] = useState(true)

    useEffect(()=> {
        setloading(true)
        setTimeout(()=>{
        setloading(false)
        },500) 
    },[])

    const navigate = useNavigate()

    const converttobase = (e) =>{
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = ()=>{
            console.log(reader.result);
            setImage(reader.result)
        }
}   
    const handlesubmit = async(event) =>{
        event.preventDefault();
        const signupresponse = await  fetch("https://farmex.onrender.com/signup",{
            method:'post',
            mode:'cors',
            headers:{"Content-Type":"application/json"},
            body:
            JSON.stringify({
            "Name":event.target.Name.value,
            "Email":event.target.Email.value,
            "Password":event.target.Password.value,
            "Address":event.target.Address.value,
            "PhoneNumber":event.target.PhoneNumber.value,
             "image":image,
            })
            })
            if(signupresponse.ok)
            {

                navigate('/login')
            }
    }

        
  return (
    <div className='regform'>
        {loading ? (<DotLoader
           color="black" 
           margin={2}
           cssOverride={{display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"300px"}}
           loading={loading}
           size={60}
           aria-label="Loading Spinner"
           data-testid="loader"/>):(<>
        <form  onSubmit={handlesubmit} className='myform'>
            <div className='myform-div1'>
                    <img src={image1} alt='imagewwww'></img>
                    <div className="text-overlay">
                        <h6>Farmex</h6>
                        <br></br>
                        <br></br>
                        <p>
                            Welcome to the Farmer's Market! <br></br>
                            Join Our Farming Community!
                            Create Your Account to Harvest Exclusive Deals and Farm-Focused Shopping.
                        </p>
                    </div>
            </div>
            <div className='myform-div2'>
                <Grid className='gridcontainer'>
                        <Box marginBottom={2}>
                            <TextField
                            className='name'
                            label="Name"
                            name='Name'
                            required
                            fullWidth
                            autoComplete='off'
                            autoSave='off'
                            InputProps={{ disableUnderline: true,
                                style: {
                                    borderRadius: "10px",
                                  } }}
                            variant='filled'
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                            label="Email"
                            name='Email'
                            className='name'
                            type='email'
                            fullWidth
                            required
                            autoComplete='off'
                            autoSave='off'
                            InputProps={{ disableUnderline: true,
                                style: {
                                    borderRadius: "10px",
                                  } }}
                            variant='filled'
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                            label="Password"
                            name='Password'
                            className='name'
                            type='password'
                            fullWidth
                            required
                            autoComplete='off'
                            autoSave='off'
                            InputProps={{ disableUnderline: true,
                                style: {
                                    borderRadius: "10px",
                                  } }}
                            variant='filled'
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                            label="Address"
                            name='Address'
                            className='name'
                            fullWidth
                            required
                            autoComplete='off'
                            autoSave='off'
                            InputProps={{ disableUnderline: true,
                                style: {
                                    borderRadius: "10px",
                                  } }}
                            variant='filled'
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                            label="PhoneNumber"
                            name='PhoneNumber'
                            className='name'
                            type='number'
                            fullWidth
                            required
                            autoComplete='off'
                            autoSave='off'
                            InputProps={{ disableUnderline: true,
                                style: {
                                    borderRadius: "10px",
                                  } }}
                            variant='filled'
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                            type="file"
                            label="Profile Picture"
                            className='name'
                            InputLabelProps={{ shrink:true }}
                            fullWidth
                            name="Image" 
                            onChange={e=>converttobase(e)}
                            required
                            InputProps={{ disableUnderline: true,
                                style: {
                                    borderRadius: "10px",
                                  } }}
                            variant='filled'
                            />
                        </Box>
                        <Box>
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{backgroundColor:"green",borderRadius:"10px",height:50}}>
                                Signup
                            </Button>
                        </Box> 
                    </Grid>
            </div>
        </form>
        </>)}
    </div>
  )
}

