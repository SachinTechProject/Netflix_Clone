import mongoose from "mongoose"

const databaseConnection = async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URL}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       })
       console.log(`conntectd to Mongodb Dtabase ${mongoose.connection.host}`)
    }catch(error){
        console.log(error)
    }
}

export default databaseConnection;