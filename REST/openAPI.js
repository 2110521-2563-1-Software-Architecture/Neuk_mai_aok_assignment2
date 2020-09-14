module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "REST Api",
    description: "User management API",
    termsOfService: "http://api_url/terms/",
    contact: {
      name: "Wolox Team",
      email: "hello@wolox.co",
      url: "https://www.wolox.com.ar/",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Local server",
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: "CRUD operations",
    },
  ],
  paths: {
    "/books": {
      get: {
        tags: ["CRUD operations"],
        description: "Get all books",
        operationId: "Get all books",
        parameters: [],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/All_books",
                },
              },
            },
          },
          // 400: {
          //   description: "Missing parameters",
          //   content: {
          //     "application/json": {
          //       schema: {
          //         $ref: "#/components/schemas/Error",
          //       },
          //       example: {
          //         message: "companyId is missing",
          //         internal_code: "missing_parameters",
          //       },
          //     },
          //   },
          // },
        },
      },
    },
    "/book": {
      get: {
        tags: ["CRUD operations"],
        description: "Get one book",
        operationId: "Get one book",
        parameters: [
          {
            name: "id",
            in: "query",
            schema: {
              $ref: "#/components/schemas/id",
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/All_books",
                },
              },
            },
          },
          // 400: {
          //   description: "Missing parameters",
          //   content: {
          //     "application/json": {
          //       schema: {
          //         $ref: "#/components/schemas/Error",
          //       },
          //       example: {
          //         message: "companyId is missing",
          //         internal_code: "missing_parameters",
          //       },
          //     },
          //   },
          // },
        },
      },
    },
    "/delete": {
      delete: {
        tags: ["CRUD operations"],
        description: "Delete one book",
        operationId: "Delete one book",
        parameters: [
          {
            name: "id",
            in: "query",
            schema: {
              $ref: "#/components/schemas/id",
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Delete the book",
            content: {
              "application/json": {
                // schema: {
                  // $ref: "#/components/schemas/All_books",
                // },
              },
            },
          },
          // 400: {
          //   description: "Missing parameters",
          //   content: {
          //     "application/json": {
          //       schema: {
          //         $ref: "#/components/schemas/Error",
          //       },
          //       example: {
          //         message: "Error",
          //         internal_code: "missing_parameters",
          //       },
          //     },
          //   },
          // },
        },
      },
    },
    "/insert": {
      post: {
        tags: ["CRUD operations"],
        description: "Create users",
        operationId: "createUsers",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/book",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Add new book to database",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/All_books",
                },
              },
            },
          },
          // 400: {
          //   description: "Invalid parameters",
          //   content: {
          //     "application/json": {
          //       schema: {
          //         $ref: "#/components/schemas/Error",
          //       },
          //       example: {
          //         message: "User identificationNumbers 10, 20 already exist",
          //         internal_code: "invalid_parameters",
          //       },
          //     },
          //   },
          // },
        },
      },
    },
  },
  components: {
    schemas: {
      id: {
        type: "integer",
        description: "Book ID",
        example: 12,
      },
      title: {
        type: "string",
        example: "Trader by wutipong",
      },
      author: {
        type: "string",
        example: "wutipong",
      },

      book: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/id",
          },
          title: {
            $ref: "#/components/schemas/title",
          },
          author: {
            $ref: "#/components/schemas/author",
          },
        },
      },
      All_books: {
        type: "array",
        items: {
          $ref: "#/components/schemas/book",
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },
        },
      },
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-api-key",
      },
    },
  },
};
