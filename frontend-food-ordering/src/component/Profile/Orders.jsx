import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersOrders } from '../State/Order/Action';

const Orders = () => {
  const { auth, cart, order } = useSelector(store => store);
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [auth.jwt, dispatch, jwt]);

  const handleOrderCardClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
        {order.orders.map((order) => order.items.map((item) => (
          <OrderCard
            key={item.id} // Assuming each item has a unique id
            order={order}
            item={item}
            onClick={() => handleOrderCardClick(item)}
          />
        )))}
      </div>
      {selectedItem && (
        <div className="modal" style={{
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className="modal-content" style={{
  backgroundColor: '#fefefe',
  padding: '20px',
  borderRadius: '5px',
  color: '#000'
}}>
  <p className='modal-content p' style={{ marginBottom: '10px' }}>
    Date: {new Date(selectedItem.food.creationDate).toLocaleDateString('en-GB')}
  </p>
  <p className='modal-content p' style={{ marginBottom: '10px' }}>
    Hour: {new Date(selectedItem.food.creationDate).toLocaleTimeString('en-US')}
  </p>
  <p className='modal-content p' style={{ marginBottom: '10px' }}>
    Quantity: {selectedItem.quantity}
  </p>
  <p className='modal-content p' style={{ marginBottom: '10px' }}>
    Total Price: {selectedItem.totalPrice}
  </p>
  <button className='close' style={{
    backgroundColor: '#999',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer'
  }} onClick={() => setSelectedItem(null)}>Close</button>
</div>


        </div>
      )}
    </div>
  );
};

export default Orders;
