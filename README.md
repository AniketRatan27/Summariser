# Summariser

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Tech Stack

- Bun
- Express
- Prisma v7
- MySQL

## Setup

`````bash
- bun install
- cp .env.example .env
- bunx prisma generate
- bun run dev
```

## to perform database opration please go through the Prisma documentation :- https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mysql

Note: For client side
# to run the client that is frontend (design)
# execute the below commands in your terminal where your directory should be pointing to
# /my_App/packages/client
# and then you can run your client side site for changes and can design (please be carefull)
# to watch the site go to [ localhost://port](http://localhost:5173/) by clicking on this
# you can see the frontend layout
```cmd
- bun run dev


````Note: For server side
# to run the server side that is backend
# execute the below commands in your terminal where your directory should be pointing to
# /my_App/packages/server
# and then you can run your server side site be carefull with the environment variables
# you should have your own variables for MISTRAL_API_KEY create account in MISTRAL website
# there you can create your API KEY and can paste in your .env file and can run
# to watch the site go to [ localhost://port](http://localhost:3000/) by clicking on this
# you can test your backend
#POSTMEN Extention should be installed to test the API's and communicat with the MISTRALAI_API
```cmd
- bun run dev
`````
