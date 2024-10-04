import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'





//App Config
const app = express()

const port = process.env.PORT || 4000
connectDB()
connectCloudinary()




//middleware
app.use(cors())
app.use(express.json())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/user/admin', userRouter);
app.use('/api/product',productRouter)

app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)
// app.use('/api/order/admin',orderRouter)










app.get('/',(req,res)=>
{
    res.send("API RUNNING")
}
)
app.listen(port,()=>console.log(`server running on port ${port}`))