# Car Rental API by D.Z.E.L.

**Car Rental API by D.Z.E.L. — A scalable and efficient system for managing vehicle rentals.**

This is a RESTful API designed to manage a car rental system, including users, cars, and reservations. The system supports role-based access control (Admin, Staff, and User) and ensures secure, structured data flow using technologies like JWT, Zod, and Day.js.

---

## 🚀 Features

- 🔐 Role-based access control (`Admin`, `Staff`, `User`)
- 🚗 Car management with availability tracking
- 📅 Reservation system with date calculations powered by `Day.js`
- 🧪 Input validation using `Zod`
- 🧪 Mock data generation for development/testing
- 💾 MongoDB integration using `Mongoose`
- 📦 Secure authentication with both simple token and JWT
- 📂 File uploads via `Multer`
- ✉️ Email support via `Nodemailer`
- 📘 Auto-generated documentation with Swagger + Redoc

---

## 🛠️ Tech Stack

| Category       | Technologies                                             |
| -------------- | -------------------------------------------------------- |
| **Runtime**    | Node.js, Express                                         |
| **Database**   | MongoDB, Mongoose                                        |
| **Auth**       | JWT, simple token, `jsonwebtoken`                        |
| **Validation** | `zod`, `mongoose-unique-validator`                       |
| **Docs**       | `swagger-ui-express`, `swagger-autogen`, `redoc-express` |
| **Date Utils** | `dayjs`                                                  |
| **Dev Tools**  | `nodemon`, `morgan`, `dotenv`, `multer`, `mockData`      |

---

## 📦 Installation

```
bash
git clone https://github.com/your-username/car_rental_api.git
cd car_rental_api
npm install
npm start
```

- Make sure to set up a .env file with the required environment variables such as MongoDB URI, JWT secrets, email credentials, etc.

## 🧑‍💻 Roles & Permissions

| Role  | Description                               |
| ----- | ----------------------------------------- |
| Admin | Full access: create, read, update, delete |
| Staff | Can manage cars and reservations          |
| User  | Can browse cars, create/view reservations |

### 📩 Contact

- Dzelal Selim Sokolovic
- 📧 binaycelalselim@gmail.com

#### 📄 License

- This project is licensed under the MIT License.
