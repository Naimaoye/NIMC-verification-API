import express from 'express';
import UserController from '../controller/users';
import ReportController from '../controller/request';
import userValidations from '../middleware/user-validation';
import Authentication from '../util/checkAuth';

const userRoute = express.Router();

userRoute.post('/signup',
  userValidations.validateUser('signup'),
  userValidations.userExists,
  UserController.signup);

userRoute.post('/signin',
  userValidations.validateUser('signin'),
  userValidations.validateLogin,
  UserController.signin);

userRoute.post(
      '/edit',
      UserController.editUser);

userRoute.get(
        '/user',
        UserController.returnSingleUser);

userRoute.get(
          '/search', Authentication.verifyToken,
          ReportController.searchCandidate
);
  
userRoute.get(
  '/history', Authentication.verifyToken,
  ReportController.returnUserRequestHistory
);

userRoute.post(
  '/addToken',
  UserController.addToken
);   

export default userRoute; 