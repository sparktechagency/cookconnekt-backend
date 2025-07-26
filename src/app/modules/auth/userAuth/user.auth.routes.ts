import express from 'express';
import userAuthController from './user.auth.controller';
import requestValidator from '../../../middlewares/request.validator';
import userAuthZodValidation from './user.auth.zod.validation';

const userAuthRouter = express.Router();

// outlet also can be login using the route
userAuthRouter.post('/login', requestValidator(userAuthZodValidation.loginValidationSchema),userAuthController.userLogin);

// route for resend email verification code
userAuthRouter.post('/email-verification/resend-code', userAuthController.resendEmailVerificationCode);

// route for user email verify
userAuthRouter.post('/verify-email', userAuthController.userEmailVerify);

// route for send password reset OTP
userAuthRouter.post('/forget-password/send-otp', userAuthController.sendOTP);

// route for verify OTP
userAuthRouter.post('/verify-otp', userAuthController.verifyOTP);

// route for reset password
userAuthRouter.post('/reset-password', requestValidator(userAuthZodValidation.resetPasswordValidationSchema), userAuthController.resetPassword);

// route for change password
userAuthRouter.post('/change-password', requestValidator(userAuthZodValidation.changePasswordValidationSchema), userAuthController.changePassword);

// route for user stability (get new accesstoken)
userAuthRouter.post('/refresh-token', userAuthController.getAccessTokenByRefreshToken);


export default userAuthRouter;
