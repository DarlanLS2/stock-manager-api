import { ValidationError } from "../errors/ValidationError.js"

type Fields = {
  id?: string,
  name: string,
  price: string,
  quantity: string,
  description: string
}

export class Product {
  id: string | undefined
  name: string
  price: string
  quantity: string
  description: string

  constructor(fields: Fields) {
    this.#validateName(fields.name);
    this.#validatePrice(fields.price);
    this.#validateQuantity(fields.quantity);
    this.#validateDescription(fields.description);

    if (fields.id == undefined) {
      this.id = undefined;
    } else {
      this.id = fields.id;
    }
    this.name = fields.name;
    this.price = fields.price;
    this.quantity = fields.quantity;
    this.description = fields.description;
  }

  #validateName(name: string) {
    const regex = /^(?=.{3,100}$)[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:[ _-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*$/;

    if (!regex.test(name)) {
      throw new ValidationError("name", "invalid_format");
    }
  }

  #validatePrice(price: string) {
    const regex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

    if (!regex.test(price)) {
      throw new ValidationError("price", "invalid_format");
    }
  }

  #validateQuantity(quantity: string) {
    const regex = /^(0|[1-9]\d*)$/;

    if (!regex.test(quantity)) {
      throw new ValidationError("quantity", "invalid_format");
    }
  }

  #validateDescription(description: string) {
    const regex = /^(?=.{10,500}$)(?!\s*$)[A-Za-z0-9À-ÖØ-öø-ÿ\s.,;:!?()'"%\-_/]+$/

    if (!regex.test(description)) {
      throw new ValidationError("description", "invalid_format")
    }
  }
}
