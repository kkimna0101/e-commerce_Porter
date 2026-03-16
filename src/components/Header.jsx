import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const newSearch = searchQuery.trim();
      let updatedSearches = [newSearch, ...recentSearches.filter(s => s !== newSearch)].slice(0, 5);
      
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      setIsSearchOpen(false);
      setSearchQuery('');
      navigate(`/product?q=${encodeURIComponent(newSearch)}`);
    }
  };

  const removeRecentSearch = (term) => {
    const updated = recentSearches.filter(s => s !== term);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__inner inner">
          <div className="header__left">
            <Link to="/" className="header__logo">PORTER</Link>
          </div>
          
          <nav className="header__center">
            <ul className="gnb">
              <li><Link to="/product">PRODUCT <span>+</span></Link></li>
              <li><Link to="/collab">COLLABORATION</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li><Link to="/offline">OFFLINE</Link></li>
            </ul>
          </nav>
          
          <div className="header__right">
            <button className="util-btn" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
            </button>
            <Link to="/login" className="util-link desktop-only">LOGIN</Link>
            <Link to="/cart" className="util-btn flex">
              <ShoppingBag size={20} />
              <span className="cart-badge">0</span>
            </Link>
            <button className="util-btn mobile-only" onClick={toggleMenu}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu__close" onClick={toggleMenu}>
            <X size={28} />
          </button>
          <ul className="mobile-menu__list">
            <li><Link to="/product" onClick={toggleMenu}>PRODUCT</Link></li>
            <li><Link to="/collab" onClick={toggleMenu}>COLLABORATION</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>ABOUT</Link></li>
            <li><Link to="/offline" onClick={toggleMenu}>OFFLINE</Link></li>
            <li><Link to="/login" onClick={toggleMenu}>LOGIN / MY PAGE</Link></li>
          </ul>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="search-modal">
          <div className="search-modal__close" onClick={() => setIsSearchOpen(false)}>
            <X size={32} />
          </div>
          <div className="search-modal__content">
            <input 
              type="text" 
              placeholder="SEARCH PRODUCTS..." 
              className="search-modal__input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              autoFocus
            />
            {recentSearches.length > 0 && (
              <div className="search-modal__recent">
                <h3>RECENT SEARCHES</h3>
                <div className="recent-list">
                  {recentSearches.map((term, i) => (
                    <div key={i} className="recent-item">
                      <span onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/product?q=${encodeURIComponent(term)}`);
                      }}>{term}</span>
                      <button onClick={() => removeRecentSearch(term)}><X size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
