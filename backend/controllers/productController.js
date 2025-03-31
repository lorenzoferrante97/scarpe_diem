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
    const sql = 'SELECT * FROM products JOIN categories ON categories.id = products.category_id WHERE name_category = ? LIMIT 1';

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
    const sql = 'SELECT po.name_product AS Prodotto, SUM(po.product_quantity) AS Totale_Vendite FROM product_order po GROUP BY po.name_product ORDER BY Totale_Vendite DESC;';

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

// Nuova funzione -> newarrivals (ultimi arrivi)
function newarrivals(req, res) {
    const sql = "SELECT * FROM products WHERE insert_date BETWEEN '2024-02-01' AND '2024-03-01' ORDER BY insert_date DESC;";

    connection.query(sql, [newarrivals], (err, response) => {
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
// const store = (req, res) => {};

export default { index, show, category, bestsellers, newarrivals };
