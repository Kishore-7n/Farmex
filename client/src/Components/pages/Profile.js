import React, { useContext,useEffect, useState} from 'react'

import { Box, Button, TextField } from '@mui/material';

import { UserContext } from '../../Context/UserContext';

import AccountCircle from '@mui/icons-material/AccountCircle';

import LocalOffer from '@mui/icons-material/LocalOffer'

import AddIcCall from '@mui/icons-material/AddIcCall'

import Logout from '@mui/icons-material/Logout'

import Add from '@mui/icons-material/Add'

import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import DialogContent from '@mui/material/DialogContent';

import DialogActions from '@mui/material/DialogActions';

import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';

import {useNavigate} from 'react-router-dom';

import { Doughnut } from 'react-chartjs-2';

import '../styles/Profile.css'

import {Pagination} from '@mui/material';

import {Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
)


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Profile() {

 const {userData} = useContext(UserContext);

 const {setUserData} = useContext(UserContext)

 const userid = userData._id;

 const[userpreviousorder,SetuserPreviousorder] = useState([]);

 const [open, setOpen] = React.useState(false);

 const [open1, setOpen1] = React.useState(false);

 const [open2, setOpen2] = React.useState(false);

 const navigate = useNavigate();

let categoryarray = [];
for(let i = 0;i<userpreviousorder.length;i++)
{
    categoryarray.push(userpreviousorder[i].category);
}

const size = 11;
const defaultValue = 0; 

const dataarray = Array.from({ length: size }, () => defaultValue);

const subcategoryKeys = [
  'Dairy',
  'Meat',
  'Seafood',
  'GrainsandCereals',
  'BakedGoods',
  'Beverages',
  'FrozenFoods',
  'Snacks',
  'Fruits',
  'Vegetables',
  'Spices',
];

let count = 0;
for(let i =0;i<subcategoryKeys.length;i++)
{
  for(let j=0;j<categoryarray.length;j++)
  {
    if(subcategoryKeys[i] === categoryarray[j])
    {
      count++;
    }
    
  }
  dataarray[i] = count;
  count = 0;
}


 const data = {
  labels: [
    'Dairy',
    'Meat',
    'Seafood',
    'GrainsandCereals',
    'BakedGoods',
    'Beverages',
    'FrozenFoods',
    'Snacks',
    'Fruits',
    'Vegetables',
    'Spices',
  ],
  datasets: [{
    label: 'Purchased',
    data:dataarray,
    backgroundColor :[
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(255, 159, 64)',
      'rgb(255, 0, 0)',
      'rgb(0, 255, 0)',
      'rgb(0, 0, 255)',
      'rgb(128, 0, 128)',
      'rgb(0, 128, 128)',
      'rgb(128, 128, 0)',
    ],
    hoverOffset: 4,
  }],
};






 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
  setOpen(false);
};

 const handleClickOpen1 = () => {
  setOpen1(true);
};

const handleClose1 = () => {
  setOpen1(false);
};

const handleClickOpen2 = () => {
  setOpen2(true);
};

const handleClose2 = () => {
  setOpen2(false);
};

const handleClickOpen3 = () => {
  localStorage.removeItem('token')
  setUserData(null);
  navigate('/login')
};

const Previousorder = async() => {
  const order =  await fetch(`https://farmex.onrender.com/profile/${userid}`,
    {
      method:'get',
      mode:'cors',
      headers:{"Content-Type":"application/json"}
    }
  )

  const Previousorderresponse = await order.json();
  SetuserPreviousorder(Previousorderresponse);

}

const itemsPerPage = 3;
const [currentPage, setCurrentPage] = useState(1);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = userpreviousorder.slice(indexOfFirstItem, indexOfLastItem);
const handlePageChange = (event, value) => {
  setCurrentPage(value);
};

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '50%',
    height:45,
    width:45
  },
}));

useEffect(()=>{
  if(userid){
    Previousorder()
  }
  // eslint-disable-next-line
},[userid])

  
  return(
    <div>
      {userData ? 
      (<>
      <div className='userdiv-container'>
        <div className='userdiv'>
          <Box className="userdiv-img">
            <img src={userData.image &&   userData.image.url} alt='profile'></img>
            <br/>
            <h5> {userData.Name}</h5>
            <br/>
            <div className='userdiv-details'>
              <div className='userdiv-details-icons'>
               <AccountCircle sx={{margin:"5px",fontSize:30}}/>
               <LocalOffer sx={{margin:"5px",fontSize:30}}/>
               <AddIcCall sx={{margin:"5px",fontSize:30}}/>
               <Logout sx={{margin:"5px",fontSize:30}}/>
              </div>
              <div className='userdiv-details-names'>
                <h5>Personal info</h5>
                <h5>Your Offers</h5>
                <h5>Contact</h5>
                <h5>Logout</h5>
              </div>
              <div className='userdiv-details-adds'>
                 <Add sx={{margin:"5px",fontSize:25}} onClick={handleClickOpen}/>
                 <Add sx={{margin:"5px",fontSize:25}} onClick={handleClickOpen1}/>
                 <Add sx={{margin:"5px",fontSize:25}} onClick={handleClickOpen2}/>
                 <Add sx={{margin:"5px",fontSize:25}} onClick={handleClickOpen3}/>
              </div>
            </div>
          </Box>
        </div>
        <div className='useractivity'>
          <h5>RECENT ORDERS</h5>
        { currentItems && currentItems ? (
          <div className='table-container'>
         <table className='order-table'>
            <thead>
                <tr>
                    <th>PRODUCT</th>
                    <th>PRODUCT NAME</th>
                    <th>PRICE</th>
                    <th>STATUS</th>
                    <th>PURCHASED DATE</th>
                    <th>CATEGORY</th>
                </tr>
            </thead>
            { currentItems && currentItems.map((p)=>
            <tbody key={p._id}>
              <tr>
                  <td><img src={p.images}  width={100} alt='productimage'></img></td>
                  <td>{p.productNames}</td>
                  <td>&#x20B9; {p.prices}</td>
                  <td>{p.paymentStatus}</td>
                  <td>{new Date(p.createdAt).toDateString()}</td>
                  <td>{p.category}</td>
              </tr>
            </tbody>
            )}
        </table>
        <div className='pagination-container'>
            <StyledPagination
                  count={Math.ceil(userpreviousorder.length / itemsPerPage)}
                  page={currentPage}
                  variant="contained"
                  color="primary"
                  onChange={handlePageChange}
                  shape="rounded"
                  className='page' 
             />
          </div>
          </div>

        
        ) : (<h3>loading.....</h3>)

        }
        </div>
    </div>
      </>
      ):
      (<h3>loading.....</h3>)}
      <div className='chart-container'>
        <h4 style={{textAlign:'center',fontFamily:'Roboto'}}>CATEGORYWISE PURCHASED ANALYSIS</h4>
        <div className='chart-subcontainer'>
          <Doughnut data={data}  id="myChart" />
        </div>
      </div>
      <br/>
      <br/>
      <div className='profile-footer-div'>
        <footer>
          <ul>
            <li>Farmex</li>
            <li>Sales</li>
            <li>Support</li>
            <li>Status</li>
            <li>Forums</li>
            <li>Hire an Agency</li>
          </ul>
        </footer>
      </div>
      <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Personal info
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Name : {userData.Name}
          </Typography>
          <Typography gutterBottom>
            Email : {userData.Email}
          </Typography>
          <Typography gutterBottom>
            Address : {userData.Address}
          </Typography>
          <Typography gutterBottom>
            Mobile Number : {userData.PhoneNumber}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
      </div>
      <div>
      <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Your Offers
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose1}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

          <Typography gutterBottom>
          Unlock savings galore! Dive into our exclusive offers and treat yourself to a shopping spree without breaking the bank.
          </Typography>
          <Typography gutterBottom>
             Catch the wave of discounts! Our latest offers are like a high tide of savings – don't let them wash away without grabbing your share!
          </Typography>
          <Typography gutterBottom>
              Get 30% discount on every wednesday purchase !!!
          </Typography>
        </DialogContent>
      </BootstrapDialog>
      </div>
      <div>
      <BootstrapDialog
        onClose={handleClose2}
        aria-labelledby="customized-dialog-title"
        open={open2}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Queries
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose2}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

        <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Any Queries"
            type="text"
            sx={{width:500}}
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email"
            type="email"
            sx={{width:500}}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Send</Button>
          <Button onClick={handleClose2}>Cancel</Button>
        </DialogActions>
      </BootstrapDialog>
      </div>
    </div>
  )
}
