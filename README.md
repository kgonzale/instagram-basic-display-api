# Stack
This project uses Angular.js and Express.js.

## Backend

1. Run `npm install` to install application dependencies.
2. Run `npm run build-and-start` to transpile TypeScript into JavaScript and run the application.

## Frontend

1. Run `npm install` to install application dependencies.
2. Run `npm run start` to run the application.



# Design

Basically top down, my aim was to go for a card, user input does not work as I could not get the instagram api working, therefore we have mock data. Hit fetch with any form of input and it retrieves the data from the current json import in the backend.

A carousel was planned but it took too long to figure out how to create a CSS carousel, and I couldn't find good documentation on module $injects.

# Problems and Future enhancements

Work on the what information we are passing into discord. Have a script to read through all messages and save it into an excel spreadsheet, or whatever type of format to help with the scraping of information. 

CSS can definitely be improved. Right now it's plain.

Trying to cache mock data is tough to do, my approach would be to cache on the rest api layer, then send a 304 back to the client if the data they are trying to fetch is cached.

Webhook could be put into some sort of user secret. Typescript can be better handled, since I don't have the graphql schema and how it changes, I decided not to go forward, hence you will see some :any or as any assertions.
