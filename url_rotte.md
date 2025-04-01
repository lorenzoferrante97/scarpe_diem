-- BASE

http://localhost:5173

-- ROTTE FRONTEND

HOME -> www.scarpediem.it/

PRODUCT PAGE -> www.scarpediem.it/:slug

CARRELLO -> www.scarpediem.it/cart

WISHLIST -> www.scarpediem.it/wishlist

MILESTONE FUTURE:

PAG RICERCA -> www.scarpediem.it/search

CHECKOUT -> www.scarpediem.it/checkout

-- ROTTE BACKEND
INDEX products -> http://localhost:3000/products/

INDEX category -> http://localhost:3000/products/category?name_category=casual

SHOW product-> http://localhost:3000/products/NOME_PRODOTTO

INDEX serch -> http://localhost:3000/products/search?name=NOME_PROD

STORE (aggiunta prodotto al carrello) -> /:slug/orders

INDEX (correlati) -> http://localhost:3000/products/related

INDEX (più venduti) -> http://localhost:3000/products/bestsellers

INDEX (ultimi arrivi) -> http://localhost:3000/products/newarrivals

<!-- INDEX (ricerca prodotto per marca) -> /search?brand="" -->
