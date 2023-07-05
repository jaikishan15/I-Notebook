import { Schema, model, Document } from "mongoose";

const mongoose = require('mongoose');
import { DATABASE_NAMES } from "../constants/databaseNames";
const crypto = require('crypto')

export interface IUserModel extends Document {
    
    email:String;
    password:String;
    userName:String;    
  }
  

  export const EndUserSchema = new Schema({
    
    email:{type:String,required:true,unique:true},
    password:{type:String},
    userName:{type:String},

  })
export const User = model<IUserModel>(DATABASE_NAMES.USERS,EndUserSchema);