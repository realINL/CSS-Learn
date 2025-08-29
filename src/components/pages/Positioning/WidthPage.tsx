import { useRef, useState, useEffect } from 'react';
import './WidthPage.css';
import '../../../styles/shared.css'
import CodeEditor from '../../CodeEditor';
import BrowserSupport from '../../BrowserSupport';

const WidthPage = () => {
  const [cssCode, setCssCode] = useState<string>('width: 100px;');
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
    const defaultCss = 'width: 100px;';
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
    const width = computed.width;
    if (width === '200px') {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'width: 200px;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="width-page-container">
      <header className="width-page-header">
        <h1 className="width-title">CSS Width</h1>
        <p>Свойство для задания ширины элемента</p>
      </header>

      <main className="width-content">
        <section className="width-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>width: значение;</code>
          </div>
        </section>

        <section className="width-section">
          <h2>Описание</h2>
          <p>
            <strong>width</strong> — это «горизонтальная линейка» для вашего элемента. 
            С помощью этого свойства вы регулируете, насколько широкий будет блок: 
            фиксированное значение в <code>px</code>, относительное в <code>%</code> от родителя 
            или гибкое с помощью <code>vw</code> (проценты от ширины окна).
          </p>
          <p>
            Можно использовать специальные значения: <code>auto</code> (по содержимому/контексту), 
            <code>min-content</code>, <code>max-content</code>, <code>fit-content</code>. 
            А ещё есть ограничения: <code>min-width</code> и <code>max-width</code>, 
            чтобы не дать элементу стать слишком узким или слишком широким.
          </p>
        </section>

        <section className="width-section">
          <h2>Примеры</h2>
          <div className="example-block">
            <h3>Базовые значения</h3>
            <div className="width-examples">
              <div className="width-example w-100">width: 100px;</div>
              <div className="width-example w-200">width: 200px;</div>
              <div className="width-example w-50p">width: 50%;</div>
              <div className="width-example w-30vw">width: 30vw;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Специальные значения</h3>
            <div className="width-examples">
              <div className="width-example w-auto">width: auto;</div>
              <div className="width-example w-min">width: min-content;</div>
              <div className="width-example w-max">width: max-content;</div>
              <div className="width-example w-fit">width: fit-content(200px);</div>
            </div>
          </div>
        </section>

        <section className="width-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'width: 100px;'}
              title={'CSS редактор'}
            />
            <div className="demo-container">
              <div className="demo-box" ref={demoRef}>
                Этот блок меняет свою ширину
              </div>
            </div>
          </div>
        </section>

        <section className="width-section task-card">
          <h2>Задание</h2>
          <p>Сделай ширину блока ровно 200px с помощью width.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Ширина ровно 200px.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй: width: 200px;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>width: 200px;</code></div>
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

export default WidthPage;
