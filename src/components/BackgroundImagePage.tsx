import { useRef, useState, useEffect } from 'react';
import './BackgroundImagePage.css';
import CodeEditor from './CodeEditor';
import BrowserSupport from './BrowserSupport';

const BackgroundImagePage = () => {
  const [cssCode, setCssCode] = useState(`background-image: url('https://picsum.photos/400/300');
background-size: cover;
background-repeat: no-repeat;`);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (demoRef.current) {
      demoRef.current.style.cssText = cssCode;
    }
  }, [cssCode]);

  const applyCss = () => {
    if (demoRef.current) {
      demoRef.current.style.cssText = cssCode;
    }
  };

  const resetCss = () => {
    const defaultCss = `background-image: url('https://picsum.photos/400/300');
background-size: cover;
background-repeat: no-repeat;`;
    setCssCode(defaultCss);
    if (demoRef.current) {
      demoRef.current.style.cssText = defaultCss;
    }
  };

  return (
    <div className="background-image-page-container">
      <header className="background-image-page-header">
        <h1>🖼️ Background-image</h1>
        <p>Добавляет изображение в качестве фона элемента</p>
      </header>

      <main className="background-image-page-content">
        <section className="background-image-page-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>background-image: url('путь_к_изображению');</code>
          </div>
        </section>

        <section className="background-image-page-section">
          <h2>Описание</h2>
          <p>
            Свойство <code>background-image</code> позволяет установить изображение в качестве фона элемента. 
            Это одно из самых популярных CSS свойств для создания красивых и привлекательных веб-страниц.
          </p>
          <p>
            Изображение может быть указано через URL, градиент или даже несколько изображений одновременно. 
            Часто используется вместе с другими свойствами фона для полного контроля над отображением.
          </p>
        </section>

        <section className="background-image-page-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>URL изображения</h3>
            <div className="code-block">
              <code>background-image: url('image.jpg');</code>
            </div>
            <p>Устанавливает изображение по указанному URL</p>
          </div>

          <div className="example-block">
            <h3>Градиент</h3>
            <div className="code-block">
              <code>background-image: linear-gradient(45deg, #667eea, #764ba2);</code>
            </div>
            <p>Создает градиентный фон вместо изображения</p>
          </div>

          <div className="example-block">
            <h3>Несколько изображений</h3>
            <div className="code-block">
              <code>background-image: url('pattern.png'), url('main-bg.jpg');</code>
            </div>
            <p>Наложение нескольких изображений друг на друга</p>
          </div>
        </section>

        <section className="background-image-page-section">
          <h2>Интерактивный пример</h2>
          <div className="demo-block">
            <div className="demo-element" ref={demoRef}>
              <span className="example-text">Этот блок имеет фоновое изображение</span>
            </div>
            <CodeEditor 
              value={cssCode} 
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              placeholder="Введите CSS код..."
            />
          </div>
        </section>

        <section className="background-image-page-section">
          <h2>Задание</h2>
          <div className="task-card">
            <p>Попробуйте изменить фоновое изображение на градиент с помощью <code>linear-gradient</code></p>
            <div className="task-hint">
              💡 Подсказка: Используйте <code>linear-gradient(to right, #ff6b6b, #4ecdc4)</code>
            </div>
          </div>
        </section>

        <section className="background-image-page-section">
          <h2>Поддержка браузеров</h2>
          <BrowserSupport support={{
            chrome: 'Полная поддержка',
            firefox: 'Полная поддержка',
            safari: 'Полная поддержка',
            edge: 'Полная поддержка'
          }} />
        </section>
      </main>
    </div>
  );
};

export default BackgroundImagePage;
