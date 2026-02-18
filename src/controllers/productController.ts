import type { Request, Response } from "express"
import { Product } from "../entities/Product.js"
import { ValidationError } from "../errors/ValidationError.js"
import { NotFoundError } from "../errors/NotFoundError.js"
import { ProductService } from "../services/productService.js"

export class ProductController {
  service: ProductService

  constructor(productService: ProductService) {
    this.service = productService
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await this.service.getAll();

      res.set('Cache-Control', 'private, max-age=5, must-revalidate')
      res.status(200).json(products)
    } catch (error: any) {
      res.status(500).json({
        title: "Unexpected error",
        detail: error.message,
      })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await this.service.getById(req.params.id);

      res.set('Cache-Control', 'private, max-age=30, must-revalidate')
      res.status(200).json(product)
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        res.status(404).json({
          title: "Product not found", 
          detail: "No product found with the provided id"
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message
        })
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const createdProduct = await this.service.register(req.body)

      res.set('Cache-Control', 'no-store')
      res.status(201).json(createdProduct)
    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          title: "Invalid input",
          detail: `Invalid ${error.field} format`
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message
        })
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      await this.service.update(req.body);

      res.set('Cache-Control', 'no-store');
      res.sendStatus(204);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          title: "Invalid input",
          detail: `Invalid ${error.field} format`
        })
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          title: "Product not found", 
          detail: "No product found with the provided id"
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message,
        })
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.delete(req.params.id);

      res.set('Cache-Control', 'no-store')
      res.sendStatus(204);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        res.status(404).json({
          title: "Product not found", 
          detail: "No product found with the provided id"
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message,
        })
      }
    }
  }
}
