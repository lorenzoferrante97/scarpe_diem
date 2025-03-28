import connection from '../data/db.js';

// function -> index
// const index = (req, res) => {

//     const sql = "SELECT * FROM products";

//     // connection.query(sql(err, results)=> {
    
//     // if (err) {
//     //         return res.status(500).js
//     //     }

//     // })


// };

// function -> show
const show = (req, res) => {

    const { slug } = req.params;

    const sql= ""



};

// function -> store
const store = (req, res) => {};

export default { index, show, store };
