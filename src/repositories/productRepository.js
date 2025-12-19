export class ProductRepository {
  constructor(Product) {
    this.Product = Product
  }

  async getAll() {
    try {
      return await this.Product.findAll();
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }

  async getById(id) {
    try{
      return await this.Product.findOne({ where: {id: id}});
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }
  
  async register(infos) {
    try {
      return await this.Product.create({
        nome: infos.name,
        preco: infos.price,
        quantidade: infos.quantity,
        descricao: infos.description
      });
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }

  async update(infos) {
    try {
      return await this.Product.update(
        {
          nome: infos.name,
          preco: infos.price,
          quantidade: infos.quantity,
          descricao: infos.description
        },
        { where: { id: infos.id } }
      )
    } catch {
      throw new Error("Erro ao acessar o banco")
    }
  }

  async delete(id) {
    try {
      return await this.Product.destroy({where: {id: id}})
    } catch {
      throw new Error("Erro ao acessar o banco")
    }
  }
}
