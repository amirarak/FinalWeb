To run the application in Visual Studio Code (VSCode):

Open the pages folder.
Open the index.html file in the browser of your choice to access the registration and login page.


Task Manager Application Readme
This readme provides an overview of the structure and functionality of a task manager web application. The application is built using HTML, CSS, and JavaScript, and it allows users to register, log in, and manage their tasks.

Project Structure
The project is organized into two HTML pages:

Registration and Login Page (index.html):

Allows users to register a new account or log in with existing credentials.
Provides a seamless transition between the registration and login forms.
Users can switch between the registration and login forms using the "Register" and "Login" links.


Task Manager Page (todoPage.html):

After successful login, users are redirected to the task manager page.
Users can add, edit, mark as done, and delete tasks.
The page includes a dropdown menu to filter tasks by status (all tasks, completed tasks, active tasks).
Users can log out from the task manager page.
HTML Structure
Registration and Login Page (index.html):
The page includes two sections wrapped in <div> elements with the classes login and sign-up.
Each section contains a form for either login or registration.
Form inputs include email, password, and username fields.
Task Manager Page (todoPage.html):
The page includes a container with a task input form, a dropdown menu, and a container for displaying tasks.
Tasks are displayed in a card format, showing the task text, date, and buttons for editing, marking as done, and deleting tasks.

CSS Styles
The CSS styles are designed to create a visually appealing and responsive user interface. Notable styles include:

Background images for aesthetic appeal.
Stylish input boxes and buttons.
Use of flexbox and animations for layout and transitions.
Custom styles for the dropdown menu.

JavaScript Functionality
auth.js:
Manages user authentication, including login and registration.
Switches between login and registration forms.
Implements form submission handling for both login and registration.
todo.js:
Handles task-related functionalities, such as adding, editing, marking as done, and deleting tasks.
Implements a dropdown menu to filter tasks by status.
Retrieves tasks from the server and dynamically updates the UI.
api.js:
Defines API-related functionalities, including making requests to the server.
Manages user data and task-related endpoints.
Implements a button loader function for visual feedback during asynchronous operations.
Running the Application

