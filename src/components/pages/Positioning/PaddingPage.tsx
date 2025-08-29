import { useRef, useState, useEffect } from 'react';
import './PaddingPage.css';
import CodeEditor from '../../CodeEditor';
import BrowserSupport from '../../BrowserSupport';

const PaddingPage = () => {
  const [cssCode, setCssCode] = useState<string>('padding: 0;');
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
    const defaultCss = 'padding: 0;';
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
    const paddingTop = computed.paddingTop;
    const paddingBottom = computed.paddingBottom;
    const paddingLeft = computed.paddingLeft;
    const paddingRight = computed.paddingRight;
    

    if (paddingTop === '20px' && paddingBottom === '20px' && 
        paddingLeft === '20px' && paddingRight === '20px') {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'padding: 20px;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="padding-page-container">
      <header className="padding-page-header">
        <h1 className="padding-title">CSS Padding</h1>
        <p>Свойство для создания внутренних отступов элемента</p>
      </header>
      
      <main className="padding-content">
        <section className="padding-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>padding: значение;</code>
          </div>
        </section>

        <section className="padding-section">
          <h2>Описание</h2>
          <p>
            <strong>padding</strong> — это «внутренняя подушка» элемента, которая создаёт 
            пространство между границей элемента и его содержимым. Представьте, что у вас 
            есть коробка с подарком — padding это мягкая набивка внутри коробки, которая 
            защищает содержимое от стенок.
          </p>
          <p>
            <strong>padding: 10px;</strong> — создаёт внутренний отступ 10 пикселей со всех сторон. 
            <strong>padding: 10px 20px;</strong> — 10px сверху и снизу, 20px слева и справа. 
            <strong>padding: 10px 20px 15px 25px;</strong> — по часовой стрелке: верх, право, 
            низ, лево. В отличие от margin, padding всегда положительный и увеличивает 
            размер элемента.
          </p>
          <p>
            <strong>Важно:</strong> Padding влияет на общий размер элемента — если у блока 
            ширина 100px и padding 10px, то его общая ширина будет 120px (100px + 10px + 10px). 
            Также padding имеет фон элемента и может быть видимым.
          </p>
        </section>

        <section className="padding-section">
          <h2>Padding vs Margin</h2>
          <div className="comparison-section">
            <div className="comparison-card">
              <h3>📐 Padding (внутренний отступ)</h3>
              <ul>
                <li>Создаёт пространство <strong>внутри</strong> элемента</li>
                <li>Увеличивает <strong>размер</strong> элемента</li>
                <li>Имеет <strong>фон</strong> элемента</li>
                <li>Не может быть <strong>отрицательным</strong></li>
                <li>Не <strong>схлопывается</strong> с другими элементами</li>
              </ul>
            </div>
            <div className="comparison-card">
              <h3>📏 Margin (внешний отступ)</h3>
              <ul>
                <li>Создаёт пространство <strong>вокруг</strong> элемента</li>
                <li>Не влияет на <strong>размер</strong> элемента</li>
                <li><strong>Прозрачный</strong>, без фона</li>
                <li>Может быть <strong>отрицательным</strong></li>
                <li>Может <strong>схлопываться</strong> с другими margin</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="padding-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>Базовые значения</h3>
            <div className="padding-examples">
              <div className="padding-example padding-0">padding: 0;</div>
              <div className="padding-example padding-10">padding: 10px;</div>
              <div className="padding-example padding-20">padding: 20px;</div>
              <div className="padding-example padding-30">padding: 30px;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Разные стороны</h3>
            <div className="padding-examples">
              <div className="padding-example padding-top">padding-top: 20px;</div>
              <div className="padding-example padding-right">padding-right: 20px;</div>
              <div className="padding-example padding-bottom">padding-bottom: 20px;</div>
              <div className="padding-example padding-left">padding-left: 20px;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Сокращённая запись</h3>
            <div className="padding-examples">
              <div className="padding-example padding-2">padding: 10px 20px;</div>
              <div className="padding-example padding-3">padding: 10px 20px 15px;</div>
              <div className="padding-example padding-4">padding: 10px 20px 15px 25px;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Визуальное сравнение</h3>
            <div className="padding-comparison">
              <div className="comparison-item">
                <span className="label">Без padding:</span>
                <div className="padding-demo no-padding">
                  <div className="demo-box">Текст</div>
                </div>
              </div>
              <div className="comparison-item">
                <span className="label">padding: 10px:</span>
                <div className="padding-demo with-padding">
                  <div className="demo-box">Текст</div>
                </div>
              </div>
              <div className="comparison-item">
                <span className="label">padding: 20px:</span>
                <div className="padding-demo more-padding">
                  <div className="demo-box">Текст</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="padding-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'padding: 0;'}
              title={'CSS редактор'}
            />
            <div className="demo-container">
              <div className="demo-text" ref={demoRef}>
                Этот блок изменит свои внутренние отступы в соответствии с вашим CSS.
              </div>
            </div>
          </div>
        </section>

        <section className="padding-section task-card">
          <h2>Задание</h2>
          <p>Создай внутренний отступ 20px со всех сторон с помощью padding.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Внутренние отступы созданы со всех сторон.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй создать внутренние отступы: padding: 20px;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>padding: 20px;</code></div>
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

export default PaddingPage;
