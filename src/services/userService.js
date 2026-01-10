import { PassWordEncryptor } from "../utils/PassWordEncryptor.js";
import { User } from "../entities/User.js";

export class UserService {
  constructor(userRepository) {
    this.repository = userRepository;
  }
  async getByEmail(email) {
    return await this.repository.getByEmail(email);
  }

  async register(body) {
    const encryptedPassWord = await PassWordEncryptor.encrypt(body.passWord)

    const user = new User({
      id: null,
      email: body.email,
      passWordHash: encryptedPassWord
    })

    return await this.repository.register(user);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}
