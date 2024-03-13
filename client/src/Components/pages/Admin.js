

import React, { useState } from 'react'
import '../styles/Admin.css'
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TaskIcon from '@mui/icons-material/Task';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect } from 'react';
import {  Doughnut } from 'react-chartjs-2';
import { Line } from "react-chartjs-2";
import {CategoryScale,LinearScale,PointElement,LineElement} from 'chart.js'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';




import {Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js'


  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  )

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));



function Admin() {

  const linedata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Monthlywise Orders",
        data: [33, 53, 85, 41, 44, 65, 89, 34, 56, 23, 90, 76],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
    ]
  };
    let navigate = useNavigate();
    const [orders,setorders] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
   
    const handleClose0 = () => {
     setOpen(false);
   };
   
    const handleClickOpen1 = () => {
     setOpen1(true);
   };
   
   const handleClose1 = () => {
     setOpen1(false);
   };

    const Previousorder = async() => {
        const order =  await fetch(`https://farmex.onrender.com/admin/getorders`,
          {
            method:'get',
            mode:'cors',
            headers:{"Content-Type":"application/json"}
          }
        )
      
        const Previousorderresponse = await order.json();
        setorders(Previousorderresponse);
      }


      useEffect(()=>{
        Previousorder()
    },[])
    let categoryarray = [];
for(let i = 0;i<orders.length;i++)
{
    categoryarray.push(orders[i].category);
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

  let netincome = 0;
  for(let i=0;i<orders.length;i++)
  {
    // eslint-disable-next-line
    netincome+= new Number(orders[i].prices);
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='admin-container'>
      <div className='admin-sub-container'>
            <div className='admin-sub-container-appbar'>
                <h5 >Farmex</h5>
                <SearchIcon sx={{color:"white",fontSize:30,margin:"5px"}}/>
                <input type='search' placeholder='search'></input>
                <MarkunreadIcon sx={{color:"white",fontSize:35,margin:"5px",}} onClick={handleClickOpen}/>
                <NotificationsIcon sx={{color:"white",fontSize:35,margin:"5px",}} onClick={handleClickOpen1}/>
                <AccountCircleIcon sx={{color:"white",fontSize:35,margin:"5px",}} onClick={handleClick}/>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Admin Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Add another admin</MenuItem>
                </Menu>
            </div>
            <div className='admin-sub-container-details'>
                <div className='admin-sub-container-tools'>
                    <div className='admin-sub-container-tools-home' onClick={()=>{navigate('/')}}>
                        <HomeIcon sx={{margin:"5px"}}/>
                        Home
                    </div>
                    <div className='admin-sub-container-tools-home'>
                        <LocalOfferIcon sx={{margin:"5px"}}/>
                        Deals
                    </div>
                    <div className='admin-sub-container-tools-home'>
                        <TaskIcon sx={{margin:"5px"}}/>
                        Tasks
                    </div>
                    <div className='admin-sub-container-tools-home'>
                        <AddCircleIcon sx={{margin:"5px"}} onClick={()=>navigate('/admin/sell')}/>
                        Add Product
                    </div>
                    <div className='admin-sub-container-tools-home'>
                        <ArticleIcon sx={{margin:"5px"}}/>
                        Document
                    </div>
                    <div className='admin-sub-container-tools-home'>
                        <SettingsIcon sx={{margin:"5px"}}/>
                        Setting
                    </div>
                    <div className='admin-sub-container-tools-home'>
                        <LogoutIcon sx={{margin:"5px"}} onClick={()=>navigate('/admin/login')}/>
                        Logout
                    </div>
                    <div className='admin-sub-container-tools-home'>
                        <TwitterIcon sx={{margin:"5px"}} onClick={()=>navigate('/')}></TwitterIcon>
                        <FacebookIcon sx={{margin:"5px"}} onClick={()=>navigate('/')}></FacebookIcon>
                        <InstagramIcon sx={{margin:"5px"}} onClick={()=>navigate('/')}></InstagramIcon>
                        <LinkedInIcon sx={{margin:"5px"}} onClick={()=>navigate('/')}></LinkedInIcon>
                    </div>
                </div>
                <div className='admin-sub-container-revenue'>
                    <div className='revenue1'>
                         <h5>Overview</h5>
                        <div className='download'>Download</div>
                        <div className='request'>Request a Report</div>
                    </div>
                    <div className='boxes'>
                        <div className='box1'>
                         Net Income
                         <br/>
                         &#x20B9; {netincome}
                        </div>
                        <div className='box2'>
                        Order per Month
                        <br/>
                        {orders.length}
                        </div>
                        <div className='box3'>
                        Customer Rate
                        <br/>
                        {orders.length/100} %
                        </div>
                        <div className='box4'>
                        Growth Rate
                        <br/>
                        {50} %
                        </div>
                    </div>
                    <div className='charts'>
                        <div className='left'>
                          <Box>
                           <Doughnut data={data}/>
                          </Box>
                        </div>
                        <div className='right'>
                            <Line data={linedata} />
                        </div>
                    </div>
                    <div>
                    <BootstrapDialog
                          onClose={handleClose0}
                          aria-labelledby="customized-dialog-title"
                          open={open}
                        >
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Messages
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose0}
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
                            From Client3 : Meeting regarding the stocks count.
                        </Typography>
                      </DialogContent>
                    </BootstrapDialog>
                    <BootstrapDialog
                          onClose={handleClose1}
                          aria-labelledby="customized-dialog-title"
                          open={open1}
                        >
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Notifications
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
                            From Manager : Submit the annual report by 3.00 PM.
                        </Typography>
                      </DialogContent>
                    </BootstrapDialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin
