const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

const insertSingleBook = async () => { 
    var book = { id: parseInt(1), title: 'drive', author: 'drive' };
    let beforeSend = new Date();
    await axios.post(`${BASE_URL}/insert`,book);
    let afterSend = new Date();
    var response_time = afterSend-beforeSend;
    await console.log('insertSingleBook response time is ',response_time,' ms');
}

const insertMultipleBook = async (number_of_book) => { 
    var book = { id: parseInt(1), title: 'drive', author: 'drive' };
    let beforeSend = new Date();
    for(let i =0; i<number_of_book;i++){
        await axios.post(`${BASE_URL}/insert`,book);
    }
    
    let afterSend = new Date();
    var response_time = afterSend-beforeSend;
    await console.log('insertMultipleBook response time is ',response_time,' ms');
    
}


process.argv.shift();
process.argv.shift();
var command = process.argv.shift();

switch (command) {
    case "small_insert":
        insertSingleBook();
        break;
    case "big_insert":
        number_of_book = process.argv.shift();
        insertMultipleBook(number_of_book);
  }