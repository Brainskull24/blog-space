# BlogSpace

BlogSpace is a versatile and modern blogging website that allows users to create, edit, and manage their blog posts. It features a responsive UI, rich text editor, theme switcher, and robust authentication. The project is structured with separate client and server folders for frontend and backend development.

## Core Features

- **CRUD Operations**: Implement create, read, update, and delete operations for blog posts.
- **Rich Text Editor**: Integrate a rich text editor for creating and editing blog content.
- **Theme Switcher**: Toggle between light and dark modes for a better user experience.
- **Responsive UI**: Ensure the application is responsive across different screen sizes.

## Pages and Navigation

### HomePage
- Display featured blogs with titles, excerpts, and publication dates.
- Include a sidebar or navbar with categories (e.g., Technology, Travel).

### Category Pages
- Create pages for each category, showing relevant blogs.

### Filtering and Search
- Implement filtering by category and a search option.

### Blog Details Page
- Show full content, image, author, publication date, and metadata.

## Backend Tasks

### Technology Stack
- Backend technology stack: Node.js with Express.

### Database Setup
- Set up a database (e.g., MongoDB) to store blog content, images, user information, and permissions.
- Define schemas for blog posts, users, and permissions.

### User Authentication and Authorization
- Implement user authentication and authorization using JWT.
- Secure API endpoints to restrict CRUD operations to authenticated users.

### CRUD Operations
- Implement CRUD operations for managing blog posts (Create, Read, Update, Delete).

### Error Handling
- Implement error handling for API requests and responses.
- Provide meaningful error messages to users in case of failures.

### User Dashboard
- After login, allow users to view their personal blogs.
- Enable users to create, edit, and delete their blogs.

## Technologies Used

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Hosting**: Vercel for frontend, Render for backend

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- MongoDB setup for local or cloud use

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your/repository.git
   cd repository-name

2. **Navigate to client folder and install dependencies:**

cd client
npm install
# or
yarn install

3. **Navigate to server folder and install dependencies:**

cd ../server
npm install
# or
yarn install

4. **Configuration**
Configure environment variables:

Create a .env file in the server folder and add necessary environment variables:

PORT= 
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

5. **Start the development server:**

In the server folder:

npm run dev
# or
yarn dev

In the client folder:

npm run dev
# or
yarn dev

6. **Open your browser:**

Visit http://localhost:5173 to see the app running.

7. **Deployment**
The project is deployed at:

Frontend: [https://blogspace2.vercel.app](https://blogspace2.vercel.app/)
Backend: [[https://](https://blog-space-r1kd.onrender.com)](https://blog-space-r1kd.onrender.com/)
