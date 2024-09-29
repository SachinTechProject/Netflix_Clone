// step 1 create server
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import databaseConnection from './utils/database.utils.js';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.route.js"
dotenv.config({
    path:"./.env"
})
databaseConnection()



const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const corsoption ={
    origin:'http://localhost:3000',
    credentials:true
}
    
app.use(cors(corsoption))
app.use(cookieParser())

// app.get("/",(req,res)=>{
//     res.send("hello world")
//     res.end
// })

app.use('/api/v1/user',userRoute)

app.listen(process.env.PORT, ()=>{
  
    console.log(`Server start to ${process.env.PORT}`)
})