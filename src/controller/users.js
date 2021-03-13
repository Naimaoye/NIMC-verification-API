import jwt from 'jsonwebtoken';
import User from '../models/User';
import { SECRET_KEY } from '../config/config';



export default class UserController {
/**
     * @method
     * @description Implements signup endpoint
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */
static async signup(req, res) {
  try{
let {
    email, password
  } = req.body;
  email = email.trim();
  password = password;
  let user = {
    email, password
  };
   
  let newUser = new User(user);
  await newUser.save();
  return res.status(201).json({
    message: 'user created successfully',
    status: 201, 
    data: { ...user }
  });
} catch(e){
  return res.status(500).json({
    status: 500, 
    error: 'database error'
  });
}
};

static async signin(req, res) {
  try{
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const user = await User.findOne({ email });
    let token = jwt.sign({
      id: user.id,
    }, SECRET_KEY, { expiresIn: '5h' });
    return res.status(200).json({
      status: 200, 
      message:'Login successful.', 
      jwToken: token,
      requestToken: user.token
    });
  }catch(e){
    return res.status(500).json({
      status: 500, 
      error:'database error'
    });
  }
};

static async editUser(req, res) {
  try{
  let { email, password } = req.body;
    email = email.trim();
    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({
        status: 404,
        message: 'user not found',
    });
    }
    user.email = email;
    user.password = password;
    await user.save();
    return res.status(200).json({
        status: 200,
        message: 'successfully updated your password',
    });
  } catch(e){
    res.status(500).json({
      status: 500,
      message: err
    })
  }
}
}
