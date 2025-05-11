require('dotenv').config();
const express = require('express');
const app = express();

const blogsRouter = require('./routes/blogRouter');
const commentsRouter = require('./routes/commentsRouter');
const auth = require('./routes/auth');
const registerRouter = require('./routes/registerRouter')

app.use(express.urlencoded({extended: true}));

require('./passport/local');


app.use('/login', auth);
app.use('/blogs', blogsRouter);
app.use('/comments', commentsRouter);
app.use('/register', registerRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}.`)
})