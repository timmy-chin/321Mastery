This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, get a database running. You will need Docker installed on your machine. 

```bash
docker-compose up
```

### Two Options:

#### Option 1:

Use this build script we made to install all npm packages, create .env, prisma migrate, and npm run dev

```bash
chmod +x *.sh && ./build.sh
```

And you're all set to use our app via local:3000

#### Option 2:

Manually install all the packages, create .env, prisma migrate, and npm run dev

Make sure all your node modules are installs

```bash
npm install
```

Next, make sure you modify the .env file to have the correct information for database connection. If you don't have a .env file
create one in the root of your repo with the following information: 

```
DATABASE_URL="postgresql://admin:password@localhost:5432/mydb?schema=public"
NEXTAUTH_SECRET="<some secret here>"
CHATENGINE_PRIVATE_KEY="4a5aae9b-390b-4102-99bb-dbc43a5f2523"
CHATENGINE_PROJECT_ID="c5709cf0-c535-4496-b825-aa06c9c8aa53"
```

Make sure the database is migrated. 

```bash
npx prisma migrate dev
```

Name the migration `initial`

Install Google Maps React, Install Icons, ChatEngine, etc.

```bash
npm i -S @react-google-maps/api

npm install react-icons --save

npm install react-chat-engine

npm install node-fetch

npm install axios
```

Finally, run the development server:

```bash
npm run dev
```

You're all set to use our app

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

- [Prisma Documentation](https://www.prisma.io/docs/getting-started) - the docs for the ORM we are using. 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Look at your database

```bash
npx prisma studio
```


