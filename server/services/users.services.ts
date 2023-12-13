import { User } from "../models/user.entity"



export class UserService {
   constructor(
      private readonly userEntity: User
   ){}

   public async getAll() {
      //const users = this.userEntity;
   }
}
