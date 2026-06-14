# Honest Reviewer API

Backend API for the Honest Reviewer platform, a full-stack social application where authenticated users can create reviews, interact with content, manage profiles, and upload images.

**Author:** Gerson Ruíz Sequeda

## Frontend Application

🌐 https://honest-reviewer.vercel.app/

## Technologies

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Multer
* REST API Architecture

## Features

### Authentication & Authorization

* User registration with duplicate email validation.
* Secure login system.
* JWT-based authentication.
* Protected API routes.
* Authorization based on resource ownership.
* Token verification middleware.

### User Management

* User profile updates.
* Secure password changes.
* Password hashing using Bcrypt.
* Authentication required for protected actions.

### Content Management

* Create reviews and posts.
* Upload images using Multer.
* Comment on content.
* React to posts and reviews.
* Users can manage their own content.
* Ownership validation prevents modification of resources belonging to other users.

### Database

* MongoDB integration using Mongoose.
* Schema-based data modeling.
* Relationship management between users, posts, comments, and reactions.

### API Architecture

* RESTful API design.
* Route organization by resource.
* Controller-based architecture.
* Middleware-based authentication and validation.
* Centralized request processing.

## Security Features

* Password hashing with Bcrypt.
* JWT authentication and authorization.
* Protected routes.
* Ownership validation.
* Duplicate email prevention during registration.

## Deployment

The backend is deployed on Railway and serves the production frontend application.

## Main Functionalities Supported

* User registration and authentication.
* Profile management.
* Password updates.
* Image uploads.
* Post creation.
* Comment system.
* Reactions and interactions.
* Authorization and content ownership validation.

## Live Application

You can test the complete application here:

🌐 https://honest-reviewer.vercel.app/

Create an account or sign in to explore all available features.

## Author

**Gerson Ruíz Sequeda**
