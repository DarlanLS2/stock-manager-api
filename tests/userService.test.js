import { UserService } from "../src/services/userService.js";
import { ValidationError } from "../src/errors/ValidationError.js";
import { PassWordEncryptor } from "../src/utils/PassWordEncryptor.js";
import jwt from "jsonwebtoken";

jest.mock("../src/utils/PassWordEncryptor.js");
jest.mock("jsonwebtoken")

let repository;
let service;
let body;

describe("login", () => {
  beforeEach(() => {
    repository = {
      getByEmail: jest.fn()
    }

    service = new UserService(repository);

    body = { email: "randon@gmail.com", passWord: "1234" }
  })

  it("throws ValidationError when user is not found", async () => {
    repository.getByEmail.mockResolvedValue(null)

    expect(service.login(body)).rejects.toThrow(ValidationError)
  })

  it("return null when password does not match stored hash", async () => {
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PassWordEncryptor.check.mockResolvedValue(false);

    expect(service.login(body)).resolves.toBeNull();
  })

  it("return auth token when credentials are valid", async () => {
    const token = "asdfasdbadgasdfgadfasdf"
    repository.getByEmail.mockResolvedValue({ passWordHash: "mock" })
    PassWordEncryptor.check.mockResolvedValue(true);
    jwt.sign.mockReturnValue(token);

    expect(service.login(body)).resolves.toEqual({ token: token });
  })

})

// TODO: unit tests for register function
// TODO: unit tests for delete function
