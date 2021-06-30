import {  Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  //Receber token  
  const authToken = request.headers.authorization;

  //Validar se token está preenchido
  if(!authToken) {
    return response.status(401).end();
  }
  
  //Validar se token é válido
  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(token, "7a86bb2f1c32fa4345c1f0e6ce44f5ed") as IPayload;
    request.user_id = sub;

    return next();
  }catch(err){
    return response.status(401).end();
  }
  
  //Recuperar informações do usuário


}