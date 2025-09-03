import { useRef, useState, useEffect } from 'react';
import './BackgroundImagePage.css';
import CodeEditor from './CodeEditor';
import BrowserSupport from './BrowserSupport';

const BackgroundImagePage = () => {
  const [cssCode, setCssCode] = useState<string>('background-image: url("https://picsum.photos/400/300");\nbackground-size: cover;\nbackground-repeat: no-repeat;');
  const [error, setError] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const demoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (taskStatus !== 'idle') setTaskStatus('idle');
  }, [cssCode]);

  const applyCss = () => {
    setError('');
    try {
      if (demoRef.current) {
        demoRef.current.style.cssText = cssCode;
      }
    } catch (e) {
      setError('Неверный CSS. Проверьте синтаксис.');
    }
  };

  const resetCss = () => {
    const defaultCss = 'background-image: url("https://picsum.photos/400/300");\nbackground-size: cover;\nbackground-repeat: no-repeat;';
    setCssCode(defaultCss);
    if (demoRef.current) {
      demoRef.current.style.cssText = defaultCss;
    }
    setError('');
    setTaskStatus('idle');
    setShowSolution(false);
  };

  const checkTask = () => {
    if (!demoRef.current) return;
    const computed = window.getComputedStyle(demoRef.current);
    const backgroundImage = computed.backgroundImage;
    
    if (backgroundImage.includes('linear-gradient')) {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'background-image: linear-gradient(to right, green, blue);';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="background-image-page-container">
      <header className="background-image-page-header">
        <h1 className="background-image-title">CSS Background-image</h1>
        <p>Свойство для добавления изображений в качестве фона элементов</p>
      </header>
      
      <main className="background-image-content">
        <section className="background-image-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>background-image: url("путь_к_изображению");</code>
          </div>
        </section>

        <section className="background-image-section">
          <h2>Описание</h2>
          <p>
            <strong>background-image</strong> — это свойство, которое позволяет установить изображение 
            в качестве фона элемента. Это одно из самых популярных CSS свойств для создания 
            красивых и привлекательных веб-страниц.
          </p>
          <p>
            Изображение может быть указано через URL, градиент или даже несколько изображений одновременно. 
            Часто используется вместе с другими свойствами фона для полного контроля над отображением.
          </p>
        </section>

        <section className="background-image-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>URL изображения</h3>
            <div className="background-image-examples">
              <div className="background-image-example image-bg">
                <span>background-image: url("image.jpg");<br />background-size: contain;</span>
              </div>
              <div className="background-image-example pattern-bg">
                <span>background-image: url("image.png");<br />background-size: contain;</span>
              </div>
            </div>
          </div>

          <div className="example-block">
            <h3>Градиенты</h3>
            <div className="background-image-examples">
              <div className="background-image-example linear-gradient-bg">
                <span>linear-gradient(45deg, #667eea, #764ba2)</span>
              </div>
              <div className="background-image-example radial-gradient-bg">
                <span>radial-gradient(circle, #f9ca24, #e056fd)</span>
              </div>
            </div>
          </div>

          <div className="example-block">
            <h3>Несколько изображений</h3>
            <div className="code-block">
              <code>background-image: url("pattern.png"), url("main-bg.jpg");</code>
            </div>
            <p>Наложение нескольких изображений друг на друга</p>
          </div>
        </section>

        <section className="background-image-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'background-image: url("https://picsum.photos/400/300");\nbackground-size: cover;\nbackground-repeat: no-repeat;'}
              title={'CSS редактор'}
            />
            <div className="demo-text" ref={demoRef}>
              Этот блок имеет фоновое изображение
            </div>
          </div>
        </section>

        <section className="background-image-section task-card">
          <h2>Задание</h2>
          <p>Попробуйте изменить фоновое изображение на градиент с помощью <code>linear-gradient</code></p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Отлично! Вы создали градиентный фон.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуйте использовать linear-gradient</div>
          )}
          {showSolution && (
            <div className="code-block solution-block">
              <code>background-image: linear-gradient(to right, green, blue);</code>
            </div>
          )}
        </section>

        <section className="background-image-section">
          <h2>Поддержка браузеров</h2>
          <BrowserSupport 
            support={{
              chrome: "Полная поддержка",
              firefox: "Полная поддержка", 
              safari: "Полная поддержка",
              edge: "Полная поддержка",
              ie: "Полная поддержка"
            }}
          />
        </section>
      </main>
    </div>
  );
};

export default BackgroundImagePage;
