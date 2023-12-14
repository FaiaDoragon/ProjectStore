import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";


export class AuthController {
   constructor( //Injección de dependencias
      private readonly authService: AuthService
   ){}

   login = async(req: Request, res: Response) => {
      const {correo, password} = req.body;

      try{
	 const {user, token} = await this.authService.login({correo, password});

	 res.cookie('token', token);
	 res.json({user});
      }catch(error: any) {
	 //TODO: mejorar el manejo de este error
	 if(error.type === 'bad request') return res.status(404).json({error: error.error});

	 res.status(500).json({error});
      }
   }

   register = async(req: Request, res: Response) => {
      const { name, correo, password, rol, lastname } = req.body;
      
      this.authService.register({name, correo, password, rol, lastname})
	 .then( ({user, token}) => {
	    res.cookie('token', token)
	    res.status(201).json({user})
	 })
	 .catch( error => res.status(500).json({error}) )
   }
}
