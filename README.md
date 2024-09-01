# E-Learning Platform
This is the README file for the E-Learning Platform. Below are the instructions to start the application in both production and development modes.

## Live Website
You can access the live version of the application at [E-Learning Website](https://e-learning-website-7tsw.onrender.com).

## Running the App in Production Mode
To start the app in production mode (on a single port), follow these steps:

1. **Install Dependencies and Build the Application:**
Run the following command in the root directory of your project to install the necessary Node modules for both the backend and frontend and create the build file in the frontend:
```bash
npm run build
```
2. **Start the Application:**
After building the application, start the app using:
```bash
npm start
```

## Running the App in Development Mode

To start the app in development mode, follow these steps:
1. **Start the Backend:**
In the root directory, run the following command to start both the backend and frontend in development mode:
```bash
npm run dev
```
2. **Start the Frontend Manually:**
If you prefer to start the frontend separately, navigate to the frontend directory and start the development server:
```bash
cd frontend
npm start
```
3. **Update the Base URL (for Development Mode):**
    >- Before running the frontend, make sure to update the base URL:  
    >- Go to the frontend/src/baseurl folder.
    >- Change the base URL to http://localhost:5000/api in the respective file.

This README provides the necessary steps to get your application up and running, both in production and development environments.