require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const blogsRouter = require('./routes/blogRouter');
const commentsRouter = require('./routes/commentsRouter');
const auth = require('./routes/auth');
const registerRouter = require('./routes/registerRouter');
const authorRouter = require('./routes/authorRouter');

app.use(cors());

app.use(express.urlencoded({extended: true}));

require('./passport/local');


app.use('/login', auth);
app.use('/blogs', blogsRouter);
app.use('/comments', commentsRouter);
app.use('/author', authorRouter);
app.use('/register', registerRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}.`)
})