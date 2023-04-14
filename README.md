## ITAS282_FinalProject_Proposal
# Classic Mafia Game
In the Mafia Game each player is secretly assigned a role aligned with either the citizen or the mafia. The mafia eliminates one citizen per night while cleverly disguised as normal citizens during the day. The citizens must group together to eliminate the true mafia before they are outnumbered! The game is divided into two parts: night and day. During the night, mafia members secretly plan to murder a citizen and think up a sneaky day-time strategy. During the day, the entire cast of surviving players debates who among them is a mafia and votes to hang someone. The game alternates between these two phases until either all of the mafias are eliminated (citizen wins) or the number of remaining players reaches a certain threshold.
## Project description
In the Mafia game website, Lord, who is the narrator of the instructions of the game, is going to be played online. The purpose of the website is to let people to skip the role of the Lord in the game, and everybody can play. The website will act as the Lord role, give the instruction, distribute the roles randomly to people, and take their decisions on the game flow.
### Technologies Used
Technologies used for this project includes React.js for this website and typically using JavaScript for both the front-end and back-end development. On the front-end, React.js would be used to build the user interface and handle the user interactions. For the front-end UI design I will be using HTML5, CSS3 and Tailwind. On the back-end, Node.js, which is a JavaScript runtime built on Chrome's V8 JavaScript engine, could be used as the back-end framework. For the database, MongoDB, which is a NoSQL database could be used to store the game information and user information. To handle the communication between the front-end and back-end, a library like Axios could be used to make HTTP requests to the back-end API. Additionally, libraries like express could be used to handle the state management and routing respectively. This stack is commonly referred to as MERN stack (FireBase, Express.js, React.js, Node.js).

## Tech-Stack explanation

For this project I am planning to use a full-stack (FireBase, ExpressJS, ReactJS and NodeJS) which is a popular choice for building websites. Here is the information for your tech-stack and tools:

## Programming Language(s): JavaScript
Tools and Frameworks being used:
FireBase (version 11.5.0) as the NoSQL database to store the game data, player data, and other data related to the website.
ExpressJS (version 4.18.1) as the web framework to handle the server-side logic and routing for the website.
ReactJS (version 18.2.0) as the JavaScript library for building the user interface of the website.
NodeJS (version 18.13.0 LTS) as the JavaScript runtime environment that allows you to run JavaScript on the server-side.
## Libraries and APIs I might use:
Here are some Libraries and APIs that I may use during building the website. Since I never used any of them before, I might change this document moving forward building the website. Here are the Libraries and APIs:
### FireBase-Admin Node.js (version 11.5.0): 
Firebase-admin is an official library provided by Firebase, it allows you to interact with the Firebase Realtime Database, Firebase Authentication, Firebase Cloud Storage and Firebase Cloud Messaging using Node.js.
### PassportJS (version 0.6.0):
Passport is Express-compatible authentication and authorization middleware for Node.js. The API is simple: you provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.
### Socket.io (version 4.5.4): 
It's a bidirectional event-based communication library to handle the interactions between the players in the game.
## Data stores or databases: Firebase
Development tools: Visual Studio Code (version 1.74) with the following extensions:
Prettier (version 9.10.4) for code formatting
ESLint (version 8.32.0) for ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint with a few exceptions
Reactjs code snippets (version 2.4.0) for React snippets

### Why I am using these technologies
For your ease of access, I will explain why I will use each technology below.
Firebase provides a scalable and easy-to-use backend for your application, with services like Firestore, Firebase Authentication and Firebase Cloud Storage that allow you to store and retrieve data, authenticate users, and handle file uploads and downloads. Firebase also provides features such as real-time updates, offline support and advanced querying capabilities, which can be very useful for your application.

ReactJS is a JavaScript library for building user interfaces that is widely used and well-documented. It allows you to build reusable UI components and manage the state of your application in a efficient way, which makes it easier to build a responsive and dynamic user interface.

NodeJS is a JavaScript runtime environment that allows you to run JavaScript on the server-side. It is lightweight and efficient, making it well-suited for building high-performance web applications.

ExpressJS is a web framework for Node.js that simplifies the process of building server-side logic and routing for your application. It provides a simple and consistent API for handling HTTP requests and responses, making it easy to build robust and scalable web applications.

Using this stack (FireBase, ExpressJS, ReactJS and NodeJS) gives you the ability to build a full-stack web application with a single programming language (JavaScript) and a consistent set of tools and libraries, which can simplify development and make it easier to maintain your code.

## Challanges I might have during the proccess
Building the Classic Mafia website project can be challenging, as with any software development project. Some of the main challenges I might face will be included:

Scalability: As the number of users and data grows, the website will have to handle more traffic and data, which can be a challenge. I will need to consider how to scale your database and server-side logic to handle the increased load.

Real-Time updates: As the game might be a real-time game, I will have to ensure that the updates are pushed to the users in real-time and without delay. This can be challenging, especially when dealing with a large number of users.

Testing: I will need to ensure that the website is thoroughly tested to ensure that it is stable and that any bugs are caught early in the development process. I will also need to ensure that the website is compatible with different browsers and devices.

User experience: As the website is a game website it's important to provide a seamless and user-friendly experience. This can be challenging, especially when dealing with a complex game logic.

It's important to keep these challenges in mind while building the project, and to plan and design the application accordingly. With careful planning, thoughtful design, and a focus on best practices and industry standards, a robust and scalable website can be biult that meets the needs of users and provides a great user experience. Hopefully it will go as planned! 