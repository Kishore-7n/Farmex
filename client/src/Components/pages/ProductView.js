
import React, { useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react';

import { fetchProducts} from '../../redux/ApiService'

import { Productlist} from '../../redux/ProductSlice'

import { addtocart } from '../../redux/CartSlice'

import ScaleLoader from 'react-spinners/ScaleLoader'

import '../styles/ProductView.css'

import { Link } from 'react-router-dom'

import { Button } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';





export default function ProductView() {

   const products = useSelector(Productlist)
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const initialfetch = async() => {
    const response = await fetch("https://farmex.onrender.com/product",{
      method:'get',
    });
    const fetched_products = await response.json();
    setproductarray(fetched_products)
   }
   
  const[productarray,setproductarray] = useState(products)

  const [loading,setloading] = useState(true)

  const[category,setcategory] = useState("AllCategories");

  const[filtertext,setfiltertext] = useState("")

  useEffect(()=> {
    // eslint-disable-next-line
    setloading(true)
    setTimeout(()=>{
      setloading(false)
    },500) 

  },[])

  useEffect(()=>{
    // eslint-disable-next-line
    initialfetch()
    dispatch(fetchProducts())
    // eslint-disable-next-line
},[]) 



 

  const handleaddtocart = (cartproduct)  => {

    dispatch(addtocart(cartproduct))

    notify(cartproduct.ProductName);


  }

  const notify = (productname) => {
    toast.success(productname +" is added to cart", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  
  }



  
  const handlesearchBycategory = (category) => {
      

      if(category === "AllCategories")
      {
        setproductarray(products)
      }
      else{
        const filteredProducts = products.filter(product => product.Category === category);
        setproductarray(filteredProducts);
      }
    
  }


  const handlebyname = (productname) => {
    const filteredProducts = products.filter((product) => {
      const values = Object.values(product).join(' ').toLowerCase();
      let something = values.includes(productname.toLowerCase());
      return something
    })

    setproductarray(filteredProducts)
    
  }

  useEffect(()=>{
    handlebyname(filtertext)
    // eslint-disable-next-line
  },[filtertext])

  

  useEffect(()=>{
    handlesearchBycategory(category)
    // eslint-disable-next-line
  },[category])
  
  

 


    return(
      <>
      {loading ? (
      <ScaleLoader
        color="#36d7b7" 
            width={10}
            height={40}
            radius={9}
            margin={10}
            cssOverride={{display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"300px"}}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        ):
      (
      <>
        <div className='search-container'>
              <select className='sellfield2' onChange={(e)=>setcategory(e.target.value)} value={category}>
              <option value="AllCategories">All Category</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Seafood">Seafood</option>
              <option value="GrainsandCereals">Grains and Cereals</option>
              <option value="BakedGoods">Baked Goods</option>
              <option value="Beverages">Beverages</option>
              <option value="FrozenFoods">Frozen Foods</option>
              <option value="Snacks">Snacks</option>
              <option value="Fruits">Fruits</option>                   
              <option value="Vegetables">Vegetables</option> 
              <option value="Spices">Spices</option> 
              </select>
            <input type='search' placeholder='search the item'  value={filtertext} onChange={(e)=>setfiltertext(e.target.value)}></input>
            <Button variant="contained"  onClick={() => navigate('/cart')} sx={{width:130,height:45,borderRadius:2}}> cart
                  <AddShoppingCartIcon sx={{margin:"5px"}} />
            </Button>
        </div>
        <div className='flex-container'>
          {productarray && productarray.map((data)=>(
            <div className='flex-box' key={data._id}>
              <Link  to='/productview' state={data}><img src={data.Image.url}alt='SampleImage'></img></Link>
              <h5 className='product-name'>{data.ProductName}</h5>
              <div className='product-price-cart'>
              <h5 className='product-price'> &#x20B9; {data.Price}</h5>
                <Button variant="contained"  onClick={() => handleaddtocart(data)}>Add to cart
                  <AddShoppingCartIcon sx={{margin:"5px"}} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        <ToastContainer />
      </>
        )}
    </>
    )
}