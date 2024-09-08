import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

//login user

const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const createToken=(id)=>{
     return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });

    // check if user already exists or not
    if (exists) {
      return res.json({ success: false, message: "email already used" });
    }

    //validating email and strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }
    
    //hashing user password

    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt)
    const newUser= new userModel({name,email,password: hashedPassword})

    const user= await newUser.save();
    const token= createToken(user._id);
    
    return res.json({success:true, token});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
  }
};

export { loginUser, registerUser };
