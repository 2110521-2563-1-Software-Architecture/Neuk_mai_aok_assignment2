var grpc = require('grpc');

var booksProto = grpc.load('books.proto');

var client = new booksProto.books.BookService(
    '127.0.0.1:50051', 
    grpc.credentials.createInsecure());

function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    else
        console.log(response);
}
    
const insertSingleBook = async () => { 
    var book = { id: parseInt(1), title: 'drive', author: 'drive' };
    let beforeSend = new Date();
    client.insert(book, function(error, empty) {
        printResponse(error, empty);
    });
    let afterSend = new Date();
    var response_time = afterSend-beforeSend;
    console.log('insertSingleBook response time is ',response_time,' ms');
}

const insertMultipleBook = async (number_of_book) => { 
    var book = { id: parseInt(1), title: 'drive', author: 'drive' };
    let beforeSend = new Date();
    for(let i =0; i<number_of_book;i++){
        client.insert(book, function(error, empty) {
            printResponse(error, empty);
        });
    }
    let afterSend = new Date();
    var response_time = afterSend-beforeSend;
    console.log('insertMultipleBook response time is ',response_time,' ms');
    
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