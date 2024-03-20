npm install
npm i -S @react-google-maps/api
npm install react-icons --save
npm install react-chat-engine
npm install node-fetch
npm install axios
echo 'DATABASE_URL="postgresql://admin:password@localhost:5432/mydb?schema=public"\nNEXTAUTH_SECRET="<some secret here>"\nCHATENGINE_PRIVATE_KEY="4a5aae9b-390b-4102-99bb-dbc43a5f2523"\nCHATENGINE_PROJECT_ID="c5709cf0-c535-4496-b825-aa06c9c8aa53' > .env
npx prisma migrate dev
npm run dev