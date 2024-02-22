import React from 'react'
import { useState } from 'react';
import '../styles/Sell.css';
import { useDispatch} from 'react-redux';
import { addProduct } from '../../redux/ProductSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, FormControl, InputLabel, Grid,Box,MenuItem } from '@mui/material';


export default function Sell() {

  const[producername,setproducername] = useState()

  const[produceraddress,setproduceraddress] = useState()

  const[producernumber,setproducernumber] =useState()

  const[productname,setproductname] = useState()

  const[category,setcategory] = useState( )

  const[subcategories,setsubcategories] = useState([]);

  let[subcategory,setsubcategory] = useState();

  const[availablequantity,setavailablequantity] = useState()

  const[price,setprice] = useState()

  const[expiry,setexpiry] = useState()

  const [image, setImage] = useState(" ");

  const converttobase = (e) => {
      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = ()=>{
          setImage(reader.result)
      }  
      console.log(reader.result); 
}




  





  const subcategoryoptions = {
    Dairy:["Cow's Milk", "Soy Milk","Paneer","cheese", "Almond Milk","Cheddar", "Mozzarella", "Swiss", "Feta","Greek Yogurt", "Fruit Yogurt", "Plant-Based Yogurt"],
    Meat:["Ground Beef","Mutton", "Steak", "Roast","Chicken Breast", "Chicken Thighs", "Chicken Wings","Pork Chops", "Bacon", "Ham"],
    Seafood:["Salmon", "Tuna", "Cod", "Trout","Shrimp", "Crab", "Lobster", "Mussels"],
    GrainsandCereals:["White Rice", "Brown Rice", "Basmati Rice","pulses", "Wheat", "Pasta", "Flour","Rolled Oats", "Instant Oats", "Oatmeal"],
    BakedGoods:["Whole Wheat Bread", "Sourdough Bread", "Baguette","Croissants", "Muffins", "Donuts", "Danish"],
    Beverages:[ "Cola", "Lemon-Lime", "Root Beer","Arabica", "Robusta", "Espresso","Green Tea", "Black Tea", "Herbal Tea"],
    FrozenFoods:[ "Mixed Vegetables", "Peas", "Corn","Pizza", "Frozen Dinners", "Frozen Burritos"],
    Snacks:[ "Potato Chips", "Tortilla Chips", "Veggie Chips","Almonds", "Cashews", "Peanuts", "Pistachios", "Saltine Crackers", "Wheat Crackers", "Cheese Crackers"],
    Fruits:["Apples", "Bananas", "Oranges", "Grapes","Strawberries"],
    Vegetables:["Potato","Carrots", "Broccoli", "Tomatoes", "Spinach", "Potatoes"],
    Spices:["Turmeric","Cumin","Coriander","Cardamom","Mustard Seeds","Cinnamon","Cloves","Fenugreek","Asafoetida","Red Chili"]
  };

 
  function populateSubcategories(e) {

    setcategory(e.target.value)

    const selectedCategory = e.target.value;

    const subcategories = subcategoryoptions[selectedCategory] || [];

    setsubcategories(subcategories);

    console.log(subcategories);


  }
  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  const handlesell = async (event)=>
  {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/sell',{
      method:'post',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        ProducerName:producername,
        ProducerAddress:produceraddress,
        ProducerNumber:producernumber,
        ProductName:productname,
        Category:category,
        SubCategory:subcategory,
        AvailableQuantity:availablequantity,
        Price:price,
        Image:image,
        Expiry:expiry,
    })
  })


    const added_product = await response.json();   

    if(response.ok){

      console.log("new product created");
     
      dispatch(addProduct(added_product))

      setproducername()
      setproduceraddress()
      setproducernumber()
      setproductname()
      setcategory()
      setsubcategory()
      setavailablequantity()
      setprice()

      navigate('/admin/dashboard')
    }
 }

 const reset = ()=>{
    setproducername()
    setproduceraddress()
    setproducernumber()
    setproductname()
    setcategory()
    setsubcategory()
    setavailablequantity()
    setprice()
 }


return(
  <>
<div className='formdiv'>
  <form  onSubmit={handlesell}> 
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
      <Box marginBottom={2}>
      <TextField
            label="Producer Name"
            name="ProducerName" 
            className='sellfield'
            onChange={(e)=>setproducername(e.target.value)} 
            value={producername}
            autoSave='off'
            autoComplete='off'
            fullWidth
            InputProps={{ disableUnderline: true,
              style: {
                  borderRadius: "10px",
                } }}
          variant='filled'
            required
          />
      </Box>
      <Box marginBottom={2}>
      <TextField
            label="Producer Address"
            autoSave='off'
            className='sellfield'
            autoComplete='off'
            name="ProducerAddress" 
            onChange={(e)=>setproduceraddress(e.target.value)}
            value={produceraddress} 
            fullWidth
            InputProps={{ disableUnderline: true,
              style: {
                  borderRadius: "10px",
                } }}
          variant='filled'
            required
          />
      </Box>
      <Box marginBottom={2}>
        <TextField
        label = "Producer Number"
        autoSave='off'
        className='sellfield'
        type='number'
        autoComplete='off'
        name="ProducerNumber"
        onChange={(e)=> setproducernumber(e.target.value)}
        value={producernumber} 
        InputProps={{ disableUnderline: true,
          style: {
              borderRadius: "10px",
            } }}
      variant='filled'
        fullWidth
        required
        />
      </Box>
      <Box marginBottom={2}>
        <TextField
          label = "Product Name"
          autoSave='off'
          className='sellfield'
          autoComplete='off'
          name="ProductName" 
          value={productname} 
          onChange={(e)=>setproductname(e.target.value)}
          fullWidth
          InputProps={{ disableUnderline: true,
            style: {
                borderRadius: "10px",
              } }}
          variant='filled'
          required
          />
        </Box>
      <Box marginBottom={2}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
             labelId="demo-simple-select-label"
             name="Category" 
             className='sellfield'
              label="Category"
              id="category" 
              onChange={populateSubcategories}
              value={category}
              required
              variant='outlined'
            >
              <MenuItem value="Dairy">Dairy</MenuItem>
              <MenuItem value="Meat">Meat</MenuItem>
              <MenuItem value="Seafood">Seafood</MenuItem>
              <MenuItem value="GrainsandCereals">Grains and Cereals</MenuItem>
              <MenuItem value="BakedGoods">Baked Goods</MenuItem>
              <MenuItem value="Beverages">Beverages</MenuItem>
              <MenuItem value="FrozenFoods">Frozen Foods</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
              <MenuItem value="Fruits">Fruits</MenuItem>                   
              <MenuItem value="Vegetables">Vegetables</MenuItem> 
              <MenuItem value="Spices">Spices</MenuItem> 
            </Select>
          </FormControl>
          </Box>
    </Grid>
    
        <Grid item xs={12} sm={6}>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
            <Select
             labelId="demo-simple-select-label" 
              label="Sub-Category"
              className='sellfield'
              id="subcategory" 
              name="SubCategory" 
              onChange={(e)=>setsubcategory(e.target.value)}
              value={subcategory}
              required
            >
               {subcategories.map((subcat) => (
            <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </Box>
        
          <Box marginBottom={2}>
            <TextField
            label = "Available Quantity"
            className='sellfield'
            autoSave='off'
            autoComplete='off'
            name="AvailableQuantity" 
            value={availablequantity} 
            type='text'
            InputProps={{ disableUnderline: true,
              style: {
                  borderRadius: "10px",
                } }}
            variant='filled'
            onChange={(e)=>setavailablequantity(e.target.value)}
            fullWidth
            required
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
            label = "Price"
            className='sellfield'
            autoSave='off'
            autoComplete='off'
            type='number'
            name="Price" 
            value={price} 
            onChange={(e)=>setprice(e.target.value)}
            InputProps={{ disableUnderline: true,
              style: {
                  borderRadius: "10px",
                } }}
            variant='filled'
            fullWidth
            required
            />
          </Box>
          <Box marginBottom={2}>
             <TextField
            type="file"
            className='sellfield'
            InputLabelProps={{ shrink:true }}
            name="Image" 
            variant='outlined'
            onChange={e=>converttobase(e)}
            fullWidth
            required
            />
          </Box>
          <Box marginBottom={2}>
              <TextField
              label = "Expiry"
              className='sellfield'
              autoSave='off'
              autoComplete='off'
              name="Expiry" 
              type='text'
              value={expiry} 
              onChange={(e)=>setexpiry(e.target.value)}
              InputProps={{ disableUnderline: true,
                style: {
                    borderRadius: "10px",
                  } }}
              variant='filled'
              fullWidth
              required
              />
          </Box>
      </Grid>
      <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
      </Grid>
      <Grid item xs={12}>
          <Button type="reset" variant="contained" color="error" fullWidth onClick={reset} >
            Cancel
          </Button>
      </Grid>
    </Grid>
  </form>
</div>
</>
)
}
