#### Feel free to play :)

https://orbd.onrender.com

### Local Setup

**Setup database**

- Make sure you have psql locally running
- Create a db called `orbd`
- Upload the setup file located in `db/db_setup.sql`

**Client - From within the client folder**

- `npm i`
- `npm run dev`
- Create a `.env` file with the below

```
    VITE_STAR_COUNT = 5;
    VITE_MAP_HEIGHT = 100;
    VITE_MAP_RADIUS = 70;
```

**Server - From within the server folder**

- `npm i`
- `npx nodemon src/server.ts`
- Create a `.env` file with the below

```
    USER = {psql user}
    PASSWORD = {psql password}
    HOST = localhost
    PORTNUM = 5432 {or psql host / port configured settings}
    DBNAME = "orbd"
    REFRESH_TOKEN_SECRET = {random string}
    ACCESS_TOKEN_SECRET = {random string}
```
