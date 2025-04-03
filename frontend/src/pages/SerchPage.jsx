import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function SearchPage() {
  const { setSearchTerm, handleSearch, searchResults } = useGlobalContext();
  return (
      <>
          
      <form onSubmit={handleSearch}>
        <div className="">
          <input
            type="text"
            className=""
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className=""
            type="submit"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </form>
      {searchResults.length > 0 ? (
        <div className="">
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.slug}>
                <Link to={`/product/${result.slug}`} className=" ">
                  <img
                    src={result.image}
                    alt={result.name}
                    style={{
                      width: "50px",
                      height: "auto",
                      marginRight: "10px",
                    }}
                  />
                  {result.name} - {result.name_category} - {result.name_brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>
          )
          : (
            <div className="">
              <h2>No results found</h2>
            </div>
          )}
    </>
  );
}
