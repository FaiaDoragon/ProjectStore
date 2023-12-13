import jwt from "jsonwebtoken";



export class JwtAdapter {
   constructor( // Injección de dependencias
      private readonly jwtSeed: string
   ){}

   public async generateToken(payload: any): Promise<string | null> {
      return new Promise( resolve => {
	 jwt.sign(payload, this.jwtSeed, {expiresIn: '6h'}, (error, token) => {
	    if(error) resolve(null);

	    resolve(token!);
	 });
      });
   }

   public async validToken<T>(token: string): Promise<T | null> {
      return new Promise( resolve => {

	 jwt.verify(token, this.jwtSeed, (error, decode) => {
	    if(error) resolve(null);

	    resolve(decode as T)
	 });
      });
   }
}
