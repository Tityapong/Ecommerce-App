import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Card = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('ShopContext is not being provided');
  }

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {


    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({ _id: items, size: item, quantity: cartItems[items][item] });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div>
      <div className='border-t pt-14'>
        <div className='text-2xl mb-3'>
          <Title text1={"YOUR"} text2={"CART"} />
        </div>
        <div>
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              // if (productData) {
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img src={productData.image[0]} className='w-16 sm:w-20' alt='' />
                    <div>
                      <p className='text-xs font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p className='text-sm font-medium'>{currency}{productData.price}</p>
                        <p className=' px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>

                      </div>
                    </div>
                  </div>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className=' border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className='cursor-pointer  w-4 mr-4 sm:w-5 ' src={assets.bin_icon} alt="" />
                </div>
              );
              // } else {
              //   return null;
              // }
            })
          )
            : (
              <p>No items in cart</p>
            )}
        </div>

        <div className=' flex justify-end my-20'>
          <div className=' w-full sm:w-1/3'>
            <CartTotal />

            <div className=' w-full text-end'>
              <button onClick={() => navigate('/place-order')} className=' bg-orange-500 text-white my-8 px-8 py-3'>CHECK OUT</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;