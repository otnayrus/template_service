This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Kindly follow the steps below to get started with the project.

### Prerequisites
- Node.js (brew install node)
- MySQL (brew install mysql)
    - create a database called `template_service` in your MySQL server
    - change the credentials in `main.go` to match your MySQL server credentials

### Installation
- run `make install` to install all the dependencies
- if it's the first time you're running the project, run `make migrate` to create the database tables
- run `make run-local-server` to start the server (should be on port 8001)
- run `make run-local-client` to start the client (should be on port 3000)

### Notes
Project directory structure:
- .devtools: contains sql files for creating the database and tables
- api (server): contains the backend code
    - cmd/main.go: is main entry point for the server
    - delivery: http request handlers
    - dto: models, request and response objects
    - pkg: utility functions and packages
    - repository: database operations
- public (client): contains the public assets
- src (client): contains the frontend code
    - app: contains the main app component, routes should follow the directory structure inside this folder
    - components: contains reusable components
    - fetch: contains the fetch function for making requests to the server

Code is runnable on local using node version `20.0`. If you have any issues running the project, kindly try to use similar environment.
