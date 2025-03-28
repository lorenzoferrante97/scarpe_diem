import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

// import posts router
import postsRouter from './routers/postsRouter.js';
// import error 404 middleware
import errorNotFound from './middlewares/errors/notFound.js';
// import error 500 middleware
import errorsHandler from './middlewares/errors/errorsHandler.js';

app.use(cors( { origin: 'http://localhost:5173' } ));

app.get('/', (req, res) => {
    res.send('Server root');

});

// body parser
app.use(express.json());

// use router
app.use('/posts', postsRouter);


// middlewares
app.use(express.static('public'));
app.use(errorNotFound);
app.use(errorsHandler);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// end code