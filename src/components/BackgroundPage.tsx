import { useRef, useState, useEffect } from 'react';
import './BackgroundPage.css';
import CodeEditor from './CodeEditor';
import BrowserSupport from './BrowserSupport';

const BackgroundPage = () => {
  const [cssCode, setCssCode] = useState<string>('background-color: #667eea;');
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
    const defaultCss = 'background-color: #667eea;';
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
    const backgroundColor = computed.backgroundColor.trim().toLowerCase();

    if (backgroundColor === 'rgb(255, 0, 0)' || backgroundColor === 'rgba(255, 0, 0, 1)') {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'background-color: red;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="background-page-container">
      <header className="background-page-header">
        <h1 className="background-title">CSS Background-color</h1>
        <p>Свойство для изменения цвета фона элементов</p>
      </header>
      
      <main className="background-content">
        <section className="background-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>background-color: значение;</code>
          </div>
        </section>

        <section className="background-section">
          <h2>Описание</h2>
          <p>
            <strong>background-color</strong> — это «краска» для фона вашего элемента. 
            Пока <code>color</code> красит текст, <code>background-color</code> заливает 
            всю область элемента выбранным цветом. Отлично подходит для создания 
            цветных блоков, выделения важной информации или просто для красоты.
          </p>
          <p>
            Работает со всеми форматами цвета: именами (<code>red</code>, <code>blue</code>), 
            HEX (<code>#1e90ff</code>), RGB/RGBA (<code>rgb(30,144,255)</code>), 
            HSL/HSLA и даже с ключевым словом <code>transparent</code> для прозрачности. 
            Часто используется вместе с <code>color</code> для создания контрастных 
            цветовых схем.
          </p>
        </section>

        <section className="background-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>Именованные цвета</h3>
            <div className="background-examples">
              <div className="background-example red-bg">background-color: red;</div>
              <div className="background-example blue-bg">background-color: blue;</div>
              <div className="background-example green-bg">background-color: green;</div>
              <div className="background-example yellow-bg">background-color: yellow;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>HEX цвета</h3>
            <div className="background-examples">
              <div className="background-example hex-red-bg">background-color: #ff0000;</div>
              <div className="background-example hex-blue-bg">background-color: #0066cc;</div>
              <div className="background-example hex-green-bg">background-color: #00aa00;</div>
              <div className="background-example hex-orange-bg">background-color: #ff6600;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>RGB/RGBA</h3>
            <div className="background-examples">
              <div className="background-example rgb-red-bg">background-color: rgb(255, 0, 0);</div>
              <div className="background-example rgba-blue-bg">background-color: rgba(0, 102, 204, 0.8);</div>
              <div className="background-example rgb-green-bg">background-color: rgb(0, 170, 0);</div>
              <div className="background-example rgba-purple-bg">background-color: rgba(128, 0, 128, 0.6);</div>
            </div>
          </div>
        </section>

        <section className="background-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'background-color: #667eea;'}
              title={'CSS редактор'}
            />
            <div className="demo-text" ref={demoRef}>
              Этот блок изменит свой фон в соответствии с вашим CSS.
            </div>
          </div>
        </section>

        <section className="background-section task-card">
          <h2>Задание</h2>
          <p>Сделай фон блока красным с помощью background-color.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Фон стал красным.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй сделать фон красным: background-color: red;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>background-color: red;</code></div>
          )}
        </section>

        <BrowserSupport 
          support={{
            chrome: "Полная поддержка",
            firefox: "Полная поддержка", 
            safari: "Полная поддержка",
            edge: "Полная поддержка",
            ie: "Полная поддержка"
          }}
        />
      </main>
    </div>
  );
};

export default BackgroundPage;
