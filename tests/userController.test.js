import { UserController } from "../src/controllers/userController.js"

let mockService;
let controller
let req;
let res;

describe("login", () => {
  beforeEach(() => {
    mockService = {
      login: jest.fn()
    }

    controller = new UserController(mockService);

    req = {
      body: { email: "random@gmail.com", passWord: "1234" }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 200 when service return token", async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    mockService.login.mockResolvedValue({ token: token })

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: token });
  })

  it("return 400 when service return null", async () => {
    mockService.login.mockResolvedValue(null);

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ field: "email or passWord", message: "invalid" });
  })

  it("return 500 when service return unexpected error", async () => {
    const errorMessage = "unexpected database error"
    mockService.login.mockRejectedValue(new Error(errorMessage))

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage});
  })

  it("call service login correctly", async () => {
    await controller.login(req, res);

    expect(mockService.login).toHaveBeenCalledWith(req.body)
  })
})
