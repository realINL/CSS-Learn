import { useRef, useState, useEffect } from 'react';
import './FontWeightPage.css';
import CodeEditor from '../../CodeEditor';
import BrowserSupport from '../../BrowserSupport';

const FontWeightPage = () => {
  const [cssCode, setCssCode] = useState<string>('font-weight: normal;');
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
    const defaultCss = 'font-weight: normal;';
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
    const fontWeight = computed.fontWeight;

    
    if (fontWeight === 'bold' || fontWeight === '700' || fontWeight === '800' || fontWeight === '900') {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'font-weight: bold;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="font-weight-page-container">
      <header className="font-weight-page-header">
        <h1 className="font-weight-title">CSS Font-weight</h1>
        <p>Свойство для изменения толщины шрифта текста</p>
      </header>
      
      <main className="font-weight-content">
        <section className="font-weight-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>font-weight: значение;</code>
          </div>
        </section>

        <section className="font-weight-section">
          <h2>Описание</h2>
          <p>
            <strong>font-weight</strong> — это «настройка жирности» для вашего текста. 
            С его помощью можно сделать текст тонким, обычным, полужирным или жирным, 
            создавая визуальную иерархию и выделяя важную информацию.
          </p>
          <p>
            <strong>Абсолютные значения:</strong> <code>normal</code> (400) — стандартная толщина, 
            <code>bold</code> (700) — жирный шрифт. Числовые значения от 100 до 900: 
            100 (Thin), 200 (Extra Light), 300 (Light), 400 (Normal), 500 (Medium), 
            600 (Semi Bold), 700 (Bold), 800 (Extra Bold), 900 (Black).
          </p>
          <p>
            <strong>Относительные значения:</strong> <code>lighter</code> и <code>bolder</code> — 
            делают шрифт соответственно тоньше или жирнее относительно родительского элемента. 
            Например, если родитель имеет <code>font-weight: 400</code>, то <code>bolder</code> 
            сделает текст <code>700</code>, а <code>lighter</code> — <code>300</code>.
          </p>
          <p>
            <strong>Важно:</strong> Не все шрифты поддерживают все значения — браузер выберет 
            ближайший доступный вариант. Для веб-разработки чаще всего используются 
            <code>normal</code> (400), <code>bold</code> (700) и иногда <code>300</code> для тонкого текста.
          </p>
        </section>

        <section className="font-weight-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>Ключевые слова</h3>
            <div className="font-weight-examples">
              <div className="font-weight-example normal">font-weight: normal;</div>
              <div className="font-weight-example bold">font-weight: bold;</div>
              <div className="font-weight-example lighter">font-weight: lighter;</div>
              <div className="font-weight-example bolder">font-weight: bolder;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Числовые значения (100-900)</h3>
            <div className="font-weight-examples">
              <div className="font-weight-example weight-100">font-weight: 100; (Thin)</div>
              <div className="font-weight-example weight-200">font-weight: 200; (Extra Light)</div>
              <div className="font-weight-example weight-300">font-weight: 300; (Light)</div>
              <div className="font-weight-example weight-400">font-weight: 400; (Normal)</div>
              <div className="font-weight-example weight-500">font-weight: 500; (Medium)</div>
              <div className="font-weight-example weight-600">font-weight: 600; (Semi Bold)</div>
              <div className="font-weight-example weight-700">font-weight: 700; (Bold)</div>
              <div className="font-weight-example weight-800">font-weight: 800; (Extra Bold)</div>
              <div className="font-weight-example weight-900">font-weight: 900; (Black)</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Сравнение толщин</h3>
            <div className="font-weight-comparison">
              <div className="comparison-item">
                <span className="label">Thin (100):</span>
                <span className="text thin">Этот текст очень тонкий</span>
              </div>
              <div className="comparison-item">
                <span className="label">Light (300):</span>
                <span className="text light">Этот текст тонкий</span>
              </div>
              <div className="comparison-item">
                <span className="label">Normal (400):</span>
                <span className="text normal">Этот текст обычный</span>
              </div>
              <div className="comparison-item">
                <span className="label">Medium (500):</span>
                <span className="text medium">Этот текст средний</span>
              </div>
              <div className="comparison-item">
                <span className="label">Semi Bold (600):</span>
                <span className="text semibold">Этот текст полужирный</span>
              </div>
              <div className="comparison-item">
                <span className="label">Bold (700):</span>
                <span className="text bold">Этот текст жирный</span>
              </div>
              <div className="comparison-item">
                <span className="label">Extra Bold (800):</span>
                <span className="text extrabold">Этот текст очень жирный</span>
              </div>
              <div className="comparison-item">
                <span className="label">Black (900):</span>
                <span className="text black">Этот текст максимально жирный</span>
              </div>
            </div>
          </div>
        </section>

        <section className="font-weight-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'font-weight: normal;'}
              title={'CSS редактор'}
            />
            <div className="demo-text" ref={demoRef}>
              Этот текст изменит свою толщину в соответствии с вашим CSS.
            </div>
          </div>
        </section>

        <section className="font-weight-section task-card">
          <h2>Задание</h2>
          <p>Сделай текст жирным с помощью font-weight.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Текст стал жирным.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй сделать текст жирным: font-weight: bold;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>font-weight: bold;</code></div>
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

export default FontWeightPage;
