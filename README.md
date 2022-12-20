# BatonPass - assemble your ensemble.

![BatonPass landing page screenshot, with login and sign up buttons visible](https://i.ibb.co/2jmzpgN/Screen-Shot-2022-12-19-at-4-32-47-PM.png)

BatonPass is a musical social network for ensembles and musicians to better find each other. Check it out!
https://batonpass.up.railway.app/

# Tech used
I implemented HTML, CSS, and JavaScript for both front and back end (Node/Express), as well as Mongoose for the MongoDB Atlas database, and the templating language EJS to handle the client-side views. 

I used MVC (Model-view-controller) architecture for this app to organize the back-end.

---

# Install & Run

Type `npm install` into your terminal to install the dependencies, and `npm start` to run.

---

# What you need

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT (can be any port example: 3000)
  - DB_STRING = `your database URI`

---
#  Optimizations

Currently, BatonPass is an MVP to demonstrate functionality. In the future, users will be able to upload profile pictures, edit all profile information, and chat with each other. 
