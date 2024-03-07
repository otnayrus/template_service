This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Backend server port: 8001
Frontend server port: 3000

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
