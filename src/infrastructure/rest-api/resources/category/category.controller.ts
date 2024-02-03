import "reflect-metadata";
import "express-async-errors";
import { Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { Request, Response } from "express";
import { InternalServerError } from "../../helpers/ApiErrors";
import { CategoryRepositoryInterface } from "../../../../domain/category/category.repository.interface";
import { CategoryDto } from "../../../../domain/category/category.dto";
import { CreateCategory } from "../../../../use-cases/create-category/create-category";
import { FindOneOptions } from "typeorm";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import QueueServiceInterface from "../../../queue/@shared/queue.service.inteface";

@Controller("api/categories")
export class CategoryController {
  constructor(
    private readonly categoryRepository: CategoryRepositoryInterface,
    private readonly queueService: QueueServiceInterface
  ) {
    this.queueService.setup()
  }

  @Post()
  async create(req: Request, res: Response) {
    try {
      const input: CategoryDto = req.body;
      const categoryCreated = await new CreateCategory(
        this.categoryRepository
      ).execute(input);
      this.queueService.nofity('category-created');
      return res.status(201).json(categoryCreated);
    } catch (error: unknown) {
      console.log(error);
      throw new InternalServerError();
    }
  }

  @Get()
  async getAll(req: Request, res: Response) {
    const products = await this.categoryRepository.getAll();
    return res.status(200).json(products);
  }

  @Delete(":id")
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const deleted = await this.categoryRepository.delete(id);
    return res.status(204).json(deleted);
  }

  @Put(":id")
  async update(req: Request, resp: Response) {
    const id = req.params.id;
    const input: Partial<CategoryDto> = req.body;
    await this.categoryRepository.update(input, id);
    const productUpdate = await this.categoryRepository.findById(
      id as FindOneOptions
    );
    this.queueService.nofity('category-updated');
    return resp.status(200).json(productUpdate);
  }
}
