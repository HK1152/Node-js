# Blog Cookie Auth App

A simple Node.js blog application built with `Express`, `EJS`, `MongoDB`, `JWT`, and `cookie-parser`.
This project includes a sign-in page, cookie-based authentication, and a protected blog listing page.

## Demo Login Credentials

Important:
These credentials should be used only for demo/testing purposes.
Do not use plaintext passwords in a real production project or public application.

```json
[
  {
    "email": "kavya.patel@gmail.com",
    "password": "kavya1152"
  },
  {
    "email": "divya.patel@gmail.com",
    "password": "divya1152"
  },
  {
    "email": "amit.verma@gmail.com",
    "password": "amit123"
  },
  {
    "email": "neha.gupta@gmail.com",
    "password": "neha123"
  },
  {
    "email": "karan.mehta@gmail.com",
    "password": "karan123"
  }
]
```

## Features

- **Secure Sign-in**: User authentication with email and password.
- **JWT Authentication**: Token-based security using `jsonwebtoken`.
- **HTTP-Only Cookies**: Protected session management to prevent XSS attacks.
- **Dynamic Error Handling**: Real-time feedback on the UI for incorrect credentials.
- **Protected Routes**: Middleware-based access control for private pages.
- **EJS Templating**: Clean and responsive UI for sign-in and blog listing.
- **MongoDB Integration**: Robust data storage with Mongoose.

## Tech Stack

- Node.js
- Express.js
- EJS
- MongoDB
- Mongoose
- JSON Web Token (`jsonwebtoken`)
- cookie-parser

## Project Structure

```bash
09-BLOG-cookie/
├── config/
│   └── db.js
├── controller/
│   ├── print.js
│   └── signin.js
├── middleware/
│   └── auth.js
├── model/
│   ├── blogModel.js
│   └── user.js
├── public/
├── router/
│   └── authRouter.js
├── views/
│   ├── printBlog.ejs
│   └── signin.ejs
├── .env
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation

```bash
npm install
```

## Run Locally

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server runs on:

```bash
http://localhost:5000
```

## Environment Variables

Create a `.env` file in the root folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Routes

| Method | Route      | Description                         |
|--------|------------|-------------------------------------|
| GET    | `/signin`  | Render sign-in page                 |
| POST   | `/signin`  | Authenticate user and set cookie    |
| GET    | `/blog`    | Show protected blog listing page    |
| GET    | `/signout` | Clear token cookie and sign out     |



## Sample Blog Schema

```js
{
  title: String,
  content: String,
  author: String,
  createdAt: Date
}
```

## Authentication Flow

1. User opens `/signin`.
2. User submits email and password.
3. Server validates credentials against MongoDB.
4. On success, a JWT token is generated.
5. The token is stored in an **HTTP-only cookie** for enhanced security.
6. User is redirected to the protected `/blog` route.
7. The `auth` middleware verifies the cookie on every protected request.

## Security Notes

- **HTTP-Only Cookies**: We use `httpOnly: true` to ensure tokens cannot be accessed via JavaScript.
- **Middleware Redirection**: Unauthorized attempts to access `/blog` are automatically redirected to `/signin`.
- **Password Safety**: Currently, passwords are stored in plain text for demonstration. In a production environment, always use `bcrypt` for hashing.

## Future Improvements

- [ ] Add password hashing with `bcrypt`
- [ ] Implement a User Signup page
- [ ] Add CRUD operations (Create, Update, Delete) for blogs
- [ ] Implement role-based access control (Admin/User)
- [ ] Add password reset functionality

## Author

Built for practice with Node.js, Express, EJS, cookies, and JWT authentication.
