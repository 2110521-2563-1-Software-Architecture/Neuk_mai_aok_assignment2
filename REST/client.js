const axios = require('axios');
const io = require("socket.io-client");
const promptly = require("promptly");
const BASE_URL = 'http://localhost:3000';


let socket = io.connect(BASE_URL);

const watchBooks = async() => {
  socket.on('notify',(book) => {console.log(book)})
}

const listBooks = async () => {
  let beforeSend = new Date();
  const res = await axios.get(`${BASE_URL}/books`);
  const books = res.data;
  let afterSend = new Date();
  console.log(books);
  console.log('listBooks response time is ',afterSend-beforeSend,' ms');
  return books;
};

const insertBook = async (id, title, author) => {
  
  var book = { id: parseInt(id), title: title, author: author };
  let beforeSend = new Date();
  let res = await axios.post(`${BASE_URL}/insert`,book);
  let afterSend = new Date();
  console.log(res.data)
  socket.emit('insert',book)
  
  let response_time = afterSend-beforeSend;
  console.log('insertBook response time is ',response_time,' ms');
}

const multi_insertBook = async (id1, title1, author1, id2, title2, author2, id3, title3, author3) => {
  
  var book1 = { id: parseInt(id1), title: title1, author: author1 };
  var book2 = { id: parseInt(id2), title: title2, author: author2 };
  var book3 = { id: parseInt(id3), title: title3, author: author3 };
  let beforeSend = new Date();
  await axios.post(`${BASE_URL}/insert`,book1);
  await axios.post(`${BASE_URL}/insert`,book2);
  await axios.post(`${BASE_URL}/insert`,book3);

  let afterSend = new Date();
  socket.emit('insert',book1)
  
  let response_time = afterSend-beforeSend;
  console.log('insertBook response time is ',response_time,' ms');
}


const multi_client_insert_get_delete_Book = async (id, title, author) => {
  let beforeSend = new Date();
  var book = { id: parseInt(id), title: title, author: author };
  await axios.post(`${BASE_URL}/insert`,book);
  await axios.get(`${BASE_URL}/book/${id}`);
  await axios.delete(`${BASE_URL}/delete/${id}`);

  socket.emit('insert',book)
  let afterSend = new Date();
  console.log('multi client insert book response time is ',afterSend-beforeSend,' ms');
}

const getBook = async (id) => {
  let beforeSend = new Date();
  const res = await axios.get(`${BASE_URL}/book/${id}`);
  const book = res.data;
  console.log(book);
  let afterSend = new Date();
  console.log('getBook response time is ',afterSend-beforeSend,' ms');
  return book;
};


const multi_call_getBook = async (id, num) => {
  let beforeSend = new Date();

  // for(var k=0;k<num;k++){
  //   await axios.get(`${BASE_URL}/book/${id}`);

  // }
  // let afterSend = new Date();
  // console.log('getBook ',num ,'request, response time is ',afterSend-beforeSend,' ms');
  let hrstart = process.hrtime();
  let arr = [];
  for(let j=0; j<num ; j++)arr.push(axios.get(`${BASE_URL}/book/${id}`))
  await Promise.all(arr).then(response => {
    let hrend = process.hrtime(hrstart)
    // console.log(process.hrtime(hrstart), n)
    let afterSend = new Date();
    console.log('getBook ',num ,'request, response time is ',afterSend-beforeSend,' ms');
})
};

const deleteBook = async (id) => {
  let res = await axios.delete(`${BASE_URL}/delete/${id}`);

  console.log(res.data)
  let afterSend = new Date();
  console.log('deleteBook response time is ',afterSend-beforeSend,' ms');

}

const multi_client_deleteBook = async (id) => {
  let beforeSend = new Date();
  let res1 = await axios.delete(`${BASE_URL}/delete/${id}`);

  let afterSend = new Date();
  console.log('multi client deleteBook response time is ',afterSend-beforeSend,' ms');

}

const benchmark_single_insert = async ()=>{
  let id_book = process.argv.shift();
  let title = process.argv.shift();
  let author = process.argv.shift();

  
  insertBook(id_book, title, author);
}

const benchmark_multiple_insert = async ()=>{
 
  let id_book1 = process.argv.shift();
  let title1 = process.argv.shift();
  let author1 = process.argv.shift();

  let id_book2 = process.argv.shift();
  let title2 = process.argv.shift();
  let author2 = process.argv.shift();

  let id_book3 = process.argv.shift();
  let title3 = process.argv.shift();
  let author3 = process.argv.shift();

  

  multi_insertBook(id_book1, title1, author1, id_book2, title2, author2, id_book3, title3, author3);
    
}

const benchmark_multi_client = async ()=>{
  let id_book = process.argv.shift();
  let title = process.argv.shift();
  let author = process.argv.shift();


  multi_client_insert_get_delete_Book(id_book, title, author);

}

const benchmark_many_concurrent_call = async (id_book, num)=>{
    multi_call_getBook(id_book, num);
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();


if(command == 'benchmark'){
  let type_test = process.argv.shift();
  if(type_test == 'insert'){
    if(process.argv.shift() == 'single'){
      benchmark_single_insert();
    }
    else{
      benchmark_multiple_insert();
    }
  }
  if(type_test == 'multi_client'){
    benchmark_multi_client();
  }

  if(type_test == 'multi_call'){
    benchmark_many_concurrent_call(123, process.argv.shift());
  }
  // else if(scriptName == 'multiple'){
  //   benchmark_multiple_insert(command);
  // }
}

else{

  if (command == 'list')
    listBooks();
  else if (command == 'insert')
    insertBook(process.argv[0], process.argv[1], process.argv[2]);
  else if (command == 'get')
    getBook(process.argv[0]);
  else if (command == 'delete')
    deleteBook(process.argv[0]);
  else if (command == 'watch')
    watchBooks();
}

