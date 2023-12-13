import { DataSource } from "typeorm";
import { db } from "../database/dbconnection";
import { Product } from '../models/product.entity';
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

    try {

      const products = Product.create({
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
        msg: "Error al crear el producto",
        error: error.message,
      });
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {

    const id = req.params.id

    try {

      const product = await Product.findOneBy({
        id
      });

      if (!product) {
        res.status(404).json({ msg: `No se encontro producto con el id: ${id}` })
        return;
      }

      res.status(200).json({
        msg: "producto encontrado",
        product
      })

    } catch (error: any) {
      res.status(500).json({
        msg: "Error al intengar obtener producto por id",
        error: error.message,
      });
    }
  }

  async getAllByCategory(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
} 