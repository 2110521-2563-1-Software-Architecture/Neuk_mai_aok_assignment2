const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

const multiClientCall = async (num_of_client) => { 
    var book = { id: parseInt(1), title: 'drive', author: 'drive' };
    let beforeSend = new Date();
    for(let i=0;i<num_of_client;i++){
        if(i % 4 == 0){//Insert
            await axios.post(`${BASE_URL}/insert`,book);
        }
        else if(i % 4 == 1){//Get specific book
            await axios.get(`${BASE_URL}/book/${1}`);
        }
        else if(i % 4 == 2){//List book
            await axios.get(`${BASE_URL}/books`);
        }
        else if(i % 4 == 3){//Delete
            await axios.delete(`${BASE_URL}/delete/${1}`);
        }
    }
    let afterSend = new Date();
    var response_time = afterSend-beforeSend;
    await console.log('insertSingleBook response time is ',response_time,' ms');
}


process.argv.shift();
process.argv.shift();
var number_of_client = process.argv.shift();

multiClientCall(number_of_client);