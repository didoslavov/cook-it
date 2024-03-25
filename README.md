**Backend Packages**

[![Node.js](https://img.shields.io/badge/Node.js-✓-green)]() [![Express.js](https://img.shields.io/badge/Express.js-✓-lightgrey)]() [![MySQL](https://img.shields.io/badge/MySQL-✓-blue)]() [![Sequelize](https://img.shields.io/badge/Sequelize-✓-blueviolet)]() [![JWT](https://img.shields.io/badge/JWT-✓-blue)]() [![Bcrypt](https://img.shields.io/badge/Bcrypt-✓-blueviolet)]()

**Frontend Packages**

[![Angular](https://img.shields.io/badge/Angular-✓-red)]() [![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)]() [![FontAwesome](https://img.shields.io/badge/FontAwesome-✓-orange)]() [![RxJS](https://img.shields.io/badge/RxJS-✓-red)]() [![Supabase](https://img.shields.io/badge/Supabase-✓-blue)]() [![Animate.css](https://img.shields.io/badge/Animate.css-✓-orange)]() [![Ngx Cookie Service](https://img.shields.io/badge/Ngx%20Cookie%20Service-✓-green)]() [![Ngx Infinite Scroll](https://img.shields.io/badge/Ngx%20Infinite%20Scroll-✓-green)]()

# Cook-It

**Cook-It** is a recipe application that facilitates users in discovering, creating, and managing recipes.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Project Deployment](#project-deployment)
-   [Key Features](#key-features)
-   [How It Works](#how-it-works)
-   [Project Structure](#project-structure)
-   [Running the Application](#running-the-application)
-   [API Endpoints](#api-endpoints)
-   [License](#license)

## Project Overview

#### Watch video overview of the project

[![Your Video](https://img.youtube.com/vi/Dm_pLo4hx94/0.jpg)](https://www.youtube.com/watch?v=Dm_pLo4hx94)

**Cook-It** is designed to simplify the process of managing recipes, providing users with a platform to explore, create, and organize their favorite recipes. With features like user authentication, CRUD operations on recipes, and search functionality, Cook-It offers a seamless cooking experience for enthusiasts of all levels.

## Deployed Project Showcase

Cook-It backend and frontend are deployed separately. The backend API and the frontend application is deployed on are deployed on [Render](https//render.com). Database is deployed on [Aiven](https//aiven.io) Below are the deployment details:

-   **Try it**: [Cook IT](https://cookit-3j6u.onrender.com/)

### Note

Due to free nature of deployment plans, the api is put to sleep due to inactivity. It may take up to a minute to "wake up". Please give a time. :)

## Key Features

1. **User Authentication**:

    - Users can register, log in, and log out securely.
    - JWT tokens are used for authentication.

2. **Recipe Management**:

    - CRUD operations for recipes (Create, Read, Update, Delete).
    - Users can search for recipes by ingredients.

3. **User Interaction**:
    - Users can like and bookmark recipes.
    - View user-specific recipes such as liked, bookmarked, and created recipes.

## How It Works

1. **User Authentication**:

    - Users register for an account or log in if they already have one.
    - Upon successful authentication, users receive a JWT token for subsequent requests.

2. **Recipe Management**:

    - Users can browse existing recipes.
    - They can create new recipes, edit existing ones, or delete recipes they own.

3. **User Interaction**:
    - Users can like and bookmark recipes to save them for later reference.
    - They can view their liked, bookmarked, and created recipes in their profile.

## Project Structure

The project follows a structured organization to enhance maintainability and ease of navigation. Here's a brief overview of the main directories and their purposes:

-   **`/server`**: Contains the backend application built with Node.js and Express.

    -   `/components`: Contain logic for separate components like Recipe, User etc.
    -   `/components/share`: Contain relational components, errors, middlewares, validations etc.

-   **`/client`**: Contains the frontend application built with Angular.

    -   `/src`: Angular components, styles, and application logic.

Feel free to explore each directory for more detailed information on their contents. This structure is designed to enhance code organization, making it easier for developers to locate and work on specific aspects of the application.

## Running the Application

### Clone the Repository

```bash
git clone https://github.com/didoslavov/rButler.git
```

#### Server Setup

1.  Open a new Command Prompt or PowerShell window in the root directory of your project.
2.  Navigate to the `server` directory:

    ```bash
    cd server
    ```

3.  Create a new `.env` file in the `server` directory with the following content (Fill <EXAMPLE> with your actual data):

    ```plaintext
    DATABASE_PORT=18031
    DATABASE_HOST=<DATABASE HOST>
    DATABASE_NAME=<DATABASE NAME>
    DATABASE_USER=<DATABASE USER>
    DATABASE_PASSWORD=<DATABASE PASSWORD>
    JWT_SECRET=<JWT SECRET>
    ```

4.  Install server dependencies:

    ```bash
    npm install
    ```

5.  Start the server in development mode:

    ```bash
    npm run dev
    ```

#### Client Setup

1. Open a new Command Prompt or PowerShell window in the root directory of your project.
2. Navigate to the `client` directory:

    ```bash
    cd client
    ```

3. Create a new `.env` file in the `client` directory with the following content (Fill <EXAMPLE> with your actual data):

    ```plaintext
    NG_APP_NEWS_API_KEY=<NEWS API KEY>
    NG_APP_NEWS_API_URL=https://newsapi.org/v2/everything
    NG_APP_API_URL=https://cook-it.onrender.com
    NG_APP_SUPABASE_URL=<SUPABASE URL>
    NG_APP_SUPABASE_BUCKET=/storage/v1/object/public/<SUPABASE BUCKET NAME>/
    NG_APP_SUPABASE_API_KEY=<SUPABASE API KEY>
    ```

4. Install client dependencies:

    ```bash
    npm install
    ```

5. Start the client in development mode:

    ```bash
    npm run dev
    ```

6. Client setup complete! Open the following link in your web browser:
   http://localhost:5173

## API Endpoints

### Authentication

-   **POST /users/register**

    -   _Description_: Register a new user.
    -   _Request_:
        ```json
        {
            "username": "string",
            "email": "string",
            "password": "string"
        }
        ```
    -   _Response_:
        ```json
        {
            "user": {
                "id": "string",
                "firstName": "string",
                "lastName": "string",
                "img": "string",
                "email": "string"
            }
        }
        ```

-   **POST /users/login**
    -   _Description_: Authenticate and log in a user.
    -   _Request_:
        ```json
        {
            "email": "string",
            "password": "string"
        }
        ```
    -   _Response_:
        ```json
        {
            "user": {
                "id": "string",
                "firstName": "string",
                "lastName": "string",
                "img": "string",
                "email": "string"
            }
        }
        ```

### User Management

-   **GET /users**

    -   _Description_: Get all users.
    -   _Response_:
        ```json
        [
            {
                "id": "string",
                "firstName": "string",
                "lastName": "string",
                "img": "string",
                "email": "string"
            }
        ]
        ```

-   **PATCH /users/:userId/update**

    -   _Description_: Update user information.
    -   _Request_:
        ```json
        {
            "firstName": "string",
            "lastName": "string",
            "img": "string"
        }
        ```
    -   _Response_:
        ```json
        {
            "id": "string",
            "firstName": "string",
            "lastName": "string",
            "img": "string",
            "email": "string"
        }
        ```

-   **GET /users/recipes**

    -   _Description_: Get recipes associated with the user.
    -   _Response_:
        ```json
        [
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "ingredients": ["string"],
                "steps": ["string"],
                "createdAt": "string",
                "updatedAt": "string",
                "userId": "string"
            }
        ]
        ```

-   **GET /users/recipes/liked**

    -   _Description_: Get recipes liked by the user.
    -   _Response_:
        ```json
        [
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "ingredients": ["string"],
                "steps": ["string"],
                "createdAt": "string",
                "updatedAt": "string",
                "userId": "string"
            }
        ]
        ```

-   **GET /users/recipes/bookmarked**
    -   _Description_: Get recipes bookmarked by the user.
    -   _Response_:
        ```json
        [
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "ingredients": ["string"],
                "steps": ["string"],
                "createdAt": "string",
                "updatedAt": "string",
                "userId": "string"
            }
        ]
        ```

## License

    This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit/) file for details.
