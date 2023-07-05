import { IUserModel, User } from "../models/user.model";
import { MongoDao } from "../daolayer/mongoDao";
import { SUCCESS } from "../constants/success";
import { ERROR } from "../constants/errors";
import * as bcrypt from "bcrypt";
import { createJwtToken, verifyJwtToken } from "../utils/helper";
import { AnyARecord } from "dns";
import { any } from "joi";
require("dotenv").config();
import crypto from "crypto";

const usersDao = new MongoDao<IUserModel>(User);

export const UsersController = {
  createNewUser: async (req: any, res: any) => {
    try {
      let encryptedPassword = await bcrypt.hash(req.body.password, 10);
      let newUser = req.body;
      newUser.password = encryptedPassword;
      await usersDao.create(newUser);
      res.status(SUCCESS.POST_201.code).json(SUCCESS.POST_201);
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },

  login: async (req: any, res: any) => {
    try {
      let user = await usersDao.findOneByFields({ email: req.body.email });
      if (!user || user.length == 0) {
        return res
          .status(ERROR.USER_DOESNOT_EXISTS.code)
          .send(ERROR.USER_DOESNOT_EXISTS);
      }
      let passwordMatched = await bcrypt.compare(
        req.body.password,
        <string>user[0].password
      );
      if (!passwordMatched) {
        return res
          .status(ERROR.INCORRECT_PASSWORD.code)
          .send(ERROR.INCORRECT_PASSWORD);
      }
      let signedToken = await createJwtToken({
        id: user[0]._id,
        userName: user[0].userName,
        email: user[0].email,
        // role: user[0].role,
        password: user[0].password,
      });
      return res
        .status(SUCCESS.LOGIN_SUCCESSFULL.code)
        .json({ token: signedToken });
    } catch (err: any) {
      console.log(err)
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  }
};
  // getUserById: async(req:any,res:any)=>{
  //   try{
  //     let id = req.params["id"];
  //     let data = await usersDao.findOne(id);
  //     if(data ){
  //       res.status(SUCCESS.GET_200.code).json({result:data});
  //     }
  //   }
  //     catch(err:any){
  //       res
  //     .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
  //       .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
  //     }
  //   },
  // forgotPassword:async(req:any,res:any)=>{
  //   let email = req.body.email;
  //   let user = await usersDao.findOne(email);
  //   // const userTo = new User({ username:any, email,password:any })
  //   if(!user){
  //     console.log("email could not be sent");
  //   }

  //   let resetToken =await usersDao.getResetPasswordToken(email);
  //   console.log(resetToken);
  //   const resetUrl = `http://localhost:8000/passwordReset/${resetToken}`
  //   const message = `
  //   <h1>You have requested for password reset</h1>
  //   <p>pls go to this link to reset your password</p>
  //   <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  //   `
  //   await sendEmail({
  //         to: req.body.email,
  //         subject: "Password reset request",
  //         text: message
  //     })
  //   }

  //   forgotPassword1 : async(req:any,res:any)=>{
  //     let email = req.body.email;
  //     let userToBeSearch = await usersDao.findOne(email);
  //     if(userToBeSearch || userToBeSearch != null){

  //     }

  //   }

  // resetPassword : async (req:any, res:any) => {
  //   const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")
  //   const user = await User.findOne({
  //       resetPasswordToken,
  //       resetPasswordExpire: { $gt: Date.now() }
  //   })
  //   if (!user) {
  //       // throw new ExpressError("Invalid Token", 404)
  //       console.log("invalid token");
  //   }
  //   userTo.password = req.body.password
  //   user.resetPasswordToken = undefined
  //   user.resetPasswordExpire = undefined
  //   await userTo.save()
  //   res.status(201).json({ success: true, message: "Password Reset Success" })

