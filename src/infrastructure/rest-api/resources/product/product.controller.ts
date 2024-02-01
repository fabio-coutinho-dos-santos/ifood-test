import "reflect-metadata";
import "express-async-errors";
import { Controller, Delete, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { ProductDto } from "../../../../domain/product/product.dto";
import { InternalServerError } from "../../helpers/ApiErrors";
import CreateProduct from "../../../../use-cases/create-product/create-product";
import { ProductRepositoryInteface } from "../../../../domain/product/product.repository.inteface";

@Controller("api/products")
export class ProductController {
  constructor(private readonly productRepository: ProductRepositoryInteface) {}

  @Post()
  async create(req: Request, res: Response) {
    try {
      const productDto: ProductDto = req.body;
      const newProduct = await new CreateProduct(
        this.productRepository
      ).execute(productDto);
      return res.status(200).json(newProduct);
    } catch (error: unknown) {
      console.log(error);
      throw new InternalServerError();
    }
  }

  @Get()
  async getAll(req: Request, res: Response) {
    const products = await this.productRepository.getAll();
    return res.status(200).json(products);
  }

  @Delete(":id")
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const deleted = await this.productRepository.delete(id);
    return res.status(204).json(deleted);
  }
}
