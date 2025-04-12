# BST Visualizer

Interactive Binary Search Tree visualization tool built with React and Spring Boot.

## Stack

**Frontend**

- React 18 with React Router
- React D3 Tree for visualization
- Axios for API calls
- CSS Modules for styling

**Backend**

- Spring Boot
- MongoDB
- RESTful API

## Quick Start

### Frontend (Port 3000)

```bash
npm install
npm start
```

### Backend (Port 8080)

Requires:

- Java 17+
- MongoDB running on port 27017

```bash
./mvnw spring-boot:run
```

## API Endpoints

```
POST /api/process-numbers
- Creates new BST from array of numbers

GET /api/previous-trees
- Retrieves tree history
```

## Features

- Create BST by entering numbers
- Real-time tree visualization
- View previous trees
- Interactive tree navigation
