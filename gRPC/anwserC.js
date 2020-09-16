var grpc = require('grpc');

var booksProto = grpc.load('books.proto');

var client = new booksProto.books.BookService(
    '127.0.0.1:50051', 
    grpc.credentials.createInsecure());

function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    // else
    //     //console.log(response);
}

const concurrent_call = async (num_of_concurrent) => { 
    var book = { id: parseInt(1), title: 'drive', author: 'drive' };
    let beforeSend = new Date();

    let arr = [];
    for(let i=0; i<num_of_concurrent ; i++){
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
    await Promise.all(arr).then(response => {
        let afterSend = new Date();
        console.log('Concurrentcall ',num_of_concurrent ,'request, response time is ',afterSend-beforeSend,' ms');
      })
    
}

process.argv.shift();
process.argv.shift();
var command = process.argv.shift();

concurrent_call(command);