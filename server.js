const express = require('express')
const app = express()
const PORT =  process.env.PORT || 4000

//  middleware 
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()


// Handle Cors
const corsOptions = {
    origin: [`http://localhost:3001`],
    credentials: true, // allows the session cookie to be sent back and forth from server to client
    optionsSuccessStatus: 200 // some legacy browsers choke on status 204
}

app.use(cors(corsOptions))

// Logging with Morgan
app.use(morgan('tiny'))

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Static Files
app.use(express.static('public'))

// Express Session - Authentication
app.use(session({
    // Store the session in our DB
    store: new MongoStore({ 
        url: process.env.MONGO_URI || 'mongodb://localhost:27017/mushroom-collector'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Only create a session if a property has been added to the session
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // cookie will expire in 1 week
    }
}))

// Routes --------------------------------- //
const routes = require('./routes');

app.use('/api/v1/', routes.api)
app.use('/', routes.views)


// Server --------------------------------- //

app.listen(3000, () => {
    return console.log(`Server connected at http://localhost:3000`)
})