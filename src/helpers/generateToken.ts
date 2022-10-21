import * as jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();
export function generateToken<T extends object>(payload:T){
  return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});
}