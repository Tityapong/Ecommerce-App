import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Function to load orders from the API
  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      console.log(response.data);

      if (response.data.success) {
        let allOrdersItem = [];
        console.log(response.data.mappedOrder);

        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });

        // console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse());

        // console.log(response.data.orders[0]);
      }
      // setOrderData(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  // Load orders when the component mounts or token changes
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orderData.map((item, index) => {
            //  console.log(item[0].image);
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img
                    className="w-16 sm:w-20"
                    src={item.image[0]}
                    alt={item.name || "Product Image"}
                  />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}
                        {item.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="mt-1">
                      Date:
                      <span className="text-gray-400">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>

                    <p className="mt-1">
                      Payment :
                      <span className="text-gray-400">
                        {item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-orange-500"> </p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="border px-4 py-2 text-sm font-medium rounded-sm"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
