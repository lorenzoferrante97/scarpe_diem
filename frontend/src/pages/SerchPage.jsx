import { Link, useSearchParams } from 'react-router-dom';
import Card from '../components/Card';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Recupera il termine di ricerca e il filtro dall'URL
  const searchTermFromUrl = searchParams.get('name') || '';
  const filterFromUrl = searchParams.get('filter') || '';

  // Funzione per eseguire la fetch in base al filtro e al termine di ricerca
  const fetchResults = (term, filter) => {
    let url;
    if (filter === 'bestsellers') {
      url = `http://localhost:3000/products/bestsellers${term ? `?name=${term}` : ''}`;
    } else if (filter === 'newarrivals') {
      url = `http://localhost:3000/products/newarrivals${term ? `?name=${term}` : ''}`;
    } else {
      url = term ? `http://localhost:3000/products/search?name=${term}` : 'http://localhost:3000/products/search';
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error(error));
  };

  // Sincronizza lo stato e avvia la ricerca al caricamento
  useEffect(() => {
    setSearchTerm(searchTermFromUrl);
    fetchResults(searchTermFromUrl, filterFromUrl);
  }, [searchTermFromUrl, filterFromUrl]);

  // Gestisce l'invio del form
  const handleSearch = (event) => {
    event.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    setSearchParams({ name: term, filter: filterFromUrl });
    fetchResults(term, filterFromUrl);
  };

  // Gestisce la selezione del filtro
  const handleFilterChange = (filter) => {
    setSearchParams({ name: searchTermFromUrl, filter });
    fetchResults(searchTermFromUrl, filter);
  };

  const isDisabled = !searchTerm.trim();
  return (
    <>
      <main>
        <section className="search-form-section">
          <div className="search-header">
            <h1 className="h1">Ricerca</h1>
          </div>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-box">
              <label htmlFor="search" className="text-big">
                Cerca per nome scarpa, brand o categoria
              </label>
              <input name="search" type="text" className="search-input" placeholder="Search..." aria-label="Search" aria-describedby="button-addon2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button className="btn btn-accent" type="submit" id="button-addon2">
              Cerca
            </button>
          </form>
        </section>
        {/* Elenco risultati di ricerca */}
        <section className="search-results">
          {searchResults.length > 0 ? (
            <div className="search-results-container">
              <div className="results-header-content">
                <div className="results-box">
                  <span className="text-big">Risultati di ricerca</span>
                  <span className="text-big counter">{searchResults.length}</span>
                </div>

                {/* Pulsanti per i filtri */}
                <div className="results-filter-box">
                  <button className={`btn ${filterFromUrl === '' ? 'btn-accent' : 'btn-sec'}`} onClick={() => handleFilterChange('')}>
                    Tutti
                  </button>
                  <button className={`btn ${filterFromUrl === 'bestsellers' ? 'btn-accent' : 'btn-sec'}`} onClick={() => handleFilterChange('bestsellers')} disabled={isDisabled}>
                    Best Sellers
                  </button>
                  <button className={`btn ${filterFromUrl === 'newarrivals' ? 'btn-accent' : 'btn-sec'}`} onClick={() => handleFilterChange('newarrivals')} disabled={isDisabled}>
                    Ultimi Arrivi
                  </button>
                </div>
              </div>

              {/* <h2> Risultati trovati: </h2> */}
              <ul className="search-results-list">
                {searchResults.map((result) => (
                  <Card key={result.slug} content={result} />
                ))}
              </ul>
            </div>
          ) : (
            (searchTermFromUrl || filterFromUrl) && (
              <div className="">
                <h2>Nessun risultato trovato</h2>
              </div>
            )
          )}
        </section>
      </main>
    </>
  );
}
