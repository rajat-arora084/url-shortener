# URL Shortener

A URL shortening application that generates short URLs using **Base62 encoding of the database row ID**. The original long URL is stored in the database and is not encoded.

## Features

- **Create a Short URL:** Generate a short URL for a given long URL.
- **Verify a Short URL:** Enter a short URL to retrieve the original long URL.
- **Avoid Duplicate Entries:** A new database record is created only if the long URL does not already exist in the database.
- **URL Redirection:** Visiting a short URL redirects the browser to the original long URL.
- **Base62 Encoding:** Encode the database row ID to generate a compact short code.

## How It Works

### 1. Create a Short URL

1. The user enters a long URL in the frontend.
2. The backend checks whether the long URL already exists in the database.
3. If the URL exists, the existing short URL is returned.
4. Otherwise, a new database record is created.
5. The database row ID is encoded using Base62.
6. The generated short URL is returned to the frontend.

### 2. Verify a Short URL

1. The user enters a short URL in the frontend.
2. The backend extracts the short code.
3. The short code is decoded from Base62 to retrieve the database row ID.
4. The backend looks up the corresponding database record.
5. The original long URL is returned and displayed in the frontend.

**Input:** Short URL

**Output:** Original long URL

### 3. Redirect to the Original URL

1. The user opens a short URL in the browser.
2. The backend extracts the short code and decodes it from Base62.
3. The decoded ID is used to look up the database record.
4. The browser is redirected to the original long URL.

## Base62 Encoding

Base62 uses the following character set:

`0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`

Only the database row ID is encoded. The original long URL is stored in the database without encoding.

**URL creation flow:**

`Long URL → Database record → Row ID → Base62 encoding → Short URL`

**Verification and redirection flow:**

`Short URL → Extract short code → Base62 decoding → Row ID → Database lookup → Original long URL`

## Application URLs

| Component | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend | `http://127.0.0.1:5000` |

## Running the Application

### Prerequisites

- Node.js and npm installed for the frontend.
- Python installed for the backend.
- Required frontend and backend dependencies installed.
- Database configured and accessible.

### 1. Start the Frontend

Navigate to the `fe` folder:

```bash
cd fe
```

Install dependencies if required:

```bash
npm install
```

Start the frontend development server:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

> If the project uses Vite, run `npm run dev` instead.

### 2. Start the Backend

Navigate to the `fast-api-app` folder:

```bash
cd fast-api-app
```

Activate the Python virtual environment if one is configured.

For macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies if required:

```bash
pip install -r requirements.txt
```

Start the FastAPI application using Uvicorn:

```bash
python main.py
```

The backend will be available at `http://127.0.0.1:5000`.

## URL Uniqueness

The application reuses an existing record when the submitted long URL is already present in the database. A new record and short URL are generated only when the long URL does not exist.