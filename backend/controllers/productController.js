import connection from "../data/db.js";

import nodemailer from "nodemailer";

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
  const searchMethod = `%${req.query.name || req.query.name_category || req.query.name_brand || ""}%`;
  const sql = `
    SELECT p.name AS Prodotto, p.image AS Immagine, p.price AS Prezzo, p.slug AS slug, c.name_category, b.name_brand, SUM(po.product_quantity) AS Totale_Vendite 
    FROM product_order po 
    JOIN products p ON po.product_id = p.id 
    JOIN categories c ON p.category_id = c.id 
    JOIN brands b ON p.brand_id = b.id 
    WHERE p.name LIKE ? OR c.name_category LIKE ? OR b.name_brand LIKE ? 
    GROUP BY p.id, p.name, p.image, p.price, c.name_category, b.name_brand 
    ORDER BY Totale_Vendite DESC
    LIMIT 6;
  `;

  connection.query(sql, [searchMethod, searchMethod, searchMethod], (err, response) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (response.length === 0) {
      return res.status(404).json({ error: "Bestsellers not found" });
    }
    const totalRes = response.map((i) => ({
      ...i,
      Immagine: req.imagePath + i.Immagine,
    }));
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
  const now = new Date();
  const twoMonthsAgo = new Date(now);
  twoMonthsAgo.setMonth(now.getMonth() - 2);
  const formattedDateNow = now.toISOString().split("T")[0];
  const formattedDateTwoMonthsAgo = twoMonthsAgo.toISOString().split("T")[0];

  const searchMethod = `%${req.query.name || req.query.name_category || req.query.name_brand || ""}%`;
  const sql = `
    SELECT p.slug, p.name AS Prodotto, p.image AS Immagine, p.price AS Prezzo, c.name_category, b.name_brand, p.insert_date 
    FROM products p 
    JOIN categories c ON p.category_id = c.id 
    JOIN brands b ON p.brand_id = b.id 
    WHERE p.insert_date BETWEEN ? AND ? AND (p.name LIKE ? OR c.name_category LIKE ? OR b.name_brand LIKE ?) 
    ORDER BY p.insert_date DESC;
  `;

  connection.query(sql, [formattedDateTwoMonthsAgo, formattedDateNow, searchMethod, searchMethod, searchMethod], (err, response) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (response.length === 0) {
      return res.status(404).json({ error: "Newarrivals not found" });
    }
    const totalRes = response.map((i) => ({
      ...i,
      Immagine: req.imagePath + i.Immagine,
    }));
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


function related(req, res) {
  const categoryId = req.query.categoryId;
  const currentSlug = req.query.slug;

  if (!categoryId || !currentSlug) {
    return res.status(400).json({ error: "categoryId o slug mancante" });
  }

  const sql = `
    SELECT slug, id AS ID, name AS Prodotto, price AS Prezzo, image AS Immagine
    FROM products
    WHERE category_id = ? AND slug != ?
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
  const searchMethod = `%${req.query.name || req.query.name_category || req.query.name_brand
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
  // console.log("getCoupon chiamato");
  const sql = `
    SELECT * 
    FROM coupons 
    WHERE CURDATE() BETWEEN start_date AND end_date
    LIMIT 1
  `;
  connection.query(sql, (err, response) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    // console.log("Risultato query:", response);
    if (response.length === 0) {
      return res.status(404).json({ error: "Nessun coupon valido trovato" });
    }
    res.json(response[0]);
  });
}


function checkout(req, res) {
  let dati = req.body;
  let totale = 0;
  let couponCode = dati.coupon ? dati.coupon : null;
  let sconto = null; // verrà impostato se il coupon è valido

  // Validazioni approfondite dei dati dell'ordine
  if (!dati.nome || dati.nome.trim() === "") {
    return res.status(400).json({ error: "Il nome è obbligatorio" });
  }

  if (!dati.cognome || dati.cognome.trim() === "") {
    return res.status(400).json({ error: "Il cognome è obbligatorio" });
  }

  // Validazione email con una regex semplice
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!dati.email || !emailRegex.test(dati.email)) {
    return res.status(400).json({ error: "Indirizzo email non valido" });
  }

  // Validazione telefono (accetta solo numeri, spazi, + e -)
  const telefonoRegex = /^[0-9\s\+\-]{6,20}$/;
  if (!dati.telefono || !telefonoRegex.test(dati.telefono)) {
    return res.status(400).json({ error: "Numero di telefono non valido" });
  }

  // Validazione indirizzi
  if (!dati.indirizzo_spedizione || dati.indirizzo_spedizione.trim().length < 10) {
    return res.status(400).json({ error: "Indirizzo di spedizione non valido o troppo breve" });
  }

  if (!dati.indirizzo_pagamento || dati.indirizzo_pagamento.trim().length < 10) {
    return res.status(400).json({ error: "Indirizzo di fatturazione non valido o troppo breve" });
  }

  // Validazione carrello
  if (!dati.carrello || !Array.isArray(dati.carrello) || dati.carrello.length === 0) {
    return res.status(400).json({ error: "Il carrello è vuoto o non valido" });
  }

  // Validazione di ogni prodotto nel carrello
  for (let i = 0; i < dati.carrello.length; i++) {
    const prodotto = dati.carrello[i];
    if (!prodotto.id || !prodotto.prezzo || !prodotto.quantita || !prodotto.size_id) {
      return res.status(400).json({
        error: "Dati prodotto incompleti",
        prodotto_index: i,
        prodotto: prodotto
      });
    }

    if (prodotto.quantita <= 0 || prodotto.prezzo <= 0) {
      return res.status(400).json({
        error: "Quantità o prezzo non validi",
        prodotto_index: i,
        prodotto: prodotto
      });
    }
  }
  // Calcolo del totale
  for (let i = 0; i < dati.carrello.length; i++) {
    totale += dati.carrello[i].prezzo * dati.carrello[i].quantita;
  }

  // Inizia raccolta dei nomi prodotti
  const prodottiConNomi = [...dati.carrello];
  let prodottiProcessati = 0;

  // Recupera i nomi dei prodotti dal database
  for (let i = 0; i < dati.carrello.length; i++) {
    let prodotto = dati.carrello[i];
    let sqlNomeProdotto = "SELECT name FROM products WHERE id = ?";

    connection.query(sqlNomeProdotto, [prodotto.id], (err, results) => {
      if (!err && results.length > 0) {
        prodottiConNomi[i].nome = results[0].name;
      } else {
        prodottiConNomi[i].nome = `Prodotto ${prodotto.id}`; // fallback
      }

      prodottiProcessati++;
      if (prodottiProcessati === dati.carrello.length) {
        // Una volta ottenuti tutti i nomi, avvia la transazione
        iniziaTransazione();
      }
    });
  }

  function iniziaTransazione() {
    connection.beginTransaction((err) => {
      if (err)
        return res.status(500).json({ error: "Errore nell'avvio della transazione" });

      if (couponCode) {
        let sqlCoupon =
          "SELECT id, discount FROM coupons WHERE code = ? AND CURDATE() BETWEEN start_date AND end_date";
        connection.query(sqlCoupon, [couponCode], (err, results) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ error: "Errore nella verifica del coupon" });
            });
          }

          if (results.length > 0) {
            sconto = results[0].discount;
            let couponId = results[0].id;
            totale = totale - (totale * sconto) / 100;
            inserisciOrdine(couponId);
          } else {
            inserisciOrdine(null);
          }
        });
      } else {
        inserisciOrdine(null);
      }
    });
  }

  function inserisciOrdine(couponId) {
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
          res.status(500).json({ error: "Errore nell'inserimento dell'ordine" });
        });
      }

      let orderId = risultato.insertId;
      inserisciProdottiOrdine(orderId);
    });
  }

  function inserisciProdottiOrdine(orderId) {
    const prodottiValori = [];
    let queryCompletate = 0;
    let errori = false;

    for (let i = 0; i < prodottiConNomi.length; i++) {
      let prodotto = prodottiConNomi[i];

      prodottiValori.push([
        prodotto.id,
        prodotto.nome, // Utilizza il nome già recuperato
        prodotto.prezzo,
        prodotto.quantita,
        orderId,
      ]);

      queryCompletate++;

      if (queryCompletate === prodottiConNomi.length) {
        const sqlProdotti =
          "INSERT INTO product_order (product_id, name_product, price, product_quantity, order_id) VALUES ?";
        connection.query(sqlProdotti, [prodottiValori], (err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({
                error: "Errore nell'inserimento dei prodotti dell'ordine",
              });
            });
          }
          aggiornaQuantita(orderId);
        });
      }
    }
  }

  function aggiornaQuantita(orderId) {
    let errori = false;
    let queryCompletate = 0;
    for (let i = 0; i < dati.carrello.length; i++) {
      let prodotto = dati.carrello[i];
      let sqlVerifica = "SELECT quantity FROM product_size WHERE product_id = ? AND size_id = ?";
      connection.query(sqlVerifica, [prodotto.id, prodotto.size_id], (err, results) => {
        if (err || results.length === 0) {
          errori = true;
          return completaQuery();
        }
        const disponibile = results[0].quantity;
        if (disponibile < prodotto.quantita) {
          errori = true;
          return completaQuery();
        }
        let sqlUpdate = "UPDATE product_size SET quantity = quantity - ? WHERE product_id = ? AND size_id = ?";
        connection.query(sqlUpdate, [prodotto.quantita, prodotto.id, prodotto.size_id], (err) => {
          if (err) errori = true;
          completaQuery();
        });
      });
    }

    function completaQuery() {
      queryCompletate++;
      console.log("completaQuery chiamata:", queryCompletate, "/", dati.carrello.length);
      if (queryCompletate === dati.carrello.length) {
        if (errori) {
          return connection.rollback(() => {
            res.status(500).json({
              error: "Errore nell'aggiornamento delle quantità o prodotto non disponibile",
            });
          });
        }
        console.log("Tutte le quantità aggiornate correttamente, procedo con commit");
        connection.commit(async (err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ error: "Errore nel completamento dell'ordine" });
            });
          }
          try {
            // Passa couponCode e sconto alla funzione email
            await inviaEmailConferma(
              dati.email,
              dati.nome,
              dati.cognome,
              orderId,
              totale,
              prodottiConNomi,
              couponCode,
              sconto,
              dati.indirizzo_spedizione,
              dati.indirizzo_pagamento,
              dati.telefono
            );
          } catch (emailErr) {
            console.error("Errore nell'invio dell'email:", emailErr);
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

  // Funzione Email aggiornata con coupon e sconto nell'HTML
  async function inviaEmailConferma(
    email,
    nome,
    cognome,
    numeroOrdine,
    totale,
    carrello,
    coupon = null,
    sconto = null,
    indirizzoSpedizione,
    indirizzoFatturazione,
    telefono
  ) {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Formattazione corretta degli indirizzi - rimuove virgole consecutive
    const formatIndirizzo = (indirizzo) => {
      // Rimuove spazi bianchi extra e sostituisce sequenze di virgole con una singola virgola
      return indirizzo.trim().replace(/,\s*,+/g, ',').replace(/,\s*$/g, '');
    };

    const indirizzoSpedizioneFormattato = formatIndirizzo(indirizzoSpedizione);
    const indirizzoFatturazioneFormattato = formatIndirizzo(indirizzoFatturazione);

    // HTML per l'email al cliente
    const prodottiHtml = carrello
      .map(item => `
    <tr>
      <td>${item.nome || `Prodotto ${item.id}`}</td>
      <td style="text-align: center;">${item.quantita}</td>
      <td style="text-align: right;">€${(item.prezzo * item.quantita).toFixed(2)}</td>
    </tr>
  `)
      .join("");

    const clienteHtml = `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
    <h2>Ciao ${nome},</h2>
    <p>Grazie per il tuo ordine! Ecco il riepilogo del tuo acquisto:</p>
    <h3>Ordine #${numeroOrdine}</h3>
    
    <div style="background-color: #f8f8f8; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
      <h4 style="margin-top: 0;">Informazioni di spedizione</h4>
      <p><strong>Indirizzo di consegna:</strong><br>${indirizzoSpedizioneFormattato}</p>
      <p><strong>Indirizzo di fatturazione:</strong><br>${indirizzoFatturazioneFormattato}</p>
      <p><strong>Telefono:</strong> ${telefono}</p>
      <p>Grazie per aver acquistato su <strong>scarpe_diem</strong></p>
    </div>
    
    <table width="100%" border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th align="left">Prodotto</th>
          <th align="center">Quantità</th>
          <th align="right">Totale</th>
        </tr>
      </thead>
      <tbody>
        ${prodottiHtml}
      </tbody>
    </table>
    <h3 style="text-align: right;">Totale: €${totale.toFixed(2)}</h3>
    ${coupon && sconto ? `
      <p style="text-align: right; color: green; font-weight: bold;">
        Coupon applicato: <strong>${coupon}</strong> (-${sconto}%)
      </p>` : ""
      }
    <p>Ti contatteremo appena il tuo ordine sarà spedito.<br/>Grazie per aver scelto il nostro shop!</p>
    <p style="font-size: 0.9em; color: #777;">Email di test inviata da Mailtrap</p>
  </div>
`;

    const clienteMailOptions = {
      from: '"Esempio Shop" <noreply@esempioshop.it>',
      to: email,
      subject: `Conferma Ordine #${numeroOrdine}`,
      html: clienteHtml,
    };

    // HTML per l'email all'amministratore
    const adminHtml = `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
    <h2>Nuovo ordine ricevuto!</h2>
    <p>È stato effettuato un nuovo ordine con i seguenti dati:</p>
    <ul>
      <li><strong>Cliente:</strong> ${nome} ${cognome}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Telefono:</strong> ${telefono}</li>
      <li><strong>Numero ordine:</strong> #${numeroOrdine}</li>
      <li><strong>Importo totale:</strong> €${totale.toFixed(2)}</li>
      ${coupon ? `<li><strong>Coupon:</strong> ${coupon} (-${sconto}%)</li>` : ""}
    </ul>
    
    <div style="background-color: #f8f8f8; padding: 15px; margin: 15px 0; border-radius: 5px;">
      <h4 style="margin-top: 0;">Indirizzi</h4>
      <p><strong>Indirizzo di spedizione:</strong><br>${indirizzoSpedizioneFormattato}</p>
      <p><strong>Indirizzo di fatturazione:</strong><br>${indirizzoFatturazioneFormattato}</p>
    </div>
    
    <h3>Prodotti ordinati</h3>
    <table width="100%" border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th align="left">Prodotto</th>
          <th align="center">Quantità</th>
          <th align="right">Prezzo</th>
          <th align="right">Totale</th>
        </tr>
      </thead>
      <tbody>
        ${carrello.map(item => `
          <tr>
            <td>${item.nome || `Prodotto ${item.id}`}</td>
            <td style="text-align: center;">${item.quantita}</td>
            <td style="text-align: right;">€${item.prezzo}</td>
            <td style="text-align: right;">€${(item.prezzo * item.quantita).toFixed(2)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <p>Si prega di procedere con la preparazione dell'ordine.</p>
  </div>
`;

    const adminMailOptions = {
      from: '"Sistema Ordini" <sistema@esempioshop.it>',
      to: "ordini@scarpediem.com",
      subject: `NUOVO ORDINE #${numeroOrdine} - €${totale.toFixed(2)}`,
      html: adminHtml,
    };

    try {
      await transporter.sendMail(clienteMailOptions);
      await transporter.sendMail(adminMailOptions);
      return true;
    } catch (error) {
      console.error("Errore nell'invio delle email:", error);
      throw error;
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
