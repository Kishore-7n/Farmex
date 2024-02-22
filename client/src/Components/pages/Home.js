import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import home from '../img/home.jpg';
import DotLoader from 'react-spinners/DotLoader';
export default function Home() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [loading,setloading] = useState(true);
  useEffect(()=> {
    setloading(true)
    setTimeout(()=>{
    setloading(false)
    },500) 
},[])
  return (
    <div className='bg'>
    {
      loading ? (

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
      <section className='main-section'>
      <div className='main'>
        <img src={home} alt='jdj'></img>
        <div className='text'>
          <h4>FARMEX</h4>
          <br></br>
          <h5>Farm to Cart <br></br>
          <br></br>
          Your Source for Wholesome Goodness.<br></br>
          <br></br>
           Straight from the Fields!</h5>
          <div className='btn'>
            <button onClick={()=>{navigate('/signup')}}>Sign up</button>
          </div>
          <h5>Already Have an account ? </h5>
          <div className='btn'>
            <button onClick={()=>{navigate('/login')}}>Login</button>
          </div>
        </div>
        </div>
        </section>
        <section className='footer-section'>
          <footer className='footer'>
                <div className='footer-div'>
                   <ul className='ul1'>
                    <h4>Why Farmex ?</h4>
                    <li>Customers</li>
                    <li>Composable Web Platform</li>
                    <li>Security</li>
                    <li>Agency Partner Program</li>
                    <li>Technology Partner Program</li>
                   </ul>
                   <ul className='ul1'>
                    <h4>Explore</h4>
                    <li>Docs</li>
                    <li>Integrations</li>
                    <li>Jamstack Book</li>
                    <li>Community</li>
                    <li>Resources & Guides</li>
                   </ul>
                   <ul className='ul1'>
                    <h4>Contact Us</h4>
                    <li>Sales</li>
                    <li>Support</li>
                    <li>Status</li>
                    <li>Forums</li>
                    <li>Hire an Agency</li>
                   </ul>
                   <ul className='ul1'>
                    <h4>Helpful Information</h4>
                    <li>FAQ (Frequently Asked Questions)</li>
                    <li>Sizing guide</li>
                    <li>Shipping information</li>
                    <li>Payment options</li>
                    <li>Track order</li>
                  </ul>
                  <ul className='ul1'>
                  <h4>Quick Links</h4>
                  <li>Special offers</li>
                  <li>New arrivals</li>
                  <li>Clearance</li>
                  <li>Terms and conditions</li>
                  <li>Privacy policy</li>
                  <li>Return policy</li>
                  </ul>
                </div>
          </footer>
          <h4 className='copyrights'>© {currentYear} Farmex . All Rights Reserved.</h4>
        </section>

        </>
      )
    }
      </div>
  )
}
