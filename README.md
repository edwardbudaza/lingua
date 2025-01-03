# Lingua: Language Learning Platform

Lingua is a modern web application designed to make language learning engaging and interactive. Built with cutting-edge technologies like **Next.js**, **Drizzle ORM**, and **Shadcn UI**, Lingua offers a seamless user experience and is structured to enable scalability and maintainability.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Getting Started](#getting-started)
6. [Scripts](#scripts)
7. [Technologies Used](#technologies-used)

---

## Project Overview

Lingua is structured as a modular **Next.js** application with a focus on maintainable and scalable code. It includes functionalities like:

- **User Onboarding and Authentication** using Clerk.
- **Course Management**: Create, view, and manage courses with lessons and challenges.
- **Interactive Learning**: Quizzes, and progress tracking.
- **Responsive Design**: Optimized for both desktop and mobile.

---

## Features

- **Multi-page Application**: Organized with layouts, nested routes, and reusable components.
- **Database Integration**: Using Drizzle ORM with a Postgres backend hosted on Neon.
- **Interactive Components**: Leveraging Shadcn UI and custom reusable components.
- **State Management**: Context API and custom hooks.
- **Test and Seed Database**: Seed scripts for initializing test data.

---

## Architecture

The application is built with a **feature-first** architecture, separating concerns into logical directories under the `src` folder:

### Key Directories

- **`src/actions`**: Server-side logic for tracking user and challenge progress.
- **`src/app`**: Core application pages and layouts, organized by functionality:
  - **`(main)`**: The main user interface, including courses and learning modules.
  - **`(marketing)`**: Landing and promotional pages.
  - **Reusable Layouts**: Shared structure for pages like `layout.tsx`.
- **`src/components`**: Modular UI components and modal dialogs.
- **`src/db`**: Drizzle ORM configuration, schema definitions, and queries.
- **`src/hooks`**: Custom React hooks for shared logic.
- **`src/lib`**: Utility functions for common operations.
- **`src/scripts`**: Scripts for database seeding and maintenance.
- **`src/store`**: Context and state management for modal interactions.

---

## Installation

To run Lingua locally, follow these steps:

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- A **Postgres Database** (use Neon for serverless hosting)

### Clone the Repository

```bash
git clone https://github.com/<your-username>/lingua.git
cd lingua
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
DATABASE_URL=your_postgres_database_url
CLERK_API_KEY=your_clerk_api_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
```

Replace placeholders with your credentials.

### Initialize the Database

Run the following commands to set up the database schema and seed data:

```bash
npm run db:push
npm run db:seed
```

---

## Getting Started

To start the development server, run:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build and Start Production

To create a production build:

```bash
npm run build
npm start
```

---

## Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Start the development server.          |
| `npm run build`     | Create a production build.             |
| `npm start`         | Start the app in production mode.      |
| `npm run db:studio` | Open Drizzle Studio for schema design. |
| `npm run db:push`   | Apply database migrations.             |
| `npm run db:seed`   | Seed the database with test data.      |

---

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) with Postgres (Neon)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Styling**: Tailwind CSS
- **Icons**: Lucid Icons
- **State Management**: Zustand and Custom Hooks

---

Feel free to explore the codebase, and don’t hesitate to reach out if you have questions or suggestions. Happy coding!

```

```
