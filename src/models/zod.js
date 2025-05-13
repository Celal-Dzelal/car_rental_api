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

const reservationCreateSchema = z.object({
  body: z
    .object({
      userId: z.string().min(1, "userId is required"),
      carId: z.string().min(1, "carId is required"),
      coDriver: z
        .string()
        .min(4, "Co-driver name must be at least 4 characters long")
        .trim(),
      startDate: z
        .string()
        .transform((str) => new Date(str))
        .refine((date) => date > new Date(), {
          message: "The start date cannot be a past date",
        }),
      endDate: z.string().transform((str) => new Date(str)),
      rentalPeriod: z.number().min(1).optional(),
      amount: z.number(),
    })
    .refine((data) => data.startDate < data.endDate, {
      message: "End date must be after start date",
      path: ["endDate"],
    }),
});

const reservationUpdateSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "userId is required").optional(),
    carId: z.string().min(1, "carId is required").optional(),
    coDriver: z
      .string()
      .min(4, "Co-driver name must be at least 4 characters long")
      .trim()
      .optional(),
    startDate: z
      .string()
      .transform((str) => new Date(str))
      .refine((date) => date > new Date(), {
        message: "The start date cannot be a past date",
      })
      .optional(),
    endDate: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    rentalPeriod: z
      .number()
      .min(1, "End Date must be later than start date")
      .optional(),
    amount: z.number().optional(),
  }),
});

module.exports = {
  userCreateSchema,
  userUpdateSchema,
  reservationCreateSchema,
  reservationUpdateSchema,
};
