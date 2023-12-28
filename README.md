## Time-Tracking-System-Client
A simple **Time Tracking System** where users can log there working times as well as update and delete an existing log. Moreover, they can see a weekly record of their working hours.

## Live Demo

[Time Tracking System](https://time-tracker-system.netlify.app/) 

**Note:** Account creation is required for full site navigation.

**Issue:** Due to free deployment the server spins down with inactivity. Thus you may get a late response when you just visit the site and make the first request. In such case, simply wait for a minute for the server to get activated. Once the server gets activated, you will see the response and the issue will not persist for further requests.

## Tools
1. React.js for client side
2. Express.js and MySQL for server side.

## Features
1. Login and Logout.
2. Sign Up.
3. Email validation while signing up.
4. Password recovery.
5. Creation, updating and deletetion of time entries for a particular date.
6. Token based authenticaion (Using JWT)

## Instructions
To run this project on your local machine, follow the instructions:

1. Navigate to your prefered directory and type the following in the terminal:
   
   ```
   git clone -b dev https://github.com/Imdad-Rakib/Time_Tracker_Client.git
   ```
   
2. Navigate to the project directory and type the following to install all the dependencies used here:

   ```
   npm install
   ```
   
3. Type the following and you're ready to go:

   ```
   npm run dev
   ```
4. Refer [here](https://github.com/Imdad-Rakib/Time_Tracker_Server/tree/dev) for setting up the server locally.
