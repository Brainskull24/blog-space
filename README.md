# BlogSpace

BlogSpace is a versatile and modern blogging website that allows users to create, edit, and manage their blog posts. It features a responsive UI, rich text editor, theme switcher, and robust authentication. The project is structured with separate client and server folders for frontend and backend development.

## Core Features

- **CRUD Operations**: Implemented create, read, update, and delete operations for blog posts.
- **Rich Text Editor**: Integrated a rich text editor for creating and editing blog content.
- **Theme Switcher**: created a theme switcher to toggle between light and dark modes for a better user experience.
- **Responsive UI**: Ensured the application is responsive across different screen sizes.

## Pages and Navigation

### HomePage
- Displays featured blogs with titles, excerpts, and publication dates.
- Includes a navbar with categories (e.g., Technology, Travel).

### Category Pages
- Created pages for each category, showing relevant blogs.

### Filtering and Search
- Implemented filtering by category.

### Blog Details Page
- It Shows full content, image, author, publication date, and metadata.

### Technology Stack
- Backend technology stack: Node.js with Express.

### Database Setup
- Set up a database (e.g., MongoDB) to store blog content, images, user information, and permissions.
- Define schemas for blog posts, users, and permissions.

### User Authentication and Authorization
- Implemented user authentication and authorization using JWT.
- Secured API endpoints to restrict CRUD operations to authenticated users.

### CRUD Operations
- Implemented CRUD operations for managing blog posts (Create, Read, Update, Delete).

### Error Handling
- Implemented error handling for API requests and responses.
- Provided meaningful error messages to users in case of failures.

### User Dashboard
- After login, users can view their personal blogs.
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
or
yarn install

3. **Navigate to server folder and install dependencies:**

-cd ../server
- npm install
- or
- yarn install

4. **Configuration**
Configure environment variables:

Create a .env file in the server folder and add necessary environment variables:

- PORT= 
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret

5. **Start the development server:**

In the server folder:

- npm run dev
  or
- yarn dev

In the client folder:

- npm run dev
  or
- yarn dev

6. **Open your browser:**

Visit http://localhost:5173 to see the app running.

7. **Deployment**
The project is deployed at:

Frontend: [https://blogspace2.vercel.app](https://blogspace2.vercel.app/)
Backend: [https://blog-space-r1kd.onrender.com](https://blog-space-r1kd.onrender.com/)
