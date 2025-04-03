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

    // res.json(response);

    //! integrazione immagine
    const totalRes = response.map((i) => {
      //   console.log("req img path: ", req.imagePath);
      return {
        ...i,
        image: req.imagePath + i.image,
      };
    });

    res.json(totalRes);
  });
}

// function -> show
//

const show = (req, res) => {
  const { slug } = req.params;

  const productSql = "SELECT * FROM products WHERE slug = ?";
  const sizesSql = `
    SELECT
      ps.product_id,
      s.id AS size_id,
      s.size AS size_number,
      ps.quantity
    FROM sizes s
    JOIN product_size ps ON s.id = ps.size_id
    WHERE ps.product_id = ?;`;
  connection.query(productSql, [slug], (productErr, productResults) => {
    if (productErr) {
      console.error("Database error (product):", productErr);
      return res.status(500).json({ error: "Database error (product)" });
    }

    if (productResults.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productResults[0];

    // Integrazione dell'immagine
    const productWithImage = {
      ...product,
      image: req.imagePath + product.image,
    };

    // Ottenere le taglie
    connection.query(sizesSql, [product.id], (sizesErr, sizesResults) => {
      if (sizesErr) {
        console.error("Database error (sizes):", sizesErr);
        return res.status(500).json({ error: "Database error (sizes)" });
      }

      // Aggiungere le taglie al prodotto
      const finalResult = {
        ...productWithImage,
        sizes: sizesResults,
      };

      res.json(finalResult);
    });
  });
};

// Nuova funzione -> category (prodotti per categoria)
function category(req, res) {
  //   const { category } = req.query.params; // Prendi il parametro category dall'URL
  const category = req.query.name_category;
  const sql =
    "SELECT p.name AS Prodotto, p.image AS Immagine, p.price AS Prezzo, name_category AS Categoria, p.slug AS slug FROM products AS p JOIN categories ON categories.id = p.category_id WHERE name_category = ? LIMIT 6";

  connection.query(sql, [category], (err, response) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (response.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found in this category" });
    }

    // res.json(response);

    //! integrazione immagine
    const totalRes = response.map((i) => {
      //   console.log("req img path: ", req.imagePath);
      return {
        ...i,
        Immagine: req.imagePath + i.Immagine,
      };
    });

    res.json(totalRes);
  });
}

// Nuova funzione -> bestsellers (prodotti più venduti)
function bestsellers(req, res) {
  const sql =
    "SELECT p.name AS Prodotto, p.image AS Immagine, p.price AS Prezzo, p.slug AS slug, SUM(po.product_quantity) AS Totale_Vendite FROM product_order po JOIN products p ON po.product_id = p.id GROUP BY p.id, p.name, p.image, p.price ORDER BY Totale_Vendite DESC;";

  connection.query(sql, (err, response) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (response.length === 0) {
      return res.status(404).json({ error: "Bestsellers not found" });
    }

    const totalRes = response.map((i) => {
      //   console.log("req img path: ", req.imagePath);
      return {
        ...i,
        Immagine: req.imagePath + i.Immagine,
      };
    });

    res.json(totalRes);
  });
}

// Nuova funzione -> bestseller (prodotto più venduto)
function bestseller(req, res) {
  const sql =
    "SELECT p.slug, p.name AS Prodotto, p.image AS Immagine, p.price AS Prezzo, SUM(po.product_quantity) AS Totale_Vendite FROM product_order po JOIN products p ON po.product_id = p.id GROUP BY p.id, p.name, p.image, p.price ORDER BY Totale_Vendite DESC LIMIT 1;";

  connection.query(sql, (err, response) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (response.length === 0) {
      return res.status(404).json({ error: "Bestseller not found" });
    }

    // res.json(response);

    //! integrazione immagine
    const totalRes = response.map((i) => {
      //   console.log("req img path: ", req.imagePath);
      return {
        ...i,
        Immagine: req.imagePath + i.Immagine,
      };
    });

    res.json(totalRes[0]);
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

    // res.json(response);

    //! integrazione immagine
    const totalRes = response.map((i) => {
      //   console.log("req img path: ", req.imagePath);
      return {
        ...i,
        image: req.imagePath + i.image,
      };
    });

    res.json(totalRes);
  });
}

// Nuova funzione -> newarrival (ultimo arrivo)
function newarrival(req, res) {
  const sql =
    "SELECT p.slug, p.name AS Prodotto, p.image AS Immagine, p.price AS Prezzo FROM products as p WHERE p.insert_date BETWEEN '2024-01-01' AND '2024-04-01' ORDER BY insert_date DESC LIMIT 1;";

  connection.query(sql, (err, response) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (response.length === 0) {
      return res.status(404).json({ error: "Newarrivals not found" });
    }

    // res.json(response);

    //! integrazione immagine
    const totalRes = response.map((i) => {
      //   console.log("req img path: ", req.imagePath);
      return {
        ...i,
        Immagine: req.imagePath + i.Immagine,
      };
    });

    res.json(totalRes[0]);
  });
}

// function -> store
function store(req, res) {
  const {
    order_date,
    coupon_id,
    address_shipping,
    address_payment,
    phone_number,
    mail,
    total,
    name,
    surname,
  } = req.body;

  const sql =
    "INSERT INTO orders (order_date, coupon_id, address_shipping, address_payment, phone_number, mail, total, name, surname) VALUES (?,?,?,?,?,?,?,?,?)";

  connection.query(
    sql,
    [
      order_date,
      coupon_id,
      address_shipping,
      address_payment,
      phone_number,
      mail,
      total,
      name,
      surname,
    ],
    (err, results) => {
      if (err)
        return res.status(500).json({
          error: "Errore server STORE function",
        });
      res.status(201);
      res.json({
        message: "ordine aggiunto con successo",
        id: results.insertId,
      });
    }
  );
}

function storePivot(req, res) {
  const { product_id, name_product, price, product_quantity, order_id } =
    req.body;

  const sql =
    "INSERT INTO product_order (product_id, name_product, price, product_quantity,order_id) VALUES(?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [product_id, name_product, price, product_quantity, order_id],
    (err, results) => {
      if (err) {
        console.error("SQL Query Error: ", err);
        return res.status(500).json({
          error: "Errore server STOREPIVOT function",
        });
      }
      res.status(201);
      res.json({
        message: "ordine aggiunto con successo",
        id: results.insertId,
      });
    }
  );
}

//funzione update prezzo totale
function update(req, res) {
  const sql =
    "UPDATE orders SET total = (SELECT total_order FROM ( SELECT SUM(po.product_quantity * po.price) AS total_order FROM product_order po WHERE po.order_id = (SELECT MAX(id) FROM (SELECT id FROM orders) AS latest_order)) AS temp_total) WHERE id = (SELECT MAX(id) FROM (SELECT id FROM orders) AS latest_order)";

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "errore Server UPDATE",
      });
    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: "No order found to update",
      });
    }
    res.json({
      message: "update avvenuto con successo",
      affectedRows: results.affectedRows,
    });
  });
}

//funzione rotta ordini
function indexOrders(req, res) {
  const sql = "SELECT * FROM orders";

  connection.query(sql, (err, response) => {
    if (err) {
      return res.status(500).json({
        error: "Errore query indexOrders",
      });
    }

    res.json(response);
  });
}

//funzione correlati
// function related(req, res) {
//   const sql =
//     "SELECT p2.id, p2.name, p2.price, p2.image FROM products p1 JOIN products p2 ON p1.category_id = p2.category_id  WHERE p1.category_id = p2.category_id ORDER BY RAND() LIMIT 2";

//   connection.query(sql, (err, response) => {
//     if (err)
//       return res.status(500).json({
//         error: "errore Server Related",
//       });
//     if (response.length === 0) {
//       return res.status(404).json({ error: "Related not found" });
//     }
//       // res.json(response);

// function related(req, res) {
//   // ! paramrto dinamico
//   const categoryId = req.query.categoryId;

//   if (!categoryId) {
//     return res.status(400).json({ error: "categoryId mancante" });
//   }

// const sql = `
//   SELECT p2.slug , p2.id AS ID, p2.name AS Prodotto, p2.price AS Prezzo, p2.image AS Immagine
//   FROM products p1
//   JOIN products p2 ON p1.category_id = p2.category_id
//   WHERE p1.category_id = ?
//   ORDER BY RAND()
//   LIMIT 2;
// `;

//   connection.query(sql, [categoryId], (err, response) => {
//     if (err) {
//       console.error("Errore query related:", err);
//       return res.status(500).json({ error: "Errore Server Related" });
//     }

//     if (response.length === 0) {
//       return res.status(404).json({ error: "Related not found" });
//     }

//     const totalRes = response.map((i) => {
//       return {
//         ...i,
//         Immagine: req.imagePath + i.Immagine,
//       };
//     });

//     res.json(totalRes);
//   });
// }

function related(req, res) {
  const categoryId = req.query.categoryId;
  const currentSlug = req.query.slug; // Ottieni lo slug del prodotto corrente

  if (!categoryId || !currentSlug) {
    return res.status(400).json({ error: "categoryId o slug mancante" });
  }

  const sql = `
    SELECT p2.slug, p2.id AS ID, p2.name AS Prodotto, p2.price AS Prezzo, p2.image AS Immagine
    FROM products p1
    JOIN products p2 ON p1.category_id = p2.category_id
    WHERE p1.category_id = ? AND p2.slug != ? -- Escludi il prodotto corrente
    ORDER BY RAND()
    LIMIT 2;
  `;

  connection.query(sql, [categoryId, currentSlug], (err, response) => {
    if (err) {
      console.error("Errore query related:", err);
      return res.status(500).json({ error: "Errore Server Related" });
    }

    if (response.length === 0) {
      return res.status(404).json({ error: "Related not found" });
    }

    const totalRes = response.map((i) => {
      return {
        ...i,
        Immagine: req.imagePath + i.Immagine,
      };
    });

    res.json(totalRes);
  });
}

//funzione search
function search(req, res) {
  // const searchMethod = req.query.name ? `%${req.query.name}%` : '%';;
  const searchMethod = `%${
    req.query.name || req.query.name_category || req.query.name_brand
  }%`;

  const sql =
    "SELECT p.*, c.name_category, b.name_brand FROM products p JOIN categories c ON c.id = p.category_id JOIN brands b ON b.id = p.brand_id WHERE p.name LIKE ? OR c.name_category LIKE ? OR b.name_brand LIKE ?";

  connection.query(
    sql,
    [searchMethod, searchMethod, searchMethod],
    (err, results) => {
      if (err)
        return res.status(500).json({
          error: "Errore Server SEARCH",
        });

      // res.json(results);

      //! integrazione immagine
      const totalRes = results.map((i) => {
        //   console.log("req img path: ", req.imagePath);
        return {
          ...i,
          image: req.imagePath + i.image,
        };
      });

      res.json(totalRes);
    }
  );
}

function getCoupon(req, res) {
  const sql =
    "SELECT * FROM coupons WHERE code = 'SCONTO10' AND '2024-03-15' BETWEEN start_date AND end_date;";

  connection.query(sql, (err, response) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (response.length === 0) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    // Restituisco il primo (e unico) risultato
    res.json(response[0]);
  });
}

function checkout(req, res) {
  let dati = req.body;
  let totale = 0;
  let couponId = dati.coupon_id ? dati.coupon_id : null;

  // Valida i dati in ingresso
  if (
    !dati.nome ||
    !dati.cognome ||
    !dati.email ||
    !dati.telefono ||
    !dati.indirizzo_spedizione ||
    !dati.indirizzo_pagamento ||
    !dati.carrello ||
    dati.carrello.length === 0
  ) {
    return res.status(400).json({ error: "Dati ordine incompleti" });
  }

  // Calcolo il totale
  for (let i = 0; i < dati.carrello.length; i++) {
    totale += dati.carrello[i].prezzo * dati.carrello[i].quantita;
  }

  // Inizio la transazione per garantire la consistenza dei dati
  connection.beginTransaction((err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Errore nell'avvio della transazione" });

    // Gestione coupon
    if (couponId) {
      let sqlCoupon = "SELECT discount FROM coupons WHERE id = ?";
      connection.query(sqlCoupon, [couponId], (err, results) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: "Errore nella verifica del coupon" });
          });
        }

        if (results.length > 0) {
          let sconto = results[0].discount;
          totale = totale - (totale * sconto) / 100;
        }
        inserisciOrdine();
      });
    } else {
      inserisciOrdine();
    }
  });

  function inserisciOrdine() {
    let sqlOrdine =
      "INSERT INTO orders (order_date, coupon_id, address_shipping, address_payment, phone_number, mail, total, name, surname) VALUES (CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?)";

    let valoriOrdine = [
      couponId,
      dati.indirizzo_spedizione,
      dati.indirizzo_pagamento,
      dati.telefono,
      dati.email,
      totale,
      dati.nome,
      dati.cognome,
    ];

    connection.query(sqlOrdine, valoriOrdine, (err, risultato) => {
      if (err) {
        return connection.rollback(() => {
          res
            .status(500)
            .json({ error: "Errore nell'inserimento dell'ordine" });
        });
      }

      let orderId = risultato.insertId;
      inserisciProdottiOrdine(orderId);
    });
  }

  function inserisciProdottiOrdine(orderId) {
    const prodottiValori = [];

    // Prepara tutti i valori per insert multiplo
    for (let i = 0; i < dati.carrello.length; i++) {
      let prodotto = dati.carrello[i];
      prodottiValori.push([
        prodotto.id,
        `Prodotto ${prodotto.id}`, // Idealmente recuperare il nome dal database
        prodotto.prezzo,
        prodotto.quantita,
        orderId,
      ]);
    }

    // Inserisci tutti i prodotti in un'unica query
    const sqlProdotti =
      "INSERT INTO product_order (product_id, name_product, price, product_quantity, order_id) VALUES ?";

    connection.query(sqlProdotti, [prodottiValori], (err) => {
      if (err) {
        return connection.rollback(() => {
          res
            .status(500)
            .json({
              error: "Errore nell'inserimento dei prodotti dell'ordine",
            });
        });
      }

      aggiornaQuantita(orderId);
    });
  }

  function aggiornaQuantita(orderId) {
    let errori = false;
    let queryCompletate = 0;

    for (let i = 0; i < dati.carrello.length; i++) {
      let prodotto = dati.carrello[i];

      // Prima verifica la disponibilità
      let sqlVerifica =
        "SELECT quantity FROM product_size WHERE product_id = ? AND size_id = ?";

      connection.query(
        sqlVerifica,
        [prodotto.id, prodotto.size_id],
        (err, results) => {
          if (err || results.length === 0) {
            errori = true;
            return completaQuery();
          }

          const disponibile = results[0].quantity;
          if (disponibile < prodotto.quantita) {
            errori = true;
            return completaQuery();
          }

          // Se disponibile, aggiorna la quantità
          let sqlUpdate =
            "UPDATE product_size SET quantity = quantity - ? WHERE product_id = ? AND size_id = ?";

          connection.query(
            sqlUpdate,
            [prodotto.quantita, prodotto.id, prodotto.size_id],
            (err) => {
              if (err) errori = true;
              completaQuery();
            }
          );
        }
      );
    }

    function completaQuery() {
      queryCompletate++;

      if (queryCompletate === dati.carrello.length) {
        if (errori) {
          return connection.rollback(() => {
            res
              .status(500)
              .json({
                error:
                  "Errore nell'aggiornamento delle quantità o prodotto non disponibile",
              });
          });
        }

        // Tutto ok, conferma la transazione
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              res
                .status(500)
                .json({ error: "Errore nel completamento dell'ordine" });
            });
          }

          res.status(200).json({
            message: "Ordine completato con successo",
            order_id: orderId,
            totale: totale,
          });
        });
      }
    }
  }
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
  search,
  getCoupon,
  checkout,
};
