import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    fr: { loading: 'Chargement...', error: 'Erreur', price: 'Prix' },
    en: { loading: 'Loading...', error: 'Error', price: 'Price' },
  };

  const { 
    products, 
    loading, 
    error,
    reload,
    nextPage,
    previousPage,
    currentPage,
    totalPages,
  } = useProductSearch();

  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{translations[language].loading}</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      {translations[language].error}: {error}
    </div>
  );

  return (
    <div>
      <button onClick={reload} className="btn btn-primary mb-3">
        Recharger
      </button>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{translations[language].price}: </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={previousPage} disabled={currentPage === 1}>
              Précédent
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {currentPage} sur {totalPages}
            </span>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;