import connection from "../data/db.js";

// function -> index
function index(req, res) {
    const sql = "SELECT * FROM products";

    connection.query(sql, (err, response) => {
        if (err) {
            return res.status(500).json({
                err: 500,
                message: "Errore query index",
            });
        }

        res.json(response);
    });
}

// function -> show
const show = (req, res) => {
    const { slug } = req.params;

    const sql = 'SELECT * FROM products WHERE slug = ?';


    connection.query(sql, [slug], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const product = results[0];
        res.json(product);
    });

};

// Nuova funzione -> category (prodotti per categoria)
function category(req, res) {
    const { category } = req.params; // Prendi il parametro category dall'URL
    const sql = 'SELECT * FROM products JOIN categories ON categories.id = products.category_id WHERE name_category = ? LIMIT 6';

    connection.query(sql, [category], (err, response) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (response.length === 0) {
            return res.status(404).json({ error: "No products found in this category" });
        }

        res.json(response);

    });
}



// Nuova funzione -> bestsellers (prodotti più venduti)
function bestsellers(req, res) {
    const sql = 'SELECT p.name AS Prodotto, p.image AS Immagine, p.price AS Prezzo, SUM(po.product_quantity) AS Totale_Vendite FROM product_order po JOIN products p ON po.product_id = p.id GROUP BY p.id, p.name, p.image, p.price ORDER BY Totale_Vendite DESC;';

    connection.query(sql, (err, response) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (response.length === 0) {
            return res.status(404).json({ error: "Bestsellers not found" });
        }

        res.json(response);
    });
}

// Nuova funzione -> bestseller (prodotto più venduto)
function bestseller(req, res) {
    const sql = 'SELECT p.name AS Prodotto, p.image AS Immagine, p.price AS Prezzo, SUM(po.product_quantity) AS Totale_Vendite FROM product_order po JOIN products p ON po.product_id = p.id GROUP BY p.id, p.name, p.image, p.price ORDER BY Totale_Vendite DESC LIMIT 1;';

    connection.query(sql, (err, response) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (response.length === 0) {
            return res.status(404).json({ error: "Bestseller not found" });
        }

        res.json(response);
    });
}

// Nuova funzione -> newarrivals (ultimi arrivi)
function newarrivals(req, res) {
    /*const now = new Date();
    const formattedDateNow = now.toISOString().split("T")[0];
    const twoMounthAgo = new Date(now); 
    twoMounthAgo.setMonth(now.getMonth() - 2);
    const formattedDate = twoMounthAgo.toISOString().split("T")[0];
    console.log(formattedDate);
    console.log(formattedDateNow);

    Costanti per dinamicizzare la data

    */

    const sql = `SELECT * FROM products WHERE insert_date BETWEEN '2024-01-01' AND '2024-04-01' ORDER BY insert_date DESC;`;

    connection.query(sql, (err, response) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (response.length === 0) {
            return res.status(404).json({ error: "Newarrivals not found" });
        }

        res.json(response);
    });
}

// Nuova funzione -> newarrival (ultimo arrivo)
function newarrival(req, res) {
    const sql = "SELECT * FROM products WHERE insert_date BETWEEN '2024-01-01' AND '2024-04-01' ORDER BY insert_date DESC LIMIT 1;";

    connection.query(sql, (err, response) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (response.length === 0) {
            return res.status(404).json({ error: "Newarrivals not found" });
        }

        res.json(response);
    });
}

// function -> store
function store(req, res) {
    const { order_date,
        coupon_id,
        address_shipping,
        address_payment,
        phone_number,
        mail, total,
        name,
        surname } = req.body;



    const sql = 'INSERT INTO orders (order_date, coupon_id, address_shipping, address_payment, phone_number, mail, total, name, surname) VALUES (?,?,?,?,?,?,?,?,?)';


    connection.query(sql, [
        order_date,
        coupon_id,
        address_shipping,
        address_payment,
        phone_number,
        mail, total,
        name,
        surname,
    ], (err, results) => {
        if (err) return res.status(500).json({
            error: "Errore server STORE function"
        })
        res.status(201)
        res.json({
            message: "ordine aggiunto con successo",
            id: results.insertId
        })
    })
};


function storePivot(req, res) {
    const {
        product_id,
        name_product,
        price,
        product_quantity,
        order_id
    } = req.body;

    const sql = 'INSERT INTO product_order (product_id, name_product, price, product_quantity,order_id) VALUES(?, ?, ?, ?, ?)';

    connection.query(sql, [
        product_id,
        name_product,
        price,
        product_quantity,
        order_id
    ], (err, results) => {
        if (err) {
            console.error("SQL Query Error: ", err);
            return res.status(500).json({
                error: "Errore server STOREPIVOT function"
            })
        }
        res.status(201)
        res.json({
            message: "ordine aggiunto con successo",
            id: results.insertId
        })
    })
}


//funzione update prezzo totale
function update(req, res) {
    const sql = 'UPDATE orders SET total = (SELECT total_order FROM ( SELECT SUM(po.product_quantity * po.price) AS total_order FROM product_order po WHERE po.order_id = (SELECT MAX(id) FROM (SELECT id FROM orders) AS latest_order)) AS temp_total) WHERE id = (SELECT MAX(id) FROM (SELECT id FROM orders) AS latest_order)';


    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: "errore Server UPDATE"
        })
        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: "No order found to update"
            });
        }
        res.json({
            message: "update avvenuto con successo",
            affectedRows: results.affectedRows
        })
    })
}



//funzione rotta ordini
function indexOrders(req, res) {
    const sql = "SELECT * FROM orders";

    connection.query(sql, (err, response) => {
        if (err) {
            return res.status(500).json({
                error: "Errore query indexOrders"
            });
        }

        res.json(response);
    });
}



//funzione correlati
function related(req, res) {
    const sql = 'SELECT p2.id, p2.name, p2.price, p2.image FROM products p1 JOIN products p2 ON p1.category_id = p2.category_id  WHERE p1.category_id = p2.category_id ORDER BY RAND() LIMIT 2';

    connection.query(sql, (err, response) => {
        if (err) return res.status(500).json({
            error: "errore Server Related"
        })
        if (response.length === 0) {
            return res.status(404).json({ error: "Related not found" });
        }
        res.json(response)
    })
};



//funzione search
function search(req, res) {
    // const searchMethod = req.query.name ? `%${req.query.name}%` : '%';;
    const searchMethod=`%${req.query.name || req.query.name_category || req.query.name_brand}%`


    const sql = 'SELECT p.*, c.name_category, b.name_brand FROM products p JOIN categories c ON c.id = p.category_id JOIN brands b ON b.id = p.brand_id WHERE p.name LIKE ? OR c.name_category LIKE ? OR b.name_brand LIKE ?';

    connection.query(sql, [searchMethod, searchMethod,searchMethod], (err, results) => {
        if (err) return res.status(500).json({
            error: "Errore Server SEARCH"
        })
        res.json(results)
    })

}

export default {
    index,
    show,
    category,
    store,
    indexOrders,
    storePivot,
    update,
    related,
    newarrivals,
    newarrival,
    bestsellers,
    bestseller,
    search
};

