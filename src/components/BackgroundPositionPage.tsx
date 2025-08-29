import { useEffect, useRef, useState } from 'react';
import './BackgroundPositionPage.css';
import CodeEditor from './CodeEditor';
import BrowserSupport from './BrowserSupport';

const BackgroundPositionPage = () => {
  const [cssCode, setCssCode] = useState<string>('background-position: center;');
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
        demoRef.current.style.cssText += `; ${cssCode}`;
      }
    } catch (e) {
      setError('Неверный CSS. Проверьте синтаксис.');
    }
  };

  const resetCss = () => {
    const defaultCss = 'background-position: center;';
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
    const pos = `${computed.backgroundPositionX} ${computed.backgroundPositionY}`.toLowerCase();
    if (pos.includes('right') && pos.includes('bottom')) {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'background-position: right bottom;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText += `; ${solution}`;
    }
  };

  return (
    <div className="background-position-page-container">
      <header className="background-position-page-header">
        <h1 className="background-position-title">CSS Background-position</h1>
        <p>Контролируй, где именно будет «лежать» фон внутри блока</p>
      </header>

      <main className="background-position-content">
        <section className="background-position-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>background-position: x y | ключевые-слова;</code>
          </div>
        </section>

        <section className="background-position-section">
          <h2>Описание</h2>
          <p>
            <strong>background-position</strong> — это как «указать пальцем», где именно должен находиться фон.
            Можно ставить его по ключевым словам (<code>left</code>, <code>center</code>, <code>right</code>,
            <code>top</code>, <code>bottom</code>) или точными значениями (<code>px</code>, <code>%</code>).
          </p>
          <p>
            Например, <code>right bottom</code> прижмёт картинку к правому нижнему углу, а <code>20px 40px</code>
            сместит фон на 20 пикселей вправо и 40 вниз от верхнего левого угла.
          </p>
          <p>
            Часто используется вместе с <code>background-size</code> и <code>background-repeat</code>, чтобы фон
            выглядел аккуратно и был на своём месте.
          </p>
        </section>

        <section className="background-position-section">
          <h2>Примеры</h2>
          <div className="example-block">
            <h3>Ключевые слова</h3>
            <div className="background-position-examples">
              <div className="background-position-example ex-left-top"><span className="example-text">left top</span></div>
              <div className="background-position-example ex-center"><span className="example-text">center</span></div>
              <div className="background-position-example ex-right-bottom"><span className="example-text">right bottom</span></div>
            </div>
          </div>

          <div className="example-block">
            <h3>Точные значения</h3>
            <div className="background-position-examples">
              <div className="background-position-example ex-20-40"><span className="example-text">20px 40px</span></div>
              <div className="background-position-example ex-50p-50p"><span className="example-text">50% 50%</span></div>
              <div className="background-position-example ex-100p-0"><span className="example-text">100% 0%</span></div>
            </div>
          </div>
        </section>

        <section className="background-position-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'background-position: right bottom;'}
              title={'CSS редактор'}
            />
            <div
              className="bgpos-demo"
              ref={demoRef}
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '200px 200px',
                backgroundPosition: 'center'
              }}
            >
            </div>
          </div>
        </section>

        <section className="background-position-section task-card">
          <h2>Задание</h2>
          <p>Прижми фон к правому нижнему углу блока с помощью background-position.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Отлично! Фон стоит в правом нижнем углу.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока нет. Попробуй: background-position: right bottom;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>background-position: right bottom;</code></div>
          )}
        </section>

        <BrowserSupport
          support={{
            chrome: 'Полная поддержка',
            firefox: 'Полная поддержка',
            safari: 'Полная поддержка',
            edge: 'Полная поддержка',
            ie: 'Полная поддержка'
          }}
        />
      </main>
    </div>
  );
};

export default BackgroundPositionPage;


