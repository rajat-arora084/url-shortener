## Frontend Setup

Follow these steps to configure and run the frontend application:

### 1. Install Dependencies
Navigate into the frontend directory and install the required project packages:
```bash
cd fe
npm install
```

### 3. Run the Development Server
Start the local frontend server to preview the application:
```bash
npm start
```
Once started, open your browser and navigate to `http://localhost:3000`


## Database Setup

Follow these exact steps to initialize your database structure:

### 1. Log in to PostgreSQL
Open your terminal and log in to your PostgreSQL CLI client using the default superuser account:
```bash
psql -U postgres
```
*(If prompted, enter the master password you configured during your PostgreSQL installation.)*

### 2. Create the Schema
Once inside the `psql` interactive prompt, load and execute the schema commands stored in your project's database folder:
```sql
\i path/to/database/scemas/*.db
```


## Backend Setup (FastAPI)

Follow these steps to configure and run the Python FastAPI backend:

### 1. Create a Virtual Environment
Navigate into the backend directory and set up an isolated environment:
```bash
cd fast-api-app
python -m venv venv
```

### 2. Activate the Environment
Activate your virtual environment before running or installing dependencies:
*   **macOS / Linux:**
    ```bash
    source venv/bin/activate
    ```
*   **Windows (Command Prompt):**
    ```cmd
    venv\Scripts\activate
    ```
*   **Windows (PowerShell):**
    ```powershell
    .\venv\Scripts\Activate.ps1
    ```

### 3. Install Python Dependencies
Install all required modules from your generated requirements file:
```bash
pip install -r requirements.txt
```


### 5. Start the Application Server
Run the local production-ready development server using Uvicorn:
```bash
python main.py```
Once started, the backend API will be live at `http://127.0.0.1:5000`. You can test your endpoints directly at `http://127.0.0:5000/docs`.
