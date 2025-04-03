import { Link } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import Card from '../components/Card';

export default function SearchPage() {
  const { setSearchTerm, handleSearch, searchResults } = useGlobalContext();
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
              <input name="search" type="text" className="search-input" placeholder="Search..." aria-label="Search" aria-describedby="button-addon2" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button className="btn btn-accent" type="submit" id="button-addon2">
              Cerca
            </button>
          </form>
        </section>
        {/* elenco risultati di ricerca */}
        <section className="search-results">
          {
            searchResults.length > 0 ? (
              <div className="search-results-container">
                <span className="text-big">Risultati di ricerca</span>
                <ul className="search-results-list">
                  {searchResults.map((result) => {
                    return (
                      <Card key={result.slug} content={result} />
                      // <li className="" key={result.slug}>
                      //   <Link to={`/product/${result.slug}`} className=" ">
                      //     <img
                      //       src={result.image}
                      //       alt={result.name}
                      //       style={{
                      //         width: '50px',
                      //         height: 'auto',
                      //         marginRight: '10px',
                      //       }}
                      //     />
                      //     {result.name} - {result.name_category} - {result.name_brand}
                      //   </Link>
                      // </li>
                    );
                  })}
                </ul>
              </div>
            ) : null
            // <div className="">
            //   <h2>No results found</h2>
            // </div>
          }
        </section>
      </main>
    </>
  );
}
