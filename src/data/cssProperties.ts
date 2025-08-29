export interface BrowserSupport {
  chrome: 'full' | 'partial' | 'none' | string;
  firefox: 'full' | 'partial' | 'none' | string;
  safari: 'full' | 'partial' | 'none' | string;
  edge: 'full' | 'partial' | 'none' | string;
  ie?: 'full' | 'partial' | 'none' | string;
}

export interface PropertyExample {
  title: string;
  code: string;
  description: string;
}

export interface CSSProperty {
  id: string;
  name: string;
  title: string;
  description: string;
  path: string;
  category: 'color' | 'text' | 'position' | 'layout';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  browserSupport: BrowserSupport;
  examples: PropertyExample[];
  relatedProperties: string[];
  taskDescription?: string;
  taskSolution?: string;
}

export const cssProperties: CSSProperty[] = [

  {
    id: 'color',
    name: 'color',
    title: '🎨 Color',
    description: 'Управляет цветом текста элемента',
    path: '/color',
    category: 'color',
    tags: ['color', 'цвет', 'текст', 'колор'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Именованные цвета',
        code: 'color: red;',
        description: 'Использование предопределенных цветов'
      },
      {
        title: 'HEX цвета',
        code: 'color: #ff0000;',
        description: 'Шестнадцатеричные значения цветов'
      },
      {
        title: 'RGB',
        code: 'color: rgb(255, 0, 0);',
        description: 'RGB формат цвета'
      }
    ],
    relatedProperties: ['background-color', 'border-color'],
    taskDescription: 'Сделай текст зеленым с помощью color.',
    taskSolution: 'color: green;'
  },
  {
    id: 'background',
    name: 'background',
    title: '🌈 Background',
    description: 'Устанавливает цвет фона элемента',
    path: '/background',
    category: 'color',
    tags: ['background', 'фон', 'цвет'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Цвет фона',
        code: 'background: blue;',
        description: 'Простой цвет фона'
      },
      {
        title: 'Градиент',
        code: 'background: linear-gradient(45deg, #667eea, #764ba2);',
        description: 'Градиентный фон'
      }
    ],
    relatedProperties: ['background-color', 'background-image', 'background-position']
  },
  {
    id: 'background-position',
    name: 'background-position',
    title: '🎯 Background-position',
    description: 'Контролирует позицию фонового изображения',
    path: '/background-position',
    category: 'color',
    tags: ['background-position', 'позиция', 'фон', 'изображение'],
    difficulty: 'intermediate',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Ключевые слова',
        code: 'background-position: center;',
        description: 'Позиционирование по ключевым словам'
      },
      {
        title: 'Точные значения',
        code: 'background-position: 20px 40px;',
        description: 'Позиционирование в пикселях'
      }
    ],
    relatedProperties: ['background', 'background-image', 'background-size'],
    taskDescription: 'Прижми фон к правому нижнему углу блока с помощью background-position.',
    taskSolution: 'background-position: right bottom;'
  },
  {
    id: 'background-image',
    name: 'background-image',
    title: '🖼️ Background-image',
    description: 'Добавляет изображение в качестве фона',
    path: '/background-image',
    category: 'color',
    tags: ['background-image', 'картинка', 'изображение', 'фон'],
    difficulty: 'intermediate',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'URL изображения',
        code: 'background-image: url("image.jpg");',
        description: 'Фоновое изображение по URL'
      },
      {
        title: 'Градиент',
        code: 'background-image: linear-gradient(45deg, #667eea, #764ba2);',
        description: 'Градиент как фоновое изображение'
      }
    ],
    relatedProperties: ['background', 'background-position', 'background-size']
  },
  
  // Text properties
  {
    id: 'font-family',
    name: 'font-family',
    title: '🔤 Font-family',
    description: 'Выбирает шрифт для отображения текста',
    path: '/font-family',
    category: 'text',
    tags: ['font-family', 'шрифт', 'семейство', 'текст'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Системные шрифты',
        code: 'font-family: Arial, sans-serif;',
        description: 'Использование системных шрифтов'
      },
      {
        title: 'Google Fonts',
        code: 'font-family: "Roboto", sans-serif;',
        description: 'Веб-шрифты'
      }
    ],
    relatedProperties: ['font-size', 'font-weight', 'font-style'],
    taskDescription: 'Задай для текста шрифт Georgia с запасным вариантом serif.',
    taskSolution: 'font-family: Georgia, serif;'
  },
  {
    id: 'font-size',
    name: 'font-size',
    title: '✍️ Font-size',
    description: 'Устанавливает размер шрифта текста',
    path: '/font-size',
    category: 'text',
    tags: ['font-size', 'размер', 'текст', 'шрифт'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Пиксели',
        code: 'font-size: 16px;',
        description: 'Размер в пикселях'
      },
      {
        title: 'Относительные единицы',
        code: 'font-size: 1.2rem;',
        description: 'Размер относительно корневого элемента'
      }
    ],
    relatedProperties: ['font-family', 'font-weight', 'line-height'],
    taskDescription: 'Сделай размер шрифта больше 20px с помощью font-size.',
    taskSolution: 'font-size: 24px;'
  },
  {
    id: 'font-weight',
    name: 'font-weight',
    title: '💪 Font-weight',
    description: 'Контролирует толщину шрифта',
    path: '/font-weight',
    category: 'text',
    tags: ['font-weight', 'толщина', 'жирность', 'текст'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Ключевые слова',
        code: 'font-weight: bold;',
        description: 'Жирный шрифт'
      },
      {
        title: 'Числовые значения',
        code: 'font-weight: 700;',
        description: 'Толщина от 100 до 900'
      }
    ],
    relatedProperties: ['font-family', 'font-size', 'font-style'],
    taskDescription: 'Сделай текст жирным с помощью font-weight.',
    taskSolution: 'font-weight: bold;'
  },
  {
    id: 'text-align',
    name: 'text-align',
    title: '📝 Text-align',
    description: 'Выравнивает текст по горизонтали',
    path: '/text-align',
    category: 'text',
    tags: ['text-align', 'выравнивание', 'текст', 'центр'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'По центру',
        code: 'text-align: center;',
        description: 'Центрирование текста'
      },
      {
        title: 'По ширине',
        code: 'text-align: justify;',
        description: 'Выравнивание по ширине'
      }
    ],
    relatedProperties: ['vertical-align', 'line-height'],
    taskDescription: 'Выровняй текст по центру с помощью text-align.',
    taskSolution: 'text-align: center;'
  },
  
  // Positioning properties
  {
    id: 'margin',
    name: 'margin',
    title: '📏 Margin',
    description: 'Устанавливает внешние отступы элемента',
    path: '/margin',
    category: 'position',
    tags: ['margin', 'отступ', 'внешний', 'позиционирование'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Все стороны',
        code: 'margin: 20px;',
        description: 'Одинаковые отступы со всех сторон'
      },
      {
        title: 'Отдельные стороны',
        code: 'margin: 10px 20px 15px 5px;',
        description: 'Разные отступы для каждой стороны'
      }
    ],
    relatedProperties: ['padding', 'border', 'width']
  },
  {
    id: 'padding',
    name: 'padding',
    title: '📐 Padding',
    description: 'Устанавливает внутренние отступы элемента',
    path: '/padding',
    category: 'position',
    tags: ['padding', 'отступ', 'внутренний', 'позиционирование'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Все стороны',
        code: 'padding: 15px;',
        description: 'Одинаковые внутренние отступы'
      },
      {
        title: 'Вертикально и горизонтально',
        code: 'padding: 10px 20px;',
        description: 'Разные отступы по вертикали и горизонтали'
      }
    ],
    relatedProperties: ['margin', 'border', 'width']
  },
  {
    id: 'width',
    name: 'width',
    title: '↔️ Width',
    description: 'Задает ширину элемента',
    path: '/width',
    category: 'position',
    tags: ['width', 'ширина', 'размер', 'позиционирование'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Фиксированная ширина',
        code: 'width: 300px;',
        description: 'Ширина в пикселях'
      },
      {
        title: 'Процентная ширина',
        code: 'width: 50%;',
        description: 'Ширина в процентах от родителя'
      }
    ],
    relatedProperties: ['height', 'max-width', 'min-width']
  },
  {
    id: 'height',
    name: 'height',
    title: '↕️ Height',
    description: 'Задает высоту элемента',
    path: '/height',
    category: 'position',
    tags: ['height', 'высота', 'размер', 'позиционирование'],
    difficulty: 'beginner',
    browserSupport: {
      chrome: 'full',
      firefox: 'full',
      safari: 'full',
      edge: 'full',
      ie: 'full'
    },
    examples: [
      {
        title: 'Фиксированная высота',
        code: 'height: 200px;',
        description: 'Высота в пикселях'
      },
      {
        title: 'Высота viewport',
        code: 'height: 100vh;',
        description: 'Высота в единицах viewport'
      }
    ],
    relatedProperties: ['width', 'max-height', 'min-height']
  }
];

export const getPropertyById = (id: string): CSSProperty | undefined => {
  return cssProperties.find(property => property.id === id);
};

export const getPropertiesByCategory = (category: string): CSSProperty[] => {
  return cssProperties.filter(property => property.category === category);
};

export const getAllProperties = (): CSSProperty[] => {
  return cssProperties;
};
