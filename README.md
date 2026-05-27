# CareerForge AI 🚀

CareerForge AI is a modern, premium full-stack SaaS platform designed to help students and freshers become placement-ready using AI. 

## Features
1. **AI Resume Analyzer:** Optimize resumes for ATS with insights and suggestions.
2. **Project Generator:** Instantly generate professional project descriptions and architecture.
3. **Interview Prep:** Practice with AI-generated role-specific interview questions.
4. **Learning Roadmaps:** Get personalized weekly plans to master new domains.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios
- **Backend**: Spring Boot (Java 17), Spring Security, JWT, Maven
- **Database**: MySQL
- **AI Integration**: Gemini API (Ready for Integration)

---

## 📂 Project Structure

```text
career-assistant/
│
├── frontend/             # React + Vite Application
│   ├── src/
│   │   ├── components/   # Reusable UI components (Navbar, etc.)
│   │   ├── pages/        # Public pages (Home, Features, Pricing, Login, Register)
│   │   ├── layouts/      # Dashboard Layout with Sidebar
│   │   └── ...
│
├── backend/              # Spring Boot Application
│   ├── src/main/java/com/careerforge/backend/
│   └── src/main/resources/application.properties
│
└── database/             # MySQL Schema
    └── schema.sql
```

---

## 🚀 Getting Started

### 1. Database Setup
1. Install MySQL.
2. Create a database named `careerforge`.
3. Run the SQL script located in `database/schema.sql` to generate the tables.

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Update the database credentials in `src/main/resources/application.properties` if needed.
3. Build the project using Maven:
   ```bash
   mvn clean install
   ```
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
*The backend will start on `http://localhost:8080`.*

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
*The frontend will start on `http://localhost:5173`.*

---

## 🌍 Deployment Instructions

### Frontend (Vercel)
1. Push your code to GitHub.
2. Connect your GitHub repository to Vercel.
3. Set the Root Directory to `frontend`.
4. Vercel will automatically detect Vite and configure the build settings (`npm run build`).
5. Deploy!

### Backend (Render)
1. Connect your GitHub repository to Render and create a new **Web Service**.
2. Set the Root Directory to `backend`.
3. Environment: `Java`
4. Build Command: `mvn clean package -DskipTests`
5. Start Command: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
6. Add the Database connection string from Neon.tech as an Environment Variable (`DATABASE_URL`).

### Database (Aiven / PlanetScale)
1. Create a MySQL database project in Aiven or PlanetScale.
2. Copy the provided connection string.
3. Use this connection string in your Render backend environment variables.

---

## 🔑 Environment Variables Setup

**Backend (`application.properties` / Render Environment Variables):**
```properties
spring.datasource.url=jdbc:mysql://<MYSQL_URL>:3306/careerforge?useSSL=false&serverTimezone=UTC
spring.datasource.username=<DB_USER>
spring.datasource.password=<DB_PASSWORD>
jwt.secret=<YOUR_SUPER_SECRET_KEY_FOR_JWT>
```

**Frontend (`frontend/.env`):**
```env
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
```
