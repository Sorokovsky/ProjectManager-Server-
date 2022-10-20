import * as jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();
export function generateToken<Payload extends Object>(payload:Payload){
  return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});
}