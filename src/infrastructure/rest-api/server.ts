import "express-async-errors";
import { Server } from "@overnightjs/core";
import * as bodyParser from "body-parser";
import { ProductController } from "./resources/product/product.controller";
import { AppDataSource } from "../database/typeorm/mongodb/data-source";
import { ProductRepository } from "../database/typeorm/mongodb/repositories/product.repository";
import { ProductRepositoryInteface } from "../../domain/product/product.repository.inteface";
import { CategoryController } from "./resources/category/product.controller";
import { CategoryRepository } from "../database/typeorm/mongodb/repositories/product.repository copy";

export class ServerApplication extends Server {
  constructor() {
    super();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    let productController = new ProductController(new ProductRepository());
    let categoriesController = new CategoryController(new CategoryRepository());
    super.addControllers([productController,categoriesController]);
  }

 async start(port: number) {
    await AppDataSource.initialize()
    this.app.listen(port, () => {
      console.log("Server listening on port: " + port);
    });
  }
}
