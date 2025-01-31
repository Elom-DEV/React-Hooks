import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Délai de 500ms

  // TODO: Passer debouncedSearchTerm à useProductSearch pour la recherche

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;