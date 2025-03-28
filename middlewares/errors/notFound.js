const errorNotFound = (req, res) => {

    const notFound = {
        error: "Risorsa non trovata",
        message: "La risorsa a cui vuoi accedere non è stata trovata"
    }

    res.status(404);
    res.json(notFound);
    
}

export default errorNotFound;