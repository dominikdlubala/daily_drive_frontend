import { FormEvent, useState } from "react";
import { Product } from "../../types";
import { fetchProductByName } from "../../services/DietService";

interface ProductSearchProps {
    handleSelect: (product: Product) => void; 
}

export default function ProductSearch({ handleSelect }: ProductSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResult] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null); 

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
        }
      }

    }

    const handleSubmit = (product: Product) => {
        handleSelect(product); 
        setSearchTerm(''); 
    }

    return (
        <div className="exercise-search">
        <input
          type="text"
          placeholder="Wyszukaj produkt"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>Szukaj</button>

        { error && <span className="search-error-message">{error}</span> }
  
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((product, index) => (
              <li key={index} onClick={() => handleSubmit(product)}>
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
}