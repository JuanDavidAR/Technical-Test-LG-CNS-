# Todo List Application

This is a Todo List application developed with a Spring Boot backend and a Vue.js frontend. Below you'll find instructions on how to install dependencies, run the application, and execute the tests.

### Backend:
- **Oracle Open JDK 23.0.2** or **Java 17** is required for the backend. Ensure that you have the correct version installed.
- he backend will start running on http://localhost:8080.
- The backend provides the following endpoints:
  - GET /tasks
Returns a list of all tasks
  - POST /tasks
Creates a new task. Requires a request body with the task details.
  - PUT /tasks/{id}
Updates an existing task. Requires the task ID in the URL and the task details in the request body.
  - DELETE /tasks/{id}
Deletes a task by ID.

### FrontEnd:

- Node.js (22.13.1) and npm (11.1.0) are required for the frontend.
- The frontend will be accessible at http://localhost:8081.

## Running the Application
- Start the backend server first on port 8080 using the steps mentioned above.
- Then, start the frontend server on port 8081.
- The application should be up and running. You can now access the Todo List interface and interact with the backend to add, update, or delete tasks.  
