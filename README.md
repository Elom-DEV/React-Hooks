
---

#  React Hooks - Application de Gestion de Produits

---
Objectif de mettre en pratique l'utilisation des Hooks React (`useState`, `useEffect`, `useContext`) ainsi que la création de Hooks personnalisés. Voici les détails des exercices et les solutions proposées.



## **-État et Effets**

### **Objectif**
Gérer l'état des produits et utiliser `useEffect` pour charger les données initiales.

### **Solution**
- Utilisation de `useState` pour stocker la liste des produits.
- Utilisation de `useEffect` pour charger les produits depuis une API.

### **Code**
```javascript
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default ProductList;
```

### **Capture d'écran**
![Exercice 1 - Liste des produits](screenshots/ex1-product-list.png)

---

## **Exercice 2 : Context et Internationalisation**

### **Objectif**
Gérer les préférences de langue avec `useContext`.

### **Solution**
- Création d'un `LanguageContext` pour partager la langue dans toute l'application.
- Ajout d'un sélecteur de langue dans l'en-tête.

### **Code**
```javascript
import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const App = () => {
  const [language, setLanguage] = useState('fr');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
      {/* Votre application */}
    </LanguageContext.Provider>
  );
};

export default App;
```

### **Capture d'écran**
![Exercice 2 - Sélecteur de langue](screenshots/ex2-language-selector.png)

---

## Exercice 3 : Hooks Personnalisés

### Objectif
Créer des hooks réutilisables (`useDebounce` et `useLocalStorage`).

### Solution
- `useDebounce` : Retarde la recherche pour éviter des appels API excessifs.
- `useLocalStorage` : Persiste les préférences utilisateur (thème et langue).

### Captures d'écran
![useDebounce - Recherche de produits](screenshots/ex3-useDebounce.png)
![useLocalStorage - Persistance du thème](screenshots/ex3-useLocalStorage.png)
---

## **Exercice 4 : Gestion Asynchrone et Pagination**

### **Objectif**
Gérer le chargement asynchrone des produits et implémenter la pagination.

### **Solution**
- Ajout d'un bouton de rechargement pour rafraîchir la liste des produits.
- Implémentation de la pagination avec des boutons "Précédent" et "Suivant".

### **Code**
```javascript
import { useState, useEffect } from 'react';

const useProductSearch = (initialPage = 1, limit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
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
  }, [page, limit]);

  const reload = () => {
    fetchProducts();
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
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
```

### **Capture d'écran**
![Exercice 4 - Pagination](screenshots/ex4-pagination.png)

---

## **Conclusion**
Ce TP a permis de mettre en pratique les concepts fondamentaux de React, notamment les Hooks (`useState`, `useEffect`, `useContext`) et la création de Hooks personnalisés. Chaque exercice a été documenté avec des explications, des extraits de code et des captures d'écran.

---

## **Captures d'écran**
- [Exercice 1 - Liste des produits](screenshots/ex1-product-list.png)
- [Exercice 2 - Sélecteur de langue](screenshots/ex2-language-selector.png)
- [Exercice 3 - Hooks personnalisés](screenshots/ex3-custom-hooks.png)
- [Exercice 4 - Pagination](screenshots/ex4-pagination.png)

---

## **Comment exécuter le projet**
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/tp-react-hooks.git
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez l'application :
   ```bash
   npm start
   ```

---

## **Auteur**
- [Votre nom](https://github.com/votre-utilisateur)

---

N'hésitez pas à contribuer ou à signaler des problèmes via les [issues](https://github.com/votre-utilisateur/tp-react-hooks/issues).
