import { useRef, useState, useEffect } from 'react';
import './MarginPage.css';
import CodeEditor from '../../CodeEditor';
import BrowserSupport from '../../BrowserSupport';

const MarginPage = () => {
  const [cssCode, setCssCode] = useState<string>('margin: 0;');
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
    const defaultCss = 'margin: 0;';
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
    const marginTop = computed.marginTop;
    const marginBottom = computed.marginBottom;
    const marginLeft = computed.marginLeft;
    const marginRight = computed.marginRight;
    

    if (marginTop === '20px' && marginBottom === '20px' && 
        marginLeft === '20px' && marginRight === '20px') {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'margin: 20px;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="margin-page-container">
      <header className="margin-page-header">
        <h1 className="margin-title">CSS Margin</h1>
        <p>Свойство для создания внешних отступов элемента</p>
      </header>
      
      <main className="margin-content">
        <section className="margin-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>margin: значение;</code>
          </div>
        </section>

        <section className="margin-section">
          <h2>Описание</h2>
          <p>
            <strong>margin</strong> — это «личное пространство» элемента, которое создаёт 
            пустую зону вокруг него. Представьте, что каждый элемент — это человек в 
            комнате, а margin — это его «зона комфорта», которую другие элементы не могут 
            занять.
          </p>
          <p>
            <strong>margin: 10px;</strong> — создаёт отступ 10 пикселей со всех сторон. 
            <strong>margin: 10px 20px;</strong> — 10px сверху и снизу, 20px слева и справа. 
            <strong>margin: 10px 20px 15px 25px;</strong> — по часовой стрелке: верх, право, 
            низ, лево. Можно задавать и отрицательные значения — тогда элементы будут 
            «наезжать» друг на друга.
          </p>
          <p>
            <strong>Важно:</strong> Margin не влияет на размер элемента, но влияет на его 
            положение относительно других элементов. В отличие от padding, margin 
            прозрачен и не имеет фона. Также margin может «схлопываться» — когда два 
            элемента с margin встречаются, их отступы не складываются, а берётся 
            максимальный из них.
          </p>
        </section>

        <section className="margin-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>Базовые значения</h3>
            <div className="margin-examples">
              <div className="margin-example margin-0">margin: 0;</div>
              <div className="margin-example margin-10">margin: 10px;</div>
              <div className="margin-example margin-20">margin: 20px;</div>
              <div className="margin-example margin-auto">margin: auto;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Разные стороны</h3>
            <div className="margin-examples">
              <div className="margin-example margin-top">margin-top: 20px;</div>
              <div className="margin-example margin-right">margin-right: 20px;</div>
              <div className="margin-example margin-bottom">margin-bottom: 20px;</div>
              <div className="margin-example margin-left">margin-left: 20px;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Сокращённая запись</h3>
            <div className="margin-examples">
              <div className="margin-example margin-2">margin: 10px 20px;</div>
              <div className="margin-example margin-3">margin: 10px 20px 15px;</div>
              <div className="margin-example margin-4">margin: 10px 20px 15px 25px;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Визуальное сравнение</h3>
            <div className="margin-comparison">
              <div className="comparison-item">
                <span className="label">Без margin:</span>
                <div className="margin-demo no-margin">
                  <div className="demo-box">Элемент</div>
                  <div className="demo-box">Элемент</div>
                </div>
              </div>
              <div className="comparison-item">
                <span className="label">margin: 10px:</span>
                <div className="margin-demo with-margin">
                  <div className="demo-box">Элемент</div>
                  <div className="demo-box">Элемент</div>
                </div>
              </div>
              <div className="comparison-item">
                <span className="label">margin: auto (центрирование):</span>
                <div className="margin-demo center-margin">
                  <div className="demo-box">Элемент</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="margin-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'margin: 0;'}
              title={'CSS редактор'}
            />
            <div className="demo-container">
              <div className="demo-text" ref={demoRef}>
                Этот блок изменит свои отступы в соответствии с вашим CSS.
              </div>
              <div className="demo-neighbor">
                Соседний элемент для демонстрации отступов
              </div>
            </div>
          </div>
        </section>

        <section className="margin-section task-card">
          <h2>Задание</h2>
          <p>Создай отступ 20px со всех сторон с помощью margin.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Отступы созданы со всех сторон.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй создать отступы: margin: 20px;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>margin: 20px;</code></div>
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

export default MarginPage;
