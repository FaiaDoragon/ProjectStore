import { DataSource, getRepository } from "typeorm";
// import { Repository } from "./repository";
import { db } from "../database/dbconnection";
import { Product } from "../models/product.entity";
import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class MysqlRepository {
  private db: DataSource;
  constructor() {
    this.db = db;
  }

  async getAll(res: Response): Promise<void>{

    const products: Product[] = await Product.find()

    try {
      if (products.length !== 0) {
        res.status(200).json({
          msg: "Lista completa de Productos",
          products
        })
        return;
      }
      res.status(404).json({
        msg: `No se encontraron productos en la base de datos`
      })
    } catch (error: any) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({
        msg: "Error al obtener los datos solicitados",
        error: error.message,
      })
    }
  }

  async create(req: Request, res: Response) {

    const {
      name,
      category,
      stock,
      price,
      currency,
      description,
      image
    } = req.body

    const id = uuidv4();
    try {

      const products = Product.create({
        id,
        name,
        category,
        stock,
        price,
        currency,
        description,
        image
      })

      await products.save();

      res.status(201).json({
        msg: 'Producto creado exitosamente',
        products
    });
    } catch (error : any) {
      res.status(500).json({
        msg: "Comuniquese con el Administrador",
        error: error.message,
    });
    }
  }
  // getOne(id: number): Promise<T> {
  //   return new Promise<T>((resolve, reject) => {
  //     try {
  //       const item = this.data.find((item, index) => index === id);
  //       if (item) {
  //         resolve(item);
  //       } else {
  //         throw "No se encontro data";
  //       }
  //     } catch (error) {
  //       throw new Error("error");
  //     }
  //   });
  // }

  // async update(dto: T, id?: number): Promise<T> {
  //   if (id !== undefined && id < this.data.length) {
  //     this.data[id] = dto;
  //     return dto;
  //   } else {
  //     throw new Error(`Invalid id ${id} for update`);
  //   }
  // }

  // async deleted(id: number): Promise<T> {
  //   if (id < this.data.length) {
  //     const deletedItem = this.data.splice(id, 1)[0];
  //     return deletedItem;
  //   } else {
  //     throw new Error(`Invalid id ${id} for deletion`);
  //   }
  // }
}