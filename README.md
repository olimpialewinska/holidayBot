# HolidayBot
This project is currently in development and is the user interface (UI) component designed to complement the [Holiday Scrapper server application.](https://github.com/olimpialewinska/holiday-scrapper)

The Holiday Scrapper frontend is designed to work in conjunction with the Holiday Scrapper server application, built using Nest.js. This server application scrapes vacation offers every half an hour and sends email notifications to users with new offers that match their preferences, leveraging PostgreSQL as its database.

## Features
- User registration and email confirmation
- User preferences management
- Displaying vacation offers

## UI
<p align="center">
<img width="400" alt="UI-light" src="https://github.com/olimpialewinska/holidayBot/assets/100933608/2cce6984-fb87-4b21-b0b5-21f6bd86af48">
<img width="400" alt="UI-dark" src="https://github.com/olimpialewinska/holidayBot/assets/100933608/481aec95-b143-4748-a977-7cfe086ee667">
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
