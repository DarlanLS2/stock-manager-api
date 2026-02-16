import { User } from "../../dist/entities/User.js";
import { ValidationError } from "../../dist/errors/ValidationError.js";

describe("email validation", () => {
  it("throws ValidationError when email is invalid", () => {
    const emails = [
      null,
      "",
      "testgmail.com",
      "@gmail.com",
      "test@gmail.a",
      "test@.com"
    ]

    emails.forEach((email) => {
      expect(() => {
        new User({
          email: email,
          passWordHash: "afdsfasdfasf"
        })
      }).toThrow(ValidationError)
    })
  })
})
