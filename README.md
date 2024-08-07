
# REST Countries API Integration

This project is a REST API built with TypeScript and Express.js. It integrates data from the REST Countries API to provide meaningful information through various endpoints.

## Setup Instructions

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/rest-countries-api.git
   cd rest-countries-api
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```sh
   PORT=5000
   ```

### Running the Application

1. Start the development server:
   ```sh
   npm run dev
   ```

2. The API will be accessible at `http://localhost:5000/api`.

3. To view the API documentation, visit:
   ```sh
   http://localhost:5000/api-docs
   ```

## Implementation Overview

This project utilizes the following technologies and tools:

- **TypeScript**: For type safety and improved developer experience.
- **Express.js**: For building the RESTful API.
- **Swagger**: For API documentation.
- **REST Countries API**: For fetching country data.
- **Helmet**: For securing HTTP headers.
- **Rate Limiting**: To prevent abuse by limiting the number of requests.
- **CSRF Protection**: To secure the application from cross-site request forgery attacks.
- **Cookie Parser**: For parsing cookies in requests.

The project follows a modular structure with separate directories for controllers, routes, models, and services to ensure clean code organization and maintainability.

## Interesting Challenges and Features

### Challenges

- **Integration with REST Countries API**: Ensuring integration and handling edge cases such as network failures or incorrect data.
- **TypeScript Configuration**: Setting up TypeScript with all necessary type declarations, especially for third-party libraries without existing types.
- **Security Measures**: Implementing CSRF protection and rate limiting while maintaining usability.

### Features

- **Modular Architecture**: The project is divided into controllers, routes, services, and models for better organization and scalability.
- **Comprehensive API Documentation**: Integrated Swagger for automatic API documentation.
- **Robust Error Handling**: Implemented consistent error handling mechanisms to provide clear error messages to the clients.
- **Security Best Practices**: Utilized Helmet, CSRF protection, and rate limiting to secure the application.

## Aspects I Am Particularly Proud Of

- **Clean Code Structure**: The project's modular architecture makes it easy to extend and maintain.
- **Type Safety**: Leveraging TypeScript to catch errors at compile time and provide a better developer experience.
- **Detailed Documentation**: The Swagger documentation provides clear and comprehensive information about the API endpoints, making it easy for other developers to understand and use the API.

## Potential Improvements and Additional Features


- **Caching**: Implementing caching mechanisms to improve performance for frequently accessed data.
- **Pagination**: Adding pagination support for endpoints that return large datasets.
- **Automated Tests**: Writing unit and integration tests to ensure the reliability of the application.


## Evaluation Criteria

- **Code Quality**: Follows best practices and conventions, ensuring readability and maintainability.
- **Documentation**: Comprehensive setup instructions, API documentation, and code comments.
- **Functionality**: All endpoints work as expected, handling edge cases gracefully.
- **Security**: Implements necessary security measures to protect the application and data.
```
