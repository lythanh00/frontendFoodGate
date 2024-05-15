import React from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, updateCartItem } from '../State/Cart/Action';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon';
import { useNavigate } from 'react-router-dom';


const CartItem = ({ item, onUpdateCart }) => {
    const navigate = useNavigate()
    const handleNavigateToRestaurant = (item) => {
        navigate(`../restaurant/${item.address.city}/${item.name}/${item.id}`)
    }
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const handleRemoveCartItem = (itemId) => {
        Swal.fire({
            title: 'Are you sure to delete food?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(removeCartItem({ cartItemId: itemId, jwt: auth.jwt || jwt }));
                onUpdateCart();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            }
        });
    };
    const handleUpdateCartItem = value => {
        if (value === -1 && item.quantity === 1) {
            Swal.fire({
                title: 'Are you sure to delete food?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(result => {
                if (result.isConfirmed) {
                    dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
                    onUpdateCart();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                }
            });
        } else {
            const data = { cartItemId: item.id, quantity: item.quantity + value };
            dispatch(updateCartItem({ data, jwt }));
            onUpdateCart();
        }
    };

    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img
                        className='w-[5rem] h-[5rem] object-cover cursor-pointer'
                        src={item.food.images[0]}
                        alt=''
                        onClick={() => handleNavigateToRestaurant(item.food.restaurant)}
                    />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p className='cursor-pointer' onClick={() => handleNavigateToRestaurant(item.food.restaurant)}>{item.food.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    {item.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                            <p className="ml-3" >${item.totalPrice}</p>
                        </div>
                    </div>
                    <div className="flex items-end justify-end w-full">
                        <div className="flex flex-col items-end">
                            <IconButton color='primary' onClick={() => handleRemoveCartItem(item.id)}>
                                <DeleteIcon />
                            </IconButton>

                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-3 space-x-2'>
                {item.ingredients.map((ingredient, index) => (
                    <Chip key={index} label={ingredient} />
                ))}
            </div>
        </div>
    );
};

export default CartItem;
