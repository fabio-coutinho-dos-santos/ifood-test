import "reflect-metadata";
import "express-async-errors";
import { Controller, Delete, Get, Post, Patch, Put } from "@overnightjs/core";
import { Request, Response } from "express";
import { ProductDto } from "../../../../domain/product/product.dto";
import { InternalServerError, NotFoundError } from "../../helpers/ApiErrors";
import CreateProduct from "../../../../use-cases/create-product/create-product";
import { ProductRepositoryInteface } from "../../../../domain/product/product.repository.inteface";
import { FindOneOptions } from "typeorm";
import { CategoryRepositoryInterface } from "../../../../domain/category/category.repository.interface";
import SetCategory from "../../../../use-cases/set-category/set-category";
import QueueServiceInterface from "../../../queue/@shared/queue.service.inteface";

@Controller("api/products")
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepositoryInteface,
    private readonly categoryRepository: CategoryRepositoryInterface,
    private readonly queueService: QueueServiceInterface
  ) {
    this.queueService.setup();
  }

  @Post()
  async create(req: Request, res: Response) {
    try {
      const productDto: ProductDto = req.body;
      const newProduct = await new CreateProduct(
        this.productRepository
      ).execute(productDto);
      this.queueService.nofity('product-created');
      return res.status(201).json(newProduct);
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

  @Patch(":id/set-category/:categoryId")
  async updateCategory(req: Request, resp: Response) {
    try {
      const id = req.params.id;
      const categoryId = req.params.categoryId;

      const productStored = await this.productRepository.findById(
        id as FindOneOptions
      );
      if (!productStored) {
        throw new NotFoundError("Product not found");
      }

      const categoryStored = await this.categoryRepository.findById(
        categoryId as FindOneOptions
      );
      if (!categoryStored) {
        throw new NotFoundError("Category not found");
      }

      const productWithCategory = await new SetCategory(
        this.productRepository
      ).execute(categoryStored, productStored);
      return resp.status(200).json(productWithCategory);
    } catch (error: unknown) {
      console.log(error);
      return resp.status(404).json({ message: String(error) });
    }
  }

  @Put(":id")
  async update(req: Request, resp: Response) {
    const id = req.params.id;
    const input: Partial<ProductDto> = req.body;
    await this.productRepository.update(input, id);
    const productUpdate = await this.productRepository.findById(
      id as FindOneOptions
    );
    this.queueService.nofity('product-updated');
    return resp.status(200).json(productUpdate);
  }
}
