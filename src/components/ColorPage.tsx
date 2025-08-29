import { useRef, useState, useEffect } from 'react';
import './ColorPage.css';
import CodeEditor from './CodeEditor';
import BrowserSupport from './BrowserSupport';

const ColorPage = () => {
  const [cssCode, setCssCode] = useState<string>('color: #667eea;');
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
    const defaultCss = 'color: #667eea;';
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
    const color = computed.color.trim().toLowerCase();

    if (color === 'rgb(0, 128, 0)' || color === 'rgba(0, 128, 0, 1)') {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'color: green;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }

  };

  return (
    <div className="color-page-container">
      <header className="color-page-header">
        <h1 className="color-title">CSS Color</h1>
        <p>Свойство для изменения цвета текста</p>
      </header>
      
      <main className="color-content">
        <section className="color-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>color: значение;</code>
          </div>
        </section>

        <section className="color-section">
          <h2>Описание</h2>
          <p>
            <strong>color</strong> — это «кисть» для вашего текста. С её помощью вы задаёте,
            каким цветом он будет отображаться: классическим чёрным, фирменным оттенком
            бренда или ярко-зелёным для акцента. Работает со всеми обычными способами
            задания цвета: именами (<code>red</code>, <code>green</code>), HEX
            (<code>#1e90ff</code>), RGB/RGBA (<code>rgb(30,144,255)</code>), HSL/HSLA.
          </p>
          <p>
            Частая практика — использовать переменные или палитры, чтобы цвета были
            единообразными по всему проекту. А для доступности следите, чтобы контраст
            текста и фона был достаточно высоким — так ваш интерфейс будет удобен всем.
          </p>
        </section>

        <section className="color-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>Именованные цвета</h3>
            <div className="color-examples">
              <div className="color-example red">color: red;</div>
              <div className="color-example blue">color: blue;</div>
              <div className="color-example green">color: green;</div>
              <div className="color-example purple">color: purple;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>HEX цвета</h3>
            <div className="color-examples">
              <div className="color-example hex-red">color: #ff0000;</div>
              <div className="color-example hex-blue">color: #0066cc;</div>
              <div className="color-example hex-green">color: #00aa00;</div>
              <div className="color-example hex-purple">color: #9933cc;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>RGB/RGBA</h3>
            <div className="color-examples">
              <div className="color-example rgb-red">color: rgb(255, 0, 0);</div>
              <div className="color-example rgba-blue">color: rgba(0, 102, 204, 0.8);</div>
              <div className="color-example rgb-green">color: rgb(0, 170, 0);</div>
              <div className="color-example rgba-purple">color: rgba(153, 51, 204, 0.6);</div>
            </div>
          </div>
        </section>

        <section className="color-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'color: #667eea;'}
              title={'CSS редактор'}
            />
            <div className="demo-text" ref={demoRef}>
              Этот текст изменит свой стиль в соответствии с вашим CSS.
            </div>
          </div>
        </section>

        <section className="color-section task-card">
          <h2>Задание</h2>
          <p>Сделай текст зеленым с помощью color.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Текст стал зеленым.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй сделать текст зеленым: color: green;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>color: green;</code></div>
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

export default ColorPage;
