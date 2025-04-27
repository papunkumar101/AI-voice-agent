# AI Voice Assistent Agent - AI Product Support Bot

This project consists of a **Frontend** built with React and Vite, and a **Backend** built with Express.js. The application provides a Help Desk Chat interface with speech recognition and text-to-speech capabilities.

---

## Frontend

### Features
- **React + Vite**: Fast development environment with hot module replacement.
- **Speech Recognition**: Uses the browser's Web Speech API for voice input.
- **Text-to-Speech**: Converts bot responses to speech.
- **Responsive UI**: Chatbox with drag-to-resize functionality.
- **TailwindCSS**: For styling the application.
- **Framer Motion**: For animations.
- **Lucide Icons**: For modern UI icons.


## Backend
### Features
- **RAG_EPSILLA_WEB**: Backend is powered by a Retrieval-Augmented Generation (RAG) system using [Epsilla](https://www.epsilla.com/).
- **API Key Configuration**: Requires setting and replacing the Epsilla API key.
- **LLM Integration**: Supports any LLM model by setting the appropriate API key (e.g., `GEMINI_API_KEY`).
- **Data Handling**: Supports both structured and unstructured data ingestion into Epsilla for relevant question-answering based on fed data.
- **Flexible Querying**: Enables context-aware, intelligent conversations based on your uploaded or structured datasets.


---

### File Structure

```
AI-voice-agent/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── README.md
├── .gitignore
├── README.md
└── LICENSE
```

### Explanation
- **backend/**: Contains the server-side code, including controllers, routes, and services.
- **frontend/**: Contains the client-side code, including React components, hooks, and styles.
- **node_modules/**: Auto-generated directory for dependencies (not included in version control).
- **.env**: Environment configuration files for both frontend and backend.
- **README.md**: Documentation for each respective directory and the root project.
- **LICENSE**: License file for the project.
- **.gitignore**: Specifies files and directories to ignore in version control.

## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git (optional, for cloning the repository)

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd AiProject
   ```

2. **Install Dependencies**:
   - Navigate to the `frontend` directory and install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Navigate to the `backend` directory and install dependencies:
     ```bash
     cd ../backend
     npm install
     ```

3. **Run the Frontend**:
   - Navigate to the `frontend` directory and start the development server:
     ```bash
     cd frontend
     npm run dev
     ```

4. **Run the Backend**:
   - Navigate to the `backend` directory and start the server:
     ```bash
     cd ../backend
     npm run start
     ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000` (or the port specified by the backend).
   - Open your browser and navigate to `http://localhost:5173` (or the port specified by the frontend).

### Notes
- Ensure both the frontend and backend servers are running simultaneously.
- Modify `.env` files in both `frontend` and `backend` directories to configure environment variables as needed.