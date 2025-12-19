export class ProductService {
  constructor(productRepository) {
    this.repository = productRepository;
  }
  async getAll() {
      const res = await this.repository.getAll();

      if (res.length === 0) {
        throw new Error("Não há produtos")
      }

      return res
  }

  async getById(id) {
    const res = await this.repository.getById(id);
    
    if (res == null) {
        throw new Error("Produto não registrado")
    }
    
    return res
  }

  async register(infos) {
    await this.repository.register(infos)
  }
  
  async update(infos) {
    await this.repository.update(infos);
  }

  async delete(id) {
    await this.repository.delete(id);
  }
}
