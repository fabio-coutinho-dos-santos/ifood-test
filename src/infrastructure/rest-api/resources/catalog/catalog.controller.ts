import { Controller, Get } from "@overnightjs/core";
import { StorageServiceInterface } from "../../../storage/@shared/storage.service.interface";
import { Request, Response } from "express";

@Controller("api/catalogs")
export class CatalogController {
  constructor(private readonly storageService: StorageServiceInterface) {}

  @Get("owner/:id")
  async getByOwnerId(req: Request, resp: Response) {
    try {
      const ownerId = req.params.id;
      const catalog = await this.storageService.getFile(ownerId);
      return resp.status(200).json(catalog);
    } catch (e: unknown) {
      console.log(String(e));
      return resp.status(404).json({
        message: "Catalog not found",
      });
    }
  }
}
