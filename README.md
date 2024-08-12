
# Qumulo Cluster Backend

## Prerequisites
- Node.js and npm installed

## Installation

### Clone the repository:
```bash
git clone https://github.com/your-username/your-repo.git
```

### Navigate to the project directory:
```bash
cd your-repo
```

### Install dependencies:
```bash
npm install
```

## Environment Setup

- Create a `.env` file at the root of the project.
- Add the following environment variable:
  ```bash
  DATA_DIR=./data
  ```

## Running the Application

### Start the Adonis.js server:
```bash
node ace serve
```

## API Endpoints

### Clusters
- **GET** `/api/clusters`: Retrieves a list of clusters.

### Time Series Data
- **GET** `/api/time-series`: Retrieves time series data (implementation details depend on your specific data format).

### Snapshot Policies
- **GET** `/api/snapshot-policies`: Retrieves a list of snapshot policies.
- **POST** `/api/snapshot-policies`: Creates a new snapshot policy.
- **GET** `/api/snapshot-policies/:id`: Retrieves details of a specific snapshot policy.
- **PUT** `/api/snapshot-policies/:id`: Updates an existing snapshot policy.
- **DELETE** `/api/snapshot-policies/:id`: Deletes a snapshot policy.

> **Note**: These are general examples, and the actual API endpoints and responses may vary depending on your specific requirements.

## Contributing
[Add guidelines for contributions if applicable]

## License
[Specify the license for your project]
