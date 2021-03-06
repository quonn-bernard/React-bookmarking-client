# React-Bookmarks-Client

## Author

### Quonn Bernard


## Summary

A bookmarking application that allows users to create clickable and/or downloadable bookmarks from websites, images, and documents. 

## Screenshots

![Landing Page](https://i.imgur.com/VhJvGe7.png)

## Tech stack

The client logic is coded with ES6 and ReactJS, and styled with CSS3.

The server is also in written JavaScript (source at [https://github.com/quonn-bernard/Bookmarks-server]) and uses Express with PostgreSQL for the database.


## Code base

The source folder has four sub-folders, "appContext", "Components", "routes" and "services". 

The routes folder contains React components for the distinct pages of the app, namely AddBookmark, AddCollection, BookmarkList, BookmarkDesc, Login, and Registration.

The components folder contains all other React sub-components needed for the various pages.

The services folder contains the files needed for communicating with the REST API.

## Installation for Development

Clone the repo and run "npm install". Then "npm start" will start the local development server. Instructions for installing the server and database, along with API documentation, can be found at the [repo for the server.](https://github.com/quonn-bernard/Bookmarks-server)

