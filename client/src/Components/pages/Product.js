import React from 'react'


import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { addtocart } from '../../redux/CartSlice';

import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import DialogContent from '@mui/material/DialogContent';

import DialogActions from '@mui/material/DialogActions';

import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';

import '../styles/Product.css';
import { Button } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Product(props) {
    const location = useLocation();
    const productdata = location.state
    const dispatch = useDispatch()
    const handletocart = () => {
          dispatch(addtocart(productdata))
    }

  const [open, setOpen] = React.useState(false);

  const [open1, setOpen1] = React.useState(false);

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
  return (
  <div className='product-detail'>
    <div className='product-detail-grid'>
      <div className='product-detail-grid-image'>
        <img src={productdata.Image.url} alt='sampleimage'></img>
        <h5>{productdata.ProductName}</h5>
      </div>
      <span className='product-detail-inter'></span>
      <div className='product-detail-grid-other'>
        <div className='product-detail-grid-other-productdetails'>
          <Button variant='contained' onClick={handleClickOpen} sx={{width:200,mb:5}}>Product details</Button>
          <Button variant='contained' onClick={handleClickOpen1} sx={{width:200,mb:5}}>
              Producer details
          </Button>
          <Button onClick={handletocart} variant='contained' sx={{width:200}}>Add to cart</Button>
        </div>
        <div>
            <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
               Product Details
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
                Availabe Quantity:{productdata.AvailableQuantity}
              </Typography>
              <Typography gutterBottom>
                Price: &#x20B9; {productdata.Price}
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
                   Producer details
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
                     ProducerName:{productdata.ProducerName}
                  </Typography>
                  <Typography gutterBottom>
                     ProducerAddress:{productdata.ProducerAddress}
                  </Typography>
                  <Typography>
                    PhoneNumber:{productdata.ProducerNumber}
                  </Typography>
                </DialogContent>
              </BootstrapDialog>
        </div>
      </div>
    </div>
  </div>
  )
}
