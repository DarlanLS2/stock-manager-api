import { Product } from "../entities/Product.js"
import { ValidationError } from "../errors/ValidationError.js"
import { NotFoundError } from "../errors/NotFoundError.js"

export class ProductController {
  constructor(productRepository) {
    this.repository = productRepository
  }

  async getAll(req, res) {
    try {
      const products = await this.repository.getAll();

      if (products.leght < 1) {
        throw new NotFoundError("Não há produtos cadastrados")
      }

      res.status(200).json(products)
    } catch(error) {
      if (error instanceof NotFoundError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async getById(req, res) {
    try {
      const product = await this.repository.getById(req.params.id);

      if (product == null) {
        throw new NotFoundError("Produto não encontrado")
      }

      res.status(200).json(product)
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async register(req, res) {
    try {
      const product = new Product(req.body)

      await this.repository.register(product)
      res.status(200).send({message: "Produto registrado com sucesso"})
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async update(req, res) {
    try {
      const product = new Product(req.body);
      product.setId(req.body.id);

      await this.repository.update(product);
      res.status(200).send({message: "Producto atualizado com sucesso"})
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async delete(req, res) {
    try {
      const product = await this.repository.delete(req.params.id);

      if (product.lengt < 1) {
        throw new NotFoundError("Este produto não existe")
      }

      res.status(200).send({message: "Produto excluido com sucesso"});
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }
}
