import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../helpers";
import { db } from "../database/dbconnection";
import { User } from "../models";



export class AuthMiddleware {
   constructor(
      private readonly jwtAdapter: JwtAdapter
   ){}

   public validToken = async(req: Request, res: Response, next: NextFunction) => {
      try{
	 const auth = req.header('Authorization');
	 if(!auth) return res.status(401).json({error: 'Missing token'});
	 // Verifica que sea un Beare token
	 if(!auth.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid Beare token'});

	 const token = auth.split(' ').at(1) || ''

	 const payload = await this.jwtAdapter.validToken<{id: string, rol: boolean, status: boolean}>(token);
	 if(!payload) return res.status(401).json({error: 'Invalid token'});

	 const user = await this.getUser(payload.id);
	 if(!user || !user.status) return res.status(404).json({msg: 'User not found'});

	 req.body.user = user;

	 next();
      }catch(error) {
	 console.log(error);
	 throw 'Internal Server Error';
      }
   }

   private async getUser(id: string) {
      try{
	 const user = await db.getRepository(User).findOneBy({id});

	 return user
      }catch(error) {
	 console.log(error);
	 throw 'Internal Server Error';
      }
   }
}
