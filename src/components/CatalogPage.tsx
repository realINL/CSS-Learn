import { Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertiesContext';
import { usePropertySearch } from '../hooks/usePropertySearch';
import { getAllCategories } from '../data/categories';
import './CatalogPage.css';

const CatalogPage = () => {
  const { properties } = useProperties();
  const { 
    query, 
    setQuery, 
    filters, 
    updateFilter, 
    searchResults, 
    searchStats,
    clearFilters,
    resetAll 
  } = usePropertySearch(properties);

  const categories = getAllCategories();

  return (
    <div className="catalog-page-container">
      <header className="catalog-page-header">
        <h1 className="catalog-title">📚 Каталог CSS Свойств</h1>
        <p>Полный справочник всех доступных CSS свойств с описаниями</p>
      </header>
      
      <main className="catalog-content">
        <section className="catalog-section">
          <div className="catalog-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Поиск свойств..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="catalog-search"
              />
              {query && (
                <button onClick={() => setQuery('')} className="clear-search-btn">
                  ✕
                </button>
              )}
            </div>
            
            <div className="filter-controls">
              <div className="category-filters">
                <button
                  className={`category-filter ${filters.category === 'all' ? 'active' : ''}`}
                  onClick={() => updateFilter('category', 'all')}
                >
                  <span className="filter-icon">📚</span>
                  <span className="filter-name">Все свойства</span>
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter ${filters.category === category.id ? 'active' : ''}`}
                    onClick={() => updateFilter('category', category.id)}
                  >
                    <span className="filter-icon">{category.icon}</span>
                    <span className="filter-name">{category.name}</span>
                  </button>
                ))}
              </div>

              <div className="additional-filters">
                <button
                  className={`filter-btn ${filters.difficulty === 'beginner' ? 'active' : ''}`}
                  onClick={() => updateFilter('difficulty', filters.difficulty === 'beginner' ? 'all' : 'beginner')}
                >
                  🟢 Начинающий
                </button>
                <button
                  className={`filter-btn ${filters.hasTask ? 'active' : ''}`}
                  onClick={() => updateFilter('hasTask', !filters.hasTask)}
                >
                  🎯 С заданиями
                </button>
                <button
                  className={`filter-btn ${filters.hasExamples ? 'active' : ''}`}
                  onClick={() => updateFilter('hasExamples', !filters.hasExamples)}
                >
                  💡 С примерами
                </button>
              </div>

              {(filters.category !== 'all' || filters.difficulty !== 'all' || filters.hasTask || filters.hasExamples) && (
                <button onClick={clearFilters} className="clear-filters-btn">
                  Очистить фильтры
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="catalog-section">
          <div className="properties-grid">
            {searchResults.map(property => (
              <Link key={property.path} to={property.path} className="property-card">
                <div className="property-header">
                  <h3 className="property-title">{property.title}</h3>
                  <div className="property-meta">
                    <span className="property-category">
                      {categories.find(cat => cat.id === property.category)?.icon}
                    </span>
                    <span className={`difficulty-badge ${property.difficulty}`}>
                      {property.difficulty === 'beginner' ? '🟢' : 
                       property.difficulty === 'intermediate' ? '🟡' : '🔴'}
                    </span>
                  </div>
                </div>
                <p className="property-description">{property.description}</p>
                <div className="property-tags">
                  {property.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="property-tag">{tag}</span>
                  ))}
                </div>
                <div className="property-footer">
                  <span className="property-name">{property.name}</span>
                  <div className="property-features">
                    {property.examples.length > 0 && <span className="feature">💡</span>}
                    {property.taskDescription && <span className="feature">🎯</span>}
                  </div>
                  <span className="property-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
          
          {searchResults.length === 0 && (
            <div className="no-results">
              <h3>😕 Ничего не найдено</h3>
              <p>Попробуйте изменить поисковый запрос или выбранную категорию</p>
              <button onClick={resetAll} className="reset-search-btn">
                Сбросить поиск
              </button>
            </div>
          )}
        </section>

        <section className="catalog-section">
          <div className="catalog-stats">
            <div className="stat-item">
              <span className="stat-number">{searchStats.total}</span>
              <span className="stat-label">Всего свойств</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{searchStats.categories}</span>
              <span className="stat-label">Категорий</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{searchStats.found}</span>
              <span className="stat-label">Найдено</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{searchStats.difficulties}</span>
              <span className="stat-label">Уровней сложности</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CatalogPage;
