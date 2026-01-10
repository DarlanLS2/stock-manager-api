export class UserService {
  constructor(userRepository) {
    this.repository = userRepository;
  }
  async getByEmail(email) {}

  async register(body) {}

  async update(body) {}

  async delete(id) {}
}
