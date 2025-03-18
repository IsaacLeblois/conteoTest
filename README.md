```
# User Management API

This is a simple API for managing users built with Node.js, Express, and MongoDB. It allows you to create, update, delete, and fetch users, as well as search by city.

---

## API Endpoints

### POST /api/users
- **Description:** Create a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "age": 30,
    "addresses": [
      {
        "street": "123 Main St",
        "city": "Los Angeles",
        "country": "USA",
        "postal_code": "90001"
      }
    ]
  }
  ```
- **Response:** `201 Created` on success.

### GET /api/users
- **Description:** Get a list of users (supports pagination).
- **Query Parameters:** `page`, `limit`, `sortBy`
- **Response:** List of users with pagination info.

### GET /api/users/:id
- **Description:** Get a user by ID.
- **Response:** `200 OK` or `404 Not Found` if user not found.

### PUT /api/users/:id
- **Description:** Update a user by ID.
- **Request Body:** Same as POST `/api/users`
- **Response:** `200 OK` on success, `404 Not Found` if user not found.

### DELETE /api/users/:id
- **Description:** Delete a user by ID.
- **Response:** `200 OK` on success, `404 Not Found` if user not found.

### GET /api/users/search
- **Description:** Search users by city.
- **Query Parameter:** `city`
- **Response:** List of users found in the specified city.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/isaacleblois/conteotest.git
   ```

2. Install dependencies:
   ```bash
   cd conteotest
   npm install .
   ```

3. Run the app:
   ```bash
   npm start
   ```

---