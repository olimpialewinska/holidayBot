# HolidayBot
This project is currently in development and is the user interface (UI) component designed to complement the [Holiday Scrapper server application.](https://github.com/olimpialewinska/holiday-scrapper)

The Holiday Scrapper frontend is designed to work in conjunction with the Holiday Scrapper server application, built using Nest.js. This server application scrapes vacation offers every half an hour and sends email notifications to users with new offers that match their preferences, leveraging PostgreSQL as its database.

## Features
- User registration and email confirmation
- User preferences management
- Displaying vacation offers

## UI
<p align="center">
<img width="400" alt="UI-light" src="https://github.com/olimpialewinska/holidayBot/assets/100933608/1ebc3de6-cff9-4599-a219-cf7ee443a1ee"/>
<img width="400" alt="UI-dark" src="https://github.com/olimpialewinska/holidayBot/assets/100933608/c0ca28cf-d916-4cea-a5b8-a52d3c15cd57"/>
<img width="400" alt="Dashboard" src="https://github.com/olimpialewinska/holidayBot/assets/100933608/f060b415-b315-40f0-907e-27d34bd1d0cf">

</p>



## Getting Started
To get started with the Holiday Scrapper frontend, follow these steps:
```bash
git clone https://github.com/olimpialewinska/holidayBot.git
cd holidayBot
npm install
```
Configure the backend server endpoint in the .env file:
```bash
VUE_APP_BACKEND_URL=your_backend_url_here
```
Run the development server:
```bash 
npm run dev
```
This will start the Nuxt.js development server, allowing you to access the frontend at http://localhost:3000.
