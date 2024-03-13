import React, { useContext } from 'react'
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';  
import farmexlogo from '../img/farmexlogo.png';


export default function Navbar() {
    const navigate = useNavigate()
    const { userData } = useContext(UserContext);
    const {setUserData} = useContext(UserContext)


    const handlelogout = () =>{
        localStorage.removeItem('token')
        setUserData(null);
        navigate('/login')
    }



    return(
      <nav>
        <div className="logo"><img src={farmexlogo} alt='logo' onClick={()=>navigate('/')}></img></div>
        <input type="checkbox" id="checkbox"/>
        <label htmlFor="checkbox" id="icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
        <ul className='ullist'>
          <li><Link to='/'>HOME</Link></li>
          <li>{userData ? (<Link to='/product'>SHOP</Link>):(<Link to='/signup'>REGISTER</Link>)}</li>
          <li><Link to='/admin/login'>ADMIN</Link></li>
          <li>{userData ? (<h6>Welcome {userData.Name}</h6>):(" ")}</li>
          <li>{userData ?(<img src={userData.image && userData.image.url} alt='xyxyx' onClick={()=>{navigate('/profile')}}></img>):(" ")}</li>
          <li>{userData ? (<button onClick={handlelogout}>LOGOUT</button>):(<button  onClick={()=>{navigate('/login')}}>LOGIN</button>)}</li> 
        </ul>
    </nav>
    )
 }