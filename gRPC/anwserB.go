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
    "multiClientCall": {
		name:  "multiClientCall",
		desc:  "multiClientCall the provided book",
		do:    multiClientCall,
		usage: "client.go multiClientCall <num_of_client>",
	},
	
}

func multiClientCall(ctx context.Context, args ...string) {
    start := time.Now()
    num_of_client, err := strconv.ParseInt(args[0], 10, 64)
    if err != nil {
		log.Fatalf("printResp (%v): %v", num_of_client, err)
	}
	book := &pb.Book{
		Id:     1,
		Title:  "drive",
		Author: "drive",
	}
    conn, client := GetClient()
    defer conn.Close()
    for i := 0; i < int(num_of_client); i++ {
		if i%4 == 0{
			client.Insert(ctx, book)
		}else if i%4 == 1{
			client.Get(ctx, &pb.BookIdRequest{int32(1)})
		}else if i%4 == 2{
			client.List(ctx, &pb.Empty{})
		}else{
			client.Delete(ctx, &pb.BookIdRequest{int32(1)})
		}
	}
	fmt.Printf("Response time is ",time.Since(start))
}