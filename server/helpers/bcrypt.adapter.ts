import bcrypt from 'bcrypt';


export class BcryptAdapter {

   public static hash(password: string): string {
      const salt = bcrypt.genSaltSync();
      
      return bcrypt.hashSync(password, salt);
   }

   public static compare(password: string, hash: string): boolean {
      return bcrypt.compareSync(password, hash);
   }
}
