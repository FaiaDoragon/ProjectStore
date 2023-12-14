import { NextFunction, Request, Response } from "express";
import { User } from "../models";



export class DbValidators {
   constructor(){}

   public async validExistEmail(correo: string) {
      const user = await User.findOneBy({correo})
      if(user) throw 'Email already in use'
   }

   public async validExistUser(id: string) {
      const user = await User.findOneBy({id});
      if(!user) throw `User not exist with id: ${id}`
   }

   public isUserOwner(id: string) {
      return async (req: Request, res: Response, next: NextFunction) => {
      try{
	 const user = await User.findOneBy({id});

	 if(user?.id !== req.body.user.id) return res.status(401).json({
	    msg: 'User is not the owner of this account'
	 });

	 next();
      }catch(error) {
	 console.log(error)
	 res.status(500).json({msg: 'Internal Server Error'});
      }
   }
   }
}
