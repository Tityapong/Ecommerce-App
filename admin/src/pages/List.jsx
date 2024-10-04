import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct= async(id)=>{
    try{
      const response= await axios.post(backendUrl + "/api/product/remove",{id}, {headers:{token}})

      if(response.data.success){
        toast.success(response.data.message) 
        await fetchList(); 
      }
      else{
        toast.error(response.data.message)
      }
    
    }
    catch(error){
      console.log(error)

      toast.error(error.message)

    }

  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="b-2">
        All Products list
      </p>
      {/* list table title */}

      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <img className=' w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className=' text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;