import { DataSource} from "typeorm";
import { User } from "../models/user.entity"
import { BcryptAdapter } from "../helpers";


interface UpdateDto {
   id: string;
   name: string;
   password: string;
   lastname: string;
}

export class UserService {
   constructor(
      private readonly datasource: DataSource
   ){}

   private async getUserById(id: string) {
      const userdb = await this.datasource.getRepository(User).findOneBy({id});

      return userdb
   }

   public async getUsers(limit: number, page: number) {
      try{
	 const [total, users] = await Promise.all([
	    User.countBy({status: true}),
	    User.find({
	       where: {
		  status: true
	       },
	       take: limit,
	       skip: page
	    })
	 ]);

	 return {
	    next: `/api/users?limit=${limit}&page=${page+1}`,
	    prev: (page-1 >= 0) ? `/api/users?limit=${limit}&page=${page-1}` : null,
	    limit, page,
	    total,
	    users
	 };
      }catch(error) {
	 console.log(error);
	 throw 'Internal Server Error';
      }
   }

   public async getDeletedUsers(limit: number, page: number) {
      try{
	 const [total, users] = await Promise.all([
	    User.countBy({status: false}),
	    User.find({
	       where: {
		  status: false
	       },
	       take: limit,
	       skip: page
	    })
	 ]);

	 return {
	    next: `/api/users?limit=${limit}&page=${page+1}`,
	    prev: (page-1 >= 0) ? `/api/users?limit=${limit}&page=${page-1}` : null,
	    limit, page,
	    total,
	    users
	 };
      }catch(error) {
	 console.log(error);
	 throw 'Internal Server Error';
      }
   }

   public async userUpdate(updateDto: UpdateDto) {
      const {id, ...data} = updateDto;
      try{
	 const userDb = await this.getUserById(id);

	 data.password = BcryptAdapter.hash(data.password)
	 const dataToUpdate = {
	    ...data,
	    updatedAt: new Date() 
	 }
	 const user = this.datasource.getRepository(User).merge(userDb!, dataToUpdate);
	 await user.save()

	 return user;
      }catch(error) {
	 console.log(error);
	 throw 'Internal Server Error';
      }
   }

   public async deleteUser(id: string) {
      try{
	 const userDb = await this.getUserById(id);

	 const user = this.datasource.getRepository(User).merge(userDb!, {status: false});
	 await user.save();

	 return user;
      }catch(error) {
	 console.log(error)
	 throw 'Internal Server Error'
      }
   }

}
