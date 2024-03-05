const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_PORT, SESSION_SECRET, REDIS_URL } = require('./config/config');


const session = require("express-session")
const redis = require('redis')

const cors = require('cors')


let RedisStore = require('connect-redis').default;

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})





const app = express()
app.use(express.json())

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const port = process.env.PORT || 3000;

// mongoose.connect("mongodb://kuldeep:mypassword@mongo:27017?authsource=admin").then(() => console.log("Successfully connected to DB")).catch((err) => console.log("Error while db connect ", err))



const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authsource=admin`

const connectWithRetry = () => {
    mongoose.connect(mongoURL)
        .then(() => {
            console.log("Successfully connected to DB Woww")
        })
        .catch((err) => {
            console.log("Error while db connect ", err)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry()

app.enable("trust proxy")
app.use(cors({

}))

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000,
    }
}))


app.get('/api/v1/', (req, res) => {
    res.send("<h2>Hi There is a Boss Congratulations BOYZZZ</h2>")
    console.log("Yeah it ran.....")
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})



// docker container run -itd -v ${pwd}:/app:ro -v /app/node_modules -p 3000:3000 --name node-app node-app-image  # Read-Only Bind mount volume example


// docker container run -itd -v ${pwd}:/app:ro -v /app/node_modules --env PORT=4000 -p 3000:3000 --name node-app node-app-image  # Example of passing env variable at run time


// docker container run -itd -v ${pwd}:/app:ro -v /app/node_modules --env-file ./.env -p 3000:3000 --name node-app node-app-image  # Example of passing env variable at run time


// docker-compose up -d    # It runs the docker compose containers in the detch mode


// docker-compose down -v  # Using this you can delete anonyms volumes


// Note:- Docker compose is quite dumb
// docker-compose up -d --build   # By default when docker compse up command runs at that time it check for the image over local or  other if image is available it runs directly without caring of whether the image is stale or not so to overcome this issue we can use this command.
