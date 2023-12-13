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

	 // Verifica que la comtraseña que se pasa en loginDto sea igual
	 // a la almacena en la db, si no lo es arroja un custom error
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
	 if(error !instanceof Error) throw {type: 'unauthorize', error};

	 // Si es una excepción se inprime el error y arroja un custom error
	 console.log(error);
	 throw 'Internal Server Error'
      }
   }

   public async register(registerDto: RegisterDto) {
      try{
	 const { name, correo, password, lastname, rol } = registerDto;

	 // Se asignan las propiedades para el usuario que
	 // se va a crear
	 const newUser = new User();
	 newUser.id = UuidAdapter.v4();
	 newUser.name = name;
	 newUser.correo = correo;
	 newUser.Rol = rol;
	 newUser.password = BcryptAdapter.hash(password);
	 newUser.lastname = lastname;

	 // Crea el JWT
	 const token = await this.jwtAdapter.generateToken({
	    rol: rol, 
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
