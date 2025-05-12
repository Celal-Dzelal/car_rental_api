const { z } = require("zod");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userCreateSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .trim(),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .trim(),
    firstName: z
      .string()
      .min(2, "firstName must be at least 2 characters long")
      .trim()
      .regex(/^[A-Za-zğüşöçıİĞÜŞÖÇ]+$/, "First name must contain only letters"),
    lastName: z
      .string()
      .min(2, "lastName must be at least 2 characters long")
      .trim()
      .regex(/^[A-Za-zğüşöçıİĞÜŞÖÇ]+$/, "Last name must contain only letters"),
    isActive: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
    isStaff: z.boolean().optional(),
  }),
});

const userUpdateSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .trim()
      .optional(),
    email: z.string().email("Please enter a valid email address").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .trim()
      .optional(),
    firstName: z
      .string()
      .min(2, "firstName must be at least 2 characters long")
      .trim()
      .regex(/^[A-Za-zğüşöçıİĞÜŞÖÇ]+$/, "First name must contain only letters")
      .optional(),
    lastName: z
      .string()
      .min(2, "lastName must be at least 2 characters long")
      .trim()
      .regex(/^[A-Za-zğüşöçıİĞÜŞÖÇ]+$/, "Last name must contain only letters")
      .optional(),
    isActive: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
    isStaff: z.boolean().optional(),
  }),
});

module.exports = {
  userCreateSchema,
  userUpdateSchema,
};
