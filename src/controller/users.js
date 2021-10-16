import jwt from 'jsonwebtoken';
import Report from '../models/Report';
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
    email, password, firstName, lastName, phoneNumber
  } = req.body;
  email = email.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();
  phoneNumber = phoneNumber.trim();
  password = password;
  let user = {
    email, password, firstName, lastName, phoneNumber
  };

  let newUser = new User(user);
  const resp = await newUser.save();
  let token = jwt.sign({
    id: resp._id,
  }, SECRET_KEY);
  let history = {
    userId: resp._id
  }
  let newReport = new Report(history);
  await newReport.save();
  return res.status(201).json({
    message: 'user created successfully',
    status: 201,
    token: token
  });
} catch(e){
  return res.status(500).json({
    status: 500,
    error: 'database error'
  });
}
};

/**
     * @method
     * @description Implements signin endpoint
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */

static async signin(req, res) {
  try{
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const user = await User.findOne({ email });
    let token = jwt.sign({
      id: user.id,
    }, SECRET_KEY, { expiresIn: '12h' });
    return res.status(200).json({
      status: 200,
      message:'Login successful.',
      jwToken: token,
      requestToken: user.token
    });
  }catch(e){
    console.log(e)
    return res.status(500).json({
      status: 500,
      error:'database error'
    });
  }
};

/**
     * @method
     * @description Implements editUser endpoint
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */
static async editUser(req, res) {
  try{
  let { email, password, firstName, lastName, phoneNumber } = req.body;
    email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    phoneNumber = phoneNumber.trim();
    password = password;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({
        status: 404,
        message: 'user not found',
    });
    }
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    await user.save();
    return res.status(200).json({
        status: 200,
        message: 'successfully updated your profile',
    });
  } catch(e){
    res.status(500).json({
      status: 500,
      message: err
    })
  }
}

/**
     * @method
     * @description Implements returnSingleuser endpoint
     * @static
     * @param {object} req - query parametr
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */

static async returnSingleUser(req, res) {
    try{
    let { id } = req.query;
      const user = await User.findOne({_id: id});
      if(!user){
        return res.status(404).json({
          status: 404,
          message: 'user not found',
      });
      }
      return res.status(200).json({
        status: 200,
        data: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          requestToken: user.token
        }
    });

    } catch(err){
      res.status(500).json({
        status: 500,
        message: err.message
      })
    }
  }


  /**
     * @method
     * @description Implements returnLoggeduser endpoint
     * @static
     * @param {object} req - query parameter
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */

static async returnLoggedUser(req, res) {
    try{
      let token = req.headers.authorization.split('Bearer ')[1];
const {id} = jwt.verify(token, SECRET_KEY);
      const user = await User.findOne({_id: id});
      if(!user){
        return res.status(404).json({
          status: 404,
          message: 'user not found',
      });
      }
      return res.status(200).json({
        status: 200,
        data: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          requestToken: user.token
        }
    });

    } catch(e){
      res.status(500).json({
        status: 500,
        message: e.message
      })
    }
  }

  /**
     * @method
     * @description Implements signin endpoint
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */

static async addToken(req, res) {
  try{
  //use the user's email
  const {email, token} = req.body;
  const user = await User.findOne({email: email});
  if(user){
    const oldToken = user.token;
    const tokenBody = parseFloat(token);
    const newToken = oldToken + tokenBody;
    user.token = newToken;
    const resp = await user.save();
    return res.status(200).json({
      status: 200,
      message: 'Token successfully added',
      data: resp.token
  });
  } else{
    return res.status(404).json({
      status: 404,
      message: 'user not found',
  });
  }
}catch(e){
  console.log("err", e)
  return res.status(500).json({
    status: 500,
    message: 'internal server error',
});
}
};

}
