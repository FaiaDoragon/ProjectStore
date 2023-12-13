import bcrypt from 'bcrypt';


export class BcryptAdapter {

   static hash(password: string): string {
      const salt = bcrypt.genSaltSync();
      
      return bcrypt.hashSync(password, salt);
   }

   static compare(password: string, hash: string): boolean {
      return bcrypt.compareSync(password, hash);
   }
}
