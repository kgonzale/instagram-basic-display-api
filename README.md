### Design

Basically top down, my aim was to go for a card, user input does not work as I could not get the instagram api working, therefore we have mock data

A carousel was planned but it took too long to figure out how to create a CSS carousel, and I couldn't find good documentation on module $injects.

### Problems and Future enhancements

Work on the what information we are passing into discord. Have a script to read through all messages and save it into an excel spreadsheet, or whatever type of format to help with the scraping of information. 

CSS can definitely be improved. Right now it's plain.

Trying to cache mock data is tough to do, my approach would be to cache on the rest api layer, then send a 304 back to the client if the data they are trying to fetch is cached.

Webhook could be put into some sort of user secret. Latest post date can be grabbed by using regex, unfortunately I ran over 2 hours on this project. 

### Webhook

If you want to test the webhook, join the discord server here -> https://discord.gg/mnQqbSj5

### Testing

If you want to test mavrck data change this -> 
- import mockInstagramResponse from './mock-data/addison/addisonMock.json'
- import mockPostResponse from './mock-data/addison/mockPost.json'

to

- import mockInstagramResponse from './mock-data/mavrck/mavrckMock.json'
- import mockPostResponse from './mock-data/mavrck/mockPost.json'

### Addison Rae imgur 

- https://imgur.com/a/mA9Yz9D

- https://imgur.com/a/8J0odCu
