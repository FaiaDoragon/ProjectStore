import { db } from "../database/dbconnection";
import { BcryptAdapter, JwtAdapter } from "../helpers";
import { UuidAdapter } from "../helpers/uuid.adapter";
import { User } from "../models/user.entity";

interface LoginDto {
   correo: string;
   password: string;
}

interface RegisterDto {
   name: string;
   correo: string;
   password: string;
   lastname: string;
   rol: boolean;
}

export class AuthService {
   constructor(
      private readonly jwtAdapter: JwtAdapter
   ){}

   public async login(loginDto: LoginDto) {
      try{
	 // Busca el usuario en db por el correo
	 const user = await db.getRepository(User).findOneBy({
	    correo: loginDto.correo
	 });

	 const isSamePassword = BcryptAdapter.compare(loginDto.password, user?.password!);
	 if(!isSamePassword) throw 'Password or Email incorrect'

	 // Se crea el token
	 const token = await this.jwtAdapter.generateToken({
	    rol: user?.Rol, 
	    id: user?.id, 
	    status: user?.status
	 });

	 return {
	    user,
	    token
	 }

      }catch(error) {
	 // Verifica que el error no sea un error del sistema y arroja el custom error
	 //TODO: mejorar el manejo de este error
	 if(error instanceof Error) { 
	 // Si es una excepción se inprime el error y arroja un custom error
	 console.log(error);
	 throw 'Internal Server Error'
	 }

	 throw {type: 'bad request', error};
      }
   }

   public async register(registerDto: RegisterDto) {
      const {rol, ...data} = registerDto;
      try{
	 // Se asignan las propiedades para el usuario que
	 // se va a crear
	 data.password = BcryptAdapter.hash(data.password);
	 const newUser = User.create({...data, Rol: rol});

	 // Crea el JWT
	 const token = await this.jwtAdapter.generateToken({
	    rol: newUser.Rol, 
	    id: newUser.id, 
	    status: newUser.status
	 });

	 // Guarda el nuevo usuario en la db
	 await newUser.save();

	 return {
	    user: newUser,
	    token
	 }
      }catch(error) {
	 console.log(error);
	 throw 'Internal Server Error'
      }
   }
}
