import React, { useEffect, useState } from 'react';
import img1 from 'assets/image/BAG 2.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import store from 'rtk/store/store';
import { addCartActions } from 'rtk/feature/addCart';
import { Checkbox } from '@mui/material';
import cartHook from 'hooks/cartHook';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Cart = () => {
  const initialItems = () => {
    const localStorageData = localStorage.getItem('checkCart');
    if (!localStorageData) {
      return []
    }
    else {
      return JSON.parse(localStorageData)
    }
  }
  const [checkOut, setCheckOut] = useState(initialItems)
  useEffect(() => {
    localStorage.setItem("checkCart", JSON.stringify(checkOut))
  }, [checkOut])
  const cart = useSelector(state => state.reducer.cart);
  
  const { addToCartHandle, removeFromCartHandle } = cartHook();

  useEffect(() => {
    localStorage.setItem("newcart", JSON.stringify(cart.items))
  }, [cart.items])

  const addCheckOut = (item) => {
    const findItem = checkOut?.find(i => i?._id == item?._id);
    if (findItem?._id) {
      const filterItem = checkOut.filter(item => item._id !== findItem._id)
      setCheckOut(filterItem)
    }
    else {
      setCheckOut(prevState => [...prevState, item]);
    }
    // setCheckOut(prevState => [...prevState, item]);  
  }
  // console.log(checkOut);
 
  const addToCartHandleItems = async(item)=>{
   await addToCartHandle(item);
    
    const isCheck = checkOut.some(items=>items?._id==item?._id)
    if(isCheck){
       const checks = checkOut.filter(items=>items?._id!==item._id);
       const fillData = cart?.items?.filter(carts=>carts?._id==item?._id)
        
       setCheckOut([...checks])
       console.log(checkOut);
    }
 
  }
  const sum = checkOut.reduce((accumulator, current) => accumulator + current?.price * current?.quantity, 0);
  const newIds = []
  const idArray = checkOut.map(item => item._id);
  newIds.push(idArray)
 
  return (
    <div className='container-sk mt-52 mb-7'>
      <h1 className='text-center shadow-lg py-5 text-6xl font-sans font-bold uppercase leading-10 rounded-lg'>your cart</h1>
      <hr className='h-[1px] bg-gray-300 my-7' />
      <div className='grid md:grid-cols-3 gap-x-4 justify-center '>
        <div className='col-span-2'>
          <div className='flex justify-around bg-black text-white rounded-lg py-3 font-sans font-semibold text-xl leading-6 capitalize mb-7'>
            <button>items</button>
            <button>details</button>
            <button>quantity</button>
          </div>
          {
            cart?.items?.map((item, index) => <div className='grid grid-cols-3 shadow-lg rounded-lg p-5 gap-4 my-5' key={index}>
              <div>
                <img src={img1} alt='loading...' className='object-contain rounded-l-lg' />
              </div>
              <div className='col-span-2 flex flex-col justify-between'>
                <div className='flex justify-between'>
                  <h1 className='text-xl font-arial font-normal leading-5'>
                    {item?.name}
                  </h1>

                  <Checkbox {...label} onChange={() => addCheckOut(item)} checked={checkOut.some((checkoutItem) => checkoutItem._id === item._id)} color="primary" />
                </div>
                <h2 className='font-sans font-semibold text-xl'>€{item?.price}</h2>

                <p className='flex justify-between  text-base font-normal'>
                  <span className=' '>Order Total ( Includes V.A.T )</span>
                  <span className='bg-black text-white font-sans font-semibold text-xl rounded-lg py-1'>
                    <button className='pr-5 pl-2 text-2xl' onClick={() => removeFromCartHandle(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className='pl-5 pr-2 text-2xl' onClick={() => addToCartHandleItems(item)} >+</button>
                  </span>
                </p>
              </div>
            </div>)
          }
        </div>
        <div>
          <div className='shadow-lg font-sans p-5 rounded-lg'>
            <h2 className='my-7 font-semibold text-4xl'>Cart Totals</h2>
            <p className='flex justify-between font-light'>
              <span className='block text-base'>Subtotal ( Includes V.A.T )</span>
              <span className='font-normal text-xl block'>€229.00</span>
            </p>
            <hr className='h-[1px] bg-gray-300 my-7' />
            <h2 className='text-xl font-semibold'>Shipping</h2>
            <p className='block text-base my-7'>Estimate shipping costs after checkout</p>

            <p className='flex justify-between font-light mb-7'>
              <span className='block text-base'>Order Total ( Includes V.A.T )</span>
              <span className='font-normal text-xl block'>€{sum}</span>
            </p>
          </div>
          <div className='text-center my-5'>
            <button className='font-semibold font-sans text-xl w-full bg-black text-white rounded-lg py-4 text-center hover:bg-black8'> <ShoppingCartOutlinedIcon /> GO TO CHECKOUT({checkOut?.length}) <ShoppingCartOutlinedIcon /></button>
          </div>
          <div className='text-center mb-5'>
            <button className='font-semibold font-sans text-xl w-full shadow-lg text-black rounded-lg py-4 text-center hover:bg-black8 flex items-center justify-center'> <BiSolidShoppingBags /> <span className='mx-2 capitalize'> continue shopping </span><BiSolidShoppingBags /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;