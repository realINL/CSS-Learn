export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  properties: string[]; // IDs свойств
  order: number;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'color',
    name: 'Цвет',
    icon: '🎨',
    description: 'Свойства для работы с цветами и фонами',
    properties: ['color', 'background', 'background-image', 'background-position'],
    order: 1,
    color: '#667eea'
  },
  {
    id: 'text',
    name: 'Текст',
    icon: '📝',
    description: 'Свойства для форматирования и стилизации текста',
    properties: ['font-family', 'font-size', 'font-weight', 'text-align'],
    order: 2,
    color: '#764ba2'
  },
  {
    id: 'position',
    name: 'Позиционирование',
    icon: '📍',
    description: 'Свойства для управления размерами и позиционированием элементов',
    properties: ['margin', 'padding', 'width', 'height'],
    order: 3,
    color: '#f093fb'
  },
  {
    id: 'layout',
    name: 'Макет',
    icon: '📐',
    description: 'Свойства для создания сложных макетов',
    properties: [], // Пока пусто, для будущих свойств
    order: 4,
    color: '#4facfe'
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getAllCategories = (): Category[] => {
  return categories.sort((a, b) => a.order - b.order);
};

export const getCategoriesWithProperties = (): Category[] => {
  return categories.filter(category => category.properties.length > 0);
};
