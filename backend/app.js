import express from 'express';
import cors from 'cors';
import handleImgPath from './middlewares/handleImgPath.js';
const app = express();
const port = 3000;

// import posts router
import productsRouter from './routers/productsRouter.js';
// import error 404 middleware
import errorNotFound from './middlewares/errors/notFound.js';
// import error 500 middleware
import errorsHandler from './middlewares/errors/errorsHandler.js';

app.use(cors({ origin: 'http://localhost:5173' }));


// body parser
app.use(express.json());
app.use(express.static('public'));
app.use(handleImgPath);

app.get('/', (req, res) => {
  res.send('Server root');
});
// use router
app.use('/products', productsRouter);

// middlewares
app.use(errorNotFound);
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// end code
