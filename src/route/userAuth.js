import express from 'express';
import UserController from '../controller/users';
import userValidations from '../middleware/user-validation';

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
      '/edit/password',
      userValidations.validateUser('edit'),
      UserController.editUser);

      export default userRoute; 