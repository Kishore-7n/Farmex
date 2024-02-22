import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Components/pages/Navbar';
import Register from "./Components/pages/Register";
import Sell from "./Components/pages/Sell";
import Profile from "./Components/pages/Profile";
import SignIn from "./Components/pages/SignIn";
import ProductView from "./Components/pages/ProductView";
import Product from "./Components/pages/Product";
import Home from "./Components/pages/Home";
import Cart from "./Components/pages/Cart";
import Sucess from "./Components/pages/Sucess";
import Admin from "./Components/pages/Admin";
import { useEffect,useContext } from "react";
import jwt_decode from 'jwt-decode';
import { UserContext } from "./Context/UserContext";
import 'chart.js';
import 'react-chartjs-2';
import AdminLogin from "./Components/pages/AdminLogin";



function App() {

  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      const decodedToken = jwt_decode(token);
      const {verifieduser} = decodedToken;
      setUserData(verifieduser);
    }
    // eslint-disable-next-line 
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar/> 
      </div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<SignIn/>}></Route>
        <Route path="/signup" element={<Register/>}></Route>
        <Route path="/product" element={<ProductView/>}></Route>
        <Route path='/productview' element={<Product/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/success' element={<Sucess/>}></Route>
        <Route path='/admin/dashboard' element={<Admin/>}></Route>
        <Route path='/admin/sell' element={<Sell/>}></Route>
        <Route path ='/admin/login' element={<AdminLogin/>}></Route>
      </Routes>
    </Router>
  );
}
export default App;
