require('dotenv').config();
const express = require('express');
const app = express();

const blogsRouter = require('./routes/blogRouter');
const commentsRouter = require('./routes/commentsRouter');


app.use('/blogs', blogsRouter);
app.use('/comments', commentsRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}.`)
})