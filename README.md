# Notes App Backend
A Node.js, GraphQL backend application for working with user's notes.

### Table of Contents
- Features
- Technologies
- Prerequisites
- Getting Started
  - Installation
  - Usage
- Schema

### Features
- Create, Read, Update, and Delete (CRUD) operations for notes
- GraphQL API for interacting with the backend

### Technologies
- Node.js
- GraphQL
- Express
- MongoDB

### Prerequisites
- Node.js
- MongoDB

## Getting Started
### Installation
1. Clone the repository
```
git clone https://github.com/eugeneZenk/be-notes
```

2. Navigate to the project directory
```
cd notes-app
```

3. Install the dependencies
```
npm install
```

### Usage
1. Start the MongoDB server
```
docker-compose up
```
2. Start the Node.js server

```
npm run start
```
3. Navigate to http://localhost:5000/graphql in your browser to access the GraphQL playground.

### Schema
The schema for the Notes App Backend defines the queries and mutations available for interacting with the notes.

```
type Query {
note(id: ID!): Note!
notes: [Note!]!
}

type Mutation {
createNote(title: String!, content: String!): Note!
updateNote(id: ID!, title: String, content: String): Note!
deleteNote(id: ID!): Boolean!
}

type Note {
id: ID!
title: String!
content: String!
}
```