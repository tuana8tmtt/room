import express from 'express'
import mongoose from 'mongoose';
import productRoute from "./routes/products"
import categoryRoute from './routes/category'
import orderRoute from './routes/order'
import billRoute from './routes/bill'
import furnitureRoute from './routes/furniture'
import notificationRoute from './routes/notification'
import paymentRoute from './routes/payment'
import serviceRoute from './routes/service'
import contractRoute from './routes/contract'
import expenseRoute from './routes/expense'
import revenuaRoute from './routes/revenua'
import userRoute from './routes/user'
import { checkAuth } from './middlewares/checkAuth';
import authRoute from './routes/auth'

const app = express();
import cors from 'cors'


app.use(cors())
app.use(express.json())
app.use("/api", checkAuth, productRoute);
app.use("/api", categoryRoute)
app.use("/api", orderRoute)
app.use("/api", billRoute)
app.use("/api", furnitureRoute)
app.use("/api", notificationRoute)
app.use("/api", paymentRoute)
app.use("/api", serviceRoute)
app.use("/api", expenseRoute)
app.use("/api", revenuaRoute)
app.use("/api", userRoute)
app.use("/api", authRoute)
app.use("/api", checkAuth, contractRoute)

mongoose.connect('mongodb://0.0.0.0:27017/nodejs');

// Bước 3: lắng nghe cổng thực thi
app.listen(8000, () => {
    console.log("Cổng 8000");
});