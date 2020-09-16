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
    
const multiClientCall = async (num_of_client) => { 
    var book = { id: parseInt(1), title: 'drive', author: 'drive' };
    let beforeSend = new Date();
    for(let i=0;i<num_of_client;i++){
        if(i % 4 == 0){//Insert
            client.insert(book, function(error, empty) {
                printResponse(error, empty);
            });
        }
        else if(i % 4 == 1){//Get specific book
            client.get({
                id: 1
            }, function(error, book) {
                printResponse(error, book);
            });
        }
        else if(i % 4 == 2){//List book
            client.list({}, function(error, books) {
                printResponse(error, books);
            });
        }
        else if(i % 4 == 3){//Delete
            client.delete({
                id: 1
            }, function(error, empty) {
                printResponse(error, empty);
            });
        }
    }
    let afterSend = new Date();
    var response_time = afterSend-beforeSend;
    console.log('multiClientCall response time is ',response_time,' ms');
}


process.argv.shift();
process.argv.shift();
var command = process.argv.shift();

multiClientCall(command);