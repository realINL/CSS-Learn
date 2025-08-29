import { useRef, useState, useEffect } from 'react';
import './HeightPage.css';
import CodeEditor from '../../CodeEditor';
import BrowserSupport from '../../BrowserSupport';

const HeightPage = () => {
  const [cssCode, setCssCode] = useState<string>('height: 100px;');
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
    const defaultCss = 'height: 100px;';
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
    const height = computed.height;
    if (height === '150px') {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'height: 150px;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="height-page-container">
      <header className="height-page-header">
        <h1 className="height-title">CSS Height</h1>
        <p>Свойство для задания высоты элемента</p>
      </header>

      <main className="height-content">
        <section className="height-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>height: значение;</code>
          </div>
        </section>

        <section className="height-section">
          <h2>Описание</h2>
          <p>
            <strong>height</strong> — это «вертикальная линейка» для вашего элемента. 
            С его помощью вы задаёте, насколько высоким будет блок: фиксированное значение 
            в <code>px</code>, относительное в <code>%</code> от высоты родителя, или гибкое 
            с помощью <code>vh</code> — проценты от высоты окна.
          </p>
          <p>
            Специальные значения: <code>auto</code> (по содержимому), 
            <code>min-content</code>, <code>max-content</code>, <code>fit-content</code>. 
            Ограничения: <code>min-height</code> и <code>max-height</code>, чтобы не дать 
            блоку стать слишком низким или слишком высоким.
          </p>
        </section>

        <section className="height-section">
          <h2>Примеры</h2>
          <div className="example-block">
            <h3>Базовые значения</h3>
            <div className="height-examples">
              <div className="height-example h-80">height: 80px;</div>
              <div className="height-example h-100">height: 100px;</div>
              <div className="height-example h-150">height: 150px;</div>
              <div className="height-example h-20vh">height: 20vh;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Специальные значения</h3>
            <div className="height-examples">
              <div className="height-example h-auto">height: auto;</div>
              <div className="height-example h-min">height: min-content;</div>
              <div className="height-example h-max">height: max-content;</div>
              <div className="height-example h-fit">height: fit-content(150px);</div>
            </div>
          </div>
        </section>

        <section className="height-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'height: 100px;'}
              title={'CSS редактор'}
            />
            <div className="demo-container">
              <div className="demo-box" ref={demoRef}>
                Этот блок меняет свою высоту
              </div>
            </div>
          </div>
        </section>

        <section className="height-section task-card">
          <h2>Задание</h2>
          <p>Сделай высоту блока ровно 150px с помощью height.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Высота ровно 150px.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй: height: 150px;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>height: 150px;</code></div>
          )}
        </section>

        <BrowserSupport
          support={{
            chrome: 'Полная поддержка',
            firefox: 'Полная поддержка',
            safari: 'Полная поддержка',
            edge: 'Полная поддержка',
            ie: 'Полная поддержка',
          }}
        />
      </main>
    </div>
  );
};

export default HeightPage;
