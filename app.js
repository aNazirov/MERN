const express = require('express')
const mongoose = require('mongoose') //для работы с db mongoDB
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors') //для обработки корс запросы
const morgan = require('morgan') //могли более крaсиво логироват запросы
const passport = require('passport') //Простая ненавязчивая аутентификация
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express()

async function mongoConnect() {
    try {
        await mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
        .then(console.log(`mongoDB connected`))
    } catch (error) {
        console.log('Server error',error.message)
        process.exit(1)
    }
}

mongoConnect()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'build', 'index.html'
            )
        )
    })
}


module.exports = {
    app
}