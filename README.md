[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19700934&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 

# Project Documentation

# Express.js RESTful Product API

This project implements a RESTful API for managing products using Express.js. It covers standard CRUD operations, middleware for logging, authentication, and validation, comprehensive error handling, and advanced features like filtering, pagination, and search.

## 📂 Project Structure
. ├── server.js # Main application file ├── data/ │ └── products.js # In-memory data store for products (replace with DB for production) ├── errors/ │ └── index.js # Custom error classes (NotFoundError, ValidationError, etc.) ├── middleware/ │ ├── auth.js # Authentication middleware (API Key check) │ ├── logger.js # Custom request logger middleware │ └── validation.js # Product data validation middleware ├── routes/ │ └── productRoutes.js # Product-specific API endpoints (CRUD, stats, search, filter, pagination) ├── utils/ │ └── errorHandler.js # Utility to catch and forward async errors to global handler ├── .env.example # Example environment variables file ├── .gitignore # Specifies intentionally untracked files to ignore ├── package.json # Project dependencies and scripts └── README.md # Project documentation

## 🛠 Setup

Make sure you have Node.js (v18 or higher recommended) installed on your system.

1. **Clone the repository:**
    ```bash
    git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-kipngetich-lab.git
    cd  week-2-express-js-assignment-kipngetich-lab.git
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
    This will install `express`, `body-parser`, `uuid`, and `dotenv`. It will also install `nodemon` as a development dependency.

3. **Create `.env` file:**
    Copy the `.env.example` file to `.env` in the root directory and set your API key:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and replace `your_super_secret_api_key_here` with a strong, unique value.
    Example `.env` content:
    ```
    PORT=3000
    API_KEY=a_very_secure_random_api_key_12345
    ```
    **Remember to add `.env` to your `.gitignore` file to prevent committing sensitive information.**

## 🚀 How to Run the Server

To start the server in development mode (with `nodemon` for auto-restarts):
bash npm run dev

To start the server in production mode:
bash npm start ```

The server will start on http://localhost:3000. You will see console messages indicating the port and API access points.

📖 API Endpoints Documentation

All API endpoints (except the root / "Hello World" route) are prefixed with /api and require an x-api-key header with the value set in your .env file.

Product Resource Fields

A product object has the following fields:

id: (string) Unique identifier (auto-generated upon creation).
name: (string) The name of the product.
description: (string) A brief description of the product.
price: (number) The price of the product.
category: (string) The category the product belongs to (e.g., "Electronics", "Accessories").
inStock: (boolean) Indicates if the product is currently in stock.

1. GET /

Description: A basic health check or welcome message.
Authentication: Not required.
Response (200 OK): Hello World! Welcome to the Products API.

2. GET /api/products

Description: Retrieves a list of all products. Supports filtering by category, searching by name, and pagination.

Authentication: Required (x-api-key header).

Query Parameters (Optional):

    category: string - Filters products by their category (case-insensitive).
    search: string - Searches product names for a partial match (case-insensitive).
    page: number - The page number for pagination (default: 1).
    limit: number - The number of products per page (default: 10).
    Example Request: http GET http://localhost:3000/api/products?category=electronics&search=laptop&page=1&limit=5 x-api-key: a_very_secure_random_api_key_12345
    Example Response (200 OK): json { "total": 1, "page": 1, "limit": 5, "products": [ { "id": "f8a0b0e0-1234-5678-abcd-efgh12345678", "name": "Laptop Pro X", "description": "Powerful laptop for professional use with high performance.", "price": 1500, "category": "Electronics", "inStock": true } ] }
    Example Error Response (400 Bad Request - Validation): json { "status": "error", "message": "Product data validation failed.", "errors": [ { "message": "Limit must be a positive integer." } ] }
3. GET /api/products/:id

    Description: Retrieves a single product by its unique identifier.
    
    Authentication: Required (x-api-key header).

    URL Parameters::id: string - The unique ID of the product.

    Example Request: http GET http://localhost:3000/api/products/f8a0b0e0-1234-5678-abcd-efgh12345678 x-api-key:a_very_secure_random_api_key_12345

    Example Response (200 OK): json { "id": "f8a0b0e0-1234-5678-abcd-efgh12345678", "name": "Laptop Pro X", "description": "Powerful laptop for professional use with high performance.", "price": 1500, "category": "Electronics", "inStock": true }

    Example Error Response (404 Not Found): json { "status": "error", "message": "Product with ID non-existent-id not found." }

4. POST /api/products

    Description: Creates a new product.

    Authentication: Required (x-api-key header).

    Headers:Content-Type: application/json

    Request Body (JSON): All fields are required and must be valid according to the product schema. json { "name": "Mechanical Keyboard", "description": "Clicky and responsive keyboard for gamers and typists.", "price": 120, "category": "Accessories", "inStock": true }

    Example Response (201 Created): json { "id": "a_newly_generated_uuid_for_product", "name": "Mechanical Keyboard", "description": "Clicky and responsive keyboard for gamers and typists.", "price": 120, "category": "Accessories", "inStock": true }

    Example Error Response (400 Bad Request - Validation): json { "status": "error", "message": "Product data validation failed.", "errors": [ { "field": "price", "message": "Price must be a positive number." } ] }

5. PUT /api/products/:id

    Description: Updates an existing product identified by its ID. Provides partial update functionality.

    Authentication: Required (x-api-key header).

    URL Parameters::id: string - The unique ID of the product to update.

    Headers:Content-Type: application/json

    Request Body (JSON): Any combination of product fields can be provided. If a field is provided, it must be valid. The id field in the body will be ignored if present. json { "price": 130, "inStock": false }

    Example Response (200 OK): json { "id": "f8a0b0e0-1234-5678-abcd-efgh12345678", "name": "Mechanical Keyboard", "description": "Clicky and responsive keyboard for gamers and typists.", "price": 130, "category": "Accessories", "inStock": false }

    Example Error Response (404 Not Found): json { "status": "error", "message": "Product with ID non-existent-id not found." }

    Example Error Response (400 Bad Request - Validation): json { "status": "error", "message": "Product update validation failed.", "errors": [ { "field": "name", "message": "Name must be a non-empty string if provided." } ] }

6. DELETE /api/products/:id

    Description: Deletes a product identified by its ID.

    Authentication: Required (x-api-key header).

    URL Parameters::id: string - The unique ID of the product to delete.

    Example Request: http DELETE http://localhost:3000/api/products/f8a0b0e0-1234-5678-abcd-efgh12345678 x-api-key: a_very_secure_random_api_key_12345

    Example Response (204 No Content): A successful deletion will return an empty response body with a 204 No Content status code.

    Example Error Response (404 Not Found): json { "status": "error", "message": "Product with ID non-existent-id not found." }

7. GET /api/products/stats

    Description: Provides aggregate statistics about products, specifically a count of products per category.

    Authentication: Required (x-api-key header).

    Example Request: http GET http://localhost:3000/api/products/stats x-api-key: a_very_secure_random_api_key_12345

    Example Response (200 OK): json { "Electronics": 2, "Accessories": 3, "Gaming": 1, "Storage": 1 }

🔒 Authentication

All API routes under /api (excluding / root) require an x-api-key HTTP header. The value for this API key is configured in your .env file (e.g., API_KEY=your_super_secret_api_key_here). If the x-api-key header is missing or its value is incorrect, the API will respond with a 401 Unauthorized error.

📝 Error Handling

The API implements a global error handling middleware to ensure consistent and informative error responses. Custom error classes (NotFoundError, ValidationError, UnauthorizedError, ForbiddenError) are used to distinguish between different types of operational errors.

Common error responses:

    400 Bad Request: Indicates client-side input errors (e.g., invalid data format, missing required fields). Example: {"status": "error", "message": "Product data validation failed.", "errors": [{"field": "price", "message": "Price must be a positive number."}]}

    401 Unauthorized: Occurs when authentication credentials (API key) are missing or invalid. Example: {"status": "error", "message": "Unauthorized: Invalid or missing authentication credentials"}

    404 Not Found: Returned when the requested resource does not exist. Example: {"status": "error", "message": "Product with ID abc not found."}

    500 Internal Server Error: A generic error for unexpected server-side issues. Example: {"status": "error", "message": "Something went wrong on the server."}