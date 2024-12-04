# **CRUD of Tasks with TypeScript**

This project is a practical example of a simple CRUD (Create, Read, Update, Delete) for task management, developed using **Node.js**, **TypeScript**, and following best practices in architecture and project design.

## **Project Description**

The goal of this project is to demonstrate the construction of a RESTful API for managing tasks. The application was designed to follow a clean and modular architecture, using principles of **MVC** (Model-View-Controller) and best practices in code design.

The application implements the following operations:
- **Create Task**: Add a new task.
- **Read Tasks**: List all tasks or return an error if there are no tasks.
- **Update Task**: Update information for an existing task.
- **Delete Task**: Remove a task.
- **Complete Task**: Mark a task as completed.

---

## **Project Highlights**

### **1. MVC Architecture**
- **Controllers**: Handle the request logic and interact with handlers.
- **Handlers**: Responsible for processing data and implementing business logic.
- **Routes**: Configure the endpoints and connect the controllers to their appropriate routes.

### **2. Best Practices**
- Usage of **TypeScript** for better security and static typing.
- Modularized application, improving maintenance and scalability.
- Clear separation of responsibilities, with **controllers**, **handlers**, and **routes**.
- Creation of unit and integration tests using **Vitest** and **Supertest**.
- Use of mocks to isolate tests and avoid dependencies between modules.

---

## **Project Structure**

The project structure is organized to be scalable and easy to navigate and maintain. Below is an overview of the main directories:
```graphql
src/
├── @types/            # TypeScript type definitions
├── controllers/       # HTTP request logic
├── handlers/          # Business logic
├── routes/            # Route configuration
├── tests/             # Unit and integration tests
│   ├── test_controllers/
│   ├── test_handlers/
│   ├── test_integrations/
└── app.ts             # Main application configuration
```
---

## **Technologies Used**

- **Node.js**: JavaScript runtime environment.
- **TypeScript**: Language that adds static typing to JavaScript.
- **Fastify**: Lightweight and fast framework for building APIs.
- **Vitest**: Tool for unit and integration tests.
- **Supertest**: Library for testing HTTP endpoints.

---

## **About the Project**

This project was developed with the goal of improving skills in:

1. **TypeScript**: Building typed and secure applications.
2. **Best practices in architecture**: Applying patterns like MVC.
3. **Automated testing**: Ensuring code quality through unit and integration tests.
4. **Project organization**: Creating modular and scalable structures.

## **How to run**

1 - Clone Repository:
```bash
git clone https://github.com/edmalfizeo/Node_Fundamentals.git
```

2 - Install Dependencies
```bash
npm install
```

3 - Run Server
```
npm run server
```

4 - Run Tests
```
npm run test
```
