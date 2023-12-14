
import { MysqlRepository } from "../interface/products.repository";
import { Request, Response } from 'express';

export class ProductService {
  private repository;

  constructor() {
    this.repository = new MysqlRepository();
  }

  async findAll(res: Response) {
    try {
      const response = await this.repository.getAll(res);
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async create(req : Request, res : Response) {
    try {
      const response = await this.repository.create(req, res);
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findById(req : Request, res : Response) {
    try {
      const response = await this.repository.getOne(req, res);
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findByCategory(req : Request, res : Response) {
    try {
      const response = await this.repository.getAllByCategory(req, res);
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async update(req : Request, res : Response) {
    try {
      const response = await this.repository.update(req, res);
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async delete(req : Request, res : Response) {
    try {
      const response = await this.repository.delete(req, res);
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}