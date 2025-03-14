import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "../../types";
import { fetchProductByName } from "../../services/DietService";

interface ProductSearchProps {
    handleSelect: (product: Product) => string | null; 
}

export default function ProductSearch({ handleSelect }: ProductSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResult] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null); 
    const [showResults, setShowResults] = useState(false);

    const resultsRef = useRef<HTMLUListElement | null>(null); 

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
                setShowResults(false); 
            }
        } 
        
        if(showResults) document.addEventListener('mousedown', handleClickOutside); 

        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [showResults]); 

    const handleSearch = async (e: FormEvent) => {
      e.preventDefault(); 
      if(searchTerm === '') {
        setError('Wpisz nazwę produktu');
      } else {
        const { data, error } = await fetchProductByName(searchTerm);
        if(error) {
            setError(error.message);
        } else {
            setSearchResult(data);
            setShowResults(true); 
        }
      }

    }

    const onSelect= (product: Product) => {
        const error = handleSelect(product); 
        if(error) {
          setError(error); 
        } else {
          setSearchResult([]);
          setShowResults(false);
          setSearchTerm(''); 
        }
    }

    return (
        <div className="search product-search">
          <div className="search-group">
            <input
              type="text"
              placeholder="Wyszukaj produkt"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>Szukaj</button>
          </div>

          { error && <span className="search-error-message">{error}</span> }
  
        {searchResults.length > 0 && showResults && (
          <ul className="search-results" ref={resultsRef}>
            {searchResults.map((product, index) => (
              <li key={index} onClick={() => onSelect(product)}>
                <div>
                  {product.name}
                </div>
                <div>
                  +
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
}