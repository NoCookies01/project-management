# Project Management

## Description

Project Management is a test project where user have projects and tasks and can make different actions with tasks. This project is built using Express js with Postgresql database and sequelize ORM. Below are the steps to set it up and run locally.

For API Documentation please visit link: https://app.getpostman.com/join-team?invite_code=67318db0914761223b9b5ec4134227a0&target_code=320cbb978dcf28c70431f1daa2a0ef4e

# Getting Started
## Prerequisites
Ensure you have the following installed on your local machine:

### Git
### Node.js version 14 or higher
### npm
### PostgreSQL as main database

## Installation Steps

### Clone the Repository
Clone this repository to your local machine:

```
git clone
```

### Install Dependencies
Navigate to the project directory and install the required dependencies:

cd project-management
```
npm install
```

### Set Up Environment Variables
Create a .env file in the root directory by copying the env.example file:

```
cp .env.example .env
```
Fill the .env file with appropriate values based on your local database configuration.

### Run Migrations
Apply the database migrations to set up the schema:

```
npm run migrate
```

### Start the Development Server
Start the server in development mode:

```
npm run dev
```