import { NextFunction, Request, Response } from "express";



export class ValidRol {
   constructor(){}

   public isUserAdmin = async(req: Request, res: Response, next: NextFunction) => {
      const {user} = req.body;
      if(user.Rol === false) return res.status(401).json({error: "User can't complete this accition, because is not admin "});

      next();
   }
}
