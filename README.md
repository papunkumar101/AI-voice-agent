# AI Project

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

### File Structure

---

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
     npm start
     ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000` (or the port specified by the frontend).

### Notes
- Ensure both the frontend and backend servers are running simultaneously.
- Modify `.env` files in both `frontend` and `backend` directories to configure environment variables as needed.