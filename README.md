# InclusiveTrip-BE


This project is a Node.js Express API server designed for managing reviews from the users.

## Prerequisites

Before running this server, ensure you have the following installed:

- [nodejs](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:AhmedMohamad7/InclusiveTrip-BE.git
   cd InclusiveTrip-BE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Server

To start the server, run the following command:

```bash
npm run dev
```

The server will start running at [http://localhost:3000](http://localhost:3000)


## API Endpoints

The following endpoints are available:

### Users

- **POST /users** Create a new user.
- **GET /users** Get all users.
- **GET /users/count** Get the count of the users.
- **GET /users/:id** Get a single user by id.
- **PUT /users/:id** Update an existing user by id.
- **DELETE /users/:id** Delete an user by id.

### Reviews

- **POST /reviews** Create a new review.
- **GET /reviews** Get all reviews.
- **GET /reviews/count** Get the count of reviews.
- **GET /reviews/user** Get all reviews for the signed in user.
- **GET /reviews/:placeId* Get a single review by placeId.
- **PUT /reviews/:placeId** Update an existing review by placeId.
- **DELETE /reviews/:placeId** Delete an review by placeId.

### Auth

- **POST /auth/register** Register a new user.
- **POST /auth/signin** Authenticates the user.
- **GET /auth/me** Get the logged-in user.
- **DELETE /auth/signout** Logging out the logged in user.


### PlaceCategories

- **POST /placeCategories** Create a new placeCategory.
- **GET /placeCategories** Get all placeCategories.
- **GET /placeCategories/selected** Get all selected placecategories.
- **GET /placeCategories/:name** Get a single placeCategory by name.
- **PUT /placeCategories/:id** Update an existing placeCategory by id.
- **DELETE /placeCategories/:id* Delete an placeCategory by id.


### Roles

- **POST /roles** Create a new role.
- **GET /roles** Get all roles.
- **GET /roles/:id** Get a single role by id.
- **PUT /roles/:id** Update an existing role by id.
- **DELETE /roles/:id* Delete an role by id.


### Barriers

- **POST /barriers** Create a new barrier.
- **GET /barriers** Get all Barriers.
- **GET /barriers/selected** Get all selected Barriers.
- **GET /barriers/:name** Get a single barrier by name.
- **PUT /barriers/:name** Update an existing barrier by name.
- **DELETE /barriers/:name* Delete an barrier by name.


### BarriersReviews

- **POST /barriersReviews** Create a new barriersReview.
- **GET /barriersReviews** Get all barriersReviews.
- **GET /barriersReviews/:id** Get a single barriersReview by id.
- **PUT /barriersReviews/:id** Update an existing barriersReview by id.
- **DELETE /barriersReviews/:id* Delete an barriersReview by id.


### FileUploads

- **POST /file-upload** Create a new FileUpload.
- **GET /file-upload** Get all FileUploads.
- **GET /file-upload/:filename** Get a single FileUpload by filename.
- **PUT /file-upload/:filename** Update an existing FileUpload by filename.
- **DELETE /file-upload/:filename* Delete an FileUpload by filename.


### ProfilePhotos

- **POST /profilePhotos** Create a new profilePhoto.
- **GET /profilePhotos/:userid** Get a single profilePhoto by userid.
- **PUT /profilePhotos/:userid** Update an existing profilePhoto by userid.
- **DELETE /profilePhotos/:userid* Delete an profilePhoto by userid.





## Configuration

Environment-specific configurations can be set in `.env` file. take a look at the `example-ENV-file` file.

Create a new `.env` file and then copy the contents of `example-ENV-file` into it, you may change the `JWT_SECRET` and `PG_URI` values.