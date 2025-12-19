export class ProductService {
  constructor(productRepository) {
    this.repository = productRepository;
  }
  async getAll() {
    try {
      const res = await this.repository.getAll();

      if (res.length < 1) {
        throw new Error("Não há produtos")
      }

      return res
    } catch (err) {
      if (err.message == "Não há produtos") {
        throw err
      }

      throw new Error("Erro ao buscar produtos")
    }
  }

  async getById(id) {
    await this.repository.getById(id);
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
