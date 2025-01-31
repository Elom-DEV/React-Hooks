import { useState, useEffect } from 'react';

const useProductSearch = (initialPage = 1, limit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage); // Déclarer l'état pour la page
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://api.daaif.net/products?page=${page}&limit=${limit}&delay=1000`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit]); // Déclencher le chargement lorsque la page ou la limite change

  const reload = () => {
    fetchProducts();
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1); // Utiliser setPage pour passer à la page suivante
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1); // Utiliser setPage pour revenir à la page précédente
    }
  };

  return {
    products,
    loading,
    error,
    reload,
    nextPage,
    previousPage,
    currentPage: page,
    totalPages,
  };
};

export default useProductSearch;