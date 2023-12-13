import { DataSource, getRepository } from "typeorm";
import { db } from "../database/dbconnection";
import { Product } from "../models/product.entity";
import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from "./repository";

export class MysqlRepository implements Repository<void> {
  private db: DataSource;
  constructor() {
    this.db = db;
  }

  async getAll(res: Response): Promise<void> {

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

  async create(req: Request, res: Response): Promise<void> {

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
    } catch (error: any) {
      res.status(500).json({
        msg: "Comuniquese con el Administrador",
        error: error.message,
      });
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {

  }

  async getAllByCategory (req: Request, res: Response): Promise<void> {

  }

  async update(req: Request, res: Response): Promise<void> {

  }

  async delete(req: Request, res: Response): Promise<void> {

  }
} 