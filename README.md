# e-commerce-backend

A simple e-commerce-backend in node.js

## Decisions made

### Database

1. Decided to go with mongo-db for its simplicity (and my prior experience)
2. Initially thought of using the free tier of mongo-db atlas (cloud db) as db but decided against it as I have to share my connection credentials for the app to run locally. To avoid this I could have deployed the app (free tier of Vercel or Netlify) & hard-coded the `.env` credentials there. But decided to go against this whole approach as it involves user providing database credentials if he/she wants to run it locally.
3. Decided to dockerize the app cause the user might not have node, mongo-db etc on his computer. Now he/she can just run a single command and docker takes care of downloading respective software automatically (if they don't already exit). Also running it in a containerized environment makes sure that the app runs irrespective of User's O.S.

### Models

1. Decided to store sellerId on product instead of products on user object. Reason => if products have to be added/deleted from seller's catalogue, we have to do array manipulations if we go save product details on user object.

### Server

1. For the sake of time constraints I am not implementing following features:
    1. Input validation: There are no checks for user input (like length of password etc)
    2. Error handling: Not doing error handling as well. So, output error messages will be very crude, which shouldn't be the case in the production app.
