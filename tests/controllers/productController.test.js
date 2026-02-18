import { ProductController } from "../../dist/controllers/productController.js";
import { ValidationError } from "../../dist/errors/ValidationError.js";
import { Product } from "../../dist/entities/Product.js"
import { NotFoundError } from "../../dist/errors/NotFoundError.js";

jest.mock("../../dist/entities/Product.js")

let service;
let products;
let controller;
let req;
let res;

describe("getAll", () => {
  beforeEach(() => {
    service = {
      getAll: jest.fn()
    }
    controller = new ProductController(service);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      body: "mock"
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 200 on success", async () => {
    service.getAll.mockResolvedValue(products);

    await controller.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(products)
  })

  it("return 500 when service throws unexpected error", async () => {
    service.getAll.mockRejectedValue(new Error("unexpected database error"));

    await controller.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    })
  })
})

describe("getById", () => {
  beforeEach(() => {
    service = {
      getById: jest.fn()
    }
    controller = new ProductController(service);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      params: {
        id: 1
      }
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 200 on success", async () => {
    service.getById.mockResolvedValue(products[1]);

    await controller.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(products[1])
  })

  it("return 404 when service throws NotFoundError", async () => {
    service.getById.mockRejectedValue(new NotFoundError);

    await controller.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      title: "Product not found", 
      detail: "No product found with the provided id"
    })
  })

  it("return 500 when service throws unexpected error", async () => {
    service.getById.mockRejectedValue(new Error("unexpected database error"));

    await controller.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    })
  })
})

describe("register", () => {
  beforeEach(() => {
    service = {
      register: jest.fn()
    }
    controller = new ProductController(service);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      body: "mock"
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 201 on success", async () => {
    Product.mockImplementation((body) => (body))
    service.register.mockResolvedValue(products[1])

    await controller.register(req, res);
    
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(products[1])
  })

  it("return 400 when service throws ValidationError", async () => {
    service.register.mockRejectedValue(new ValidationError("name", "required"));

    await controller.register(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      title: "Invalid input",
      detail: "Invalid name format"
    })
  })

  it("return 500 when service throws unexpected error", async () => {
    Product.mockImplementation((body) => (body));
    service.register.mockRejectedValue(new Error("unexpected database error"))

    await controller.register(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    })
  })
})

describe("update", () => {
  beforeEach(() => {
    service = {
      update: jest.fn()
    }
    controller = new ProductController(service);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      body: "mock"
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 204 on success", async () => {
    Product.mockImplementation((body) => body);
    service.update.mockResolvedValue([1])

    await controller.update(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  })

  it("return 400 when service throws ValidationError", async () => {
    service.update.mockRejectedValue(new ValidationError("name", "required"));

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      title: "Invalid input",
      detail: "Invalid name format"
    });
  })

  it("return 404 when throws NotFoundError", async () => {
    service.update.mockRejectedValue(new NotFoundError);

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      title: "Product not found", 
      detail: "No product found with the provided id"
    });
  })

  it("return 500 when service throws unexpected error", async () => {
    Product.mockImplementation((body) => body);
    service.update.mockRejectedValue(new Error("unexpected database error"))

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    });
  })
})

describe("delete", () => {
  beforeEach(() => {
    service = {
      delete: jest.fn()
    }
    controller = new ProductController(service);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      params: {
        id: 1
      }
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 204 on success", async () => {
    service.delete.mockResolvedValue(1)

    await controller.delete(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  })

  it("return 404 when throws NotFoundError", async () => {
    service.delete.mockRejectedValue(new NotFoundError);

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      title: "Product not found", 
      detail: "No product found with the provided id"
    });
  })

  it("return 500 when service throws unexpected error", async () => {
    service.delete.mockRejectedValue(new Error("unexpected database error"))

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    });
  })
})
