import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const key = process.env.SECRET_KEY
class Authentication {

    static async verifyToken(req, res, next){
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        return next();
      } catch (err) {
        return res.status(403).json({
            status: 403, 
            message: 'Invalid/Expired token, make sure you are loggedIn'
    });
      }
    }
    return res.status(403).json({
        status: 403, 
        message: 'Authentication token must be Bearer [token]'
    });
  }
  return res.status(403).json({
    status: 403, 
    message: 'Authorization header must be provided'
    });
};

}

export default Authentication;