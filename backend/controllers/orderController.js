// placing order using cod method

import orderModel from "../models/oderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// const placeOrder = async (req, res) => {
//   try {
//       const { userId, items, amount, address } = req.body;

//       // Ensure each item contains all the necessary fields
//       const orderData = {
//           userId,
//           items: items.map(item => ({
//               name: item.name,
//               price: item.price,
//               image: item.image,
//               quantity: item.quantity,
//               size: item.size,
//           })),
//           amount,
//           address,
//           paymentMethod: 'cod', // Example: Cash on Delivery
//           payment: false,
//           date: Date.now(),
//       };

//       const newOrder = new orderModel(orderData);
//       await newOrder.save();
//       res.json({ success: true, message: "Order placed", newOrder });
//   } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: error.message });
//   }
// };

//placing order using stripe payment
const placeOrderStripe = async (req, res) => {};

//placing order using razorpay
const placeOrderRazorpay = async (req, res) => {};

// All order data for admin pannel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    // let allOrdersData = [];

    // orders.map((order) => {
    //   order.items.map((item) => {
    //     allOrdersData.push({
    //       ...item,
    //       status: order.status,
    //       payment: order.payment,
    //       paymentMethod: order.paymentMethod,
    //       date: order.date,
    //     });
    //   });
    // });
    // res.json({ success: true, allOrdersData });


    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    // let mappedOrder = [];
    // orders.map((item, idx) => {
    //   item.items.map((e) => {
 
    //     mappedOrder.push({
    //       ...e,
    //       status: item.status,
    //       payment: item.payment,
    //       paymentMethod: item.paymentMethod,
    //       date: item.date,
    //     });
    //   });
    // });
    // console.log('========>',mappedOrder)

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order status from admin pannel
const updateStatus = async (req, res) => {

  try{
    const {orderId,status}=req.body
    await orderModel.findByIdAndUpdate(orderId,{status})

    res.json({success:true, message:"Status updated"})

  }catch(error){
    console.log(error)
    res.json({ success: false, message: error.message })

  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
