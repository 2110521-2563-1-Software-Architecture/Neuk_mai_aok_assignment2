package main

import (
	"flag"
	"fmt"
	"log"
	"time"
    "strconv"
    
	pb "./books"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

var (
	address = flag.String("address", "127.0.0.1:50051", "Address of service")
)

// GetClient attempts to dial the specified address flag and returns a service
// client and its underlying connection. If it is unable to make a connection,
// it dies.
func GetClient() (*grpc.ClientConn, pb.BookServiceClient) {
	conn, err := grpc.Dial(*address, grpc.WithTimeout(5*time.Second), grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	return conn, pb.NewBookServiceClient(conn)
}

func main() {
	flag.Parse()
	ctx := context.Background()
	cmd, ok := commands[flag.Arg(0)]
	if !ok {
		usage()
	} else {
		cmd.do(ctx, flag.Args()[1:]...)
	}
}

func usage() {
	fmt.Println(`client.go is a command-line client for this codelab's gRPC service

Usage:
  client.go list                            List all books
  client.go insert <id> <title> <author>    Insert a book
  client.go get <id>                        Get a book by its ID
  client.go delete <id>                     Delete a book by its ID
  client.go watch                           Watch for inserted books`)
}

var commands = map[string]struct {
	name, desc string
	do         func(context.Context, ...string)
	usage      string
}{
	
	"insertSingleBook": {
		name:  "insertSingleBook",
		desc:  "insertSingleBook the provided book",
		do:    insertSingleBook,
		usage: "client.go insertSingleBook",
    },
    
    "insertMultipleBook": {
		name:  "insertMultipleBook",
		desc:  "insertMultipleBook the provided book",
		do:    insertMultipleBook,
		usage: "client.go insertMultipleBook <num_of_book>",
	},
	
}

func insertSingleBook(ctx context.Context, args ...string) {
	start := time.Now()
	book := &pb.Book{
		Id:     1,
		Title:  "drive",
		Author: "drive",
	}
	conn, client := GetClient()
	defer conn.Close()
	client.Insert(ctx, book)
	fmt.Printf("Response time is ",time.Since(start))
}

func insertMultipleBook(ctx context.Context, args ...string) {
    start := time.Now()
    num_of_book, err := strconv.ParseInt(args[0], 10, 64)
    if err != nil {
		log.Fatalf("printResp (%v): %v", num_of_book, err)
	}
	book := &pb.Book{
		Id:     1,
		Title:  "drive",
		Author: "drive",
	}
    conn, client := GetClient()
    defer conn.Close()
    for i := 0; i < int(num_of_book); i++ {
		client.Insert(ctx, book)
	}
	fmt.Printf("Response time is ",time.Since(start))
}