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
    1. Testing: I know this is a very big thing and I know that any future changes might cause regressions. There are so many benefits of unit tests (and TDD => makes you think through the solution before implementing it, makes you write testable code - less coupling, etc). But, given time constraints I can't implement all the goodies. Trying to do the bare minimum and felt like following DDD will anyway facilitate Clean Code Architecture. So, not having unit isn't such causing such a big damage in this case. Anyway, that said, I have been doing manual testing (sing POSTMAN) on every new change.
    2. Error handling: Not doing error handling as well. So, output error messages will be very crude, which shouldn't be the case in the production app.
    3. Input validation: There are no checks for user input (like length of password etc)
    4. Not doing /UPDATE, /DELETE APIs - example update catalog by seller, user password update etc
