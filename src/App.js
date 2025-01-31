import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';

// Création des contextes
export const ThemeContext = createContext();
export const LanguageContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('isDarkTheme', false);
  const [language, setLanguage] = useLocalStorage('language', 'fr');

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`form-select ${isDarkTheme ? 'bg-dark text-light' : ''}`}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </header>
          <main>
            <ProductSearch />
            <ProductList />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;