import { useState, useMemo } from 'react';
import type { CSSProperty } from '../data/cssProperties';

export interface SearchFilters {
  category: string;
  difficulty: string;
  hasExamples: boolean;
  hasTask: boolean;
}

export const usePropertySearch = (properties: CSSProperty[]) => {
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    difficulty: 'all',
    hasExamples: false,
    hasTask: false
  });

  const searchResults = useMemo(() => {
    return properties.filter(property => {
      // Поиск по запросу
      const matchesQuery = query === '' || 
        property.name.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase()) ||
        property.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        property.title.toLowerCase().includes(query.toLowerCase());
      
      // Фильтр по категории
      const matchesCategory = filters.category === 'all' || 
        property.category === filters.category;
      
      // Фильтр по сложности
      const matchesDifficulty = filters.difficulty === 'all' || 
        property.difficulty === filters.difficulty;
      
      // Фильтр по наличию примеров
      const matchesExamples = !filters.hasExamples || 
        property.examples.length > 0;
      
      // Фильтр по наличию задания
      const matchesTask = !filters.hasTask || 
        (property.taskDescription && property.taskSolution);
      
      return matchesQuery && matchesCategory && matchesDifficulty && 
             matchesExamples && matchesTask;
    });
  }, [properties, query, filters]);

  const updateFilter = (key: keyof SearchFilters, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      difficulty: 'all',
      hasExamples: false,
      hasTask: false
    });
  };

  const clearSearch = () => {
    setQuery('');
  };

  const resetAll = () => {
    setQuery('');
    clearFilters();
  };

  // Статистика поиска
  const searchStats = useMemo(() => {
    const total = properties.length;
    const found = searchResults.length;
    const categories = [...new Set(properties.map(p => p.category))].length;
    const difficulties = [...new Set(properties.map(p => p.difficulty))].length;

    return {
      total,
      found,
      categories,
      difficulties,
      hasQuery: query.length > 0,
      hasFilters: Object.values(filters).some(v => v !== 'all' && v !== false)
    };
  }, [properties, searchResults, query, filters]);

  return {
    // Состояние
    query,
    filters,
    searchResults,
    searchStats,
    
    // Действия
    setQuery,
    updateFilter,
    clearFilters,
    clearSearch,
    resetAll
  };
};
