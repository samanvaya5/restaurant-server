# RESTAURANTS SERVER

Backend services developed in NodeJS

An Express based server.

## AUTHENTICATION

Username-Password based signup with the help of passport based local strategy

There after token based authentication for every request.  
JSON Web Token (JWT) are being issued on each login with a expiration time.

OAuth 2 based Facebook Authentication setup is also provided.  
A initial signup/login from Facebook shall provide the user details and thereafter a JWT shall be issued for subsequent requests.

## Security

HTTPS based server any HTTP request shall be redirected to HTTPS.  
Currently using a self signed certificate.  
Cross Origin are allowed only on selected types of request rest all are restricted

# Admin

An account marked as admin shall have special privileges.  
For security purpose manual marking of admin in database is being used  
Only an admin can

*   Create a dish
*   Create promotions
*   Access all the users list
*   Update a dish , etc.

# Database

MongoDB is being used to store all the data.

## Schema

**dishes**

*   Name
*   Description
*   Image
*   Category
*   Label
*   Price
*   Featured
*   Comments [Comment Schema]

**Comments**

*   Rating
*   Comment
*   Author

**User**

*   First-name
*   Last-name
*   admin
*   username
*   hash
*   salt
*   **Promotion**
*   Name
*   Description
*   Image
*   Category
*   Label
*   Price
*   Featured

**Leader**

*   Name
*   Image
*   Designation
*   Abbr
*   Description
*   Featured

## API ROUTES

### DISHES

**route('/dishes')**

*   GET : Read all the dishes available.
*   POST : Create a new dish.
*   DELETE : Delete all the dishes

**route('/dishes/:dishId')**

*   GET : Read the dish with given dishId.
*   PUT : Update a particular dish.
*   DELETE : Delete a dish.

**route('/dishes/:dishId/comments')**

*   GET : Read the comments of a dish with given dishId.
*   POST : Create new comment for the dish.
*   DELETE : Delete all comments.

**route('/dishes/:dishId/comments/:commentId')**

*   GET : Read a comment with given commentId of the dish with given dishId.
*   PUT : Update a particular comment.
*   DELETE : Delete a comment.

    ### PROMOTIONS

    **route('/promotions')**
*   GET : Read all the promotions available.
*   POST : Create a new promotion.
*   DELETE : Delete all the promotions.

**route('/promotions/:promotionId')**

*   GET : Read the promotion with given promotionId.
*   PUT : Update a particular promotion.
*   DELETE : Delete a promotion.

    ### Leaders

    **route('/leaders')**
*   GET : Read all the leaders available.
*   POST : Create a new leader.
*   DELETE : Delete all the leaders.

**route('/leaders/:leaderId')**

*   GET : Read a leader with given leaderId.
*   PUT : Update a particular leader.
*   DELETE : Delete a leader.

    ### Users

    **route('/users/')**
*   GET : Read all the users available.

**route('/users/signup')**

*   POST : Create a new user with username password.

**route('/users/login')**

*   POST : Login a user with username-password and provide a JWT.

**route('/users/facebook/token')**

*   GET : Login a user with Facebook and provide a JWT.
