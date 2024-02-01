import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import { ProductModel } from "./entities/product.mongo.entity";

export function ormconfig() {
  const config = {
    type: "mongodb",
    url: process.env.URL_CONNECTION,
    entities: [ProductModel],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  };
  return config;
}

export const AppDataSource = new DataSource(ormconfig() as DataSourceOptions);
