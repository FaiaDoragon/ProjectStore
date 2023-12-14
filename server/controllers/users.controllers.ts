import { Request, Response } from "express";
import { UserService } from "../services/users.service";



export class UserController {
   constructor(
      private readonly userService: UserService
   ){}

   getUsers = async(req: Request, res: Response) => {
      const {limit=10, page=0} = req.query;
      const pageToNumber = Number(page);
      const limitToNumber = Number(limit);

      this.userService.getUsers(limitToNumber, pageToNumber)
	 .then(resp => res.json(resp))
	 .catch(error => res.status(500).json({error}) )
   }

   getDeletedUsers = async(req: Request, res: Response) => {
      const {limit=10, page=0} = req.query;
      const pageToNumber = Number(page);
      const limitToNumber = Number(limit);

      this.userService.getDeletedUsers(limitToNumber, pageToNumber)
	 .then( resp => res.json(resp))
	 .catch( error => res.status(500).json({error}) )
   }

   userUpdate = async(req: Request, res: Response) => {
      const {name, lastname, password} = req.body;
      const {id} = req.params;

      this.userService.userUpdate({id, name, lastname, password})
	 .then( resp => res.json(resp))
	 .catch( error => res.status(500).json({error}) )

   }

   deleteUser = async(req: Request, res: Response) => {
      const {id} = req.params;

      this.userService.deleteUser(id)
	 .then( resp => res.json( resp ) )
	 .catch( error => res.status(500).json({error}) )
   }
}
