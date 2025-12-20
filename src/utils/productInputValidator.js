export class ProductInputValidator {
  static isFieldsValid(fields) {
    const errors = [];

    if (!this.isNameValid(fields.name)) {
      errors.push("name");
    }

    if (!this.isPriceValid(fields.price)) {
      errors.push("price");
    }

    if (!this.isQuantityValid(fields.quantity)) {
      errors.push("quantity");
    }

    if (!this.isDescriptionValid(fields.description)) {
      errors.push("description");
    }

    return errors
  }

  static isNameValid(name) {
    const regex = /^(?=.{3,100}$)[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:[ _-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*$/;

    if (name == null) {
      return false
    }

    return regex.test(name)
  }

  static isPriceValid(price) {
    const regex = /^(0|[1-9]\d*)(,\d{1,2})?$/;

    if (price == null) {
      return false;
    } 

    return regex.test(price)
  }

  static isQuantityValid(quantity) {
    const regex = /^(0|[1-9]\d*)$/;

    if (quantity == null) {
      return false
    } 

    return regex.test(quantity)
  }

  static isDescriptionValid(description) {
    const regex = /^(?=.{10,500}$)(?!\s*$)[A-Za-z0-9À-ÖØ-öø-ÿ\s.,;:!?()'"%\-_/]+$/

    if (description == null) {
      return false
    }

    return regex.test(description)
  }
}
