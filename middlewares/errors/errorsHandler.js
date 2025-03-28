const errorsHandler = (err, req, res, next) => {

    const error = {
        message: err.message
    }

    res.status(500);
    res.json(error);
    
}

export default errorsHandler;