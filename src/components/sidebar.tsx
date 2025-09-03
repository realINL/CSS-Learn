import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState<{ text: boolean; color: boolean; position: boolean }>({
    text: true,
    color: true,
    position: true,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggle = (key: 'text' | 'color' | 'position') => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Мобильная кнопка меню */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Открыть меню"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Оверлей для мобильного меню */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>CSS Learn</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link 
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                🏠 Главная
              </Link>
            </li>

            <li>
              <Link 
                to="/catalog"
                className={`nav-link ${isActive('/catalog') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                📚 Каталог
              </Link>
            </li>

            {/* Цвет */}
            <li className="category">
              <button className="category-header" onClick={() => toggle('color')}>
                <span className={`caret ${expanded.color ? 'open' : ''}`}>▸</span>
                <span className="category-icon">🎨</span>
                <span className="category-title">Цвет</span>
              </button>
              <div className={`category-content ${expanded.color ? 'expanded' : ''}`}>
                <Link 
                  to="/color"
                  className={`nav-link ${isActive('/color') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Color
                </Link>
                <Link 
                  to="/background"
                  className={`nav-link ${isActive('/background') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Background
                </Link>
                <Link 
                  to="/background-position"
                  className={`nav-link ${isActive('/background-position') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Background-position
                </Link>
                <Link 
                  to="/background-image"
                  className={`nav-link ${isActive('/background-image') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Background-image
                </Link>
              </div>
            </li>

            {/* Текст */}
            <li className="category">
              <button className="category-header" onClick={() => toggle('text')}>
                <span className={`caret ${expanded.text ? 'open' : ''}`}>▸</span>
                <span className="category-icon">📝</span>
                <span className="category-title">Текст</span>
              </button>
              <div className={`category-content ${expanded.text ? 'expanded' : ''}`}>
                <Link 
                  to="/font-family"
                  className={`nav-link ${isActive('/font-family') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Font-family
                </Link>
                <Link 
                  to="/font-size"
                  className={`nav-link ${isActive('/font-size') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Font-size
                </Link>
                <Link 
                  to="/font-weight"
                  className={`nav-link ${isActive('/font-weight') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Font-weight
                </Link>
                <Link
                  to="/text-align"
                  className={`nav-link ${isActive('/text-align') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Text-align
                </Link>
              </div>
            </li>

            {/* Позиционирование */}
            <li className="category">
              <button className="category-header" onClick={() => toggle('position')}>
                <span className={`caret ${expanded.position ? 'open' : ''}`}>▸</span>
                <span className="category-icon">📍</span>
                <span className="category-title">Позиционирование</span>
              </button>
              <div className={`category-content ${expanded.position ? 'expanded' : ''}`}>
                <Link 
                  to="/margin"
                  className={`nav-link ${isActive('/margin') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Margin
                </Link>
                <Link 
                  to="/padding"
                  className={`nav-link ${isActive('/padding') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Padding
                </Link>
                <Link 
                  to="/width"
                  className={`nav-link ${isActive('/width') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Width
                </Link>
                <Link 
                  to="/height"
                  className={`nav-link ${isActive('/height') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Height
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;