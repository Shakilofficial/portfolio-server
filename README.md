# 📌 Portfolio Backend

🚀 A robust backend for managing authentication, user profiles, blogs, projects, and messages, built with **Node.js**, **Express**, and **MongoDB**.

---

## 🛠 Features

- ✅ **Authentication & Authorization** - Secure JWT-based authentication with role-based access control.
- ✅ **User Management** - Admin seeding, user roles, and profile image support.
- ✅ **Blog Management** - CRUD operations, featured & published toggles, search, and pagination.
- ✅ **Project Management** - CRUD operations with category management and soft delete.
- ✅ **Message Handling** - Contact form messages with admin access for viewing/deleting.
- ✅ **Error Handling** - Centralized error management for consistent API responses.
- ✅ **Database Connection** - Mongoose-based MongoDB setup with environment-based configurations.
- ✅ **Deployment Ready** - Configured for **Vercel** deployment with `vercel.json`.

---

## 📂 Folder Structure

```
portfolio/
├── backend/
│   ├── .vercel/
│   ├── dist/
│   ├── src/
│   │   ├── app/
│   │   ├── config/
│   │   ├── helpers/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   ├── server.ts
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.json
│   ├── vercel.json
```

---

## ⚡ Installation & Setup

### 📋 Prerequisites

- **Node.js** (Latest LTS)
- **MongoDB** (Local/Atlas)
- **Vercel CLI** (For deployment)

### 🛠 Steps

1️⃣ Clone the repository:

```sh
 git clone https://github.com/Shakilofficial/portfolio-server.git
```

2️⃣ Navigate to the project directory:

```sh
 cd portfolio-backend
```

3️⃣ Install dependencies:

```sh
 npm install
```

4️⃣ Create a `.env` file and add:

```env
 MONGO_URI=your_mongodb_connection_string
 JWT_SECRET=your_jwt_secret
 PORT=5000
```

5️⃣ Start the development server:

```sh
 npm run dev
```

🚀 Your backend is now running on **http://localhost:5000**!

---

## 📡 API Endpoints

| 🛠 Endpoint            | 🔹 Method  | 🔍 Description                |
| ---------------------- | ---------- | ----------------------------- |
| `/api/v1/auth/login`   | **POST**   | User login                    |
| `/api/v1/projects`     | **POST**   | Create a new project (admin)  |
| `/api/v1/projects/:id` | **PATCH**  | Update a project (admin)      |
| `/api/v1/projects/:id` | **DELETE** | Soft delete a project (admin) |
| `/api/v1/blogs`        | **POST**   | Create a new blog (admin)     |
| `/api/v1/blogs/:id`    | **PATCH**  | Update a blog (admin)         |
| `/api/v1/blogs/:id`    | **DELETE** | Delete a blog (admin)         |
| `/api/v1/message`      | **POST**   | Send a message                |
| `/api/v1/message`      | **GET**    | Retrieve all messages (admin) |
| `/api/v1/message/:id`  | **DELETE** | Delete a message (admin)      |

📌 _For detailed API usage, check the Swagger/Postman docs (if available)._

---

## 🚀 Deployment

1️⃣ Install Vercel CLI:

```sh
 npm install -g vercel
```

2️⃣ Deploy the backend:

```sh
 vercel
```

3️⃣ Follow on-screen prompts to configure the deployment.

🌍 Your backend is now live on **Vercel**!

---

## 👥 Contributing

- 🔹 Fork the repository.
- 🔹 Create a new branch (`git checkout -b feature-branch`).
- 🔹 Commit your changes (`git commit -m 'Add new feature'`).
- 🔹 Push to the branch (`git push origin feature-branch`).
- 🔹 Create a **Pull Request**.

---

## 📞 Contact

📧 **Email**: [mrshakilhossain@outlook.com](mailto:mrshakilhossain@outlook.com)
🔗 **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/your-profile)
🌐 **Portfolio**: [Visit My Portfolio](https://shakilhossain-sigma.vercel.app)
📘 **Facebook**: [Facebook Profile](https://www.facebook.com/iamshakilhossain)

💖 _Don't forget to ⭐ this repo if you found it helpful!_
