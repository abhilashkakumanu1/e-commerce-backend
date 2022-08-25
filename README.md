# e-commerce-backend

A simple e-commerce-backend in node.js

## How to deploy on local machine

**Prerequisites**: Need to have the latest version of `docker` and `docker compose`.

Navigate to the project directory and just run

```sh
# 1. Build
docker compose -f config/docker/docker-compose.local.yml build

# 2. Run
docker compose -f config/docker/docker-compose.local.yml up -d

# 3. server Logs
docker logs -f e-commerce-server
```

## Tech stack

Tech stack: `TypeScript`, `Docker`, `Mongo DB`, `node`, `express`

## Philosophy

The core philosophy behind a lot of choices taken while building this app are to showcase the breadth of my skill-set. On the bigger level, this project is just another glorified CRUD app. I could have connected node-express server to a mongodb database and wrapped up the project very easily.
These are some of non-trivial skills that are used in this project:

1. [Domain Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html): This project's architectural choices are heavily inspired by DDD philosophy. In the past this architecture has helped in creating
    1. Scalable: Each module can be individually scaled as a separate microservice. For example, orders module will be the one which is going to have most amount of traffic. To scale it up, we can individually deploy it separately
    2. Clean and testable: Uses SOLID principles in writing clean & testable code.
    3. Pluggable (Programming to interfaces): As domain layer is separated from infra level code, we can easily modify the code for future changes. Like lets say, its very easy to swap the database to Postgres, or add a command-line interface along-side with the existing http interface without touching the core business logic.
2. Docker: Helps automating a lot of the deployment work. This app can be easily deployed on any machine without worrying about O.S related dependencies.
3. TypeScript: Provides a bit of compile-time documentation with the help of type hints
4. Documentation: I believe good documentation saves a lot of time & helps in better asynchronous remote kind of work style.

## Decisions made

### Database

1. Decided to go with mongo-db for its simplicity (and my prior experience)
2. Initially thought of using the free tier of mongo-db atlas (cloud db) as db but decided against it as I have to share my connection credentials for the app to run locally. To avoid this I could have deployed the app (free tier of Vercel or Netlify) & hard-coded the `.env` credentials there. But decided to go against this whole approach as it involves user providing database credentials if he/she wants to run it locally.
3. Decided to dockerize the app cause the user might not have node, mongo-db etc on his computer. Now he/she can just run a single command and docker takes care of downloading respective software automatically (if they don't already exit). Also running it in a containerized environment makes sure that the app runs irrespective of User's O.S.
4. When creating models, instead of creating one model each for an entity represented in the requirements, I have changed it up a bit. It didn't seem right to have a product independent of seller, and also it felt redundant to have a catalogue collection. So, I have added sellerId property per product! => Assumption: A product belongs to a seller, it can't exist independently or it can't be a part of multiple sellers (which is the usual case in the real-life. Corner case: A same product might be sold by different sellers but the prices will be different. So, in essence they are different products).

### Models

1. Decided to store sellerId on product instead of products on user object. Reason => if products have to be added/deleted from seller's catalogue, we have to do array manipulations if we go save product details on user object.

### Server

For the sake of time constraints I am not implementing following features:

1. Testing: I know this is a very big thing and I know that any future changes might cause regressions. There are so many benefits of unit tests (and TDD => makes you think through the solution before implementing it, makes you write testable code - less coupling, etc). But, given time constraints I can't implement all the goodies. Trying to do the bare minimum and felt like following DDD will anyway facilitate Clean Code Architecture. So, not having unit isn't such causing such a big damage in this case. Anyway, that said, I have been doing manual testing (sing POSTMAN) on every new change.
2. Error handling: Not doing error handling as well. So, output error messages will be very crude, which shouldn't be the case in the production app.
3. Input validation: There are no checks for user input (like length of password etc)
4. Not doing /UPDATE, /DELETE APIs - example update catalog by seller, user password update etc

## API documentation

```js
const BASE_URL = "http://localhost:3000/api"

// 1. user sign up
Url: POST `{BASE_URL}/auth/register`
Body: {
    "username": "abhikaku1",
    "password": "PassWord1@",
    "type": "buyer"
}
Response: {
    "ok": true,
    "data": {
        "userId": "22ee9251-17d9-495e-8336-2971f3174aa1"
    }
}

// 2. user sign in
Url: POST `{BASE_URL}/auth/login`
Body: {
    "username": "abhikaku1",
    "password": "PassWord1@",
}
Response: {
    "ok": true,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmNzNkZTA5LTI3NTctNGYyMi04Y2M0LTBhZTRhODRjNTU0MyIsInVzZXJuYW1lIjoiYWJoaWtha3UxIiwidHlwZSI6ImJ1eWVyIiwiaWF0IjoxNjYxNDA5OTk3LCJleHAiOjE2NjIwMTQ3OTd9.uEMy7lLna8GORaEsG8WA7AqE6gduDdWgmKhBzdQpApI"
    }
}

// 3. list of sellers
Url: GET `{BASE_URL}/buyer/list-of-sellers`
Auth: Bearer Token <buyer_JWT>
Response: {
    "ok": true,
    "data": {
        "sellers": [
            {
                "username": "Seller1",
                "id": "47c57358-5356-4802-b10a-6457afe6985f"
            }
        ]
    }
}
```
