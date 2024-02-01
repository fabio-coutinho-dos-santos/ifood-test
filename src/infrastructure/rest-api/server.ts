import "express-async-errors";
import { Server } from "@overnightjs/core";
import * as bodyParser from "body-parser";
import { ProductController } from "./resources/product/product.controller";
import { AppDataSource } from "../database/typeorm/mongodb/data-source";
import { ProductRepository } from "../database/typeorm/mongodb/repositories/product.repository";
import { CategoryController } from "./resources/category/category.controller";
import { CategoryRepository } from "../database/typeorm/mongodb/repositories/category.repository";

export class ServerApplication extends Server {
  constructor() {
    super();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    let productController = new ProductController(new ProductRepository(), new CategoryRepository());
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
