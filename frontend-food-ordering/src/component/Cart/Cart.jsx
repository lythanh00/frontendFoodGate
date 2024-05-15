import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import CartItem from './CartItem';
import AddressCard from './AddressCard';
import { Card, Button, IconButton } from '@mui/material';
import { AddLocation } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Formik, Field, ErrorMessage, Form } from 'formik';
// import * as Yup from "yup";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon';
import { removeCartItem, updateCartItem } from '../State/Cart/Action';
import Swal from 'sweetalert2';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
};
const initialValues = {
  streetAddress: '',
  state: '',
  pincode: '',
  city: ''
}
// const validationSchema=Yup.object.shape({
//   streetAddress:Yup.string().required('Street address is required'),
//   state:Yup.string().required('State is required'),
//   pincode:Yup.required('Pincode is required'),
//   city:Yup.string().required('City is required')
// })

const Cart = () => {
  const [refreshPage, setRefreshPage] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false); // State để điều khiển việc hiển thị Checkbox
  const location = useLocation();
  const { cart, auth } = useSelector(store => store)
  const [cartTotal, setCartTotal] = useState(cart.cart?.total || 0);
  const [selectedItemId, setSelectedItemId] = useState([]);
  const showToast = (icon, title) => {
    Swal.fire({
      icon: icon,
      title: title,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast',
        backdrop: 'toast-modal-overlay',
        // Inline style for z-index
        popup: 'z-50', // Adjust the value as needed
        backdrop: 'z-40', // Adjust the value as needed
        zIndex: 1500, // Use camelCase notation for z-index
      },
    });
    
  };
  const handleToggleCheckbox = () => {
    setShowCheckbox(!showCheckbox);
  };
  const createOrderUsingSelectedAddress = () => {

  }

  const handleDeleteMultiple = () => {
    if (selectedItemId.length === 0) {
      return;
    }

    Swal.fire({
      title: 'Are you sure to delete the selected foods?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        const jwt = localStorage.getItem('jwt');

        // Dispatch các yêu cầu xóa lần lượt
        selectedItemId.forEach((cartItemId) => {
          dispatch(removeCartItem({ cartItemId, jwt }));
        });

        // Xóa các itemId đã chọn sau khi hoàn thành việc gửi yêu cầu
        setSelectedItemId([]);
        Swal.fire(
          'Deleted!',
          'Your foods has been deleted.',
          'success'
        );
      }
    });

  };
  const handleOpenAddressModal = () => setOpen(true);
  const [open, setOpen] = React.useState(false);


  const dispatch = useDispatch()

  const handleUpdateCart = () => {
    const updatedCartItems = cart.cartItems.map((item) => {
      const updatedItem = { ...item };
      updatedItem.totalPrice = updatedItem.quantity * updatedItem.food.price;
      return updatedItem;
    });

    // Tính lại tổng số tiền cho giỏ hàng
    let newTotal = 0;
    updatedCartItems.forEach((item) => {
      newTotal += item.totalPrice;
    });

    // Cập nhật giỏ hàng và tổng số tiền mới
    dispatch({ type: 'UPDATE_CART_ITEMS', payload: updatedCartItems });
    setCartTotal(newTotal);
  };
  useEffect(() => {
    handleUpdateCart();
  }, [cart.cartItems]);
  useEffect(() => {
    if (location.pathname === '/cart') {
      setRefreshPage(prevState => !prevState);
    }
  }, [location.pathname]);

  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    showToast('success', 'Please wait a few minutes!');
    const data = {
      jwt: localStorage.getItem('jwt'),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: 'india'
        }
      }
    }
    dispatch(createOrder(data))
    console.log('form value', values)
    const newTotalPay = cart.cart?.total + 33 + 21;
    setCartTotal(newTotalPay);
    
  }
  return (
    <>
      <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          <div className="flex justify-between items-center">
            <div className='text-left font-semibold text-2xl cursor-pointer' onClick={handleToggleCheckbox}>
              Select
            </div>
            {showCheckbox && (
              <IconButton color='primary'>
                <DeleteIcon onClick={handleDeleteMultiple} />
              </IconButton>
            )
            }
          </div>



          {cart.cartItems.map((item) => (
            <CartItem
              item={item}
              onUpdateCart={handleUpdateCart}
              showCheckbox={showCheckbox}
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
            />
          ))}
          <Divider />
          <div className='billlDetails px-5 text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-400'>
                <p>Item Total</p>
                <p>${cartTotal}</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Deliver Fee</p>
                <p>$21</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>GST and Restaurant Charges</p>
                <p>$33</p>
              </div>
              <Divider />
              <div className='flex justify-between text-gray-400'>
                <p>Total Pay</p>
                <p>${cartTotal + 33 + 21}</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation='vertical' flexItem />
        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10' >Choose Delivery Address</h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {[1, 1, 1, 1, 1].map((item) => <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />)}
              <Card className='flex gap-5 w-64 p-5'>
                <AddLocation />
                <div className='space-y-3 text-gray-500'>
                  <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                  <Button variant='outlined' fullWidth onClick={handleOpenAddressModal} >Add</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          outline: "none",
          boxShadow: 24,
          p: 4,
          zIndex: 2, // Adjust the value as needed
        }}
      >
        <Box sx={style}>
          <Formik initialValues={initialValues}
            // validationSchema={validationSchema} 
            onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name='streetAddress'
                    label='Street Address'
                    fullWidth
                    variant='outlined'
                  // error={!ErrorMessage('streetAddress')}
                  // helperText={
                  //   <ErrorMessage>
                  //     {(msg)=><span className='text-red-600'>{msg}</span>}
                  //   </ErrorMessage>
                  // }
                  />

                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name='state'
                    label='state'
                    fullWidth
                    variant='outlined'
                  // error={!ErrorMessage('streetAddress')}
                  // helperText={
                  //   <ErrorMessage>
                  //     {(msg)=><span className='text-red-600'>{msg}</span>}
                  //   </ErrorMessage>
                  // }
                  />

                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name='city'
                    label='city'
                    fullWidth
                    variant='outlined'
                  // error={!ErrorMessage('streetAddress')}
                  // helperText={
                  //   <ErrorMessage>
                  //     {(msg)=><span className='text-red-600'>{msg}</span>}
                  //   </ErrorMessage>
                  // }
                  />

                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name='pincode'
                    label='pincode'
                    fullWidth
                    variant='outlined'
                  // error={!ErrorMessage('streetAddress')}
                  // helperText={
                  //   <ErrorMessage>
                  //     {(msg)=><span className='text-red-600'>{msg}</span>}
                  //   </ErrorMessage>
                  // }
                  />

                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant='contained' type='submit' color='primary'>Deliver Here</Button>
                </Grid>

              </Grid>
            </Form>


          </Formik>
        </Box>
      </Modal>
    </>
  )
}

export default Cart
