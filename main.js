const express = require('express')

// config db
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json())


const isAuth = (req, res, next) => {
    const is_auth = req.header('Authorization')

    console.log(is_auth);

    if (is_auth) {
        console.log('stop');
        return res.status(401).json({ error: 'Unauthorized, access denied' })
    } else {
        console.log('cont');
        next()
    }
}

app.use('/api/auth', require('./routes/auth'))
app.use('/api/articles', require('./routes/articles'))


app.use((req, res) => {
    res.status(400).json({ error: 'route doesn\'t exist' })
})

const portNumber = 5000
app.listen(portNumber, () => {
    console.clear();
    console.log(`\n# Server is up on : http//localhost:${portNumber}`);
});
