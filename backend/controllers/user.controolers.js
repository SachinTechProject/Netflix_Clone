import { User } from "../models/user.Model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function Register(req,res){
    try {
        const {username,email,password} = req.body
        if(!username || !email || !password){
           
          return res.status(401).send({
                success:false,
                message:"Fill all fields"
            })
        }
        const existinguser = await User.findOne({email})
        if(existinguser){
          
          return  res.status(401).send({
                success:false,
                message:"This email is aleardy exist"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);
       const user =  await User.create({
            username,
            email,
            password: hashPassword 
        })
        // await user.save()
        return  res.status(201).json({
            success:true,
            message:"New User Created succesfully",
            user
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error nn Register callback",
            success:false,
            error
         })
    }
}


export async function Login(req,res) {
     try{
         const {email,password} = req.body
         if(!email || !password){
          return res.status(401).send({
                success:false,
                message:"Invalid data"
            })
         }

         const user =  await User.findOne({email})

         if(!user){
            return res.status(401).send({
                success:false,
                message:"Invalid email or password"
            })
         }

         const ismatchPassword = await bcrypt.compare(password, user.password)
         if(!ismatchPassword){
            return res.status(401).send({
                success:false,
                message:"Invalid email or password"
            })
         }
           const tokenData = {
             id:user._id
           }
         const token = await jwt.sign(tokenData,"kabsbhjabsbjsbdcbd",{expiresIn:"1d"});
         return res.status(200).cookie("token",token,{httpOnly:true}).json({
            message:`wellcome back ${user.username } `,
            success:true,
            user
         })

     }catch(error){
        console.log(error)
         return res.status(500).send({
            success:false,
            message:"User not found pleace Register",
            error
        })
     }
}  


export function Logout (req,res){
   try{
      return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
        message:"user logged out successfully",
        success:true
      })
   }catch(error){
    console.log(error)
    return res.status(500).send({
       success:false,
       message:"user not loggout plece try again",
       error
   })
   }
}    