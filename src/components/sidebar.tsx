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

  const toggle = (key: 'text' | 'color' | 'position') => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>CSS Learn</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link 
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              🏠 Главная
            </Link>
          </li>

          <li>
            <Link 
              to="/catalog"
              className={`nav-link ${isActive('/catalog') ? 'active' : ''}`}
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
              >
                Color
              </Link>
              <Link 
                to="/background"
                className={`nav-link ${isActive('/background') ? 'active' : ''}`}
              >
                Background
              </Link>
              <Link 
                to="/background-position"
                className={`nav-link ${isActive('/background-position') ? 'active' : ''}`}
              >
                Background-position
              </Link>
              <Link 
                to="/background-image"
                className={`nav-link ${isActive('/background-image') ? 'active' : ''}`}
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
              >
                Font-family
              </Link>
              <Link 
                to="/font-size"
                className={`nav-link ${isActive('/font-size') ? 'active' : ''}`}
              >
                Font-size
              </Link>
              <Link 
                to="/font-weight"
                className={`nav-link ${isActive('/font-weight') ? 'active' : ''}`}
              >
                Font-weight
              </Link>
              <Link
                to="/text-align"
                className={`nav-link ${isActive('/text-align') ? 'active' : ''}`}
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
              >
                Margin
              </Link>
              <Link 
                to="/padding"
                className={`nav-link ${isActive('/padding') ? 'active' : ''}`}
              >
                Padding
              </Link>
              <Link 
                to="/width"
                className={`nav-link ${isActive('/width') ? 'active' : ''}`}
              >
                Width
              </Link>
              <Link 
                to="/height"
                className={`nav-link ${isActive('/height') ? 'active' : ''}`}
              >
                Height
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;