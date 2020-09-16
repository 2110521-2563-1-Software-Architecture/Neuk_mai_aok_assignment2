const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

const concurrent_call = async (num_of_concurrent) => { 
    var book = { id: parseInt(1), title: 'drive', author: 'drive' };
    let beforeSend = new Date();

    let arr = [];
    for(let i=0; i<num_of_concurrent ; i++){
        if(i % 4 == 0){//Insert
            arr.push(axios.post(`${BASE_URL}/insert`,book));
        }
        else if(i % 4 == 1){//Get specific book
            arr.push(axios.get(`${BASE_URL}/book/${123}`));
        }
        else if(i % 4 == 2){//List book
            arr.push(axios.get(`${BASE_URL}/books`));
        }
        else if(i % 4 == 3){//Delete
            arr.push(axios.delete(`${BASE_URL}/delete/${1}`));
        }
    }
    await Promise.all(arr).then(response => {
        let afterSend = new Date();
        console.log('Concurrentcall ',num_of_concurrent ,'request, response time is ',afterSend-beforeSend,' ms');
      })
    
}

process.argv.shift();
process.argv.shift();
var number_of_concurrent = process.argv.shift();

concurrent_call(number_of_concurrent);