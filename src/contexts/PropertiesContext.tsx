import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { getAllProperties } from '../data/cssProperties';
import type { CSSProperty } from '../data/cssProperties';
import { getAllCategories } from '../data/categories';
import type { Category } from '../data/categories';

interface PropertiesContextType {
  properties: CSSProperty[];
  categories: Category[];
  getPropertyById: (id: string) => CSSProperty | undefined;
  getPropertiesByCategory: (category: string) => CSSProperty[];
  getCategoryById: (id: string) => Category | undefined;
  getPropertiesByDifficulty: (difficulty: string) => CSSProperty[];
  getRelatedProperties: (propertyId: string) => CSSProperty[];
  searchProperties: (query: string) => CSSProperty[];
}

const PropertiesContext = createContext<PropertiesContextType | null>(null);

interface PropertiesProviderProps {
  children: ReactNode;
}

export const PropertiesProvider: React.FC<PropertiesProviderProps> = ({ children }) => {
  const properties = getAllProperties();
  const categories = getAllCategories();

  const getPropertyById = (id: string): CSSProperty | undefined => {
    return properties.find(property => property.id === id);
  };

  const getPropertiesByCategory = (category: string): CSSProperty[] => {
    return properties.filter(property => property.category === category);
  };

  const getCategoryById = (id: string): Category | undefined => {
    return categories.find(category => category.id === id);
  };

  const getPropertiesByDifficulty = (difficulty: string): CSSProperty[] => {
    return properties.filter(property => property.difficulty === difficulty);
  };

  const getRelatedProperties = (propertyId: string): CSSProperty[] => {
    const property = getPropertyById(propertyId);
    if (!property) return [];
    
    return properties.filter(p => 
      property.relatedProperties.includes(p.id)
    );
  };

  const searchProperties = (query: string): CSSProperty[] => {
    const lowerQuery = query.toLowerCase();
    return properties.filter(property => 
      property.name.toLowerCase().includes(lowerQuery) ||
      property.description.toLowerCase().includes(lowerQuery) ||
      property.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      property.title.toLowerCase().includes(lowerQuery)
    );
  };

  const value: PropertiesContextType = {
    properties,
    categories,
    getPropertyById,
    getPropertiesByCategory,
    getCategoryById,
    getPropertiesByDifficulty,
    getRelatedProperties,
    searchProperties
  };

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = (): PropertiesContextType => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};
